// Supabase Edge Function: verify-phonepe-payment
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import {
  corsHeaders,
  getPhonePeAuthToken,
  getPhonePeConfig,
  getSupabaseAdmin,
} from '../_shared/phonepe.ts';

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    let orderRef = '';

    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      orderRef = body.orderRef || body.merchantOrderId || '';
    }

    if (!orderRef) {
      const url = new URL(req.url);
      orderRef =
        url.searchParams.get('orderRef') ||
        url.searchParams.get('merchantOrderId') ||
        '';
    }

    if (!orderRef) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing orderRef or merchantOrderId parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const config = getPhonePeConfig();
    const supabase = getSupabaseAdmin();

    // 1. Fetch PhonePe OAuth token
    const accessToken = await getPhonePeAuthToken();

    // 2. Query PhonePe Order Status API
    const statusUrl = `${config.statusBaseUrl}/${encodeURIComponent(orderRef)}/status?errorContext=true`;

    console.log(`Checking PhonePe status for order: ${orderRef} via ${statusUrl}`);

    const phonepeResponse = await fetch(statusUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${accessToken}`,
      },
    });

    const statusData = await phonepeResponse.json();

    if (!phonepeResponse.ok) {
      console.warn(`PhonePe status check responded with status ${phonepeResponse.status}:`, statusData);

      // Check if order was already confirmed in Supabase (e.g., via webhook)
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('*')
        .eq('order_ref', orderRef)
        .single();

      if (existingOrder && existingOrder.payment_status === 'paid') {
        return new Response(
          JSON.stringify({
            success: true,
            state: 'COMPLETED',
            orderRef,
            order: existingOrder,
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: false,
          state: statusData.state || 'UNKNOWN',
          error: statusData.message || statusData.errorCode || 'Could not verify status with PhonePe',
          details: statusData,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const state = statusData.state; // COMPLETED | FAILED | PENDING
    const transactionId =
      statusData.paymentDetails?.[0]?.transactionId ||
      statusData.orderId ||
      '';

    if (state === 'COMPLETED') {
      // Payment Successful! Update Supabase order
      const { data: updatedOrder, error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          phonepe_order_id: statusData.orderId || null,
          transaction_id: transactionId,
          payment_details: statusData,
        })
        .eq('order_ref', orderRef)
        .select()
        .single();

      if (updateError) {
        console.error('Failed to update order in Supabase:', updateError);
      }

      return new Response(
        JSON.stringify({
          success: true,
          state: 'COMPLETED',
          orderRef,
          transactionId,
          order: updatedOrder,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (state === 'FAILED') {
      // Payment Failed
      const errorMsg =
        statusData.errorContext?.errorDescription ||
        statusData.errorCode ||
        'Transaction failed or was declined by the bank';

      await supabase
        .from('orders')
        .update({
          status: 'payment_failed',
          payment_status: 'failed',
          payment_details: statusData,
        })
        .eq('order_ref', orderRef);

      return new Response(
        JSON.stringify({
          success: false,
          state: 'FAILED',
          orderRef,
          message: errorMsg,
          details: statusData,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // PENDING / AUTHORIZING
      return new Response(
        JSON.stringify({
          success: false,
          state: state || 'PENDING',
          orderRef,
          message: 'Payment is currently pending bank confirmation.',
          details: statusData,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (err: any) {
    console.error('verify-phonepe-payment unhandled error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal server error while verifying payment',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

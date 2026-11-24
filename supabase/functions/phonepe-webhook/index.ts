// Supabase Edge Function: phonepe-webhook
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import {
  corsHeaders,
  getPhonePeAuthToken,
  getPhonePeConfig,
  getSupabaseAdmin,
} from '../_shared/phonepe.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const rawPayload = await req.json().catch(() => ({}));
    console.log('Received PhonePe Webhook callback:', JSON.stringify(rawPayload));

    // Webhooks might contain merchantOrderId directly or inside payload/event
    const merchantOrderId =
      rawPayload.merchantOrderId ||
      rawPayload.data?.merchantOrderId ||
      rawPayload.orderId ||
      rawPayload.data?.orderId;

    if (!merchantOrderId) {
      console.warn('Webhook payload does not contain merchantOrderId:', rawPayload);
      return new Response(JSON.stringify({ success: true, message: 'Acknowledged without orderId' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const config = getPhonePeConfig();
    const supabase = getSupabaseAdmin();

    // Verify order status directly with PhonePe Status API to prevent webhook spoofing
    const accessToken = await getPhonePeAuthToken();
    const statusUrl = `${config.statusBaseUrl}/${encodeURIComponent(merchantOrderId)}/status?errorContext=true`;

    const phonepeResponse = await fetch(statusUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${accessToken}`,
      },
    });

    if (phonepeResponse.ok) {
      const statusData = await phonepeResponse.json();
      console.log(`Webhook verified PhonePe status for ${merchantOrderId}:`, statusData.state);

      if (statusData.state === 'COMPLETED') {
        const transactionId =
          statusData.paymentDetails?.[0]?.transactionId ||
          statusData.orderId ||
          '';

        await supabase
          .from('orders')
          .update({
            status: 'confirmed',
            payment_status: 'paid',
            phonepe_order_id: statusData.orderId || null,
            transaction_id: transactionId,
            payment_details: statusData,
          })
          .eq('order_ref', merchantOrderId);
      } else if (statusData.state === 'FAILED') {
        await supabase
          .from('orders')
          .update({
            status: 'payment_failed',
            payment_status: 'failed',
            payment_details: statusData,
          })
          .eq('order_ref', merchantOrderId);
      }
    }

    // Always acknowledge 200 OK to PhonePe so they do not retry endlessly
    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('phonepe-webhook error:', err);
    // Return 200 to PhonePe to acknowledge receipt
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

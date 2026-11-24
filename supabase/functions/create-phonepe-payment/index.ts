// Supabase Edge Function: create-phonepe-payment
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
    const payload = await req.json();
    const {
      orderRef,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      state,
      pincode,
      subtotal,
      shippingFee,
      grandTotal,
      items,
      redirectUrl,
    } = payload;

    if (!orderRef || !grandTotal || !customerName || !customerEmail) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required order details' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const config = getPhonePeConfig();
    const supabase = getSupabaseAdmin();

    // 1. Amount in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(Number(grandTotal) * 100);

    // 2. Fetch PhonePe OAuth token
    const accessToken = await getPhonePeAuthToken();

    // 3. Fallback redirect URL if not provided
    const targetRedirectUrl =
      redirectUrl ||
      `https://lilsspunboutique.in/#/payment-status?orderRef=${encodeURIComponent(orderRef)}`;

    // 4. Create payment request body for PhonePe PG Checkout V2
    const phonepeRequestBody = {
      merchantOrderId: orderRef,
      amount: amountInPaise,
      expireAfter: 1200, // 20 minutes
      metaInfo: {
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone || '',
      },
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: `Order #${orderRef} - Lil's Spun Boutique`,
        merchantUrls: {
          redirectUrl: targetRedirectUrl,
        },
      },
    };

    console.log(`Initiating PhonePe payment for order ${orderRef}, amount: ${amountInPaise} paise`);

    const phonepeResponse = await fetch(config.payUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `O-Bearer ${accessToken}`,
      },
      body: JSON.stringify(phonepeRequestBody),
    });

    const phonepeData = await phonepeResponse.json();

    if (!phonepeResponse.ok || !phonepeData.redirectUrl) {
      console.error('PhonePe /checkout/v2/pay failed:', phonepeResponse.status, phonepeData);
      return new Response(
        JSON.stringify({
          success: false,
          error: phonepeData.message || phonepeData.errorCode || 'Failed to initiate PhonePe payment session',
          details: phonepeData,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Upsert order in Supabase database with payment_pending status
    const orderRecord = {
      order_ref: orderRef,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || '',
      shipping_address: shippingAddress || '',
      city: city || '',
      state: state || '',
      pincode: pincode || '',
      payment_method: 'phonepe_online',
      subtotal: subtotal || grandTotal,
      shipping_fee: shippingFee || 0,
      grand_total: grandTotal,
      items: items || [],
      status: 'payment_pending',
      payment_status: 'pending',
      phonepe_order_id: phonepeData.orderId || null,
      created_at: new Date().toISOString(),
    };

    const { error: dbError } = await supabase
      .from('orders')
      .upsert([orderRecord], { onConflict: 'order_ref' });

    if (dbError) {
      console.error('Supabase order upsert warning:', dbError);
      // We do not fail the customer payment initiation if DB write threw a minor RLS warning,
      // but we log it.
    }

    // 6. Return the checkout URL to the frontend
    return new Response(
      JSON.stringify({
        success: true,
        orderRef,
        phonepeOrderId: phonepeData.orderId,
        redirectUrl: phonepeData.redirectUrl,
        state: phonepeData.state,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('create-phonepe-payment unhandled error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal server error while creating payment',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

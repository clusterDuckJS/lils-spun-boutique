import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const LOCAL_ORDERS_KEY = 'lils_spun_orders_v1';

// Helper to get local orders
function getLocalOrders() {
  try {
    const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error reading local orders:', e);
    return [];
  }
}

// Helper to save a local order
function saveLocalOrder(order) {
  try {
    const list = getLocalOrders();
    const existingIndex = list.findIndex(o => o.order_ref === order.order_ref);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...order };
    } else {
      list.unshift(order);
    }
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving local order:', e);
  }
}

/**
 * Initiate PhonePe PG Checkout session via Supabase Edge Function
 */
export async function initiatePhonePePayment(orderPayload, redirectUrl) {
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
    items
  } = orderPayload;

  // Stash orderRef in localStorage so return page can reliably find it
  try {
    localStorage.setItem('lils_pending_payment_order_ref', orderRef);
  } catch (_) {}

  // Save pending order locally
  const localOrder = {
    order_ref: orderRef,
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    shipping_address: shippingAddress,
    city,
    state,
    pincode,
    payment_method: 'phonepe_online',
    subtotal,
    shipping_fee: shippingFee || 0,
    grand_total: grandTotal,
    items,
    status: 'payment_pending',
    payment_status: 'pending',
    created_at: new Date().toISOString()
  };
  saveLocalOrder(localOrder);

  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      error: 'Supabase is not configured. Please check your environment variables.'
    };
  }

  const payload = {
    ...orderPayload,
    redirectUrl
  };

  try {
    // Try supabase.functions.invoke first
    const { data, error } = await supabase.functions.invoke('create-phonepe-payment', {
      body: payload
    });

    if (error) {
      console.warn('supabase.functions.invoke returned error, trying fallback fetch:', error);
      throw error;
    }

    if (data && data.success && data.redirectUrl) {
      return data;
    }

    throw new Error(data?.error || 'Failed to obtain PhonePe checkout URL');
  } catch (invokeErr) {
    console.warn('Fallback: direct fetch to Supabase Edge Function:', invokeErr);

    // Direct HTTP fetch fallback
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const endpoint = `${supabaseUrl}/functions/v1/create-phonepe-payment`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok && result.success && result.redirectUrl) {
        return result;
      }
      return {
        success: false,
        error: result.error || 'Failed to initiate PhonePe checkout session'
      };
    } catch (fetchErr) {
      console.error('PhonePe direct fetch error:', fetchErr);
      return {
        success: false,
        error: fetchErr.message || 'Could not connect to payment server'
      };
    }
  }
}

/**
 * Verify PhonePe Payment status via Supabase Edge Function
 */
export async function verifyPhonePePayment(orderRef) {
  if (!orderRef) {
    return { success: false, error: 'Order reference is required' };
  }

  if (!isSupabaseConfigured || !supabase) {
    // Fallback if testing offline
    const local = getLocalOrders().find(o => o.order_ref === orderRef);
    return {
      success: true,
      state: local?.payment_status === 'paid' ? 'COMPLETED' : 'PENDING',
      order: local
    };
  }

  try {
    const { data, error } = await supabase.functions.invoke('verify-phonepe-payment', {
      body: { orderRef }
    });

    if (!error && data) {
      if (data.state === 'COMPLETED' && data.order) {
        saveLocalOrder(data.order);
      }
      return data;
    }
    throw error || new Error(data?.error || 'Status check failed');
  } catch (err) {
    console.warn('Invoking verify-phonepe-payment failed, trying fallback fetch:', err);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const endpoint = `${supabaseUrl}/functions/v1/verify-phonepe-payment?orderRef=${encodeURIComponent(orderRef)}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        }
      });

      const result = await response.json();
      if (result.state === 'COMPLETED' && result.order) {
        saveLocalOrder(result.order);
      }
      return result;
    } catch (fetchErr) {
      console.error('verifyPhonePePayment fetch error:', fetchErr);
      return { success: false, error: fetchErr.message };
    }
  }
}

export async function createOrder(orderPayload) {
  const {
    orderRef,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    city,
    state,
    pincode,
    paymentMethod,
    subtotal,
    shippingFee,
    grandTotal,
    items
  } = orderPayload;

  const orderRecord = {
    order_ref: orderRef,
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    shipping_address: shippingAddress,
    city,
    state,
    pincode,
    payment_method: paymentMethod || 'upi',
    subtotal,
    shipping_fee: shippingFee || 0,
    grand_total: grandTotal,
    items,
    status: 'confirmed',
    created_at: new Date().toISOString()
  };

  // Always save a copy to local storage for instant availability
  saveLocalOrder(orderRecord);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderRecord])
        .select()
        .single();

      if (error) {
        console.error('Failed to insert order into Supabase:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err) {
      console.error('Supabase createOrder error:', err);
      return { success: false, error: err.message };
    }
  }

  // If Supabase is not configured, simulate success
  return { success: true, simulated: true, data: orderRecord };
}

export async function getOrderByRef(orderRef) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_ref', orderRef)
        .single();

      if (data) return data;
    } catch (err) {
      console.error('Error fetching order from Supabase:', err);
    }
  }

  // Fallback to local
  const local = getLocalOrders().find(o => o.order_ref === orderRef);
  return local || null;
}

export async function getCustomerOrders(email) {
  if (!email) return [];
  const normalizedEmail = email.trim().toLowerCase();

  let supabaseOrders = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .ilike('customer_email', normalizedEmail)
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        supabaseOrders = data;
      }
    } catch (err) {
      console.error('Error fetching customer orders from Supabase:', err);
    }
  }

  // Combine with local orders matching the email, deduplicating by order_ref
  const localOrders = getLocalOrders().filter(
    o => o.customer_email?.toLowerCase() === normalizedEmail
  );

  const seenRefs = new Set();
  const combined = [];

  for (const o of [...supabaseOrders, ...localOrders]) {
    if (o.order_ref && !seenRefs.has(o.order_ref)) {
      seenRefs.add(o.order_ref);
      combined.push(o);
    }
  }

  return combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

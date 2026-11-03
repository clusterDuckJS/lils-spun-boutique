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
    list.unshift(order);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving local order:', e);
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

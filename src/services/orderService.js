import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const LOCAL_ORDERS_KEY = 'lils_spun_orders_v1';
const LOCAL_ORDER_UPDATES_KEY = 'lils_spun_admin_order_updates_v1';

export const ORDER_STATUSES = {
  confirmed: {
    label: 'Order Confirmed',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500',
    description: 'Payment verified, order registered in boutique'
  },
  processing: {
    label: 'Processing & Packing',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500',
    description: 'Boutique artisans tailoring & carefully packaging'
  },
  dispatched: {
    label: 'Dispatched / Shipped',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    dotClass: 'bg-purple-500',
    description: 'Handed to courier partner with tracking reference'
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dotClass: 'bg-indigo-500',
    description: 'Courier agent on route to patron address'
  },
  delivered: {
    label: 'Delivered',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
    description: 'Delivered safely to patron'
  },
  cancelled: {
    label: 'Cancelled',
    badgeClass: 'bg-red-50 text-red-700 border-red-200',
    dotClass: 'bg-red-500',
    description: 'Order cancelled / refunded'
  }
};

export const COMMON_COURIERS = [
  'Blue Dart',
  'DTDC',
  'Delhivery',
  'Speed Post (India Post)',
  'Professional Couriers',
  'Ecom Express',
  'Shadowfax',
  'DHL Express',
  'Hand Delivery / Boutique Concierge'
];

// Helper to get local orders
export function getLocalOrders() {
  try {
    const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Error reading local orders:', e);
    return [];
  }
}

// Helper to get local admin overlays
function getLocalOrderUpdates() {
  try {
    const saved = localStorage.getItem(LOCAL_ORDER_UPDATES_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
}

// Helper to save local admin overlays
function saveLocalOrderUpdate(orderRef, update) {
  try {
    const all = getLocalOrderUpdates();
    all[orderRef] = { ...(all[orderRef] || {}), ...update, updated_at: new Date().toISOString() };
    localStorage.setItem(LOCAL_ORDER_UPDATES_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving local order update:', e);
  }
}

// Helper to save a local order
export function saveLocalOrder(order) {
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
 * Standardize order shape across database columns and JSONB payloads
 */
export function normalizeOrder(o) {
  if (!o) return null;
  const paymentDetails = typeof o.payment_details === 'object' && o.payment_details !== null ? o.payment_details : {};
  const fulfillment = paymentDetails.fulfillment || {};
  const localUpdates = getLocalOrderUpdates()[o.order_ref] || {};

  const effectiveStatus = (localUpdates.status || o.status || 'confirmed').toLowerCase();

  return {
    id: o.id || o.order_ref,
    order_ref: o.order_ref,
    customer_name: localUpdates.customer_name || o.customer_name || 'Valued Patron',
    customer_email: localUpdates.customer_email || o.customer_email || '',
    customer_phone: localUpdates.customer_phone || o.customer_phone || '',
    shipping_address: localUpdates.shipping_address || o.shipping_address || '',
    city: localUpdates.city || o.city || '',
    state: localUpdates.state || o.state || '',
    pincode: localUpdates.pincode || o.pincode || '',
    payment_method: o.payment_method || 'upi',
    subtotal: Number(o.subtotal || 0),
    shipping_fee: Number(o.shipping_fee || 0),
    grand_total: Number(o.grand_total || 0),
    items: Array.isArray(o.items) ? o.items : [],
    status: effectiveStatus,
    payment_status: (localUpdates.payment_status || o.payment_status || 'pending').toLowerCase(),
    phonepe_order_id: o.phonepe_order_id || null,
    transaction_id: o.transaction_id || null,
    payment_details: paymentDetails,
    created_at: o.created_at || new Date().toISOString(),
    updated_at: localUpdates.updated_at || o.updated_at || fulfillment.updated_at || o.created_at,
    
    // Tracking & Fulfillment Fields
    tracking_number: localUpdates.tracking_number || o.tracking_number || fulfillment.tracking_number || '',
    courier_partner: localUpdates.courier_partner || o.courier_partner || fulfillment.courier_partner || '',
    tracking_url: localUpdates.tracking_url || o.tracking_url || fulfillment.tracking_url || '',
    notes: localUpdates.notes || o.notes || fulfillment.notes || '',
    dispatched_at: localUpdates.dispatched_at || o.dispatched_at || fulfillment.dispatched_at || null,
    delivered_at: localUpdates.delivered_at || o.delivered_at || fulfillment.delivered_at || null,
    status_history: Array.isArray(localUpdates.status_history)
      ? localUpdates.status_history
      : (Array.isArray(fulfillment.status_history) ? fulfillment.status_history : [])
  };
}

/**
 * Fetch ALL orders for the Admin Console (Supabase + Local fallback)
 */
export async function getAllOrders() {
  let supabaseOrders = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        supabaseOrders = data;
      } else if (error) {
        console.warn('Error fetching all orders from Supabase:', error.message);
      }
    } catch (err) {
      console.warn('Supabase getAllOrders exception:', err);
    }
  }

  const localOrders = getLocalOrders();
  const seenRefs = new Set();
  const combined = [];

  // Combine both sources, deduplicating by order_ref
  for (const o of [...supabaseOrders, ...localOrders]) {
    if (o.order_ref && !seenRefs.has(o.order_ref)) {
      seenRefs.add(o.order_ref);
      combined.push(normalizeOrder(o));
    }
  }

  // Sort newest first
  return combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

/**
 * Update an order's status and fulfillment info (Dispatched, Confirmed, Delivered, etc.)
 */
export async function updateOrderStatus(orderRef, updatePayload = {}) {
  const {
    status,
    courier_partner,
    tracking_number,
    tracking_url,
    notes,
    payment_status
  } = updatePayload;

  const now = new Date().toISOString();
  let dispatched_at = updatePayload.dispatched_at;
  let delivered_at = updatePayload.delivered_at;

  if (status === 'dispatched' && !dispatched_at) {
    dispatched_at = now;
  }
  if (status === 'delivered' && !delivered_at) {
    delivered_at = now;
  }

  // 1. Fetch current order to update status history
  const currentOrder = await getOrderByRef(orderRef);
  const currentHistory = currentOrder?.status_history || [];
  const newHistoryEntry = {
    status: status || currentOrder?.status || 'confirmed',
    updated_at: now,
    notes: notes || '',
    courier_partner: courier_partner || '',
    tracking_number: tracking_number || ''
  };

  const updatedHistory = [...currentHistory, newHistoryEntry];

  // 2. Prepare fulfillment object for storage inside JSONB payment_details
  const currentPaymentDetails = currentOrder?.payment_details || {};
  const fulfillment = {
    ...(currentPaymentDetails.fulfillment || {}),
    status: status || currentOrder?.status,
    courier_partner: courier_partner !== undefined ? courier_partner : currentOrder?.courier_partner,
    tracking_number: tracking_number !== undefined ? tracking_number : currentOrder?.tracking_number,
    tracking_url: tracking_url !== undefined ? tracking_url : currentOrder?.tracking_url,
    notes: notes !== undefined ? notes : currentOrder?.notes,
    dispatched_at: dispatched_at || currentOrder?.dispatched_at,
    delivered_at: delivered_at || currentOrder?.delivered_at,
    updated_at: now,
    status_history: updatedHistory
  };

  const updatedPaymentDetails = {
    ...currentPaymentDetails,
    fulfillment
  };

  const updateFields = {
    status: status || currentOrder?.status,
    payment_details: updatedPaymentDetails,
    ...(payment_status ? { payment_status } : {})
  };

  // 3. Save local overlay so admin and customer see it immediately
  saveLocalOrderUpdate(orderRef, {
    status,
    courier_partner,
    tracking_number,
    tracking_url,
    notes,
    dispatched_at,
    delivered_at,
    status_history: updatedHistory,
    ...(payment_status ? { payment_status } : {})
  });

  // Also update in local order cache
  if (currentOrder) {
    saveLocalOrder({
      ...currentOrder,
      ...updateFields,
      courier_partner,
      tracking_number,
      tracking_url,
      notes,
      dispatched_at,
      delivered_at,
      status_history: updatedHistory
    });
  }

  // 4. Update in Supabase
  let savedToDatabase = false;
  let dbError = null;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update(updateFields)
        .eq('order_ref', orderRef)
        .select();

      if (!error && data && data.length > 0) {
        savedToDatabase = true;
      } else if (error) {
        dbError = error.message;
        console.warn('Supabase update order notice:', error.message);
      }
    } catch (err) {
      dbError = err.message;
      console.warn('Supabase update order exception:', err);
    }
  }

  const normalized = normalizeOrder({
    ...(currentOrder || {}),
    ...updateFields,
    courier_partner,
    tracking_number,
    tracking_url,
    notes,
    dispatched_at,
    delivered_at,
    status_history: updatedHistory
  });

  return {
    success: true,
    order: normalized,
    savedToDatabase,
    dbError
  };
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

  try {
    localStorage.setItem('lils_pending_payment_order_ref', orderRef);
  } catch (_) {}

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
    const local = getLocalOrders().find(o => o.order_ref === orderRef);
    return {
      success: true,
      state: local?.payment_status === 'paid' ? 'COMPLETED' : 'PENDING',
      order: normalizeOrder(local)
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

      return { success: true, data: normalizeOrder(data) };
    } catch (err) {
      console.error('Supabase createOrder error:', err);
      return { success: false, error: err.message };
    }
  }

  return { success: true, simulated: true, data: normalizeOrder(orderRecord) };
}

export async function getOrderByRef(orderRef) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_ref', orderRef)
        .single();

      if (data) return normalizeOrder(data);
    } catch (err) {
      console.error('Error fetching order from Supabase:', err);
    }
  }

  const local = getLocalOrders().find(o => o.order_ref === orderRef);
  return local ? normalizeOrder(local) : null;
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

  const localOrders = getLocalOrders().filter(
    o => o.customer_email?.toLowerCase() === normalizedEmail
  );

  const seenRefs = new Set();
  const combined = [];

  for (const o of [...supabaseOrders, ...localOrders]) {
    if (o.order_ref && !seenRefs.has(o.order_ref)) {
      seenRefs.add(o.order_ref);
      combined.push(normalizeOrder(o));
    }
  }

  return combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

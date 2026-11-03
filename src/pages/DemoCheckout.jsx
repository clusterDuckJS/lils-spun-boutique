import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ShieldCheck, ArrowRight, Lock, Sparkles, MapPin, Database, Loader2, User } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { formatINR } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';

export default function DemoCheckout() {
  const { items, grandTotal, subtotal, shippingFee, clearCart } = useCart();
  const { isAuthenticated, profile, user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDbSaved, setIsDbSaved] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [saveToProfile, setSaveToProfile] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi'
  });

  // Pre-fill with authenticated profile or default mock patron
  useEffect(() => {
    if (isAuthenticated && profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.fullName || prev.name || '',
        email: profile.email || prev.email || '',
        phone: profile.phone || prev.phone || '',
        address: profile.address || prev.address || '',
        city: profile.city || prev.city || '',
        state: profile.state || prev.state || '',
        pincode: profile.pincode || prev.pincode || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        name: prev.name || 'Priya Sharma',
        email: prev.email || 'priya.sharma@example.com',
        phone: prev.phone || '+91 97474 46174',
        address: prev.address || 'Sree Ram Ganesh Arcade, Residency Road, Asramam',
        city: prev.city || 'Kollam',
        state: prev.state || 'Kerala',
        pincode: prev.pincode || '691002'
      }));
    }
  }, [isAuthenticated, profile]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = `LILS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);

    // Save order items payload
    const itemsPayload = items.map(item => ({
      productId: item.productId,
      name: item.product?.name,
      price: item.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      image: item.product?.images?.[0] || ''
    }));

    const result = await createOrder({
      orderRef: ref,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
      subtotal,
      shippingFee,
      grandTotal,
      items: itemsPayload
    });

    if (isAuthenticated && saveToProfile) {
      updateProfile({
        fullName: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      });
    }

    setIsSubmitting(false);
    setIsDbSaved(result?.success && !result?.simulated);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-champagne/40 shadow-elevated space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-luxury font-semibold">
            {isDbSaved ? (
              <>
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved to Supabase Database</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
                <span>Order Processed</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
            Order Confirmed!
          </h1>

          <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border text-xs text-brand-navy space-y-1">
            <p>
              Order Reference Number: <strong className="font-mono text-sm text-brand-navy">{orderRef}</strong>
            </p>
            <p className="text-brand-muted">
              Shipping to: {formData.name}, {formData.city}, {formData.state} ({formData.pincode})
            </p>
            <p className="text-brand-muted">
              Notification sent to: {formData.email}
            </p>
          </div>

          {isDbSaved ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed text-left">
              <strong>Order Confirmed:</strong> Your order record, customer details, and purchased garment breakdown have been saved. Our concierge team will review and contact you with dispatch and tracking details.
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed text-left">
              <strong>Order Received:</strong> Thank you for your order. Our boutique team will review your order details and reach out to you shortly.
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/account?tab=orders"
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
              >
                Track in My Orders
              </Link>
            ) : (
              <Link
                to="/signup?redirect=/account"
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
              >
                Create Account to Track
              </Link>
            )}
            <Link
              to="/collections/new-arrivals"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-brand-border hover:border-brand-navy text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl text-brand-navy mb-3">Your Bag is Empty</h1>
        <p className="text-xs text-brand-muted mb-6">
          Add garments to your bag before proceeding to checkout.
        </p>
        <Link
          to="/collections/new-arrivals"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs
        items={[
          { label: 'Shopping Bag', href: '/cart' },
          { label: 'Checkout' }
        ]}
      />

      <div className="mb-8 pb-4 border-b border-brand-border/60">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
          Order Placement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          Boutique Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Form: Shipping Address & Payment Simulation (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Patron Auth Notification Banner */}
          {isAuthenticated ? (
            <div className="p-4 bg-white rounded-2xl border border-brand-champagne/40 shadow-soft flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-navy text-brand-champagne flex items-center justify-center font-bold text-xs">
                  {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'P'}
                </div>
                <div>
                  <p className="font-medium text-brand-navy">
                    Ordering as <span className="font-semibold">{profile?.fullName || user?.email}</span>
                  </p>
                  <p className="text-[11px] text-brand-muted">{formData.email}</p>
                </div>
              </div>
              <Link
                to="/account"
                className="text-brand-rose hover:underline font-medium text-xs"
              >
                Manage Profile
              </Link>
            </div>
          ) : (
            <div className="p-4 bg-brand-blush/20 rounded-2xl border border-brand-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-rose" />
                <span className="text-brand-navy">Have a boutique patron account?</span>
              </div>
              <Link
                to="/login?redirect=/checkout"
                className="text-brand-navy font-semibold underline decoration-brand-rose underline-offset-2 hover:text-brand-rose flex items-center gap-1"
              >
                <span>Sign in for saved address</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Contact Details */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-4">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs flex items-center justify-center font-sans">
                  1
                </span>
                Contact & Shipping Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-brand-muted font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted font-medium mb-1">Email Address (for order updates)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-brand-muted font-medium mb-1">Phone Number (for courier SMS)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-brand-muted font-medium mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted font-medium mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-brand-muted font-medium mb-1">Postal Pincode</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full sm:w-1/2 bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
              </div>

              {isAuthenticated && (
                <div className="pt-2 border-t border-brand-border/40">
                  <label className="flex items-center gap-2 text-xs text-brand-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveToProfile}
                      onChange={(e) => setSaveToProfile(e.target.checked)}
                      className="rounded border-brand-border text-brand-navy focus:ring-brand-rose"
                    />
                    <span>Save / update this delivery address in my patron profile</span>
                  </label>
                </div>
              )}
            </div>

            {/* Payment Method Selection (Mock) */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-4">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs flex items-center justify-center font-sans">
                  2
                </span>
                Simulated Payment Mode
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-brand-border hover:border-brand-navy cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="text-brand-navy"
                  />
                  <div>
                    <span className="text-xs font-semibold text-brand-navy block">UPI (GPay / PhonePe / Paytm)</span>
                    <span className="text-[11px] text-brand-muted">Instant direct payment verification</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-brand-border hover:border-brand-navy cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="text-brand-navy"
                  />
                  <div>
                    <span className="text-xs font-semibold text-brand-navy block">Credit / Debit Card</span>
                    <span className="text-[11px] text-brand-muted">Visa, Mastercard, RuPay & Amex</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-navy hover:bg-brand-navy-light disabled:opacity-75 text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-card hover:shadow-elevated transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 text-brand-champagne animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-brand-champagne" />
                  <span>Place Order ({formatINR(grandTotal)})</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Summary: Order items & totals (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-4">
          <h2 className="font-serif text-lg font-medium text-brand-navy pb-3 border-b border-brand-border">
            Review Bag ({items.length} garments)
          </h2>

          <div className="divide-y divide-brand-border/60 max-h-80 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded overflow-hidden bg-brand-ivory-muted shrink-0">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-brand-navy line-clamp-1">{item.product.name}</h4>
                    <p className="text-[11px] text-brand-muted">
                      Qty: {item.quantity} &bull; {item.selectedSize}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-brand-navy font-sans">
                  {formatINR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-brand-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-brand-muted">Subtotal</span>
              <span className="font-semibold text-brand-navy font-sans">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">Shipping</span>
              <span className="font-semibold text-brand-navy font-sans">
                {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
              </span>
            </div>
            <div className="pt-3 border-t border-brand-border flex justify-between items-baseline">
              <span className="font-serif text-base font-semibold text-brand-navy">Total Payable</span>
              <span className="font-sans text-xl font-bold text-brand-navy">{formatINR(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ShieldCheck, ArrowRight, Lock, Sparkles, MapPin } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { formatINR } from '../data/products';
import { useCart } from '../context/CartContext';

export default function DemoCheckout() {
  const { items, grandTotal, subtotal, shippingFee, clearCart } = useCart();
  const navigate = useNavigate();

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [formData, setFormData] = useState({
    name: 'Priya Sharma (Demo)',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42, Lotus Villa, Panampilly Nagar',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682036',
    paymentMethod: 'upi'
  });

  const handlePlaceDemoOrder = (e) => {
    e.preventDefault();
    const ref = `LILS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
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

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blush/40 text-brand-rose-dark text-xs uppercase tracking-luxury font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Prototype Simulation</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
            Demo Order Simulated
          </h1>

          <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border text-xs text-brand-navy space-y-1">
            <p>
              Order Reference Number: <strong className="font-mono text-sm">{orderRef}</strong>
            </p>
            <p className="text-brand-muted">
              Demo shipping to: {formData.name}, {formData.city}, {formData.state}
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed text-left">
            <strong>Client Presentation Notice:</strong> This is an interactive frontend design prototype for <em>Lils Spun Boutique</em>. In accordance with project instructions, real payment gateways and backend databases are intentionally omitted. No funds were debited and no actual order was created.
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
            >
              Back to Home
            </Link>
            <Link
              to="/collections/new-arrivals"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-brand-border hover:border-brand-navy text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Browse More Collections
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
          Add garments to your bag before proceeding to demo checkout.
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
          { label: 'Demo Checkout' }
        ]}
      />

      <div className="mb-8 pb-4 border-b border-brand-border/60">
        <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
          Client Presentation Prototype
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          Boutique Demo Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Form: Shipping Address & Payment Simulation (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handlePlaceDemoOrder} className="space-y-6">
            
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
                  <label className="block text-brand-muted font-medium mb-1">Phone Number</label>
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
              </div>
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
                    <span className="text-[11px] text-brand-muted">Instant zero-fee boutique verification (Demo)</span>
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
                    <span className="text-[11px] text-brand-muted">Visa, Mastercard, RuPay & Amex (Demo)</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-card hover:shadow-elevated transition-all"
            >
              <Lock className="w-4 h-4 text-brand-champagne" />
              <span>Simulate Placing Order ({formatINR(grandTotal)})</span>
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

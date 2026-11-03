import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ShieldCheck, ArrowRight, Lock, Sparkles, MapPin, Loader2, User, CreditCard, Truck } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { formatINR } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';

export default function Checkout() {
  const { items, grandTotal, subtotal, shippingFee, clearCart } = useCart();
  const { isAuthenticated, profile, user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    paymentMethod: 'online'
  });

  // Pre-fill with authenticated profile if user is logged in
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
    }
  }, [isAuthenticated, profile]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = `LILS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);

    // Order items payload
    const itemsPayload = items.map(item => ({
      productId: item.productId,
      name: item.product?.name,
      price: item.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      image: item.product?.images?.[0] || ''
    }));

    await createOrder({
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
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Order Placed Successfully</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
            Thank You for Your Order!
          </h1>

          <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border text-xs text-brand-navy space-y-1.5 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
              <span className="text-brand-muted">Order Reference Number:</span>
              <strong className="font-mono text-sm text-brand-navy">{orderRef}</strong>
            </div>
            <p className="text-brand-muted">
              <strong>Delivery Address:</strong> {formData.name}, {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
            </p>
            <p className="text-brand-muted">
              <strong>Order Confirmation Sent to:</strong> {formData.email}
            </p>
            <p className="text-brand-muted">
              <strong>Estimated Delivery:</strong> 3 to 7 business days via Express Courier
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 leading-relaxed text-left space-y-1">
            <strong>Next Steps:</strong>
            <p>
              Your handcrafted garment is being inspected and packed in our signature boutique packaging at our Kollam atelier. You will receive an SMS and email with your courier tracking link once dispatched.
            </p>
          </div>

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
              Continue Shopping
            </Link>
          </div>

          <p className="text-[11px] text-brand-muted pt-2">
            Questions regarding your order? Contact concierge at <a href="mailto:lilsspunboutique@gmail.com" className="underline text-brand-navy">lilsspunboutique@gmail.com</a> or WhatsApp <a href="https://wa.me/919778465361" className="underline text-brand-navy">+91 97784 65361</a>.
          </p>
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
          Secure Order Placement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          Boutique Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Form: Shipping Address & Payment Selection (7 cols on lg) */}
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
                <span className="text-brand-navy">Already have a patron account?</span>
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
            
            {/* Step 1: Contact & Delivery Address */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-4">
              <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs flex items-center justify-center font-sans">
                  1
                </span>
                Shipping & Delivery Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-brand-muted font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted font-medium mb-1">Email Address (for order updates) *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-brand-muted font-medium mb-1">Mobile Phone Number (for courier SMS updates) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-brand-muted font-medium mb-1">Complete Postal Delivery Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Flat / House No., Apartment Name, Street / Locality"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted font-medium mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kollam"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted font-medium mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kerala"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-brand-ivory/50 border border-brand-border rounded-lg p-2.5 text-xs text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-brand-muted font-medium mb-1">Postal Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit PIN code (e.g. 691002)"
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

            {/* Step 2: Payment Method Selection */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg font-medium text-brand-navy flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs flex items-center justify-center font-sans">
                    2
                  </span>
                  Payment Method
                </h2>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>256-Bit SSL Secured</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Online Payment */}
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-brand-navy/30 bg-brand-ivory/30 hover:border-brand-navy cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={formData.paymentMethod === 'online' || formData.paymentMethod === 'upi'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'online' })}
                    className="mt-0.5 text-brand-navy"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-navy">
                        Online Payment (UPI, Cards, Net Banking)
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted">
                      Pay securely with Google Pay, PhonePe, Paytm, BHIM UPI, Visa, Mastercard, RuPay, or Internet Banking.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-bold text-brand-navy bg-white px-2 py-0.5 rounded border border-brand-border">UPI</span>
                      <span className="text-[10px] font-bold text-[#1a1f71] bg-white px-2 py-0.5 rounded border border-brand-border">VISA</span>
                      <span className="text-[10px] font-bold text-[#eb001b] bg-white px-2 py-0.5 rounded border border-brand-border">Mastercard</span>
                      <span className="text-[10px] font-bold text-[#008cba] bg-white px-2 py-0.5 rounded border border-brand-border">RuPay</span>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery / Pay at Studio */}
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-brand-border hover:border-brand-navy cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-0.5 text-brand-navy"
                  />
                  <div>
                    <span className="text-xs font-semibold text-brand-navy block">
                      Cash on Delivery (COD) / Pay at Studio
                    </span>
                    <span className="text-[11px] text-brand-muted">
                      Pay upon courier delivery or when collecting your piece at our Kollam boutique studio.
                    </span>
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
                  <span>Confirming Order...</span>
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
              <div>
                <span className="text-brand-muted block">Boutique Shipping</span>
                <span className="text-[10px] text-brand-muted">
                  {shippingFee === 0 ? 'Complimentary on orders ≥ ₹4,999' : 'Standard express dispatch'}
                </span>
              </div>
              <span className="font-semibold text-brand-navy font-sans">
                {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
              </span>
            </div>
            <div className="pt-3 border-t border-brand-border flex justify-between items-baseline">
              <div>
                <span className="font-serif text-base font-semibold text-brand-navy">Total Payable</span>
                <span className="text-[10px] text-brand-muted block">(Inclusive of all taxes & GST)</span>
              </div>
              <span className="font-sans text-xl font-bold text-brand-navy">{formatINR(grandTotal)}</span>
            </div>
          </div>

          {/* Compliance guarantees */}
          <div className="pt-4 border-t border-brand-border/60 space-y-2 text-[11px] text-brand-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Safe & Secure Transactions &bull; SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-rose shrink-0" />
              <span>Insured express domestic courier dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

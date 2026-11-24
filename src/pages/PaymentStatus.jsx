import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { formatINR } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { verifyPhonePePayment, getOrderByRef } from '../services/orderService';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PaymentStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Loading, success, failure, pending
  const [status, setStatus] = useState('checking'); // 'checking' | 'COMPLETED' | 'FAILED' | 'PENDING'
  const [errorMessage, setErrorMessage] = useState('');
  const [order, setOrder] = useState(null);
  const [orderRef, setOrderRef] = useState('');
  const [checkCount, setCheckCount] = useState(0);

  const pollTimerRef = useRef(null);

  // Extract orderRef / merchantOrderId from URL search params or hash query
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let ref =
      searchParams.get('orderRef') ||
      searchParams.get('merchantOrderId') ||
      searchParams.get('merchantTransactionId');

    // If not in search params, check window.location.search or localStorage
    if (!ref && typeof window !== 'undefined') {
      const windowParams = new URLSearchParams(window.location.search);
      ref =
        windowParams.get('orderRef') ||
        windowParams.get('merchantOrderId') ||
        windowParams.get('merchantTransactionId');
    }

    if (!ref) {
      try {
        ref = localStorage.getItem('lils_pending_payment_order_ref') || '';
      } catch (_) {}
    }

    if (ref) {
      setOrderRef(ref);
    } else {
      setStatus('FAILED');
      setErrorMessage('No order reference found to verify payment.');
    }
  }, [location]);

  // Main status verification effect
  useEffect(() => {
    if (!orderRef) return;

    let isMounted = true;

    async function checkStatus() {
      try {
        const result = await verifyPhonePePayment(orderRef);

        if (!isMounted) return;

        if (result.state === 'COMPLETED' || result.success) {
          setStatus('COMPLETED');
          if (result.order) {
            setOrder(result.order);
          } else {
            // Fetch order from DB/local
            const fetched = await getOrderByRef(orderRef);
            if (fetched) setOrder(fetched);
          }
          // Clear cart on confirmed payment!
          clearCart();
          try {
            localStorage.removeItem('lils_pending_payment_order_ref');
          } catch (_) {}
        } else if (result.state === 'FAILED') {
          setStatus('FAILED');
          setErrorMessage(
            result.message ||
              result.error ||
              'Your payment was cancelled or declined by your bank/UPI app.'
          );
        } else {
          // PENDING - Poll up to 5 times (every 3 seconds)
          if (checkCount < 5) {
            pollTimerRef.current = setTimeout(() => {
              setCheckCount(prev => prev + 1);
            }, 3000);
          } else {
            setStatus('PENDING');
            const fetched = await getOrderByRef(orderRef);
            if (fetched) setOrder(fetched);
          }
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error during payment verification:', err);
        // Try local fetch
        const fetched = await getOrderByRef(orderRef);
        if (fetched && fetched.payment_status === 'paid') {
          setStatus('COMPLETED');
          setOrder(fetched);
          clearCart();
        } else {
          setStatus('FAILED');
          setErrorMessage(err.message || 'Unable to confirm payment status at this moment.');
        }
      }
    }

    checkStatus();

    return () => {
      isMounted = false;
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
  }, [orderRef, checkCount, clearCart]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Checkout', href: '/checkout' },
          { label: 'Payment Status' }
        ]}
      />

      {/* 1. CHECKING / LOADING STATE */}
      {status === 'checking' && (
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-brand-champagne/40 shadow-elevated text-center space-y-6 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-brand-champagne/20 text-brand-navy mx-auto flex items-center justify-center">
            <RefreshCw className="w-8 h-8 animate-spin text-brand-navy" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-rose">
              PhonePe Secure Payment Gateway
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-brand-navy font-normal">
              Confirming Your Payment
            </h1>
            <p className="text-xs text-brand-muted max-w-md mx-auto">
              Please wait a brief moment while we securely authenticate your transaction with PhonePe...
            </p>
          </div>
          {orderRef && (
            <p className="font-mono text-xs text-brand-muted bg-brand-ivory py-1.5 px-4 rounded-full inline-block border border-brand-border">
              Order Ref: {orderRef}
            </p>
          )}
        </div>
      )}

      {/* 2. SUCCESSFUL PAYMENT (COMPLETED) */}
      {status === 'COMPLETED' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-champagne/40 shadow-elevated space-y-6 animate-in zoom-in-95 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-luxury font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Payment Verified & Confirmed</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
            Thank You for Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto">
            Your payment via PhonePe has been successfully received. We have begun handcrafting and preparing your bespoke pieces at our Kollam boutique atelier.
          </p>

          <div className="p-5 rounded-2xl bg-brand-ivory border border-brand-border text-xs text-brand-navy space-y-2 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
              <span className="text-brand-muted font-medium">Order Reference:</span>
              <strong className="font-mono text-sm text-brand-navy font-bold">{orderRef}</strong>
            </div>

            {order?.phonepe_order_id && (
              <div className="flex justify-between items-center text-[11px] text-brand-muted">
                <span>PhonePe Transaction Ref:</span>
                <span className="font-mono">{order.phonepe_order_id}</span>
              </div>
            )}

            {order?.grand_total && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-muted font-medium">Total Paid:</span>
                <strong className="text-brand-navy font-sans font-bold">{formatINR(order.grand_total)}</strong>
              </div>
            )}

            {order?.customer_name && (
              <p className="text-brand-muted pt-1">
                <strong>Delivery Recipient:</strong> {order.customer_name}
                {order.shipping_address && `, ${order.shipping_address}, ${order.city}, ${order.state} - ${order.pincode}`}
              </p>
            )}

            {order?.customer_email && (
              <p className="text-brand-muted">
                <strong>Confirmation Email Sent To:</strong> {order.customer_email}
              </p>
            )}
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 leading-relaxed text-left space-y-1">
            <strong>Estimated Dispatch & Delivery:</strong>
            <p>
              Expected arrival in 3 to 7 business days via insured express domestic courier. You will receive an SMS and tracking notification once your package leaves our atelier.
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
              to="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-brand-border hover:border-brand-navy text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Continue Shopping
            </Link>
          </div>

          <p className="text-[11px] text-brand-muted pt-2">
            Questions regarding this order? Concierge assistance is available at{' '}
            <a href="mailto:lilsspunboutique@gmail.com" className="underline text-brand-navy">
              lilsspunboutique@gmail.com
            </a>{' '}
            or WhatsApp{' '}
            <a href="https://wa.me/919778465361" className="underline text-brand-navy">
              +91 97784 65361
            </a>.
          </p>
        </div>
      )}

      {/* 3. FAILED PAYMENT */}
      {status === 'FAILED' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-red-200 shadow-elevated space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
            <XCircle className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs uppercase tracking-luxury font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Payment Not Completed</span>
          </div>

          <h1 className="font-serif text-3xl text-brand-navy font-normal">
            Payment Could Not Be Processed
          </h1>

          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 text-xs text-red-900 max-w-md mx-auto text-left space-y-1">
            <strong>Reason:</strong>
            <p className="text-red-800">
              {errorMessage || 'The payment was cancelled or declined by your bank/UPI app. No charges were made to your account.'}
            </p>
          </div>

          <p className="text-xs text-brand-muted max-w-md mx-auto">
            Your cart items have been saved. You can retry paying with UPI, debit/credit cards, or switch to Cash on Delivery.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all flex items-center justify-center gap-2"
            >
              <span>Retry Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/cart"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-brand-border hover:border-brand-navy text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Return to Bag</span>
            </Link>
          </div>
        </div>
      )}

      {/* 4. PENDING CONFIRMATION */}
      {status === 'PENDING' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-200 shadow-elevated space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
            <Clock className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-luxury font-semibold">
            <span>Payment Awaiting Bank Confirmation</span>
          </div>

          <h1 className="font-serif text-3xl text-brand-navy font-normal">
            Payment is Being Processed
          </h1>

          <p className="text-xs text-brand-muted max-w-md mx-auto">
            Your bank or UPI app is currently confirming the transaction. As soon as PhonePe notifies our system, your order confirmation will update automatically.
          </p>

          {orderRef && (
            <p className="font-mono text-xs text-brand-muted bg-brand-ivory py-1.5 px-4 rounded-full inline-block border border-brand-border">
              Order Ref: {orderRef}
            </p>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setStatus('checking');
                setCheckCount(0);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Re-check Status</span>
            </button>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-brand-border hover:border-brand-navy text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

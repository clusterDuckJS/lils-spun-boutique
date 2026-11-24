import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Truck,
  Package,
  Clock,
  AlertTriangle,
  Loader2,
  ExternalLink,
  ShieldCheck,
  FileText,
  MapPin,
  Send
} from 'lucide-react';
import {
  ORDER_STATUSES,
  COMMON_COURIERS,
  updateOrderStatus
} from '../../services/orderService';
import { useToast } from '../../context/ToastContext';

export default function OrderStatusModal({ isOpen, onClose, order, onOrderUpdated }) {
  const { showToast } = useToast();

  const [status, setStatus] = useState('confirmed');
  const [courierPartner, setCourierPartner] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen && order) {
      setStatus(order.status || 'confirmed');
      setCourierPartner(order.courier_partner || '');
      setTrackingNumber(order.tracking_number || '');
      setTrackingUrl(order.tracking_url || '');
      setNotes(order.notes || '');
      setPaymentStatus(order.payment_status || 'pending');
      setErrorMessage('');
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  // Auto-generate common tracking URLs when courier and tracking number are entered
  const handleCourierChange = (courier) => {
    setCourierPartner(courier);
    if (trackingNumber && !trackingUrl) {
      autoFillTrackingUrl(courier, trackingNumber);
    }
  };

  const handleTrackingNumberChange = (num) => {
    setTrackingNumber(num);
    if (courierPartner && !trackingUrl) {
      autoFillTrackingUrl(courierPartner, num);
    }
  };

  const autoFillTrackingUrl = (courier, awb) => {
    const c = courier.toLowerCase();
    const cleanAwb = awb.trim();
    if (!cleanAwb) return;

    if (c.includes('blue dart')) {
      setTrackingUrl(`https://www.bluedart.com/tracking?trackNumber=${cleanAwb}`);
    } else if (c.includes('dtdc')) {
      setTrackingUrl(`https://www.dtdc.in/tracking/tracking_results.asp?Ttype=awb_no&strCNNo=${cleanAwb}`);
    } else if (c.includes('delhivery')) {
      setTrackingUrl(`https://www.delhivery.com/track/package/${cleanAwb}`);
    } else if (c.includes('india post') || c.includes('speed post')) {
      setTrackingUrl(`https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx`);
    } else if (c.includes('ecom express')) {
      setTrackingUrl(`https://ecomexpress.in/tracking/?awb=${cleanAwb}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        status,
        courier_partner: courierPartner.trim(),
        tracking_number: trackingNumber.trim(),
        tracking_url: trackingUrl.trim(),
        notes: notes.trim(),
        payment_status: paymentStatus
      };

      const result = await updateOrderStatus(order.order_ref, payload);

      if (result.success) {
        showToast(
          `Order ${order.order_ref} updated to "${ORDER_STATUSES[status]?.label || status}"`,
          'success'
        );
        if (onOrderUpdated) {
          onOrderUpdated(result.order);
        }
        onClose();
      } else {
        setErrorMessage(result.dbError || 'Failed to update order status');
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      setErrorMessage(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDispatchedOrLater = ['dispatched', 'out_for_delivery', 'delivered'].includes(status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-luxury border border-brand-border overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4.5 bg-brand-ivory border-b border-brand-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-champagne flex items-center justify-center font-serif text-lg">
              <Truck className="w-5 h-5 text-brand-champagne" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-brand-navy font-normal flex items-center gap-2">
                <span>Update Order Status</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-brand-navy text-brand-champagne font-bold">
                  {order.order_ref}
                </span>
              </h2>
              <p className="text-[11px] text-brand-muted">
                Patron: <strong className="text-brand-navy font-medium">{order.customer_name}</strong> • {order.city}, {order.state}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-brand-muted hover:text-brand-navy rounded-full hover:bg-brand-blush/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6 sm:p-7 space-y-6 flex-1 text-xs text-brand-navy">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form id="order-status-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Status Selection Cards */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-2">
                Fulfillment Status *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(ORDER_STATUSES).map(([key, info]) => {
                  const isSelected = status === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setStatus(key)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-navy bg-brand-navy text-brand-champagne shadow-sm ring-2 ring-brand-navy/20'
                          : 'border-brand-border bg-brand-ivory/40 hover:bg-white text-brand-navy'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-brand-champagne' : info.dotClass}`} />
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-brand-champagne" />}
                      </div>
                      <div>
                        <p className="font-semibold text-xs leading-snug">{info.label}</p>
                        <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-brand-champagne/80' : 'text-brand-muted'}`}>
                          {info.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Courier & Tracking Section (Prominent when Dispatched or Later) */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDispatchedOrLater
                ? 'bg-purple-50/50 border-purple-200'
                : 'bg-brand-ivory/30 border-brand-border/60'
            }`}>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy uppercase tracking-wider mb-3">
                <Truck className="w-4 h-4 text-purple-600" />
                <span>Shipping &amp; Courier Details</span>
                {isDispatchedOrLater && (
                  <span className="text-[10px] font-mono lowercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 ml-auto">
                    Active on dispatch
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-brand-navy mb-1">
                    Courier Partner
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      list="courier-list"
                      value={courierPartner}
                      onChange={(e) => handleCourierChange(e.target.value)}
                      placeholder="e.g. Blue Dart, DTDC, Delhivery..."
                      className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                    />
                    <datalist id="courier-list">
                      {COMMON_COURIERS.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-brand-navy mb-1">
                      Tracking / AWB Number
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => handleTrackingNumberChange(e.target.value)}
                      placeholder="e.g. BLUEDART-12345678"
                      className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-brand-navy mb-1">
                      Tracking URL (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={trackingUrl}
                        onChange={(e) => setTrackingUrl(e.target.value)}
                        placeholder="https://track..."
                        className="w-full px-3.5 py-2 pr-8 bg-white border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                      />
                      {trackingUrl && (
                        <a
                          href={trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy"
                          title="Test tracking link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Status & Internal Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-brand-ivory/40 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                >
                  <option value="paid">Paid (Verified)</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed / Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Order Value
                </label>
                <div className="px-3.5 py-2.5 bg-brand-ivory/60 border border-brand-border rounded-xl text-xs font-semibold text-brand-navy">
                  ₹{Number(order.grand_total).toLocaleString('en-IN')} ({order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''})
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                Admin Notes / Dispatch Remarks
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Blouse stitching measurements confirmed, dispatched in signature boutique presentation box..."
                className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
              />
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-brand-ivory border-t border-brand-border flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 bg-white border border-brand-border hover:border-brand-navy text-xs font-semibold text-brand-navy rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="order-status-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-xl text-xs uppercase tracking-luxury font-semibold shadow-md transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-champagne" />
                <span>Saving Status...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Update Fulfillment Status</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

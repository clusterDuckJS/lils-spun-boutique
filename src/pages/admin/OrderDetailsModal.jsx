import React from 'react';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  Phone,
  Copy,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Edit3,
  Calendar,
  FileText
} from 'lucide-react';
import { ORDER_STATUSES } from '../../services/orderService';
import { formatINR } from '../../data/products';
import { useToast } from '../../context/ToastContext';

export default function OrderDetailsModal({ isOpen, onClose, order, onEditStatus }) {
  const { showToast } = useToast();

  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES[order.status] || {
    label: order.status || 'Confirmed',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500'
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'info');
  };

  const formattedDate = new Date(order.created_at).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const fullAddress = `${order.shipping_address}, ${order.city}, ${order.state} - ${order.pincode}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-luxury border border-brand-border overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-brand-navy text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-champagne/20 border border-brand-champagne/30 text-brand-champagne flex items-center justify-center font-serif text-lg">
              <Package className="w-5 h-5 text-brand-champagne" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg text-white font-normal">
                  Order #{order.order_ref}
                </h2>
                <button
                  type="button"
                  onClick={() => copyToClipboard(order.order_ref, 'Order reference')}
                  className="p-1 text-white/60 hover:text-brand-champagne transition-colors"
                  title="Copy order ref"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-brand-champagne/80 font-light">
                Placed on {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onEditStatus) onEditStatus(order);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-champagne text-brand-navy text-xs font-semibold hover:bg-brand-champagne-light transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Update Status</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto p-6 sm:p-7 space-y-6 flex-1 text-xs text-brand-navy">
          
          {/* Status & Fulfillment Banner */}
          <div className="p-4 rounded-2xl bg-brand-ivory/60 border border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.badgeClass}`}>
                <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass}`} />
                <span>{statusInfo.label}</span>
              </span>

              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                order.payment_status === 'paid'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {order.payment_status === 'paid' ? 'Paid' : 'Payment Pending'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onEditStatus) onEditStatus(order);
              }}
              className="text-xs font-semibold text-brand-rose hover:text-brand-navy transition-colors inline-flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Change Status or Add Tracking</span>
            </button>
          </div>

          {/* Courier & Tracking Details Card (If available) */}
          {(order.tracking_number || order.courier_partner || order.notes) && (
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-purple-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-purple-600" />
                <span>Fulfillment &amp; Courier Tracking</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {order.courier_partner && (
                  <div>
                    <span className="text-[10px] uppercase text-purple-700 font-semibold block">Courier Partner</span>
                    <span className="font-medium text-xs text-brand-navy">{order.courier_partner}</span>
                  </div>
                )}
                {order.tracking_number && (
                  <div>
                    <span className="text-[10px] uppercase text-purple-700 font-semibold block">AWB / Tracking Number</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-xs font-bold text-brand-navy">{order.tracking_number}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(order.tracking_number, 'Tracking number')}
                        className="text-purple-600 hover:text-purple-800"
                        title="Copy tracking number"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
                {order.tracking_url && (
                  <div>
                    <span className="text-[10px] uppercase text-purple-700 font-semibold block">Tracking Link</span>
                    <a
                      href={order.tracking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-rose hover:underline font-semibold"
                    >
                      <span>Track Shipment</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {order.notes && (
                <div className="pt-2 border-t border-purple-200/60 mt-2">
                  <span className="text-[10px] uppercase text-purple-700 font-semibold block">Admin Notes:</span>
                  <p className="text-xs text-brand-text/90 italic font-light mt-0.5">{order.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Customer & Delivery Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Customer Details */}
            <div className="p-4 rounded-2xl bg-white border border-brand-border space-y-2.5">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-navy pb-1 border-b border-brand-border/60">
                Customer Information
              </h4>
              <div className="space-y-1.5 pt-1">
                <p className="font-serif text-sm font-semibold text-brand-navy">
                  {order.customer_name}
                </p>
                <div className="flex items-center gap-2 text-brand-muted">
                  <Mail className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                  <a href={`mailto:${order.customer_email}`} className="hover:text-brand-navy truncate">
                    {order.customer_email || 'No email provided'}
                  </a>
                </div>
                {order.customer_phone && (
                  <div className="flex items-center gap-2 text-brand-muted">
                    <Phone className="w-3.5 h-3.5 text-brand-champagne shrink-0" />
                    <a href={`tel:${order.customer_phone}`} className="hover:text-brand-navy">
                      {order.customer_phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-4 rounded-2xl bg-white border border-brand-border space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-brand-border/60">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-navy">
                  Shipping Destination
                </h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard(fullAddress, 'Shipping address')}
                  className="text-brand-rose hover:text-brand-navy flex items-center gap-1 text-[11px] font-medium"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
              <div className="pt-1 flex items-start gap-2 text-brand-navy">
                <MapPin className="w-3.5 h-3.5 text-brand-rose shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {order.shipping_address}<br />
                  <strong className="font-semibold">{order.city}, {order.state} - {order.pincode}</strong>
                </p>
              </div>
            </div>

          </div>

          {/* Ordered Items Table */}
          <div className="bg-white rounded-2xl border border-brand-border overflow-hidden">
            <div className="px-4 py-3 bg-brand-ivory/60 border-b border-brand-border font-semibold text-xs uppercase tracking-wider text-brand-navy">
              Ordered Boutique Items ({order.items?.length || 0})
            </div>

            <div className="divide-y divide-brand-border/60">
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-brand-ivory/20 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-16 object-cover rounded-xl border border-brand-border shrink-0 shadow-2xs"
                        />
                      ) : (
                        <div className="w-14 h-16 rounded-xl bg-brand-ivory border border-brand-border flex items-center justify-center text-brand-muted shrink-0">
                          <Package className="w-6 h-6" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h5 className="font-serif text-sm text-brand-navy font-normal truncate">
                          {item.name}
                        </h5>
                        <p className="text-xs text-brand-muted mt-0.5">
                          Size: <strong className="text-brand-navy">{item.selectedSize || item.size || 'Free Size'}</strong> • Qty: {item.quantity || 1}
                        </p>
                        <p className="text-[11px] text-brand-muted">
                          Unit Price: {formatINR(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif text-sm font-semibold text-brand-navy">
                        {formatINR((item.price || 0) * (item.quantity || 1))}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-brand-muted">
                  No line items recorded for this order.
                </div>
              )}
            </div>

            {/* Total Calculation breakdown */}
            <div className="bg-brand-ivory/40 p-4 border-t border-brand-border space-y-1.5 text-xs">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span>{formatINR(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Shipping Fee</span>
                <span>{order.shipping_fee > 0 ? formatINR(order.shipping_fee) : 'Complimentary'}</span>
              </div>
              <div className="flex justify-between font-serif text-base font-semibold text-brand-navy pt-2 border-t border-brand-border/60">
                <span>Grand Total</span>
                <span>{formatINR(order.grand_total || 0)}</span>
              </div>
            </div>
          </div>

          {/* Payment & Transaction Info */}
          <div className="p-4 rounded-2xl bg-white border border-brand-border space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-navy pb-1 border-b border-brand-border/60 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-brand-champagne" />
              <span>Payment &amp; Gateway Details</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <span className="text-[10px] uppercase text-brand-muted font-medium block">Method</span>
                <span className="font-medium text-xs text-brand-navy capitalize">
                  {order.payment_method?.replace(/_/g, ' ') || 'UPI / Gateway'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-brand-muted font-medium block">Payment Status</span>
                <span className="font-medium text-xs capitalize text-brand-navy">
                  {order.payment_status || 'Pending'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-brand-muted font-medium block">PhonePe Order ID</span>
                <span className="font-mono text-[11px] truncate block text-brand-navy" title={order.phonepe_order_id}>
                  {order.phonepe_order_id || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-brand-muted font-medium block">Transaction ID</span>
                <span className="font-mono text-[11px] truncate block text-brand-navy" title={order.transaction_id}>
                  {order.transaction_id || 'N/A'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-brand-ivory border-t border-brand-border flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-brand-border hover:border-brand-navy text-xs font-semibold text-brand-navy rounded-xl transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onEditStatus) onEditStatus(order);
            }}
            className="px-5 py-2 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-xl text-xs uppercase tracking-wider font-semibold shadow-md transition-all flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Update Fulfillment &amp; Tracking</span>
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit3,
  Eye,
  RefreshCw,
  Copy,
  MapPin,
  Mail,
  Phone,
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  Layers,
  Sparkles,
  CreditCard
} from 'lucide-react';
import {
  getAllOrders,
  updateOrderStatus,
  ORDER_STATUSES
} from '../../services/orderService';
import { formatINR } from '../../data/products';
import { useToast } from '../../context/ToastContext';
import OrderStatusModal from './OrderStatusModal';
import OrderDetailsModal from './OrderDetailsModal';

export default function OrdersManagement() {
  const { showToast } = useToast();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'amount_high', 'amount_low'

  // Modal states
  const [statusModalOrder, setStatusModalOrder] = useState(null);
  const [detailsModalOrder, setDetailsModalOrder] = useState(null);

  const fetchOrders = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      showToast('Could not fetch orders list', 'error');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Quick inline status change handler
  const handleQuickStatusChange = async (orderRef, newStatus) => {
    try {
      const result = await updateOrderStatus(orderRef, { status: newStatus });
      if (result.success) {
        showToast(`Order ${orderRef} updated to ${ORDER_STATUSES[newStatus]?.label || newStatus}`, 'success');
        setOrders(prev => prev.map(o => (o.order_ref === orderRef ? result.order : o)));
      }
    } catch (err) {
      showToast(`Update failed: ${err.message}`, 'error');
    }
  };

  const handleOrderUpdated = (updatedOrder) => {
    setOrders(prev => prev.map(o => (o.order_ref === updatedOrder.order_ref ? updatedOrder : o)));
    if (detailsModalOrder && detailsModalOrder.order_ref === updatedOrder.order_ref) {
      setDetailsModalOrder(updatedOrder);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'info');
  };

  // Filtered & sorted orders
  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        // Status filter
        if (statusFilter !== 'all' && o.status !== statusFilter) return false;

        // Payment status filter
        if (paymentFilter !== 'all' && o.payment_status !== paymentFilter) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesRef = o.order_ref?.toLowerCase().includes(q);
          const matchesName = o.customer_name?.toLowerCase().includes(q);
          const matchesEmail = o.customer_email?.toLowerCase().includes(q);
          const matchesPhone = o.customer_phone?.toLowerCase().includes(q);
          const matchesCity = o.city?.toLowerCase().includes(q);
          const matchesAwb = o.tracking_number?.toLowerCase().includes(q);
          return matchesRef || matchesName || matchesEmail || matchesPhone || matchesCity || matchesAwb;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
        if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
        if (sortBy === 'amount_high') return (b.grand_total || 0) - (a.grand_total || 0);
        if (sortBy === 'amount_low') return (a.grand_total || 0) - (b.grand_total || 0);
        return 0;
      });
  }, [orders, statusFilter, paymentFilter, searchQuery, sortBy]);

  // Key performance statistics
  const stats = useMemo(() => {
    const total = orders.length;
    const confirmed = orders.filter(o => o.status === 'confirmed').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    const dispatched = orders.filter(o => ['dispatched', 'out_for_delivery'].includes(o.status)).length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const actionRequired = confirmed + processing;

    // Gross sales for paid orders
    const paidRevenue = orders
      .filter(o => o.payment_status === 'paid' || o.status === 'delivered' || o.status === 'dispatched')
      .reduce((sum, o) => sum + (o.grand_total || 0), 0);

    const countsByStatus = {};
    Object.keys(ORDER_STATUSES).forEach(k => {
      countsByStatus[k] = orders.filter(o => o.status === k).length;
    });

    return {
      total,
      confirmed,
      processing,
      dispatched,
      delivered,
      actionRequired,
      paidRevenue,
      countsByStatus
    };
  }, [orders]);

  return (
    <div className="space-y-6">
      
      {/* Top Action & Subheading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl text-brand-navy font-normal">
            Orders &amp; Customer Fulfillment
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted font-light mt-0.5">
            Monitor incoming patron purchases, update dispatch stages, and manage courier tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchOrders()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-brand-border hover:border-brand-navy text-xs font-semibold text-brand-navy rounded-xl shadow-2xs hover:shadow-xs transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-brand-rose' : 'text-brand-navy'}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-2xs">
          <div className="flex items-center justify-between text-brand-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Orders</span>
            <Package className="w-4 h-4 text-brand-rose" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-brand-navy">{stats.total}</p>
          <p className="text-[11px] text-brand-muted mt-1 font-light">
            All-time placed orders
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-2xs">
          <div className="flex items-center justify-between text-brand-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Needs Action</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-brand-navy">{stats.actionRequired}</p>
          <p className="text-[11px] text-amber-700 font-medium mt-1">
            {stats.confirmed} Confirmed • {stats.processing} In Packing
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-2xs">
          <div className="flex items-center justify-between text-brand-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">In Transit / Dispatched</span>
            <Truck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-brand-navy">{stats.dispatched}</p>
          <p className="text-[11px] text-purple-700 font-light mt-1">
            Active with courier partner
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-2xs">
          <div className="flex items-center justify-between text-brand-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Revenue</span>
            <Sparkles className="w-4 h-4 text-brand-champagne" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-brand-navy">{formatINR(stats.paidRevenue)}</p>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">
            {stats.delivered} Orders Delivered
          </p>
        </div>

      </div>

      {/* Filter Bar & Controls */}
      <div className="bg-white rounded-2xl p-4 border border-brand-border shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ref (LILS-...), customer name, phone, city..."
              className="w-full pl-10 pr-4 py-2 bg-brand-ivory/40 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy placeholder-brand-muted/60 focus:outline-none focus:border-brand-rose"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-navy"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Payment filter */}
            <div className="flex items-center gap-1.5 text-xs text-brand-navy">
              <span className="text-brand-muted">Payment:</span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid Only</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Sort order */}
            <div className="flex items-center gap-1.5 text-xs text-brand-navy">
              <span className="text-brand-muted">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount_high">Highest Amount</option>
                <option value="amount_low">Lowest Amount</option>
              </select>
            </div>
          </div>

        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-brand-border/60">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              statusFilter === 'all'
                ? 'bg-brand-navy text-brand-champagne shadow-2xs'
                : 'bg-brand-ivory/60 text-brand-navy hover:bg-brand-ivory border border-brand-border'
            }`}
          >
            All Orders ({orders.length})
          </button>

          {Object.entries(ORDER_STATUSES).map(([key, info]) => {
            const count = stats.countsByStatus[key] || 0;
            const isSelected = statusFilter === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setStatusFilter(key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-brand-navy text-brand-champagne shadow-2xs'
                    : 'bg-brand-ivory/60 text-brand-navy hover:bg-brand-ivory border border-brand-border'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-brand-champagne' : info.dotClass}`} />
                <span>{info.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-brand-champagne text-brand-navy' : 'bg-brand-navy/10 text-brand-navy'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Orders List Container */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-luxury overflow-hidden">
        
        <div className="px-6 py-4 border-b border-brand-border bg-brand-ivory/40 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider font-semibold text-brand-navy">
            Showing {filteredOrders.length} of {orders.length} Orders
          </p>
          <span className="text-[11px] text-brand-muted">
            Click any order to view breakdown or update tracking details
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-brand-muted space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-brand-rose mx-auto" />
            <p className="text-xs font-medium">Fetching orders from boutique database...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-ivory border border-brand-border flex items-center justify-center mx-auto mb-3 text-brand-muted">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-brand-navy font-normal mb-1">
              No orders found matching criteria
            </h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto mb-4 font-light">
              Try adjusting your search query, status filters, or clear filters to view all orders.
            </p>
            {(searchQuery || statusFilter !== 'all' || paymentFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPaymentFilter('all');
                }}
                className="px-4 py-2 bg-brand-navy text-brand-champagne rounded-xl text-xs uppercase tracking-wider font-semibold"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-brand-border">
            {filteredOrders.map((order) => {
              const statusInfo = ORDER_STATUSES[order.status] || {
                label: order.status || 'Confirmed',
                badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
                dotClass: 'bg-blue-500'
              };

              const formattedDate = new Date(order.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={order.order_ref || order.id}
                  className="p-5 hover:bg-brand-ivory/30 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                >
                  
                  {/* Left Column: Order Identity & Customer */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-xs sm:text-sm text-brand-navy tracking-wide">
                        #{order.order_ref}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(order.order_ref, 'Order reference')}
                        className="text-brand-muted hover:text-brand-navy"
                        title="Copy order ref"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-xs text-brand-muted">• {formattedDate}</span>

                      {/* Payment Status Pill */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                        order.payment_status === 'paid'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {order.payment_status === 'paid' ? 'Paid' : 'Payment Pending'}
                      </span>
                    </div>

                    {/* Customer Contact */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-navy">
                      <span className="font-semibold text-brand-navy">{order.customer_name}</span>
                      {order.customer_phone && (
                        <span className="text-brand-muted flex items-center gap-1">
                          <Phone className="w-3 h-3 text-brand-rose" />
                          <span>{order.customer_phone}</span>
                        </span>
                      )}
                      <span className="text-brand-muted flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-champagne" />
                        <span>{order.city}, {order.state}</span>
                      </span>
                    </div>

                    {/* Items Preview thumbnails */}
                    <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                      {Array.isArray(order.items) && order.items.slice(0, 4).map((item, idx) => (
                        <div
                          key={idx}
                          className="relative w-10 h-12 rounded-lg overflow-hidden bg-brand-ivory border border-brand-border shrink-0"
                          title={`${item.name} (${item.selectedSize || 'Free Size'}) x ${item.quantity || 1}`}
                        >
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-brand-muted">
                              {item.name?.slice(0, 2)}
                            </div>
                          )}
                        </div>
                      ))}
                      {order.items?.length > 4 && (
                        <span className="text-[11px] text-brand-muted font-medium pl-1">
                          +{order.items.length - 4} more
                        </span>
                      )}
                      <span className="text-xs text-brand-muted font-light pl-2">
                        {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Tracking details if dispatched */}
                    {order.tracking_number && (
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-800 text-[11px] font-mono border border-purple-200">
                        <Truck className="w-3.5 h-3.5 text-purple-600" />
                        <span>{order.courier_partner || 'Courier'}: {order.tracking_number}</span>
                        {order.tracking_url && (
                          <a
                            href={order.tracking_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-900 underline font-sans ml-1 text-[10px]"
                          >
                            Track
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Middle Column: Amount */}
                  <div className="shrink-0 lg:text-right">
                    <span className="font-serif text-lg font-semibold text-brand-navy block">
                      {formatINR(order.grand_total || 0)}
                    </span>
                    <span className="text-[11px] text-brand-muted capitalize">
                      {order.payment_method?.replace(/_/g, ' ') || 'UPI'}
                    </span>
                  </div>

                  {/* Right Column: Status & Action Buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-brand-border/60">
                    
                    {/* Inline Quick Status Selector */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => handleQuickStatusChange(order.order_ref, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border appearance-none pr-7 cursor-pointer transition-colors ${statusInfo.badgeClass}`}
                      >
                        {Object.entries(ORDER_STATUSES).map(([key, info]) => (
                          <option key={key} value={key} className="bg-white text-brand-navy">
                            {info.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span className={`w-1.5 h-1.5 rounded-full block ${statusInfo.dotClass}`} />
                      </div>
                    </div>

                    {/* Update Fulfillment & Tracking Button */}
                    <button
                      type="button"
                      onClick={() => setStatusModalOrder(order)}
                      className="px-3 py-1.5 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-2xs"
                      title="Update status, courier, tracking AWB"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Fulfill</span>
                    </button>

                    {/* View Full Order Details */}
                    <button
                      type="button"
                      onClick={() => setDetailsModalOrder(order)}
                      className="p-1.5 rounded-xl border border-brand-border hover:border-brand-navy text-brand-navy hover:bg-brand-ivory transition-colors"
                      title="View complete order details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Order Status & Fulfillment Modal */}
      <OrderStatusModal
        isOpen={Boolean(statusModalOrder)}
        onClose={() => setStatusModalOrder(null)}
        order={statusModalOrder}
        onOrderUpdated={handleOrderUpdated}
      />

      {/* Order Complete Details Modal */}
      <OrderDetailsModal
        isOpen={Boolean(detailsModalOrder)}
        onClose={() => setDetailsModalOrder(null)}
        order={detailsModalOrder}
        onEditStatus={(ord) => setStatusModalOrder(ord)}
      />

    </div>
  );
}

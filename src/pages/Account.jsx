import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, Package, MapPin, Shield, LogOut, ChevronRight, Sparkles, 
  ShoppingBag, Heart, CheckCircle2, Clock, Truck, AlertCircle, 
  Save, Loader2, ArrowRight, ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { getCustomerOrders } from '../services/orderService';
import { formatINR } from '../data/products';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Account() {
  const { user, profile, updateProfile, updatePassword, signOut } = useAuth();
  const { wishlistCount } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get('tab') || 'overview';
  const setTab = (tab) => setSearchParams({ tab });

  // Orders state
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [updatingPass, setUpdatingPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Selected order for detailed modal view
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sync profile data to form
  useEffect(() => {
    if (profile) {
      setProfileForm({
        fullName: profile.fullName || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        pincode: profile.pincode || ''
      });
    }
  }, [profile]);

  // Load orders for customer email
  useEffect(() => {
    let isMounted = true;
    async function fetchOrders() {
      if (user?.email) {
        setLoadingOrders(true);
        const data = await getCustomerOrders(user.email);
        if (isMounted) {
          setOrders(data);
          setLoadingOrders(false);
        }
      } else {
        if (isMounted) setLoadingOrders(false);
      }
    }
    fetchOrders();
    return () => { isMounted = false; };
  }, [user?.email]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);

    const result = await updateProfile(profileForm);
    setSavingProfile(false);

    if (result.success) {
      addToast({
        title: 'Profile Updated',
        message: 'Your personal details and address have been saved.',
        type: 'info'
      });
    } else {
      addToast({
        title: 'Update Failed',
        message: result.error || 'Could not update profile.',
        type: 'info'
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (passwordForm.newPassword.length < 6) {
      setPassError('Password must be at least 6 characters.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPassError('Passwords do not match.');
      return;
    }

    setUpdatingPass(true);
    const result = await updatePassword(passwordForm.newPassword);
    setUpdatingPass(false);

    if (result.success) {
      setPassSuccess('Your password has been securely updated.');
      setPasswordForm({ newPassword: '', confirmPassword: '' });
      addToast({
        title: 'Password Changed',
        message: 'Your account credentials have been updated.',
        type: 'info'
      });
    } else {
      setPassError(result.error || 'Failed to update password.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    addToast({
      title: 'Signed Out',
      message: 'You have safely signed out of your boutique account.',
      type: 'info'
    });
    navigate('/');
  };

  const getStatusBadge = (status) => {
    const s = (status || 'confirmed').toLowerCase();
    if (s === 'delivered') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3 h-3" /> Delivered
        </span>
      );
    }
    if (s === 'shipped') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-800">
          <Truck className="w-3 h-3" /> In Transit
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800">
        <Clock className="w-3 h-3" /> Order Confirmed
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-brand-ivory pb-24">
      {/* Breadcrumb row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'My Account' }]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        
        {/* Account Header Hero */}
        <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-blush/30 border-2 border-brand-champagne/40 flex items-center justify-center text-brand-navy font-serif text-2xl font-semibold shadow-inner">
                {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'P'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl text-brand-navy font-medium">
                    Namaste, {profile?.fullName || 'Boutique Patron'}
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-champagne/20 text-brand-navy text-[10px] uppercase tracking-luxury font-medium border border-brand-champagne/40">
                    <Sparkles className="w-3 h-3 text-brand-rose" /> Patron Member
                  </span>
                </div>
                <p className="text-xs text-brand-muted mt-1">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleSignOut}
                className="py-2 px-3.5 rounded-xl border border-brand-border hover:bg-brand-blush/20 text-brand-navy text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 text-brand-rose" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-3 space-y-1 sticky top-28">
              <button
                type="button"
                onClick={() => setTab('overview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  currentTab === 'overview'
                    ? 'bg-brand-navy text-brand-champagne font-semibold shadow-soft'
                    : 'text-brand-navy hover:bg-brand-ivory'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-brand-rose" />
                  <span>Overview</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => setTab('orders')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  currentTab === 'orders'
                    ? 'bg-brand-navy text-brand-champagne font-semibold shadow-soft'
                    : 'text-brand-navy hover:bg-brand-ivory'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-brand-champagne" />
                  <span>My Orders</span>
                </div>
                {orders.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-rose text-white text-[10px] font-sans font-bold">
                    {orders.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setTab('address')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  currentTab === 'address'
                    ? 'bg-brand-navy text-brand-champagne font-semibold shadow-soft'
                    : 'text-brand-navy hover:bg-brand-ivory'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-rose" />
                  <span>Profile & Address</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => setTab('security')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  currentTab === 'security'
                    ? 'bg-brand-navy text-brand-champagne font-semibold shadow-soft'
                    : 'text-brand-navy hover:bg-brand-ivory'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-brand-champagne" />
                  <span>Security</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            </div>
          </div>

          {/* Main Content Pane */}
          <div className="lg:col-span-3">

            {/* TAB 1: OVERVIEW */}
            {currentTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-brand-border/80 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-sans uppercase tracking-luxury text-brand-muted">Orders Placed</span>
                      <Package className="w-4 h-4 text-brand-rose" />
                    </div>
                    <div className="font-serif text-3xl font-medium text-brand-navy">
                      {loadingOrders ? '...' : orders.length}
                    </div>
                    <button
                      type="button"
                      onClick={() => setTab('orders')}
                      className="text-[11px] text-brand-rose hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      <span>View order history</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-brand-border/80 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-sans uppercase tracking-luxury text-brand-muted">Saved Wishlist</span>
                      <Heart className="w-4 h-4 text-brand-rose fill-brand-rose" />
                    </div>
                    <div className="font-serif text-3xl font-medium text-brand-navy">
                      {wishlistCount}
                    </div>
                    <Link
                      to="/wishlist"
                      className="text-[11px] text-brand-rose hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      <span>Explore saved pieces</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-brand-border/80 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-sans uppercase tracking-luxury text-brand-muted">Primary Address</span>
                      <MapPin className="w-4 h-4 text-brand-champagne" />
                    </div>
                    <div className="text-sm font-medium text-brand-navy truncate">
                      {profile?.city ? `${profile.city}, ${profile.state || 'India'}` : 'Not added yet'}
                    </div>
                    <button
                      type="button"
                      onClick={() => setTab('address')}
                      className="text-[11px] text-brand-rose hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      <span>{profile?.city ? 'Manage address' : 'Add shipping address'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Recent Order Preview */}
                <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-border/60">
                    <h2 className="font-serif text-xl text-brand-navy font-medium">Recent Order</h2>
                    {orders.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setTab('orders')}
                        className="text-xs text-brand-rose hover:underline font-medium"
                      >
                        See all ({orders.length})
                      </button>
                    )}
                  </div>

                  {loadingOrders ? (
                    <div className="py-8 text-center text-xs text-brand-muted">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto text-brand-rose mb-2" />
                      Loading recent order history...
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {(() => {
                        const latest = orders[0];
                        return (
                          <div className="p-4 rounded-xl bg-brand-ivory/60 border border-brand-border/60">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                              <div>
                                <span className="font-mono text-xs font-bold text-brand-navy">
                                  {latest.order_ref}
                                </span>
                                <span className="text-xs text-brand-muted ml-2">
                                  • {new Date(latest.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                              {getStatusBadge(latest.status)}
                            </div>

                            {/* Items row */}
                            <div className="flex items-center gap-3 overflow-x-auto py-2">
                              {Array.isArray(latest.items) && latest.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 shrink-0 bg-white p-2 rounded-lg border border-brand-border/60">
                                  {it.image && (
                                    <img src={it.image} alt={it.name} className="w-10 h-10 object-cover rounded" />
                                  )}
                                  <div className="text-xs">
                                    <p className="font-medium text-brand-navy truncate max-w-[140px]">{it.name}</p>
                                    <p className="text-brand-muted text-[11px]">Qty: {it.quantity} • {formatINR(it.price)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-border/40 text-xs">
                              <span className="text-brand-muted">Total: <strong className="text-brand-navy">{formatINR(latest.grand_total)}</strong></span>
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(latest)}
                                className="text-brand-rose hover:underline font-medium inline-flex items-center gap-1"
                              >
                                View full details <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-10 h-10 text-brand-muted/40 mx-auto mb-2" />
                      <p className="text-xs text-brand-muted">You have not placed any orders yet.</p>
                      <Link
                        to="/collections/new-arrivals"
                        className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy text-brand-champagne rounded-xl text-xs font-medium hover:bg-brand-navy-light transition-colors"
                      >
                        Explore Handloom Collection
                      </Link>
                    </div>
                  )}
                </div>

                {/* Boutique Concierge Assistance */}
                <div className="bg-brand-blush/20 rounded-2xl border border-brand-champagne/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg text-brand-navy font-medium">Bespoke Styling & Concierge</h3>
                    <p className="text-xs text-brand-muted mt-1 max-w-md">
                      Need custom blouse tailoring, bespoke fall & edging, or bridal consultation? Our boutique master stylists are available for you.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="py-2.5 px-4 rounded-xl bg-white border border-brand-border text-brand-navy hover:border-brand-navy text-xs font-medium transition-colors shrink-0"
                  >
                    Contact Boutique Stylist
                  </Link>
                </div>

              </div>
            )}

            {/* TAB 2: MY ORDERS */}
            {currentTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-border/60">
                  <div>
                    <h2 className="font-serif text-2xl text-brand-navy font-medium">My Orders</h2>
                    <p className="text-xs text-brand-muted mt-1">
                      Track current shipments and view heirloom purchase records.
                    </p>
                  </div>
                  <span className="text-xs font-medium text-brand-navy bg-brand-ivory px-3 py-1 rounded-full border border-brand-border">
                    {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                  </span>
                </div>

                {loadingOrders ? (
                  <div className="py-12 text-center text-xs text-brand-muted">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-rose mb-2" />
                    Fetching orders from boutique database...
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.order_ref || order.id}
                        className="rounded-xl border border-brand-border/80 overflow-hidden hover:border-brand-navy/30 transition-all bg-white"
                      >
                        {/* Order Header bar */}
                        <div className="bg-brand-ivory/60 p-4 border-b border-brand-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-4">
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-brand-muted block">Order Ref</span>
                              <span className="font-mono font-bold text-brand-navy">{order.order_ref}</span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-brand-muted block">Placed On</span>
                              <span className="text-brand-text">
                                {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-brand-muted block">Grand Total</span>
                              <span className="font-bold text-brand-navy">{formatINR(order.grand_total)}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {getStatusBadge(order.status)}
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1 rounded-lg border border-brand-border hover:bg-white text-[11px] font-medium text-brand-navy transition-colors"
                            >
                              Details
                            </button>
                          </div>
                        </div>

                        {/* Order Items List */}
                        <div className="p-4 divide-y divide-brand-border/40">
                          {Array.isArray(order.items) && order.items.map((item, idx) => (
                            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-16 object-cover rounded-lg border border-brand-border/50 shrink-0"
                                  />
                                ) : (
                                  <div className="w-14 h-16 bg-brand-ivory rounded-lg border border-brand-border/50 flex items-center justify-center shrink-0">
                                    <Package className="w-6 h-6 text-brand-muted/40" />
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-medium text-sm text-brand-navy">{item.name}</h4>
                                  <p className="text-xs text-brand-muted mt-0.5">
                                    Size: {item.selectedSize || 'Free Size'} • Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-serif text-sm font-semibold text-brand-navy">
                                  {formatINR(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Destination Footer */}
                        <div className="bg-brand-ivory/30 px-4 py-2.5 border-t border-brand-border/40 text-[11px] text-brand-muted flex items-center justify-between">
                          <span className="truncate max-w-sm">
                            <MapPin className="w-3 h-3 inline mr-1 text-brand-rose" />
                            Shipping to: {order.shipping_address}, {order.city}, {order.state} - {order.pincode}
                          </span>
                          <span className="capitalize">
                            Payment: {order.payment_method || 'UPI'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Package className="w-12 h-12 text-brand-muted/30 mx-auto mb-3" />
                    <h3 className="font-serif text-xl text-brand-navy font-medium mb-1">No Orders Found</h3>
                    <p className="text-xs text-brand-muted max-w-sm mx-auto mb-6">
                      You haven't placed an order with this account yet. When you complete checkout, your order updates and tracking will appear here.
                    </p>
                    <Link
                      to="/collections/new-arrivals"
                      className="py-2.5 px-5 bg-brand-navy text-brand-champagne rounded-xl text-xs font-medium uppercase tracking-luxury hover:bg-brand-navy-light transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PROFILE & ADDRESS */}
            {currentTab === 'address' && (
              <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6 sm:p-8">
                <div className="mb-6 pb-3 border-b border-brand-border/60">
                  <h2 className="font-serif text-2xl text-brand-navy font-medium">Profile & Shipping Address</h2>
                  <p className="text-xs text-brand-muted mt-1">
                    Keep your contact details and default delivery address updated for seamless, 1-click checkout.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xs font-sans uppercase tracking-luxury text-brand-rose font-semibold mb-3">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.fullName}
                          onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-navy"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled
                          value={user?.email || ''}
                          className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs text-brand-muted cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                          Contact Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-navy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary Delivery Address */}
                  <div className="pt-4 border-t border-brand-border/60">
                    <h3 className="text-xs font-sans uppercase tracking-luxury text-brand-rose font-semibold mb-3">
                      Default Delivery Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                          Street / Apartment / House No.
                        </label>
                        <input
                          type="text"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                          placeholder="e.g. 42, Lotus Villa, Panampilly Nagar"
                          className="w-full px-3.5 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-navy"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                            City
                          </label>
                          <input
                            type="text"
                            value={profileForm.city}
                            onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                            placeholder="e.g. Kochi"
                            className="w-full px-3.5 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-navy"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                            State
                          </label>
                          <input
                            type="text"
                            value={profileForm.state}
                            onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                            placeholder="e.g. Kerala"
                            className="w-full px-3.5 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-navy"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                            Pincode
                          </label>
                          <input
                            type="text"
                            value={profileForm.pincode}
                            onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                            placeholder="e.g. 682036"
                            className="w-full px-3.5 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-navy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="py-2.5 px-6 bg-brand-navy text-brand-champagne hover:bg-brand-navy-light rounded-xl font-medium text-xs uppercase tracking-luxury transition-all inline-flex items-center gap-2 shadow-soft disabled:opacity-50"
                    >
                      {savingProfile ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving Changes...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: SECURITY */}
            {currentTab === 'security' && (
              <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-6 sm:p-8">
                <div className="mb-6 pb-3 border-b border-brand-border/60">
                  <h2 className="font-serif text-2xl text-brand-navy font-medium">Security & Credentials</h2>
                  <p className="text-xs text-brand-muted mt-1">
                    Manage your password and protect your boutique patron account.
                  </p>
                </div>

                {passSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{passSuccess}</span>
                  </div>
                )}

                {passError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{passError}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                      New Password <span className="text-[10px] text-brand-muted lowercase font-normal">(min 6 chars)</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-navy mb-1 uppercase tracking-wider">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={updatingPass}
                    className="py-2.5 px-6 bg-brand-navy text-brand-champagne hover:bg-brand-navy-light rounded-xl font-medium text-xs uppercase tracking-luxury transition-all inline-flex items-center gap-2 shadow-soft disabled:opacity-50 mt-2"
                  >
                    {updatingPass ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-brand-border/60 text-xs text-brand-muted">
                  <p className="font-medium text-brand-navy mb-1">Session Information</p>
                  <p className="text-[11px]">
                    Signed in with Supabase Auth session. For security, sessions refresh automatically with token encryption.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-brand-border shadow-dropdown p-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-brand-muted">Order Reference</span>
                <h3 className="font-mono font-bold text-lg text-brand-navy">{selectedOrder.order_ref}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center text-brand-navy hover:bg-brand-border transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-muted">Status:</span>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-muted">Date:</span>
                <span className="font-medium text-brand-navy">
                  {new Date(selectedOrder.created_at).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-muted">Payment Method:</span>
                <span className="font-medium uppercase text-brand-navy">{selectedOrder.payment_method || 'UPI'}</span>
              </div>

              {/* Items */}
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-luxury text-brand-muted font-semibold mb-2">
                  Items Purchased
                </h4>
                <div className="space-y-3 bg-brand-ivory/50 p-3 rounded-xl border border-brand-border/60">
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        {it.image && (
                          <img src={it.image} alt={it.name} className="w-10 h-10 object-cover rounded" />
                        )}
                        <div>
                          <p className="font-medium text-brand-navy">{it.name}</p>
                          <p className="text-[11px] text-brand-muted">Size: {it.selectedSize || 'Free Size'} × {it.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">{formatINR(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-luxury text-brand-muted font-semibold mb-1">
                  Delivery Destination
                </h4>
                <p className="text-xs text-brand-navy leading-relaxed bg-brand-ivory/50 p-3 rounded-xl border border-brand-border/60">
                  {selectedOrder.customer_name}<br />
                  {selectedOrder.shipping_address}<br />
                  {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}<br />
                  Phone: {selectedOrder.customer_phone || 'Not provided'}
                </p>
              </div>

              {/* Totals */}
              <div className="pt-3 border-t border-brand-border space-y-1.5 text-xs">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span>{formatINR(selectedOrder.subtotal || selectedOrder.grand_total)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping Fee</span>
                  <span>{selectedOrder.shipping_fee ? formatINR(selectedOrder.shipping_fee) : 'Complimentary'}</span>
                </div>
                <div className="flex justify-between font-serif text-base font-semibold text-brand-navy pt-2 border-t border-brand-border/60">
                  <span>Grand Total</span>
                  <span>{formatINR(selectedOrder.grand_total)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border text-center">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 bg-brand-navy text-brand-champagne rounded-xl text-xs font-medium uppercase tracking-luxury hover:bg-brand-navy-light transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

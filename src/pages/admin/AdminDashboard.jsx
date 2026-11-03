import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Database,
  LogOut,
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  Star,
  Tag,
  AlertTriangle,
  FileCheck2,
  PackageCheck
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useToast } from '../../context/ToastContext';
import { formatINR } from '../../data/products';
import { VALID_CATEGORIES, CATEGORY_NAMES } from '../../services/productService';
import { isSupabaseConfigured } from '../../lib/supabase';
import ProductFormModal from './ProductFormModal';
import DatabaseSyncModal from './DatabaseSyncModal';
import BrandLogo from '../../components/BrandLogo';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { products, loading, addProduct, editProduct, removeProduct, resetAllProducts, refreshProducts } = useProducts();
  const { adminUser, logoutAdmin } = useAdminAuth();
  const { showToast } = useToast();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'in-stock', 'out-of-stock'

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sqlModalOpen, setSqlModalOpen] = useState(false);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Derived filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Stock filter
      if (stockFilter === 'in-stock' && !p.available) return false;
      if (stockFilter === 'out-of-stock' && p.available) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(query);
        const matchesFabric = p.fabric?.toLowerCase().includes(query);
        const matchesCategory = p.categoryName?.toLowerCase().includes(query);
        const matchesTags = (p.tags || []).some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesFabric || matchesCategory || matchesTags;
      }

      return true;
    });
  }, [products, selectedCategory, stockFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.available).length;
    const featured = products.filter((p) => p.featured).length;
    const avgPrice = total > 0 ? Math.round(products.reduce((acc, p) => acc + (p.price || 0), 0) / total) : 0;
    
    // Count per category
    const catCounts = {};
    VALID_CATEGORIES.forEach((cat) => {
      catCounts[cat] = products.filter((p) => p.category === cat).length;
    });

    return { total, inStock, featured, avgPrice, catCounts };
  }, [products]);

  // Handle open add modal
  const handleAddNew = () => {
    setEditingProduct(null);
    setFormModalOpen(true);
  };

  // Handle open edit modal
  const handleEdit = (prod) => {
    setEditingProduct(prod);
    setFormModalOpen(true);
  };

  // Handle Save (Create or Update)
  const handleSaveProduct = async (productData) => {
    if (editingProduct && editingProduct.id) {
      const res = await editProduct(editingProduct.id, productData);
      if (res.savedToDatabase) {
        showToast(`Listing "${productData.name}" updated & saved directly to Supabase!`, 'success');
      } else {
        showToast(`Listing "${productData.name}" updated in boutique catalog!`, 'success');
      }
    } else {
      const res = await addProduct(productData);
      if (res.savedToDatabase) {
        showToast(`New listing "${productData.name}" published & saved to Supabase!`, 'success');
      } else {
        showToast(`New listing "${productData.name}" created with WebP media!`, 'success');
      }
    }
  };

  // Handle toggle available
  const handleToggleAvailable = async (prod, e) => {
    e.stopPropagation();
    const updated = !prod.available;
    await editProduct(prod.id, { available: updated });
    showToast(`"${prod.name}" marked as ${updated ? 'In Stock' : 'Out of Stock'}`, 'info');
  };

  // Handle toggle featured
  const handleToggleFeatured = async (prod, e) => {
    e.stopPropagation();
    const updated = !prod.featured;
    await editProduct(prod.id, { featured: updated });
    showToast(`"${prod.name}" ${updated ? 'added to' : 'removed from'} Featured showcase`, 'info');
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteConfirmProduct) return;
    setIsDeleting(true);
    try {
      await removeProduct(deleteConfirmProduct.id);
      showToast(`Listing "${deleteConfirmProduct.name}" removed from database`, 'info');
      setDeleteConfirmProduct(null);
    } catch (err) {
      showToast(`Failed to delete product: ${err.message}`, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory/60 text-brand-navy pb-16">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-brand-navy text-brand-ivory border-b border-brand-champagne/20 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-serif text-lg tracking-wider text-brand-champagne group-hover:text-white transition-colors">
                Lils Spun
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-brand-champagne/20 text-brand-champagne border border-brand-champagne/30">
                Admin Console
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Database status pill */}
            <button
              type="button"
              onClick={() => setSqlModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/10 hover:bg-white/15 text-brand-champagne border border-white/10 transition-colors"
              title="Click to view Supabase database sync & RLS instructions"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isSupabaseConfigured ? 'Supabase Live' : 'Offline Store'}</span>
            </button>

            {/* View storefront link */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Admin identity & Sign Out */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/20">
              <div className="w-7 h-7 rounded-full bg-brand-champagne text-brand-navy flex items-center justify-center font-bold text-xs">
                A
              </div>
              <button
                type="button"
                onClick={() => {
                  logoutAdmin();
                  navigate('/admin/login');
                  showToast('Administrator signed out safely.', 'info');
                }}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Sign out of Admin Console"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Page Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-rose font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Boutique Inventory &amp; Listings</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-brand-navy font-normal">
              Product Catalogue Management
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted font-light mt-0.5">
              Manage listings across the 4 core categories: Ready made, Churidar materials, Sarees, and Kids wear.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSqlModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-brand-border hover:border-brand-navy text-xs font-semibold text-brand-navy rounded-xl shadow-2xs hover:shadow-xs transition-all"
            >
              <Database className="w-4 h-4 text-brand-rose" />
              <span>Database &amp; SQL Setup</span>
            </button>

            <button
              type="button"
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-xl text-xs uppercase tracking-luxury font-semibold shadow-md transition-all hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Listing</span>
            </button>
          </div>
        </div>

        {/* Analytics & Overview Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-2xs">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Total Listings</span>
              <Layers className="w-4 h-4 text-brand-rose" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-brand-navy">{stats.total}</p>
            <p className="text-[11px] text-brand-muted mt-1 font-light">
              2 per category across 4 categories
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-2xs">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">In Stock</span>
              <PackageCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-brand-navy">{stats.inStock}</p>
            <p className="text-[11px] text-emerald-700 font-light mt-1">
              Active for patron purchasing
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-2xs">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Featured Edit</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-brand-navy">{stats.featured}</p>
            <p className="text-[11px] text-brand-muted font-light mt-1">
              Spotlighted on storefront homepage
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-2xs">
            <div className="flex items-center justify-between text-brand-muted mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Avg. Price</span>
              <Sparkles className="w-4 h-4 text-brand-champagne" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-brand-navy">{formatINR(stats.avgPrice)}</p>
            <p className="text-[11px] text-brand-muted font-light mt-1">
              Boutique handcrafted luxury
            </p>
          </div>

        </div>

        {/* Category Breakdown Badges */}
        <div className="bg-white rounded-2xl p-4 border border-brand-border shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold text-brand-navy uppercase tracking-wider">
            Catalogue Categories:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {VALID_CATEGORIES.map((catKey) => (
              <span
                key={catKey}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-brand-ivory border border-brand-border font-medium text-brand-navy"
              >
                <span>{CATEGORY_NAMES[catKey]}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-brand-navy text-brand-champagne text-[10px] font-bold">
                  {stats.catCounts[catKey] || 0}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="bg-white rounded-2xl p-4 border border-brand-border shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search listings by title, fabric, or tag..."
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

            {/* Quick stock status filter */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-brand-muted font-medium">Stock:</span>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-3 py-1.5 bg-brand-ivory/50 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
              >
                <option value="all">All Items</option>
                <option value="in-stock">In Stock Only</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-brand-border/60">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-brand-navy text-brand-champagne shadow-2xs'
                  : 'bg-brand-ivory/60 text-brand-navy hover:bg-brand-ivory border border-brand-border'
              }`}
            >
              All Categories ({products.length})
            </button>

            {VALID_CATEGORIES.map((catKey) => (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === catKey
                    ? 'bg-brand-navy text-brand-champagne shadow-2xs'
                    : 'bg-brand-ivory/60 text-brand-navy hover:bg-brand-ivory border border-brand-border'
                }`}
              >
                {CATEGORY_NAMES[catKey]} ({stats.catCounts[catKey] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Listings Table / Cards */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-luxury overflow-hidden">
          
          <div className="px-6 py-4 border-b border-brand-border bg-brand-ivory/40 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider font-semibold text-brand-navy">
              Showing {filteredProducts.length} of {products.length} Products
            </p>
            <button
              type="button"
              onClick={() => refreshProducts()}
              className="inline-flex items-center gap-1.5 text-xs text-brand-rose hover:text-brand-navy transition-colors font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Listings</span>
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-ivory border border-brand-border flex items-center justify-center mx-auto mb-3 text-brand-muted">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-brand-navy font-normal mb-1">
                No matching boutique listings found
              </h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto mb-4 font-light">
                Try adjusting your search keywords or category filters, or add a new handcrafted listing.
              </p>
              <button
                type="button"
                onClick={handleAddNew}
                className="px-4 py-2 bg-brand-navy text-brand-champagne rounded-xl text-xs uppercase tracking-wider font-semibold"
              >
                + Add First Listing
              </button>
            </div>
          ) : (
            <div className="divide-y divide-brand-border">
              {filteredProducts.map((product) => {
                const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
                const isWebp = primaryImage.includes('webp') || primaryImage.startsWith('data:image/webp');

                return (
                  <div
                    key={product.id}
                    className="p-4 sm:p-5 hover:bg-brand-ivory/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      
                      {/* Thumbnail with WebP indicator */}
                      <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-brand-ivory border border-brand-border shrink-0 shadow-2xs">
                        <img
                          src={primaryImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/75 text-white px-1.5 py-0.2 rounded">
                          WEBP
                        </span>
                      </div>

                      {/* Text Details */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-brand-blush/40 text-brand-rose border border-brand-rose/20">
                            {product.categoryName || CATEGORY_NAMES[product.category] || product.category}
                          </span>

                          {product.newArrival && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-brand-champagne/30 text-brand-navy border border-brand-champagne/40">
                              New Arrival
                            </span>
                          )}

                          {product.featured && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                              <span>Featured</span>
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-base text-brand-navy font-normal truncate">
                          {product.name}
                        </h3>

                        <p className="text-xs text-brand-muted truncate font-light">
                          {product.fabric || 'Artisanal Handcraft'} • {product.occasion || 'Festive'}
                        </p>

                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="text-sm font-semibold text-brand-navy">
                            {formatINR(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-brand-muted line-through">
                              {formatINR(product.originalPrice)}
                            </span>
                          )}
                          <span className="text-[11px] text-brand-muted">
                            • {product.images?.length || 1} image{product.images?.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Right: Quick Toggles & Action Buttons */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-brand-border/60">
                      
                      {/* Availability toggle */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleAvailable(product, e)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          product.available
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                        }`}
                        title="Click to toggle stock availability"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${product.available ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span>{product.available ? 'In Stock' : 'Out of Stock'}</span>
                      </button>

                      {/* Action Icon Buttons */}
                      <div className="flex items-center gap-1.5">
                        
                        {/* View in Storefront */}
                        <Link
                          to={`/products/${product.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-brand-muted hover:text-brand-navy hover:bg-brand-ivory transition-colors"
                          title="View on public storefront"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Edit Listing */}
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="p-2 rounded-xl text-brand-muted hover:text-brand-rose hover:bg-brand-rose/10 transition-colors"
                          title="Edit this listing"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Listing */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmProduct(product)}
                          className="p-2 rounded-xl text-brand-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete this listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </main>

      {/* Product Form Modal (Create & Edit) */}
      <ProductFormModal
        isOpen={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {/* Database Setup & SQL Modal */}
      <DatabaseSyncModal
        isOpen={sqlModalOpen}
        onClose={() => setSqlModalOpen(false)}
        onResetDefaults={async () => {
          await resetAllProducts();
          showToast('Product catalogue reset back to 8 default boutique items.', 'info');
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmProduct && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-luxury border border-brand-border text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-brand-navy font-normal">
                Delete Listing?
              </h3>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <strong className="text-brand-navy">"{deleteConfirmProduct.name}"</strong> from your boutique inventory and database?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmProduct(null)}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-brand-ivory hover:bg-brand-border text-xs font-semibold text-brand-navy rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-xs font-semibold text-white rounded-xl shadow-md transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Listing'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

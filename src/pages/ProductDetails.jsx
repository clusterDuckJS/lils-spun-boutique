import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Feather,
  Sparkles,
  ChevronRight,
  Share2
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageWithFallback from '../components/ImageWithFallback';
import ProductGrid from '../components/ProductGrid';
import { getProductBySlug, getRelatedProducts, formatINR } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const product = getProductBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColour, setSelectedColour] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  // Scroll to top and reset state when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes ? product.sizes[0] : 'Free Size');
      setSelectedColour(product.colours ? product.colours[0]?.name : 'Default');
      setQuantity(1);
      setValidationError('');
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-brand-navy mb-4">Garment Not Found</h1>
        <p className="text-sm text-brand-muted mb-6">
          The requested garment might have been removed or updated in our collection.
        </p>
        <Link
          to="/collections/new-arrivals"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold"
        >
          <span>Explore Collections</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = getRelatedProducts(product.id, 4);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setValidationError('Please select a size before adding to your bag.');
      return;
    }
    addToCart(product, { size: selectedSize, colour: selectedColour }, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        title: 'Link Copied',
        message: 'Product link copied to clipboard.',
        type: 'info'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Collections', href: '/collections/sarees' },
          { label: product.categoryName, href: `/collections/${product.category}` },
          { label: product.name }
        ]}
      />

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mt-4">
        
        {/* Gallery Column (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails list (vertical on desktop, horizontal on mobile) */}
          {product.images && product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0 md:max-h-[600px]">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 md:w-20 md:h-26 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-brand-navy shadow-soft ring-2 ring-brand-navy/20'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                  aria-label={`Thumbnail ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Large Main Feature Image */}
          <div className="flex-1 relative rounded-2xl overflow-hidden bg-brand-ivory-muted shadow-card border border-brand-border/60 aspect-[3/4]">
            <ImageWithFallback
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              aspectRatio="aspect-[3/4]"
              className="w-full h-full object-cover"
            />

            {/* Badges on main image */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.newArrival && (
                <span className="bg-brand-navy/90 backdrop-blur-md text-brand-ivory text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded shadow-soft">
                  New Arrival
                </span>
              )}
              {hasDiscount && (
                <span className="bg-brand-rose text-white text-xs uppercase tracking-widest font-bold px-3 py-1 rounded shadow-soft">
                  {discountPercent}% Off
                </span>
              )}
            </div>

            {/* Quick Share action */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-brand-navy backdrop-blur-md shadow-soft transition-all"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Details & Purchase Controls (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Header: Category & Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <Link
                  to={`/collections/${product.category}`}
                  className="uppercase tracking-luxury text-brand-rose font-bold hover:underline"
                >
                  {product.categoryName}
                </Link>
                {product.rating && (
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-brand-navy">{product.rating}</span>
                    <span className="text-[11px] text-brand-muted">({product.reviewsCount} reviews)</span>
                  </div>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-brand-navy leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-sans text-2xl sm:text-3xl font-semibold text-brand-navy">
                  {formatINR(product.price)}
                </span>
                {hasDiscount && (
                  <span className="font-sans text-base text-brand-muted line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-brand-muted font-light">
                  (Inclusive of all taxes)
                </span>
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-xs sm:text-sm text-brand-text/85 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Colour Selector */}
            {product.colours && product.colours.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs uppercase tracking-luxury text-brand-muted font-semibold block">
                  Colour Shade: <span className="text-brand-navy">{selectedColour}</span>
                </span>
                <div className="flex items-center gap-3">
                  {product.colours.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColour(col.name)}
                      className={`group relative flex items-center gap-2 p-1.5 rounded-full border-2 transition-all ${
                        selectedColour === col.name
                          ? 'border-brand-navy ring-2 ring-brand-navy/20'
                          : 'border-brand-border hover:border-brand-muted'
                      }`}
                      title={col.name}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-xs font-medium text-brand-navy pr-2 hidden sm:inline">
                        {col.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-luxury text-brand-muted font-semibold">
                    Size: <span className="text-brand-navy">{selectedSize}</span>
                  </span>
                  <Link
                    to="/pages/shipping"
                    className="text-xs text-brand-rose hover:underline"
                  >
                    Size Guide
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedSize(s);
                        setValidationError('');
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                        selectedSize === s
                          ? 'bg-brand-navy text-brand-ivory shadow-soft font-semibold'
                          : 'bg-white border border-brand-border text-brand-navy hover:border-brand-navy'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Validation alert */}
            {validationError && (
              <p className="text-xs text-red-600 font-medium">
                {validationError}
              </p>
            )}

            {/* Quantity Controls & Bag Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-brand-border rounded-xl bg-white overflow-hidden shadow-soft">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2.5 text-brand-navy hover:bg-brand-ivory transition-colors text-sm font-medium"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold text-brand-navy min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-2.5 text-brand-navy hover:bg-brand-ivory transition-colors text-sm font-medium"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-card hover:shadow-elevated transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-champagne" />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`p-3.5 rounded-xl border border-brand-border transition-all shadow-soft ${
                    isSaved
                      ? 'bg-brand-blush/40 text-brand-rose border-brand-rose/40'
                      : 'bg-white hover:bg-brand-blush/20 text-brand-navy'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-brand-rose text-brand-rose' : ''}`} />
                </button>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-brand-border/60 grid grid-cols-2 gap-3 text-xs text-brand-text/80">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-champagne shrink-0" />
                <span>Complimentary Delivery on orders &gt; ₹4,999</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-brand-champagne shrink-0" />
                <span>7-Day Return & Exchange Window</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-champagne shrink-0" />
                <span>100% Verified Handcrafting</span>
              </div>
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-brand-champagne shrink-0" />
                <span>Bespoke Boutique Packaging</span>
              </div>
            </div>

          </div>

          {/* Accordion / Tabbed Details Sections */}
          <div className="mt-8 pt-6 border-t border-brand-border/60 space-y-4">
            <div className="flex border-b border-brand-border/60 gap-4 text-xs font-serif font-medium">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 transition-colors uppercase tracking-wider ${
                  activeTab === 'details'
                    ? 'border-b-2 border-brand-navy text-brand-navy font-semibold'
                    : 'text-brand-muted hover:text-brand-navy'
                }`}
              >
                Garment Details
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2.5 transition-colors uppercase tracking-wider ${
                  activeTab === 'care'
                    ? 'border-b-2 border-brand-navy text-brand-navy font-semibold'
                    : 'text-brand-muted hover:text-brand-navy'
                }`}
              >
                Care & Fabric
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2.5 transition-colors uppercase tracking-wider ${
                  activeTab === 'shipping'
                    ? 'border-b-2 border-brand-navy text-brand-navy font-semibold'
                    : 'text-brand-muted hover:text-brand-navy'
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            {/* Tab: Garment Details */}
            {activeTab === 'details' && (
              <div className="text-xs text-brand-text/80 space-y-2 animate-in fade-in">
                <p>
                  <strong>Occasion:</strong> {product.occasion}
                </p>
                <p>
                  <strong>Fabric Composition:</strong> {product.fabric}
                </p>
                {product.details && (
                  <ul className="list-disc list-inside space-y-1 pt-1 text-brand-muted">
                    {product.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Tab: Care & Fabric */}
            {activeTab === 'care' && (
              <div className="text-xs text-brand-text/80 space-y-2 animate-in fade-in">
                <p className="leading-relaxed">
                  <strong>Recommended Care:</strong> {product.care}
                </p>
                <p className="text-brand-muted text-[11px] leading-relaxed">
                  Due to the handcrafted nature of artisanal weaves, minor variations in slubs, motifs, or colour are characteristic of authentic craftsmanship rather than defects.
                </p>
              </div>
            )}

            {/* Tab: Shipping & Returns */}
            {activeTab === 'shipping' && (
              <div className="text-xs text-brand-text/80 space-y-2 animate-in fade-in">
                <p>
                  <strong>Dispatch:</strong> Orders are dispatched within 24 to 48 hours from our Kerala boutique studio.
                </p>
                <p>
                  <strong>Returns:</strong> Hassle-free 7-day exchange or store credit for unstitched garments. (Demo placeholder)
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* SECTION: Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-brand-border/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
                Complementary Selections
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy font-normal">
                You May Also Admire
              </h2>
            </div>
            <Link
              to={`/collections/${product.category}`}
              className="text-xs uppercase tracking-widest text-brand-navy font-semibold hover:text-brand-rose transition-colors"
            >
              View More in {product.categoryName} &rarr;
            </Link>
          </div>

          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}
    </div>
  );
}

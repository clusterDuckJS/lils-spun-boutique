import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Check, ArrowRight, Star } from 'lucide-react';
import { formatINR } from '../data/products';
import ImageWithFallback from './ImageWithFallback';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColour, setSelectedColour] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(product.sizes ? product.sizes[0] : 'Free Size');
      setSelectedColour(product.colours ? product.colours[0]?.name : 'Default');
      setQuantity(1);
      setValidationError('');
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const isSaved = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setValidationError('Please select a size before adding to bag.');
      return;
    }
    addToCart(product, { size: selectedSize, colour: selectedColour }, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative w-full max-w-3xl bg-brand-ivory rounded-2xl shadow-elevated border border-brand-border overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-brand-navy shadow-soft transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Column */}
        <div className="w-full md:w-1/2 bg-brand-ivory-muted flex flex-col p-4">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-soft">
            <ImageWithFallback
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              aspectRatio="aspect-[3/4]"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails row */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-brand-navy ring-2 ring-brand-navy/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-brand-muted mb-1">
              <span className="uppercase tracking-widest text-brand-rose font-medium">
                {product.categoryName}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-medium text-brand-navy">{product.rating}</span>
                <span>({product.reviewsCount})</span>
              </span>
            </div>

            <h2 id="quick-view-title" className="font-serif text-xl sm:text-2xl font-medium text-brand-navy leading-snug">
              {product.name}
            </h2>

            {/* Price block */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-xl font-semibold text-brand-navy font-sans">
                {formatINR(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-brand-muted line-through font-sans">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-brand-text/80 leading-relaxed mt-3 line-clamp-3">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colours && product.colours.length > 0 && (
              <div className="mt-4">
                <span className="text-xs uppercase tracking-wider text-brand-muted font-medium block mb-2">
                  Colour: <span className="text-brand-navy font-normal">{selectedColour}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colours.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColour(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColour === c.name
                          ? 'border-brand-navy scale-110 shadow-soft'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColour === c.name && (
                        <Check className="w-3.5 h-3.5 text-brand-navy mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-brand-muted font-medium">
                    Size: <span className="text-brand-navy font-normal">{selectedSize}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedSize(s);
                        setValidationError('');
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        selectedSize === s
                          ? 'bg-brand-navy text-brand-ivory shadow-soft'
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
              <p className="text-xs text-red-600 mt-2 font-medium">
                {validationError}
              </p>
            )}

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-brand-muted font-medium">
                Quantity:
              </span>
              <div className="flex items-center border border-brand-border rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-brand-navy hover:bg-brand-ivory transition-colors text-sm font-medium"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold text-brand-navy min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-brand-navy hover:bg-brand-ivory transition-colors text-sm font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory py-3 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-card transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-brand-champagne" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-xl border border-brand-border transition-colors ${
                isSaved ? 'bg-brand-blush/30 text-brand-rose' : 'bg-white hover:bg-brand-blush/20 text-brand-navy'
              }`}
              aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-brand-rose text-brand-rose' : ''}`} />
            </button>

            <Link
              to={`/products/${product.slug}`}
              onClick={onClose}
              className="p-3 rounded-xl border border-brand-border bg-white hover:bg-brand-ivory text-brand-navy transition-colors"
              title="View full product details"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

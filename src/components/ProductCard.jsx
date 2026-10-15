import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { formatINR } from '../data/products';
import ImageWithFallback from './ImageWithFallback';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isSaved = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes && product.sizes.length > 1 && onQuickView) {
      onQuickView(product);
    } else {
      addToCart(product, {
        size: product.sizes ? product.sizes[0] : 'Free Size',
        colour: product.colours ? product.colours[0]?.name : 'Default'
      });
    }
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/products/${product.slug}`);
    }
  };

  // Image to show on hover (2nd image if available)
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden border border-brand-border/60 hover:border-brand-champagne/60 hover:shadow-card transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <Link to={`/products/${product.slug}`} className="relative block overflow-hidden aspect-[3/4] bg-brand-ivory-muted">
        <ImageWithFallback
          src={displayImage}
          alt={product.name}
          aspectRatio="aspect-[3/4]"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
          {product.newArrival && (
            <span className="bg-brand-navy/90 backdrop-blur-sm text-brand-ivory text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 rounded shadow-soft">
              New Arrival
            </span>
          )}
          {hasDiscount && (
            <span className="bg-brand-rose/90 backdrop-blur-sm text-white text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded shadow-soft">
              {discountPercent}% Off
            </span>
          )}
        </div>

        {/* Wishlist Button Overlay */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-soft ${
            isSaved
              ? 'bg-white text-brand-rose'
              : 'bg-white/80 text-brand-navy hover:bg-white hover:text-brand-rose'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isSaved ? 'fill-brand-rose scale-110' : 'group-hover/btn:scale-110'}`} />
        </button>

        {/* Quick Action Overlay (Desktop Hover) */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-10 hidden sm:flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 bg-brand-navy/90 hover:bg-brand-navy text-brand-ivory text-xs uppercase tracking-widest py-2.5 px-3 rounded-md font-medium backdrop-blur-sm flex items-center justify-center gap-1.5 shadow-elevated transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-brand-champagne" />
            <span>Quick Bag</span>
          </button>
          
          <button
            type="button"
            onClick={handleOpenQuickView}
            aria-label="Quick preview"
            className="p-2.5 bg-white/90 hover:bg-white text-brand-navy rounded-md backdrop-blur-sm shadow-elevated transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-brand-muted mb-1">
            <span className="uppercase tracking-wider font-medium text-brand-rose line-clamp-1">
              {product.categoryName}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 text-brand-text/70">
                <span className="text-amber-500 text-xs">★</span>
                <span>{product.rating}</span>
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-base font-medium text-brand-navy line-clamp-1 group-hover:text-brand-rose transition-colors">
            <Link to={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Fabric Subtitle */}
          <p className="text-xs text-brand-muted line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Pricing and Color Dots */}
        <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-brand-navy font-sans">
              {formatINR(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-brand-muted line-through font-sans">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color preview swatches */}
          {product.colours && product.colours.length > 0 && (
            <div className="flex items-center -space-x-1" title={product.colours.map(c => c.name).join(', ')}>
              {product.colours.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-xs shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile Quick Add Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="mt-3 sm:hidden w-full py-2 bg-brand-ivory hover:bg-brand-blush/30 border border-brand-border text-brand-navy rounded text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-brand-rose" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}

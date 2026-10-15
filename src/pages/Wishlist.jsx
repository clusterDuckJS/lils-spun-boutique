import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageWithFallback from '../components/ImageWithFallback';
import { formatINR } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product) => {
    addToCart(product, {
      size: product.sizes ? product.sizes[0] : 'Free Size',
      colour: product.colours ? product.colours[0]?.name : 'Default'
    });
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'My Saved Wishlist' }]} />

      <div className="mb-8 pb-4 border-b border-brand-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-xs uppercase tracking-luxury text-brand-rose font-medium block">
            Saved Favourites
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
            Your Boutique Wishlist
          </h1>
        </div>
        <span className="text-xs text-brand-muted">
          {wishlistCount} {wishlistCount === 1 ? 'Garment' : 'Garments'} saved
        </span>
      </div>

      {wishlistCount === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-brand-border/60 max-w-md mx-auto p-8 shadow-soft">
          <div className="w-16 h-16 rounded-full bg-brand-blush/30 text-brand-rose mx-auto flex items-center justify-center mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl text-brand-navy mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mb-8 leading-relaxed font-light">
            Save the handcrafted sarees, lehengas, and Anarkali suits you love by tapping the heart icon on any product.
          </p>
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
          >
            <span>Discover Collections</span>
            <ArrowRight className="w-4 h-4 text-brand-champagne" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-xl overflow-hidden border border-brand-border/80 shadow-soft hover:shadow-card transition-all"
            >
              {/* Image Area */}
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-ivory-muted">
                <Link to={`/products/${product.slug}`} className="block w-full h-full">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    aspectRatio="aspect-[3/4]"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remove item"
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-brand-muted hover:text-red-600 shadow-soft transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Information & Action */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brand-rose font-medium block mb-1">
                    {product.categoryName}
                  </span>
                  <h3 className="font-serif text-sm font-medium text-brand-navy line-clamp-1 hover:text-brand-rose transition-colors">
                    <Link to={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="font-sans text-sm font-semibold text-brand-navy mt-1">
                    {formatINR(product.price)}
                  </p>
                </div>

                {/* Move to bag button */}
                <button
                  type="button"
                  onClick={() => handleMoveToBag(product)}
                  className="mt-4 w-full py-2.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-soft"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-brand-champagne" />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

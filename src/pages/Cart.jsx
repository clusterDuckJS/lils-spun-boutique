import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageWithFallback from '../components/ImageWithFallback';
import { formatINR } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, itemCount, subtotal, shippingFee, grandTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      <div className="mb-8 pb-4 border-b border-brand-border/60 flex items-baseline justify-between">
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          Your Shopping Bag
        </h1>
        <span className="text-xs text-brand-muted">
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-brand-border/60 max-w-md mx-auto p-8 shadow-soft">
          <div className="w-16 h-16 rounded-full bg-brand-navy/5 text-brand-navy mx-auto flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl text-brand-navy mb-2">
            Your Bag is Currently Empty
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mb-8 leading-relaxed font-light">
            Explore our curated collections of authentic handloom sarees, bespoke Anarkalis, and festive edits.
          </p>
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4 text-brand-champagne" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cart Items List (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft divide-y divide-brand-border/60 overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Left: Thumbnail & Details */}
                  <div className="flex gap-4 items-center flex-1">
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-brand-ivory-muted"
                    >
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        aspectRatio="aspect-[3/4]"
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-brand-rose font-medium block">
                        {item.product.categoryName}
                      </span>
                      <h3 className="font-serif text-sm sm:text-base font-medium text-brand-navy hover:text-brand-rose transition-colors">
                        <Link to={`/products/${item.product.slug}`}>
                          {item.product.name}
                        </Link>
                      </h3>
                      
                      {/* Options */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted pt-1">
                        {item.selectedSize && (
                          <span>Size: <strong className="text-brand-navy">{item.selectedSize}</strong></span>
                        )}
                        {item.selectedColour && (
                          <span>Colour: <strong className="text-brand-navy">{item.selectedColour}</strong></span>
                        )}
                      </div>

                      <p className="font-sans text-xs sm:text-sm font-semibold text-brand-navy sm:hidden pt-1">
                        {formatINR(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Right: Quantity Controls & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-brand-border/40">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-brand-border rounded-lg bg-brand-ivory overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-brand-navy hover:bg-brand-border/40 transition-colors text-sm font-medium"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-semibold text-brand-navy min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-brand-navy hover:bg-brand-border/40 transition-colors text-sm font-medium"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="font-sans text-sm sm:text-base font-semibold text-brand-navy min-w-[80px] text-right">
                      {formatINR(item.price * item.quantity)}
                    </span>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-brand-muted hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping button */}
            <div className="flex items-center justify-between pt-2">
              <Link
                to="/collections/new-arrivals"
                className="text-xs uppercase tracking-widest text-brand-navy hover:text-brand-rose font-semibold flex items-center gap-1.5 transition-colors"
              >
                &larr; <span>Continue Exploring Collections</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Card (4 cols on lg) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-8 border border-brand-border/80 shadow-soft space-y-6">
            <h2 className="font-serif text-xl font-medium text-brand-navy pb-3 border-b border-brand-border">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-brand-text/80">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold text-brand-navy font-sans">
                  {formatINR(subtotal)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span>Boutique Shipping</span>
                  <p className="text-[10px] text-brand-muted">
                    {subtotal >= 4999 ? 'Complimentary delivery applied' : 'Standard courier dispatch'}
                  </p>
                </div>
                <span className="font-semibold text-brand-navy font-sans">
                  {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                </span>
              </div>

              {subtotal < 4999 && (
                <div className="p-2.5 rounded-lg bg-brand-blush/30 border border-brand-blush/60 text-[11px] text-brand-rose-dark leading-tight">
                  Add <strong>{formatINR(4999 - subtotal)}</strong> more for complimentary express delivery!
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-brand-border flex justify-between items-baseline">
              <div>
                <span className="font-serif text-base font-semibold text-brand-navy">
                  Estimated Total
                </span>
                <span className="text-[10px] text-brand-muted block">
                  (Inclusive of applicable GST)
                </span>
              </div>
              <span className="font-sans text-xl font-bold text-brand-navy">
                {formatINR(grandTotal)}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-card transition-all"
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight className="w-4 h-4 text-brand-champagne" />
            </button>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-brand-border/60 space-y-2.5 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Frontend Design Prototype &bull; No actual charges</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-rose shrink-0" />
                <span>Bespoke protective garment wrapping</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

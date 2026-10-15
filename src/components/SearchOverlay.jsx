import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { products, formatINR } from '../data/products';
import ImageWithFallback from './ImageWithFallback';

const popularSearches = [
  'Kanjivaram Saree',
  'Anarkali Suit',
  'Chanderi Silk',
  'Bridal Lehenga',
  'Festive Kurta',
  'Zardozi Potli'
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const searchResults = trimmed
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.categoryName.toLowerCase().includes(trimmed) ||
          p.fabric.toLowerCase().includes(trimmed) ||
          p.occasion.toLowerCase().includes(trimmed) ||
          p.tags.some((t) => t.toLowerCase().includes(trimmed))
        )
        .slice(0, 4)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectQuickTag = (tag) => {
    setQuery(tag);
    navigate(`/search?q=${encodeURIComponent(tag)}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-brand-navy/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full bg-brand-ivory border-b border-brand-border shadow-elevated transition-transform transform p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header controls */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-brand-border/60">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-muted font-medium">Search Collection</span>
            <button
              onClick={onClose}
              className="text-brand-muted hover:text-brand-navy p-1 transition-colors rounded-full hover:bg-brand-blush/20"
              aria-label="Close search"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Search input form - Responsive and non-overlapping */}
          <form onSubmit={handleSearchSubmit} className="mt-4 sm:mt-6 relative flex items-center">
            {/* Search Icon Left */}
            <div className="absolute left-3.5 sm:left-4 pointer-events-none text-brand-muted flex items-center justify-center">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-rose" />
            </div>

            {/* Input with generous right padding to prevent button collision */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sarees, suits, lehengas..."
              className="w-full bg-white border border-brand-border rounded-full pl-10 sm:pl-12 pr-24 sm:pr-32 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all shadow-soft placeholder:text-brand-muted/70 placeholder:truncate"
            />

            {/* Right Action Cluster: Clear button + Submit */}
            <div className="absolute right-1.5 sm:right-2 flex items-center gap-1 sm:gap-2">
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1.5 text-brand-muted hover:text-brand-navy rounded-full transition-colors"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <button
                type="submit"
                aria-label="Submit search"
                className="h-8 sm:h-9 px-3 sm:px-5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory text-xs uppercase tracking-widest rounded-full font-semibold flex items-center justify-center gap-1.5 transition-all shadow-soft shrink-0"
              >
                <Search className="w-3.5 h-3.5 sm:hidden" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
            <span className="text-brand-muted flex items-center gap-1 font-medium text-[11px] sm:text-xs">
              <Sparkles className="w-3 h-3 text-brand-rose shrink-0" /> Trending:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleSelectQuickTag(term)}
                className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white hover:bg-brand-blush/30 border border-brand-border rounded-full text-brand-text/80 transition-all text-[11px] sm:text-xs"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Live quick results preview */}
          {trimmed && (
            <div className="mt-5 sm:mt-6 pt-4 sm:pt-6 border-t border-brand-border/60">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-brand-muted">
                  Quick Results ({searchResults.length})
                </span>
                <button
                  onClick={handleSearchSubmit}
                  className="text-xs text-brand-rose hover:text-brand-navy font-medium flex items-center gap-1 transition-colors"
                >
                  View all results <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigate(`/products/${product.slug}`);
                        onClose();
                      }}
                      className="group flex sm:flex-col items-center sm:items-start gap-3 p-2 rounded-lg bg-white border border-brand-border/60 hover:shadow-card cursor-pointer transition-all"
                    >
                      <div className="w-14 h-18 sm:w-full sm:h-36 shrink-0 rounded overflow-hidden">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.name}
                          aspectRatio="aspect-[3/4]"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-brand-rose font-medium block">
                          {product.categoryName}
                        </span>
                        <h4 className="text-xs font-serif font-medium text-brand-navy line-clamp-1 group-hover:text-brand-rose transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs font-sans font-semibold text-brand-navy mt-1">
                          {formatINR(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-brand-muted py-4 text-center">
                  No matching garments found for "{query}". Try checking your spelling or browse our curated collections.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

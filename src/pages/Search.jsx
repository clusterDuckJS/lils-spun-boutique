import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, X, Sparkles, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  const trimmed = searchTerm.trim().toLowerCase();

  const matchingProducts = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.categoryName.toLowerCase().includes(trimmed) ||
          p.fabric.toLowerCase().includes(trimmed) ||
          p.occasion.toLowerCase().includes(trimmed) ||
          p.tags.some((t) => t.toLowerCase().includes(trimmed)) ||
          p.colours?.some((c) => c.name.toLowerCase().includes(trimmed))
      )
    : [];

  const popularSuggestions = [
    'Saree',
    'Anarkali',
    'Kanjivaram',
    'Banarasi',
    'Lehenga',
    'Chanderi',
    'Sharara',
    'Jewelry'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      {/* Header and Search Form */}
      <div className="max-w-3xl mx-auto text-center my-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal mb-3">
          Search the Boutique
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted font-light mb-8">
          Find traditional sarees, embroidered suits, kurtas, lehengas, or specific fabrics.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <div className="absolute left-3.5 sm:left-4 pointer-events-none text-brand-muted flex items-center justify-center">
            <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-rose" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by garment, fabric, colour, or occasion..."
            className="w-full bg-white border border-brand-border rounded-full pl-10 sm:pl-12 pr-24 sm:pr-32 py-3 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy shadow-soft placeholder:text-brand-muted/70 placeholder:truncate"
          />
          <div className="absolute right-1.5 sm:right-2 flex items-center gap-1 sm:gap-2">
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-brand-muted hover:text-brand-navy rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="h-8 sm:h-9 px-3.5 sm:px-6 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory text-xs uppercase tracking-widest rounded-full font-semibold flex items-center justify-center gap-1.5 transition-all shadow-soft shrink-0"
            >
              <SearchIcon className="w-3.5 h-3.5 sm:hidden" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          <span className="text-brand-muted font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-rose" /> Popular:
          </span>
          {popularSuggestions.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setSearchTerm(term);
                setSearchParams({ q: term });
              }}
              className="px-3 py-1 bg-white hover:bg-brand-blush/30 border border-brand-border rounded-full text-brand-text/80 transition-all text-xs"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      {trimmed && (
        <div className="mb-6 pb-4 border-b border-brand-border/60 flex items-center justify-between">
          <p className="text-sm font-serif text-brand-navy">
            Found <span className="font-semibold">{matchingProducts.length}</span> results for "
            <span className="italic">{trimmed}</span>"
          </p>
          {matchingProducts.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-brand-rose hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Matching Grid or Empty State */}
      {trimmed ? (
        matchingProducts.length > 0 ? (
          <ProductGrid products={matchingProducts} columns={4} />
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-brand-border max-w-lg mx-auto p-8 shadow-soft">
            <p className="font-serif text-xl text-brand-navy mb-2">No matching pieces found</p>
            <p className="text-xs text-brand-muted mb-6 leading-relaxed">
              We couldn't find any designs matching "{trimmed}". Try searching for broader terms like "silk", "saree", "anarkali", or browse our curated collections.
            </p>
            <Link
              to="/collections/new-arrivals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold"
            >
              <span>Explore New Arrivals</span>
              <ArrowRight className="w-4 h-4 text-brand-champagne" />
            </Link>
          </div>
        )
      ) : (
        /* If no search term entered yet, show prompt & curated suggestions */
        <div className="mt-8">
          <h2 className="font-serif text-xl text-brand-navy mb-4 text-center">
            Or Explore Recent Curations
          </h2>
          <ProductGrid products={products.slice(0, 8)} columns={4} />
        </div>
      )}
    </div>
  );
}

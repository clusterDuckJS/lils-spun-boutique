import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X, RotateCcw, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import FilterDrawer from '../components/FilterDrawer';
import ImageWithFallback from '../components/ImageWithFallback';
import { products, getProductsByCategory } from '../data/products';
import { collectionMeta } from '../data/collections';

export default function Collection() {
  const { category = 'new-arrivals' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(12);

  // Filters state
  const [filters, setFilters] = useState({
    maxPrice: 50000,
    occasions: [],
    fabrics: [],
    colours: [],
    inStockOnly: false
  });

  // Sync filters from URL search params on mount or category change
  useEffect(() => {
    const occParam = searchParams.get('occasion');
    const fabParam = searchParams.get('fabric');
    const colParam = searchParams.get('colour');
    const tagParam = searchParams.get('tag');

    setFilters({
      maxPrice: 50000,
      occasions: occParam ? [occParam] : [],
      fabrics: fabParam ? [fabParam] : [],
      colours: colParam ? [colParam] : [],
      inStockOnly: false,
      tag: tagParam || null
    });
    setVisibleCount(12);
  }, [category, searchParams]);

  // Base products for this collection
  const baseProducts = useMemo(() => {
    return getProductsByCategory(category);
  }, [category]);

  // Available filter options extracted dynamically from this collection
  const availableFabrics = useMemo(() => {
    const set = new Set();
    baseProducts.forEach((p) => {
      if (p.fabric) {
        // Extract main fabric word e.g. "Pure Katan Silk" -> "Silk" or full name
        set.add(p.fabric.split(' with ')[0].split(' & ')[0].trim());
      }
    });
    return Array.from(set);
  }, [baseProducts]);

  const availableOccasions = useMemo(() => {
    const set = new Set();
    baseProducts.forEach((p) => {
      if (p.occasion) set.add(p.occasion);
    });
    return Array.from(set);
  }, [baseProducts]);

  const availableColours = useMemo(() => {
    const map = new Map();
    baseProducts.forEach((p) => {
      if (p.colours) {
        p.colours.forEach((c) => {
          if (!map.has(c.name)) map.set(c.name, c);
        });
      }
    });
    return Array.from(map.values());
  }, [baseProducts]);

  // Apply filtering
  const filteredProducts = useMemo(() => {
    return baseProducts.filter((product) => {
      // Price filter
      if (product.price > filters.maxPrice) return false;

      // Occasion filter
      if (
        filters.occasions.length > 0 &&
        !filters.occasions.includes(product.occasion)
      ) {
        return false;
      }

      // Fabric filter
      if (filters.fabrics.length > 0) {
        const matchesFabric = filters.fabrics.some((f) =>
          product.fabric.toLowerCase().includes(f.toLowerCase())
        );
        if (!matchesFabric) return false;
      }

      // Tag filter
      if (filters.tag && !product.tags.some(t => t.toLowerCase().includes(filters.tag.toLowerCase()))) {
        return false;
      }

      // Colour filter
      if (filters.colours.length > 0) {
        const matchesColour = product.colours?.some((c) =>
          filters.colours.includes(c.name)
        );
        if (!matchesColour) return false;
      }

      // In stock
      if (filters.inStockOnly && !product.available) return false;

      return true;
    });
  }, [baseProducts, filters]);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return list.sort((a, b) => (b.newArrival === a.newArrival ? 0 : b.newArrival ? 1 : -1));
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
    }
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);
  const meta = collectionMeta[category] || {
    title: category.replace('-', ' '),
    subtitle: 'Curated Boutique Garments',
    description: 'Explore hand-finished ethnic silhouettes from Lils Spun Boutique.',
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85'
  };

  const handleResetFilters = () => {
    setFilters({
      maxPrice: 50000,
      occasions: [],
      fabrics: [],
      colours: [],
      inStockOnly: false,
      tag: null
    });
    setSearchParams({});
  };

  const hasActiveFilters =
    filters.maxPrice < 50000 ||
    filters.occasions.length > 0 ||
    filters.fabrics.length > 0 ||
    filters.colours.length > 0 ||
    filters.inStockOnly ||
    Boolean(filters.tag);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Collections', href: '/collections/sarees' },
          { label: meta.title }
        ]}
      />

      {/* Collection Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-navy text-brand-ivory mb-8 sm:mb-12 shadow-card border border-brand-champagne/30">
        <div className="absolute inset-0 opacity-35 mix-blend-overlay">
          <ImageWithFallback
            src={meta.banner}
            alt={meta.title}
            aspectRatio="aspect-auto"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-16 max-w-2xl">
          <span className="text-xs uppercase tracking-luxury text-brand-champagne font-semibold block mb-2">
            {meta.subtitle}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-ivory leading-tight mb-3">
            {meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-light">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Control Bar: Total Count, Active Chips, Filter Button & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
        <div className="flex items-center gap-3">
          <span className="text-sm font-serif text-brand-navy font-medium">
            Showing {displayedProducts.length} of {sortedProducts.length} Designs
          </span>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-border bg-white text-xs font-medium text-brand-navy shadow-soft hover:bg-brand-blush/20 transition-colors ml-auto"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-rose" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-rose" />
            )}
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <label htmlFor="sort-select" className="text-xs text-brand-muted font-medium whitespace-nowrap">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-brand-border rounded-lg pl-3 pr-8 py-2 text-xs font-medium text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20 cursor-pointer shadow-soft"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-brand-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs text-brand-muted font-medium">Active filters:</span>
          {filters.maxPrice < 50000 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border text-xs text-brand-navy shadow-soft">
              Under ₹{filters.maxPrice.toLocaleString('en-IN')}
              <button
                onClick={() => setFilters((f) => ({ ...f, maxPrice: 50000 }))}
                className="text-brand-muted hover:text-brand-navy"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.occasions.map((occ) => (
            <span
              key={occ}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border text-xs text-brand-navy shadow-soft"
            >
              {occ}
              <button
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    occasions: f.occasions.filter((o) => o !== occ)
                  }))
                }
                className="text-brand-muted hover:text-brand-navy"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.fabrics.map((fab) => (
            <span
              key={fab}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border text-xs text-brand-navy shadow-soft"
            >
              {fab}
              <button
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    fabrics: f.fabrics.filter((x) => x !== fab)
                  }))
                }
                className="text-brand-muted hover:text-brand-navy"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.colours.map((col) => (
            <span
              key={col}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border text-xs text-brand-navy shadow-soft"
            >
              {col}
              <button
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    colours: f.colours.filter((c) => c !== col)
                  }))
                }
                className="text-brand-muted hover:text-brand-navy"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border text-xs text-brand-navy shadow-soft">
              In Stock Only
              <button
                onClick={() => setFilters((f) => ({ ...f, inStockOnly: false }))}
                className="text-brand-muted hover:text-brand-navy"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-brand-rose hover:underline font-medium ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Clear All
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="flex gap-8 mt-6 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            availableFabrics={availableFabrics}
            availableOccasions={availableOccasions}
            availableColours={availableColours}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={displayedProducts}
            columns={4}
            emptyMessage={`No ${meta.title} match your selected filters.`}
          />

          {/* Load More Button */}
          {visibleCount < sortedProducts.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => c + 12)}
                className="px-8 py-3.5 bg-white border border-brand-border hover:border-brand-navy text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold shadow-soft hover:shadow-card transition-all"
              >
                Load More Designs ({sortedProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        availableFabrics={availableFabrics}
        availableOccasions={availableOccasions}
        availableColours={availableColours}
        onReset={handleResetFilters}
        totalResults={sortedProducts.length}
      />
    </div>
  );
}

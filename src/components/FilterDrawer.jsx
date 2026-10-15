import React, { useEffect } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { formatINR } from '../data/products';

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  availableFabrics = [],
  availableOccasions = [],
  availableColours = [],
  onReset,
  totalResults = 0
}) {
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

  if (!isOpen) return null;

  const handlePriceChange = (e) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const handleOccasionToggle = (occ) => {
    setFilters((prev) => {
      const exists = prev.occasions.includes(occ);
      const updated = exists
        ? prev.occasions.filter((o) => o !== occ)
        : [...prev.occasions, occ];
      return { ...prev, occasions: updated };
    });
  };

  const handleFabricToggle = (fab) => {
    setFilters((prev) => {
      const exists = prev.fabrics.includes(fab);
      const updated = exists
        ? prev.fabrics.filter((f) => f !== fab)
        : [...prev.fabrics, fab];
      return { ...prev, fabrics: updated };
    });
  };

  const handleColourToggle = (colourName) => {
    setFilters((prev) => {
      const exists = prev.colours.includes(colourName);
      const updated = exists
        ? prev.colours.filter((c) => c !== colourName)
        : [...prev.colours, colourName];
      return { ...prev, colours: updated };
    });
  };

  const handleInStockToggle = (e) => {
    setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }));
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-brand-ivory h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 flex items-center justify-between border-b border-brand-border bg-white">
          <div>
            <h3 className="font-serif text-lg font-medium text-brand-navy">Filter Products</h3>
            <span className="text-xs text-brand-muted">{totalResults} items matching</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-brand-muted hover:text-brand-navy rounded-full transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Price Range */}
          <div className="space-y-3 pb-5 border-b border-brand-border/60">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="uppercase tracking-wider text-brand-muted">Max Price</span>
              <span className="text-brand-navy font-semibold">{formatINR(filters.maxPrice)}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="50000"
              step="1000"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-full accent-brand-navy cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-brand-muted">
              <span>₹3,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Occasion */}
          {availableOccasions.length > 0 && (
            <div className="space-y-3 pb-5 border-b border-brand-border/60">
              <span className="text-xs uppercase tracking-luxury text-brand-muted font-medium block">
                Occasion
              </span>
              <div className="space-y-2.5">
                {availableOccasions.map((occ) => {
                  const isChecked = filters.occasions.includes(occ);
                  return (
                    <label
                      key={occ}
                      className="flex items-center gap-2.5 text-xs text-brand-text/90 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleOccasionToggle(occ)}
                        className="rounded border-brand-border text-brand-navy focus:ring-brand-navy/20 w-4 h-4"
                      />
                      <span>{occ}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fabric Craft */}
          {availableFabrics.length > 0 && (
            <div className="space-y-3 pb-5 border-b border-brand-border/60">
              <span className="text-xs uppercase tracking-luxury text-brand-muted font-medium block">
                Fabric Craft
              </span>
              <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                {availableFabrics.map((fab) => {
                  const isChecked = filters.fabrics.includes(fab);
                  return (
                    <label
                      key={fab}
                      className="flex items-center gap-2.5 text-xs text-brand-text/90 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleFabricToggle(fab)}
                        className="rounded border-brand-border text-brand-navy focus:ring-brand-navy/20 w-4 h-4"
                      />
                      <span className="line-clamp-1">{fab}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Colour Palette */}
          {availableColours.length > 0 && (
            <div className="space-y-3 pb-5 border-b border-brand-border/60">
              <span className="text-xs uppercase tracking-luxury text-brand-muted font-medium block">
                Colour
              </span>
              <div className="flex flex-wrap gap-2">
                {availableColours.map((col) => {
                  const isSelected = filters.colours.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => handleColourToggle(col.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all ${
                        isSelected
                          ? 'bg-brand-navy text-white shadow-soft font-medium'
                          : 'bg-white border border-brand-border text-brand-text'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* In stock */}
          <div>
            <label className="flex items-center gap-2.5 text-xs text-brand-text cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={handleInStockToggle}
                className="rounded border-brand-border text-brand-navy focus:ring-brand-navy/20 w-4 h-4"
              />
              <span className="font-medium">In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 bg-white border-t border-brand-border grid grid-cols-2 gap-3 shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl border border-brand-border text-xs uppercase tracking-wider font-medium text-brand-navy hover:bg-brand-blush/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-brand-navy text-brand-ivory hover:bg-brand-navy-light text-xs uppercase tracking-wider font-semibold shadow-card transition-colors"
          >
            <Check className="w-4 h-4 text-brand-champagne" />
            <span>Apply ({totalResults})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

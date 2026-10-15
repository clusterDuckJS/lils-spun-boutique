import React, { useState } from 'react';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';

export default function ProductGrid({
  products = [],
  columns = 4, // 4 cols default for collections
  emptyMessage = 'No matching ethnic wear found.'
}) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-xl border border-brand-border/60 p-8">
        <p className="text-base font-serif text-brand-navy mb-2">{emptyMessage}</p>
        <p className="text-xs text-brand-muted">
          Try resetting filters or exploring other collections.
        </p>
      </div>
    );
  }

  const gridColClass =
    columns === 3
      ? 'grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6'
      : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6';

  return (
    <>
      <div className={gridColClass}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}

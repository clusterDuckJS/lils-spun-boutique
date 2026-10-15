import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  // items: [{ label: 'Sarees', href: '/collections/sarees' }, { label: 'Product Name' }]
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-brand-muted">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-brand-navy transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-brand-border shrink-0" />
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="hover:text-brand-navy transition-colors capitalize"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-brand-navy font-medium line-clamp-1 max-w-[200px] sm:max-w-none capitalize"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

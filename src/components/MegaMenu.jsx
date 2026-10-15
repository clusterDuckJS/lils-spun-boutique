import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export default function MegaMenu({ category, isOpen, onClose }) {
  if (!isOpen || !category) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-brand-ivory border-t border-b border-brand-border shadow-elevated z-40 transition-all duration-300 animate-in fade-in slide-in-from-top-1"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Main Links Sub-categories */}
          <div className="col-span-8 grid grid-cols-3 gap-8 border-r border-brand-border/60 pr-8">
            {category.columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs uppercase tracking-luxury text-brand-rose font-semibold flex items-center gap-1.5 pb-2 border-b border-brand-border/40">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className="group flex items-center justify-between text-sm text-brand-text/80 hover:text-brand-navy hover:font-medium transition-colors"
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-brand-blush/60 text-brand-navy rounded text-xs font-sans tracking-tight">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Curated Editorial Feature Card */}
          <div className="col-span-4 pl-4">
            <div className="group relative rounded-xl overflow-hidden bg-brand-navy text-brand-ivory p-6 shadow-soft">
              <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                <ImageWithFallback
                  src={category.featuredImage}
                  alt={category.featuredTitle}
                  aspectRatio="aspect-auto"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex flex-col justify-between h-48">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-brand-champagne bg-brand-navy/60 backdrop-blur-sm px-2.5 py-1 rounded-full mb-3">
                    <Sparkles className="w-3 h-3 text-brand-champagne" /> Boutique Highlight
                  </span>
                  <h3 className="font-serif text-xl font-medium text-brand-ivory group-hover:text-brand-champagne transition-colors">
                    {category.featuredTitle}
                  </h3>
                  <p className="text-xs text-brand-ivory/80 mt-1 line-clamp-2">
                    {category.featuredSubtitle}
                  </p>
                </div>
                <Link
                  to={category.featuredHref}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-champagne font-medium hover:text-white transition-colors"
                >
                  Explore Showcase <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

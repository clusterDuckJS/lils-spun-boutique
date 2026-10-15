import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={category.href}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-brand-ivory-muted shadow-soft border border-brand-border/60 hover:shadow-card hover:border-brand-champagne/80 transition-all duration-300"
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
        <ImageWithFallback
          src={category.image}
          alt={category.name}
          aspectRatio="aspect-full"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Text and Destination */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-brand-ivory z-10">
          <span className="text-[10px] uppercase tracking-widest text-brand-champagne font-medium mb-1">
            {category.itemCount}
          </span>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide group-hover:text-brand-champagne transition-colors">
              {category.name}
            </h3>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center transform group-hover:translate-x-1 group-hover:bg-brand-champagne group-hover:text-brand-navy transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
          {category.description && (
            <p className="text-xs text-brand-ivory/70 line-clamp-1 mt-1 font-light hidden sm:block">
              {category.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

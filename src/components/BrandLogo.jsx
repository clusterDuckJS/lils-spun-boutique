import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ variant = 'dark', className = '', showImage = false, size = 'default' }) {
  // variant: 'dark' (navy text for light backgrounds) or 'light' (ivory/white text for navy backgrounds)
  const isLight = variant === 'light';

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-95 ${className}`}
      aria-label="Lils Spun Boutique Home"
    >
      {/* Brand Icon or Avatar */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-full transition-transform group-hover:scale-105 ${
        size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
      } ${isLight ? 'bg-brand-navy-light/40 border border-brand-champagne/40' : 'bg-brand-navy shadow-soft'}`}>
        {/* Crescent Moon & Botanical Motif SVG */}
        <svg 
          viewBox="0 0 100 100" 
          className={size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} 
          fill="none" 
          stroke={isLight ? '#F0E7D8' : '#FFFFFF'} 
          strokeWidth="3.5"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Crescent moon curve */}
          <path d="M 62 18 C 36 24, 22 48, 30 76 C 36 88, 52 94, 76 90 C 44 82, 38 48, 62 18 Z" fill={isLight ? 'rgba(216, 196, 165, 0.15)' : 'rgba(255, 255, 255, 0.12)'} />
          {/* Botanical vines & floral sprigs */}
          <path d="M 28 46 C 22 42, 16 48, 12 56 C 22 56, 26 50, 30 46" strokeWidth="2.5" />
          <path d="M 24 60 C 16 66, 18 76, 26 78 C 30 72, 28 64, 24 60" strokeWidth="2.5" />
          <path d="M 32 34 C 26 28, 32 20, 36 22 C 38 28, 34 32, 32 34" strokeWidth="2.5" />
          <circle cx="16" cy="46" r="2" fill={isLight ? '#E8CDD0' : '#FFFFFF'} />
          <circle cx="20" cy="74" r="2" fill={isLight ? '#E8CDD0' : '#FFFFFF'} />
          <circle cx="34" cy="20" r="2" fill={isLight ? '#E8CDD0' : '#FFFFFF'} />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <span 
          className={`font-serif tracking-widest font-semibold leading-none uppercase ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          } ${isLight ? 'text-brand-ivory' : 'text-brand-navy'}`}
        >
          Lils Spun
        </span>
        <span 
          className={`font-sans tracking-[0.35em] text-[9px] sm:text-[10px] uppercase font-light mt-0.5 ${
            isLight ? 'text-brand-champagne' : 'text-brand-rose'
          }`}
        >
          Boutique
        </span>
      </div>
    </Link>
  );
}

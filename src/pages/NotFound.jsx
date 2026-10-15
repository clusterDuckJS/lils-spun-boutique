import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-navy/5 text-brand-navy mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 text-brand-rose" />
        </div>

        <span className="text-xs uppercase tracking-luxury text-brand-rose font-semibold block">
          404 &bull; Page Not Found
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal">
          A Missing Thread
        </h1>

        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light">
          The page you are looking for may have been moved, renamed, or is temporarily unavailable in this prototype.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-7 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
          >
            Return to Homepage
          </Link>
          <Link
            to="/collections/new-arrivals"
            className="w-full sm:w-auto px-7 py-3.5 bg-white border border-brand-border hover:border-brand-navy text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-champagne" />
          </Link>
        </div>
      </div>
    </div>
  );
}

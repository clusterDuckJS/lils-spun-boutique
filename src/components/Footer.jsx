import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Heart } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-brand-ivory border-t border-brand-navy-light/40 relative overflow-hidden">
      {/* Decorative subtle crescent watermark overlay */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-1/4 translate-y-1/4">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="currentColor">
          <path d="M 62 18 C 36 24, 22 48, 30 76 C 36 88, 52 94, 76 90 C 44 82, 38 48, 62 18 Z" />
        </svg>
      </div>

      {/* Main Footer Links Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-sm text-brand-ivory/70 leading-relaxed max-w-sm mt-3">
              Thoughtfully curated traditional Indian ethnic wear, where timeless weaves meet contemporary feminine grace. Handcrafted silhouettes for your most treasured moments.
            </p>

            {/* Boutique Location & Demo Notice */}
            <div className="pt-2 space-y-2 text-xs text-brand-ivory/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-champagne shrink-0" />
                <span>Lils Spun Boutique, Flagship Studio, Kerala, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-champagne shrink-0" />
                <span>Boutique Stylist Inquiries: +91 (Demo Prototype)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-champagne shrink-0" />
                <span>concierge@lilsspunboutique.com (Demo)</span>
              </div>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-brand-navy-light/60 border border-brand-champagne/30 flex items-center justify-center text-brand-ivory hover:text-brand-champagne hover:border-brand-champagne transition-all"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-brand-navy-light/60 border border-brand-champagne/30 flex items-center justify-center text-brand-ivory hover:text-brand-champagne hover:border-brand-champagne transition-all"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <span className="text-[11px] tracking-wider text-brand-champagne/80 pl-1 font-serif italic">
                @lilsspunboutique
              </span>
            </div>
          </div>

          {/* Shop Column (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-luxury text-brand-champagne font-semibold flex items-center gap-1.5 pb-2 border-b border-brand-navy-light/60">
              <Sparkles className="w-3.5 h-3.5 text-brand-rose" /> Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-ivory/80">
              <li>
                <Link to="/collections/new-arrivals" className="hover:text-brand-champagne transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections/sarees" className="hover:text-brand-champagne transition-colors">
                  Handloom Sarees
                </Link>
              </li>
              <li>
                <Link to="/collections/salwar-suits" className="hover:text-brand-champagne transition-colors">
                  Salwar Suits & Anarkalis
                </Link>
              </li>
              <li>
                <Link to="/collections/kurtas-sets" className="hover:text-brand-champagne transition-colors">
                  Kurtas & Co-ord Sets
                </Link>
              </li>
              <li>
                <Link to="/collections/lehengas" className="hover:text-brand-champagne transition-colors">
                  Festive & Bridal Lehengas
                </Link>
              </li>
              <li>
                <Link to="/collections/festive-wear" className="hover:text-brand-champagne transition-colors">
                  The Festive Edit
                </Link>
              </li>
              <li>
                <Link to="/collections/accessories" className="hover:text-brand-champagne transition-colors">
                  Accessories & Jewelry
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-luxury text-brand-champagne font-semibold pb-2 border-b border-brand-navy-light/60">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-ivory/80">
              <li>
                <Link to="/contact" className="hover:text-brand-champagne transition-colors">
                  Contact Boutique
                </Link>
              </li>
              <li>
                <Link to="/pages/shipping" className="hover:text-brand-champagne transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/pages/returns" className="hover:text-brand-champagne transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/pages/faqs" className="hover:text-brand-champagne transition-colors">
                  Order FAQs
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-brand-champagne transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-brand-champagne transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Information & Legal (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-luxury text-brand-champagne font-semibold pb-2 border-b border-brand-navy-light/60">
              Boutique Info
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-ivory/80">
              <li>
                <Link to="/about" className="hover:text-brand-champagne transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/pages/privacy" className="hover:text-brand-champagne transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/terms" className="hover:text-brand-champagne transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            {/* Trust badge */}
            <div className="pt-4 border-t border-brand-navy-light/40">
              <span className="text-[10px] text-brand-champagne/90 block font-serif tracking-widest uppercase">
                Authenticity Guaranteed
              </span>
              <p className="text-[11px] text-brand-ivory/60 mt-1 leading-snug">
                Every garment is inspected with precision craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Disclaimer */}
        <div className="mt-12 pt-8 border-t border-brand-navy-light/60 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-ivory/60 gap-4">
          <p>
            &copy; {currentYear} Lils Spun Boutique. All rights reserved. (Frontend Design Prototype)
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/pages/privacy" className="hover:text-brand-ivory transition-colors">
              Privacy
            </Link>
            <span>&bull;</span>
            <Link to="/pages/terms" className="hover:text-brand-ivory transition-colors">
              Terms
            </Link>
            <span>&bull;</span>
            <Link to="/pages/faqs" className="hover:text-brand-ivory transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

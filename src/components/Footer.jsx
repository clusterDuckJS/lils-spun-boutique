import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Heart, ShieldCheck } from 'lucide-react';
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

            {/* Boutique Location & Contact */}
            <div className="pt-2 space-y-2.5 text-xs text-brand-ivory/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-champagne shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  LILS SPUN BOUTIQUE, SREE RAM GANESH ARCADE, RESIDENCY ROAD, ASRAMAM, KOLLAM, KERALA - 691002, INDIA
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-champagne shrink-0" />
                <a href="tel:+919747446174" className="hover:text-brand-champagne transition-colors">
                  +91 97474 46174
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-champagne shrink-0" />
                <a href="mailto:lilsspunboutique@gmail.com" className="hover:text-brand-champagne transition-colors">
                  lilsspunboutique@gmail.com
                </a>
              </div>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/lils.spunboutique/"
                target="_blank"
                rel="noopener noreferrer"
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
                href="https://www.instagram.com/lils.spunboutique/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wider text-brand-champagne/80 hover:text-brand-champagne transition-colors font-serif italic"
              >
                @lils.spunboutique
              </a>
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
                <Link to="/collections/ready-made" className="hover:text-brand-champagne transition-colors">
                  Ready Made
                </Link>
              </li>
              <li>
                <Link to="/collections/churidar-materials" className="hover:text-brand-champagne transition-colors">
                  Churidar Materials
                </Link>
              </li>
              <li>
                <Link to="/collections/sarees" className="hover:text-brand-champagne transition-colors">
                  Sarees
                </Link>
              </li>
              <li>
                <Link to="/collections/kids-wear" className="hover:text-brand-champagne transition-colors">
                  Kids Wear
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
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/account?tab=orders" className="hover:text-brand-champagne transition-colors">
                  Track My Orders
                </Link>
              </li>
              <li>
                <Link to="/pages/shipping" className="hover:text-brand-champagne transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/returns" className="hover:text-brand-champagne transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/faqs" className="hover:text-brand-champagne transition-colors">
                  Order FAQs
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-brand-champagne transition-colors">
                  My Patron Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Information & Legal (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-luxury text-brand-champagne font-semibold pb-2 border-b border-brand-navy-light/60">
              Boutique Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-ivory/80">
              <li>
                <Link to="/about" className="hover:text-brand-champagne transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pages/terms" className="hover:text-brand-champagne transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/pages/privacy" className="hover:text-brand-champagne transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/privacy" className="hover:text-brand-champagne transition-colors">
                  Grievance Redressal
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

        {/* Payment Methods & Security Assurance Banner (Mandatory for Gateways) */}
        <div className="mt-12 pt-8 border-t border-brand-navy-light/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-ivory/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-left">
              <span className="font-semibold text-brand-ivory block">100% Secure Checkout</span>
              <span className="text-[11px] text-brand-ivory/60">256-bit SSL Encryption &bull; RBI & PCI-DSS Compliant</span>
            </div>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold text-brand-navy tracking-wider uppercase">
            <span className="px-2.5 py-1 rounded bg-white font-bold text-[#5f259f]">UPI</span>
            <span className="px-2.5 py-1 rounded bg-white font-bold text-[#1a1f71]">VISA</span>
            <span className="px-2.5 py-1 rounded bg-white font-bold text-[#eb001b]">Mastercard</span>
            <span className="px-2.5 py-1 rounded bg-white font-bold text-[#008cba]">RuPay</span>
            <span className="px-2.5 py-1 rounded bg-white font-medium text-brand-navy">Net Banking</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Registered Address */}
        <div className="mt-6 pt-6 border-t border-brand-navy-light/40 flex flex-col md:flex-row items-center justify-between text-[11px] text-brand-ivory/60 gap-4 text-center md:text-left">
          <p>
            &copy; {currentYear} <strong>LILS SPUN BOUTIQUE</strong>. Sree Ram Ganesh Arcade, Residency Road, Asramam, Kollam, Kerala - 691002, India. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/pages/privacy" className="hover:text-brand-ivory transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/pages/terms" className="hover:text-brand-ivory transition-colors">
              Terms & Conditions
            </Link>
            <span>&bull;</span>
            <Link to="/pages/returns" className="hover:text-brand-ivory transition-colors">
              Cancellation & Refund Policy
            </Link>
            <span>&bull;</span>
            <Link to="/pages/shipping" className="hover:text-brand-ivory transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

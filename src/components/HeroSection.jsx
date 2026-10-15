import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, ShieldCheck, Feather } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-ivory border-b border-brand-border/40">
      {/* Hero container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Editorial Copy Column (Left 6 cols on lg) */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blush/40 border border-brand-blush text-brand-rose-dark text-xs uppercase tracking-luxury font-medium mx-auto lg:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
              <span>The Art of Indian Elegance</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-brand-navy leading-[1.15] text-balance">
              Tradition, Woven with Grace.
            </h1>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Discover thoughtfully curated Indian wear for every beautiful occasion. From lustrous Kanjivaram silks and royal Banarasi brocades to ethereal Anarkalis and artisanal lehengas.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/collections/festive-wear"
                className="w-full sm:w-auto px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-card hover:shadow-elevated transition-all group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-brand-champagne group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/collections/new-arrivals"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-brand-ivory text-brand-navy border border-brand-border hover:border-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <span>Shop New Arrivals</span>
              </Link>
            </div>

            {/* Mini Trust Highlights */}
            <div className="pt-6 border-t border-brand-border/60 grid grid-cols-3 gap-3 text-left">
              <div className="space-y-1">
                <span className="font-serif text-lg sm:text-xl font-medium text-brand-navy block">
                  100%
                </span>
                <span className="text-[11px] text-brand-muted leading-tight block">
                  Authentic Artisanal Weaves
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-lg sm:text-xl font-medium text-brand-navy block">
                  Handpicked
                </span>
                <span className="text-[11px] text-brand-muted leading-tight block">
                  Curated Festive Silhouettes
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-lg sm:text-xl font-medium text-brand-navy block">
                  Boutique
                </span>
                <span className="text-[11px] text-brand-muted leading-tight block">
                  Personalized Styling Care
                </span>
              </div>
            </div>
          </div>

          {/* Visual Editorial Image Column (Right 6 cols on lg) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Campaign Editorial Photography */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border-4 border-white aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                  alt="Lils Spun Boutique Festive Silk Collection"
                  aspectRatio="aspect-full"
                  className="w-full h-full object-cover object-top"
                />

                {/* Subtle soft gradient scrim on bottom for readability if needed */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs z-10 flex items-center justify-between">
                  <span className="font-serif italic tracking-wide text-sm text-brand-champagne">
                    Festive Silk Saree Edit
                  </span>
                  <Link
                    to="/collections/sarees"
                    className="text-[11px] underline underline-offset-4 hover:text-brand-champagne transition-colors"
                  >
                    View Sarees
                  </Link>
                </div>
              </div>

              {/* Floating Accent Card (Signature Detail) */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-dropdown border border-brand-border hidden sm:flex items-center gap-3.5 max-w-xs animate-in slide-in-from-bottom-2">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-champagne flex items-center justify-center shrink-0">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-luxury text-brand-rose font-bold block">
                    Boutique Craft
                  </span>
                  <p className="text-xs font-serif text-brand-navy font-medium leading-snug">
                    Intricate Zari & Scalloped Resham Weaving
                  </p>
                </div>
              </div>

              {/* Subtle decorative gold halo in background */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-champagne/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-lavender/30 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

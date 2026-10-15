import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Feather, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageWithFallback from '../components/ImageWithFallback';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumbs items={[{ label: 'Our Story' }]} />

      {/* Editorial Header */}
      <div className="max-w-3xl mx-auto text-center my-8 sm:my-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blush/40 border border-brand-blush text-brand-rose-dark text-xs uppercase tracking-luxury font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
          <span>The Soul of Lils Spun Boutique</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-brand-navy font-normal leading-tight">
          Where Heritage Weaves Meet Contemporary Poise.
        </h1>

        <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-light">
          Rooted in a profound appreciation for India's living handloom treasures, Lils Spun Boutique was conceived as a sanctuary for women who cherish the quiet grandeur of authentic ethnic fashion.
        </p>
      </div>

      {/* Visual Showcase: Real Flagship Boutique & Editorial */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-12">
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white aspect-[16/10]">
            <ImageWithFallback
              src={`${import.meta.env.BASE_URL}images/storefront.jpg`}
              alt="Lils Spun Boutique Flagship Storefront"
              aspectRatio="aspect-full"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-brand-champagne shrink-0" />
                <div>
                  <h3 className="font-serif text-base text-brand-ivory font-medium">Flagship Studio & Atelier</h3>
                  <p className="text-xs text-brand-champagne/90">Kerala, India</p>
                </div>
              </div>
              <span className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-brand-champagne text-brand-navy font-bold">
                Flagship Boutique
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <span className="text-xs uppercase tracking-luxury text-brand-rose font-semibold block">
            Curatorial Intent
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy font-normal leading-snug">
            Honouring the Rhythm of Handloom & Thread
          </h2>
          <p className="text-xs sm:text-sm text-brand-text/85 leading-relaxed font-light">
            Every garment at Lils Spun is chosen not simply for fleeting trends, but for how it feels when worn: the soothing whisper of Mulmul against warm skin, the structured confidence of Kanchipuram silk, and the luminous fall of hand-embroidered resham.
          </p>
          <p className="text-xs sm:text-sm text-brand-text/85 leading-relaxed font-light">
            We collaborate with traditional master weaver communities and embroidery artisans across Varanasi, Chanderi, Kanchipuram, and Rajasthan—curating edits that transition effortlessly from intimate family pujas to unforgettable destination weddings.
          </p>
        </div>
      </div>

      {/* 3 Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16 pt-12 border-t border-brand-border/60">
        <div className="p-8 rounded-2xl bg-white border border-brand-border shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-champagne flex items-center justify-center">
            <Feather className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-medium text-brand-navy">
            Living Textile Art
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed font-light">
            Preserving indigenous weaving arts through conscious selection, ensuring our patrons receive heirloom garments of enduring beauty.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-brand-border shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-xl bg-brand-rose/20 text-brand-rose-dark flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-medium text-brand-navy">
            Feminine Poise & Comfort
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed font-light">
            Intricate surface adornment paired with skin-friendly mulmul and breathable linings, so celebration feels as effortless as it looks.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-brand-border shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-xl bg-brand-champagne/40 text-brand-navy flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-medium text-brand-navy">
            Boutique Relationship
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed font-light">
            Personalised styling assistance, custom sleeve tailoring advice, and bespoke care for every order that leaves our studio.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-brand-navy text-brand-ivory rounded-3xl p-8 sm:p-14 text-center shadow-card space-y-6">
        <h2 className="font-serif text-2xl sm:text-4xl font-normal text-balance">
          Discover Pieces Spun for Your Most Cherished Memories
        </h2>
        <p className="text-xs sm:text-sm text-brand-ivory/80 max-w-xl mx-auto font-light">
          Whether you are assembling a wedding trousseau or seeking effortless daytime grace, we invite you to explore our latest arrivals.
        </p>
        <div>
          <Link
            to="/collections/festive-wear"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-champagne hover:bg-brand-champagne-light text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

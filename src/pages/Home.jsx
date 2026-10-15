import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, Heart, CheckCircle2, MapPin, Feather, Quote } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import Newsletter from '../components/Newsletter';
import ImageWithFallback from '../components/ImageWithFallback';
import { categories, occasions } from '../data/collections';
import { products, getNewArrivals, getProductsByCategory } from '../data/products';

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Section C: 8 New Arrival products
  const newArrivals = getNewArrivals().slice(0, 8);

  // Section F: Curated "The Festive Edit" collection (5 products)
  const festiveEditProducts = getProductsByCategory('festive-wear').slice(0, 4);

  // Section H: Customer Testimonials (Clearly labelled sample/demo reviews)
  const testimonials = [
    {
      id: 1,
      quote: "The Kanjivaram silk saree I ordered for my sister's wedding in Kochi was absolutely breathtaking. The antique gold zari weave and packaging felt like opening a royal heirloom.",
      author: "Ananya M.",
      location: "Bengaluru, Karnataka",
      occasion: "Wedding Celebration",
      verified: true
    },
    {
      id: 2,
      quote: "The Ivory Anarkali suit fits like a dream! The scalloped organza dupatta with resham embroidery is so delicate and lightweight. The boutique stylists were wonderful to communicate with.",
      author: "Dr. Priyamvada R.",
      location: "Ernakulam, Kerala",
      occasion: "Festive Evening",
      verified: true
    },
    {
      id: 3,
      quote: "Finding authentic Chanderi and pure Mulmul that drapes so gracefully in modern silhouettes is rare. Lils Spun Boutique has become my go-to for effortless festive elegance.",
      author: "Meera V.",
      location: "Chennai, Tamil Nadu",
      occasion: "Festive Puja & Dinner",
      verified: true
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* SECTION A: Hero Campaign */}
      <HeroSection />

      {/* SECTION B: Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-luxury text-brand-rose font-semibold block mb-2">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal mb-3">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
            Explore handcrafted silhouettes tailored to honour the poetry of traditional Indian textiles.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* SECTION C: New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 border-b border-brand-border/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury text-brand-rose font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Freshly Handcrafted</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-navy font-normal">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-navy font-semibold hover:text-brand-rose transition-colors group self-start sm:self-auto"
          >
            <span>View All New Arrivals ({products.filter(p => p.newArrival).length})</span>
            <ArrowRight className="w-4 h-4 text-brand-rose group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
          >
            <span>Explore All New Arrivals</span>
            <ArrowRight className="w-4 h-4 text-brand-champagne" />
          </Link>
        </div>
      </section>

      {/* SECTION D: Editorial Campaign Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-brand-navy text-brand-ivory shadow-elevated border border-brand-champagne/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Editorial Text Area */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6 z-10">
              <span className="text-xs uppercase tracking-luxury text-brand-champagne font-semibold block">
                Editorial Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] text-balance">
                Celebrating Every Occasion
              </h2>
              <p className="text-sm sm:text-base text-brand-ivory/80 leading-relaxed font-light max-w-lg">
                From intimate daytime gatherings to grand starlit celebrations, find pieces that feel unmistakably yours. Handwoven silks, delicate mukaish sprays, and bespoke Anarkali flairs designed to elevate every entrance.
              </p>
              <div className="pt-2">
                <Link
                  to="/collections/festive-wear"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-champagne hover:bg-brand-champagne-light text-brand-navy rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
                >
                  <span>Discover the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Campaign Visual */}
            <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full relative overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                alt="Celebrating Every Occasion Campaign"
                aspectRatio="aspect-auto"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-navy via-brand-navy/30 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION E: Shop by Occasion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-luxury text-brand-rose font-semibold block mb-2">
            Tailored For Your Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal mb-3">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted font-light">
            Whether for a temple ceremony, sangeet night, or effortless everyday grace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              to={occ.href}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-soft border border-brand-border/60 hover:shadow-card hover:border-brand-champagne transition-all"
            >
              <ImageWithFallback
                src={occ.image}
                alt={occ.name}
                aspectRatio="aspect-full"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-brand-ivory z-10 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-medium mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-xl font-medium tracking-wide group-hover:text-brand-champagne transition-colors">
                  {occ.name}
                </h3>
                <p className="text-xs text-brand-ivory/70 mt-1 line-clamp-2 font-light">
                  {occ.tagline}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-champagne font-medium group-hover:translate-x-1 transition-transform">
                  <span>Explore Edit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION F: Curated Collection (The Festive Edit) */}
      <section className="bg-brand-ivory-muted/70 py-16 sm:py-20 border-t border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury text-brand-rose font-medium mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
                <span>Signature Showcase</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-navy font-normal">
                The Festive Edit
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xl font-light">
                Opulent Brocades, regal velvet details, and jewel-toned coords handpicked for celebrations.
              </p>
            </div>
            <Link
              to="/collections/festive-wear"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-navy font-semibold hover:text-brand-rose transition-colors group self-start sm:self-auto"
            >
              <span>View Full Festive Edit</span>
              <ArrowRight className="w-4 h-4 text-brand-rose group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {festiveEditProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: Brand Story & Flagship Boutique Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Real Boutique Storefront Photo & Craft Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated border-4 border-white aspect-[4/3] sm:aspect-[16/10]">
              <ImageWithFallback
                src={`${import.meta.env.BASE_URL}images/storefront.jpg`}
                alt="Lils Spun Boutique Storefront"
                aspectRatio="aspect-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-champagne shrink-0" />
                  <span className="text-xs font-serif text-brand-ivory tracking-wide">
                    Flagship Boutique Experience, Kerala
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-brand-champagne text-brand-navy font-bold">
                  Visit Us
                </span>
              </div>
            </div>

            {/* Overlapping Detail Vignette */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 w-36 sm:w-44 aspect-square rounded-xl overflow-hidden shadow-dropdown border-3 border-white hidden sm:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80"
                alt="Artisan Silk Weaving Detail"
                aspectRatio="aspect-square"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Editorial Brand Narrative */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-champagne/30 text-brand-navy text-xs uppercase tracking-luxury font-medium">
              <Feather className="w-3.5 h-3.5 text-brand-rose" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-navy leading-tight">
              Tradition in Every Thread.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-brand-text/80 leading-relaxed font-light">
              <p>
                At <strong>Lils Spun Boutique</strong>, we celebrate the enduring soul of Indian craftsmanship. Every saree, Anarkali silhouette, and hand-embroidered ensemble is curated with deep respect for heritage weaving traditions and contemporary poise.
              </p>
              <p>
                We believe ethnic fashion should feel as comfortable as it is magnificent. Our garments combine soft, breathable linings with opulent surface detailing—so you can dance through sangeet nights and celebrate family milestones with absolute confidence.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-brand-ivory rounded-full text-xs uppercase tracking-widest font-semibold shadow-card transition-all"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 text-brand-champagne" />
              </Link>
              <Link
                to="/contact"
                className="text-xs uppercase tracking-widest text-brand-navy hover:text-brand-rose font-medium py-2 px-4 transition-colors"
              >
                Visit Boutique
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION H: Customer Testimonials (Demo Labels) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-luxury text-brand-muted font-medium mb-1">
            <span className="w-2 h-2 rounded-full bg-brand-rose" />
            <span>Sample Client Testimonials (Demo Content)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-normal mb-3">
            Voices of Elegance
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted font-light">
            Reflecting genuine patronage from patrons across celebrations and ceremonies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-brand-blush/60 mb-2" />
                <p className="text-xs sm:text-sm text-brand-text/85 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-medium text-brand-navy">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-brand-muted">
                    {t.location} &bull; {t.occasion}
                  </p>
                </div>
                {t.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Sample Review
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION I: Newsletter */}
      <Newsletter />

      {/* Quick View Modal for Homepage Product Clicks */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

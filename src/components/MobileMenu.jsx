import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, Heart, ShoppingBag, Search, Sparkles, Phone, HelpCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function MobileMenu({ isOpen, onClose, onOpenSearch }) {
  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpandedCategory(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const menuSections = [
    {
      title: 'New Arrivals',
      href: '/collections/new-arrivals',
      isDirect: true,
      badge: 'Fresh'
    },
    {
      title: 'Sarees',
      id: 'sarees',
      href: '/collections/sarees',
      items: [
        { label: 'View All Sarees', href: '/collections/sarees' },
        { label: 'Kanjivaram Silk', href: '/collections/sarees?fabric=Kanchipuram' },
        { label: 'Banarasi Brocade', href: '/collections/sarees?fabric=Banarasi' },
        { label: 'Organza & Chiffon', href: '/collections/sarees?fabric=Organza' },
        { label: 'Handloom Chanderi', href: '/collections/sarees?fabric=Chanderi' }
      ]
    },
    {
      title: 'Salwar Suits',
      id: 'salwar-suits',
      href: '/collections/salwar-suits',
      items: [
        { label: 'View All Suits', href: '/collections/salwar-suits' },
        { label: 'Anarkali Sets', href: '/collections/salwar-suits?tag=Anarkali' },
        { label: 'Sharara Sets', href: '/collections/salwar-suits?tag=Sharara' },
        { label: 'Straight Cut Suits', href: '/collections/salwar-suits?fabric=Chanderi' },
        { label: 'Occasion Velvet', href: '/collections/salwar-suits?fabric=Velvet' }
      ]
    },
    {
      title: 'Kurtas & Sets',
      id: 'kurtas-sets',
      href: '/collections/kurtas-sets',
      items: [
        { label: 'View All Kurtas', href: '/collections/kurtas-sets' },
        { label: 'Mulmul Cotton Sets', href: '/collections/kurtas-sets?fabric=Cotton' },
        { label: 'Angrakha Silhouettes', href: '/collections/kurtas-sets?tag=Angrakha' },
        { label: 'Festive Silk Kurtas', href: '/collections/kurtas-sets?fabric=Silk' }
      ]
    },
    {
      title: 'Lehengas',
      id: 'lehengas',
      href: '/collections/lehengas',
      items: [
        { label: 'View All Lehengas', href: '/collections/lehengas' },
        { label: 'Bridal & Reception', href: '/collections/lehengas?tag=Bridal' },
        { label: 'Pastel Embroidered', href: '/collections/lehengas?tag=Pastels' },
        { label: 'Heritage Velvet', href: '/collections/lehengas?fabric=Velvet' }
      ]
    },
    {
      title: 'Festive Collection',
      href: '/collections/festive-wear',
      isDirect: true,
      badge: 'Edit'
    },
    {
      title: 'Accessories & Jewelry',
      id: 'accessories',
      href: '/collections/accessories',
      items: [
        { label: 'View All Accessories', href: '/collections/accessories' },
        { label: 'Zardozi Potlis & Bags', href: '/collections/accessories?tag=Potli' },
        { label: 'Kundan & Pearl Jewelry', href: '/collections/accessories?tag=Heritage' },
        { label: 'Statement Jhumkas', href: '/collections/accessories?tag=Jhumkas' },
        { label: 'Handcrafted Dupattas', href: '/collections/accessories?tag=Dupatta' }
      ]
    }
  ];

  const toggleSection = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-brand-ivory h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Top bar */}
        <div className="p-4 flex items-center justify-between border-b border-brand-border bg-white">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="p-2 text-brand-muted hover:text-brand-navy rounded-full transition-colors"
            aria-label="Close mobile navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search trigger in drawer */}
        <div className="p-4 bg-brand-ivory-light border-b border-brand-border">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-white border border-brand-border text-brand-muted text-xs shadow-soft text-left"
          >
            <Search className="w-4 h-4 text-brand-rose" />
            <span>Search sarees, anarkalis, lehengas...</span>
          </button>
        </div>

        {/* Navigation items list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {menuSections.map((sec, idx) => (
            <div key={idx} className="border-b border-brand-border/40 last:border-0 pb-1">
              {sec.isDirect ? (
                <Link
                  to={sec.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-3 px-2 text-sm font-medium text-brand-navy hover:text-brand-rose transition-colors"
                >
                  <span className="font-serif text-base">{sec.title}</span>
                  {sec.badge && (
                    <span className="text-[10px] px-2 py-0.5 bg-brand-blush/60 text-brand-rose-dark font-sans rounded-full uppercase tracking-wider">
                      {sec.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full flex items-center justify-between py-3 px-2 text-sm font-medium text-brand-navy hover:text-brand-rose transition-colors"
                  >
                    <span className="font-serif text-base">{sec.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${
                        expandedCategory === sec.id ? 'rotate-180 text-brand-navy' : ''
                      }`}
                    />
                  </button>

                  {/* Expandable sub-items */}
                  {expandedCategory === sec.id && (
                    <div className="pl-4 pr-2 pb-2 space-y-1 bg-white/60 rounded-lg py-2 my-1 animate-in slide-in-from-top-1">
                      {sec.items.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.href}
                          onClick={onClose}
                          className="flex items-center justify-between py-2 px-2 text-xs text-brand-text/80 hover:text-brand-navy hover:font-medium transition-colors"
                        >
                          <span>{sub.label}</span>
                          <ChevronRight className="w-3 h-3 text-brand-muted/60" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Editorial & Information Links */}
          <div className="pt-4 mt-2 space-y-2 text-xs">
            <span className="text-[10px] uppercase tracking-luxury text-brand-muted font-medium px-2 block">
              About The Boutique
            </span>
            <Link
              to="/about"
              onClick={onClose}
              className="flex items-center gap-2 py-2 px-2 text-brand-text/80 hover:text-brand-navy font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-champagne" /> Our Story & Craftsmanship
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center gap-2 py-2 px-2 text-brand-text/80 hover:text-brand-navy"
            >
              <Phone className="w-3.5 h-3.5 text-brand-rose" /> Contact Boutique Stylists
            </Link>
            <Link
              to="/pages/faqs"
              onClick={onClose}
              className="flex items-center gap-2 py-2 px-2 text-brand-text/80 hover:text-brand-navy"
            >
              <HelpCircle className="w-3.5 h-3.5 text-brand-muted" /> FAQs & Ordering Help
            </Link>
          </div>
        </div>

        {/* Bottom utility bar: Wishlist & Cart */}
        <div className="p-4 bg-white border-t border-brand-border grid grid-cols-2 gap-3 shrink-0">
          <Link
            to="/wishlist"
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-brand-border hover:bg-brand-blush/20 text-xs font-medium text-brand-navy transition-colors"
          >
            <Heart className="w-4 h-4 text-brand-rose" />
            <span>Wishlist ({wishlistCount})</span>
          </Link>
          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-brand-navy text-brand-ivory hover:bg-brand-navy-light text-xs font-medium transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-brand-champagne" />
            <span>Bag ({itemCount})</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

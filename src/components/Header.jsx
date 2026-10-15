import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ChevronDown, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';
import AnnouncementBar from './AnnouncementBar';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

// MegaMenu data definition
const megaMenuData = {
  sarees: {
    columns: [
      {
        title: 'By Weave & Heritage',
        links: [
          { label: 'All Sarees', href: '/collections/sarees' },
          { label: 'Kanjivaram Pure Silk', href: '/collections/sarees?fabric=Kanchipuram', badge: 'Heritage' },
          { label: 'Banarasi Brocade', href: '/collections/sarees?fabric=Banarasi' },
          { label: 'Handloom Chanderi', href: '/collections/sarees?fabric=Chanderi' },
          { label: 'Handblock Printed', href: '/collections/sarees?tag=Handblock' }
        ]
      },
      {
        title: 'Modern & Sheer Drapes',
        links: [
          { label: 'Pure Organza Silk', href: '/collections/sarees?fabric=Organza', badge: 'Trending' },
          { label: 'Tissue Metallic Silk', href: '/collections/sarees?fabric=Tissue' },
          { label: 'Pastel Handpainted', href: '/collections/sarees?tag=Pastel' },
          { label: 'Embroidered Border Sarees', href: '/collections/sarees?tag=Festive' }
        ]
      },
      {
        title: 'Shop by Occasion',
        links: [
          { label: 'Bridal & Trousseau', href: '/collections/sarees?occasion=Wedding+Guest' },
          { label: 'Festive Celebrations', href: '/collections/sarees?occasion=Festive+Celebrations' },
          { label: 'Daytime Functions', href: '/collections/sarees?occasion=Everyday+Elegance' },
          { label: 'Cocktail & Evening', href: '/collections/sarees?occasion=Special+Occasions' }
        ]
      }
    ],
    featuredTitle: 'The Heirloom Silk Edit',
    featuredSubtitle: 'Lustrous weaves imbued with timeless antique gold zari.',
    featuredImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/sarees'
  },
  'salwar-suits': {
    columns: [
      {
        title: 'Silhouettes',
        links: [
          { label: 'All Salwar Suits', href: '/collections/salwar-suits' },
          { label: 'Sweeping Anarkali Sets', href: '/collections/salwar-suits?tag=Anarkali', badge: 'Bestseller' },
          { label: 'Flared Sharara Sets', href: '/collections/salwar-suits?tag=Sharara' },
          { label: 'Straight Cut Sets', href: '/collections/salwar-suits?fabric=Chanderi' },
          { label: 'Palazzo Suits', href: '/collections/salwar-suits?tag=Subtle' }
        ]
      },
      {
        title: 'Fabrics & Crafts',
        links: [
          { label: 'Handloom Chanderi', href: '/collections/salwar-suits?fabric=Chanderi' },
          { label: 'Pure Georgette & Resham', href: '/collections/salwar-suits?fabric=Georgette' },
          { label: 'Velvet & Winter Silk', href: '/collections/salwar-suits?fabric=Velvet', badge: 'Royal' },
          { label: 'Zardozi Handwork', href: '/collections/salwar-suits?tag=Regal' }
        ]
      },
      {
        title: 'Occasions',
        links: [
          { label: 'Wedding Guest', href: '/collections/salwar-suits?occasion=Wedding+Guest' },
          { label: 'Festive Celebrations', href: '/collections/salwar-suits?occasion=Festive+Celebrations' },
          { label: 'Intimate Soirees', href: '/collections/salwar-suits?occasion=Everyday+Elegance' }
        ]
      }
    ],
    featuredTitle: 'Embroidered Anarkalis',
    featuredSubtitle: '28-kali flared silhouettes with hand-cut scalloped dupattas.',
    featuredImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/salwar-suits'
  },
  'kurtas-sets': {
    columns: [
      {
        title: 'Styles & Cuts',
        links: [
          { label: 'All Kurtas & Sets', href: '/collections/kurtas-sets' },
          { label: 'Mughal Angrakha Sets', href: '/collections/kurtas-sets?tag=Angrakha', badge: 'Signature' },
          { label: 'Straight Tunic & Cigarette Pants', href: '/collections/kurtas-sets?fabric=Cotton' },
          { label: 'Flared Kurta & Palazzo', href: '/collections/kurtas-sets?fabric=Chanderi' }
        ]
      },
      {
        title: 'Everyday To Festive',
        links: [
          { label: 'Pure Mulmul Cotton', href: '/collections/kurtas-sets?fabric=Cotton', badge: 'Breathable' },
          { label: 'Festive Silk Blends', href: '/collections/kurtas-sets?fabric=Silk' },
          { label: 'Pintuck & Linen Tailoring', href: '/collections/kurtas-sets?tag=Minimalist' }
        ]
      },
      {
        title: 'Curated Palette',
        links: [
          { label: 'Soothing Lavender & Mauve', href: '/collections/kurtas-sets?colour=Lavender' },
          { label: 'Champagne Beige & Ivory', href: '/collections/kurtas-sets?colour=Champagne' },
          { label: 'Turmeric & Marigold', href: '/collections/kurtas-sets?colour=Marigold' }
        ]
      }
    ],
    featuredTitle: 'Everyday Grace',
    featuredSubtitle: 'Tailored for breathable comfort and effortless boutique charm.',
    featuredImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/kurtas-sets'
  },
  lehengas: {
    columns: [
      {
        title: 'Occasion Edit',
        links: [
          { label: 'All Lehengas', href: '/collections/lehengas' },
          { label: 'Bridal & Reception', href: '/collections/lehengas?tag=Bridal', badge: 'Opulent' },
          { label: 'Sangeet & Cocktail', href: '/collections/lehengas?tag=Reception' },
          { label: 'Destination Wedding Pastels', href: '/collections/lehengas?tag=Pastels' }
        ]
      },
      {
        title: 'Signature Textures',
        links: [
          { label: 'Tissue Silk & Cut-dana', href: '/collections/lehengas?fabric=Tissue' },
          { label: 'French Net & Resham', href: '/collections/lehengas?fabric=Net' },
          { label: 'Royal Navy Velvet', href: '/collections/lehengas?fabric=Velvet', badge: 'Exclusive' },
          { label: 'Raw Silk & Foil Mirror', href: '/collections/lehengas?tag=Modern' }
        ]
      },
      {
        title: 'Services',
        links: [
          { label: 'Custom Stitching Options', href: '/pages/shipping' },
          { label: 'Styling Consultation', href: '/contact' }
        ]
      }
    ],
    featuredTitle: 'The Royal Starlight Lehenga',
    featuredSubtitle: 'Luminous cut-dana, pearls, and sweeping double can-can flares.',
    featuredImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/lehengas'
  },
  accessories: {
    columns: [
      {
        title: 'Potlis & Bags',
        links: [
          { label: 'All Accessories', href: '/collections/accessories' },
          { label: 'Handcrafted Zardozi Potlis', href: '/collections/accessories?tag=Potli', badge: 'Handmade' },
          { label: 'Embroidered Velvet Clutches', href: '/collections/accessories?tag=Artisanal' }
        ]
      },
      {
        title: 'Heritage Jewelry',
        links: [
          { label: 'Kundan & Fresh Pearl Chokers', href: '/collections/accessories?tag=Heritage' },
          { label: 'Jadau Polki Statement Jhumkas', href: '/collections/accessories?tag=Jhumkas' },
          { label: 'Meenakari Layered Pieces', href: '/collections/accessories?occasion=Festive+Celebrations' }
        ]
      },
      {
        title: 'Artisanal Dupattas',
        links: [
          { label: 'Handwoven Chanderi Zari', href: '/collections/accessories?tag=Dupatta' },
          { label: 'Scalloped Silk Organza', href: '/collections/accessories?tag=Classic' }
        ]
      }
    ],
    featuredTitle: 'Heirloom Accents',
    featuredSubtitle: 'Finely beaded potlis and 22k gold-plated Jadau Kundan pieces.',
    featuredImage: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/accessories'
  }
};

export default function Header() {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();
  const location = useLocation();

  // Handle sticky header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on page change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-ivory/98 backdrop-blur-md shadow-soft border-b border-brand-border/80' 
          : 'bg-brand-ivory border-b border-brand-border/40'
      }`}>
        <AnnouncementBar />

        {/* =========================================================================
            DESKTOP HEADER ARCHITECTURE (Spacious 2-Tier Luxury Layout)
           ========================================================================= */}
        <div className="hidden lg:block">
          {/* TIER 1: Brand & Utilities Row */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 sm:py-5">
            <div className="flex items-center justify-between">
              
              {/* Left: Brand Logo */}
              <div className="flex items-center">
                <BrandLogo size="default" />
              </div>

              {/* Right: Search Icon, Wishlist & Shopping Bag Utility Cluster */}
              <div className="flex items-center space-x-3 sm:space-x-5">
                {/* Search icon button only */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-brand-navy hover:text-brand-rose transition-colors rounded-full hover:bg-brand-blush/20"
                  aria-label="Search collection"
                  title="Search collections"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Wishlist Link with count badge */}
                <Link
                  to="/wishlist"
                  className="relative p-2 text-brand-navy hover:text-brand-rose transition-colors rounded-full hover:bg-brand-blush/20"
                  aria-label={`Wishlist with ${wishlistCount} items`}
                  title="Saved Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-brand-rose fill-brand-rose' : ''}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-rose text-white text-[10px] font-sans font-bold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Shopping Bag with item count badge */}
                <Link
                  to="/cart"
                  className="relative p-2 text-brand-navy hover:text-brand-rose transition-colors rounded-full hover:bg-brand-blush/20"
                  aria-label={`Shopping bag with ${itemCount} items`}
                  title="Shopping Bag"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-brand-navy text-brand-champagne text-[10px] font-sans font-bold flex items-center justify-center border border-brand-ivory">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>

            </div>
          </div>

          {/* TIER 2: Dedicated Editorial Navigation Bar */}
          <div className="relative border-t border-brand-border/60 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <nav className="flex items-center justify-center space-x-6 xl:space-x-8 h-11 text-xs">
                
                {/* New Arrivals */}
                <Link
                  to="/collections/new-arrivals"
                  onMouseEnter={() => setActiveMegaMenu(null)}
                  className={`uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                    location.pathname === '/collections/new-arrivals' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                  }`}
                >
                  New Arrivals
                </Link>

                {/* Sarees */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu('sarees')}
                >
                  <Link
                    to="/collections/sarees"
                    className={`flex items-center gap-1 uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                      location.pathname === '/collections/sarees' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                    }`}
                  >
                    Sarees
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>
                </div>

                {/* Salwar Suits */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu('salwar-suits')}
                >
                  <Link
                    to="/collections/salwar-suits"
                    className={`flex items-center gap-1 uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                      location.pathname === '/collections/salwar-suits' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                    }`}
                  >
                    Salwar Suits
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>
                </div>

                {/* Kurtas & Sets */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu('kurtas-sets')}
                >
                  <Link
                    to="/collections/kurtas-sets"
                    className={`flex items-center gap-1 uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                      location.pathname === '/collections/kurtas-sets' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                    }`}
                  >
                    Kurtas & Sets
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>
                </div>

                {/* Lehengas */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu('lehengas')}
                >
                  <Link
                    to="/collections/lehengas"
                    className={`flex items-center gap-1 uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                      location.pathname === '/collections/lehengas' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                    }`}
                  >
                    Lehengas
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>
                </div>

                {/* Festive Edit */}
                <Link
                  to="/collections/festive-wear"
                  onMouseEnter={() => setActiveMegaMenu(null)}
                  className={`uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                    location.pathname === '/collections/festive-wear' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                  }`}
                >
                  Festive Edit
                </Link>

                {/* Accessories */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu('accessories')}
                >
                  <Link
                    to="/collections/accessories"
                    className={`flex items-center gap-1 uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                      location.pathname === '/collections/accessories' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                    }`}
                  >
                    Accessories
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>
                </div>

              </nav>
            </div>

            {/* MegaMenu Dropdown Pane */}
            {activeMegaMenu && megaMenuData[activeMegaMenu] && (
              <div onMouseLeave={() => setActiveMegaMenu(null)}>
                <MegaMenu
                  category={megaMenuData[activeMegaMenu]}
                  isOpen={Boolean(activeMegaMenu)}
                  onClose={() => setActiveMegaMenu(null)}
                />
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            MOBILE HEADER ARCHITECTURE (Uncrowded, perfectly balanced)
           ========================================================================= */}
        <div className="lg:hidden px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Mobile hamburger button & Search icon */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-1 text-brand-navy hover:text-brand-rose transition-colors rounded-lg"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-brand-navy hover:text-brand-rose transition-colors rounded-lg"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-1 flex justify-center">
              <BrandLogo size="sm" />
            </div>

            {/* Right: Wishlist & Bag */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Link
                to="/wishlist"
                className="relative p-2 text-brand-navy hover:text-brand-rose transition-colors rounded-lg"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-brand-rose fill-brand-rose' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute 1 top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-rose text-white text-[9px] font-sans font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative p-2 text-brand-navy hover:text-brand-rose transition-colors rounded-lg"
                aria-label={`Shopping bag (${itemCount})`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-navy text-brand-champagne text-[9px] font-sans font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ChevronDown, Sparkles, User, LogOut, Package, ShieldCheck } from 'lucide-react';
import BrandLogo from './BrandLogo';
import AnnouncementBar from './AnnouncementBar';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// MegaMenu data definition for the 4 core categories
const megaMenuData = {
  'ready-made': {
    columns: [
      {
        title: 'Silhouettes & Gowns',
        links: [
          { label: 'All Ready Made', href: '/collections/ready-made' },
          { label: 'Embroidered Anarkali Gowns', href: '/collections/ready-made?tag=Anarkali', badge: 'Bestseller' },
          { label: 'Mughal Angrakha Sets', href: '/collections/ready-made?tag=Angrakha', badge: 'Signature' },
          { label: 'Pre-Stitched Festive Coordinates', href: '/collections/ready-made' }
        ]
      },
      {
        title: 'Fabrics & Craft',
        links: [
          { label: 'Pure Georgette & Sequins', href: '/collections/ready-made?fabric=Georgette' },
          { label: 'Royal Velvet & Organza', href: '/collections/ready-made?fabric=Velvet', badge: 'Winter' },
          { label: 'Zari Cord Handwork', href: '/collections/ready-made?tag=Ready+Made' }
        ]
      },
      {
        title: 'Occasions',
        links: [
          { label: 'Festive Celebrations', href: '/collections/ready-made?occasion=Festive+Celebrations' },
          { label: 'Wedding Guest Ensembles', href: '/collections/ready-made?occasion=Wedding+Guest' },
          { label: 'Evening Soirees', href: '/collections/ready-made' }
        ]
      }
    ],
    featuredTitle: 'Ready-to-Wear Elegance',
    featuredSubtitle: 'Exquisite pre-stitched floor-length gowns and royal velvet Angrakhas.',
    featuredImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/ready-made'
  },
  'churidar-materials': {
    columns: [
      {
        title: 'Unstitched Sets',
        links: [
          { label: 'All Churidar Materials', href: '/collections/churidar-materials' },
          { label: 'Handloom Chanderi Silk 3-Piece', href: '/collections/churidar-materials?fabric=Chanderi', badge: 'Handloom' },
          { label: 'Pure 100s Mulmul Cotton Sets', href: '/collections/churidar-materials?fabric=Cotton', badge: 'Breathable' },
          { label: 'Bespoke Tailoring Fabrics', href: '/collections/churidar-materials' }
        ]
      },
      {
        title: 'Artisanal Weaves',
        links: [
          { label: 'Traditional Zari Butis', href: '/collections/churidar-materials?tag=Handloom' },
          { label: 'Kashmiri Resham Yoke Work', href: '/collections/churidar-materials?tag=Kashmiri' },
          { label: 'Kota Doria Handblock Dupattas', href: '/collections/churidar-materials' }
        ]
      },
      {
        title: 'Curated Palette',
        links: [
          { label: 'Sage Green & Gold', href: '/collections/churidar-materials?colour=Sage' },
          { label: 'Pastel Lavender & Pearl', href: '/collections/churidar-materials?colour=Lavender' },
          { label: 'Everyday Elegance', href: '/collections/churidar-materials?occasion=Everyday+Elegance' }
        ]
      }
    ],
    featuredTitle: 'Artisanal Dress Materials',
    featuredSubtitle: 'Handcrafted pure fabrics complete with woven dupattas ready for bespoke tailoring.',
    featuredImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/churidar-materials'
  },
  sarees: {
    columns: [
      {
        title: 'By Weave & Heritage',
        links: [
          { label: 'All Sarees', href: '/collections/sarees' },
          { label: 'Kanjivaram Pure Silk', href: '/collections/sarees?fabric=Mulberry', badge: 'Heritage' },
          { label: 'Banarasi Brocade Silk', href: '/collections/sarees?fabric=Katan', badge: 'Royal' },
          { label: 'Temple Zari Borders', href: '/collections/sarees?tag=Kanjivaram' }
        ]
      },
      {
        title: 'Silks & Craftsmanship',
        links: [
          { label: 'Pure Mulberry Silk', href: '/collections/sarees?fabric=Mulberry' },
          { label: 'Katan Silk Sona Rupa', href: '/collections/sarees?fabric=Katan' },
          { label: 'Handcrafted Heirlooms', href: '/collections/sarees?tag=Heirloom' }
        ]
      },
      {
        title: 'Shop by Occasion',
        links: [
          { label: 'Bridal & Trousseau', href: '/collections/sarees?occasion=Wedding+Guest' },
          { label: 'Festive Celebrations', href: '/collections/sarees?occasion=Festive+Celebrations' },
          { label: 'Intimate Ceremonies', href: '/collections/sarees?occasion=Special+Occasions' }
        ]
      }
    ],
    featuredTitle: 'The Heirloom Silk Edit',
    featuredSubtitle: 'Lustrous weaves imbued with timeless antique gold zari and pure silk purity.',
    featuredImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/sarees'
  },
  'kids-wear': {
    columns: [
      {
        title: 'Traditional Attire',
        links: [
          { label: 'All Kids Wear', href: '/collections/kids-wear' },
          { label: 'Girls Silk Pattu Pavadai Sets', href: '/collections/kids-wear?tag=Pattu', badge: 'Popular' },
          { label: 'Boys Jacquard Kurta & Dhoti', href: '/collections/kids-wear?tag=Dhoti', badge: 'Festive' },
          { label: 'Comfort Fit Silhouettes', href: '/collections/kids-wear' }
        ]
      },
      {
        title: 'Gentle Craftsmanship',
        links: [
          { label: 'Pure Cotton Inner Linings', href: '/collections/kids-wear?fabric=Cotton' },
          { label: 'Soft Non-Scratchy Zari', href: '/collections/kids-wear' },
          { label: 'Elasticated Easy-Wear Waists', href: '/collections/kids-wear' }
        ]
      },
      {
        title: 'Age Groups',
        links: [
          { label: 'Toddlers (2 - 3 Years)', href: '/collections/kids-wear' },
          { label: 'Little Princes & Princesses (4 - 7 Years)', href: '/collections/kids-wear' },
          { label: 'Young Royalty (8 - 12 Years)', href: '/collections/kids-wear' }
        ]
      }
    ],
    featuredTitle: 'Traditional Kids Heritage',
    featuredSubtitle: 'Irresistibly adorable, skin-friendly traditional attire tailored for young celebrations.',
    featuredImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    featuredHref: '/collections/kids-wear'
  }
};

export default function Header() {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountMenuRef = useRef(null);

  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();
  const { isAuthenticated, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close account menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle sticky header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu & account menu on page change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    setIsAccountOpen(false);
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

              {/* Right: Search Icon, Account, Wishlist & Shopping Bag Utility Cluster */}
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

                {/* Account / Patron Profile Dropdown */}
                <div className="relative" ref={accountMenuRef}>
                  {isAuthenticated ? (
                    <button
                      type="button"
                      onClick={() => setIsAccountOpen(!isAccountOpen)}
                      className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 text-brand-navy hover:text-brand-rose transition-all rounded-full hover:bg-brand-blush/20 border border-brand-border/60"
                      aria-label="Account options"
                      title={`Signed in as ${profile?.fullName || 'Patron'}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-brand-navy text-brand-champagne flex items-center justify-center text-xs font-semibold">
                        {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'P'}
                      </div>
                      <span className="text-xs font-medium max-w-[85px] truncate hidden xl:inline-block">
                        {profile?.fullName?.split(' ')[0] || 'Patron'}
                      </span>
                      <ChevronDown className={`w-3 h-3 text-brand-muted transition-transform duration-200 hidden sm:inline-block ${isAccountOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="p-2 text-brand-navy hover:text-brand-rose transition-colors rounded-full hover:bg-brand-blush/20 flex items-center gap-1.5"
                      aria-label="Sign In or Register"
                      title="Sign In / Register"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-xs font-medium hidden xl:inline-block">Sign In</span>
                    </Link>
                  )}

                  {/* Account Dropdown Pane */}
                  {isAuthenticated && isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-dropdown border border-brand-border/80 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-4 py-2.5 border-b border-brand-border/60">
                        <p className="text-xs font-medium text-brand-navy truncate">{profile?.fullName || 'Boutique Patron'}</p>
                        <p className="text-[11px] text-brand-muted truncate">{profile?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/account?tab=overview"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-brand-text hover:bg-brand-ivory hover:text-brand-navy transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-brand-rose" />
                          <span>My Account</span>
                        </Link>
                        <Link
                          to="/account?tab=orders"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-brand-text hover:bg-brand-ivory hover:text-brand-navy transition-colors"
                        >
                          <Package className="w-3.5 h-3.5 text-brand-champagne" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          to="/account?tab=address"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-brand-text hover:bg-brand-ivory hover:text-brand-navy transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
                          <span>Saved Address</span>
                        </Link>
                        <Link
                          to="/admin"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-brand-navy hover:bg-brand-rose/10 transition-colors font-semibold"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-rose" />
                          <span>Admin Console</span>
                        </Link>
                      </div>
                      <div className="pt-1 border-t border-brand-border/60">
                        <button
                          type="button"
                          onClick={async () => {
                            setIsAccountOpen(false);
                            await signOut();
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

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

                {/* Admin Management Button */}
                <Link
                  to="/admin"
                  className="p-2 text-brand-muted hover:text-brand-rose transition-colors rounded-full hover:bg-brand-blush/20 hidden sm:flex items-center"
                  aria-label="Admin Portal"
                  title="Admin Management Portal"
                >
                  <ShieldCheck className="w-5 h-5" />
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

                {/* Ready Made */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu('ready-made')}
                >
                  <Link
                    to="/collections/ready-made"
                    className={`flex items-center gap-1 uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                      location.pathname === '/collections/ready-made' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                    }`}
                  >
                    Ready Made
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>
                </div>

                {/* Churidar Materials */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu('churidar-materials')}
                >
                  <Link
                    to="/collections/churidar-materials"
                    className={`flex items-center gap-1 uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                      location.pathname === '/collections/churidar-materials' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                    }`}
                  >
                    Churidar Materials
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>
                </div>

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

                {/* Kids Wear */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMegaMenu('kids-wear')}
                >
                  <Link
                    to="/collections/kids-wear"
                    className={`flex items-center gap-1 uppercase tracking-[0.16em] font-medium transition-colors hover:text-brand-rose py-2 whitespace-nowrap ${
                      location.pathname === '/collections/kids-wear' ? 'text-brand-rose font-semibold' : 'text-brand-navy'
                    }`}
                  >
                    Kids Wear
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

            {/* Right: Account, Wishlist & Bag */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Link
                to={isAuthenticated ? "/account" : "/login"}
                className="p-2 text-brand-navy hover:text-brand-rose transition-colors rounded-lg"
                aria-label={isAuthenticated ? `Account (${profile?.fullName || 'Patron'})` : "Sign In"}
              >
                {isAuthenticated ? (
                  <div className="w-5 h-5 rounded-full bg-brand-navy text-brand-champagne flex items-center justify-center text-[10px] font-bold">
                    {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'P'}
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </Link>

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

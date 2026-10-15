# Lils Spun Boutique — Premium Indian Ethnic Wear Frontend Prototype

A responsive, client-ready frontend ecommerce prototype for **Lils Spun Boutique**, specializing in traditional Indian ethnic wear (handloom sarees, embroidered salwar suits, Anarkalis, lehengas, kurtas, and handcrafted accessories).

---

## 🌟 Brand Identity & Aesthetic Direction

- **Primary Colors**:
  - Midnight Navy: `#111B49` (Logo, footer, primary buttons, accents)
  - Soft Ivory: `#FAF7F2` (Dominant page background)
  - Warm White: `#FFFFFF` (Card surfaces)
  - Champagne Gold: `#D8C4A5` (Metallic accents, badges)
  - Muted Rose: `#B77C88` (Floral accents, highlight badges)
  - Dusty Blush: `#E8CDD0` (Subtle tags and hover states)
  - Muted Lavender: `#DCD6E8` (Editorial highlights)
  - Primary Charcoal: `#252438` (High readability text)
- **Typography**:
  - Headings & Editorial: *Cormorant Garamond* / *Playfair Display*
  - Navigation, Details & Utility: *DM Sans*
- **Brand Emblem**:
  - Handcrafted crescent moon with delicate botanical line art, mirroring the brand logo.

---

## 🛍️ Features & Routes Implemented

### 1. Global Navigation & Header
- **Announcement Bar**: Rotating promotional announcements.
- **Desktop Navigation**: Multi-level navigation with spacious **Mega-Menus** for Sarees, Salwar Suits, Kurtas & Sets, Lehengas, and Accessories, complete with editorial showcase cards.
- **Mobile Navigation Drawer**: Responsive slide-out menu with expandable category accordions, quick search, and bag/wishlist shortcuts.
- **Interactive Search Overlay**: Live search bar with instant suggestions and trending keywords (`Kanjivaram`, `Anarkali`, `Chanderi`, etc.).
- **Live Counter Badges**: Instant real-time counts for Wishlist and Shopping Bag.

### 2. Homepage (`/`)
- **Section A — Hero Campaign**: Editorial full-viewport hero with campaign photography, trust badges, and dual CTAs.
- **Section B — Shop by Category**: 6 image-led categories (Sarees, Salwar Suits, Kurtas & Sets, Lehengas, Festive Wear, Accessories).
- **Section C — New Arrivals**: 8 product cards with image hover switch, quick add, quick view, and wishlist toggle.
- **Section D — Editorial Campaign Banner**: *"Celebrating Every Occasion"*.
- **Section E — Shop by Occasion**: 4 curated pathways (*Everyday Elegance*, *Festive Celebrations*, *Wedding Guest*, *Special Occasions*).
- **Section F — The Festive Edit**: Curated showcase of jewel-toned and brocade ensembles.
- **Section G — Brand Story & Storefront**: Featuring the real storefront photography from Kerala (`/images/storefront.jpg`) and artisanal weaving philosophy.
- **Section H — Testimonials**: 3 clearly labelled demo reviews.
- **Section I — Newsletter**: Client-side validated subscription form with success message.
- **Section J — Comprehensive Footer**: Brand summary, collections, customer care, policy links, and demo notices.

### 3. Collection Listing Pages (`/collections/:category`)
- Routes:
  - `/collections/new-arrivals`
  - `/collections/sarees`
  - `/collections/salwar-suits`
  - `/collections/kurtas-sets`
  - `/collections/lehengas`
  - `/collections/festive-wear`
  - `/collections/accessories`
- **Frontend Filters**: Price slider (₹3k–₹50k), Occasion checkboxes, Fabric Craft checkboxes, Colour chips, and In-Stock toggle.
- **Sorting Options**: Featured, Newest, Price (Low to High), Price (High to Low).
- **Active Filter Chips**: Dismissible chips with "Clear All" action.
- **Desktop Sidebar & Mobile Drawer**: Adaptive filtering interface for all screen sizes.
- **Product Grid**: 4 columns (desktop), 3 columns (tablet), 2 columns (mobile).
- **Functional Load More**: Expands visible products dynamically.

### 4. Product Detail Page (`/products/:slug`)
- Multi-image gallery with interactive thumbnail switcher.
- Dynamic size and colour selectors with validation feedback.
- Quantity selector (+ / -).
- Wishlist toggle and Add to Bag with instant toast feedback.
- Tabbed Garment Details, Fabric & Care, and Shipping & Returns.
- Related products recommendation section.

### 5. Search Page (`/search`)
- Dedicated search page with real-time keyword matching across product names, categories, fabrics, and occasions.
- Empty state with curated suggestions.

### 6. Wishlist Page (`/wishlist`)
- Client-side persistence via `localStorage` (`lils_spun_wishlist_v1`).
- Move-to-bag action, individual removal, and empty state.

### 7. Shopping Bag (`/cart`)
- Client-side persistence via `localStorage` (`lils_spun_cart_v1`).
- Item quantity modification, subtotal calculation, free shipping indicator (orders above ₹4,999), and order summary.
- Link to Demo Checkout.

### 8. Demo Checkout (`/checkout`)
- Simulated contact and shipping form.
- Simulated payment mode selector (UPI, Credit/Debit Card).
- Order simulation with generated Reference ID (`#LILS-XXXXXX`) and clear client presentation disclaimer.

### 9. Additional Editorial & Information Pages
- `/about`: Brand story, philosophy, and flagship studio showcase.
- `/contact`: Client-side validated contact inquiry form with interactive success state.
- `/pages/faqs`: Expandable accordions with sample copy clearly marked for client approval.
- `/pages/shipping`: Delivery timelines and packaging information.
- `/pages/returns`: 7-day exchange guidelines.
- `/pages/privacy` & `/pages/terms`: Legal placeholders.
- `*`: Custom branded 404 page.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production preview
npm run build
```

The application runs at: **`http://localhost:5173/`**

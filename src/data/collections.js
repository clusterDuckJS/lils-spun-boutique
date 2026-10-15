// Collections and navigation configuration for Lils Spun Boutique

export const categories = [
  {
    id: 'sarees',
    name: 'Sarees',
    slug: 'sarees',
    href: '/collections/sarees',
    description: 'Draped in heritage: pure Kanjivarams, delicate Banarasis, Organzas, and handcrafted Chanderis.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    itemCount: '5+ Designs'
  },
  {
    id: 'salwar-suits',
    name: 'Salwar Suits',
    slug: 'salwar-suits',
    href: '/collections/salwar-suits',
    description: 'Regal Anarkalis, sharara sets, and tailored straight cuts adorned with resham and zardozi.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
    itemCount: '4+ Designs'
  },
  {
    id: 'kurtas-sets',
    name: 'Kurtas & Sets',
    slug: 'kurtas-sets',
    href: '/collections/kurtas-sets',
    description: 'Effortless everyday grace and daytime festive chic in breathable mulmul, silk blends, and chanderi.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
    itemCount: '4+ Designs'
  },
  {
    id: 'lehengas',
    name: 'Lehengas',
    slug: 'lehengas',
    href: '/collections/lehengas',
    description: 'Grand celebrations captured in sweeping silhouettes of velvet, silk brocades, and gossamer net.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
    itemCount: '4+ Designs'
  },
  {
    id: 'festive-wear',
    name: 'Festive Wear',
    slug: 'festive-wear',
    href: '/collections/festive-wear',
    description: 'The Festive Edit: celebratory ensembles crafted with golden zari, bullion threads, and jewel tones.',
    image: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80',
    itemCount: '3+ Designs'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    href: '/collections/accessories',
    description: 'Heirloom potlis, Kundan jewelry, handcrafted jhumkas, and gossamer zari dupattas to complete your look.',
    image: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&w=1000&q=80',
    itemCount: '4+ Designs'
  }
];

export const occasions = [
  {
    id: 'everyday-elegance',
    name: 'Everyday Elegance',
    tagline: 'Refined comfort for daytime soirees & intimate gatherings',
    filterValue: 'Everyday Elegance',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
    href: '/collections/kurtas-sets?occasion=Everyday+Elegance'
  },
  {
    id: 'festive-celebrations',
    name: 'Festive Celebrations',
    tagline: 'Lustrous silks and glittering zari for joyous festivals',
    filterValue: 'Festive Celebrations',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    href: '/collections/festive-wear?occasion=Festive+Celebrations'
  },
  {
    id: 'wedding-guest',
    name: 'Wedding Guest',
    tagline: 'Statement drapes and embellished silhouettes for grand weddings',
    filterValue: 'Wedding Guest',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
    href: '/collections/lehengas?occasion=Wedding+Guest'
  },
  {
    id: 'special-occasions',
    name: 'Special Occasions',
    tagline: 'Curated artisanal heirlooms for life’s most precious moments',
    filterValue: 'Special Occasions',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    href: '/collections/salwar-suits?occasion=Special+Occasions'
  }
];

export const collectionMeta = {
  'new-arrivals': {
    title: 'New Arrivals',
    subtitle: 'Freshly Spun Traditions',
    description: 'Explore the latest arrivals at Lils Spun Boutique. Contemporary aesthetics infused with authentic Indian craftsmanship.',
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85'
  },
  'sarees': {
    title: 'Handloom & Designer Sarees',
    subtitle: 'The Six Yards of Poetry',
    description: 'From ceremonial Kanjivarams to gossamer organzas, discover our curated treasure of sarees designed to drape you in timeless splendour.',
    banner: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85'
  },
  'salwar-suits': {
    title: 'Salwar Suits & Sets',
    subtitle: 'Regal Silhouettes & Graceful Flairs',
    description: 'Thoughtfully tailored Anarkalis, sharara sets, and straight-cut suits crafted in luxurious silks, fine georgettes, and artisanal cottons.',
    banner: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85'
  },
  'kurtas-sets': {
    title: 'Kurtas & Coordinated Sets',
    subtitle: 'Everyday Luxury & Casual Grace',
    description: 'Breathable fabrics, flattering necklines, and contemporary tailoring for modern women who embrace effortless ethnic charm.',
    banner: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1600&q=85'
  },
  'lehengas': {
    title: 'Festive & Bridal Lehengas',
    subtitle: 'Heirloom Ensembles for Starlit Nights',
    description: 'Lavishly flared skirts, hand-embellished cholis, and ethereal dupattas designed to make your celebratory moments unforgettable.',
    banner: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1600&q=85'
  },
  'festive-wear': {
    title: 'The Festive Edit',
    subtitle: 'Radiance in Every Detail',
    description: 'A tribute to celebratory moments. Discover opulent brocades, jewel tones, and shimmering embellishments curated for festive occasions.',
    banner: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1600&q=85'
  },
  'accessories': {
    title: 'Boutique Accessories & Jewelry',
    subtitle: 'The Finishing Touch of Splendour',
    description: 'Elevate your ensemble with handcrafted zardozi potlis, heritage Kundan jewelry, statement jhumkas, and artisanal silk dupattas.',
    banner: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&w=1600&q=85'
  }
};

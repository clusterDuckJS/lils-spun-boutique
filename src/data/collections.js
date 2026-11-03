// Collections and navigation configuration for Lils Spun Boutique
// Updated for the 4 core boutique categories:
// 1. Ready Made (ready-made)
// 2. Churidar Materials (churidar-materials)
// 3. Sarees (sarees)
// 4. Kids Wear (kids-wear)

export const categories = [
  {
    id: 'ready-made',
    name: 'Ready Made',
    slug: 'ready-made',
    href: '/collections/ready-made',
    description: 'Pre-stitched regal Anarkalis, tailored Angrakha sets, and contemporary festive wear designed for effortless grace.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
    itemCount: '2+ Designs'
  },
  {
    id: 'churidar-materials',
    name: 'Churidar Materials',
    slug: 'churidar-materials',
    href: '/collections/churidar-materials',
    description: 'Unstitched handcrafted dress materials in handloom Chanderi, pure mulmul, and cotton silk with exquisite dupattas.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
    itemCount: '2+ Designs'
  },
  {
    id: 'sarees',
    name: 'Sarees',
    slug: 'sarees',
    href: '/collections/sarees',
    description: 'Draped in heritage: pure Kanjivarams, Varanasi Banarasi brocades, gossamer organzas, and handcrafted silks.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    itemCount: '2+ Designs'
  },
  {
    id: 'kids-wear',
    name: 'Kids Wear',
    slug: 'kids-wear',
    href: '/collections/kids-wear',
    description: 'Handcrafted South Indian Pattu Pavadais for girls and comfortable Banarasi silk kurta-dhoti sets for young boys.',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80',
    itemCount: '2+ Designs'
  }
];

export const occasions = [
  {
    id: 'festive-celebrations',
    name: 'Festive Celebrations',
    tagline: 'Lustrous silks, temple borders, and glittering zari for joyous festivals',
    filterValue: 'Festive Celebrations',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    href: '/collections/sarees?occasion=Festive+Celebrations'
  },
  {
    id: 'wedding-guest',
    name: 'Wedding Guest',
    tagline: 'Statement drapes and royal velvet silhouettes for grand weddings',
    filterValue: 'Wedding Guest',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    href: '/collections/ready-made?occasion=Wedding+Guest'
  },
  {
    id: 'everyday-elegance',
    name: 'Everyday Elegance',
    tagline: 'Refined comfort in pure mulmul and breathable handlooms',
    filterValue: 'Everyday Elegance',
    image: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80',
    href: '/collections/churidar-materials?occasion=Everyday+Elegance'
  },
  {
    id: 'kids-festive',
    name: 'Kids Celebrations',
    tagline: 'Soft, breathable traditional silhouettes tailored for little princes & princesses',
    filterValue: 'Festive Celebrations',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80',
    href: '/collections/kids-wear'
  }
];

export const collectionMeta = {
  'new-arrivals': {
    title: 'New Arrivals',
    subtitle: 'Freshly Spun Traditions',
    description: 'Explore the latest arrivals at Lils Spun Boutique. Contemporary aesthetics infused with authentic Indian craftsmanship across Ready Made, Churidar Materials, Sarees, and Kids Wear.',
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85'
  },
  'ready-made': {
    title: 'Ready Made Boutique Wear',
    subtitle: 'Pre-Stitched Luxury & Contemporary Silhouettes',
    description: 'Effortless elegance without the wait. Discover floor-length Anarkalis, tailored velvet Angrakhas, and festive coordinates crafted for modern celebrations.',
    banner: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85'
  },
  'churidar-materials': {
    title: 'Churidar Dress Materials',
    subtitle: 'Artisanal Unstitched 3-Piece Sets',
    description: 'Craft your bespoke ethnic ensemble. Handloom Chanderi silk, pure breathable 100s mulmul cotton, and banarasi dupattas waiting for your personal tailoring touch.',
    banner: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1600&q=85'
  },
  'sarees': {
    title: 'Handcrafted Heritage Sarees',
    subtitle: 'The Six Yards of Pure Splendour',
    description: 'From ceremonial Kanchipuram Kanjivarams woven with pure antique gold zari to regal Varanasi Banarasi brocades that drape in majestic poise.',
    banner: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85'
  },
  'kids-wear': {
    title: 'Traditional Kids Wear',
    subtitle: 'Comfortable & Adorable Festive Heritage',
    description: 'Celebrate your little ones with handcrafted traditional attire: butter-soft silk Pattu Pavadai sets with pure cotton linings and easy-wear boy dhoti kurta sets.',
    banner: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=85'
  },
  // Backward compatibility redirects / fallbacks
  'salwar-suits': {
    title: 'Ready Made & Suits',
    subtitle: 'Regal Silhouettes & Graceful Flairs',
    description: 'Explore our Ready Made and Churidar collections for custom tailored and pre-stitched suits.',
    banner: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85'
  },
  'kurtas-sets': {
    title: 'Kurtas & Sets',
    subtitle: 'Everyday Luxury & Casual Grace',
    description: 'Explore our Ready Made collection for contemporary coordinated sets and kurtas.',
    banner: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1600&q=85'
  },
  'lehengas': {
    title: 'Festive Ensembles',
    subtitle: 'Heirloom Celebrations',
    description: 'Explore our festive collections for grand celebrations.',
    banner: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1600&q=85'
  },
  'festive-wear': {
    title: 'The Festive Edit',
    subtitle: 'Radiance in Every Detail',
    description: 'A tribute to celebratory moments across all our boutique categories.',
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85'
  },
  'accessories': {
    title: 'Boutique Collection',
    subtitle: 'Artisanal Heirlooms',
    description: 'Curated traditional pieces crafted with exquisite attention to detail.',
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85'
  }
};

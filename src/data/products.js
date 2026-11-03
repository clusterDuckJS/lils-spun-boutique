// Centralized product dataset for Lils Spun Boutique
// Contains exactly 2 products in each of the 4 requested boutique categories:
// 1. Ready made (ready-made)
// 2. churidar materials (churidar-materials)
// 3. Sarees (sarees)
// 4. kids wear (kids-wear)

export const products = [
  // ===========================================================================
  // CATEGORY 1: READY MADE (2 Products)
  // ===========================================================================
  {
    id: 'ls-rm-001',
    name: 'Embroidered Georgette Anarkali Ready Made Gown',
    slug: 'embroidered-georgette-anarkali-gown',
    category: 'ready-made',
    categoryName: 'Ready Made',
    price: 6850,
    originalPrice: 8500,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Gracefully pre-stitched floor-length Anarkali gown in ethereal georgette, embellished with resham threadwork, micro sequins, and scalloped border dupatta. Perfect for effortless festive celebrations and wedding receptions.',
    fabric: 'Pure Georgette with Soft Crepe Lining',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Dusty Mauve', hex: '#9E7B88' },
      { name: 'Rose Beige', hex: '#D4B2A7' }
    ],
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)'],
    details: [
      'Fully stitched ready-to-wear gown with invisible back zipper',
      'Embellished round neckline with delicate sequin handwork',
      'Matching pre-hemmed sheer dupatta included',
      'Can-can net inner lining for majestic royal flare'
    ],
    care: 'Dry clean only. Store on a padded hanger.',
    tags: ['Ready Made', 'Anarkali', 'Bestseller'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 24
  },
  {
    id: 'ls-rm-002',
    name: 'Mughal Angrakha Velvet Kurta & Pant Set',
    slug: 'mughal-angrakha-velvet-kurta-set',
    category: 'ready-made',
    categoryName: 'Ready Made',
    price: 8200,
    originalPrice: 9800,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A luxurious ready-to-wear Angrakha silhouette tailored in royal velvet. Accented with golden zari cord piping, handcrafted bullion tassels, and paired with tailored cigarette trousers and an embroidered organza dupatta.',
    fabric: 'Micro Velvet & Tissue Organza',
    occasion: 'Wedding Guest',
    colours: [
      { name: 'Midnight Teal', hex: '#1B3B48' },
      { name: 'Wine Burgundy', hex: '#5C1D24' }
    ],
    sizes: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    details: [
      'Pre-stitched asymmetric Angrakha crossover cut',
      'Handcrafted bullion thread tassel tie-ups',
      'Straight cut comfort fit pants with side elastication',
      'Scalloped zari-embroidered organza dupatta'
    ],
    care: 'Dry clean only. Do not iron directly on velvet pile.',
    tags: ['Ready Made', 'Velvet', 'Winter Festive'],
    featured: true,
    newArrival: false,
    available: true,
    rating: 4.8,
    reviewsCount: 19
  },

  // ===========================================================================
  // CATEGORY 2: CHURIDAR MATERIALS (2 Products)
  // ===========================================================================
  {
    id: 'ls-cm-001',
    name: 'Handloom Chanderi Silk Zari Churidar Material',
    slug: 'handloom-chanderi-silk-zari-churidar-material',
    category: 'churidar-materials',
    categoryName: 'Churidar Materials',
    price: 3950,
    originalPrice: 4800,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Artisanal unstitched 3-piece churidar suit material featuring hand-woven floral butis on pure Chanderi silk. Accompanied by a pure cotton-silk bottom fabric and a lustrous banarasi border dupatta for bespoke boutique tailoring.',
    fabric: 'Handloom Chanderi Silk Top, Cotton Silk Bottom, Chanderi Dupatta',
    occasion: 'Everyday Elegance',
    colours: [
      { name: 'Sage Green', hex: '#8A9A86' },
      { name: 'Honey Mustard', hex: '#C89D3C' }
    ],
    sizes: ['Top: 2.50 Metres', 'Bottom: 2.00 Metres', 'Dupatta: 2.30 Metres'],
    details: [
      'Unstitched fabric set suitable for custom tailor sizing up to 48" bust',
      'Traditional handwoven zari motifs across front and sleeves',
      'Premium lightweight drape with natural sheen',
      'Includes contrast Banarasi border dupatta with hand-knotted tassels'
    ],
    care: 'Gentle hand wash in cold water or mild dry clean.',
    tags: ['Churidar Material', 'Unstitched', 'Handloom Chanderi'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 5.0,
    reviewsCount: 31
  },
  {
    id: 'ls-cm-002',
    name: 'Kashmiri Jamdani Pure Mulmul Dress Material',
    slug: 'kashmiri-jamdani-mulmul-dress-material',
    category: 'churidar-materials',
    categoryName: 'Churidar Materials',
    price: 3200,
    originalPrice: 3900,
    images: [
      'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Featherweight premium 100s count pure mulmul cotton unstitched suit material adorned with traditional Kashmiri thread motifs and an ombre handblock printed kota doria dupatta.',
    fabric: '100s Count Mulmul Cotton & Kota Doria Dupatta',
    occasion: 'Everyday Elegance',
    colours: [
      { name: 'Pastel Lavender', hex: '#B8A9C9' },
      { name: 'Ivory Pearl', hex: '#EAE5D9' }
    ],
    sizes: ['Kurta: 2.5m', 'Bottom: 2.25m', 'Dupatta: 2.4m'],
    details: [
      'Super-soft organic breathable summer mulmul cotton',
      'Authentic Kashmiri floral resham neck yoke embroidery',
      'Featherlight Kota Doria dupatta with tassel edging',
      'Colorfast azo-free organic botanical dyes'
    ],
    care: 'Hand wash with gentle detergent. Dry in shade.',
    tags: ['Churidar Material', 'Mulmul Cotton', 'Kashmiri Work'],
    featured: false,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 16
  },

  // ===========================================================================
  // CATEGORY 3: SAREES (2 Products)
  // ===========================================================================
  {
    id: 'ls-sar-001',
    name: 'Rose Pink Festive Kanjivaram Silk Saree',
    slug: 'rose-pink-festive-silk-saree',
    category: 'sarees',
    categoryName: 'Sarees',
    price: 14800,
    originalPrice: 18500,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ethereal pure silk saree woven with intricate floral jaal in antique gold zari. The contrasting rich pallu features traditional peacock motifs with scalloped resham borders, draping in effortless royal grace.',
    fabric: 'Pure Mulberry Silk with Antique Gold Zari',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Rose Pink', hex: '#D68C9A' },
      { name: 'Champagne Gold', hex: '#D8C4A5' }
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    details: [
      'Woven by traditional master weavers in Kanchipuram',
      'Includes unstitched matching silk blouse piece (80 cm)',
      'Intricate temple border craftsmanship',
      'Lustrous sheen suitable for evening celebrations'
    ],
    care: 'Dry clean only. Wrap in pristine white muslin cloth and air periodically.',
    tags: ['Sarees', 'Kanjivaram', 'Pure Silk', 'Bestseller'],
    featured: true,
    newArrival: false,
    available: true,
    rating: 5.0,
    reviewsCount: 38
  },
  {
    id: 'ls-sar-002',
    name: 'Royal Midnight Banarasi Brocade Silk Saree',
    slug: 'royal-midnight-banarasi-brocade-saree',
    category: 'sarees',
    categoryName: 'Sarees',
    price: 16500,
    originalPrice: 21000,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A majestic Varanasi handloom brocade drape in deep royal midnight navy, covered in fine kadhwa silver and gold sona-rupa floral vines with an opulent heirloom pallu.',
    fabric: 'Pure Katan Silk with Sona Rupa Brocade',
    occasion: 'Wedding Guest',
    colours: [
      { name: 'Midnight Navy', hex: '#132238' },
      { name: 'Antique Silver', hex: '#C0C0C0' }
    ],
    sizes: ['Free Size (5.5m + 0.85m Blouse)'],
    details: [
      'Authentic Banarasi Kadhwa hand-weaving technique',
      'Contrast brocade blouse material included (85 cm)',
      'Intricate floral jaal across the body',
      'Silk Mark Certified 100% pure silk'
    ],
    care: 'Dry clean only. Keep away from direct perfumes.',
    tags: ['Sarees', 'Banarasi', 'Brocade', 'Bridal Heritage'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 29
  },

  // ===========================================================================
  // CATEGORY 4: KIDS WEAR (2 Products)
  // ===========================================================================
  {
    id: 'ls-kw-001',
    name: 'Pure Silk Pattu Pavadai Set for Girls',
    slug: 'pure-silk-pattu-pavadai-set-girls',
    category: 'kids-wear',
    categoryName: 'Kids Wear',
    price: 3450,
    originalPrice: 4200,
    images: [
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Traditional handcrafted South Indian Pattu Pavadai (lehenga-choli) set for young girls, woven from soft silk with golden temple zari borders, butter-soft cotton lining, and comfortable elasticated waistband.',
    fabric: 'Soft Silk Blend with 100% Breathable Cotton Lining',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Rani Pink & Parrot Green', hex: '#D12B64' },
      { name: 'Golden Yellow', hex: '#E9B63B' }
    ],
    sizes: ['2-3 Years', '4-5 Years', '6-7 Years', '8-9 Years', '10-12 Years'],
    details: [
      'Non-scratchy 100% pure cotton inner lining for child comfort',
      'Comfort fit elasticated skirt waist with adjustable drawstrings',
      'Back zipper blouse with soft neck facing',
      'Traditional golden temple border weave'
    ],
    care: 'Dry clean or gentle cold water hand wash.',
    tags: ['Kids Wear', 'Pattu Pavadai', 'Girls Ethnic', 'Festive Kids'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 5.0,
    reviewsCount: 22
  },
  {
    id: 'ls-kw-002',
    name: 'Jacquard Silk Kurta & Dhoti Pant Set for Boys',
    slug: 'jacquard-silk-kurta-dhoti-pant-boys',
    category: 'kids-wear',
    categoryName: 'Kids Wear',
    price: 2850,
    originalPrice: 3500,
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Festive celebratory ethnic set for young gentlemen. Includes a tailored woven jacquard silk kurta with mandarin collar, metallic buttons, and ready-to-wear pre-pleated dhoti pants with soft elastic.',
    fabric: 'Banarasi Jacquard Silk with Cotton Voile Inner Lining',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Royal Ivory & Gold', hex: '#F3EDE2' },
      { name: 'Marigold Ochre', hex: '#D48B28' }
    ],
    sizes: ['2-3 Years', '4-5 Years', '6-7 Years', '8-9 Years', '10-12 Years'],
    details: [
      'Pre-stitched hassle-free dhoti trousers for active little boys',
      'Mandarin collar with soft interlining to prevent neck irritation',
      'Premium metallic button accents and chest pocket',
      'Fully lined with soft breathable cotton voile'
    ],
    care: 'Hand wash separately or gentle dry clean.',
    tags: ['Kids Wear', 'Boys Ethnic', 'Kurta Dhoti', 'Traditional'],
    featured: false,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 17
  }
];

// Helper functions for easy filtering, searching, and lookup
export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return products;
  if (category === 'new-arrivals') return products.filter(p => p.newArrival);
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

export function getNewArrivals() {
  return products.filter(p => p.newArrival);
}

export function getRelatedProducts(currentProductId, limit = 4) {
  const current = products.find(p => p.id === currentProductId);
  if (!current) return products.slice(0, limit);
  
  const sameCategory = products.filter(p => p.category === current.category && p.id !== currentProductId);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  
  const others = products.filter(p => p.id !== currentProductId && !sameCategory.includes(p));
  return [...sameCategory, ...others].slice(0, limit);
}

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

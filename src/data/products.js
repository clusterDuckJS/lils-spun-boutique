// Centralized sample product dataset for Lils Spun Boutique
// All items are editable mock data representing handcrafted traditional Indian ethnic wear.

export const products = [
  // SAREES
  {
    id: 'ls-sar-001',
    name: 'Rose Pink Festive Silk Saree',
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
      'Woven by traditional master weavers',
      'Includes unstitched matching silk blouse piece (80 cm)',
      'Intricate temple border craftsmanship',
      'Lustrous sheen suitable for evening celebrations'
    ],
    care: 'Dry clean only. Wrap in pristine white muslin cloth and air periodically.',
    tags: ['Festive Edit', 'Pure Silk', 'Bestseller'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'ls-sar-002',
    name: 'Royal Midnight Banarasi Brocade Saree',
    slug: 'royal-midnight-banarasi-brocade-saree',
    category: 'sarees',
    categoryName: 'Sarees',
    price: 19500,
    originalPrice: 24000,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Reflecting the celestial midnight tones of Lils Spun, this deep navy Banarasi saree showcases fine kadiyal weaving with silver and champagne zari florals. A signature heirloom investment.',
    fabric: 'Katan Silk Banarasi Brocade',
    occasion: 'Wedding Guest',
    colours: [
      { name: 'Midnight Navy', hex: '#111B49' },
      { name: 'Royal Indigo', hex: '#1E2F7D' }
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    details: [
      'Signature midnight blue shade aligning with boutique identity',
      'Elaborate kadhwa zari woven pallu',
      'Lightweight structured drape',
      'Includes contrast raw silk blouse fabric'
    ],
    care: 'Professional dry clean only. Avoid spraying perfumes directly onto zari.',
    tags: ['Boutique Signature', 'Heirloom', 'Handloom'],
    featured: true,
    newArrival: false,
    available: true,
    rating: 5.0,
    reviewsCount: 42
  },
  {
    id: 'ls-sar-003',
    name: 'Powder Blue Handloom Organza Saree',
    slug: 'powder-blue-handloom-organza-saree',
    category: 'sarees',
    categoryName: 'Sarees',
    price: 9200,
    originalPrice: 11500,
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Delicate hand-painted botanical blooms dance over crisp sheer organza silk. Finished with fine pearl-beaded edging and a soft muted lavender blouse piece.',
    fabric: 'Pure Sheer Silk Organza',
    occasion: 'Special Occasions',
    colours: [
      { name: 'Powder Blue', hex: '#B8CBE0' },
      { name: 'Muted Lavender', hex: '#DCD6E8' }
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    details: [
      'Handcrafted cutwork floral borders',
      'Breathable, airy translucent drape',
      'Paired with self-embroidered organza blouse'
    ],
    care: 'Gentle dry clean only. Iron on reverse using lowest silk setting.',
    tags: ['Pastel Dream', 'Organza', 'Day Weddings'],
    featured: false,
    newArrival: true,
    available: true,
    rating: 4.8,
    reviewsCount: 19
  },
  {
    id: 'ls-sar-004',
    name: 'Kanjivaram Golden Zari Tissue Saree',
    slug: 'kanjivaram-golden-zari-tissue-saree',
    category: 'sarees',
    categoryName: 'Sarees',
    price: 22800,
    originalPrice: 28500,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Woven with gold and silver metallic tissue threads in traditional korvai technique. The border displays heritage temple kalash motifs with a grand brocade pallu.',
    fabric: 'Pure Kanchipuram Tissue Silk',
    occasion: 'Wedding Guest',
    colours: [
      { name: 'Tissue Gold', hex: '#D8C4A5' },
      { name: 'Dusty Blush', hex: '#E8CDD0' }
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    details: [
      'Silk Mark certified handloom weaving',
      'Subtle double-tone metallic shimmer',
      'Includes unstitched brocade blouse piece'
    ],
    care: 'Dry clean only. Roll in muslin fabric.',
    tags: ['Bridal', 'Kanjivaram', 'Heritage'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 27
  },
  {
    id: 'ls-sar-005',
    name: 'Chanderi Handblock Printed Saree',
    slug: 'chanderi-handblock-printed-saree',
    category: 'sarees',
    categoryName: 'Sarees',
    price: 6800,
    originalPrice: 8500,
    images: [
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A breathable festive staple crafted from lightweight Chanderi cotton-silk, decorated with natural Bagru handblock prints and a shimmering zari border.',
    fabric: 'Chanderi Cotton Silk Blend',
    occasion: 'Everyday Elegance',
    colours: [
      { name: 'Sage Green', hex: '#9CAF88' },
      { name: 'Soft Ivory', hex: '#FAF7F2' }
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    details: [
      'Handblock printed by artisanal guilds',
      'Zari tissue patti border',
      'Extremely lightweight for summer celebrations'
    ],
    care: 'Gentle dry clean or cold hand wash with mild detergent.',
    tags: ['Handblock', 'Chanderi', 'Comfort Luxury'],
    featured: false,
    newArrival: false,
    available: true,
    rating: 4.7,
    reviewsCount: 15
  },

  // SALWAR SUITS
  {
    id: 'ls-sal-001',
    name: 'Ivory Floral Embroidered Anarkali Suit',
    slug: 'ivory-floral-embroidered-anarkali-suit',
    category: 'salwar-suits',
    categoryName: 'Salwar Suits',
    price: 12500,
    originalPrice: 15900,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A sweeping floor-length ivory Anarkali silhouette cut in pure georgette. Beautifully adorned with muted rose and sage floral resham embroidery, seed pearls, and finished with a scalloped organza dupatta.',
    fabric: 'Pure Georgette with Shantoon Lining & Silk Organza Dupatta',
    occasion: 'Wedding Guest',
    colours: [
      { name: 'Soft Ivory', hex: '#FAF7F2' },
      { name: 'Dusty Blush', hex: '#E8CDD0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: [
      '3-piece set: Anarkali gown, churidar trousers, and dupatta',
      'Fitted bodice with voluminous 28-kali flared skirt',
      'Padded cups and discreet side zip closure',
      'Intricate threadwork with delicate sequins'
    ],
    care: 'Dry clean only. Steam iron lightly.',
    tags: ['Anarkali', 'Bestseller', 'Client Favourite'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 5.0,
    reviewsCount: 51
  },
  {
    id: 'ls-sal-002',
    name: 'Sage Green Chanderi Suit Set',
    slug: 'sage-green-chanderi-suit-set',
    category: 'salwar-suits',
    categoryName: 'Salwar Suits',
    price: 8490,
    originalPrice: 10500,
    images: [
      'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crafted in soothing sage green Chanderi silk, this straight-cut kurta features delicate gota patti neckline work and comes with coordinated cigarette trousers and a woven zari border dupatta.',
    fabric: 'Handloom Chanderi Silk with Mulmul Lining',
    occasion: 'Everyday Elegance',
    colours: [
      { name: 'Sage Green', hex: '#9CAF88' },
      { name: 'Muted Olive', hex: '#828C6E' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: [
      'Calf-length straight silhouette with side slits',
      'Subtle Gota patti and zari neck detailing',
      'Elasticated waistband with drawstring for easy fit',
      'Includes sheer Chanderi printed dupatta'
    ],
    care: 'Dry clean recommended. Gentle hand wash inside out.',
    tags: ['Chanderi', 'Subtle Luxury', 'Work to Evening'],
    featured: true,
    newArrival: false,
    available: true,
    rating: 4.8,
    reviewsCount: 29
  },
  {
    id: 'ls-sal-003',
    name: 'Burgundy Embroidered Occasion Wear Suit',
    slug: 'burgundy-embroidered-occasion-wear-suit',
    category: 'salwar-suits',
    categoryName: 'Salwar Suits',
    price: 13900,
    originalPrice: 17500,
    images: [
      'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A regal jewel-toned ensemble featuring rich burgundy silk velvet detailing, antique zardozi cord embroidery on the collar, and layered flared sharara pants.',
    fabric: 'Raw Silk Blend with Velvet Accents',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Burgundy Wine', hex: '#631B2B' },
      { name: 'Midnight Navy', hex: '#111B49' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'High mandarin collar with zardozi dabka work',
      'Flared tiered sharara with gold lace hem',
      'Matching tissue organza dupatta with scalloped kinari'
    ],
    care: 'Specialist dry clean only.',
    tags: ['Regal Edit', 'Velvet', 'Winter Festive'],
    featured: false,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 34
  },
  {
    id: 'ls-sal-004',
    name: 'Dusty Mauve Georgette Sharara Set',
    slug: 'dusty-mauve-georgette-sharara-set',
    category: 'salwar-suits',
    categoryName: 'Salwar Suits',
    price: 11200,
    originalPrice: 14000,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Subtle sophistication in dusty mauve. Short peplum style kurta adorned with mirror-work lace, accompanied by voluminous flared sharara bottoms and chiffon dupatta.',
    fabric: 'Viscose Georgette with Shantoon Lining',
    occasion: 'Special Occasions',
    colours: [
      { name: 'Dusty Mauve', hex: '#9E828E' },
      { name: 'Muted Lavender', hex: '#DCD6E8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: [
      'Playful peplum cut with flared hemline',
      'Real mirror and cut-dana highlights',
      'Comfort-fit elasticated sharara waist'
    ],
    care: 'Dry clean only.',
    tags: ['Sharara', 'Pastels', 'Sangeet Ready'],
    featured: false,
    newArrival: false,
    available: true,
    rating: 4.7,
    reviewsCount: 22
  },

  // KURTAS & SETS
  {
    id: 'ls-kur-001',
    name: 'Lavender Printed Cotton Kurta Set',
    slug: 'lavender-printed-cotton-kurta-set',
    category: 'kurtas-sets',
    categoryName: 'Kurtas & Sets',
    price: 4950,
    originalPrice: 6200,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Soft, breathable premium mulmul cotton kurta set in calming lavender botanical print. Styled with straight cropped trousers and a coordinated kota doria lightweight dupatta.',
    fabric: '100% Breathable Mulmul Cotton & Kota Doria',
    occasion: 'Everyday Elegance',
    colours: [
      { name: 'Lavender', hex: '#DCD6E8' },
      { name: 'Soft Lilac', hex: '#CBBED8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    details: [
      'Sweetheart neckline with crochet lace trim',
      'Quarter sleeves with cuff detailing',
      'Cropped straight pants with functional side pockets',
      'Soft on sensitive skin for all-day comfort'
    ],
    care: 'Gentle machine wash in cold water or hand wash with mild liquid soap.',
    tags: ['Pure Cotton', 'Everyday Luxury', 'Breathable'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 64
  },
  {
    id: 'ls-kur-002',
    name: 'Champagne Beige Angrakha Kurta Palazzo',
    slug: 'champagne-beige-angrakha-kurta-palazzo',
    category: 'kurtas-sets',
    categoryName: 'Kurtas & Sets',
    price: 6400,
    originalPrice: 7990,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Timeless Mughal-inspired crossover Angrakha silhouette in champagne beige chanderi silk. Fastened with handmade fabric latkans and paired with flared palazzos.',
    fabric: 'Chanderi Silk Cotton with Cotton Lining',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Champagne Beige', hex: '#D8C4A5' },
      { name: 'Soft Ivory', hex: '#FAF7F2' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Flattering wrap front with tie-up silk tassels',
      'Flared hem with woven gold border',
      'Wide-leg fluid palazzo trousers'
    ],
    care: 'Dry clean only to maintain silk finish.',
    tags: ['Angrakha', 'Timeless Silhouette', 'Festive Ready'],
    featured: false,
    newArrival: false,
    available: true,
    rating: 4.8,
    reviewsCount: 28
  },
  {
    id: 'ls-kur-003',
    name: 'Mustard Marigold Embroidered Silk Kurta',
    slug: 'mustard-marigold-embroidered-silk-kurta',
    category: 'kurtas-sets',
    categoryName: 'Kurtas & Sets',
    price: 5800,
    originalPrice: 7200,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Radiant festive tones of fresh marigold and turmeric. Straight tunic featuring floral zardozi bullion stitches along the placket, complemented with silk pants.',
    fabric: 'Art Silk with Cotton Viscose Lining',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Festive Marigold', hex: '#E09C34' },
      { name: 'Warm Amber', hex: '#C27C21' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: [
      'V-slit keyhole neckline with metallic buttons',
      'Gold brocade patti cuffs',
      'Matched with slim trousers'
    ],
    care: 'Dry clean only.',
    tags: ['Haldi Special', 'Festive Tones'],
    featured: false,
    newArrival: true,
    available: true,
    rating: 4.7,
    reviewsCount: 17
  },
  {
    id: 'ls-kur-004',
    name: 'Muted Rose Pintuck Tunic Set',
    slug: 'muted-rose-pintuck-tunic-set',
    category: 'kurtas-sets',
    categoryName: 'Kurtas & Sets',
    price: 5200,
    originalPrice: 6500,
    images: [
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Minimalist tailoring meets handcrafted grace. Delicate pintuck detailing along the yoke in gentle rose linen-cotton, finished with organza embroidered cuffs.',
    fabric: 'Fine Cotton Linen',
    occasion: 'Everyday Elegance',
    colours: [
      { name: 'Muted Rose', hex: '#B77C88' },
      { name: 'Dusty Blush', hex: '#E8CDD0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: [
      'Hand-tucked geometric bodice',
      'Mandarin collar with shell buttons',
      'Straight trousers with elastic back'
    ],
    care: 'Gentle hand wash with cold water.',
    tags: ['Linen', 'Minimalist', 'Work Chic'],
    featured: false,
    newArrival: false,
    available: true,
    rating: 4.9,
    reviewsCount: 31
  },

  // LEHENGAS
  {
    id: 'ls-leh-001',
    name: 'Champagne Gold Festive Lehenga',
    slug: 'champagne-gold-festive-lehenga',
    category: 'lehengas',
    categoryName: 'Lehengas',
    price: 38500,
    originalPrice: 48000,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An enchanting bridal and festive lehenga in shimmering champagne gold. Intricately embellished with luminous cut-dana, pearls, and champagne sequins, accompanied by an embroidered sweetheart blouse and sheer veil.',
    fabric: 'Tissue Silk Net with Satin Lining',
    occasion: 'Wedding Guest',
    colours: [
      { name: 'Champagne Gold', hex: '#D8C4A5' },
      { name: 'Rose Gold', hex: '#C79D8E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'Custom Stitch'],
    details: [
      'Full 6-meter flair with double can-can layering',
      'Hand-embroidered heavy blouse with back dori ties',
      'Drape-ready dupatta with 4-sided zardozi lace',
      'Padded blouse cups and concealed zipper'
    ],
    care: 'Store in airtight garment box. Dry clean only.',
    tags: ['Bridal Edit', 'Showstopper', 'Hand Embellished'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 5.0,
    reviewsCount: 47
  },
  {
    id: 'ls-leh-002',
    name: 'Dusty Rose Embroidered Net Lehenga',
    slug: 'dusty-rose-embroidered-net-lehenga',
    category: 'lehengas',
    categoryName: 'Lehengas',
    price: 27900,
    originalPrice: 34500,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A romantic fairytale lehenga in soft dusty rose. Layers of whisper-light French net detailed with delicate silver gota embroidery, crystal spray, and scalloped hemline.',
    fabric: 'Soft French Net with Silk Crepe Lining',
    occasion: 'Special Occasions',
    colours: [
      { name: 'Dusty Rose', hex: '#B77C88' },
      { name: 'Soft Blush', hex: '#E8CDD0' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Romantic floral vines in tone-on-tone resham work',
      'Soft inner crepe lining that is light on the skin',
      'Includes pre-stitched coordinated dupatta'
    ],
    care: 'Dry clean only.',
    tags: ['Reception Look', 'Pastel Bride', 'Romantic'],
    featured: true,
    newArrival: false,
    available: true,
    rating: 4.9,
    reviewsCount: 39
  },
  {
    id: 'ls-leh-003',
    name: 'Royal Midnight Velvet Heritage Lehenga',
    slug: 'royal-midnight-velvet-heritage-lehenga',
    category: 'lehengas',
    categoryName: 'Lehengas',
    price: 44000,
    originalPrice: 55000,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Evoking the signature deep midnight navy of Lils Spun Boutique. Rich micro-velvet base ornamented with ancient Marodi and Dabka embroidery inspired by royal palace courtyards.',
    fabric: 'Pure Silk Velvet with Organza Dupatta',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Midnight Navy', hex: '#111B49' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Plush, deep pile micro velvet with heavy fall',
      'Heavy zardozi waist belt detailing',
      'Contrast gold tissue dupatta'
    ],
    care: 'Strictly dry clean only. Do not iron directly on velvet pile.',
    tags: ['Heirloom Velvet', 'Boutique Exclusive'],
    featured: false,
    newArrival: true,
    available: true,
    rating: 5.0,
    reviewsCount: 24
  },
  {
    id: 'ls-leh-004',
    name: 'Lavender Botanical Silk Lehenga',
    slug: 'lavender-botanical-silk-lehenga',
    category: 'lehengas',
    categoryName: 'Lehengas',
    price: 24500,
    originalPrice: 31000,
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A contemporary fresh take on ethnic grandeur. Soft lilac-lavender raw silk adorned with English floral motifs in foil mirror work and thread embroidery.',
    fabric: 'Raw Silk Blend with Soft Tulle Overlay',
    occasion: 'Special Occasions',
    colours: [
      { name: 'Muted Lavender', hex: '#DCD6E8' },
      { name: 'Dusty Lilac', hex: '#BCA8C9' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    details: [
      'Handcrafted foil mirror waistband',
      'Structured volume without excessive weight',
      'Featherlight scalloped organza dupatta'
    ],
    care: 'Dry clean only.',
    tags: ['Pastels', 'Modern Indian', 'Destination Wedding'],
    featured: false,
    newArrival: false,
    available: true,
    rating: 4.8,
    reviewsCount: 21
  },

  // FESTIVE WEAR
  {
    id: 'ls-fes-001',
    name: 'Brocade Silk Peplum Kurta & Dhoti Set',
    slug: 'brocade-silk-peplum-kurta-dhoti-set',
    category: 'festive-wear',
    categoryName: 'Festive Wear',
    price: 10800,
    originalPrice: 13500,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A fusion festive statement piece. Handwoven gold brocade peplum jacket featuring intricate floral motifs, styled with satin draped cowl dhoti trousers.',
    fabric: 'Banarasi Brocade with Silk Satin Dhoti',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Champagne Gold', hex: '#D8C4A5' },
      { name: 'Rose Pink', hex: '#D68C9A' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Modern peplum jacket with mandarin collar',
      'Pre-draped comfortable cowl dhoti pants',
      'Handmade metal button fastenings'
    ],
    care: 'Dry clean only.',
    tags: ['Festive Fusion', 'Statement Look'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 4.9,
    reviewsCount: 33
  },
  {
    id: 'ls-fes-002',
    name: 'Emerald Zardozi Cape & Trousers Set',
    slug: 'emerald-zardozi-cape-trousers-set',
    category: 'festive-wear',
    categoryName: 'Festive Wear',
    price: 15400,
    originalPrice: 19000,
    images: [
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Opulent jewel emerald green cape tailored in sheer georgette, richly hand-embroidered with zardozi and kundan drops, over a silk slip and tailored cigarette pants.',
    fabric: 'Viscose Georgette & Raw Silk',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Emerald Green', hex: '#1C5B3E' },
      { name: 'Midnight Navy', hex: '#111B49' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: [
      'Flowing floor-touch embroidered cape',
      'Coordinate raw silk inner crop top',
      'Clean tailored ankle-length trousers'
    ],
    care: 'Dry clean only.',
    tags: ['Cape Set', 'Contemporary Ethnic', 'Jewel Tones'],
    featured: false,
    newArrival: true,
    available: true,
    rating: 4.8,
    reviewsCount: 26
  },
  {
    id: 'ls-fes-003',
    name: 'Plum Silk Angrakha Anarkali Edit',
    slug: 'plum-silk-angrakha-anarkali-edit',
    category: 'festive-wear',
    categoryName: 'Festive Wear',
    price: 13200,
    originalPrice: 16500,
    images: [
      'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Deep royal plum silk cut into an elongated Angrakha silhouette. Highlighted with fine badla work and accompanied by an embellished scalloped dupatta.',
    fabric: 'Chanderi Silk with Shantoon Lining',
    occasion: 'Special Occasions',
    colours: [
      { name: 'Royal Plum', hex: '#582C4D' },
      { name: 'Muted Rose', hex: '#B77C88' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Angrakha tie-up with heavy silk beaded latkans',
      'Deep jewel tone ideal for evening gatherings',
      'Full flared lower kalis'
    ],
    care: 'Dry clean only.',
    tags: ['Deep Jewel Tone', 'Diwali Edit'],
    featured: false,
    newArrival: false,
    available: true,
    rating: 4.9,
    reviewsCount: 20
  },

  // ACCESSORIES
  {
    id: 'ls-acc-001',
    name: 'Handcrafted Zardozi Pearl Potli Bag',
    slug: 'handcrafted-zardozi-pearl-potli-bag',
    category: 'accessories',
    categoryName: 'Accessories',
    price: 3450,
    originalPrice: 4200,
    images: [
      'https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A decadent evening accessory handcrafted in midnight navy silk velvet, encrusted with seed pearls and golden zardozi embroidery. Features braided silk drawstrings and pearl tassel drops.',
    fabric: 'Micro Velvet with Pearl & Antique Zari',
    occasion: 'Special Occasions',
    colours: [
      { name: 'Midnight Navy', hex: '#111B49' },
      { name: 'Ivory Cream', hex: '#FAF7F2' }
    ],
    sizes: ['Standard (8" x 9")'],
    details: [
      'Roomy interior easily accommodates modern smartphones and essentials',
      'Solid braided handle with pearl embellishment',
      'Hand-stitched in small artisan clusters'
    ],
    care: 'Spot clean only. Store in protective dust bag.',
    tags: ['Potli', 'Artisanal', 'Bestseller Accessory'],
    featured: true,
    newArrival: true,
    available: true,
    rating: 5.0,
    reviewsCount: 58
  },
  {
    id: 'ls-acc-002',
    name: 'Kundan & Fresh Water Pearl Choker Set',
    slug: 'kundan-fresh-water-pearl-choker-set',
    category: 'accessories',
    categoryName: 'Accessories',
    price: 7800,
    originalPrice: 9500,
    images: [
      'https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Heritage Jadau Kundan choker crafted in 22kt gold-plated brass, strung with rows of natural freshwater pearls and green meenakari enamelling on the reverse. Comes with matching jhumkas.',
    fabric: '22k Gold Plated Brass, Uncut Polki Glass & Pearls',
    occasion: 'Wedding Guest',
    colours: [
      { name: 'Gold & Pearl', hex: '#D8C4A5' }
    ],
    sizes: ['Adjustable Dori Length'],
    details: [
      'Traditional Meenakari work on reverse side',
      'Includes pair of coordinated statement earrings',
      'Adjustable zari dori back tie-up'
    ],
    care: 'Keep away from moisture, hairsprays, and perfumes. Store in zip lock pouch.',
    tags: ['Heritage Jewelry', 'Bridal Set'],
    featured: true,
    newArrival: false,
    available: true,
    rating: 4.9,
    reviewsCount: 44
  },
  {
    id: 'ls-acc-003',
    name: 'Handwoven Chanderi Zari Border Dupatta',
    slug: 'handwoven-chanderi-zari-border-dupatta',
    category: 'accessories',
    categoryName: 'Accessories',
    price: 3800,
    originalPrice: 4700,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An heirloom drape in champagne beige Chanderi silk. Features broad temple zari borders and intricate floral boota woven across the fabric.',
    fabric: 'Pure Chanderi Silk with Metallic Zari',
    occasion: 'Everyday Elegance',
    colours: [
      { name: 'Champagne Beige', hex: '#D8C4A5' },
      { name: 'Soft Blush', hex: '#E8CDD0' }
    ],
    sizes: ['2.5 meters length x 36" width'],
    details: [
      'Handwoven gossamer-light texture',
      'Versatile piece to elevate any solid kurta or suit',
      'Finished with delicate tassels on either pallu'
    ],
    care: 'Dry clean only.',
    tags: ['Dupatta', 'Versatile', 'Classic'],
    featured: false,
    newArrival: true,
    available: true,
    rating: 4.8,
    reviewsCount: 19
  },
  {
    id: 'ls-acc-004',
    name: 'Jadau Polki Floral Statement Jhumkas',
    slug: 'jadau-polki-floral-statement-jhumkas',
    category: 'accessories',
    categoryName: 'Accessories',
    price: 4600,
    originalPrice: 5800,
    images: [
      'https://images.unsplash.com/photo-1615886753866-79396abc446e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sculpted bell-shaped jhumkas adorned with uncut Kundan polki crystals, soft pink tourmaline beads, and tiny cluster pearl hangings.',
    fabric: 'Silver Alloy with 22k Micron Gold Polish',
    occasion: 'Festive Celebrations',
    colours: [
      { name: 'Antique Gold', hex: '#D8C4A5' }
    ],
    sizes: ['Length: 7.5 cm | Weight: 32g per pair'],
    details: [
      'Push-back closure with comfortable silicone backings',
      'Handmade filigree cage detailing',
      'Lead and nickel free hypoallergenic alloy'
    ],
    care: 'Wipe with soft cotton cloth after every wear.',
    tags: ['Jhumkas', 'Statement Jewelry'],
    featured: false,
    newArrival: false,
    available: true,
    rating: 4.9,
    reviewsCount: 36
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

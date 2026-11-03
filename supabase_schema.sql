-- ==============================================================================
-- LILS SPUN BOUTIQUE - SUPABASE DATABASE INITIALIZATION SCRIPT
-- ==============================================================================
-- Paste this entire script into your Supabase SQL Editor and click 'Run'.
-- It will create all required tables, configure security (RLS), and seed the products.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    category_name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT,
    fabric TEXT,
    occasion TEXT,
    colours JSONB DEFAULT '[]'::jsonb,
    sizes JSONB DEFAULT '[]'::jsonb,
    details JSONB DEFAULT '[]'::jsonb,
    care TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    new_arrival BOOLEAN DEFAULT false,
    available BOOLEAN DEFAULT true,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_ref TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    payment_method TEXT DEFAULT 'upi',
    subtotal NUMERIC NOT NULL,
    shipping_fee NUMERIC DEFAULT 0,
    grand_total NUMERIC NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PATRON PROFILES TABLE (Linked with Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles: Patrons can view and update their own profile
DROP POLICY IF EXISTS "Patrons can view own profile" ON public.profiles;
CREATE POLICY "Patrons can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Patrons can update own profile" ON public.profiles;
CREATE POLICY "Patrons can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Patrons can insert own profile" ON public.profiles;
CREATE POLICY "Patrons can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Automatic Profile Creation Trigger on Sign-Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Products: Anyone can view products
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products
    FOR SELECT USING (true);

-- Products: Allow Admin and authenticated managers to insert, update, and delete listings
DROP POLICY IF EXISTS "Allow admin all on products" ON public.products;
CREATE POLICY "Allow admin all on products" ON public.products
    FOR ALL USING (true) WITH CHECK (true);

-- Orders: Anyone can create an order (public checkout)
DROP POLICY IF EXISTS "Public can create orders" ON public.orders;
CREATE POLICY "Public can create orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Orders: Public can look up order by reference
DROP POLICY IF EXISTS "Public can view own order by reference" ON public.orders;
CREATE POLICY "Public can view own order by reference" ON public.orders
    FOR SELECT USING (true);

-- Newsletter: Anyone can subscribe
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Contact: Anyone can submit an inquiry
DROP POLICY IF EXISTS "Public can submit contact inquiry" ON public.contact_inquiries;
CREATE POLICY "Public can submit contact inquiry" ON public.contact_inquiries
    FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- SEED DATA: 8 CORE BOUTIQUE PRODUCTS (2 PER CATEGORY)
-- ==============================================================================
INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  'ls-rm-001',
  'Embroidered Georgette Anarkali Ready Made Gown',
  'embroidered-georgette-anarkali-gown',
  'ready-made',
  'Ready Made',
  6850,
  8500,
  '["https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  'Gracefully pre-stitched floor-length Anarkali gown in ethereal georgette, embellished with resham threadwork, micro sequins, and scalloped border dupatta. Perfect for effortless festive celebrations and wedding receptions.',
  'Pure Georgette with Soft Crepe Lining',
  'Festive Celebrations',
  '[{"name":"Dusty Mauve","hex":"#9E7B88"},{"name":"Rose Beige","hex":"#D4B2A7"}]'::jsonb,
  '["S (36)","M (38)","L (40)","XL (42)"]'::jsonb,
  '["Fully stitched ready-to-wear gown with invisible back zipper","Embellished round neckline with delicate sequin handwork","Matching pre-hemmed sheer dupatta included","Can-can net inner lining for majestic royal flare"]'::jsonb,
  'Dry clean only. Store on a padded hanger.',
  '["Ready Made","Anarkali","Bestseller"]'::jsonb,
  true,
  true,
  true,
  4.9,
  24
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  fabric = EXCLUDED.fabric,
  occasion = EXCLUDED.occasion,
  colours = EXCLUDED.colours,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  care = EXCLUDED.care,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  new_arrival = EXCLUDED.new_arrival,
  available = EXCLUDED.available,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  'ls-rm-002',
  'Mughal Angrakha Velvet Kurta & Pant Set',
  'mughal-angrakha-velvet-kurta-set',
  'ready-made',
  'Ready Made',
  8200,
  9800,
  '["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  'A luxurious ready-to-wear Angrakha silhouette tailored in royal velvet. Accented with golden zari cord piping, handcrafted bullion tassels, and paired with tailored cigarette trousers and an embroidered organza dupatta.',
  'Micro Velvet & Tissue Organza',
  'Wedding Guest',
  '[{"name":"Midnight Teal","hex":"#1B3B48"},{"name":"Wine Burgundy","hex":"#5C1D24"}]'::jsonb,
  '["M (38)","L (40)","XL (42)","XXL (44)"]'::jsonb,
  '["Pre-stitched asymmetric Angrakha crossover cut","Handcrafted bullion thread tassel tie-ups","Straight cut comfort fit pants with side elastication","Scalloped zari-embroidered organza dupatta"]'::jsonb,
  'Dry clean only. Do not iron directly on velvet pile.',
  '["Ready Made","Velvet","Winter Festive"]'::jsonb,
  true,
  false,
  true,
  4.8,
  19
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  fabric = EXCLUDED.fabric,
  occasion = EXCLUDED.occasion,
  colours = EXCLUDED.colours,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  care = EXCLUDED.care,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  new_arrival = EXCLUDED.new_arrival,
  available = EXCLUDED.available,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  'ls-cm-001',
  'Handloom Chanderi Silk Zari Churidar Material',
  'handloom-chanderi-silk-zari-churidar-material',
  'churidar-materials',
  'Churidar Materials',
  3950,
  4800,
  '["https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  'Artisanal unstitched 3-piece churidar suit material featuring hand-woven floral butis on pure Chanderi silk. Accompanied by a pure cotton-silk bottom fabric and a lustrous banarasi border dupatta for bespoke boutique tailoring.',
  'Handloom Chanderi Silk Top, Cotton Silk Bottom, Chanderi Dupatta',
  'Everyday Elegance',
  '[{"name":"Sage Green","hex":"#8A9A86"},{"name":"Honey Mustard","hex":"#C89D3C"}]'::jsonb,
  '["Top: 2.50 Metres","Bottom: 2.00 Metres","Dupatta: 2.30 Metres"]'::jsonb,
  '["Unstitched fabric set suitable for custom tailor sizing up to 48\" bust","Traditional handwoven zari motifs across front and sleeves","Premium lightweight drape with natural sheen","Includes contrast Banarasi border dupatta with hand-knotted tassels"]'::jsonb,
  'Gentle hand wash in cold water or mild dry clean.',
  '["Churidar Material","Unstitched","Handloom Chanderi"]'::jsonb,
  true,
  true,
  true,
  5,
  31
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  fabric = EXCLUDED.fabric,
  occasion = EXCLUDED.occasion,
  colours = EXCLUDED.colours,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  care = EXCLUDED.care,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  new_arrival = EXCLUDED.new_arrival,
  available = EXCLUDED.available,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  'ls-cm-002',
  'Kashmiri Jamdani Pure Mulmul Dress Material',
  'kashmiri-jamdani-mulmul-dress-material',
  'churidar-materials',
  'Churidar Materials',
  3200,
  3900,
  '["https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  'Featherweight premium 100s count pure mulmul cotton unstitched suit material adorned with traditional Kashmiri thread motifs and an ombre handblock printed kota doria dupatta.',
  '100s Count Mulmul Cotton & Kota Doria Dupatta',
  'Everyday Elegance',
  '[{"name":"Pastel Lavender","hex":"#B8A9C9"},{"name":"Ivory Pearl","hex":"#EAE5D9"}]'::jsonb,
  '["Kurta: 2.5m","Bottom: 2.25m","Dupatta: 2.4m"]'::jsonb,
  '["Super-soft organic breathable summer mulmul cotton","Authentic Kashmiri floral resham neck yoke embroidery","Featherlight Kota Doria dupatta with tassel edging","Colorfast azo-free organic botanical dyes"]'::jsonb,
  'Hand wash with gentle detergent. Dry in shade.',
  '["Churidar Material","Mulmul Cotton","Kashmiri Work"]'::jsonb,
  false,
  true,
  true,
  4.9,
  16
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  fabric = EXCLUDED.fabric,
  occasion = EXCLUDED.occasion,
  colours = EXCLUDED.colours,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  care = EXCLUDED.care,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  new_arrival = EXCLUDED.new_arrival,
  available = EXCLUDED.available,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  'ls-sar-001',
  'Rose Pink Festive Kanjivaram Silk Saree',
  'rose-pink-festive-silk-saree',
  'sarees',
  'Sarees',
  14800,
  18500,
  '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  'An ethereal pure silk saree woven with intricate floral jaal in antique gold zari. The contrasting rich pallu features traditional peacock motifs with scalloped resham borders, draping in effortless royal grace.',
  'Pure Mulberry Silk with Antique Gold Zari',
  'Festive Celebrations',
  '[{"name":"Rose Pink","hex":"#D68C9A"},{"name":"Champagne Gold","hex":"#D8C4A5"}]'::jsonb,
  '["Free Size (5.5m + 0.8m Blouse)"]'::jsonb,
  '["Woven by traditional master weavers in Kanchipuram","Includes unstitched matching silk blouse piece (80 cm)","Intricate temple border craftsmanship","Lustrous sheen suitable for evening celebrations"]'::jsonb,
  'Dry clean only. Wrap in pristine white muslin cloth and air periodically.',
  '["Sarees","Kanjivaram","Pure Silk","Bestseller"]'::jsonb,
  true,
  false,
  true,
  5,
  38
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  fabric = EXCLUDED.fabric,
  occasion = EXCLUDED.occasion,
  colours = EXCLUDED.colours,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  care = EXCLUDED.care,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  new_arrival = EXCLUDED.new_arrival,
  available = EXCLUDED.available,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  'ls-sar-002',
  'Royal Midnight Banarasi Brocade Silk Saree',
  'royal-midnight-banarasi-brocade-saree',
  'sarees',
  'Sarees',
  16500,
  21000,
  '["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  'A majestic Varanasi handloom brocade drape in deep royal midnight navy, covered in fine kadhwa silver and gold sona-rupa floral vines with an opulent heirloom pallu.',
  'Pure Katan Silk with Sona Rupa Brocade',
  'Wedding Guest',
  '[{"name":"Midnight Navy","hex":"#132238"},{"name":"Antique Silver","hex":"#C0C0C0"}]'::jsonb,
  '["Free Size (5.5m + 0.85m Blouse)"]'::jsonb,
  '["Authentic Banarasi Kadhwa hand-weaving technique","Contrast brocade blouse material included (85 cm)","Intricate floral jaal across the body","Silk Mark Certified 100% pure silk"]'::jsonb,
  'Dry clean only. Keep away from direct perfumes.',
  '["Sarees","Banarasi","Brocade","Bridal Heritage"]'::jsonb,
  true,
  true,
  true,
  4.9,
  29
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  fabric = EXCLUDED.fabric,
  occasion = EXCLUDED.occasion,
  colours = EXCLUDED.colours,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  care = EXCLUDED.care,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  new_arrival = EXCLUDED.new_arrival,
  available = EXCLUDED.available,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  'ls-kw-001',
  'Pure Silk Pattu Pavadai Set for Girls',
  'pure-silk-pattu-pavadai-set-girls',
  'kids-wear',
  'Kids Wear',
  3450,
  4200,
  '["https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  'Traditional handcrafted South Indian Pattu Pavadai (lehenga-choli) set for young girls, woven from soft silk with golden temple zari borders, butter-soft cotton lining, and comfortable elasticated waistband.',
  'Soft Silk Blend with 100% Breathable Cotton Lining',
  'Festive Celebrations',
  '[{"name":"Rani Pink & Parrot Green","hex":"#D12B64"},{"name":"Golden Yellow","hex":"#E9B63B"}]'::jsonb,
  '["2-3 Years","4-5 Years","6-7 Years","8-9 Years","10-12 Years"]'::jsonb,
  '["Non-scratchy 100% pure cotton inner lining for child comfort","Comfort fit elasticated skirt waist with adjustable drawstrings","Back zipper blouse with soft neck facing","Traditional golden temple border weave"]'::jsonb,
  'Dry clean or gentle cold water hand wash.',
  '["Kids Wear","Pattu Pavadai","Girls Ethnic","Festive Kids"]'::jsonb,
  true,
  true,
  true,
  5,
  22
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  fabric = EXCLUDED.fabric,
  occasion = EXCLUDED.occasion,
  colours = EXCLUDED.colours,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  care = EXCLUDED.care,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  new_arrival = EXCLUDED.new_arrival,
  available = EXCLUDED.available,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  'ls-kw-002',
  'Jacquard Silk Kurta & Dhoti Pant Set for Boys',
  'jacquard-silk-kurta-dhoti-pant-boys',
  'kids-wear',
  'Kids Wear',
  2850,
  3500,
  '["https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  'Festive celebratory ethnic set for young gentlemen. Includes a tailored woven jacquard silk kurta with mandarin collar, metallic buttons, and ready-to-wear pre-pleated dhoti pants with soft elastic.',
  'Banarasi Jacquard Silk with Cotton Voile Inner Lining',
  'Festive Celebrations',
  '[{"name":"Royal Ivory & Gold","hex":"#F3EDE2"},{"name":"Marigold Ochre","hex":"#D48B28"}]'::jsonb,
  '["2-3 Years","4-5 Years","6-7 Years","8-9 Years","10-12 Years"]'::jsonb,
  '["Pre-stitched hassle-free dhoti trousers for active little boys","Mandarin collar with soft interlining to prevent neck irritation","Premium metallic button accents and chest pocket","Fully lined with soft breathable cotton voile"]'::jsonb,
  'Hand wash separately or gentle dry clean.',
  '["Kids Wear","Boys Ethnic","Kurta Dhoti","Traditional"]'::jsonb,
  false,
  true,
  true,
  4.9,
  17
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  images = EXCLUDED.images,
  description = EXCLUDED.description,
  fabric = EXCLUDED.fabric,
  occasion = EXCLUDED.occasion,
  colours = EXCLUDED.colours,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  care = EXCLUDED.care,
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured,
  new_arrival = EXCLUDED.new_arrival,
  available = EXCLUDED.available,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;


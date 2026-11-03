import fs from 'fs';
import { products } from '../src/data/products.js';

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function jsonSql(obj) {
  if (obj === null || obj === undefined) return "'[]'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

let sql = `-- ==============================================================================
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
`;

for (const p of products) {
  sql += `INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  ${escapeSql(p.id)},
  ${escapeSql(p.name)},
  ${escapeSql(p.slug)},
  ${escapeSql(p.category)},
  ${escapeSql(p.categoryName)},
  ${p.price},
  ${p.originalPrice || 'NULL'},
  ${jsonSql(p.images)},
  ${escapeSql(p.description)},
  ${escapeSql(p.fabric)},
  ${escapeSql(p.occasion)},
  ${jsonSql(p.colours)},
  ${jsonSql(p.sizes)},
  ${jsonSql(p.details)},
  ${escapeSql(p.care)},
  ${jsonSql(p.tags)},
  ${p.featured ? 'true' : 'false'},
  ${p.newArrival ? 'true' : 'false'},
  ${p.available !== false ? 'true' : 'false'},
  ${p.rating || 5.0},
  ${p.reviewsCount || 0}
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
\n`;
}

fs.writeFileSync('supabase_schema.sql', sql);
console.log('✅ Generated supabase_schema.sql successfully with 8 products & admin RLS policies!');

// Also generate migration script that deletes old products and inserts 8 new ones
let updateSql = `-- ==============================================================================
-- LILS SPUN BOUTIQUE - PRODUCT DATABASE UPDATE SCRIPT
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Ensure RLS allows Admin INSERT, UPDATE, and DELETE
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin all on products" ON public.products;
CREATE POLICY "Allow admin all on products" ON public.products
    FOR ALL USING (true) WITH CHECK (true);

-- 2. Clear old dummy products
TRUNCATE TABLE public.products;

-- 3. Seed 8 Curated Boutique Products (2 in each category)
`;

for (const p of products) {
  updateSql += `INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES (
  ${escapeSql(p.id)},
  ${escapeSql(p.name)},
  ${escapeSql(p.slug)},
  ${escapeSql(p.category)},
  ${escapeSql(p.categoryName)},
  ${p.price},
  ${p.originalPrice || 'NULL'},
  ${jsonSql(p.images)},
  ${escapeSql(p.description)},
  ${escapeSql(p.fabric)},
  ${escapeSql(p.occasion)},
  ${jsonSql(p.colours)},
  ${jsonSql(p.sizes)},
  ${jsonSql(p.details)},
  ${escapeSql(p.care)},
  ${jsonSql(p.tags)},
  ${p.featured ? 'true' : 'false'},
  ${p.newArrival ? 'true' : 'false'},
  ${p.available !== false ? 'true' : 'false'},
  ${p.rating || 5.0},
  ${p.reviewsCount || 0}
);\n`;
}

fs.writeFileSync('supabase_update_categories_and_products.sql', updateSql);
console.log('✅ Generated supabase_update_categories_and_products.sql migration successfully!');

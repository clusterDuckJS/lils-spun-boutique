import React, { useState } from 'react';
import { X, Database, Copy, Check, Terminal, Shield, RefreshCw, AlertTriangle } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export const SQL_MIGRATION_SCRIPT = `-- ==============================================================================
-- LILS SPUN BOUTIQUE - PRODUCT DATABASE UPDATE SCRIPT
-- ==============================================================================
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- 1. Updates RLS policies to allow administrator INSERT, UPDATE, and DELETE.
-- 2. Seeds the 8 boutique products (2 in each requested category).
-- ==============================================================================

-- 1. Ensure Table Structure
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

-- 2. Configure Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public to view products
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products
    FOR SELECT USING (true);

-- Allow Admin & Client full write access
DROP POLICY IF EXISTS "Allow admin all on products" ON public.products;
CREATE POLICY "Allow admin all on products" ON public.products
    FOR ALL USING (true) WITH CHECK (true);

-- 3. Clear legacy dummy products
TRUNCATE TABLE public.products;

-- 4. Seed 8 Curated Products (2 in each category)
INSERT INTO public.products (
  id, name, slug, category, category_name, price, original_price,
  images, description, fabric, occasion, colours, sizes, details, care, tags,
  featured, new_arrival, available, rating, reviews_count
) VALUES
-- READY MADE (2 Products)
(
  'ls-rm-001',
  'Embroidered Georgette Anarkali Ready Made Gown',
  'embroidered-georgette-anarkali-gown',
  'ready-made',
  'Ready Made',
  6850,
  8500,
  '["/images/products/georgette-anarkali-gown.jpg"]'::jsonb,
  'Gracefully pre-stitched floor-length Anarkali gown in ethereal georgette, embellished with resham threadwork, micro sequins, and scalloped border dupatta.',
  'Pure Georgette with Soft Crepe Lining',
  'Festive Celebrations',
  '[{"name":"Dusty Mauve","hex":"#9E7B88"},{"name":"Rose Beige","hex":"#D4B2A7"}]'::jsonb,
  '["S (36)","M (38)","L (40)","XL (42)"]'::jsonb,
  '["Fully stitched ready-to-wear gown with invisible back zipper","Embellished round neckline with delicate sequin handwork","Matching pre-hemmed sheer dupatta included","Can-can net inner lining for majestic royal flare"]'::jsonb,
  'Dry clean only. Store on a padded hanger.',
  '["Ready Made","Anarkali","Bestseller"]'::jsonb,
  true, true, true, 4.9, 24
),
(
  'ls-rm-002',
  'Mughal Angrakha Velvet Kurta & Pant Set',
  'mughal-angrakha-velvet-kurta-set',
  'ready-made',
  'Ready Made',
  8200,
  9800,
  '["/images/products/mughal-velvet-kurta-set.jpg"]'::jsonb,
  'A luxurious ready-to-wear Angrakha silhouette tailored in royal velvet. Accented with golden zari cord piping and paired with tailored trousers and dupatta.',
  'Micro Velvet & Tissue Organza',
  'Wedding Guest',
  '[{"name":"Midnight Teal","hex":"#1B3B48"},{"name":"Wine Burgundy","hex":"#5C1D24"}]'::jsonb,
  '["M (38)","L (40)","XL (42)","XXL (44)"]'::jsonb,
  '["Pre-stitched asymmetric Angrakha crossover cut","Handcrafted bullion thread tassel tie-ups","Straight cut comfort fit pants with side elastication","Scalloped zari-embroidered organza dupatta"]'::jsonb,
  'Dry clean only. Do not iron directly on velvet pile.',
  '["Ready Made","Velvet","Winter Festive"]'::jsonb,
  true, false, true, 4.8, 19
),

-- CHURIDAR MATERIALS (2 Products)
(
  'ls-cm-001',
  'Handloom Chanderi Silk Zari Churidar Material',
  'handloom-chanderi-silk-zari-churidar-material',
  'churidar-materials',
  'Churidar Materials',
  3950,
  4800,
  '["/images/products/chanderi-silk-churidar.jpg"]'::jsonb,
  'Artisanal unstitched 3-piece churidar suit material featuring hand-woven floral butis on pure Chanderi silk with contrast Banarasi border dupatta.',
  'Handloom Chanderi Silk Top, Cotton Silk Bottom, Chanderi Dupatta',
  'Everyday Elegance',
  '[{"name":"Sage Green","hex":"#8A9A86"},{"name":"Honey Mustard","hex":"#C89D3C"}]'::jsonb,
  '["Top: 2.50 Metres","Bottom: 2.00 Metres","Dupatta: 2.30 Metres"]'::jsonb,
  '["Unstitched fabric set suitable for custom tailor sizing up to 48 inch bust","Traditional handwoven zari motifs across front and sleeves","Premium lightweight drape with natural sheen","Includes contrast Banarasi border dupatta"]'::jsonb,
  'Gentle hand wash in cold water or mild dry clean.',
  '["Churidar Material","Unstitched","Handloom Chanderi"]'::jsonb,
  true, true, true, 5.0, 31
),
(
  'ls-cm-002',
  'Kashmiri Jamdani Pure Mulmul Dress Material',
  'kashmiri-jamdani-mulmul-dress-material',
  'churidar-materials',
  'Churidar Materials',
  3200,
  3900,
  '["/images/products/kashmiri-mulmul-material.jpg"]'::jsonb,
  'Featherweight premium 100s count pure mulmul cotton unstitched suit material adorned with traditional Kashmiri thread motifs and an ombre handblock printed kota doria dupatta.',
  '100s Count Mulmul Cotton & Kota Doria Dupatta',
  'Everyday Elegance',
  '[{"name":"Pastel Lavender","hex":"#B8A9C9"},{"name":"Ivory Pearl","hex":"#EAE5D9"}]'::jsonb,
  '["Kurta: 2.5m","Bottom: 2.25m","Dupatta: 2.4m"]'::jsonb,
  '["Super-soft organic breathable summer mulmul cotton","Authentic Kashmiri floral resham neck yoke embroidery","Featherlight Kota Doria dupatta with tassel edging","Colorfast azo-free organic botanical dyes"]'::jsonb,
  'Hand wash with gentle detergent. Dry in shade.',
  '["Churidar Material","Mulmul Cotton","Kashmiri Work"]'::jsonb,
  false, true, true, 4.9, 16
),

-- SAREES (2 Products)
(
  'ls-sar-001',
  'Rose Pink Festive Kanjivaram Silk Saree',
  'rose-pink-festive-silk-saree',
  'sarees',
  'Sarees',
  14800,
  18500,
  '["/images/products/rose-pink-kanjivaram-saree.jpg"]'::jsonb,
  'An ethereal pure silk saree woven with intricate floral jaal in antique gold zari. The contrasting rich pallu features traditional peacock motifs with scalloped resham borders.',
  'Pure Mulberry Silk with Antique Gold Zari',
  'Festive Celebrations',
  '[{"name":"Rose Pink","hex":"#D68C9A"},{"name":"Champagne Gold","hex":"#D8C4A5"}]'::jsonb,
  '["Free Size (5.5m + 0.8m Blouse)"]'::jsonb,
  '["Woven by traditional master weavers in Kanchipuram","Includes unstitched matching silk blouse piece (80 cm)","Intricate temple border craftsmanship","Lustrous sheen suitable for evening celebrations"]'::jsonb,
  'Dry clean only. Wrap in pristine white muslin cloth and air periodically.',
  '["Sarees","Kanjivaram","Pure Silk","Bestseller"]'::jsonb,
  true, false, true, 5.0, 38
),
(
  'ls-sar-002',
  'Royal Midnight Banarasi Brocade Silk Saree',
  'royal-midnight-banarasi-brocade-saree',
  'sarees',
  'Sarees',
  16500,
  21000,
  '["/images/products/banarasi-brocade-saree.jpg"]'::jsonb,
  'A majestic Varanasi handloom brocade drape in deep royal midnight navy, covered in fine kadhwa silver and gold sona-rupa floral vines with an opulent heirloom pallu.',
  'Pure Katan Silk with Sona Rupa Brocade',
  'Wedding Guest',
  '[{"name":"Midnight Navy","hex":"#132238"},{"name":"Antique Silver","hex":"#C0C0C0"}]'::jsonb,
  '["Free Size (5.5m + 0.85m Blouse)"]'::jsonb,
  '["Authentic Banarasi Kadhwa hand-weaving technique","Contrast brocade blouse material included (85 cm)","Intricate floral jaal across the body","Silk Mark Certified 100% pure silk"]'::jsonb,
  'Dry clean only. Keep away from direct perfumes.',
  '["Sarees","Banarasi","Brocade","Bridal Heritage"]'::jsonb,
  true, true, true, 4.9, 29
),

-- KIDS WEAR (2 Products)
(
  'ls-kw-001',
  'Pure Silk Pattu Pavadai Set for Girls',
  'pure-silk-pattu-pavadai-set-girls',
  'kids-wear',
  'Kids Wear',
  3450,
  4200,
  '["/images/products/girls-pattu-pavadai.jpg"]'::jsonb,
  'Traditional handcrafted South Indian Pattu Pavadai (lehenga-choli) set for young girls, woven from soft silk with golden temple zari borders, butter-soft cotton lining, and comfortable elasticated waistband.',
  'Soft Silk Blend with 100% Breathable Cotton Lining',
  'Festive Celebrations',
  '[{"name":"Rani Pink & Parrot Green","hex":"#D12B64"},{"name":"Golden Yellow","hex":"#E9B63B"}]'::jsonb,
  '["2-3 Years","4-5 Years","6-7 Years","8-9 Years","10-12 Years"]'::jsonb,
  '["Non-scratchy 100% pure cotton inner lining for child comfort","Comfort fit elasticated skirt waist with adjustable drawstrings","Back zipper blouse with soft neck facing","Traditional golden temple border weave"]'::jsonb,
  'Dry clean or gentle cold water hand wash.',
  '["Kids Wear","Pattu Pavadai","Girls Ethnic","Festive Kids"]'::jsonb,
  true, true, true, 5.0, 22
),
(
  'ls-kw-002',
  'Jacquard Silk Kurta & Dhoti Pant Set for Boys',
  'jacquard-silk-kurta-dhoti-pant-boys',
  'kids-wear',
  'Kids Wear',
  2850,
  3500,
  '["/images/products/boys-kurta-dhoti-set.jpg"]'::jsonb,
  'Festive celebratory ethnic set for young gentlemen. Includes a tailored woven jacquard silk kurta with mandarin collar, metallic buttons, and ready-to-wear pre-pleated dhoti pants with soft elastic.',
  'Banarasi Jacquard Silk with Cotton Voile Inner Lining',
  'Festive Celebrations',
  '[{"name":"Royal Ivory & Gold","hex":"#F3EDE2"},{"name":"Marigold Ochre","hex":"#D48B28"}]'::jsonb,
  '["2-3 Years","4-5 Years","6-7 Years","8-9 Years","10-12 Years"]'::jsonb,
  '["Pre-stitched hassle-free dhoti trousers for active little boys","Mandarin collar with soft interlining to prevent neck irritation","Premium metallic button accents and chest pocket","Fully lined with soft breathable cotton voile"]'::jsonb,
  'Hand wash separately or gentle dry clean.',
  '["Kids Wear","Boys Ethnic","Kurta Dhoti","Traditional"]'::jsonb,
  false, true, true, 4.9, 17
);
`;

export const SQL_ORDERS_MIGRATION_SCRIPT = `-- ==============================================================================
-- LILS SPUN BOUTIQUE - ORDERS RLS & FULFILLMENT UPDATE POLICY
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql

-- 1. Ensure Table Structure & Columns exist
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_ref TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    payment_method TEXT DEFAULT 'upi',
    subtotal NUMERIC NOT NULL DEFAULT 0,
    shipping_fee NUMERIC NOT NULL DEFAULT 0,
    grand_total NUMERIC NOT NULL DEFAULT 0,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'confirmed',
    payment_status TEXT NOT NULL DEFAULT 'pending',
    phonepe_order_id TEXT,
    transaction_id TEXT,
    payment_details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure payment_details JSONB column exists for tracking metadata
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'orders' 
        AND column_name = 'payment_details'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN payment_details JSONB DEFAULT '{}'::jsonb;
    END IF;
END $$;

-- 2. Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Public can insert orders (Checkout)
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
CREATE POLICY "Public can insert orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- 4. Policy: View orders
DROP POLICY IF EXISTS "Public can view orders" ON public.orders;
CREATE POLICY "Public can view orders" ON public.orders
    FOR SELECT USING (true);

-- 5. Policy: Admin full write/update access (Fulfillment, Dispatched, Delivered, Tracking)
DROP POLICY IF EXISTS "Allow admin all on orders" ON public.orders;
CREATE POLICY "Allow admin all on orders" ON public.orders
    FOR ALL USING (true) WITH CHECK (true);

-- Grant privileges to anon and authenticated roles
GRANT ALL ON TABLE public.orders TO anon, authenticated, service_role;
`;

export default function DatabaseSyncModal({ isOpen, onClose, onResetDefaults }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'products'
  const [copied, setCopied] = useState(false);

  const activeScript = activeTab === 'orders' ? SQL_ORDERS_MIGRATION_SCRIPT : SQL_MIGRATION_SCRIPT;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-luxury border border-brand-border overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4.5 bg-brand-navy text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-champagne/20 border border-brand-champagne/30 text-brand-champagne flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-white font-normal flex items-center gap-2">
                <span>Supabase Database &amp; RLS Configuration</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isSupabaseConfigured ? 'Connected' : 'Offline'}
                </span>
              </h2>
              <p className="text-[11px] text-brand-champagne/80">
                1-click SQL scripts for Products Catalogue and Orders Fulfillment RLS policies.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Script Selection Tabs */}
        <div className="flex border-b border-brand-border bg-brand-ivory/50 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-brand-navy text-brand-navy font-bold'
                : 'border-transparent text-brand-muted hover:text-brand-navy'
            }`}
          >
            Orders Fulfillment RLS (Status &amp; Tracking)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-brand-navy text-brand-navy font-bold'
                : 'border-transparent text-brand-muted hover:text-brand-navy'
            }`}
          >
            Products Catalogue RLS &amp; 8 Items
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-5 flex-1 text-xs text-brand-navy">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">How Supabase RLS Works</p>
              <p className="text-amber-800 leading-relaxed mt-0.5">
                {activeTab === 'orders' ? (
                  <>
                    By default, public access only permits checkout order insertions. Running this Orders SQL script allows your admin dashboard to update order status (<code className="bg-amber-100/80 px-1 py-0.5 rounded">dispatched</code>, <code className="bg-amber-100/80 px-1 py-0.5 rounded">delivered</code>, etc.), courier partner, and tracking numbers in Supabase.
                  </>
                ) : (
                  <>
                    Supabase enforces Row Level Security (RLS). Running this script creates policies for <code className="bg-amber-100/80 px-1 py-0.5 rounded">INSERT</code>, <code className="bg-amber-100/80 px-1 py-0.5 rounded">UPDATE</code>, and <code className="bg-amber-100/80 px-1 py-0.5 rounded">DELETE</code> on products, allowing you to add, edit, or delete listings directly.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-rose" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                {activeTab === 'orders' ? 'Orders RLS SQL Migration' : 'Products & Catalog SQL Migration'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy text-brand-champagne rounded-xl text-xs font-semibold hover:bg-brand-navy-light transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
            </button>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-2xl bg-brand-navy text-brand-ivory font-mono text-[11px] leading-relaxed max-h-60 overflow-y-auto border border-brand-border">
              {activeScript}
            </pre>
          </div>

          {activeTab === 'products' && (
            <div className="p-4 rounded-2xl bg-brand-ivory border border-brand-border flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-brand-navy">Reset Local State</p>
                <p className="text-brand-muted text-[11px]">
                  Reset any temporary offline changes back to the 8 boutique products.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onResetDefaults();
                  onClose();
                }}
                className="px-4 py-2 border border-brand-border hover:border-brand-rose text-brand-navy hover:text-brand-rose text-xs font-semibold rounded-xl bg-white transition-colors shrink-0"
              >
                Reset to 8 Defaults
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-brand-ivory border-t border-brand-border flex items-center justify-between shrink-0">
          <p className="text-[11px] text-brand-muted font-light">
            File on disk: <code className="bg-brand-blush/30 px-1 py-0.5 rounded text-brand-navy">
              {activeTab === 'orders' ? 'supabase_orders_update_policy.sql' : 'supabase_update_categories_and_products.sql'}
            </code>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-brand-navy text-white text-xs font-semibold rounded-xl hover:bg-brand-navy-light transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

-- ==============================================================================
-- LILS SPUN BOUTIQUE - ORDERS RLS & FULFILLMENT UPDATE POLICY
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
--
-- This enables Row Level Security (RLS) on public.orders and creates policies so:
-- 1. Customers can place orders during checkout (INSERT).
-- 2. Customers and admins can view order records (SELECT).
-- 3. The Admin Console can update fulfillment status, courier partner, AWB/tracking,
--    and dispatch notes (UPDATE).
-- ==============================================================================

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

-- ==============================================================================
-- LILS SPUN BOUTIQUE - PHONEPE PAYMENT GATEWAY INTEGRATION MIGRATION
-- ==============================================================================
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ywfcxlyuogbtrapvxxzb/sql
-- ==============================================================================

-- 1. Add payment tracking columns to the public.orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS phonepe_order_id TEXT,
ADD COLUMN IF NOT EXISTS transaction_id TEXT,
ADD COLUMN IF NOT EXISTS payment_details JSONB DEFAULT '{}'::jsonb;

-- 2. Add helpful indexes for fast lookup during status checks & webhooks
CREATE INDEX IF NOT EXISTS idx_orders_order_ref ON public.orders(order_ref);
CREATE INDEX IF NOT EXISTS idx_orders_phonepe_order_id ON public.orders(phonepe_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);

-- 3. Ensure service role / functions can update orders
-- (By default, Supabase Service Role key bypasses RLS, but we ensure policies allow patron read)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'orders' AND policyname = 'Anyone can view order by order_ref'
    ) THEN
        CREATE POLICY "Anyone can view order by order_ref" ON public.orders
            FOR SELECT USING (true);
    END IF;
END $$;

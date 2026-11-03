import { createClient } from '@supabase/supabase-js';

const url = 'https://ywfcxlyuogbtrapvxxzb.supabase.co';
const key = 'sb_publishable_MC_BNL0AzCIP4EPad5_Zng_gOoaZkkk';

const supabase = createClient(url, key);

async function check() {
  console.log('🔍 Checking Supabase project tables...\n');

  // Check products
  const { data: products, error: pError } = await supabase.from('products').select('id, name, category, price');
  if (pError) {
    console.log('❌ "products" table error:', pError.message);
  } else {
    console.log(`✅ "products" table loaded! Count: ${products.length} products.`);
    const cats = [...new Set(products.map(p => p.category))];
    console.log('   Categories present in DB:', cats.join(', '));
  }

  // Check orders
  const { data: orders, error: oError } = await supabase.from('orders').select('id').limit(1);
  if (oError) {
    console.log('❌ "orders" table:', oError.message);
  } else {
    console.log('✅ "orders" table ready!');
  }
}

check();

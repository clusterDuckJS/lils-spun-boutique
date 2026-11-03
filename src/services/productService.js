import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { products as localProducts } from '../data/products';

const LOCAL_STORAGE_OVERLAY_KEY = 'lils_spun_admin_custom_products';
const LOCAL_STORAGE_DELETED_KEY = 'lils_spun_admin_deleted_ids';

export const VALID_CATEGORIES = [
  'ready-made',
  'churidar-materials',
  'sarees',
  'kids-wear'
];

export const CATEGORY_NAMES = {
  'ready-made': 'Ready Made',
  'churidar-materials': 'Churidar Materials',
  'sarees': 'Sarees',
  'kids-wear': 'Kids Wear'
};

export function normalizeProduct(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name || 'Untitled Piece',
    slug: row.slug || String(row.id),
    category: row.category || 'ready-made',
    categoryName: row.category_name ?? row.categoryName ?? CATEGORY_NAMES[row.category] ?? 'Boutique Collection',
    price: Number(row.price || 0),
    originalPrice: row.original_price != null ? Number(row.original_price) : (row.originalPrice != null ? Number(row.originalPrice) : null),
    images: Array.isArray(row.images) ? row.images : (typeof row.images === 'string' ? [row.images] : []),
    description: row.description || '',
    fabric: row.fabric || '',
    occasion: row.occasion || '',
    colours: Array.isArray(row.colours) ? row.colours : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    details: Array.isArray(row.details) ? row.details : [],
    care: row.care || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: Boolean(row.featured),
    newArrival: Boolean(row.new_arrival ?? row.newArrival),
    available: row.available !== false,
    rating: Number(row.rating || 5.0),
    reviewsCount: Number(row.reviews_count ?? row.reviewsCount ?? 0)
  };
}

// Convert app product model to Supabase table column names
export function toDatabaseRow(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    category_name: product.categoryName || CATEGORY_NAMES[product.category] || product.category,
    price: Number(product.price),
    original_price: product.originalPrice != null ? Number(product.originalPrice) : null,
    images: Array.isArray(product.images) ? product.images : [],
    description: product.description || '',
    fabric: product.fabric || '',
    occasion: product.occasion || '',
    colours: Array.isArray(product.colours) ? product.colours : [],
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    details: Array.isArray(product.details) ? product.details : [],
    care: product.care || '',
    tags: Array.isArray(product.tags) ? product.tags : [],
    featured: Boolean(product.featured),
    new_arrival: Boolean(product.newArrival),
    available: product.available !== false,
    rating: Number(product.rating || 5.0),
    reviews_count: Number(product.reviewsCount || 0)
  };
}

// Local Storage helpers for seamless fallback & persistence
function getLocalOverlays() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_OVERLAY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalOverlays(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_OVERLAY_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('Error saving local overlay products:', err);
  }
}

function getDeletedIds() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function recordDeletedId(id) {
  try {
    const ids = getDeletedIds();
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem(LOCAL_STORAGE_DELETED_KEY, JSON.stringify(ids));
    }
  } catch (err) {
    console.warn('Error recording deleted ID:', err);
  }
}

// In-memory cache for fast responsive navigation
let cachedProducts = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

export async function getProducts(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedProducts && (now - cacheTimestamp < CACHE_TTL_MS)) {
    return cachedProducts;
  }

  const deletedIds = getDeletedIds();
  const localOverlays = getLocalOverlays();

  let productsResult = null;
  let isDatabaseClean = false;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (!error && data && data.length > 0) {
        // Check if database still contains legacy dummy products (e.g. salwar-suits, kurtas-sets, lehengas)
        const hasLegacyCategories = data.some(p => !VALID_CATEGORIES.includes(p.category));

        if (!hasLegacyCategories) {
          // Database is cleanly migrated to the 4 categories!
          isDatabaseClean = true;
          productsResult = data.map(normalizeProduct);
        } else {
          console.info('Supabase database currently holds legacy categories. Using 8 clean products while migration is ready.');
        }
      }
    } catch (err) {
      console.warn('Supabase fetch exception, using clean products:', err);
    }
  }

  if (!productsResult) {
    // Start with the 8 canonical products
    productsResult = localProducts.map(p => ({ ...p }));
  }

  // Merge any locally added/updated products from admin sessions
  if (localOverlays.length > 0) {
    const overlayMap = new Map(localOverlays.map(p => [p.id, p]));
    // Replace existing or append new
    productsResult = productsResult.map(p => overlayMap.get(p.id) || p);
    localOverlays.forEach(item => {
      if (!productsResult.some(p => p.id === item.id)) {
        productsResult.push(item);
      }
    });
  }

  // Filter out any explicitly deleted products
  if (deletedIds.length > 0) {
    productsResult = productsResult.filter(p => !deletedIds.includes(p.id));
  }

  cachedProducts = productsResult;
  cacheTimestamp = now;
  return cachedProducts;
}

export async function getProductBySlug(slug) {
  const all = await getProducts();
  return all.find(p => p.slug === slug) || null;
}

/**
 * Create a new product listing in Supabase and local store
 */
export async function createProduct(productData) {
  const id = productData.id || `ls-${productData.category ? productData.category.slice(0, 2) : 'pr'}-${Date.now()}`;
  const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const normalized = normalizeProduct({
    ...productData,
    id,
    slug,
    categoryName: CATEGORY_NAMES[productData.category] || productData.categoryName
  });

  let savedToDatabase = false;
  let dbError = null;

  if (isSupabaseConfigured && supabase) {
    try {
      const dbRow = toDatabaseRow(normalized);
      const { data, error } = await supabase
        .from('products')
        .insert([dbRow])
        .select();

      if (!error && data) {
        savedToDatabase = true;
      } else if (error) {
        dbError = error.message;
        console.warn('Supabase product insert notice:', error.message);
      }
    } catch (err) {
      dbError = err.message;
      console.warn('Supabase product insert exception:', err);
    }
  }

  // Always update local overlay to guarantee persistence
  const overlays = getLocalOverlays().filter(p => p.id !== id);
  overlays.unshift(normalized);
  saveLocalOverlays(overlays);

  // Clear cache
  cachedProducts = null;

  return {
    success: true,
    product: normalized,
    savedToDatabase,
    dbError
  };
}

/**
 * Update an existing product listing
 */
export async function updateProduct(id, updates) {
  const current = (await getProducts()).find(p => p.id === id) || {};
  const updatedProduct = normalizeProduct({
    ...current,
    ...updates,
    id,
    categoryName: CATEGORY_NAMES[updates.category || current.category] || updates.categoryName || current.categoryName
  });

  let savedToDatabase = false;
  let dbError = null;

  if (isSupabaseConfigured && supabase) {
    try {
      const dbRow = toDatabaseRow(updatedProduct);
      const { error } = await supabase
        .from('products')
        .update(dbRow)
        .eq('id', id);

      if (!error) {
        savedToDatabase = true;
      } else {
        dbError = error.message;
        console.warn('Supabase product update notice:', error.message);
      }
    } catch (err) {
      dbError = err.message;
    }
  }

  // Update local overlays
  const overlays = getLocalOverlays().filter(p => p.id !== id);
  overlays.unshift(updatedProduct);
  saveLocalOverlays(overlays);

  // Clear cache
  cachedProducts = null;

  return {
    success: true,
    product: updatedProduct,
    savedToDatabase,
    dbError
  };
}

/**
 * Delete a product listing
 */
export async function deleteProduct(id) {
  let deletedFromDatabase = false;
  let dbError = null;

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (!error) {
        deletedFromDatabase = true;
      } else {
        dbError = error.message;
        console.warn('Supabase delete product notice:', error.message);
      }
    } catch (err) {
      dbError = err.message;
    }
  }

  // Record deleted ID in local storage & remove from overlays
  recordDeletedId(id);
  const overlays = getLocalOverlays().filter(p => p.id !== id);
  saveLocalOverlays(overlays);

  // Clear cache
  cachedProducts = null;

  return {
    success: true,
    id,
    deletedFromDatabase,
    dbError
  };
}

/**
 * Reset all local edits back to clean 8 default products
 */
export function resetLocalProducts() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_OVERLAY_KEY);
    localStorage.removeItem(LOCAL_STORAGE_DELETED_KEY);
    cachedProducts = null;
    return true;
  } catch {
    return false;
  }
}

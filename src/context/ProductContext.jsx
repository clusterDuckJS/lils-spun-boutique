import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  resetLocalProducts as apiResetLocalProducts
} from '../services/productService';
import { products as fallbackProducts } from '../data/products';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFromDatabase, setIsFromDatabase] = useState(false);

  const loadProducts = useCallback(async (force = false) => {
    try {
      setLoading(true);
      const data = await getProducts(force);
      if (data && data.length > 0) {
        setProducts(data);
        setIsFromDatabase(data !== fallbackProducts);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = useCallback(async (productData) => {
    const res = await apiCreateProduct(productData);
    if (res.success) {
      await loadProducts(true);
    }
    return res;
  }, [loadProducts]);

  const editProduct = useCallback(async (id, updates) => {
    const res = await apiUpdateProduct(id, updates);
    if (res.success) {
      await loadProducts(true);
    }
    return res;
  }, [loadProducts]);

  const removeProduct = useCallback(async (id) => {
    const res = await apiDeleteProduct(id);
    if (res.success) {
      await loadProducts(true);
    }
    return res;
  }, [loadProducts]);

  const resetAllProducts = useCallback(async () => {
    apiResetLocalProducts();
    await loadProducts(true);
  }, [loadProducts]);

  const getProductBySlug = useCallback((slug) => {
    return products.find(p => p.slug === slug);
  }, [products]);

  const getProductsByCategory = useCallback((category) => {
    if (!category || category === 'all') return products;
    if (category === 'new-arrivals') return products.filter(p => p.newArrival);
    return products.filter(p => p.category === category);
  }, [products]);

  const getFeaturedProducts = useCallback(() => {
    return products.filter(p => p.featured);
  }, [products]);

  const getNewArrivals = useCallback(() => {
    return products.filter(p => p.newArrival);
  }, [products]);

  const getRelatedProducts = useCallback((currentProductId, limit = 4) => {
    const current = products.find(p => p.id === currentProductId);
    if (!current) return products.slice(0, limit);
    const sameCategory = products.filter(p => p.category === current.category && p.id !== currentProductId);
    if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
    const others = products.filter(p => p.id !== currentProductId && !sameCategory.includes(p));
    return [...sameCategory, ...others].slice(0, limit);
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        isFromDatabase,
        refreshProducts: () => loadProducts(true),
        addProduct,
        editProduct,
        removeProduct,
        resetAllProducts,
        getProductBySlug,
        getProductsByCategory,
        getFeaturedProducts,
        getNewArrivals,
        getRelatedProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

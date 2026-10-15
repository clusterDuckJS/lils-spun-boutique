import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'lils_spun_wishlist_v1';

export function WishlistProvider({ children }) {
  const { addToast } = useToast();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  const isInWishlist = (productId) => {
    return wishlistIds.includes(productId);
  };

  const toggleWishlist = (product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      addToast({
        title: 'Removed from Wishlist',
        message: `${product.name} was removed.`,
        type: 'info'
      });
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      addToast({
        title: 'Saved to Wishlist',
        message: `${product.name} has been added to your favourites.`,
        type: 'wishlist'
      });
    }
  };

  const removeFromWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    if (product) {
      addToast({
        title: 'Removed from Wishlist',
        message: `${product.name} was removed.`,
        type: 'info'
      });
    }
  };

  // Derive full product objects for saved IDs
  const wishlistItems = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        wishlistCount: wishlistIds.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

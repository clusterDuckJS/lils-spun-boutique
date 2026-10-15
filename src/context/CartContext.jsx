import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const STORAGE_KEY = 'lils_spun_cart_v1';

export function CartProvider({ children }) {
  const { addToast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product, options = {}, quantity = 1) => {
    const selectedSize = options.size || (product.sizes && product.sizes[0]) || 'Free Size';
    const selectedColour = options.colour || (product.colours && product.colours[0]?.name) || 'Default';
    const cartItemId = `${product.id}-${selectedSize}-${selectedColour}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            selectedSize,
            selectedColour,
            quantity,
            price: product.price
          }
        ];
      }
    });

    addToast({
      title: 'Added to Shopping Bag',
      message: `${product.name} (${selectedSize})`,
      type: 'cart'
    });
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    const item = items.find((i) => i.id === cartItemId);
    setItems((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      addToast({
        title: 'Removed from Bag',
        message: `${item.product.name} was removed.`,
        type: 'info'
      });
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Free shipping on orders over ₹4,999 in demo
  const shippingFee = subtotal === 0 ? 0 : subtotal >= 4999 ? 0 : 250;
  const grandTotal = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

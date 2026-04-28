'use client';

import { useCallback, useEffect, useState } from 'react';
import { CART_API_URL, DEFAULT_USER_ID } from '@/lib/config';

export interface CartItem {
  id?: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  userId: number;
  items: CartItem[];
  totalPrice: number;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${CART_API_URL}/cart/${DEFAULT_USER_ID}`);

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data: CartResponse = await response.json();
      setCartItems(data.items || []);
      setError(null);
    } catch (err) {
      console.error('[v0] Error fetching cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (item: Omit<CartItem, 'id'>) => {
    try {
      const response = await fetch(`${CART_API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          userId: DEFAULT_USER_ID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      await fetchCart();
    } catch (err) {
      console.error('[v0] Error adding to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
      // Add to local state as fallback
      setCartItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        return [...prev, item];
      });
    }
  }, [fetchCart]);

  const removeFromCart = useCallback(async (productId: number) => {
    try {
      // Optimistic update
      setCartItems((prev) => prev.filter((i) => i.productId !== productId));
      
      // Note: Implement actual API call based on your backend
      // The current implementation doesn't have a remove endpoint
    } catch (err) {
      console.error('[v0] Error removing from cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove from cart');
    }
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    fetchCart,
  };
}

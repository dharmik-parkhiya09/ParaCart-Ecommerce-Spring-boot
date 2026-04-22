'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartApi } from './api';

export interface CartItem {
  cartId?: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart items on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('access_token');
        if (token) {
          const response = await cartApi.get('/api/cart');
          setItems(response.data.items || []);
        } else {
          // Load from localStorage if not authenticated
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            setItems(JSON.parse(savedCart));
          }
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await cartApi.post('/api/cart/add', {
          productId,
          quantity,
        });
        setItems(response.data.items || []);
      } else {
        // Add to localStorage cart
        const newItem: CartItem = {
          productId,
          quantity,
          productName: '',
          price: 0,
        };
        setItems((prev) => {
          const existing = prev.find((item) => item.productId === productId);
          if (existing) {
            return prev.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, newItem];
        });
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await cartApi.delete(`/api/cart/${productId}`);
        setItems(response.data.items || []);
      } else {
        setItems((prev) => prev.filter((item) => item.productId !== productId));
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await cartApi.put(`/api/cart/${productId}`, { quantity });
        setItems(response.data.items || []);
      } else {
        setItems((prev) =>
          prev.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await cartApi.delete('/api/cart');
      }
      setItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

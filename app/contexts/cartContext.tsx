'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ProductPrice {
  weight: string;
  amount: string;
}

export interface Product {
  id: string;
  image: string;
  discount: number;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  prices: ProductPrice[];
  videos?: string[];
  gallery?: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedWeight: string, quantity?: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getItemQuantity: (productId: string, weight: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('shopping-cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selectedWeight: string, quantity: number = 1) => {
    const selectedPrice = product.prices.find(p => p.weight === selectedWeight);
    if (!selectedPrice) return;

    const price = parseFloat(selectedPrice.amount);
    const cartItemKey = `${product.id}-${selectedWeight}`;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.productId === product.id && item.weight === selectedWeight
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id && item.weight === selectedWeight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, {
          productId: product.id,
          name: product.name,
          price,
          weight: selectedWeight,
          quantity,
          image: product.image,
        }];
      }
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.productId === productId && item.weight === weight)
    ));
  };

  const updateQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId && item.weight === weight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('shopping-cart');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (productId: string, weight: string) => {
    const item = cart.find(item => 
      item.productId === productId && item.weight === weight
    );
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
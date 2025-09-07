'use client';

import { Product } from '@/types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';


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
        toast.error('Failed to load saved cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selectedWeight: string, quantity: number = 1) => {
    const selectedPrice = product.priceOptions.find(p => p.unit === selectedWeight);
    if (!selectedPrice) {
      toast.error('Invalid weight selection');
      return;
    }

    const price = parseFloat(selectedPrice.price.toString());
    if (isNaN(price)) {
      toast.error('Invalid price format');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.productId === product._id && item.weight === selectedWeight
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        toast.success(`Updated ${product.name} (${selectedWeight}) quantity to ${newQuantity}`);
        
        return prevCart.map(item =>
          item.productId === product._id && item.weight === selectedWeight
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} (${selectedWeight}) to cart`, {id: 'add-to-cart'});
        
        return [...prevCart, {
          productId: product._id,
          name: product.name,
          price,
          weight: selectedWeight,
          quantity,
          image: product.photoUrls[0] || undefined,
        }];
      }
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    const itemToRemove = cart.find(item => 
      item.productId === productId && item.weight === weight
    );
    
    if (!itemToRemove) {
      toast.warning('Item not found in cart');
      return;
    }

    setCart(prevCart => prevCart.filter(item => 
      !(item.productId === productId && item.weight === weight)
    ));

    toast.info(`Removed ${itemToRemove.name} (${weight}) from cart`);
  };

  const updateQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }

    const existingItem = cart.find(item => 
      item.productId === productId && item.weight === weight
    );

    if (!existingItem) {
      toast.warning('Item not found in cart');
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId && item.weight === weight
          ? { ...item, quantity }
          : item
      )
    );

    toast.success(`Updated ${existingItem.name} (${weight}) quantity to ${quantity}`);
  };

  const clearCart = () => {
    const itemCount = getCartItemCount();
    if (itemCount === 0) {
      toast.info('Cart is already empty');
      return;
    }

    setCart([]);
    localStorage.removeItem('shopping-cart');
    toast.success(`Cleared ${itemCount} item${itemCount > 1 ? 's' : ''} from cart`);
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
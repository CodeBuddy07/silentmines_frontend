'use client';

import { Product, useCart } from '@/app/contexts/cartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface AddToBagButtonProps {
  product: Product;
  selectedWeight: string;
}

const AddToBagButton: React.FC<AddToBagButtonProps> = ({ product, selectedWeight }) => {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const currentQuantity = getItemQuantity(product.id, selectedWeight);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Add item to cart
    addToCart(product, selectedWeight, 1);
    
    // Show success animation
    setShowSuccess(true);
    
    // Reset states
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(false);
    }, 1500);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      updateQuantity(product.id, selectedWeight, 0);
    } else {
      updateQuantity(product.id, selectedWeight, newQuantity);
    }
  };

  // If item is in cart, show quantity controls
  if (currentQuantity > 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 bg-emerald-900/30 border border-emerald-500/40 rounded-lg p-2">
          <Button
            onClick={() => handleQuantityChange(currentQuantity - 1)}
            size="sm"
            className="w-8 h-8 p-0 bg-red-600/80 hover:bg-red-600 text-white border-0 rounded-md"
          >
            <Minus className="w-4 h-4" />
          </Button>
          
          <span className="text-emerald-400 font-semibold min-w-[2rem] text-center">
            {currentQuantity}
          </span>
          
          <Button
            onClick={() => handleQuantityChange(currentQuantity + 1)}
            size="sm"
            className="w-8 h-8 p-0 bg-emerald-600 hover:bg-emerald-500 text-white border-0 rounded-md"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-xs text-emerald-300">
          ${(product.prices.find(p => p.weight === selectedWeight)?.amount || '0')} / {selectedWeight}
        </div>
      </div>
    );
  }

  // Show add to bag button
  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`
        relative overflow-hidden w-full border-emerald-500/40 bg-emerald-900/20 
        hover:bg-emerald-600 text-white group cursor-pointer transition-all duration-300
        ${isAdding ? 'scale-95' : 'scale-100'}
        ${showSuccess ? 'bg-green-600 border-green-500' : ''}
      `}
    >
      <span className="absolute inset-0 bg-emerald-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
      
      <span className="relative z-10 px-4 py-2 flex justify-center items-center gap-2">
        {showSuccess ? (
          <>
            <Check size={16} className="animate-bounce" />
            Added to Bag!
          </>
        ) : isAdding ? (
          <>
            <ShoppingBag size={16} className="animate-pulse" />
            Adding...
          </>
        ) : (
          <>
            Add To Bag
            <ShoppingBag size={16} />
          </>
        )}
      </span>
    </Button>
  );
};

export default AddToBagButton;
'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/contexts/cartContext';
import OrderPopup from './OrderForm';


interface CartIconProps {
  className?: string;
  showText?: boolean;
}

export default function CartIcon({ className = "", showText = false }: CartIconProps) {
  const { getCartItemCount, getCartTotal } = useCart();
  
  const itemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  return (
    <OrderPopup>
      <Button 
        className={`relative bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-white ${className}`}
      >
        <ShoppingCart className="w-5 h-5" />
        
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {itemCount}
          </span>
        )}
        
        {showText && (
          <span className="ml-2">
            Cart {itemCount > 0 && `(${itemCount})`}
          </span>
        )}
      </Button>
    </OrderPopup>
  );
}
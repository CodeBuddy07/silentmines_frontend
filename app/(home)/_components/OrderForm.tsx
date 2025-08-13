'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Minus, ShoppingCart, Trash2, Clock, Phone, User } from 'lucide-react';
import { useCart } from '@/app/contexts/cartContext';


interface OrderFormData {
  pickupTime: string;
  phoneNumber: string;
}

interface OrderPopupProps {
  children: React.ReactNode;
}

export default function OrderPopup({ children }: OrderPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCart();
  
  const [formData, setFormData] = useState<OrderFormData>({
    pickupTime: '',
    phoneNumber: '',
  });

  // Generate today's pickup times from 12:00 PM to 10:00 PM
  const generatePickupTimes = () => {
    const times = [];
    const now = new Date();
    const currentHour = now.getHours();
    
    for (let hour = 12; hour <= 22; hour++) {
      // Skip past times
      if (hour <= currentHour) continue;
      
      const displayHour = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      const timeString = `TODAY ${displayHour}:00 ${period}`;
      times.push({
        value: `${hour}:00`,
        label: timeString,
      });
    }

    // Add tomorrow's times if today's times are limited
    if (times.length < 5) {
      for (let hour = 12; hour <= 18; hour++) {
        const displayHour = hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const timeString = `TOMORROW ${displayHour}:00 ${period}`;
        times.push({
          value: `tomorrow-${hour}:00`,
          label: timeString,
        });
      }
    }

    return times;
  };

  const pickupTimes = generatePickupTimes();

  const handleQuantityChange = (productId: string, weight: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, weight);
    } else {
      updateQuantity(productId, weight, newQuantity);
    }
  };

  const handleSubmit = async () => {
    // Validate form
    if (cart.length === 0) {
      alert('Please add items to your cart');
      return;
    }
    if (!formData.pickupTime) {
      alert('Please select a pickup time');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      alert('Please enter your phone number');
      return;
    }

    // Prepare order data
    const orderData = {
      cart: cart,
      total: getCartTotal(),
      pickupTime: formData.pickupTime,
      phoneNumber: formData.phoneNumber,
      orderDate: new Date().toISOString(),
      orderId: `ORDER-${Date.now()}`,
    };

    try {
      // Here you would typically send the order to your backend
      console.log('Order submitted:', orderData);
      
      // For now, just show success message
      alert(`Order submitted successfully!\n\nOrder ID: ${orderData.orderId}\nTotal: $${orderData.total.toFixed(2)}\nPickup: ${formData.pickupTime}\n\nYou will receive a confirmation on Signal.`);
      
      // Reset form and close dialog
      setFormData({
        pickupTime: '',
        phoneNumber: '',
      });
      clearCart();
      setIsOpen(false);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    }
  };

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const cartItemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border-emerald-500/30 text-white shadow-2xl shadow-emerald-500/20">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-white">
              Place Your Order
            </DialogTitle>
            {cartItemCount > 0 && (
              <div className="flex items-center gap-2 bg-emerald-600/20 px-3 py-1 rounded-full">
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-semibold">
                  {cartItemCount} items • ${cartTotal.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Cart Items Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-emerald-300">
                Your Cart ({cartItemCount} items)
              </Label>
              {cart.length > 0 && (
                <Button
                  type="button"
                  size="sm"
                  onClick={clearCart}
                  className="text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/30"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear Cart
                </Button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Your cart is empty</p>
                <p className="text-sm">Add some items to get started!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/30">
                {cart.map((item) => (
                  <div
                    key={`${item.productId}-${item.weight}`}
                    className="flex items-center gap-3 p-3 bg-emerald-800/20 rounded-lg"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-emerald-200/70">
                        <span>Weight: {item.weight}</span>
                        <span>•</span>
                        <span>${item.price.toFixed(2)} each</span>
                      </div>
                      <p className="text-emerald-400 font-semibold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleQuantityChange(item.productId, item.weight, item.quantity - 1)}
                        className="w-8 h-8 p-0 bg-red-600/80 hover:bg-red-600 text-white border-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="w-8 text-center text-emerald-400 font-semibold">
                        {item.quantity}
                      </span>
                      
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleQuantityChange(item.productId, item.weight, item.quantity + 1)}
                        className="w-8 h-8 p-0 bg-emerald-600 hover:bg-emerald-500 text-white border-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        onClick={() => removeFromCart(item.productId, item.weight)}
                        className="w-8 h-8 p-0 ml-2 bg-red-600/60 hover:bg-red-600 text-white border-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="bg-emerald-600/10 p-4 rounded-lg border border-emerald-500/30">
                <h4 className="font-semibold text-emerald-400 mb-2">Order Summary</h4>
                <div className="space-y-1">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.weight}`} className="flex justify-between text-sm">
                      <span className="text-emerald-200/80">
                        {item.name} ({item.weight}) × {item.quantity}
                      </span>
                      <span className="text-emerald-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-emerald-500/30 mt-2 pt-2">
                  <div className="flex justify-between font-semibold text-emerald-400">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pickup Time Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-emerald-300 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Choose your pickup time:
            </Label>
            <div className="bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/30">
              <RadioGroup
                value={formData.pickupTime}
                onValueChange={(value) => handleInputChange('pickupTime', value)}
                className="max-h-48 overflow-y-auto space-y-3"
                required
              >
                {pickupTimes.map((time) => (
                  <div key={time.value} className="flex items-center space-x-3 p-2 rounded-md hover:bg-emerald-800/20 transition-colors">
                    <RadioGroupItem 
                      value={time.value} 
                      id={time.value}
                      className="border-emerald-500/60 text-emerald-400 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-400" 
                    />
                    <Label 
                      htmlFor={time.value} 
                      className="text-sm cursor-pointer flex-1 text-white hover:text-emerald-300 transition-colors"
                    >
                      {time.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-emerald-300 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Signal Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="bg-emerald-900/20 border-emerald-500/40 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/30"
              required
            />
            <p className="text-xs text-emerald-200/70">
              We'll send your order confirmation via Signal
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={cart.length === 0}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Order • ${cartTotal.toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
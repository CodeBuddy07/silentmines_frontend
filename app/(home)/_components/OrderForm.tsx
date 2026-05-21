'use client';

import { useEffect, useState } from 'react';
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
import { Plus, Minus, ShoppingCart, Trash2, Clock, Phone, User, NotebookPen } from 'lucide-react';
import { useCart } from '@/app/contexts/cartContext';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { TimeSlot } from '@/types';
import useAxios from '@/hooks/useAxios';
import { toast } from 'sonner';
import Image from 'next/image';
import ReviewModal from '@/components/shared/ReviewModal';

interface OrderFormData {
  pickupDate: 'today' | 'tomorrow';
  pickupTime: string;
  phoneNumber: string;
  orderNotes: string;
}

interface OrderPopupProps {
  children: React.ReactNode;
}

export default function OrderPopup({ children }: OrderPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCart();

  const [formData, setFormData] = useState<OrderFormData>({
    pickupDate: 'today',
    pickupTime: '',
    phoneNumber: '',
    orderNotes: '',
  });

  const [todayTimeSlots, setTodayTimeSlots] = useState<TimeSlot[]>([]);
  const [tomorrowTimeSlots, setTomorrowTimeSlots] = useState<TimeSlot[]>([]);

  const getTodayTimeSlot = async () => {
    const res = await useAxios.get(`/timeslot/today`);
    setTodayTimeSlots(res.data);
  }

  const getTomorrowTimeSlot = async () => {
    const res = await useAxios.get(`/timeslot/tomorrow`);
    setTomorrowTimeSlots(res.data);
  }

  useEffect(() => {
    getTodayTimeSlot();
    getTomorrowTimeSlot();
  }, []);

  const getTimesForSelectedDay = () => {
    // Select times based on the selected day
    const selectedTimeSlots = formData.pickupDate === 'today' ? todayTimeSlots : tomorrowTimeSlots;

    // Filter out unavailable slots
    return selectedTimeSlots.filter(slot => slot.isAvailable).map(slot => ({
      value: slot.time,  // Creating a value based on day and time
      label: slot.time, // Showing time label from backend data
    }));
  };

  const handleQuantityChange = (productId: string, weight: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, weight);
    } else {
      updateQuantity(productId, weight, newQuantity);
    }
  };

  // function formatDateTime(dateString: string) {
  //   const [day, time] = dateString.split('-'); // Split the input string into 'today/tomorrow' and time

  //   // Get the current date
  //   const now = new Date();

  //   // Initialize target date as today
  //   let targetDate = new Date(now);

  //   // If it's tomorrow, add one day
  //   if (day === 'tomorrow') {
  //     targetDate.setDate(now.getDate() + 1);
  //   }

  //   // Extract hours and minutes from the time string (e.g., '0800' -> hours = 8, minutes = 0)
  //   const hours = parseInt(time.slice(0, 2), 10);
  //   const minutes = parseInt(time.slice(2, 4), 10);

  //   // Set the hours and minutes for the target date
  //   targetDate.setHours(hours);
  //   targetDate.setMinutes(minutes);
  //   targetDate.setSeconds(0); // Optionally reset seconds to 0

  //   // Format the time to 12-hour format with AM/PM
  //   const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  //   const formattedTime = new Intl.DateTimeFormat('en-US', options).format(targetDate);

  //   // Return the final formatted string
  //   if (day === 'today') {
  //     return `Today at ${formattedTime}`;
  //   } else if (day === 'tomorrow') {
  //     return `Tomorrow at ${formattedTime}`;
  //   }
  //   return '';
  // }

  const handleSubmit = async () => {
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
      orderNotes: formData.orderNotes,
      orderDate: new Date().toISOString(),
      orderId: `ORDER-${Date.now()}`,
      cartItems: cart.map(item => ({
        name: item.name,
        weight: item.weight,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      setLoading(true);
      // Call the API route to send the order email
      const response = await fetch('/api/sendOrderEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderData }),
      });

      if (response.ok) {
        setLoading(false);
        toast.success(`Order submitted successfully!`);
        setFormData({
          pickupDate: 'today',
          pickupTime: '',
          phoneNumber: '',
          orderNotes: '',
        });
        clearCart();
        setIsOpen(false);
        setShowReviewModal(true);
      } else {
        setLoading(false);
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error submitting order:', error);
      toast.error('There was an error submitting your order. Please try again.');
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
    <>
    <ReviewModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} />
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="w-[96vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:max-w-2xl h-[80vh] p-0 overflow-y-auto bg-black/90 backdrop-blur-xl border-emerald-500/30 text-white shadow-2xl shadow-emerald-500/20 mx-2 sm:mx-4">
        <div className="flex flex-col h-full">
          <DialogHeader className="flex-shrink-0 p-3 sm:p-4 md:p-6 border-b border-emerald-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold text-white">
                Place Your Order
              </DialogTitle>
              {cartItemCount > 0 && (
                <div className="flex items-center gap-1 sm:gap-2 bg-emerald-600/20 px-2 sm:px-3 py-1 rounded-full">
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-emerald-400 font-semibold whitespace-nowrap">
                    {cartItemCount} items • ${cartTotal.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Cart Items Section */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label className="text-xs sm:text-sm font-medium text-emerald-300">
                    Your Cart ({cartItemCount} items)
                  </Label>
                  {cart.length > 0 && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={clearCart}
                      className="text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/30 h-6 sm:h-7 px-2 w-fit self-start sm:self-auto"
                    >
                      <Trash2 className="md:w-3 md:h-3 w-1 h-1 mr-1" />
                      <span className="hidden xs:inline sm:hidden md:inline">Clear Cart</span>
                      <span className="xs:hidden sm:inline md:hidden">Clear</span>
                    </Button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-4 sm:py-6 md:py-8 text-gray-400">
                    <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-xs sm:text-sm md:text-base">Your cart is empty</p>
                    <p className="text-xs sm:text-sm">Add some items to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-1 sm:space-y-2 md:space-y-3 max-h-40 sm:max-h-48 md:max-h-64 overflow-y-auto bg-emerald-900/10 p-2 sm:p-3 md:p-4 rounded-lg border border-emerald-500/30">
                    {cart.map((item) => (
                      <div
                        key={`${item.productId}-${item.weight}`}
                        className="flex items-center gap-1 sm:gap-2 md:gap-3 p-1.5 sm:p-2 md:p-3 bg-emerald-800/20 rounded-lg"
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover flex-shrink-0"
                          />
                        )}

                        <div className="flex-1 min-w-0 overflow-hidden">
                          <h4 className="font-medium text-white text-xs sm:text-sm md:text-base truncate">{item.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-emerald-200/70">
                            <span className="truncate">Weight: {item.weight}</span>
                            <span className="flex-shrink-0">•</span>
                            <span className="flex-shrink-0">${item.price.toFixed(2)} each</span>
                          </div>
                          <p className="text-emerald-400 font-semibold text-xs sm:text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.weight, item.quantity - 1)}
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 p-0 bg-red-600/80 hover:bg-red-600 text-white border-0"
                          >
                            <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                          </Button>

                          <span className="w-4 sm:w-6 md:w-8 text-center text-emerald-400 font-semibold text-xs sm:text-sm">
                            {item.quantity}
                          </span>

                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleQuantityChange(item.productId, item.weight, item.quantity + 1)}
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 p-0 bg-emerald-600 hover:bg-emerald-500 text-white border-0"
                          >
                            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            onClick={() => removeFromCart(item.productId, item.weight)}
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 p-0 ml-0.5 sm:ml-1 md:ml-2 bg-red-600/60 hover:bg-red-600 text-white border-0"
                          >
                            <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="bg-emerald-600/10 p-2 sm:p-3 md:p-4 rounded-lg border border-emerald-500/30">
                  <h4 className="font-semibold text-emerald-400 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Order Summary</h4>
                  <div className="space-y-0.5 sm:space-y-1">
                    {cart.map((item) => (
                      <div key={`${item.productId}-${item.weight}`} className="flex justify-between text-xs gap-2">
                        <span className="text-emerald-200/80 truncate flex-1 text-xs sm:text-sm">
                          {item.name} ({item.weight}) × {item.quantity}
                        </span>
                        <span className="text-emerald-400 flex-shrink-0 text-xs sm:text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-emerald-500/30 mt-1 sm:mt-2 pt-1 sm:pt-2">
                    <div className="flex justify-between font-semibold text-emerald-400 text-xs sm:text-sm md:text-base">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pickup Time Selection */}
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-xs sm:text-sm font-medium text-emerald-300 flex items-center gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                Choose your pickup time:
              </Label>

              <div className="bg-emerald-900/10 p-2 sm:p-3 md:p-4 rounded-lg border border-emerald-500/30">
                {/* Day Selection Buttons */}
                <div className="flex gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange('pickupDate', 'today')}
                    className={`flex-1 px-2 sm:px-3 md:px-6 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm rounded-md border transition-all ${formData.pickupDate === 'today'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'border-emerald-500/30 text-white hover:border-emerald-400 hover:text-emerald-300'
                      }`}
                  >
                    TODAY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('pickupDate', 'tomorrow')}
                    className={`flex-1 px-2 sm:px-3 md:px-6 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm rounded-md border transition-all ${formData.pickupDate === 'tomorrow'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'border-emerald-500/30 text-white hover:border-emerald-400 hover:text-emerald-300'
                      }`}
                  >
                    TOMORROW
                  </button>
                </div>

                {/* Time Grid - Ultra Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 md:gap-3">
                  {getTimesForSelectedDay().map((time) => (
                    <button
                      key={time.value}
                      type="button"
                      onClick={() => handleInputChange('pickupTime', time.value)}
                      className={`relative px-1 sm:px-2 md:px-4 py-1.5 sm:py-2 rounded-md border transition-all text-xs sm:text-sm font-medium ${formData.pickupTime === time.value
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'border-emerald-500/30 text-white hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-800/10'
                        }`}
                    >
                      {/* Green dot indicator for selected item */}
                      {formData.pickupTime === time.value && (
                        <div className="absolute left-1 sm:left-1.5 md:left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full"></div>
                      )}
                      <span className={`${formData.pickupTime === time.value ? 'ml-2 sm:ml-3 md:ml-4' : ''} truncate block`}>
                        {time.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="notes" className="text-xs sm:text-sm font-medium text-emerald-300 flex items-center gap-2">
                <NotebookPen className="w-3 h-3 sm:w-4 sm:h-4" />
                Order Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or requests?"
                value={formData.orderNotes}
                onChange={(e) => handleInputChange('orderNotes', e.target.value)}
                className="bg-emerald-900/20 border-emerald-500/40 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/30 min-h-[60px] sm:min-h-[80px] text-xs sm:text-sm"
                rows={2}
              />
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
                className="bg-emerald-900/20 border-emerald-500/40 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/30 text-xs sm:text-sm"
                required
              />
              <p className="text-xs text-emerald-200/70 mt-1">
                We'll send your order confirmation and parking instructions via Signal.
              </p>
            </div>
          </div>

          {/* Submit Button - Fixed at bottom */}
          <div className="flex-shrink-0 p-3 sm:p-4 md:p-6 border-t border-emerald-500/20">
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <Button
                onClick={handleSubmit}
                disabled={cart.length === 0}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 min-h-[36px] sm:min-h-[40px]"
              >
                <span className="truncate">{loading ? "Submitting..." : "Submit Order"}</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

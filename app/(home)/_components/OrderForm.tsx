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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface OrderFormData {
  order: string;
  pickupTime: string;
  phoneNumber: string;
}

interface OrderPopupProps {
  children: React.ReactNode;
}

export default function OrderPopup({ children }: OrderPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    order: '',
    pickupTime: '',
    phoneNumber: '',
  });

  // Generate today's pickup times from 12:00 PM to 10:00 PM
  const generatePickupTimes = () => {
    const times = [];
    for (let hour = 12; hour <= 22; hour++) {
      const displayHour = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      const timeString = `TODAY ${displayHour}:00 ${period}`;
      times.push({
        value: `${hour}:00`,
        label: timeString,
      });
    }
    return times;
  };

  const pickupTimes = generatePickupTimes();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.order.trim()) {
      alert('Please enter your order');
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

    // Handle form submission here
    console.log('Order submitted:', formData);
    
    // Reset form and close dialog
    setFormData({
      order: '',
      pickupTime: '',
      phoneNumber: '',
    });
    setIsOpen(false);
    
    // You can add your order processing logic here
    alert('Order submitted successfully! You will receive a confirmation on Signal.');
  };

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md max-h-full overflow-y-auto bg-black/80 backdrop-blur-xl border-emerald-500/30 text-white shadow-2xl shadow-emerald-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Place Your Order
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Input */}
          <div className="space-y-2">
            <Label htmlFor="order" className="text-sm font-medium text-emerald-300">
              What can I get you?
            </Label>
            <Textarea
              id="order"
              placeholder="Tell us what you'd like to order..."
              value={formData.order}
              onChange={(e) => handleInputChange('order', e.target.value)}
              className="min-h-[100px] resize-none bg-emerald-900/20 border-emerald-500/40 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/30"
              required
            />
          </div>

          {/* Pickup Time Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-emerald-300">
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
            <Label htmlFor="phone" className="text-sm font-medium text-emerald-300">
              Please enter your Signal phone number for order confirmation:
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
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="outline"
              className="flex-1 border-emerald-500/50 hover:bg-emerald-900 bg-emerald-900/30 text-white hover:text-white hover:border-emerald-400"
            >
              Submit Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
'use client';

import { useState } from 'react';
import { Star, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAxios from '@/hooks/useAxios';
import { toast } from 'sonner';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReviewFormData {
  name: string;
  rating: number;
  review: string;
  image?: File | null;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [step, setStep] = useState<'prompt' | 'form' | 'done'>('prompt');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    rating: 0,
    review: '',
    image: null,
  });

  const handleClose = () => {
    setStep('prompt');
    setFormData({ name: '', rating: 0, review: '', image: null });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.review || formData.rating === 0) return;
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append('clientName', formData.name);
      fd.append('rating', formData.rating.toString());
      fd.append('description', formData.review);
      fd.append('date', new Date().toISOString());
      if (formData.image) fd.append('image', formData.image);

      await useAxios.post('/review/submit', fd);
      setStep('done');
      toast.success('Review submitted! It will appear after approval.');
    } catch (error) {
      toast.error((error as any).response?.data?.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-emerald-500/30 rounded-xl w-full max-w-md shadow-2xl shadow-emerald-500/20 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            {step === 'prompt' && '🎉 Order Confirmed!'}
            {step === 'form' && 'Write a Review'}
            {step === 'done' && 'Thank You!'}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {/* Prompt step */}
          {step === 'prompt' && (
            <div className="space-y-5">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-lg mb-1">Your order is on its way!</p>
                  <p className="text-gray-400 text-sm">
                    We'll reach out via Signal with your confirmation and parking instructions.
                  </p>
                </div>
              </div>

              {/* Signal IMPORTANT notice */}
              <div className="p-4 bg-red-950/70 border-2 border-red-500/80 rounded-xl">
                <p className="text-sm leading-relaxed text-white">
                  <span className="text-red-500 font-bold text-base">⚠ IMPORTANT:</span>
                  <br />
                  You MUST download the Signal app (
                  <a href="https://signal.org/download/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-medium">
                    signal.org
                  </a>
                  ) and make sure your Signal app privacy settings allow others to{' '}
                  <span className="font-semibold text-yellow-300">Find You by Phone Number</span>.
                  This setting can be enabled during Signal app setup or later inside the Signal app&apos;s{' '}
                  <span className="font-semibold text-yellow-300">Settings &gt; Privacy</span> section.
                  If this setting is turned off, we will be unable to contact you, and you will{' '}
                  <span className="font-bold text-red-400">NOT</span> receive your order confirmation or parking instructions.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-green-600"
                >
                  Maybe Later
                </Button>
                <Button
                  onClick={() => setStep('form')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Leave a Review
                </Button>
              </div>
            </div>
          )}

          {/* Review form step */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, rating: star }))}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= formData.rating
                            ? 'fill-emerald-500 text-emerald-500'
                            : 'fill-gray-600 text-gray-600 hover:text-emerald-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Your Review *</label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData((p) => ({ ...p, review: e.target.value }))}
                  required
                  rows={4}
                  placeholder="Share your experience…"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Profile Image <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData((p) => ({ ...p, image: e.target.files?.[0] || null }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('prompt')}
                  className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-green-600"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.review || formData.rating === 0}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Review'}
                </Button>
              </div>
            </form>
          )}

          {/* Done step */}
          {step === 'done' && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <p className="text-white font-medium text-lg mb-1">Review Submitted!</p>
                <p className="text-gray-400 text-sm">
                  Thank you for your feedback. Your review will be visible after approval.
                </p>
              </div>
              <Button onClick={handleClose} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white">
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

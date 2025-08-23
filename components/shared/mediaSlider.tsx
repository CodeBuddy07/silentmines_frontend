"use client";

import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import React, { useState } from 'react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface MediaSliderProps {
  media: MediaItem[];
  alt?: string;
  discount?: number;
  className?: string;
}

const MediaSlider: React.FC<MediaSliderProps> = ({ 
  media, 
  alt = "Media", 
  discount, 
  className = "" 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);
  };

  if (!media || media.length === 0) {
    return (
      <div className={`aspect-square bg-emerald-900/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl flex items-center justify-center ${className}`}>
        <span className="text-gray-500">No media available</span>
      </div>
    );
  }

  return (
    <div className={`space-y-2 sm:space-y-4 ${className}`}>
      {/* Main Media Display */}
      <div className="relative aspect-square bg-emerald-900/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20">
        {/* Discount Badge */}
        {discount && discount > 0 && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 bg-emerald-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
            {discount}% OFF
          </div>
        )}

        {/* Navigation Buttons */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/50 backdrop-blur-sm border border-emerald-500/40 hover:bg-black/70 transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/50 backdrop-blur-sm border border-emerald-500/40 hover:bg-black/70 transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </>
        )}

        {/* Media Content */}
        <div className="w-full h-full">
          {media[currentSlide]?.type === 'video' ? (
            <div className="relative w-full h-full">
              <video
                src={media[currentSlide].src}
                className="w-full h-full object-cover"
                controls={true}
                muted
                loop
                autoPlay
                controlsList='nodownload'
                playsInline
              />
            </div>
          ) : (
            <img
              src={media[currentSlide]?.src}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Slide Indicators */}
        {media.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${index === currentSlide
                  ? 'bg-emerald-500 w-4 sm:w-6'
                  : 'bg-white/50 hover:bg-white/70'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip - Hidden on mobile, visible on sm+ */}
      {media.length > 1 && (
        <div className="hidden sm:flex flex-wrap gap-2 overflow-x-auto pb-2">
          {media.map((mediaItem, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentSlide
                ? 'border-emerald-500 shadow-lg shadow-emerald-500/30'
                : 'border-emerald-500/30 hover:border-emerald-400/60'
                }`}
            >
              {mediaItem.type === 'video' ? (
                <div className="relative w-full h-full bg-emerald-900/20">
                  <video src={mediaItem.src} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={mediaItem.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaSlider;
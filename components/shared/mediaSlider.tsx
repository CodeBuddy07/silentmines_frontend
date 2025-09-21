"use client";

import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; // Importing the Next.js Image component

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [controlsVisible, setControlsVisible] = useState(true);  // Track visibility of controls
  let timeout: ReturnType<typeof setTimeout>;

  const handleActivity = () => {
    setControlsVisible(true); // Show controls on activity
    clearTimeout(timeout); // Clear previous timeout

    timeout = setTimeout(() => {
      setControlsVisible(false); // Hide controls after 0.25 seconds of inactivity
    }, 900); // 0.25 seconds of inactivity
  };

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = e.targetTouches[0].clientX;
    const distance = touchStart - currentTouch;
    setDragDistance(distance);
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragDistance(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    setDragDistance(0);
  };

  // Mouse events for desktop drag support
  const onMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!touchStart || !isDragging) return;

    const distance = touchStart - e.clientX;
    setDragDistance(distance);
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragDistance(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    setDragDistance(0);
  };

  // Prevent context menu on long press
  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearTimeout(timeout); // Clear timeout on component unmount
    };
  }, []);

  if (!media || media.length === 0) {
    return (
      <div className={`aspect-square bg-emerald-900/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl flex items-center justify-center ${className}`}>
        <span className="text-gray-500">No media available</span>
      </div>
    );
  }

  return (
    <div className={`space-y-3 sm:space-y-4 ${className}`}>
      {/* Main Media Display */}
      <div
        ref={sliderRef}
        className="relative aspect-square bg-gradient-to-br from-emerald-950/20 to-emerald-900/30 backdrop-blur-xl border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 cursor-grab active:cursor-grabbing select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onContextMenu={onContextMenu}
      >
        {/* Discount Badge
        {discount && discount > 0 && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-emerald-500/40 backdrop-blur-sm border border-emerald-400/30">
            <span className="drop-shadow-sm">{discount}% OFF</span>
          </div>
        )} */}

        {/* Navigation Buttons */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:border-emerald-400/50 transition-all duration-200 shadow-lg group"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-emerald-400 transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:border-emerald-400/50 transition-all duration-200 shadow-lg group"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-emerald-400 transition-colors" />
            </button>
          </>
        )}

        {/* Media Content */}
        <div
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: isDragging ? `translateX(-${dragDistance * 0.3}px)` : 'translateX(0)',
          }}
        >
          {media[currentSlide]?.type === 'video' ? (
            <div className="relative w-full h-full">
              <video
                src={media[currentSlide].src.replace('http://148.230.85.23:5000', 'https://server.greenlove.fun')}
                className="w-full h-full object-cover"
                controls={controlsVisible} // Toggle controls visibility based on state
                muted
                loop
                autoPlay
                controlsList="nodownload"
                playsInline
                onTouchStart={(e) => e.stopPropagation()}  // Prevent touch events from triggering
              />
            </div>
          ) : (
            <div className="w-full h-full">
              <Image
                src={media[currentSlide]?.src}
                alt={alt}
                layout="fill" // Makes sure the image fills the container
                objectFit="cover" // Ensures the image covers the area without distortion
                loading="lazy"
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Slide Indicators */}
        {media.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-emerald-400 w-6 sm:w-8 h-2'
                  : 'bg-white/40 hover:bg-white/60 w-2 h-2'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip - Visible on all screen sizes */}
      {media.length > 1 && (
        <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {media.map((mediaItem, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${index === currentSlide
                ? 'border-emerald-400 shadow-lg shadow-emerald-400/30 ring-2 ring-emerald-400/20'
                : 'border-emerald-500/20 hover:border-emerald-400/40 shadow-md'
                }`}
            >
              {mediaItem.type === 'video' ? (
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-950/40 to-emerald-900/60">
                  <video src={mediaItem.src.replace('http://148.230.85.23:5000', 'https://server.greenlove.fun')} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 sm:p-1.5 lg:p-2 shadow-lg">
                      <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-emerald-600 fill-emerald-600" />
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={mediaItem.src}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill" // Use layout to make the image fill the space
                  objectFit="cover"
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

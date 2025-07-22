"use client";

import { ChevronLeft, ChevronRight, Star, Heart, Share2, Play, Pause } from 'lucide-react';
import React, { use, useState } from 'react';
import { PremiumSelectedFlower } from '../../_components/premiumSelectedFlower';


interface ProductPrice {
  weight: string;
  amount: string;
}

interface Product {
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


interface ProductPageProps {
  params: { id: string };
}


const Page = ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  
  const  {id}  = use(params);

  const sampleProduct: Product = {
    id: id,
    image: "/demo_product-2.png",
    discount: 75,
    category: "LICENSED INDOORS",
    subcategory: "DAILY SPECIAL",
    name: "LEMON BUBBLEGUM 🍋⚡",
    description: "Premium quality Lemon Bubblegum strain with an demo exceptional citrusy flavor profile and energizing effects. This licensed indoor cultivation ensures consistent quality and purity. Perfect for daytime use with its uplifting and creative properties. Limited time offer with 75% discount - don't miss out on this amazing deal!",
    prices: [
      { weight: "1 LB", amount: "750" },
      { weight: "2 LB", amount: "1400" },
      { weight: "3 LB", amount: "2000" }
    ],
    videos: [
      "/original.mov",
      "https://sample-videos.com/zip/10/mp4/360/sample2.mp4"
    ],
    gallery: [
      "/demo_product-2.png",
      "/demo_product-3.png",
      "/demo_product-4.png",
      "/demo_product-5.png"
    ]
  };





  const [product, setProduct] = useState<Product>(sampleProduct);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState<string>(sampleProduct.prices[0].weight);

  // Get current price based on selected weight
  const currentPrice = product.prices.find(p => p.weight === selectedWeight)?.amount || product.prices[0].amount;

  // Combine all media (images and videos)
  const allMedia = [
    ...(product.gallery || [product.image]).map(img => ({ type: 'image', src: img })),
    ...(product.videos || []).map(vid => ({ type: 'video', src: vid }))
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allMedia.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };



  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className='w-full max-h-72 overflow-hidden rounded-xl flex items-center justify-center mb-8 '>
        <img className='w-full' src="/detailpage.avif" alt="" />

      </div>
      <div className="max-w-6xl mx-auto mt-20">
        {/* Header */}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Media Showcase - Left Side */}
          <div className="space-y-4">
            {/* Main Media Display */}
            <div className="relative aspect-square bg-emerald-900/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/20">
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 z-20 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {product.discount}% OFF
                </div>
              )}

              {/* Navigation Buttons */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-emerald-500/40 hover:bg-black/70 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-emerald-500/40 hover:bg-black/70 transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}

              {/* Media Content */}
              <div className="w-full h-full">
                {allMedia[currentSlide]?.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      src={allMedia[currentSlide].src}
                      className="w-full h-full object-cover"
                      controls={true}
                      muted
                      loop
                      autoPlay
                      controlsList='nodownload'
                    />

                  </div>
                ) : (
                  <img
                    src={allMedia[currentSlide]?.src || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Slide Indicators */}
              {allMedia.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {allMedia.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                        ? 'bg-emerald-500 w-6'
                        : 'bg-white/50 hover:bg-white/70'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {allMedia.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentSlide
                      ? 'border-emerald-500 shadow-lg shadow-emerald-500/30'
                      : 'border-emerald-500/30 hover:border-emerald-400/60'
                      }`}
                  >
                    {media.type === 'video' ? (
                      <div className="relative w-full h-full bg-emerald-900/20">
                        <video src={media.src} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={media.src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Right Side */}
          <div className="space-y-8">
            {/* Rating */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-emerald-400 mb-1">
                <span>{product.category}</span>
                <span className="text-emerald-600">•</span>
                <span>{product.subcategory}</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{product.name}</h1>
            </div>

            {/* Current Price Display */}
            <div className="p-4 bg-emerald-900/20 backdrop-blur-xl border border-emerald-500/40 rounded-2xl">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-emerald-400">${currentPrice}</span>
                {product.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through">${Math.round(parseInt(currentPrice) * (1 + product.discount / 100))}</span>
                    <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {product.discount}% OFF
                    </span>
                  </div>
                )}
              </div>
              <p className="text-emerald-200 mt-2 text-sm">Price for {selectedWeight}</p>
            </div>

            {/* Weight Selection */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-emerald-300">Select Weight</h3>
              <div className="flex justify-start items-center gap-3">
                {product.prices.map((price) => (
                  <button
                    key={price.weight}
                    onClick={() => setSelectedWeight(price.weight)}
                    className={`p-2 rounded-full border-2 transition-all text-left ${selectedWeight === price.weight
                      ? 'border-emerald-500 bg-emerald-900/40 shadow-lg shadow-emerald-500/20'
                      : 'border-emerald-500/30 bg-emerald-900/10 hover:border-emerald-400/60 hover:bg-emerald-800/20'
                      }`}
                  >
                    <div className="flex items-center justify-between ">
                      <span className="font-medium text-sm text-white">{price.weight}</span>

                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Description */}
            <div className="p-6 bg-emerald-900/10 backdrop-blur-xl border border-emerald-500/30 rounded-xl">
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">About This Product</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-emerald-500/20">
                <div>
                  <span className="text-emerald-400 text-sm font-medium">Category</span>
                  <p className="text-white font-semibold mt-1">{product.category}</p>
                </div>
                <div>
                  <span className="text-emerald-400 text-sm font-medium">Special Offer</span>
                  <p className="text-white font-semibold mt-1">{product.subcategory}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-900/10 border border-emerald-500/30 rounded-xl text-center">
                <div className="text-2xl font-bold text-emerald-400">Licensed</div>
                <div className="text-sm text-gray-400">Indoor Grown</div>
              </div>
              <div className="p-4 bg-emerald-900/10 border border-emerald-500/30 rounded-xl text-center">
                <div className="text-2xl font-bold text-emerald-400">Premium</div>
                <div className="text-sm text-gray-400">Quality Grade</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PremiumSelectedFlower />
    </div>
  );
}

export default Page;
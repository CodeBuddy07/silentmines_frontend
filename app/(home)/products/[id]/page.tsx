"use client";

import { ShoppingBag } from 'lucide-react';
import React, { use, useState } from 'react';
import { PremiumSelectedFlower } from '../../_components/premiumSelectedFlower';
import { Button } from '@/components/ui/button';
import { Product, useCart } from '@/app/contexts/cartContext';
import OrderPopup from '../../_components/OrderForm';
import AddToBagButton from '../../_components/addToBagButton';
import MediaSlider from '@/components/shared/mediaSlider';

const Page = ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  const { id } = use(params);
  const { getCartItemCount } = useCart();

  const sampleProduct: Product = {
    id: id,
    image: "/demo_product-2.png",
    discount: 75,
    category: "LICENSED INDOORS",
    subcategory: "DAILY SPECIAL",
    name: "LEMON BUBBLEGUM 🍋⚡",
    description: "Premium quality Lemon Bubblegum strain with an exceptional citrusy flavor profile and energizing effects. This licensed indoor cultivation ensures consistent quality and purity. Perfect for daytime use with its uplifting and creative properties. Limited time offer with 75% discount - don't miss out on this amazing deal!",
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
  const [selectedWeight, setSelectedWeight] = useState<string>(sampleProduct.prices[0].weight);

  // Get current price based on selected weight
  const currentPrice = product.prices.find(p => p.weight === selectedWeight)?.amount || product.prices[0].amount;

  // Combine all media (images and videos) for the MediaSlider
  const allMedia = [
    ...(product.gallery || [product.image]).map(img => ({ type: 'image' as const, src: img })),
    ...(product.videos || []).map(vid => ({ type: 'video' as const, src: vid }))
  ];

  const cartItemCount = getCartItemCount();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <OrderPopup>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 sm:p-4 shadow-lg shadow-emerald-500/30 relative">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">
                {cartItemCount}
              </span>
            </Button>
          </OrderPopup>
        </div>
      )}

      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Media Showcase - Left Side */}
          <div className="w-full">
            <MediaSlider
              media={allMedia}
              alt={product.name}
              discount={product.discount}
              className="w-full"
            />
          </div>

          {/* Product Info - Right Side */}
          <div className="space-y-6 sm:space-y-8">
            {/* Product Title & Category */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-emerald-400 mb-2">
                <span>{product.category}</span>
                <span className="text-emerald-600">•</span>
                <span>{product.subcategory}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Current Price Display */}
            <div className="p-4 sm:p-6 bg-emerald-900/20 backdrop-blur-xl border border-emerald-500/40 rounded-xl sm:rounded-2xl">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400">
                  ${currentPrice}
                </span>
                {product.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      ${Math.round(parseInt(currentPrice) * (1 + product.discount / 100))}
                    </span>
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

              {/* Mobile: Stacked Layout */}
              <div className="sm:hidden space-y-3">
                <div className="flex flex-wrap gap-2">
                  {product.prices.map((price) => (
                    <button
                      key={price.weight}
                      onClick={() => setSelectedWeight(price.weight)}
                      className={`flex-1 min-w-[80px] p-3 rounded-lg border-2 transition-all text-center ${selectedWeight === price.weight
                        ? 'border-emerald-500 bg-emerald-900/40 shadow-lg shadow-emerald-500/20'
                        : 'border-emerald-500/30 bg-emerald-900/10 hover:border-emerald-400/60 hover:bg-emerald-800/20'
                        }`}
                    >
                      <span className="font-medium text-sm text-white">{price.weight}</span>
                    </button>
                  ))}
                </div>
                <div className="w-full">
                  <AddToBagButton
                    product={product}
                    selectedWeight={selectedWeight}
                  />
                </div>
              </div>

              {/* Desktop: Side-by-side Layout */}
              <div className="hidden sm:flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  {product.prices.map((price) => (
                    <button
                      key={price.weight}
                      onClick={() => setSelectedWeight(price.weight)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${selectedWeight === price.weight
                        ? 'border-emerald-500 bg-emerald-900/40 shadow-lg shadow-emerald-500/20'
                        : 'border-emerald-500/30 bg-emerald-900/10 hover:border-emerald-400/60 hover:bg-emerald-800/20'
                        }`}
                    >
                      <span className="font-medium text-sm text-white">{price.weight}</span>
                    </button>
                  ))}
                </div>

                <div className="flex-1 max-w-xs">
                  <AddToBagButton
                    product={product}
                    selectedWeight={selectedWeight}
                  />
                </div>
              </div>
            </div>

            {/* Order Button for existing cart items */}
            {cartItemCount > 0 && (
              <div className="p-4 sm:p-6 bg-emerald-600/10 border border-emerald-500/40 rounded-xl sm:rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-emerald-300 text-sm">Items in cart: {cartItemCount}</p>
                    <p className="text-white font-semibold">Ready to order?</p>
                  </div>
                  <OrderPopup>
                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-emerald-500/30 w-full sm:w-auto">
                      View Cart & Order
                    </Button>
                  </OrderPopup>
                </div>
              </div>
            )}

            {/* Product Description */}
            <div className="p-4 sm:p-6 bg-emerald-900/10 backdrop-blur-xl border border-emerald-500/30 rounded-xl">
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-300 mb-4">
                About This Product
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                {product.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-emerald-500/20">
                <div>
                  <span className="text-emerald-400 text-sm font-medium">Category</span>
                  <p className="text-white font-semibold mt-1 text-sm sm:text-base">
                    {product.category}
                  </p>
                </div>
                <div>
                  <span className="text-emerald-400 text-sm font-medium">Special Offer</span>
                  <p className="text-white font-semibold mt-1 text-sm sm:text-base">
                    {product.subcategory}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-900/10 border border-emerald-500/30 rounded-xl text-center">
                <div className="text-lg sm:text-2xl font-bold text-emerald-400">Licensed</div>
                <div className="text-xs sm:text-sm text-gray-400">Indoor Grown</div>
              </div>
              <div className="p-4 bg-emerald-900/10 border border-emerald-500/30 rounded-xl text-center">
                <div className="text-lg sm:text-2xl font-bold text-emerald-400">Premium</div>
                <div className="text-xs sm:text-sm text-gray-400">Quality Grade</div>
              </div>
            </div>
          </div>
        </div>


        <PremiumSelectedFlower />

      </div>
    </div>
  );
}

export default Page;
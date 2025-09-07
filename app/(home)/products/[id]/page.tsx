"use client";

import { ShoppingBag } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';
import { PremiumSelectedFlower } from '../../_components/premiumSelectedFlower';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/contexts/cartContext';
import OrderPopup from '../../_components/OrderForm';
import AddToBagButton from '../../_components/addToBagButton';
import MediaSlider from '@/components/shared/mediaSlider';
import useAxios from '@/hooks/useAxios';
import { Product } from '@/types';

const Page = ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  const { id } = use(params);
  const { getCartItemCount } = useCart();

  const [product, setProduct] = useState<Product>({} as Product);
  const [selectedWeight, setSelectedWeight] = useState<string>('');

  const getData = async () => {
    const res = await useAxios.get(`/products/${id}`);
    setProduct(res.data);
    setSelectedWeight(res.data?.priceOptions[0]?.unit);
    console.log(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  // Loading state (simulate loading)
  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="min-h-screen bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">Product not found</h3>
          <p className="text-gray-400 mb-6">The requested product could not be found.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }




  // Get current price based on selected weight
  const currentPrice = product.priceOptions.find(p => p.unit === selectedWeight)?.price || product?.priceOptions[0]?.price;

  // Combine all media (images and videos) for the MediaSlider
  const allMedia = [
    ...(product.photoUrls || []).map(img => ({ type: 'image' as const, src: img })),
    ...(product.videoUrls || []).map(vid => ({ type: 'video' as const, src: vid }))
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
                <span>{product.category.replaceAll('-',' ').replaceAll('_',' ').toUpperCase()}</span>
                <span className="text-emerald-600">•</span>
                <span>{product.subcategory?.replaceAll('-',' ').replaceAll('_',' ').toUpperCase()}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                {product.name.replaceAll('-',' ').replaceAll('_',' ').toUpperCase()}
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
                     ${Math.round(Number(currentPrice) / (1 - product.discount / 100))}
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
                  {product.priceOptions.map((price) => (
                    <button
                      key={price.unit}
                      onClick={() => setSelectedWeight(price.unit)}
                      className={`flex-1 min-w-[80px] p-3 rounded-lg border-2 transition-all text-center ${selectedWeight === price.unit
                        ? 'border-emerald-500 bg-emerald-900/40 shadow-lg shadow-emerald-500/20'
                        : 'border-emerald-500/30 bg-emerald-900/10 hover:border-emerald-400/60 hover:bg-emerald-800/20'
                        }`}
                    >
                      <span className="font-medium text-sm text-white">{price.unit}</span>
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
                  {product.priceOptions.map((price) => (
                    <button
                      key={price.unit}
                      onClick={() => setSelectedWeight(price.unit)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${selectedWeight === price.unit
                        ? 'border-emerald-500 bg-emerald-900/40 shadow-lg shadow-emerald-500/20'
                        : 'border-emerald-500/30 bg-emerald-900/10 hover:border-emerald-400/60 hover:bg-emerald-800/20'
                        }`}
                    >
                      <span className="font-medium text-sm text-white">{price.unit}</span>
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
                    {product.category.replaceAll('-',' ').replaceAll('_',' ').toUpperCase()}
                  </p>
                </div>
                <div>
                  <span className="text-emerald-400 text-sm font-medium">Special Offer</span>
                  <p className="text-white font-semibold mt-1 text-sm sm:text-base">
                    {product.subcategory?.replaceAll('-',' ').replaceAll('_',' ').toUpperCase()}
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
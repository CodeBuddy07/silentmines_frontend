"use client";

import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/productCard';
import React, { useState } from 'react';
import { Product } from '../_components/DealOfTheWeek';

// Mock product data - replace with your actual data source
const mockProducts: Product[] = Array.from({ length: 157 }, (_, i) => ({
    id: i + 1,
    image: "/Product_Demo_Image.png",
    discount: Math.floor(Math.random() * 80) + 10, // 10-89% discount
    category: ["LICENSED INDOORS", "OUTDOOR SPECIALS", "PREMIUM COLLECTION", "DAILY DEALS", "SEASONAL"][Math.floor(Math.random() * 5)],
    subcategory: ["DAILY SPECIAL", "WEEKLY DEAL", "FLASH SALE", "MEMBER EXCLUSIVE", "LIMITED TIME"][Math.floor(Math.random() * 5)],
    name: [
        "LEMON BUBBLEGUM 🍋⚡",
        "STRAWBERRY KUSH 🍓🌿",
        "BLUE DREAM SPECIAL 💙✨",
        "GREEN CRACK PREMIUM 💚🔥",
        "PURPLE HAZE DELUXE 💜🌙",
        "ORANGE CRUSH ELITE 🧡⭐",
        "MINT CHOCOLATE CHIP 🌿🍫",
        "VANILLA CUSTARD GOLD 🤍👑"
    ][Math.floor(Math.random() * 8)],
    prices: [
        { weight: "1 LB", amount: (Math.floor(Math.random() * 500) + 300).toString() },
        { weight: "2 LB", amount: (Math.floor(Math.random() * 900) + 600).toString() },
        { weight: "3 LB", amount: (Math.floor(Math.random() * 1300) + 900).toString() }
    ]
}));



// Main Gallery Component
const Gallery = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);



    // Calculate pagination
    const totalPages = Math.ceil(mockProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = mockProducts.slice(startIndex, endIndex);

    // Reset to first page when changing items per page or sort
    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const handleSortChange = (newSort: string) => {
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-black/60 backdrop-blur-[1px]">

            <div className="flex items-center justify-center py-20 bg-gradient-to-b from-black via-black via-75% to-transparent">
                <div
                    className="relative w-48 h-48 animate-spin text-white"
                    style={{ animationDuration: '10s' }}
                >
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="
            M 100, 100
            m -60, 0
            a 60,60 0 1,1 130,0
            a 60,60 0 1,1 -130,0
          "
                            />
                        </defs>

                        <text fontSize="18" fontWeight="600" fill="white" letterSpacing="2">
                            <textPath href="#circlePath" startOffset="0">
                                ✦ HIGH QUALITY ✦ 100% REAL FLOWER ✦ HIGH QUALITY ✦
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-black/20 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Full Gallery</h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Discover our complete collection of premium products. Browse through {mockProducts.length} carefully curated items.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-4 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-300">
                            Showing {startIndex + 1}-{Math.min(endIndex, mockProducts.length)} of {mockProducts.length} products
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">

                        <div className="flex items-center space-x-2">
                            <label htmlFor="perPage" className="text-sm font-medium text-gray-300">
                                Show:
                            </label>
                            <select
                                id="perPage"
                                value={itemsPerPage}
                                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                className="bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value={8}>8 per page</option>
                                <option value={12}>12 per page</option>
                                <option value={24}>24 per page</option>
                                <option value={48}>48 per page</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            discount={product.discount}
                            category={product.category}
                            subcategory={product.subcategory}
                            name={product.name}
                            prices={product.prices}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                {/* Results Summary */}
                <div className="text-center mt-8 p-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
                    <p className="text-sm text-gray-300">
                        Page {currentPage} of {totalPages} • Showing {currentProducts.length} products
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
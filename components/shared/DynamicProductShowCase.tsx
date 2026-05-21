"use client";

import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/productCard';
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Product, ProductCategory, Subcategory } from '@/types';

interface DynamicProductShowCaseProps {
    products: Product[];
    category: ProductCategory;
    currentPage: number;
    itemsPerPage: number;
    handleItemsPerPageChange: (newItemsPerPage: number) => void;
    totalPages: number;
    totalItems?: number;
    setCurrentPage: (page: number) => void;
    setActiveSubCategory: (subCategorySlug: string | null) => void;
    activeSubCategory: string | null;
}

// Main Gallery Component
const DynamicProductShowCase: React.FC<DynamicProductShowCaseProps> = ({
    products,
    category,
    currentPage,
    itemsPerPage,
    handleItemsPerPageChange,
    totalPages,
    setCurrentPage,
    totalItems = 0,
    setActiveSubCategory,
    activeSubCategory
}) => {

    const handleSubCategoryChange = (subCategorySlug: string | null) => {
        setActiveSubCategory(subCategorySlug);
        setCurrentPage(1);
    };

    // Remove the useEffect that was syncing with prop changes

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="min-h-screen bg-black/60 backdrop-blur-[1px]">
            {/* Rotating Quality Badge */}
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
                        <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            {category.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Subcategory Tabs (if subcategories exist) */}
            {category.subcategories && category.subcategories.length > 0 && (
                <div className="bg-black/30 border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap gap-2 py-6 justify-center">
                            {/* All Products Tab */}
                            <Button
                                variant={!activeSubCategory || activeSubCategory === '' ? "default" : "outline"}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${!activeSubCategory || activeSubCategory === ''
                                        ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20"
                                        : "bg-transparent text-gray-300 border-gray-600 hover:border-green-500 hover:text-green-400"
                                    }`}
                                onClick={() => handleSubCategoryChange('')}
                            >
                                All Products
                            </Button>

                            {/* Subcategory Tabs */}
                            {category.subcategories.map((subCategory: Subcategory) => {
                                return (
                                    <Button
                                        key={subCategory._id}
                                        variant={activeSubCategory === subCategory.name ? "default" : "outline"}
                                        className={`px-6 py-2 rounded-full transition-all duration-300 ${activeSubCategory === subCategory.name
                                                ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20"
                                                : "bg-transparent text-gray-300 border-gray-600 hover:border-green-500 hover:text-green-400"
                                            }`}
                                        onClick={() => handleSubCategoryChange(subCategory.name)}
                                    >
                                        {subCategory.name}
                                       
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Active Filter Display */}
                {activeSubCategory && activeSubCategory !== 'all' && (
                    <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-lg">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-green-400 font-semibold">
                                    {category.subcategories?.find((sub: Subcategory) => sub.name === activeSubCategory)?.name}
                                </span>
                                <span className="text-xs bg-green-700/40 text-green-300 px-2 py-0.5 rounded-full font-medium">
                                    {totalItems} {totalItems === 1 ? 'product' : 'products'} total
                                </span>
                            </div>
                            <button
                                onClick={() => handleSubCategoryChange('')}
                                className="text-sm text-gray-300 border border-gray-600 bg-transparent hover:border-green-500 hover:text-green-400 px-3 py-1.5 rounded-md transition-colors duration-200"
                            >
                                ✕ Clear Filter
                            </button>
                        </div>
                    </div>
                )}

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-4 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium text-gray-300">
                            {totalItems === 0
                                ? 'No products'
                                : <>Showing <span className="text-white font-semibold">{startItem}–{endItem}</span> of <span className="text-green-400 font-semibold">{totalItems}</span> products</>
                            }
                        </span>
                        {activeSubCategory && activeSubCategory !== 'all' && (
                            <span className="text-xs text-green-400/80">in {activeSubCategory}</span>
                        )}
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
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                type={product.type}
                                image={product.photoUrls}
                                discount={product.discount}
                                category={product.category}
                                subcategory={product.subcategory}
                                name={product.name}
                                priceOptions={product.priceOptions}
                                dealoftheweek={product.dealoftheweek}
                                bestSeller={product.bestSeller}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1M9 7h6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-300 mb-2">No products found</h3>
                        <p className="text-gray-400 mb-6">
                            {activeSubCategory && activeSubCategory !== ''
                                ? `No products available in this subcategory.`
                                : `No products available in this category.`}
                        </p>
                        {activeSubCategory && activeSubCategory !== '' && (
                            <Button
                                variant="outline"
                                className=" border-green-600 bg-transparent hover:bg-green-500 text-white"
                                onClick={() => handleSubCategoryChange('all')}
                            >
                                View All Products
                            </Button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && products.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                {/* Results Summary */}
                {products.length > 0 && (
                    <div className="text-center mt-8 p-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-300">
                            Page <span className="text-white font-medium">{currentPage}</span> of <span className="text-white font-medium">{totalPages}</span>
                            {' · '}
                            Showing <span className="text-white font-medium">{startItem}–{endItem}</span> of <span className="text-green-400 font-semibold">{totalItems}</span> products
                            {activeSubCategory && activeSubCategory !== 'all' && (
                                <span className="ml-1 text-green-400">
                                    in {category.subcategories?.find((sub: Subcategory) => sub.name === activeSubCategory)?.name}
                                </span>
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicProductShowCase;
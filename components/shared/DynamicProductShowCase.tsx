"use client";

import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/productCard';
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';

// Types for navigation structure
interface Product {
    id: string;
    name: string;
    image: string;
    category: string;
    subcategory?: string;
    prices: {
    weight: string;
    amount: string;
  }[];
    discount?: number;
}

interface SubCategory {
    id: string;
    name: string;
    slug: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    subCategories?: SubCategory[];
}

interface DynamicProductShowCaseProps {
    products: Product[];
    category: Category;
}

// Main Gallery Component
const DynamicProductShowCase: React.FC<DynamicProductShowCaseProps> = ({
    products,
    category
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

    // Filter products based on active subcategory
    const filteredProducts = useMemo(() => {
        if (!activeSubCategory || activeSubCategory === 'all') {
            return products;
        }
        return products.filter(product => 
            product.subcategory?.toLowerCase() === activeSubCategory.toLowerCase()
        );
    }, [products, activeSubCategory]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to first page when changing filters or items per page
    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const handleSubCategoryChange = (subCategorySlug: string | null) => {
        setActiveSubCategory(subCategorySlug);
        setCurrentPage(1);
    };

    // Remove the useEffect that was syncing with prop changes

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
            {category.subCategories && category.subCategories.length > 0 && (
                <div className="bg-black/30 border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap gap-2 py-6 justify-center">
                            {/* All Products Tab */}
                            <Button
                                variant={!activeSubCategory || activeSubCategory === 'all' ? "default" : "outline"}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                    !activeSubCategory || activeSubCategory === 'all'
                                        ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20"
                                        : "bg-transparent text-gray-300 border-gray-600 hover:border-green-500 hover:text-green-400"
                                }`}
                                onClick={() => handleSubCategoryChange('all')}
                            >
                                All Products
                                <span className="ml-2 text-xs opacity-75">
                                    ({products.length})
                                </span>
                            </Button>

                            {/* Subcategory Tabs */}
                            {category.subCategories.map((subCategory) => {
                                const subCategoryCount = products.filter(p => 
                                    p.subcategory?.toLowerCase() === subCategory.slug.toLowerCase()
                                ).length;

                                return (
                                    <Button
                                        key={subCategory.id}
                                        variant={activeSubCategory === subCategory.slug ? "default" : "outline"}
                                        className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                            activeSubCategory === subCategory.slug
                                                ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20"
                                                : "bg-transparent text-gray-300 border-gray-600 hover:border-green-500 hover:text-green-400"
                                        }`}
                                        onClick={() => handleSubCategoryChange(subCategory.slug)}
                                    >
                                        {subCategory.name}
                                        <span className="ml-2 text-xs opacity-75">
                                            ({subCategoryCount})
                                        </span>
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400 font-medium">
                                    Filtered by: {category.subCategories?.find(sub => sub.slug === activeSubCategory)?.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {filteredProducts.length} products found
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-black border-gray-600 hover:border-green-500"
                                onClick={() => handleSubCategoryChange('all')}
                            >
                                Clear Filter
                            </Button>
                        </div>
                    </div>
                )}

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-4 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-300">
                            Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
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
                {filteredProducts.length > 0 ? (
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
                ) : (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1M9 7h6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-300 mb-2">No products found</h3>
                        <p className="text-gray-400 mb-6">
                            {activeSubCategory && activeSubCategory !== 'all' 
                                ? `No products available in this subcategory.` 
                                : `No products available in this category.`}
                        </p>
                        {activeSubCategory && activeSubCategory !== 'all' && (
                            <Button
                                variant="outline"
                                className="text-gray-300 border-gray-600 hover:border-green-500"
                                onClick={() => handleSubCategoryChange('all')}
                            >
                                View All Products
                            </Button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && filteredProducts.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                {/* Results Summary */}
                {filteredProducts.length > 0 && (
                    <div className="text-center mt-8 p-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-300">
                            Page {currentPage} of {totalPages} • Showing {currentProducts.length} products
                            {activeSubCategory && activeSubCategory !== 'all' && (
                                <span className="ml-2 text-green-400">
                                    in {category.subCategories?.find(sub => sub.slug === activeSubCategory)?.name}
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
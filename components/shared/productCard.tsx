"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import AddToBagButton from '@/app/(home)/_components/addToBagButton';
import { Price } from '@/types';

interface ProductCardProps {
    id?: string;
    image: string[];
    discount?: number;
    category: string;
    subcategory?: string;
    name: string;
    priceOptions: Price[];
    dealoftheweek: boolean,
    bestSeller: boolean,
    type: string,
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    image,
    discount,
    category,
    subcategory,
    name,
    priceOptions,
    dealoftheweek,
    bestSeller,
    type,

}) => {
    
    const [isHovered, setIsHovered] = useState(false);

    const validPriceOptions = priceOptions.filter(p => Number(p.price) > 0);
    const [selectedWeight, setSelectedWeight] = useState<string>('');

    // Sync selectedWeight whenever priceOptions load or change
    useEffect(() => {
        const firstValid = priceOptions.find(p => Number(p.price) > 0);
        if (firstValid) setSelectedWeight(firstValid.unit);
    }, [priceOptions]);

    // Use nullish-safe lookup — never fall back to a 0-price option
    const selectedOption = validPriceOptions.find(p => p.unit === selectedWeight) ?? validPriceOptions[0];
    const currentPrice = selectedOption?.price ?? 0;

    return (
        <Card
            className="pt-0 backdrop-blur-sm border border-white/10 overflow-hidden bg-green-600/5 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-800/40 flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image - Not wrapped in Link to prevent click conflicts */}
            <div className="relative overflow-hidden">
                <div className="relative w-full h-64">

                    {/* Option 2: Simple Image */}
                    <Image
                        src={image[0]} // Display the first image from the array
                        alt={name}
                        fill
                        className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    />
                </div>

                {discount && discount > 0 && (
                    <Badge variant="outline" className="absolute top-4 right-4 bg-red-600 border-red-500 hover:bg-red-700 text-white">
                        {discount}% OFF
                    </Badge>
                )}

                {/* View Details Link - Positioned over image */}
                <Link
                    href={`/products/${id}`}
                    className="absolute inset-0 z-10 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100"
                >
                    <Button
                        variant="outline"
                        className="bg-white/90 hover:bg-white text-black border-0 shadow-lg transform scale-90 hover:scale-100 transition-all duration-300"
                    >
                        View Details
                    </Button>
                </Link>
            </div>

            <CardContent className="pb-6 pt-2 flex flex-col flex-1 ">
                {/* Top Info */}
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 text-xs">

                        {dealoftheweek && (
                            <Badge variant="outline" className="bg-white/10 text-white/80 border-white/20 hover:bg-white/20">
                                Deal of the Week
                            </Badge>
                        )}

                        {bestSeller && (
                            <Badge variant="outline" className="bg-white/10 text-white/80 border-white/20 hover:bg-white/20">
                                Best Seller
                            </Badge>
                        )}

                        {type && (
                            <Badge variant="outline" className="bg-white/10 text-white/80 border-white/20 hover:bg-white/20">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Badge>
                        )}

                        {category && (
                            <Badge variant="outline" className="bg-white/10 text-white/80 border-white/20 hover:bg-white/20">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Badge>
                        )}
                        {subcategory && (
                            <Badge variant="outline" className="bg-white/10 text-white/80 border-white/20 hover:bg-white/20">
                                {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                            </Badge>
                        )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                        {name}
                    </h3>

                    {/* Weight Selection */}
                    {validPriceOptions.length > 0 ? (
                        <div className="space-y-3">
                            {/* Weight Options */}
                            <div className="flex flex-wrap gap-2">
                                {validPriceOptions.map((price, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedWeight(price.unit)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${selectedWeight === price.unit
                                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                            : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                                            }`}
                                    >
                                        {price.unit}
                                    </button>
                                ))}
                            </div>

                            {/* Current Price Display */}
                            {currentPrice > 0 && (
                                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                                    <span className="text-white/80 text-sm">Price for {selectedWeight || validPriceOptions[0]?.unit}</span>
                                    <div className="flex items-center gap-2">
                                        {discount && discount > 0 && (
                                            <span className="text-white/60 line-through text-sm">
                                                ${Math.round(currentPrice / (1 - discount / 100))}
                                            </span>
                                        )}
                                        <span className="text-green-400 font-bold text-lg">${currentPrice}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No pricing available</p>
                    )}
                </div>

                {/* Add to Bag Button */}
                <div className='w-full flex h-full  flex-col justify-center items-end content-end bottom-0 gap-2 mt-5'>
                    <Link href={`/products/${id}`} className="w-full flex-1 items-end content-end">

                        <Button

                            variant="outline"
                            className="relative overflow-hidden w-full  border-emerald-500 bg-emerald-900/20  hover:text-white hover:bg-white/20 text-white group cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-green-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                            <span className="relative z-10 px-4 py-2">View Details</span>
                        </Button>

                    </Link>

                    <AddToBagButton
                        product={{
                            _id: name, // Replace with actual id if available
                            photoUrls: image,
                            discount: discount ?? 0,
                            category,
                            name,
                            priceOptions: validPriceOptions,
                            subcategory: subcategory || '',
                            description: `Premium ${category} - ${name}`, // Generate description
                            videoUrls: [],
                            bestSeller, // or set appropriately
                            createdAt: new Date().toISOString(), // or use actual date
                            dealoftheweek, // or set appropriately
                            type: '', // set appropriately if needed
                            updatedAt: new Date().toISOString(), // or use actual date
                        }}
                        selectedWeight={selectedWeight}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
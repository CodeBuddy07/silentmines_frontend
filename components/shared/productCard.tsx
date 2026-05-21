"use client";

import { useState } from 'react';
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
    const [selectedWeight, setSelectedWeight] = useState<string>(priceOptions[0]?.unit || '');

    // Get current price based on selected weight
    const currentPrice = priceOptions.find(p => p.unit === selectedWeight)?.price || priceOptions[0]?.price || '0';

    console.log("Image Data:  ",image);

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
                    <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-600 text-white">
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

            <CardContent className="p-6 flex flex-col flex-1 justify-between">
                {/* Top Info */}
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 text-xs">

                        {dealoftheweek && (
                            <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
                                {dealoftheweek ? 'Deal of the Week' : ''}
                            </Badge>
                        )}

                        {bestSeller && (
                            <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
                                {bestSeller ? 'Best Seller' : ''}
                            </Badge>
                        )}

                        {type && (
                            <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Badge>
                        )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                        {name}
                    </h3>

                    {/* Weight Selection */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-white/80">
                            <span>Weight:</span>
                            <span className="text-green-400 font-semibold">{selectedWeight}</span>
                        </div>

                        {/* Weight Options */}
                        <div className="flex flex-wrap gap-2">
                            {priceOptions.map((price, index) => (
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
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-white/80 text-sm">Price for {selectedWeight}</span>
                            <div className="flex items-center gap-2">
                                {discount && discount > 0 && (
                                    <span className="text-white/60 line-through text-sm">
                                        ${Math.round(Number(currentPrice) / (1 - discount / 100))}
                                    </span>
                                )}
                                <span className="text-green-400 font-bold text-lg">${currentPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add to Bag Button */}
                <div className='w-full flex flex-col justify-center items-center gap-2 mt-5'>
                    <Link href={`/products/${id}`} className="w-full">

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
                            priceOptions,
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
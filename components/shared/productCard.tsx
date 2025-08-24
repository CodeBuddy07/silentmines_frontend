"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Price } from "@/app/(home)/_components/DealOfTheWeek";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import MediaSlider from './mediaSlider';
import AddToBagButton from '@/app/(home)/_components/addToBagButton';

interface ProductCardProps {
    image: string;
    discount?: number;
    category: string;
    subcategory?: string;
    name: string;
    prices: Price[];
}

const ProductCard: React.FC<ProductCardProps> = ({
    image,
    discount,
    category,
    subcategory,
    name,
    prices,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState<string>(prices[0]?.weight || '');

    console.log(`Rendering ProductCard for ${discount} and id ${name}`);

    // Combine all media (images and videos) for the MediaSlider
    const allMedia = [
        ...[
            "/original.mov",
            "https://sample-videos.com/zip/10/mp4/360/sample2.mp4"
        ].map(vid => ({ type: 'video' as const, src: vid })),
        ...[
            "/demo_product-2.png",
            "/demo_product-3.png",
            "/demo_product-4.png",
            "/demo_product-5.png"
        ].map(img => ({ type: 'image' as const, src: img }))
    ];

    // Get current price based on selected weight
    const currentPrice = prices.find(p => p.weight === selectedWeight)?.amount || prices[0]?.amount || '0';

    return (
        <Card
            className="pt-0 backdrop-blur-sm border border-white/10 overflow-hidden bg-green-600/5 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-800/40 flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image - Not wrapped in Link to prevent click conflicts */}
            <div className="relative overflow-hidden">
                <div className="relative w-full h-64">
                    {/* Option 1: Use MediaSlider - uncomment to enable */}
                    {/* <MediaSlider
                        media={allMedia}
                        alt={name}
                        discount={discount}
                        className="w-full"
                    /> */}

                    {/* Option 2: Simple Image */}
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    />
                </div>

                {discount && (
                    <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-600 text-white">
                        {discount}% OFF
                    </Badge>
                )}

                {/* View Details Link - Positioned over image */}
                <Link
                    href={`/products/${name}`}
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
                        <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
                            {category}
                        </Badge>
                        {subcategory && (
                            <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
                                {subcategory}
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
                            {prices.map((price, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedWeight(price.weight)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${selectedWeight === price.weight
                                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                                        }`}
                                >
                                    {price.weight}
                                </button>
                            ))}
                        </div>

                        {/* Current Price Display */}
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-white/80 text-sm">Price for {selectedWeight}</span>
                            <div className="flex items-center gap-2">
                                {discount && (
                                    <span className="text-white/60 line-through text-sm">
                                        ${Math.round(parseInt(currentPrice) * (1 + discount / 100))}
                                    </span>
                                )}
                                <span className="text-green-400 font-bold text-lg">${currentPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add to Bag Button */}
                <div className='w-full flex flex-col justify-center items-center gap-2 mt-5'>
                    <Link href={`/products/${name}`} className="w-full">

                        <Button

                            variant="outline"
                            className="relative overflow-hidden w-full  border-white/20 bg-white/10 hover:text-white hover:bg-white/20 text-white group cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-green-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                            <span className="relative z-10 px-4 py-2">View Details</span>
                        </Button>

                    </Link>

                    <AddToBagButton
                        product={{
                            id: name, // Replace with actual id if available
                            image,
                            discount: discount ?? 0,
                            category,
                            subcategory: subcategory ?? '',
                            name,
                            prices,
                            description: `Premium ${category} - ${name}`, // Generate description
                            videos: ["/original.mov", "https://sample-videos.com/zip/10/mp4/360/sample2.mp4"], // Add videos
                            gallery: ["/demo_product-2.png", "/demo_product-3.png", "/demo_product-4.png", "/demo_product-5.png"], // Add gallery
                        }}
                        selectedWeight={selectedWeight}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
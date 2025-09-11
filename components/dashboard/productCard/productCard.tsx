"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import defaultProductImage from "@/public/image_not_available.png";

// Price type to match the structure you're using for prices
export interface Price {
    unit: string;
    price: number;
}

interface ProductCardProps {
    bestSeller: boolean;
    category: string;
    subcategory: string;
    createdAt: string;
    dealoftheweek: boolean;
    description: string;
    discount: number;
    name: string;
    photoUrls: string[];
    priceOptions: Price[];
    type: string;
    updatedAt: string;
    videoUrls: string[];
    _id: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    photoUrls: image,
    discount,
    category,
    subcategory,
    name,
    priceOptions,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    // console.log(subcategory);
    
    // Ensure prices is always an array
    const productPrices = Array.isArray(priceOptions) ? priceOptions : [];
    return (
        <Card
            className="pt-0 backdrop-blur-sm border border-white/10 overflow-hidden bg-green-600/5 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 group flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image */}
            <div className="relative overflow-hidden">
                <div className="relative w-full h-64">
                    <Image
                        src={image[0] || defaultProductImage}
                        alt={name}
                        fill
                        className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    />
                </div>
                <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-600 text-white">
                    {discount}% OFF
                </Badge>
            </div>

            <CardContent className="p-6 flex flex-col flex-1 justify-between">
                {/* Top Info */}
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">{category}</Badge>
                        <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">{subcategory}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                        {name}
                    </h3>

                    {/* Display Prices */}
                    <div className="space-y-2">
                        {productPrices.length > 0 ? (
                            productPrices.map((price, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-white/80 text-sm">{price.unit}</span>
                                    <span className="text-green-400 font-bold">${price.price}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No prices available</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;

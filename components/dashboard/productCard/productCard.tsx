"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Price } from "@/app/(home)/_components/DealOfTheWeek";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
    image: string;
    discount: number;
    category: string;
    subcategory: string;
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

    return (
        <Card
            className=" pt-0 backdrop-blur-sm border border-white/10 overflow-hidden bg-green-600/5 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 group flex flex-col" // 🧠 Make Card flex container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image */}
            <div className="relative overflow-hidden">
                <div className="relative w-full h-64">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    />
                </div>
                <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-600 text-white">
                    ${discount} OFF
                </Badge>
            </div>

            <CardContent className="p-6 flex flex-col flex-1 justify-between"> {/* 🧠 Make CardContent grow and space items */}
                {/* Top Info */}
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">{category}</Badge>
                        <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">{subcategory}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                        {name}
                    </h3>

                    <div className="space-y-2">
                        {prices.map((price, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-white/80 text-sm">{price.weight}</span>
                                <span className="text-green-400 font-bold">${price.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>

    );
};

export default ProductCard;
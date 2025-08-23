"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Price } from "@/app/(home)/_components/DealOfTheWeek";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import MediaSlider from './mediaSlider';

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


    return (
        <Card
            className=" pt-0 backdrop-blur-sm border border-white/10 overflow-hidden bg-green-600/5 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-800/40 flex flex-col" // 🧠 Make Card flex container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/products/${name}`} className="w-full">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                    <div className="relative w-full h-64">
                        {/* <MediaSlider
                            media={allMedia}
                            alt={name}
                            discount={discount}
                            className="w-full"
                        /> */}
                        <Image
                            src={image}
                            alt={" Product Image "}
                            fill
                            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                        />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-600 text-white">
                        {discount ? `${discount}% OFF` : ''}
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

                    <Button

                        variant="outline"
                        className="relative overflow-hidden w-full mt-6 border-white/20 bg-white/10 hover:text-white hover:bg-white/20 text-white group cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-green-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                        <span className="relative z-10 px-4 py-2">View Details</span>
                    </Button>

                </CardContent>
            </Link>
        </Card>

    );
};

export default ProductCard;
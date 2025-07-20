import React from 'react';
import DynamicProductShowCase from '@/components/shared/DynamicProductShowCase';
import { Product } from '../../_components/DealOfTheWeek';

// Mock product data - replace with your actual data source
const mockProducts: Product[] = Array.from({ length: 16 }, (_, i) => ({
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
const page = () => {

    return (
        <>
            <DynamicProductShowCase
                mockProducts={mockProducts}
                title="MoonRocks"
                description="Discover our complete collection of premium products. Browse through our carefully curated items."
            />
        </>
    );
};

export default page;
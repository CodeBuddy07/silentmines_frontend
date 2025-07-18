
import ProductCard from '@/components/shared/productCard';
import SectionHeader from '@/components/shared/sectionHeader';
import { Button } from '@/components/ui/button';


// Types
export interface Price {
    weight: string;
    amount: string;
}

interface Product {
    id: number;
    image: string;
    discount: number;
    category: string;
    subcategory: string;
    name: string;
    prices: Price[];
}

interface premiumSelectedFlowerProps {
    title?: string;
    subtitle?: string;
    products?: Product[];
    onShopMore?: () => void;
    className?: string;
}


// Reusable Section Header Component


// Main Deal Section Component
export const PremiumSelectedFlower: React.FC<premiumSelectedFlowerProps> = ({
    title,
    subtitle,
    products = [],
    onShopMore,
    className = ""
}) => {
    // Default products data
    const defaultProducts: Product[] = [
        {
            id: 1,
            image: "/demo_product-2.png",
            discount: 75,
            category: "LICENSED INDOORS",
            subcategory: "DAILY SPECIAL",
            name: "LEMON BUBBLEGUM 🍋⚡",
            prices: [
                { weight: "1 LB", amount: "750" },
                { weight: "2 LB", amount: "750" },
                { weight: "3 LB", amount: "750" }
            ]
        },
        {
            id: 2,
            image: "/demo_product-2.png",
            discount: 75,
            category: "LICENSED INDOORS",
            subcategory: "DAILY SPECIAL",
            name: "CHERRY 7UP 🍒🥤",
            prices: [
                { weight: "1 LB", amount: "750" },
                { weight: "2 LB", amount: "750" },
                { weight: "3 LB", amount: "750" }
            ]
        },
        {
            id: 3,
            image: "/demo_product-2.png",
            discount: 75,
            category: "LICENSED INDOORS",
            subcategory: "DAILY SPECIAL",
            name: "CALIFORNIA DREAM 🌟🌊",
            prices: [
                { weight: "1 LB", amount: "750" },
                { weight: "2 LB", amount: "750" },
                { weight: "3 LB", amount: "750" }
            ]
        },
        {
            id: 4,
            image: "/demo_product-2.png",
            discount: 75,
            category: "LICENSED INDOORS",
            subcategory: "DAILY SPECIAL",
            name: "CAKE POPZ 🧁🎉",
            prices: [
                { weight: "1 LB", amount: "750" },
                { weight: "2 LB", amount: "750" },
                { weight: "3 LB", amount: "750" }
            ]
        }
    ];

    const displayProducts = products.length > 0 ? products : defaultProducts;


    return (
        <section className={`bg-black text-white py-20 px-4 w-full ${className}`}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <SectionHeader
                    title={"Premium Selected Flower"}
                    subtitle={"Shop only the highest quality products. Out of this world THC - select any combination of flowers to build your top-notch supply."}
                />

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {displayProducts.map((product) => (
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

                {/* Shop More Button */}
                <div className="text-center">
                    <Button
                        size="lg"
                        className="bg-green-500/10 hover:bg-green-500/20 border border-white/20 text-white hover:text-white hover:scale-105 transition-all duration-300 group"
                    >
                        <span>Shop More Deals</span>
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Button>
                </div>
            </div>
        </section>
    );
};

import ProductCard from '@/components/shared/productCard';
import { Button } from '@/components/ui/button';
import useAxios from '@/hooks/useAxios';
import { Product } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';




// Reusable Section Header Component


// Main Deal Section Component
export const DealSection = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const getData = async () => {
        const res = await useAxios.get(`/products/bestselling`);
        setProducts(res.data.data.slice(0,4));
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <section className={`bg-black text-white py-20 px-4 w-full `}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                {/* <SectionHeader
                    title={title}
                    subtitle={subtitle}
                /> */}

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {products.map((product : Product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            image={product.photoUrls}
                            discount={product.discount}
                            category={product.category}
                            subcategory={product.subcategory}
                            name={product.name}
                            priceOptions={product.priceOptions}
                            dealoftheweek={product.dealoftheweek}
                            bestSeller={product.bestSeller}
                            type={product.type}
                        />
                    ))}
                </div>

                {/* Shop More Button */}
                <div className="text-center">
                    <Link href={"/"}>
                        <Button
                            size="lg"
                            className="bg-green-500/10 hover:bg-green-500/20 border border-white/20 text-white hover:text-white hover:scale-105 transition-all duration-300 group"
                        >
                            <span>Shop More Deals</span>
                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

import ProductCard from '@/components/shared/productCard';
import SectionHeader from '@/components/shared/sectionHeader';
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
        const res = await useAxios.get(`/products/dealoftheweek`);
        setProducts(res.data.data.slice(0, 4));
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <section className={`bg-black text-white py-20 px-4 w-full `}>
            <div className="max-w-7xl mx-auto">

                {/* Products Grid */}

                <SectionHeader
                    title={"Deal Of The Week"}
                    subtitle={"Shop only the highest quality products. Out of this world THC - select any combination of flowers to build your top-notch supply."}
                />

                {
                    products.length === 0 && (
                        <div className="text-center py-16 bg-black">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1M9 7h6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-300 mb-2">No products found</h3>
                            <p className="text-gray-400 mb-6">No products available in this category.</p>
                        </div>
                    )
                }


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {products.map((product: Product) => (
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
                    <Link href={"/gallery"}>
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
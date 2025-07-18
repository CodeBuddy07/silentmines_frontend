import { Button } from '@/components/ui/button';
import React from 'react';

const Banner = () => {
    return (
        <section className="w-full bg-black text-white py-20 px-4 border-y border-gray-700">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
                <div className="flex-1 text-center md:text-left space-y-6"
                >
                    <h1 className="text-3xl font-bold text-nowrap">
                        High Quality <span className="text-white">Weed</span> That&apos;s Out of This World.
                    </h1>

                    <Button variant="outline" className="rounded-full border-white text-white bg-transparent hover:bg-white hover:text-black">
                        Shop Now &gt;
                    </Button>


                </div>

                <div className='h- '>
                    <p className="text-lg">
                        Shop Wax, Licensed Exotics, Licensed AAA, Organic Living Soil Exotics, and More.
                    </p>
                    <p className="text-md mt-3">Our quality is unmatched.</p>
                </div>
            </div>
        </section>
    );
};

export default Banner;
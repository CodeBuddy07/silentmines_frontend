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

                    <Button
                        variant="outline"
                        className="relative rounded-full overflow-hidden mt-6 border-white bg-transparent hover:text-black hover:bg-transparent text-white group cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                        <span className="relative z-10 px-2 pr-4 py-2">Shop Now  <span className='group-hover:translate-x-3 translate-x-1 absolute transition-transform duration-500 ease-out'> &gt; </span></span>
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
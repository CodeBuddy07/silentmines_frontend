import { Button } from '@/components/ui/button';
import React from 'react';

const Banner = () => {
  return (
    <section className="w-full bg-black text-white py-20 px-4 border-y border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Left: Headline + Button */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold">
            High Quality <span className="text-white">Weed</span> That's Out of This World.
          </h1>

          <Button
            variant="outline"
            className="relative rounded-full overflow-hidden mt-4 border-white bg-transparent hover:text-black hover:bg-transparent text-white group cursor-pointer"
          >
            <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2 px-6 py-2">
              Shop Now
              <span className="transition-transform duration-500 ease-out group-hover:translate-x-2">&gt;</span>
            </span>
          </Button>
        </div>

        {/* Right: Description */}
        <div className="flex-1 text-center md:text-right">
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

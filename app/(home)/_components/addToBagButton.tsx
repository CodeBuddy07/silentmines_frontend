import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import React from 'react';

const AddToBagButton = () => {

    const handleAddToBag = () => {
        
    };
    return (
        <Button

            variant="outline"
            className="relative overflow-hidden w-full border-white/20 bg-white/10 hover:text-white hover:bg-white/20 text-white group cursor-pointer"
        >
            <span className="absolute inset-0 bg-green-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 px-4 py-2 flex justify-between items-center gap-5">Add To Bag <ShoppingBag/> </span>
        </Button>
    );
};

export default AddToBagButton;
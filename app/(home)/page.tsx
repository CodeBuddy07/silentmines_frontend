"use client";
import React from 'react';
import Header from './_components/header';
import Banner from './_components/banner';
import { AnnouncementSection } from './_components/announcement';
import { MarqueeStrip } from './_components/marqueeStrip';
import { DealSection } from './_components/DealOfTheWeek';
import { PremiumSelectedFlower } from './_components/premiumSelectedFlower';
import ContactSection from './_components/contactSection';
import { useCart } from '../contexts/cartContext';
import OrderPopup from "./_components/OrderForm";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
// import ProtectedRoute from './_components/protected-route';

const page = () => {

      const { getCartItemCount } = useCart();
    
      const cartItemCount = getCartItemCount();

    return (
        <div>

            <Header />
            <Banner />
            <AnnouncementSection />
            <MarqueeStrip />
            <DealSection />

            <div className="flex items-center justify-center py-20 bg-black">
                <div
                    className="relative w-48 h-48 animate-spin text-white"
                    style={{ animationDuration: '10s' }}
                >
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="
            M 100, 100
            m -60, 0
            a 60,60 0 1,1 130,0
            a 60,60 0 1,1 -130,0
          "
                            />
                        </defs>

                        <text fontSize="18" fontWeight="600" fill="white" letterSpacing="2">
                            <textPath href="#circlePath" startOffset="0">
                                ✦ HIGH QUALITY ✦ 100% REAL FLOWER ✦ HIGH QUALITY ✦
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>




            <PremiumSelectedFlower />
            <ContactSection />

             {/* Floating Cart Button */}
            {cartItemCount > 0 && (
              <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
                <OrderPopup>
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 sm:p-4 shadow-lg shadow-emerald-500/30 relative">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">
                      {cartItemCount}
                    </span>
                  </Button>
                </OrderPopup>
              </div>
            )}


        </div>
    );
};

export default page;
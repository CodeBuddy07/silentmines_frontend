import React from 'react';
import Header from './_components/header';
import Banner from './_components/banner';
import { AnnouncementSection } from './_components/announcement';
import { MarqueeStrip } from './_components/marqueeStrip';
import { DealSection } from './_components/DealOfTheWeek';
import { PremiumSelectedFlower } from './_components/premiumSelectedFlower';
import ContactSection from './_components/contactSection';

const page = () => {
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
            a 60,60 0 1,1 120,0
            a 60,60 0 1,1 -120,0
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
            <ContactSection/>
        </div>
    );
};

export default page;
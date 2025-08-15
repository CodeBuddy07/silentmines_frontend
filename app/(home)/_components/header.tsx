"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Header = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="relative">
            <ParticlesBackground />
            <div className="w-full bg-black/30 backdrop-blur-[3px] min-h-screen flex flex-col items-center justify-center px-4 text-center">
                {/* Title */}
                <h1
                    data-aos="fade-up"
                    className="text-3xl sm:text-5xl md:text-7xl text-white leading-tight"
                    style={{ fontFamily: "var(--font-planet-cosmos)" }}
                >
                    The Green Thumb*
                </h1>

                {/* Button Section */}
                <div
                    className="mt-8 flex flex-wrap justify-center items-center gap-4 max-w-xl"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {["Flower", "Pre-Rolls", "Extracts", "Edibles", "Vapes"].map(
                        (item) => (
                            <Link
                                key={item}
                                href={`/categories/${item == "Flower" ? "flowers" : item.toLowerCase()}`}
                            >
                                <Button
                                    key={item}
                                    className="border border-green-500 cursor-pointer text-green-500 hover:bg-green-500/10 hover:text-white transition-all duration-300"
                                    size="lg"
                                >
                                    {item}
                                </Button>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;

"use client";

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="w-full bg-black min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1
        data-aos="fade-up"
        className="text-4xl sm:text-6xl md:text-7xl font-bold text-white"
        style={{ fontFamily: 'var(--font-planet-cosmos)' }}
      >
        DR. Green Thumb*
      </h1>
      <h2
        data-aos="fade-up"
        className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-white drop-shadow-md"
      >
        WHOLE SITE ON SALE — UP TO $300 OFF
      </h2>
    </div>
  );
};

export default Header;

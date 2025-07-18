"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {
    useEffect(() => {
        AOS.init({
            duration: 800, // animation duration
            once: true,    // whether animation should happen only once
        });
    }, []);

    return (
        <div className='w-full bg-black min-h-screen flex flex-col items-center justify-center '>
            <h1 data-aos="fade-up" className='text-7xl' style={{ fontFamily: "var(--font-planet-cosmos)" }} >The Space Station*</h1>
            <h2 data-aos="fade-up" className='text-2xl font bold text-shadow-lg text-shadow-white'>WHOLE SITE  ON SALE  UP TO $300 OFF</h2>
        </div>
    );
};

export default Header;
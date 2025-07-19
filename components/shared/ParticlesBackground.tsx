'use client';

import { useEffect } from 'react';

export default function ParticlesBackground() {
  useEffect(() => {
    // Load particles.js script dynamically
    const script = document.createElement('script');
    script.src = '/particles.min.js';
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      if (window.particlesJS) {
        // @ts-ignore
        window.particlesJS.load('particles-js', '/particlesjs-config.json', () => {
          console.log('Particles.js loaded');
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      const existing = document.querySelector('script[src="/particles.min.js"]');
      if (existing) existing.remove();
    };
  }, []);

  return <div id="particles-js" className="absolute top-0 left-0 w-screen h-screen bg-black" />;
}

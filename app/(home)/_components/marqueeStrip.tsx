"use client"

import { useState } from "react"

export const MarqueeStrip = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-black py-5 relative overflow-hidden border-b border-gray-700"
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient edges */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Scrolling container */}
      <div
        className={`marquee-container ${isHovered ? "slow" : ""}`}
      >
        <div className="marquee-content text-neon tracking-widest font-mono text-sm md:text-base">
          {Array(2)
            .fill(
              Array(20).fill(" * OUT OF THIS WORLD ").join("")
            )
            .join(" ")}
        </div>
      </div>
    </div>
  )
}

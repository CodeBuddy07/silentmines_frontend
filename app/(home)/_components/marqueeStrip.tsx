

export const MarqueeStrip = () => {

  return (
    <div
      className="bg-black py-5 relative overflow-hidden border-b border-gray-700"
    >
      {/* Gradient edges */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Scrolling container */}
      <div
        className={`marquee-container`}
      >
        <div className="marquee-content text-neon tracking-widest font-mono text-sm md:text-base">
          {Array(2).fill(Array(10).fill(" * OUT OF THIS WORLD  * BEST IN THE GALAXY").join("")).join(" ")}
        </div>
      </div>
    </div>
  )
}

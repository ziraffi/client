import Acaccess from "./Acaccess"
import Navbar from "./Navbar"
import Venderlogo from "./Venderlogo"

function StoreBar({ scrollProgress }) {
  const barHeight = 70; // Height of the StoreBar in pixels

  return (
    <>
      <div style={{ height: `${barHeight}px` }}></div> {/* Placeholder to prevent content jump */}
      <div 
        className={`h-[70px] w-full flex justify-between items-center px-4 py-4 lg:px-20 md:px-8 bg-gradient-to-tl from-fuchsia-400 to-white border-b border-fuchsia-500 backdrop-blur-sm transition-all duration-300`}
        style={{
          position: 'fixed',
          top: `${(1 - scrollProgress) * -barHeight}px`, // Gradually move up
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: `0 4px 6px -1px rgba(0, 0, 0, ${0.1 * scrollProgress}), 0 2px 4px -1px rgba(0, 0, 0, ${0.06 * scrollProgress})`,
          opacity: 0.5 + 0.5 * scrollProgress, // Gradually increase opacity
        }}
      >
        <Venderlogo/>
        <Navbar scrollProgress={scrollProgress} />
        <Acaccess />
      </div>
    </>
  )
}

export default StoreBar
import { useRef, useEffect, useState } from 'react';
import Acaccess from "./Acaccess"
import Navbar from "./Navbar"
import Venderlogo from "./Venderlogo"
import PropTypes from 'prop-types';

function StoreBar({ scrollProgress }) {
  const [barHeight, setBarHeight] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const stickyThreshold = 0.1;
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      setBarHeight(barRef.current.offsetHeight);
    }
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* This div acts as a spacer when the StoreBar becomes fixed */}
      <div style={{ height: scrollProgress >= stickyThreshold ? `${barHeight}px` : '0', transition: 'all 0.3s ease-in-out'}}></div>

      <div 
        ref={barRef}
        className={`h-[70px] w-full flex justify-between items-center px-4 py-4 lg:px-20 md:px-8 bg-gradient-to-tl from-slate-400 to-white backdrop-blur-sm`}
        style={{
          position: scrollProgress >= stickyThreshold ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          boxShadow: scrollProgress >= stickyThreshold 
            ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
            : 'none',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Venderlogo/>
        <Navbar barHeight={barHeight} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <Acaccess />
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden"
          style={{ top: `${barHeight}px` }}
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  )
}


StoreBar.propTypes = {
  scrollProgress: PropTypes.number.isRequired,
};

export default StoreBar
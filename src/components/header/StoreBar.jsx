import { useRef, useEffect, useState } from "react";
import Acaccess from "./Acaccess";
import Navbar from "./Navbar";
import Venderlogo from "./Venderlogo";
import PropTypes from "prop-types";

function StoreBar({ scrollProgress, headerHeight }) {
  const [barHeight, setBarHeight] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      setBarHeight(barRef.current.offsetHeight);
    }
  }, [barRef, scrollProgress]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const calculateBarStyle = () => {
    const maxHeightIncreased = 15;
    const heightIncreased = Math.max(
      scrollProgress * maxHeightIncreased,
      maxHeightIncreased
    );
    if (scrollProgress < 1) {
      return {
        position: "relative",
        top: 0,
        height: `${heightIncreased}%`,
        opacity: 1,
        transform: `translateY(-${
          scrollProgress * (headerHeight - barHeight)
        }px)`,
      };
    } else {
      return {
        position: "fixed",
        top: 0,
        height: `${heightIncreased}%`,
        opacity: 1,
        transform: "translateY(0)",
      };
    }
  };

  const barStyle = calculateBarStyle();

  return (
    <>
      <div
        ref={barRef}
        className={`w-10/12 rounded-r-lg flex flex-row justify-between items-center px-4 py-4 lg:px-20 md:px-8 bg-gradient-to-tl from-slate-400 to-white backdrop-blur-sm`}
        style={{
          ...barStyle,
          left: 0,
          right: 0,
          zIndex: 999,
          boxShadow:
            scrollProgress === 1
              ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
              : "none",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Venderlogo />
        <Navbar
          barHeight={barHeight}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          scrollProgress={scrollProgress}
        />
        <Acaccess />
      </div>
      <div className="w-2/12 justify-center flex ">
        <img src="./assets/rkrb.png" className="size-[55px] object-scale-down md:size-[75px] rounded-full bg-orange-50" alt="" />
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
  );
}

StoreBar.propTypes = {
  scrollProgress: PropTypes.number.isRequired,
  headerHeight: PropTypes.number.isRequired,
};

export default StoreBar;

import { useEffect, useState, useRef } from 'react';
import StoreBar from "./StoreBar";

function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = headerHeight * 1.5;

      if (scrollPosition <= threshold) {
        setScrollProgress(scrollPosition / threshold);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerHeight]);

  return (
    <header ref={headerRef} className="z-50 flex flex-row items-center justify-between">
      <StoreBar scrollProgress={scrollProgress} headerHeight={headerHeight} />
    </header>
  );
}

export default Header;

import { useEffect, useState } from 'react';
import Logo from "./Logo";
import StoreBar from "./StoreBar";

function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition <= 45) {
        setScrollProgress(0);
      } else if (scrollPosition >= 50) {
        setScrollProgress(1);
      } else {
        setScrollProgress((scrollPosition - 45) / 5); // Normalize between 0 and 1
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="z-50">
      <div 
        className={`bg-white shadow-md transition-all duration-300`}
        style={{
          height: `${(1 - scrollProgress) * 100}%`,
          opacity: 1 - scrollProgress,
          overflow: 'hidden'
        }}
      >
        <div className="fluid mx-auto">
          <Logo />
        </div>
      </div>
      <StoreBar scrollProgress={scrollProgress} />
    </header>
  );
}

export default Header;
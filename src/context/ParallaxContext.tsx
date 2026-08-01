import React, { createContext, useContext, useState, useEffect } from 'react';
import { isLowTierDevice } from '../utils/perf';

interface ParallaxContextType {
  is3DParallaxEnabled: boolean;
  setIs3DParallaxEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  mousePos: { x: number; y: number }; // Normalized -1 to 1
  rawMousePos: { x: number; y: number };
  scrollOffset: number;
}

const ParallaxContext = createContext<ParallaxContextType | undefined>(undefined);

export const ParallaxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [is3DParallaxEnabled, setIs3DParallaxEnabled] = useState<boolean>(() => !isLowTierDevice());
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rawMousePos, setRawMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  useEffect(() => {
    let mouseRaf: number | null = null;
    let scrollRaf: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!is3DParallaxEnabled) return;

      if (mouseRaf === null) {
        mouseRaf = requestAnimationFrame(() => {
          const { innerWidth, innerHeight } = window;
          const normX = (e.clientX / innerWidth) * 2 - 1;
          const normY = (e.clientY / innerHeight) * 2 - 1;

          setMousePos({ x: normX, y: normY });
          setRawMousePos({ x: e.clientX, y: e.clientY });
          mouseRaf = null;
        });
      }
    };

    const handleScroll = () => {
      if (scrollRaf === null) {
        scrollRaf = requestAnimationFrame(() => {
          setScrollOffset(window.scrollY);
          scrollRaf = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (mouseRaf !== null) cancelAnimationFrame(mouseRaf);
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);
    };
  }, [is3DParallaxEnabled]);

  return (
    <ParallaxContext.Provider
      value={{
        is3DParallaxEnabled,
        setIs3DParallaxEnabled,
        mousePos,
        rawMousePos,
        scrollOffset,
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
};

export const useParallax = () => {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error('useParallax must be used within a ParallaxProvider');
  }
  return context;
};

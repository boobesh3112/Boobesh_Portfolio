import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ScrollProgress: React.FC = () => {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const currentProgress = (window.scrollY / totalScroll) * 100;
            setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
            setShowScrollTop(window.scrollY > 300);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <>
      {/* Top Fixed Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
          boxShadow: `0 0 12px ${theme.accentPrimary}`,
        }}
      />

      {/* Floating Scroll To Top Circular Progress Indicator */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 p-2 rounded-full border shadow-xl backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderColor,
            color: theme.textPrimary,
          }}
          aria-label="Scroll to top"
        >
          <svg className="w-10 h-10 transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke={theme.borderColor}
              strokeWidth="3"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke={theme.accentPrimary}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.1s ease' }}
            />
          </svg>
          <ArrowUp
            className="w-4 h-4 absolute transition-transform group-hover:-translate-y-0.5"
            style={{ color: theme.accentPrimary }}
          />
        </motion.button>
      )}
    </>
  );
};

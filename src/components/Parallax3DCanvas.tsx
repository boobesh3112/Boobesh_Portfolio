import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParallax } from '../context/ParallaxContext';
import { useTheme } from '../context/ThemeContext';
import { isLowTierDevice } from '../utils/perf';

export const Parallax3DCanvas: React.FC = () => {
  const { is3DParallaxEnabled, mousePos, scrollOffset } = useParallax();
  const { theme } = useTheme();

  if (!is3DParallaxEnabled) return null;

  const isLowTier = isLowTierDevice();

  // Low-tier device simplified render: static ambient gradients without active mouse frame tracking
  if (isLowTier) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div
          className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: theme.accentPrimary }}
        />
        <div
          className="absolute bottom-1/3 right-12 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: theme.accentSecondary }}
        />
      </div>
    );
  }

  // Derive parallax shifts for various depth layers
  const shiftX1 = mousePos.x * 20;
  const shiftY1 = mousePos.y * 20 + scrollOffset * 0.04;

  const shiftX2 = mousePos.x * -30;
  const shiftY2 = mousePos.y * -30 + scrollOffset * 0.08;

  const shiftX3 = mousePos.x * 45;
  const shiftY3 = mousePos.y * 45 - scrollOffset * 0.06;

  const gridTiltX = mousePos.y * -10 + 45;
  const gridTiltY = mousePos.x * 10;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Layer 0: Perspective 3D Grid Floor */}
        <motion.div
          animate={{
            rotateX: gridTiltX,
            rotateY: gridTiltY,
            translateY: scrollOffset * 0.1,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 25, mass: 0.2 }}
          className="absolute -inset-y-1/2 -inset-x-1/4 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${theme.accentPrimary}44 1px, transparent 1px), linear-gradient(to right, ${theme.borderColor} 1px, transparent 1px), linear-gradient(to bottom, ${theme.borderColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 60px 60px, 60px 60px',
            transformOrigin: '50% 50%',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            willChange: 'transform',
          }}
        />

        {/* Layer 1: Ambient Spheres */}
        <motion.div
          animate={{
            x: shiftX1,
            y: shiftY1,
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 25 }}
          className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{
            backgroundColor: theme.accentPrimary,
            transform: 'translateZ(-120px)',
            willChange: 'transform',
          }}
        />

        <motion.div
          animate={{
            x: shiftX2,
            y: shiftY2,
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 25 }}
          className="absolute bottom-1/3 right-12 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            backgroundColor: theme.accentSecondary,
            transform: 'translateZ(-150px)',
            willChange: 'transform',
          }}
        />

        {/* Layer 2: Floating 3D Objects */}
        <motion.div
          animate={{
            x: shiftX3,
            y: shiftY3,
            rotateX: mousePos.y * 30,
            rotateY: mousePos.x * 30,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 25 }}
          className="absolute top-36 right-16 sm:right-32 w-16 h-16 border-2 rounded-2xl flex items-center justify-center opacity-30"
          style={{
            borderColor: theme.accentPrimary,
            backgroundColor: `${theme.accentPrimary}15`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <div
            className="w-8 h-8 border border-dashed rounded-xl"
            style={{ borderColor: theme.accentSecondary }}
          />
        </motion.div>

        <motion.div
          animate={{
            x: shiftX2 * 1.1,
            y: shiftY2 * 1.1,
            rotateZ: mousePos.x * 25,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 25 }}
          className="absolute top-1/2 left-8 sm:left-20 w-24 h-24 rounded-full border-2 border-dashed opacity-25"
          style={{
            borderColor: theme.accentSecondary,
            willChange: 'transform',
          }}
        >
          <div
            className="absolute inset-2 rounded-full border"
            style={{ borderColor: theme.accentPrimary }}
          />
        </motion.div>

        <motion.div
          animate={{
            x: shiftX1 * 1.2,
            y: shiftY1 * 1.2,
            rotateX: mousePos.y * 35,
            rotateY: mousePos.x * 35,
          }}
          transition={{ type: 'spring', stiffness: 110, damping: 25 }}
          className="absolute top-2/3 right-10 sm:right-28 w-14 h-14 border-2 rotate-45 opacity-25"
          style={{
            borderColor: theme.accentPrimary,
            backgroundColor: `${theme.accentSecondary}20`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

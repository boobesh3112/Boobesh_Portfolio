import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Move, Hand } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';

export const DraggableBadge: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resetPos, setResetPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleDragStart = () => {
    soundEffects.playClick();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Reset to resting idle position after 3.5 seconds
    setTimeout(() => {
      setResetPos({ x: 0, y: 0 });
    }, 3500);
  };

  return (
    <div ref={containerRef} className="relative z-30 inline-block pointer-events-auto">
      <motion.div
        drag={!prefersReduced}
        dragConstraints={{ left: -180, right: 180, top: -120, bottom: 120 }}
        dragElastic={0.25}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 22 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={
          isDragging
            ? { scale: 1.1, rotate: 5 }
            : {
                x: resetPos.x,
                y: [0, -6, 0],
                rotate: 0,
                scale: 1,
              }
        }
        transition={
          isDragging
            ? { duration: 0.1 }
            : {
                x: { type: 'spring', stiffness: 200, damping: 20 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        whileHover={{ scale: 1.08 }}
        className="glass-panel px-4 py-2 rounded-full border shadow-xl flex items-center gap-2 text-xs font-mono font-bold cursor-grab active:cursor-grabbing select-none backdrop-blur-md transition-shadow"
        style={{
          backgroundColor: `${theme.bgSurface}ee`,
          borderColor: theme.accentPrimary,
          color: theme.textPrimary,
          boxShadow: isDragging
            ? `0 16px 32px ${theme.glowColor}`
            : `0 8px 20px rgba(0,0,0,0.12)`,
        }}
        title="Drag me around!"
      >
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: theme.accentPrimary }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: theme.accentPrimary }}
          />
        </span>
        <Hand className="w-3.5 h-3.5 text-amber-400" />
        <span>Say Hi! 👋</span>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded border opacity-80"
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
        >
          Drag Me
        </span>
        <Move className="w-3 h-3 text-indigo-400 opacity-60" />
      </motion.div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const CircuitLineArt: React.FC = () => {
  const { theme } = useTheme();
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <div className="absolute top-10 right-4 sm:right-12 w-64 sm:w-80 h-64 sm:h-80 pointer-events-none opacity-30 z-0">
      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main Circuit Backbone Line */}
        <motion.path
          d="M 10 30 L 100 30 L 140 70 L 220 70 L 250 100 L 250 180 L 280 210 L 280 280"
          stroke={theme.accentPrimary}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: prefersReduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />

        {/* Secondary Branch Line 1 */}
        <motion.path
          d="M 140 70 L 140 140 L 180 180 L 240 180"
          stroke={theme.accentSecondary}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: prefersReduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
        />

        {/* Secondary Branch Line 2 (Bracket Motif) */}
        <motion.path
          d="M 60 120 L 30 150 L 30 220 L 60 250 M 200 120 L 230 150 L 230 220 L 200 250"
          stroke={theme.accentPrimary}
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeLinecap="round"
          initial={{ pathLength: prefersReduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 2.0, delay: 0.5, ease: 'easeInOut' }}
        />

        {/* Circuit Node Circles */}
        {[
          { cx: 10, cy: 30 },
          { cx: 100, cy: 30 },
          { cx: 140, cy: 70 },
          { cx: 220, cy: 70 },
          { cx: 250, cy: 100 },
          { cx: 250, cy: 180 },
          { cx: 280, cy: 210 },
          { cx: 280, cy: 280 },
          { cx: 140, cy: 140 },
          { cx: 240, cy: 180 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="3.5"
            fill={theme.bgPrimary}
            stroke={theme.accentPrimary}
            strokeWidth="1.5"
            initial={{ scale: prefersReduced ? 1 : 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
          />
        ))}
      </svg>
    </div>
  );
};

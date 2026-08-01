import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0.35 for background, 0.65 for midground, 1.0 for foreground
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.35,
  className = '',
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate subtle Y translation based on depth layer speed
  // background (0.35): moves slower (-60px to 60px)
  // midground (0.65): moves moderately (-30px to 30px)
  const rangeMultiplier = (1 - speed) * 120;
  const y = useTransform(scrollYProgress, [0, 1], [-rangeMultiplier, rangeMultiplier]);

  return (
    <div ref={ref} className={`relative ${className}`} style={style}>
      <motion.div style={{ y: prefersReduced ? 0 : y, height: '100%', width: '100%', willChange: 'transform' }}>
        {children}
      </motion.div>
    </div>
  );
};

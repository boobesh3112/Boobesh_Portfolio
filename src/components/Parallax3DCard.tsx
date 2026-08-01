import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useParallax } from '../context/ParallaxContext';
import { useTheme } from '../context/ThemeContext';

interface Parallax3DCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  depth?: number; // Tilt intensity
  glare?: boolean;
  elevation?: number; // Z-axis lift on hover
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export const Parallax3DCard: React.FC<Parallax3DCardProps> = ({
  children,
  className = '',
  style = {},
  depth = 12,
  glare = true,
  elevation = 20,
  onClick,
  disabled = false,
}) => {
  const { is3DParallaxEnabled } = useParallax();
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 60fps tilt without triggering React state re-renders
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(rawY, [0, 1], [depth * 1.5, -depth * 1.5]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(rawX, [0, 1], [-depth * 1.5, depth * 1.5]),
    springConfig
  );

  const glareX = useTransform(rawX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(rawY, [0, 1], ['0%', '100%']);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)`
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!is3DParallaxEnabled || disabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) return;

    const px = (e.clientX - rect.left) / width;
    const py = (e.clientY - rect.top) / height;

    rawX.set(Math.max(0, Math.min(1, px)));
    rawY.set(Math.max(0, Math.min(1, py)));
  };

  const handlePointerEnter = () => {
    if (is3DParallaxEnabled && !disabled) setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    rawX.set(0.5);
    rawY.set(0.5);
  };

  if (!is3DParallaxEnabled || disabled) {
    return (
      <div className={className} style={style} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      animate={{
        z: isHovered ? elevation : 0,
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        willChange: 'transform',
        ...style,
      }}
      className={`relative rounded-3xl transition-shadow duration-300 ${
        isHovered ? 'shadow-2xl' : ''
      } ${className}`}
    >
      {/* 3D Content Container preserving Z-space & full pointer events */}
      <div
        className="relative z-10 w-full h-full pointer-events-auto"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
      >
        {children}
      </div>

      {/* 3D Glare Specular Reflection Layer */}
      {glare && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 overflow-hidden z-20"
          style={{
            opacity: 0.25,
            background: glareBg,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* 3D Ambient Drop Shadow / Glow Mesh underneath */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-3xl -z-10 blur-xl opacity-40 transition-opacity pointer-events-none"
          style={{
            backgroundColor: theme.accentPrimary,
            transform: 'translateZ(-20px) scale(0.95)',
          }}
        />
      )}
    </motion.div>
  );
};


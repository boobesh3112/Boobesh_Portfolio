import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FloatingBadgeProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  delay?: number;
  floatDuration?: number;
  floatOffset?: number;
  className?: string;
  accentColor?: string;
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  icon: Icon,
  title,
  subtitle,
  delay = 0.3,
  floatDuration = 3.5,
  floatOffset = -8,
  className = '',
  accentColor,
}) => {
  const { theme } = useTheme();
  const effectiveAccent = accentColor || theme.accentPrimary;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, floatOffset, 0],
      }}
      whileHover={{
        scale: 1.08,
        y: floatOffset - 4,
        borderColor: effectiveAccent,
        boxShadow: `0 0 25px ${effectiveAccent}80, 0 12px 35px -6px ${theme.glowColor}`,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.3, type: 'spring', stiffness: 300, damping: 20 },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 0.5,
        },
        boxShadow: { duration: 0.3 },
        borderColor: { duration: 0.3 },
      }}
      className={`group relative inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border backdrop-blur-xl shadow-xl z-20 cursor-pointer transition-colors ${className}`}
      style={{
        backgroundColor: `${theme.bgSurface}e0`,
        borderColor: `${theme.borderColor}`,
        boxShadow: `0 12px 30px -8px ${theme.glowColor}, 0 4px 12px rgba(0,0,0,0.1)`,
      }}
    >
      {/* Soft Ambient Glow Pulse Ring on Hover */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none -z-10 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${effectiveAccent}60 0%, transparent 80%)`,
        }}
      />

      <div
        className="flex items-center justify-center p-1.5 sm:p-2 rounded-xl text-white shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${effectiveAccent}, ${theme.accentSecondary})`,
        }}
      >
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-300 group-hover:rotate-12" />
      </div>

      <div className="flex flex-col text-left">
        <span
          className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap leading-none"
          style={{ color: theme.textPrimary }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className="text-[10px] sm:text-xs font-mono font-medium opacity-80 mt-0.5 whitespace-nowrap leading-tight"
            style={{ color: theme.textSecondary }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </motion.div>
  );
};

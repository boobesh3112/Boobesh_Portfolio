import React from 'react';
import { motion } from 'motion/react';
import { Box, Sparkles, Layers3, ShieldCheck } from 'lucide-react';
import { useParallax } from '../context/ParallaxContext';
import { useTheme } from '../context/ThemeContext';

export const Parallax3DToggle: React.FC = () => {
  const { is3DParallaxEnabled, setIs3DParallaxEnabled } = useParallax();
  const { theme } = useTheme();

  return (
    <div className="fixed top-20 left-4 sm:top-22 sm:left-6 z-30 flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIs3DParallaxEnabled((prev) => !prev)}
        className="glass-panel px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-2xl border flex items-center gap-2.5 backdrop-blur-2xl cursor-pointer group transition-all duration-300"
        style={{
          backgroundColor: is3DParallaxEnabled ? theme.bgSurface : theme.bgSecondary,
          borderColor: is3DParallaxEnabled ? theme.accentPrimary : theme.borderColor,
          boxShadow: is3DParallaxEnabled ? `0 0 20px ${theme.glowColor}` : '0 4px 12px rgba(0,0,0,0.1)',
        }}
        title="Toggle 3D Web Parallax, Depth & Card Tilt Effects"
      >
        {/* Animated 3D Cube / Layers Icon */}
        <div
          className="p-1.5 rounded-full border transition-transform duration-500 group-hover:rotate-12"
          style={{
            backgroundColor: is3DParallaxEnabled ? theme.bgSecondary : theme.bgSurface,
            borderColor: is3DParallaxEnabled ? theme.accentPrimary : theme.borderColor,
            color: is3DParallaxEnabled ? theme.accentPrimary : theme.textSecondary,
          }}
        >
          {is3DParallaxEnabled ? (
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            >
              <Box className="w-4 h-4" />
            </motion.div>
          ) : (
            <Layers3 className="w-4 h-4" />
          )}
        </div>

        {/* Text Label & Status Indicator */}
        <div className="flex flex-col items-start text-left font-mono">
          <div className="flex items-center gap-1.5 text-xs font-black tracking-tight" style={{ color: theme.textPrimary }}>
            <span>3D Parallax</span>
            <span
              className={`w-2 h-2 rounded-full ${
                is3DParallaxEnabled ? 'animate-ping' : ''
              }`}
              style={{
                backgroundColor: is3DParallaxEnabled ? '#10b981' : '#94a3b8',
              }}
            />
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-wider"
            style={{
              color: is3DParallaxEnabled ? theme.accentPrimary : theme.textSecondary,
            }}
          >
            {is3DParallaxEnabled ? 'Active (Tilt On)' : 'Off (Flat)'}
          </span>
        </div>

        {/* Sparkle Accent */}
        {is3DParallaxEnabled && (
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse hidden xs:inline" />
        )}
      </motion.button>
    </div>
  );
};

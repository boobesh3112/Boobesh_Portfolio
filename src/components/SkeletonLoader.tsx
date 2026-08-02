import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { LogoAvatar } from './LogoAvatar';

export const SplashLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500); // Allow fade out animation
    }, 1600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
          style={{ backgroundColor: theme.bgPrimary }}
        >
          {/* Glowing background aura */}
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{ backgroundColor: theme.accentPrimary }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Animated Monogram Logo Frame */}
            <motion.div
              initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
              animate={{ scale: [0.5, 1.1, 1], rotate: [ -15, 5, 0 ], opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                boxShadow: `0 0 32px ${theme.glowColor}`,
              }}
            >
              <LogoAvatar fallbackText="BJ" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-black/40 text-amber-300 z-10"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* Pulsing loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest"
              style={{ color: theme.textPrimary }}
            >
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.accentPrimary }} />
              <span>Initializing Portfolio...</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

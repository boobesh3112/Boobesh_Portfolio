import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface HeroTextProps {
  className?: string;
}

const FULL_NAME = 'BOOBESH J';

export const HeroText: React.FC<HeroTextProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const [typedName, setTypedName] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    setTypedName('');
    setIsTypingDone(false);

    const timer = setInterval(() => {
      index++;
      if (index <= FULL_NAME.length) {
        setTypedName(FULL_NAME.slice(0, index));
      } else {
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center select-none pointer-events-none z-1 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center relative px-2"
      >
        {/* Giant Modern Title with Typewriter Animation */}
        <h1
          className="font-black tracking-tight uppercase whitespace-nowrap text-[11vw] sm:text-[12vw] lg:text-[11.5vw] xl:text-[12rem] leading-none flex items-center justify-center"
          style={{
            fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
            background: `linear-gradient(135deg, ${theme.textPrimary} 0%, ${theme.accentPrimary} 60%, ${theme.accentSecondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: theme.textPrimary,
            filter: `drop-shadow(0 0 40px ${theme.glowColor})`,
            willChange: 'transform',
          }}
        >
          <span>{typedName}</span>

          {/* Typewriter Blinking Cursor */}
          <span
            className={`inline-block w-[0.12em] h-[0.85em] ml-2 rounded-full ${
              isTypingDone ? 'animate-pulse' : 'animate-ping'
            }`}
            style={{
              backgroundColor: theme.accentPrimary,
              boxShadow: `0 0 20px ${theme.accentPrimary}`,
              WebkitTextFillColor: 'initial',
            }}
          />
        </h1>

        {/* Ambient Glow Backdrop Layer for Enhanced Readability */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 blur-2xl font-black tracking-tight uppercase whitespace-nowrap text-[11vw] sm:text-[12vw] lg:text-[11.5vw] xl:text-[12rem] leading-none"
          style={{
            fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
            color: theme.accentPrimary,
          }}
        >
          {typedName}
        </div>
      </motion.div>
    </div>
  );
};

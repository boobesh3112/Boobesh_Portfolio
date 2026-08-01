import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BlobTransitionEventDetail {
  x?: number;
  y?: number;
  accentColor?: string;
  isDynamic?: boolean;
}

export const ThemeTransitionBlob: React.FC = () => {
  const [active, setActive] = useState(false);
  const [config, setConfig] = useState<BlobTransitionEventDetail>({
    x: window.innerWidth - 60,
    y: window.innerHeight - 60,
    accentColor: '#6366f1',
    isDynamic: false,
  });
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const handleTransition = (e: Event) => {
      const customEvent = e as CustomEvent<BlobTransitionEventDetail | undefined>;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const detail = customEvent.detail || {};

      setConfig({
        x: detail.x ?? window.innerWidth - 60,
        y: detail.y ?? window.innerHeight - 60,
        accentColor: detail.accentColor || '#6366f1',
        isDynamic: !!detail.isDynamic,
      });

      if (detail.isDynamic && !prefersReduced) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }

      setActive(true);

      const duration = prefersReduced ? 250 : 650;
      setTimeout(() => {
        setActive(false);
      }, duration);
    };

    window.addEventListener('theme-transition', handleTransition);
    return () => window.removeEventListener('theme-transition', handleTransition);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* Glitch Flicker Effect for Dynamic Mode */}
          {glitch && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0, 0.8, 0] }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-55 mix-blend-overlay bg-gradient-to-r from-pink-500 via-cyan-400 to-amber-300"
            />
          )}

          {/* Organic Morphing SVG Blob */}
          <motion.svg
            className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: config.x,
              top: config.y,
              width: '120px',
              height: '120px',
            }}
            viewBox="0 0 200 200"
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: [0, 25, 30], opacity: [0.95, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.path
              fill={config.accentColor}
              animate={{
                d: [
                  'M45,-55C58,-44,67,-28,68,-11C69,6,62,24,51,38C40,52,25,62,7,64C-11,66,-32,60,-46,48C-60,36,-67,18,-66,1C-65,-16,-56,-32,-43,-44C-30,-56,-15,-64,2,-67C19,-70,32,-66,45,-55Z',
                  'M38,-50C51,-40,64,-29,68,-14C72,1,67,20,57,36C47,52,32,65,14,70C-4,75,-25,72,-40,61C-55,50,-64,31,-65,12C-66,-7,-59,-26,-47,-37C-35,-48,-18,-51,-1,-50C16,-49,25,-60,38,-50Z',
                  'M45,-55C58,-44,67,-28,68,-11C69,6,62,24,51,38C40,52,25,62,7,64C-11,66,-32,60,-46,48C-60,36,-67,18,-66,1C-65,-16,-56,-32,-43,-44C-30,-56,-15,-64,2,-67C19,-70,32,-66,45,-55Z',
                ],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
              transform="translate(100, 100)"
            />
          </motion.svg>
        </div>
      )}
    </AnimatePresence>
  );
};

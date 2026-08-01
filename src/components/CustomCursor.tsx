import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useCursor } from '../context/CursorContext';
import { isLowTierDevice } from '../utils/perf';
import {
  Sparkles,
  Zap,
  Flame,
  Dices,
  Target,
  Terminal,
  Activity,
  Maximize2,
  Crosshair,
  Shield,
  Eye,
  Heart,
  Ghost,
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const { theme } = useTheme();
  const { activeCursorId, activeCursorDef } = useCursor();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const prefersReducedMotionRef = useRef(false);
  const isLowTierRef = useRef(false);

  const primaryColor = activeCursorDef.accentColor || theme.accentPrimary;
  const lastSpawnPos = useRef({ x: -100, y: -100 });
  const lastSpawnTime = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isLowTierRef.current = isLowTierDevice();

    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let lastX = -100;
    let lastY = -100;

    const onMouseMove = (e: MouseEvent) => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const vx = e.clientX - lastX;
        const vy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;

        setPosition({ x: e.clientX, y: e.clientY });
        setVelocity({ x: vx, y: vy });

        // Spawn trail particle if distance > 14px, time > 35ms, and not low-tier
        const now = Date.now();
        const dist = Math.hypot(e.clientX - lastSpawnPos.current.x, e.clientY - lastSpawnPos.current.y);
        if (
          dist > 14 &&
          now - lastSpawnTime.current > 35 &&
          !prefersReducedMotionRef.current &&
          !isLowTierRef.current
        ) {
          lastSpawnPos.current = { x: e.clientX, y: e.clientY };
          lastSpawnTime.current = now;
          const newParticle: Particle = {
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 6 + 3,
            color: primaryColor,
          };
          setParticles((prev) => [...prev.slice(-10), newParticle]);
        }

        const target = e.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.tagName === 'INPUT' ||
            target.closest('a') ||
            target.closest('button') ||
            target.classList.contains('cursor-pointer'))
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [primaryColor]);

  if (isTouchDevice) return null;

  // Render specific Cursor Graphic based on activeCursorId
  const renderCursorGraphic = () => {
    switch (activeCursorId) {
      // 1. Cyberpunk HUD
      case 'cyber-hud':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed"
              style={{ borderColor: primaryColor }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute w-8 h-8 rounded-full border border-current opacity-60"
              style={{ borderColor: primaryColor }}
            />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            <div className="absolute top-0 font-mono text-[8px]" style={{ color: primaryColor }}>
              HUD
            </div>
          </div>
        );

      // 2. Neon Pulse Orb
      case 'neon-orb':
        return (
          <div className="relative flex items-center justify-center w-10 h-10">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-md"
              style={{ backgroundColor: primaryColor }}
            />
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        );

      // 3. Cosmic Starlight
      case 'cosmic-star':
        return (
          <div className="relative flex items-center justify-center w-10 h-10">
            <motion.div
              animate={{ rotate: 360, scale: isHovered ? 1.4 : 1 }}
              transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
            </motion.div>
            <motion.div
              animate={{ scale: [0.8, 1.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
            </motion.div>
          </div>
        );

      // 4. Quantum Matrix
      case 'quantum-matrix':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            {[0, 90, 180, 270].map((deg) => (
              <motion.div
                key={deg}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="w-2 h-2 rounded-full absolute -top-1"
                  style={{ backgroundColor: primaryColor, opacity: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        );

      // 5. Flame Ignite
      case 'flame-ignite':
        return (
          <div className="relative flex items-center justify-center w-10 h-10">
            <motion.div
              animate={{ y: [-2, 2, -2], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              <Flame className="w-7 h-7 text-orange-500 fill-amber-400" />
            </motion.div>
          </div>
        );

      // 6. Fluid Meta Blob
      case 'golden-blob':
        return (
          <motion.div
            animate={{
              borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'],
              rotate: [0, 180, 360],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="w-9 h-9 border-2 opacity-80"
            style={{ backgroundColor: `${primaryColor}33`, borderColor: primaryColor }}
          />
        );

      // 7. Laser Sight Sniper
      case 'laser-sight':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <div className="absolute w-full h-[1px]" style={{ backgroundColor: primaryColor }} />
            <div className="absolute h-full w-[1px]" style={{ backgroundColor: primaryColor }} />
            <div className="w-6 h-6 rounded-full border border-current" style={{ borderColor: primaryColor }} />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-md" />
          </div>
        );

      // 8. Kawaii Anime Star
      case 'kawaii-star':
        return (
          <div className="relative flex items-center justify-center w-10 h-10">
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Heart className="w-6 h-6 text-pink-500 fill-pink-400" />
            </motion.div>
            <Sparkles className="w-3 h-3 text-cyan-300 absolute -top-1 -right-1 animate-spin" />
          </div>
        );

      // 9. Ghost Spectral Vapor
      case 'ghost-spectral':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Ghost className="w-7 h-7 text-purple-400" />
            </motion.div>
          </div>
        );

      // 10. Pixel Retro Arcade
      case 'pixel-arcade':
        return (
          <div className="font-mono text-xs font-black p-1 bg-black text-green-400 border border-green-500 rounded shadow-md">
            +PX
          </div>
        );

      // 11. Electric Arc Voltage
      case 'electric-arc':
        return (
          <div className="relative flex items-center justify-center w-10 h-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400"
            />
            <Zap className="w-5 h-5 text-amber-300 animate-bounce" />
          </div>
        );

      // 12. Gojo Void Infinity
      case 'gojo-infinity':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-indigo-500 shadow-lg"
              style={{ boxShadow: '0 0 16px rgba(99,102,241,0.8)' }}
            />
            <span className="font-black text-lg text-indigo-300">∞</span>
          </div>
        );

      // 13. Zenitsu Thunder
      case 'zenitsu-thunder':
        return (
          <div className="relative flex items-center justify-center w-10 h-10">
            <Zap className="w-7 h-7 text-yellow-400 fill-yellow-300 animate-pulse drop-shadow-[0_0_10px_rgba(234,179,8,1)]" />
          </div>
        );

      // 14. Batman Bat-Signal
      case 'batman-signal':
        return (
          <div className="relative flex items-center justify-center w-10 h-10 bg-black/80 rounded-full border border-amber-400 p-1">
            <Shield className="w-5 h-5 text-amber-400 fill-amber-500" />
          </div>
        );

      // 15. Spider-Sense Radar
      case 'spiderman-sense':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div
              animate={{ scale: [0.8, 1.4, 0.8], opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 rounded-full border-2 border-red-600"
            />
            <div className="w-3 h-3 rounded-full bg-blue-600 border border-white" />
          </div>
        );

      // 16. Chakra Rasengan
      case 'chakra-rasengan':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-sky-400 border-t-transparent shadow-md"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
              className="w-6 h-6 rounded-full bg-sky-500/40 border border-white"
            />
          </div>
        );

      // 17. Conqueror Haki
      case 'haki-aura':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="absolute inset-0 rounded-full bg-red-900/60 border-2 border-red-600 blur-xs"
            />
            <Zap className="w-5 h-5 text-red-500 fill-black" />
          </div>
        );

      // 18. Cyber Matrix Code
      case 'matrix-code':
        return (
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_#22c55e]" />
            <span className="font-mono text-[9px] text-green-400 font-bold opacity-80 leading-none mt-0.5">
              01
            </span>
          </div>
        );

      // 19. Prismic Hologram
      case 'prismic-holo':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="w-9 h-9 rounded-full border-2 shadow-lg"
            style={{
              borderColor: primaryColor,
              background: `linear-gradient(135deg, rgba(236,72,153,0.3), rgba(6,182,212,0.3), rgba(234,179,8,0.3))`,
            }}
          />
        );

      // 20. Ludo Dice Roller
      case 'ludo-dice':
        return (
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            className="p-1 rounded-lg bg-red-600 text-white shadow-xl border border-white"
          >
            <Dices className="w-5 h-5" />
          </motion.div>
        );

      // 21. Candy Crush Gem
      case 'candy-crush':
        return (
          <motion.div
            animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
            transition={{ repeat: isHovered ? Infinity : 0, duration: 0.8 }}
            className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-300 border-2 border-white flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        );

      // 22. Luxury Diamond
      case 'luxury-diamond':
        return (
          <motion.div
            animate={{ rotate: 45 }}
            className="w-7 h-7 border-2 border-amber-400 bg-amber-400/20 shadow-lg flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-amber-400" />
          </motion.div>
        );

      // 23. Sonar Radar Scanner
      case 'sonar-radar':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/60 bg-emerald-950/40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute w-1/2 h-[2px] bg-emerald-400 origin-left left-1/2"
            />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
        );

      // 24. Holographic HUD Core
      case 'hud-core':
        return (
          <div className="relative flex items-center justify-center w-12 h-12">
            <div className="absolute inset-0 rounded-full border border-sky-400 opacity-60" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute w-8 h-8 border border-dashed border-sky-300"
            />
            <Crosshair className="w-5 h-5 text-sky-400" />
          </div>
        );

      // 25. Vibe Coder Terminal
      case 'vibe-terminal':
      default:
        return (
          <div className="flex items-center gap-1 font-mono text-xs font-bold px-2 py-1 bg-zinc-900 text-emerald-400 rounded border border-emerald-500 shadow-xl">
            <Terminal className="w-3.5 h-3.5" />
            <span>&gt;_</span>
          </div>
        );
    }
  };

  return (
    <>
      {/* Primary Animated Pointer Container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-normal"
        style={{ willChange: 'transform' }}
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isClicking ? 0.8 : isHovered ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 900,
          damping: 40,
          mass: 0.1,
        }}
      >
        {renderCursorGraphic()}
      </motion.div>

      {/* Trailing Soft Halo Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-40 border opacity-40"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 25,
        }}
        style={{
          borderColor: primaryColor,
          boxShadow: isHovered ? `0 0 20px ${primaryColor}` : 'none',
        }}
      />

      {/* Particle Trail Wisp */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{ opacity: 0, scale: 0.1, y: p.y - p.size / 2 - 12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-30 shadow-sm"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Sparkles,
  ArrowUpRight,
  RotateCw,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';
import { TechBadge } from './Projects';
import { soundEffects } from '../utils/soundEffects';

interface FlipProjectCardProps {
  project: Project;
  index: number;
}

export const FlipProjectCard: React.FC<FlipProjectCardProps> = ({ project, index }) => {
  const { theme } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      soundEffects.playHover();
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsFlipped(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // If clicking a link directly, don't trigger flip
    if ((e.target as HTMLElement).closest('a')) return;
    soundEffects.playClick();
    setIsFlipped(!isFlipped);
  };

  const featuresList = project.features || [
    'Modular & reactive UI architecture',
    'Real-time data synchronization & state management',
    'Optimized performance & GPU-accelerated visuals',
  ];

  return (
    <div
      className="relative w-full h-[420px] rounded-3xl cursor-pointer select-none group"
      style={{ perspective: '1200px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        animate={{
          rotateY: prefersReducedMotion ? 0 : isFlipped ? 180 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 22,
          mass: 0.8,
        }}
      >
        {/* ================= FRONT FACE ================= */}
        <div
          className={`absolute inset-0 w-full h-full glass-panel p-6 sm:p-7 rounded-3xl flex flex-col justify-between border shadow-lg transition-shadow duration-300 ${
            isFlipped && prefersReducedMotion ? 'hidden' : 'block'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderColor,
            boxShadow: isFlipped
              ? `0 20px 40px ${theme.glowColor}`
              : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Background Ambient Glow */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-15 pointer-events-none"
            style={{ backgroundColor: index % 2 === 0 ? theme.accentPrimary : theme.accentSecondary }}
          />

          {/* Top Header Row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[11px] font-mono font-bold px-3 py-1 rounded-full border flex items-center gap-1.5"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.accentPrimary,
                }}
              >
                <Code2 className="w-3 h-3" />
                <span>{project.category || 'FULL-STACK APP'}</span>
              </span>

              {/* Flip Hint Icon Corner Fold */}
              <button
                className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded-lg border transition-transform hover:scale-105"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.textSecondary,
                }}
                title="Hover or tap to flip card for details"
              >
                <RotateCw className="w-3 h-3 text-indigo-400 animate-spin-slow" />
                <span className="hidden sm:inline">Flip 3D</span>
              </button>
            </div>

            {/* Title & Tagline */}
            <h3
              className="text-xl sm:text-2xl font-black tracking-tight mb-1"
              style={{ color: theme.textPrimary }}
            >
              {project.title}
            </h3>

            <p className="text-xs font-bold mb-3.5 italic" style={{ color: theme.accentPrimary }}>
              "{project.tagline}"
            </p>

            {/* Main Description */}
            <p
              className="text-xs sm:text-sm leading-relaxed line-clamp-4 mb-4"
              style={{ color: theme.textSecondary }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech Stack Preview */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
              {project.techStack.length > 4 && (
                <span
                  className="px-2 py-1 rounded-md text-[10px] font-mono border"
                  style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor, color: theme.textSecondary }}
                >
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>

            <div
              className="flex items-center justify-between pt-3 border-t text-xs font-mono font-bold"
              style={{ borderColor: theme.borderColor, color: theme.textSecondary }}
            >
              <span className="flex items-center gap-1 text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flip for features</span>
              </span>
              <span className="text-[10px] uppercase opacity-70">3D Perspective</span>
            </div>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div
          className={`absolute inset-0 w-full h-full glass-panel p-6 sm:p-7 rounded-3xl flex flex-col justify-between border shadow-2xl ${
            !isFlipped && prefersReducedMotion ? 'hidden' : 'block'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: theme.bgSurface,
            borderColor: theme.accentPrimary,
            boxShadow: `0 16px 36px ${theme.glowColor}`,
          }}
        >
          {/* Back Header */}
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: theme.borderColor }}>
              <span
                className="text-xs font-mono font-extrabold uppercase tracking-wider flex items-center gap-1.5"
                style={{ color: theme.accentPrimary }}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Architecture & Highlights</span>
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded border"
                style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor, color: theme.textSecondary }}
              >
                {project.title}
              </span>
            </div>

            {/* Key Features Bullet List */}
            <div className="space-y-2.5 my-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                Key Technical Capabilities:
              </span>
              <ul className="space-y-2">
                {featuresList.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-medium" style={{ color: theme.textPrimary }}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: theme.accentPrimary }} />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Full Tech Stack & Action Link */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-4 max-h-20 overflow-y-auto">
              {project.techStack.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>

            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                soundEffects.playClick();
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                color: '#ffffff',
                borderColor: 'transparent',
                boxShadow: `0 8px 20px -6px ${theme.glowColor}`,
              }}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="tracking-wide uppercase font-extrabold text-[11px]">View Demo & Live App</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Sparkles, Play, RefreshCw, Sliders, MousePointer, ShieldCheck, Clock, BookOpen, X, Code2, Terminal, Cpu, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';
import { Parallax3DCard } from './Parallax3DCard';
import { StaggerText } from './StaggerText';
import { isLowTierDevice } from '../utils/perf';

export const Craft: React.FC = () => {
  const { theme } = useTheme();
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [fontSize, setFontSize] = useState<'base' | 'lg' | 'xl'>('lg');

  // Listen for custom event 'toggle-reading-mode'
  useEffect(() => {
    const handleToggleReadingMode = () => {
      setIsReadingMode((prev) => !prev);
    };
    window.addEventListener('toggle-reading-mode', handleToggleReadingMode);
    return () => window.removeEventListener('toggle-reading-mode', handleToggleReadingMode);
  }, []);

  const toggleReadingMode = () => {
    soundEffects.playClick();
    setIsReadingMode((prev) => !prev);
  };

  // Widget 1: Count Up State with Settle Bounce
  const countRef = useRef<HTMLDivElement>(null);
  const isCountInView = useInView(countRef, { amount: 0.2, margin: '0px' });
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(50);
  const [isCountFinished, setIsCountFinished] = useState(false);
  const hasAnimatedRef = useRef(false);

  const startCountAnimation = (target = targetCount) => {
    setIsCountFinished(false);
    setCount(0);
    const startTime = performance.now();
    const duration = 1400;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
        setIsCountFinished(true);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isCountInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      startCountAnimation(targetCount);
    } else if (!isCountInView) {
      hasAnimatedRef.current = false;
    }
  }, [isCountInView, targetCount]);

  const triggerRerunCount = () => {
    soundEffects.playClick();
    startCountAnimation(targetCount);
  };

  // Widget 2: SVG Circular Gauge State
  const gaugeRef = useRef<HTMLDivElement>(null);
  const isGaugeInView = useInView(gaugeRef, { once: false, margin: '-50px' });
  const [gaugePercent, setGaugePercent] = useState(0);

  useEffect(() => {
    if (isGaugeInView) {
      setGaugePercent(95);
    }
  }, [isGaugeInView]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (gaugePercent / 100) * circumference;

  // Widget 3: Canvas Particles
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isCanvasVisible = false;

    const width = canvas.width;
    const height = canvas.height;

    // Device tier particle scaling
    const isLow = isLowTierDevice();
    const numParticles = isLow ? 12 : 24;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2.5 + 1.5,
    }));

    const render = () => {
      if (!isCanvasVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = theme.accentPrimary;
            ctx.globalAlpha = (1 - dist / 70) * 0.3;
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes & react to mouse repulsion/alignment
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        const mdx = mousePos.current.x - p.x;
        const mdy = mousePos.current.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 80) {
          const force = (80 - mdist) / 80;
          p.x -= (mdx / mdist) * force * 3;
          p.y -= (mdy / mdist) * force * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? theme.accentPrimary : theme.accentSecondary;
        ctx.globalAlpha = 0.8;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to only run loop when canvas is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isCanvasVisible = entry.isIntersecting;
          if (isCanvasVisible) {
            if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
            render();
          } else if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 };
  };

  return (
    <section id="craft" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <div className="mb-16 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap mb-3 justify-center sm:justify-start">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border"
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.borderColor,
                color: theme.accentPrimary,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              03. CRAFT — INTERACTIVE SHOWCASE
            </div>

            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border shadow-xs"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
                color: theme.textSecondary,
              }}
            >
              <Clock className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>~1 min read (~210 words)</span>
            </div>

            <button
              onClick={toggleReadingMode}
              onMouseEnter={() => soundEffects.playHover()}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold border transition-all cursor-pointer shadow-xs ${
                isReadingMode
                  ? 'bg-amber-500 text-white border-amber-400 shadow-md'
                  : 'hover:border-indigo-400'
              }`}
              style={
                !isReadingMode
                  ? {
                      backgroundColor: theme.bgSurface,
                      borderColor: theme.borderColor,
                      color: theme.textPrimary,
                    }
                  : {}
              }
              title="Press 'R' to toggle Reading Mode"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reading Mode: {isReadingMode ? 'ON' : 'OFF'}</span>
              <kbd
                className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] rounded border font-bold opacity-80"
                style={{
                  backgroundColor: isReadingMode ? 'rgba(0,0,0,0.2)' : theme.bgSecondary,
                  borderColor: isReadingMode ? 'rgba(255,255,255,0.4)' : theme.borderColor,
                }}
              >
                R
              </kbd>
            </button>
          </div>

          <StaggerText
            text="Not just what I build — how it feels to use."
            as="h2"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3"
            highlightWords={['how', 'it', 'feels', 'to', 'use.']}
            highlightStyle={{ color: theme.accentPrimary }}
          />

          <p className="mt-3 text-base sm:text-lg max-w-2xl" style={{ color: theme.textSecondary }}>
            Experience live micro-interactions, smooth scroll triggers, custom SVG progress gauges, and real-time interactive physics.
          </p>
        </div>

        {/* CONTENT LAYOUT (Standard vs Reading Mode) */}
        <AnimatePresence mode="wait">
          {isReadingMode ? (
            <motion.div
              key="reading-mode-craft"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 border shadow-2xl relative text-left"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
              }}
            >
              {/* Reading Control Bar */}
              <div
                className="flex items-center justify-between flex-wrap gap-3 pb-6 mb-8 border-b"
                style={{ borderColor: theme.borderColor }}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                    Distraction-Free Technical Craft Notes
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Font Size Selector */}
                  <div
                    className="flex items-center gap-1 border rounded-xl p-1"
                    style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
                  >
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setFontSize('base');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                        fontSize === 'base' ? 'bg-indigo-500 text-white' : ''
                      }`}
                      style={{ color: fontSize === 'base' ? '#ffffff' : theme.textSecondary }}
                    >
                      A-
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setFontSize('lg');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                        fontSize === 'lg' ? 'bg-indigo-500 text-white' : ''
                      }`}
                      style={{ color: fontSize === 'lg' ? '#ffffff' : theme.textSecondary }}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setFontSize('xl');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                        fontSize === 'xl' ? 'bg-indigo-500 text-white' : ''
                      }`}
                      style={{ color: fontSize === 'xl' ? '#ffffff' : theme.textSecondary }}
                    >
                      A+
                    </button>
                  </div>

                  <button
                    onClick={toggleReadingMode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                    style={{
                      backgroundColor: theme.bgSecondary,
                      borderColor: theme.borderColor,
                      color: theme.textSecondary,
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Exit Mode</span>
                  </button>
                </div>
              </div>

              {/* Technical Craft Notes Article */}
              <article
                className={`space-y-8 ${
                  fontSize === 'base'
                    ? 'text-base leading-relaxed'
                    : fontSize === 'lg'
                    ? 'text-lg leading-loose'
                    : 'text-xl leading-loose'
                }`}
                style={{ color: theme.textPrimary }}
              >
                <div className="border-l-4 pl-4" style={{ borderColor: theme.accentPrimary }}>
                  <h3 className="text-2xl font-black mb-1" style={{ color: theme.textPrimary }}>
                    Engineering Craft & Interaction Mechanics
                  </h3>
                  <p className="text-xs font-mono" style={{ color: theme.textSecondary }}>
                    A breakdown of animation mathematics, vector math, and real-time performance optimization
                  </p>
                </div>

                {/* Craft Section 1 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-indigo-400">
                    <Terminal className="w-4 h-4" /> 01. Spring Physics & Settle Bounce
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
                    Tactile Number Interpolation
                  </h4>
                  <p>
                    Standard linear counters feel artificial. In my web interfaces, count-up numbers utilize customized spring damping formulas with overshoot parameters. When reaching target values, numbers perform a subtle 3px settle bounce that triggers audio-haptic feedback.
                  </p>
                  <div
                    className="p-4 rounded-2xl font-mono text-xs overflow-x-auto border"
                    style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor, color: theme.accentPrimary }}
                  >
                    <code>
                      {`// Count-up ease-out spring calculation\nconst increment = targetCount / steps;\ntimer = setInterval(() => {\n  start += increment;\n  if (start >= target) setSettleBounce(true);\n}, stepTime);`}
                    </code>
                  </div>
                </div>

                {/* Craft Section 2 */}
                <div className="space-y-3 pt-4 border-t" style={{ borderColor: theme.borderColor }}>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-emerald-400">
                    <Code2 className="w-4 h-4" /> 02. Vector Geometry & SVG Gauges
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
                    Resolution-Independent Radial Progress
                  </h4>
                  <p>
                    Rather than relying on heavy raster graphics or canvas redraws for simple status rings, progress rings use resolution-independent SVG paths controlled by CSS <code className="px-1.5 py-0.5 rounded border text-xs font-mono">stroke-dashoffset</code>.
                  </p>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    Circumference equation: <code className="font-mono text-indigo-400">C = 2 × π × r = 339.29px</code>. Offsets update dynamically with GPU acceleration for 60fps responsiveness across screens.
                  </p>
                </div>

                {/* Craft Section 3 */}
                <div className="space-y-3 pt-4 border-t" style={{ borderColor: theme.borderColor }}>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-400">
                    <Cpu className="w-4 h-4" /> 03. Real-Time Particle Physics
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
                    Cursor Proximity Repulsion & Line Meshing
                  </h4>
                  <p>
                    Interactive physics canvases compute Euclidean distances between node pairs in real-time. When particles enter cursor proximity thresholds (&lt; 90px), a directional repulsive force vector repels the particles, simulating physical fluid resistance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                    <div className="p-3 rounded-xl border" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}>
                      <span className="font-bold text-indigo-400">FPS Target:</span> 60 FPS requestAnimationFrame
                    </div>
                    <div className="p-3 rounded-xl border" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}>
                      <span className="font-bold text-indigo-400">Node Limit:</span> 32 optimized dynamic nodes
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          ) : (
            /* Standard Grid View */
            <motion.div
              key="standard-mode-craft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
          {/* WIDGET 1: Count-up Number Animation */}
          <Parallax3DCard
            disabled={true}
            depth={0}
            glare={false}
            className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl h-full"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderColor,
            }}
          >
            <div ref={countRef}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Scroll Trigger 01
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full border shadow-xs" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor, color: theme.accentPrimary }}>
                  Count-Up Hook
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ color: theme.textPrimary }}>Prototyping Output</h3>
              <p className="text-xs mb-6" style={{ color: theme.textSecondary }}>
                Animated counter with spring bounce settlement.
              </p>

              {/* Big Animated Number with Settle Bounce */}
              <div className="my-6 text-center">
                <motion.div
                  animate={
                    isCountFinished
                      ? { scale: [1, 1.18, 0.96, 1.05, 1], rotate: [0, 2, -2, 0] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-6xl sm:text-7xl font-black tracking-tighter"
                  style={{
                    background: `linear-gradient(135deg, ${theme.textPrimary}, ${theme.accentPrimary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {count}+
                </motion.div>
                <div className="text-sm font-semibold mt-2" style={{ color: theme.textPrimary }}>
                  Projects & Prototypes
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
              <button
                onClick={triggerRerunCount}
                className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.textPrimary,
                }}
              >
                <RefreshCw className="w-3.5 h-3.5" style={{ color: theme.accentPrimary }} />
                Re-run Counter
              </button>
              <span className="text-[10px] font-mono" style={{ color: theme.textSecondary }}>
                Target: {targetCount}
              </span>
            </div>
          </Parallax3DCard>

          {/* WIDGET 2: SVG Circular Gauge / Progress Ring */}
          <Parallax3DCard
            disabled={true}
            depth={0}
            glare={false}
            className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl h-full"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderColor,
            }}
          >
            <div ref={gaugeRef}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Scroll Trigger 02
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full border shadow-xs" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor, color: theme.accentSecondary }}>
                  SVG Gauge
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ color: theme.textPrimary }}>UI Craft Accuracy</h3>
              <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
                Custom SVG circular progress ring filling on scroll.
              </p>

              {/* Circular Gauge with Pulsing Glow on Completion */}
              <div className="relative my-4 flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  {/* Track Circle */}
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke={theme.borderColor}
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Fill Circle */}
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke={theme.accentPrimary}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{
                      transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      filter: gaugePercent >= 90 ? `drop-shadow(0 0 8px ${theme.accentPrimary})` : 'none',
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black" style={{ color: theme.textPrimary }}>{gaugePercent}%</span>
                  <span className="text-[10px] font-mono font-bold uppercase" style={{ color: theme.accentPrimary }}>
                    UI Craft
                  </span>
                </div>
              </div>
            </div>

            {/* Gauge Slider Control */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.borderColor }}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-[10px]" style={{ color: theme.textSecondary }}>Adjust Gauge Fill</span>
                <span className="font-mono font-bold" style={{ color: theme.accentPrimary }}>{gaugePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={gaugePercent}
                onPointerDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setGaugePercent(Number(e.target.value));
                  soundEffects.playHover();
                }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </Parallax3DCard>

          {/* WIDGET 3: Particle Flow / Connecting Dots Canvas */}
          <Parallax3DCard
            disabled={true}
            depth={0}
            glare={false}
            className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl h-full"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderColor,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Interactive Physics
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full border shadow-xs" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor, color: theme.accentPrimary }}>
                  Canvas 2D
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ color: theme.textPrimary }}>Particle Mesh Canvas</h3>
              <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
                Particles gently repel and align to cursor proximity.
              </p>

              {/* Canvas Box */}
              <div className="relative rounded-2xl overflow-hidden border shadow-inner" style={{ borderColor: theme.borderColor, backgroundColor: theme.bgSecondary }}>
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={150}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="w-full h-36 cursor-crosshair block"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/40 text-white/80 pointer-events-none">
                  <MousePointer className="w-3 h-3 animate-bounce" /> Hover Cursor
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t text-center text-xs font-mono" style={{ borderColor: theme.borderColor, color: theme.textSecondary }}>
              Real-time theme vector renderer
            </div>
          </Parallax3DCard>
        </motion.div>
      )}
    </AnimatePresence>
      </motion.div>
    </section>
  );
};


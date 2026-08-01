import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Terminal,
  Bot,
  Zap,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CharacterPlayer } from './CharacterPlayer';
import { HeroText } from './HeroText';
import { FloatingBadge } from './FloatingBadge';
import { VoiceIntro } from './VoiceIntro';
import { TypingText } from './TypingText';
import { DraggableBadge } from './DraggableBadge';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const [isCharacterReady, setIsCharacterReady] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 pt-20 pb-12 overflow-hidden select-none">
      {/* ================= LAYER 1 (z-index 0): AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-left glow blob */}
        <div
          className="absolute -top-20 -left-20 w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full blur-3xl opacity-35 animate-blob"
          style={{ backgroundColor: theme.accentPrimary }}
        />
        {/* Right-center glow blob */}
        <div
          className="absolute top-1/3 -right-20 w-96 sm:w-[36rem] h-96 sm:h-[36rem] rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"
          style={{ backgroundColor: theme.accentSecondary }}
        />
        {/* Bottom-left glow blob */}
        <div
          className="absolute -bottom-20 left-1/4 w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full blur-3xl opacity-25 animate-blob animation-delay-4000"
          style={{ backgroundColor: theme.accentPrimary }}
        />

        {/* Ambient radial grid overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(${theme.accentPrimary} 1.2px, transparent 1.2px)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Diagonal subtle beam light */}
        <div
          className="absolute top-0 right-1/4 w-96 h-screen opacity-10 blur-2xl transform rotate-12 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${theme.accentPrimary}, transparent)`,
          }}
        />
      </div>

      {/* ================= TOP STATUS BADGE & VOICE INTRO ================= */}
      <div className="relative z-30 w-full flex flex-wrap items-center justify-center gap-3 mb-2 sm:mb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border backdrop-blur-xl shadow-md"
          style={{
            backgroundColor: `${theme.bgSurface}c0`,
            borderColor: theme.borderColor,
            color: theme.textPrimary,
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: theme.accentPrimary }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: theme.accentPrimary }}
            />
          </span>
          <span>Available for Roles & Collaborative Innovation</span>
          <Sparkles className="w-3.5 h-3.5 ml-1" style={{ color: theme.accentPrimary }} />
        </motion.div>

        {/* Voice Intro Player Pill */}
        <VoiceIntro />

        {/* Physics Draggable Badge Easter Egg */}
        <DraggableBadge />
      </div>

      {/* ================= MAIN DEPTH CONTAINER (DESKTOP & MOBILE) ================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center py-4">
        {/* ---------- LAYER 2 (z-index 1): BIG BACKGROUND NAME TEXT ---------- */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-1">
          <HeroText />
        </div>

        {/* ---------- LAYER 3 (z-index 2): CHARACTER ANIMATION CANVAS ---------- */}
        <div className="relative z-2 w-full flex flex-col items-center justify-center my-auto">
          {/* Subtle Sine Bob on Entire Character Layer */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full max-w-4xl flex justify-center items-center px-2"
          >
            {/* Character Player Component */}
            <CharacterPlayer
              onLoaded={() => setIsCharacterReady(true)}
              totalFrames={150}
              targetFps={24}
              maxWidth="640px"
              className="w-full h-auto transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 drop-shadow-2xl"
            />

            {/* ---------- LAYER 4 (z-index 3): FLOATING BADGES AROUND CHARACTER ---------- */}
            {/* Badge 1: Upper Left near character's raised hand */}
            <div className="absolute top-[6%] left-[2%] sm:left-[6%] lg:left-[10%] xl:left-[14%] z-3 hidden sm:block">
              <FloatingBadge
                icon={Code2}
                title="Full-Stack Developer"
                subtitle="React / Next / Kotlin"
                delay={0.3}
                floatDuration={3.8}
                floatOffset={-9}
                accentColor={theme.accentPrimary}
              />
            </div>

            {/* Badge 2: Mid Right near shoulder */}
            <div className="absolute top-[20%] right-[2%] sm:right-[5%] lg:right-[8%] xl:right-[12%] z-3 hidden sm:block">
              <FloatingBadge
                icon={Sparkles}
                title="AI & Data Science Student"
                subtitle="Machine Learning & Prompts"
                delay={0.6}
                floatDuration={4.4}
                floatOffset={-7}
                accentColor={theme.accentSecondary}
              />
            </div>

            {/* Badge 3: Lower Left */}
            <div className="absolute bottom-[14%] left-[3%] sm:left-[8%] lg:left-[12%] xl:left-[16%] z-3 hidden sm:block">
              <FloatingBadge
                icon={Bot}
                title="Vibe Coder"
                subtitle="Building with AI"
                delay={0.9}
                floatDuration={3.5}
                floatOffset={-10}
                accentColor={theme.accentPrimary}
              />
            </div>
          </motion.div>

          {/* Mobile Floating Badges Inline Strip (Shown on small screens) */}
          <div className="flex sm:hidden flex-wrap justify-center gap-2 mt-4 z-3">
            <FloatingBadge
              icon={Code2}
              title="Full-Stack Dev"
              delay={0.2}
              floatDuration={3.5}
            />
            <FloatingBadge
              icon={Sparkles}
              title="AI & Data Science"
              delay={0.4}
              floatDuration={4.0}
              accentColor={theme.accentSecondary}
            />
            <FloatingBadge
              icon={Bot}
              title="Vibe Coder"
              delay={0.6}
              floatDuration={3.8}
            />
          </div>
        </div>

        {/* ---------- LAYER 4 CONTINUED: FOREGROUND TAGLINE & BUTTONS ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative z-3 w-full max-w-3xl text-center mt-6 sm:mt-8 px-4"
        >
          {/* Main Tagline */}
          <div
            className="text-lg sm:text-2xl font-bold tracking-tight leading-relaxed mb-6 flex flex-col items-center justify-center min-h-[3rem]"
            style={{ color: theme.textPrimary }}
          >
            <TypingText />
            <span
              className="block mt-2 text-sm sm:text-base font-normal opacity-90 max-w-xl mx-auto"
              style={{ color: theme.textSecondary }}
            >
              Turning ideas into working, high-impact digital products with AI & clean code.
            </span>
          </div>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {[
              { icon: Cpu, label: 'IoT & Hardware' },
              { icon: Terminal, label: 'Prompt Engineering' },
              { icon: Zap, label: 'Scalable Apps' },
            ].map((pill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border backdrop-blur-md shadow-xs"
                style={{
                  backgroundColor: `${theme.bgSurface}e0`,
                  borderColor: theme.borderColor,
                  color: theme.textPrimary,
                }}
              >
                <pill.icon className="w-3.5 h-3.5" style={{ color: theme.accentPrimary }} />
                <span>{pill.label}</span>
              </div>
            ))}
          </div>

          {/* Action Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                color: '#ffffff',
                boxShadow: `0 10px 28px -8px ${theme.glowColor}`,
              }}
            >
              <span>Explore Featured Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-sm"
              style={{
                backgroundColor: `${theme.bgSurface}d0`,
                borderColor: theme.borderColor,
                color: theme.textPrimary,
              }}
            >
              <span>Read My Story</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* ================= SCROLL DOWN INDICATOR ================= */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        className="relative z-30 mt-6 flex flex-col items-center gap-1 text-xs font-mono tracking-wider uppercase cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        style={{ color: theme.textSecondary }}
      >
        <span>Scroll to Explore</span>
        <ChevronDown className="w-4 h-4" style={{ color: theme.accentPrimary }} />
      </motion.a>
    </section>
  );
};

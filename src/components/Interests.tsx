import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Brain, Cpu, Globe, Cloud, Code, GitBranch, Rocket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';
import { StaggerText } from './StaggerText';

const INTERESTS = [
  { label: 'Artificial Intelligence', icon: Brain },
  { label: 'Machine Learning', icon: Sparkles },
  { label: 'Internet of Things (IoT)', icon: Cpu },
  { label: 'Full-Stack Web Development', icon: Globe },
  { label: 'Embedded Systems', icon: Code },
  { label: 'Cloud Computing', icon: Cloud },
  { label: 'Software Engineering', icon: Code },
  { label: 'Open Source Development', icon: GitBranch },
  { label: 'Building AI-Powered Applications', icon: Rocket },
];

export const Interests: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="interests" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
        className="max-w-5xl mx-auto"
      >
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.borderColor,
              color: theme.accentPrimary,
            }}
          >
            <Compass className="w-3.5 h-3.5" />
            05. CORE INTERESTS
          </div>

          <StaggerText
            text="Domains of Exploration & Curiosity"
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight justify-center"
            highlightWords={['Exploration', '&', 'Curiosity']}
            highlightStyle={{ color: theme.accentPrimary }}
          />
        </div>

        {/* Animated Chip Tags Flow with Stagger Ripple */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {INTERESTS.map((interest, idx) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 22,
                  delay: idx * 0.06,
                }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => soundEffects.playHover()}
                className="glass-panel px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-md cursor-pointer transition-colors border group"
                style={{
                  backgroundColor: theme.bgSurface,
                  borderColor: theme.borderColor,
                }}
              >
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="p-1.5 rounded-lg"
                  style={{
                    backgroundColor: theme.bgSecondary,
                    color: theme.accentPrimary,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-semibold tracking-tight group-hover:text-indigo-400 transition-colors" style={{ color: theme.textPrimary }}>
                  {interest.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};


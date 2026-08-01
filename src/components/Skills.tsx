import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Code, Cpu, Cloud, Database, Wrench, Sparkles, CheckCircle } from 'lucide-react';
import { SkillCategory } from '../types';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';
import { Parallax3DCard } from './Parallax3DCard';
import { StaggerText } from './StaggerText';

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Core',
    iconName: 'Code',
    description: 'Foundational programming languages & web markup.',
    skills: [
      { name: 'Java', tag: 'OOP & Core' },
      { name: 'Python', tag: 'AI & Scripting' },
      { name: 'C', tag: 'Systems' },
      { name: 'C++', tag: 'Embedded' },
      { name: 'JavaScript', tag: 'Web Engine' },
      { name: 'SQL', tag: 'Relational DB' },
      { name: 'HTML5', tag: 'Semantics' },
      { name: 'CSS3', tag: 'Styling & Motion' },
    ],
  },
  {
    title: 'Web, Cloud & Tools',
    iconName: 'Cloud',
    description: 'Cloud databases, version control & deployment stacks.',
    skills: [
      { name: 'Firebase', tag: 'Auth & Firestore' },
      { name: 'Supabase', tag: 'Postgres & Edge' },
      { name: 'Git & GitHub', tag: 'Version Control' },
      { name: 'Vercel', tag: 'Serverless CD' },
      { name: 'REST APIs', tag: 'Architecture' },
      { name: 'Database Management', tag: 'Schema Design' },
    ],
  },
  {
    title: 'AI, IoT & Craft',
    iconName: 'Cpu',
    description: 'AI integration, hardware systems & problem solving.',
    skills: [
      { name: 'Artificial Intelligence Integration', tag: 'LLM & Prompts' },
      { name: 'Arduino & IoT', tag: 'Sensors & Hardware' },
      { name: 'Full-Stack Development', tag: 'Client & Server' },
      { name: 'UI/UX Design', tag: 'Figma & Tailored UI' },
      { name: 'Problem Solving', tag: 'Algorithms' },
    ],
  },
];

export const Skills: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <div className="mb-16 text-center sm:text-left">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.borderColor,
              color: theme.accentPrimary,
            }}
          >
            <Terminal className="w-3.5 h-3.5" />
            04. TECHNICAL SKILLS
          </div>

          <StaggerText
            text="Comprehensive Tech Arsenal"
            as="h2"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3"
            highlightWords={['Tech', 'Arsenal']}
            highlightStyle={{ color: theme.accentPrimary }}
          />

          <p className="mt-3 text-base sm:text-lg max-w-2xl" style={{ color: theme.textSecondary }}>
            Spanning low-level C/C++ embedded microcontrollers to modern React web frameworks and cloud AI tools.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <Parallax3DCard
              key={category.title}
              depth={15}
              glare={true}
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl h-full"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
              }}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 3 + catIndex * 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="p-3 rounded-2xl border"
                    style={{
                      backgroundColor: theme.bgSecondary,
                      borderColor: theme.borderColor,
                      color: theme.accentPrimary,
                    }}
                  >
                    {category.iconName === 'Code' && <Code className="w-6 h-6" />}
                    {category.iconName === 'Cloud' && <Cloud className="w-6 h-6" />}
                    {category.iconName === 'Cpu' && <Cpu className="w-6 h-6" />}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>{category.title}</h3>
                    <p className="text-xs" style={{ color: theme.textSecondary }}>
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill Items List */}
                <div className="space-y-3 mt-6">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: skillIdx * 0.05 }}
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      onMouseEnter={() => soundEffects.playHover()}
                      className="p-3 rounded-xl border flex items-center justify-between transition-colors cursor-pointer group"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.borderColor,
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          <CheckCircle className="w-4 h-4 shrink-0" style={{ color: theme.accentPrimary }} />
                        </motion.div>
                        <span className="text-sm font-semibold group-hover:text-indigo-400 transition-colors" style={{ color: theme.textPrimary }}>
                          {skill.name}
                        </span>
                      </div>
                      {skill.tag && (
                        <span
                          className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border"
                          style={{
                            backgroundColor: theme.bgSurface,
                            borderColor: theme.borderColor,
                            color: theme.textSecondary,
                          }}
                        >
                          {skill.tag}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div
                className="mt-6 pt-4 border-t text-xs font-mono flex items-center justify-between"
                style={{ borderColor: theme.borderColor, color: theme.textSecondary }}
              >
                <span>Category {catIndex + 1} of 3</span>
                <span className="font-bold" style={{ color: theme.accentPrimary }}>
                  {category.skills.length} Competencies
                </span>
              </div>
            </Parallax3DCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

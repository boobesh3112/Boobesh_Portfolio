import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Sparkles, Code, Cpu, GraduationCap, Zap, CheckCircle2, Clock, BookOpen, Eye, ZoomIn, ZoomOut, RotateCcw, X, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';
import { Parallax3DCard } from './Parallax3DCard';
import { StaggerText } from './StaggerText';
import { ParallaxLayer } from './ParallaxLayer';
import { CircuitLineArt } from './CircuitLineArt';
import ScrollReveal from './ScrollReveal';

export const About: React.FC = () => {
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

  // About Section text content word count & estimated reading time calculation
  const aboutText = `
    Hi I'm Boobesh J a passionate Artificial Intelligence and Data Science student with a strong interest in software development artificial intelligence IoT and full-stack web development I enjoy building practical solutions that solve real-world problems by combining hardware and software technologies.
    My technical expertise includes Java Python C C++ JavaScript SQL HTML CSS Firebase Supabase Git GitHub Vercel and Arduino-based IoT systems. I also work with AI technologies integrating intelligent features into modern web applications and creating innovative user-centric solutions.
    Building software with the soul of a hardware tinkerer and the precision of a modern full-stack craftsman.
    AI & Data Science Student at Karpagam Institute of Technology CGPA 8.0.
    Specialized in Machine Learning algorithms Data Structures & Algorithms Neural Networks Database Systems and Cloud Architectures.
    Full-Stack & Hardware Tinkerer building IoT systems Arduino projects smart hardware integrations and modern high-performance web applications.
    Open-Source & Vibe Coder crafting 28+ live public web apps fandom portals interactive mini-games and AI tools deployed globally.
  `;
  const wordCount = aboutText.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const paragraphVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Parallax Layer */}
      <ParallaxLayer speed={0.35} className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: theme.accentPrimary }}
        />
        <CircuitLineArt />
      </ParallaxLayer>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
        className="max-w-5xl mx-auto"
      >
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap mb-3 justify-center sm:justify-start">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border"
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.borderColor,
                color: theme.accentPrimary,
              }}
            >
              <User className="w-3.5 h-3.5" />
              01. ABOUT ME
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
              <span>~{readingTime} min read ({wordCount} words)</span>
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
            text="Bridging Hardware, Software & Artificial Intelligence"
            as="h2"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
            highlightWords={['Artificial', 'Intelligence']}
            highlightStyle={{ color: theme.accentPrimary }}
          />
        </div>

        {/* SECTION CONTENT LAYOUT (Standard vs Reading Mode) */}
        <AnimatePresence mode="wait">
          {isReadingMode ? (
            <motion.div
              key="reading-mode-about"
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
                    Distraction-Free Reading View
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Font Size Controls */}
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

              {/* Reading Article Body */}
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
                    Boobesh J — Biography & Technical Profile
                  </h3>
                  <p className="text-xs font-mono" style={{ color: theme.textSecondary }}>
                    Artificial Intelligence & Data Science • Karpagam Institute of Technology (CGPA 8.0)
                  </p>
                </div>

                <p>
                  Hi, I'm <strong style={{ color: theme.accentPrimary }}>Boobesh J</strong>, a passionate Artificial Intelligence and Data Science student with a strong interest in software development, artificial intelligence, IoT, and full-stack web development. I enjoy building practical solutions that solve real-world problems by combining hardware and software technologies.
                </p>

                <p>
                  My technical expertise includes <strong className="font-semibold">Java, Python, C, C++, JavaScript, SQL, HTML, CSS, Firebase, Supabase, Git, GitHub, Vercel, and Arduino-based IoT systems</strong>. I also work with AI technologies, integrating intelligent features into modern web applications and creating innovative, user-centric solutions.
                </p>

                {/* Styled Quote */}
                <blockquote
                  className="p-6 rounded-2xl border-l-4 my-6 font-serif italic text-lg sm:text-xl relative"
                  style={{
                    backgroundColor: theme.bgSecondary,
                    borderColor: theme.accentPrimary,
                    color: theme.textPrimary,
                  }}
                >
                  "I consider myself a vibe coder — someone who enjoys rapidly transforming ideas into working products by combining creativity, modern AI tools, and solid engineering practices. I love experimenting, prototyping, and turning concepts into polished applications."
                </blockquote>

                <p>
                  One of my notable projects is <strong style={{ color: theme.accentPrimary }}>AttendX</strong>, a smart attendance management platform designed to simplify attendance tracking with secure authentication, analytics, and an intuitive user experience. I have also developed IoT-based safety systems using sensors, Bluetooth communication, LCD displays, and embedded programming to address real-world challenges.
                </p>

                <p>
                  I'm currently focused on expanding my expertise in <strong className="font-semibold">Artificial Intelligence, Machine Learning, Cloud Technologies, Full-Stack Development, and Embedded Systems</strong>, while seeking opportunities to collaborate on innovative projects, contribute to open-source software, and grow as a software engineer.
                </p>

                {/* Core Focus Areas */}
                <div className="pt-6 border-t" style={{ borderColor: theme.borderColor }}>
                  <h4 className="text-xs font-mono font-bold uppercase mb-4 tracking-wider" style={{ color: theme.accentPrimary }}>
                    Key Engineering Focus Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3.5 rounded-xl border flex items-center gap-2.5" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}>
                      <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>AI & Data Science (CGPA 8.0)</span>
                    </div>
                    <div className="p-3.5 rounded-xl border flex items-center gap-2.5" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}>
                      <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Embedded Systems & Arduino IoT</span>
                    </div>
                    <div className="p-3.5 rounded-xl border flex items-center gap-2.5" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}>
                      <Code className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Full-Stack & Native Mobile</span>
                    </div>
                    <div className="p-3.5 rounded-xl border flex items-center gap-2.5" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}>
                      <Zap className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>28+ Deployed Web Applications</span>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          ) : (
            /* Standard View Grid */
            <motion.div
              key="standard-mode-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
          {/* Main Story Text (8 cols) */}
          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg leading-relaxed" style={{ color: theme.textSecondary }}>
            <motion.p
              custom={0}
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="p-5 rounded-2xl border backdrop-blur-sm shadow-xs"
              style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
            >
              Hi, I'm <strong style={{ color: theme.textPrimary }}>Boobesh J</strong>, a passionate <span className="font-semibold" style={{ color: theme.accentPrimary }}>Artificial Intelligence and Data Science</span> student with a strong interest in software development, artificial intelligence, IoT, and full-stack web development. I enjoy building practical solutions that solve real-world problems by combining hardware and software technologies.
            </motion.p>

            <motion.p
              custom={1}
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="p-5 rounded-2xl border backdrop-blur-sm shadow-xs"
              style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
            >
              My technical expertise includes <span className="font-medium" style={{ color: theme.textPrimary }}>Java, Python, C, C++, JavaScript, SQL, HTML, CSS, Firebase, Supabase, Git, GitHub, Vercel, and Arduino-based IoT systems</span>. I also work with AI technologies, integrating intelligent features into modern web applications and creating innovative, user-centric solutions.
            </motion.p>

            {/* Standalone Highlighted / Animated Vibe Coder Pull-Quote */}
            <motion.div
              custom={2}
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Parallax3DCard
                depth={18}
                glare={true}
                elevation={25}
                className="my-8 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl border group"
                style={{
                  backgroundColor: theme.bgSurface,
                  borderColor: theme.accentPrimary,
                  boxShadow: `0 12px 36px -10px ${theme.glowColor}`,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: theme.accentSecondary }}
                />
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-2xl text-white shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                    }}
                  >
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono font-bold tracking-widest uppercase mb-2 flex items-center gap-1.5"
                      style={{ color: theme.accentPrimary }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      THE VIBE CODER PHILOSOPHY
                    </div>
                    <ScrollReveal
                      baseOpacity={0.15}
                      enableBlur={true}
                      baseRotation={2}
                      blurStrength={6}
                      textClassName="text-lg sm:text-xl font-bold tracking-tight leading-snug italic"
                      containerClassName="my-2"
                    >
                      I consider myself a vibe coder — someone who enjoys rapidly transforming ideas into working products by combining creativity, modern AI tools, and solid engineering practices. I love experimenting, prototyping, and turning concepts into polished applications.
                    </ScrollReveal>
                  </div>
                </div>
              </Parallax3DCard>
            </motion.div>

            <motion.p
              custom={3}
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="p-5 rounded-2xl border backdrop-blur-sm shadow-xs"
              style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
            >
              One of my notable projects is <strong style={{ color: theme.textPrimary }}>AttendX</strong>, a smart attendance management platform designed to simplify attendance tracking with secure authentication, analytics, and an intuitive user experience. I have also developed IoT-based safety systems using sensors, Bluetooth communication, LCD displays, and embedded programming to address real-world challenges.
            </motion.p>

            <motion.p
              custom={4}
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="p-5 rounded-2xl border backdrop-blur-sm shadow-xs"
              style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
            >
              I enjoy exploring emerging technologies, participating in hackathons, and continuously improving my skills through hands-on projects. I believe in writing clean, efficient code while building applications that are both functional and enjoyable to use.
            </motion.p>

            <motion.p
              custom={5}
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="p-5 rounded-2xl border backdrop-blur-sm shadow-xs"
              style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
            >
              I'm currently focused on expanding my expertise in <span className="font-semibold" style={{ color: theme.accentPrimary }}>Artificial Intelligence, Machine Learning, Cloud Technologies, Full-Stack Development, and Embedded Systems</span>, while seeking opportunities to collaborate on innovative projects, contribute to open-source software, and grow as a software engineer.
            </motion.p>
          </div>

          {/* Quick Highlights / Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card 1 */}
            <Parallax3DCard
              depth={15}
              glare={true}
              elevation={15}
              className="p-6 rounded-2xl border backdrop-blur-md"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: theme.bgSecondary, color: theme.accentPrimary }}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: theme.textPrimary }}>
                AI & Data Science
              </h3>
              <p className="text-xs font-mono" style={{ color: theme.textSecondary }}>
                Undergraduate degree pursuing AI, ML algorithms, statistics & predictive analytics.
              </p>
            </Parallax3DCard>

            {/* Card 2 */}
            <Parallax3DCard
              depth={15}
              glare={true}
              elevation={15}
              className="p-6 rounded-2xl border backdrop-blur-md"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: theme.bgSecondary, color: theme.accentSecondary }}
              >
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: theme.textPrimary }}>
                IoT & Embedded
              </h3>
              <p className="text-xs font-mono" style={{ color: theme.textSecondary }}>
                Arduino, Bluetooth sensors, LCD screens, hardware-software integration.
              </p>
            </Parallax3DCard>

            {/* Card 3 */}
            <Parallax3DCard
              depth={15}
              glare={true}
              elevation={15}
              className="p-6 rounded-2xl border backdrop-blur-md"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: theme.bgSecondary, color: theme.accentPrimary }}
              >
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1" style={{ color: theme.textPrimary }}>
                Full-Stack & Mobile
              </h3>
              <p className="text-xs font-mono" style={{ color: theme.textSecondary }}>
                React, TypeScript, Jetpack Compose, Supabase, Firebase, Tailwind CSS.
              </p>
            </Parallax3DCard>

            {/* Quick Summary Pill List */}
            <div
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
            >
              <div className="text-xs font-mono font-bold uppercase mb-3" style={{ color: theme.accentPrimary }}>
                Key Focus Areas
              </div>
              <ul className="space-y-2 text-xs font-medium" style={{ color: theme.textPrimary }}>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentPrimary }} />
                  Smart Attendance & Web Apps
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentPrimary }} />
                  Biogas & Waste IoT Dashboards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentPrimary }} />
                  Native Android (Jetpack Compose)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentPrimary }} />
                  Rapid AI Prototyping
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
      </motion.div>
    </section>
  );
};


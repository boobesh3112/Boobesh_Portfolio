import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  Layers,
  Activity,
  Dices,
  Grid3X3,
  Flame,
  ArrowUpRight,
  Tv,
  Gamepad2,
  Code2,
  Search,
  X,
  Filter,
  Terminal,
  FileCode,
  Cpu,
  Server,
  Layout,
  Zap,
  Palette,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';
import { Parallax3DCard } from './Parallax3DCard';
import { FlipProjectCard } from './FlipProjectCard';
import { ParallaxLayer } from './ParallaxLayer';
import { TiltCard } from './TiltCard';
import { StaggerText } from './StaggerText';
import {
  FULL_STACK_PROJECTS,
  FANDOM_PROJECTS,
  MINI_GAME_PROJECTS,
  FullStackProject,
  FandomProject,
  GameProject,
} from '../data/projectsData';

type TabCategory = 'Full-Stack Apps' | 'Anime & Fandom' | 'Mini Games';

const getTechBadgeMeta = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) {
    return { icon: Code2, badgeClass: 'bg-sky-500/15 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/40' };
  }
  if (t.includes('python')) {
    return { icon: Terminal, badgeClass: 'bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/40' };
  }
  if (t.includes('ai') || t.includes('gemini') || t.includes('ml')) {
    return { icon: Sparkles, badgeClass: 'bg-amber-500/15 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/40' };
  }
  if (t.includes('firebase') || t.includes('supabase') || t.includes('database')) {
    return { icon: Flame, badgeClass: 'bg-orange-500/15 dark:bg-orange-500/10 text-orange-800 dark:text-orange-300 border-orange-500/40' };
  }
  if (t.includes('tailwind') || t.includes('css')) {
    return { icon: Palette, badgeClass: 'bg-teal-500/15 dark:bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-500/40' };
  }
  if (t.includes('ts') || t.includes('typescript') || t.includes('js') || t.includes('javascript')) {
    return { icon: FileCode, badgeClass: 'bg-yellow-500/15 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-300 border-yellow-500/40' };
  }
  if (t.includes('iot') || t.includes('arduino') || t.includes('hardware')) {
    return { icon: Cpu, badgeClass: 'bg-purple-500/15 dark:bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/40' };
  }
  if (t.includes('node') || t.includes('express') || t.includes('backend') || t.includes('api')) {
    return { icon: Server, badgeClass: 'bg-green-500/15 dark:bg-green-500/10 text-green-800 dark:text-green-300 border-green-500/40' };
  }
  if (t.includes('html') || t.includes('canvas')) {
    return { icon: Layout, badgeClass: 'bg-rose-500/15 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/40' };
  }
  return { icon: Zap, badgeClass: 'bg-indigo-500/15 dark:bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/40' };
};

export const TechBadge: React.FC<{ tech: string }> = ({ tech }) => {
  const { icon: BadgeIcon, badgeClass } = getTechBadgeMeta(tech);
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0.8 }}
      whileHover={{ scale: 1.1, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border transition-all duration-200 cursor-default shadow-xs ${badgeClass}`}
    >
      <BadgeIcon className="w-3 h-3 shrink-0" />
      <span>{tech}</span>
    </motion.span>
  );
};

const TABS: { id: TabCategory; count: number; icon: React.ElementType }[] = [
  { id: 'Full-Stack Apps', count: FULL_STACK_PROJECTS.length, icon: Layers },
  { id: 'Anime & Fandom', count: FANDOM_PROJECTS.length, icon: Tv },
  { id: 'Mini Games', count: MINI_GAME_PROJECTS.length, icon: Gamepad2 },
];

export const Projects: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabCategory>('Full-Stack Apps');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reset category filter when main tab changes
  const handleTabChange = (tab: TabCategory) => {
    setActiveTab(tab);
    setSelectedCategory('All');
  };

  // Full-Stack Categories
  const fullStackCategories = [
    'All',
    ...Array.from(new Set(FULL_STACK_PROJECTS.map((p) => p.category || 'Other'))),
  ];

  // Fandom Categories
  const fandomCategories = [
    'All',
    ...Array.from(new Set(FANDOM_PROJECTS.map((p) => p.category || 'Fandom'))),
  ];

  // Search filtering logic across tech stack, titles, taglines, categories & keywords
  const query = searchQuery.trim().toLowerCase();

  const searchMatchesFullStack = (p: FullStackProject) => {
    if (!query) return true;
    return (
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      p.techStack.some((tech) => tech.toLowerCase().includes(query))
    );
  };

  const searchMatchesFandom = (p: FandomProject) => {
    if (!query) return true;
    return (
      p.title.toLowerCase().includes(query) ||
      p.subTag.toLowerCase().includes(query) ||
      (p.category && p.category.toLowerCase().includes(query))
    );
  };

  const searchMatchesGame = (p: GameProject) => {
    if (!query) return true;
    return (
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.gameType.toLowerCase().includes(query) ||
      p.techStack.some((tech) => tech.toLowerCase().includes(query))
    );
  };

  const filteredFullStack = FULL_STACK_PROJECTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesCat && searchMatchesFullStack(p);
  });

  const filteredFandom = FANDOM_PROJECTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesCat && searchMatchesFandom(p);
  });

  const filteredGames = MINI_GAME_PROJECTS.filter((p) => searchMatchesGame(p));

  const popularKeywords = ['React', 'Python', 'Tailwind', 'Firebase', 'IoT', 'Itachi', 'Sharingan', 'TypeScript'];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow parallax layer */}
      <ParallaxLayer speed={0.35} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: theme.accentPrimary }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: theme.accentSecondary }}
        />
      </ParallaxLayer>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.borderColor,
              color: theme.accentPrimary,
            }}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            02. FEATURED PROJECTS GALLERY
          </div>
          
          <StaggerText
            text="Projects Showcase"
            as="h2"
            className="text-3xl sm:text-5xl font-black tracking-tight mb-3 justify-center"
            highlightWords={['Showcase']}
            highlightStyle={{ color: theme.accentPrimary }}
          />

          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: theme.textSecondary }}>
            Explore 28 real, live deployed applications — spanning full-stack platforms, fandom UI experiences, and interactive browser games.
          </p>
        </div>

        {/* Search Bar & Keywords Filter */}
        <div className="max-w-2xl mx-auto mb-8 px-2">
          <div
            className="relative flex items-center rounded-2xl border backdrop-blur-md shadow-sm transition-all focus-within:shadow-md focus-within:border-indigo-400"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderColor,
            }}
          >
            <Search className="w-4 h-4 ml-4 shrink-0" style={{ color: theme.textSecondary }} />
            <input
              id="project-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tech stack (e.g. React, Python), keywords..."
              className="w-full py-3 px-3 bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
              style={{ color: theme.textPrimary }}
            />
            {!searchQuery && (
              <kbd
                className="hidden sm:inline-block px-2 py-0.5 mr-3 rounded text-[10px] font-mono font-bold border shrink-0 opacity-70"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.textSecondary,
                }}
              >
                / or ⌘K
              </kbd>
            )}
            {searchQuery && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setSearchQuery('');
                }}
                className="p-1 mr-3 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                style={{ color: theme.textSecondary }}
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Popular Search Keywords */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 mt-3">
            <span className="text-[11px] font-mono font-medium flex items-center gap-1" style={{ color: theme.textSecondary }}>
              <Filter className="w-3 h-3 text-indigo-400" /> Quick Filter:
            </span>
            {popularKeywords.map((kw) => {
              const isSelected = searchQuery.toLowerCase() === kw.toLowerCase();
              return (
                <button
                  key={kw}
                  onClick={() => {
                    soundEffects.playClick();
                    setSearchQuery(isSelected ? '' : kw);
                  }}
                  className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg border transition-all hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? theme.accentPrimary : theme.bgSecondary,
                    borderColor: isSelected ? theme.accentPrimary : theme.borderColor,
                    color: isSelected ? '#ffffff' : theme.textSecondary,
                  }}
                >
                  #{kw}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pill Tabs Navigation */}
        <div className="flex justify-center mb-6">
          <div
            className="inline-flex p-1.5 rounded-2xl border backdrop-blur-md max-w-full overflow-x-auto gap-1 sm:gap-2"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.borderColor,
            }}
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onMouseEnter={() => soundEffects.playHover()}
                  onClick={() => {
                    soundEffects.playToggle();
                    handleTabChange(tab.id);
                  }}
                  className="relative px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer z-10"
                  style={{
                    color: isActive ? '#ffffff' : theme.textSecondary,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute inset-0 rounded-xl shadow-lg -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{tab.id}</span>
                  <span
                    className="px-2 py-0.5 text-[10px] font-mono rounded-full font-extrabold"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : theme.bgSurface,
                      color: isActive ? '#ffffff' : theme.textPrimary,
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-Category Filter Chips Bar */}
        {(activeTab === 'Full-Stack Apps' || activeTab === 'Anime & Fandom') && (
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {(activeTab === 'Full-Stack Apps' ? fullStackCategories : fandomCategories).map(
              (cat) => {
                const isCatActive = selectedCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => soundEffects.playHover()}
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedCategory(cat);
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border cursor-pointer"
                    style={{
                      backgroundColor: isCatActive ? theme.accentPrimary : theme.bgSurface,
                      borderColor: isCatActive ? theme.accentPrimary : theme.borderColor,
                      color: isCatActive ? '#ffffff' : theme.textSecondary,
                      boxShadow: isCatActive ? `0 4px 14px ${theme.glowColor}` : 'none',
                    }}
                  >
                    {cat}
                  </motion.button>
                );
              }
            )}
          </div>
        )}

        {/* Animated Grid Container with Exit / Enter Transitions */}
        <AnimatePresence mode="wait">
          {/* TAB 1: FULL-STACK APPS */}
          {activeTab === 'Full-Stack Apps' && (
            <motion.div
              key={`full-stack-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {filteredFullStack.length === 0 ? (
                <div
                  className="p-12 text-center rounded-3xl border max-w-md mx-auto my-8"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
                >
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-40" style={{ color: theme.textSecondary }} />
                  <p className="font-bold text-base mb-1" style={{ color: theme.textPrimary }}>
                    No matching full-stack apps found
                  </p>
                  <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
                    Try searching for different keywords or tech stack (e.g. React, Python, Firebase).
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer"
                    style={{ backgroundColor: theme.accentPrimary }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredFullStack.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 22,
                        delay: (index % 6) * 0.08,
                      }}
                    >
                      <FlipProjectCard project={project} index={index} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: ANIME & FANDOM */}
          {activeTab === 'Anime & Fandom' && (
            <motion.div
              key={`fandom-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Intro Line */}
              <div className="mb-8 text-center max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm font-mono font-medium" style={{ color: theme.textSecondary }}>
                  Frontend practice, fandom style — themed UI builds exploring animation, motion design, and visual storytelling across different franchises.
                </p>
              </div>

              {filteredFandom.length === 0 ? (
                <div
                  className="p-12 text-center rounded-3xl border max-w-md mx-auto my-8"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
                >
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-40" style={{ color: theme.textSecondary }} />
                  <p className="font-bold text-base mb-1" style={{ color: theme.textPrimary }}>
                    No matching fandom projects found
                  </p>
                  <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
                    Try searching for character names or tags (e.g. Itachi, Shinigami, Leaf Village).
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer"
                    style={{ backgroundColor: theme.accentPrimary }}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                /* Dense Poster-Style Responsive Grid */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {filteredFandom.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="glass-panel p-4 rounded-2xl flex flex-col justify-between border group relative overflow-hidden transition-all duration-300 cursor-pointer"
                      style={{
                        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                      }}
                    >
                      {/* Themed Glow Tint on Hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <div
                        className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
                        style={{ backgroundColor: item.accentColor }}
                      />

                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                          style={{
                            backgroundColor: theme.bgSecondary,
                            borderColor: theme.borderColor,
                            color: item.accentColor,
                          }}
                        >
                          {item.subTag}
                        </span>
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ color: item.accentColor }}
                        />
                      </div>

                      <div className="relative z-10 mt-2">
                        <h4 className="font-extrabold text-base sm:text-lg tracking-tight mb-1" style={{ color: theme.textPrimary }}>
                          {item.title}
                        </h4>
                        <div className="text-[11px] font-mono flex items-center gap-1 group-hover:underline" style={{ color: theme.textSecondary }}>
                          <span>Explore Showcase</span>
                        </div>
                      </div>

                      {/* Bottom Colored Accent Bar */}
                      <div
                        className="w-full h-1 rounded-full mt-4 transition-all duration-300 group-hover:h-1.5"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: MINI GAMES */}
          {activeTab === 'Mini Games' && (
            <motion.div
              key={`games-${searchQuery}`}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Intro Line */}
              <div className="mb-8 text-center max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm font-mono font-medium" style={{ color: theme.textSecondary }}>
                  Browser games built for fun and for the front-end challenge — state management, game logic, and satisfying interaction design.
                </p>
              </div>

              {filteredGames.length === 0 ? (
                <div
                  className="p-12 text-center rounded-3xl border max-w-md mx-auto my-8"
                  style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
                >
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-40" style={{ color: theme.textSecondary }} />
                  <p className="font-bold text-base mb-1" style={{ color: theme.textPrimary }}>
                    No matching mini games found
                  </p>
                  <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
                    Try searching for game types or keywords (e.g. Ludo, Candy, React).
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer"
                    style={{ backgroundColor: theme.accentPrimary }}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                /* Game Cards Grid */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {filteredGames.map((game) => (
                    <Parallax3DCard
                      key={game.id}
                      disabled={true}
                      depth={0}
                      glare={false}
                      className="glass-panel p-6 sm:p-7 rounded-3xl flex flex-col justify-between border group relative overflow-hidden shadow-xl"
                      style={{
                        backgroundColor: theme.bgSurface,
                        borderColor: theme.borderColor,
                      }}
                    >
                      {/* Background Game Glow */}
                      <div
                        className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-15 group-hover:opacity-35 transition-opacity pointer-events-none"
                        style={{ backgroundColor: theme.accentPrimary }}
                      />

                      <div>
                        {/* Game Interactive Animated Preview Icon Header */}
                        <div className="flex items-center justify-between mb-5">
                          <span
                            className="text-[11px] font-mono font-bold px-3 py-1 rounded-full border"
                            style={{
                              backgroundColor: theme.bgSecondary,
                              borderColor: theme.borderColor,
                              color: theme.accentPrimary,
                            }}
                          >
                            PLAYABLE MINI GAME
                          </span>

                          {/* Custom Animated Game Preview Icon */}
                          <div
                            className="p-3.5 rounded-2xl border transition-all duration-300 group-hover:scale-110 shadow-md flex items-center justify-center"
                            style={{
                              backgroundColor: theme.bgSecondary,
                              borderColor: theme.accentPrimary,
                              color: theme.accentPrimary,
                            }}
                          >
                            {game.gameType === 'ludo' && (
                              <motion.div
                                whileHover={{ rotate: 180, scale: 1.1 }}
                                transition={{ duration: 0.5, type: 'spring' }}
                              >
                                <Dices className="w-7 h-7" />
                              </motion.div>
                            )}
                            {game.gameType === 'tictactoe' && (
                              <motion.div
                                whileHover={{ scale: 1.15 }}
                                className="grid grid-cols-2 gap-1"
                              >
                                <div className="w-2.5 h-2.5 rounded-xs bg-indigo-500 animate-pulse" />
                                <div className="w-2.5 h-2.5 rounded-xs bg-violet-500" />
                                <div className="w-2.5 h-2.5 rounded-xs bg-violet-500" />
                                <div className="w-2.5 h-2.5 rounded-xs bg-indigo-500 animate-pulse" />
                              </motion.div>
                            )}
                            {game.gameType === 'candycrush' && (
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                              >
                                <Flame className="w-7 h-7 text-amber-500" />
                              </motion.div>
                            )}
                          </div>
                        </div>

                        <h3
                          className="text-2xl font-black tracking-tight mb-2 group-hover:text-amber-400 transition-colors"
                          style={{ color: theme.textPrimary }}
                        >
                          {game.title}
                        </h3>

                        <p
                          className="text-xs sm:text-sm leading-relaxed mb-6"
                          style={{ color: theme.textSecondary }}
                        >
                          {game.tagline}
                        </p>
                      </div>

                      <div>
                        {/* Live Tech Pills with Visual Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {game.techStack.map((tech) => (
                            <TechBadge key={tech} tech={tech} />
                          ))}
                        </div>

                        {/* Play Game / View Demo Button */}
                        <motion.a
                          href={game.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all duration-300 group/btn shadow-md relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                            color: '#ffffff',
                            borderColor: 'transparent',
                            boxShadow: `0 8px 20px -6px ${theme.glowColor}`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                          <Gamepad2 className="w-4 h-4 animate-bounce" />
                          <span className="tracking-wide uppercase font-extrabold text-[11px]">View Demo & Play Game</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </motion.a>
                      </div>
                    </Parallax3DCard>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

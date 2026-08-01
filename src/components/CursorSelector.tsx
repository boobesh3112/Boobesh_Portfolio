import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MousePointerClick,
  Sparkles,
  Shuffle,
  RotateCw,
  X,
  Check,
  Zap,
  Grid,
  Filter,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCursor, CURSORS_LIST } from '../context/CursorContext';

const CATEGORIES = [
  'All',
  'Tech & Cyber',
  'Anime & Fandom',
  'Gaming & Fun',
  'Minimal & Luxury',
] as const;

export const CursorSelector: React.FC = () => {
  const { theme } = useTheme();
  const {
    activeCursorId,
    setActiveCursorId,
    isAutoDynamic,
    setIsAutoDynamic,
    randomizeCursor,
    activeCursorDef,
  } = useCursor();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredCursors = CURSORS_LIST.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* Expanded Cursor Picker Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="glass-panel p-4 sm:p-5 rounded-3xl shadow-2xl border max-w-sm sm:max-w-md w-80 sm:w-96 space-y-4 mb-2 backdrop-blur-2xl"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderColor,
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: theme.borderColor }}>
              <div className="flex items-center gap-2">
                <div
                  className="p-2 rounded-xl border"
                  style={{
                    backgroundColor: theme.bgSecondary,
                    borderColor: theme.borderColor,
                    color: theme.accentPrimary,
                  }}
                >
                  <MousePointerClick className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight" style={{ color: theme.textPrimary }}>
                    25 Dynamic Cursors
                  </h3>
                  <p className="text-[10px] font-mono" style={{ color: theme.textSecondary }}>
                    Current: <span className="font-bold" style={{ color: theme.accentPrimary }}>{activeCursorDef.name}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/10 transition-colors"
                style={{ color: theme.textSecondary }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Controls Row: Auto-Switch & Randomize */}
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <button
                onClick={() => setIsAutoDynamic(!isAutoDynamic)}
                className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-all ${
                  isAutoDynamic ? 'shadow-md scale-102' : 'opacity-80 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isAutoDynamic ? theme.accentPrimary : theme.bgSecondary,
                  borderColor: isAutoDynamic ? theme.accentPrimary : theme.borderColor,
                  color: isAutoDynamic ? '#ffffff' : theme.textPrimary,
                }}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoDynamic ? 'animate-spin' : ''}`} />
                <span>Auto Switch {isAutoDynamic ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={randomizeCursor}
                className="px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.accentPrimary,
                }}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Randomize</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold whitespace-nowrap transition-colors"
                  style={{
                    backgroundColor: selectedCategory === cat ? theme.accentPrimary : theme.bgSecondary,
                    color: selectedCategory === cat ? '#ffffff' : theme.textSecondary,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scrollable Cursors Grid (25 Cursors) */}
            <div className="max-h-60 overflow-y-auto grid grid-cols-2 gap-2 pr-1 custom-scrollbar">
              {filteredCursors.map((cursorDef) => {
                const isActive = activeCursorId === cursorDef.id;

                return (
                  <button
                    key={cursorDef.id}
                    onClick={() => {
                      setActiveCursorId(cursorDef.id);
                      setIsAutoDynamic(false);
                    }}
                    className={`p-2.5 rounded-xl text-left border flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                      isActive ? 'shadow-md' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: isActive ? theme.bgSecondary : theme.bgSurface,
                      borderColor: isActive ? cursorDef.accentColor : theme.borderColor,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block shadow-xs"
                        style={{ backgroundColor: cursorDef.accentColor }}
                      />
                      {isActive && (
                        <Check className="w-3.5 h-3.5" style={{ color: cursorDef.accentColor }} />
                      )}
                    </div>
                    <div className="font-bold text-xs truncate" style={{ color: theme.textPrimary }}>
                      {cursorDef.name}
                    </div>
                    <div className="text-[9px] font-mono opacity-70 truncate" style={{ color: theme.textSecondary }}>
                      {cursorDef.category}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel px-3.5 py-2 rounded-full shadow-2xl border flex items-center gap-2 backdrop-blur-xl cursor-pointer"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderColor,
          color: theme.textPrimary,
        }}
        title="Choose from 25 Animated Dynamic Cursors"
      >
        <div
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: activeCursorDef.accentColor }}
        />
        <MousePointerClick className="w-4 h-4" style={{ color: activeCursorDef.accentColor }} />
        <span className="text-xs font-mono font-bold hidden sm:inline" style={{ color: theme.textPrimary }}>
          Cursor: {activeCursorDef.name}
        </span>
        <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accentSecondary }} />
      </motion.button>
    </div>
  );
};

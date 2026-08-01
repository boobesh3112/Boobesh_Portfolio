import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Shuffle, Dices, ChevronUp, Check, Palette } from 'lucide-react';
import { useTheme, DYNAMIC_PRESETS } from '../context/ThemeContext';
import { Mode, DynamicPresetKey } from '../types';
import { soundEffects } from '../utils/soundEffects';

export const ThemeToggle: React.FC = () => {
  const { mode, setMode, activePresetKey, theme, rerollDynamicTheme } = useTheme();
  const [expandedMenu, setExpandedMenu] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Dynamic Presets Submenu Drawer */}
      <AnimatePresence>
        {expandedMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="glass-panel p-3 rounded-2xl shadow-2xl border max-w-xs w-64 space-y-2 mb-1"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderColor,
            }}
          >
            <div className="flex items-center justify-between px-2 pb-2 border-b" style={{ borderColor: theme.borderColor }}>
              <span className="text-xs font-mono font-bold uppercase" style={{ color: theme.textSecondary }}>
                10 Dynamic Presets
              </span>
              <button
                onMouseEnter={() => soundEffects.playHover()}
                onClick={() => {
                  soundEffects.playToggle();
                  rerollDynamicTheme();
                }}
                className="text-[10px] font-mono px-2 py-1 rounded-md border flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.accentPrimary,
                }}
              >
                <Shuffle className="w-3 h-3" /> Randomize
              </button>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {Object.values(DYNAMIC_PRESETS).map((preset) => (
                <button
                  key={preset.key}
                  onMouseEnter={() => soundEffects.playHover()}
                  onClick={() => {
                    soundEffects.playToggle();
                    setMode('dynamic');
                    useTheme().rerollDynamicTheme();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    activePresetKey === preset.key && mode === 'dynamic'
                      ? 'font-bold'
                      : ''
                  }`}
                  style={{
                    backgroundColor:
                      activePresetKey === preset.key && mode === 'dynamic'
                        ? theme.bgSecondary
                        : 'transparent',
                    color: theme.textPrimary,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ background: `linear-gradient(135deg, ${preset.accentPrimary}, ${preset.accentSecondary})` }}
                    />
                    {preset.name}
                  </span>
                  {activePresetKey === preset.key && mode === 'dynamic' && (
                    <Check className="w-3.5 h-3.5" style={{ color: theme.accentPrimary }} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glassy Pill Toggle */}
      <motion.div
        layout
        className="glass-panel p-1.5 rounded-full shadow-2xl border flex items-center gap-1 backdrop-blur-xl"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderColor,
        }}
      >
        {/* Light Mode Button */}
        <button
          onMouseEnter={() => soundEffects.playHover()}
          onClick={(e) => {
            soundEffects.playToggle();
            const rect = e.currentTarget.getBoundingClientRect();
            window.dispatchEvent(
              new CustomEvent('theme-transition', {
                detail: {
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                  accentColor: '#6366f1',
                  isDynamic: false,
                },
              })
            );
            setMode('light');
            setExpandedMenu(false);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
            mode === 'light' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: mode === 'light' ? theme.bgSecondary : 'transparent',
            color: mode === 'light' ? theme.accentPrimary : theme.textSecondary,
          }}
          title="Light Theme"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Light</span>
        </button>

        {/* Dark Mode Button */}
        <button
          onMouseEnter={() => soundEffects.playHover()}
          onClick={(e) => {
            soundEffects.playToggle();
            const rect = e.currentTarget.getBoundingClientRect();
            window.dispatchEvent(
              new CustomEvent('theme-transition', {
                detail: {
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                  accentColor: '#a855f7',
                  isDynamic: false,
                },
              })
            );
            setMode('dark');
            setExpandedMenu(false);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
            mode === 'dark' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: mode === 'dark' ? theme.bgSecondary : 'transparent',
            color: mode === 'dark' ? theme.accentPrimary : theme.textSecondary,
          }}
          title="Dark Theme"
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dark</span>
        </button>

        {/* Dynamic Mode Button */}
        <button
          onMouseEnter={() => soundEffects.playHover()}
          onClick={(e) => {
            soundEffects.playToggle();
            const rect = e.currentTarget.getBoundingClientRect();
            window.dispatchEvent(
              new CustomEvent('theme-transition', {
                detail: {
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                  accentColor: theme.accentPrimary,
                  isDynamic: true,
                },
              })
            );
            if (mode !== 'dynamic') {
              setMode('dynamic');
            } else {
              rerollDynamicTheme();
            }
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
            mode === 'dynamic' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            background:
              mode === 'dynamic'
                ? `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`
                : 'transparent',
            color: mode === 'dynamic' ? '#ffffff' : theme.textSecondary,
          }}
          title="Dynamic Random Theme (Click to Shuffle)"
        >
          <Dices className="w-3.5 h-3.5" />
          <span>
            {mode === 'dynamic' && theme.badgeText ? theme.badgeText : 'Dynamic'}
          </span>
        </button>

        {/* Preset Selector Toggle Arrow */}
        <button
          onMouseEnter={() => soundEffects.playHover()}
          onClick={() => {
            soundEffects.playClick();
            setExpandedMenu(!expandedMenu);
          }}
          className="p-1.5 rounded-full border transition-transform hover:scale-110 cursor-pointer"
          style={{
            backgroundColor: theme.bgSecondary,
            borderColor: theme.borderColor,
            color: theme.textPrimary,
          }}
          title="View all 10 Dynamic Presets"
        >
          <ChevronUp
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              expandedMenu ? 'rotate-180' : ''
            }`}
          />
        </button>
      </motion.div>
    </div>
  );
};

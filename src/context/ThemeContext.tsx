import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Mode, DynamicPresetKey, ThemeColors } from '../types';

export const LIGHT_THEME: ThemeColors = {
  name: 'Clean Light',
  key: 'light',
  isDark: false,
  bgPrimary: '#f8fafc',
  bgSecondary: '#f1f5f9',
  bgSurface: '#ffffff',
  bgSurfaceHover: '#f8fafc',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  accentPrimary: '#6366f1',
  accentSecondary: '#8b5cf6',
  borderColor: '#e2e8f0',
  glowColor: 'rgba(99, 102, 241, 0.15)',
};

export const DARK_THEME: ThemeColors = {
  name: 'Deep Glass Dark',
  key: 'dark',
  isDark: true,
  bgPrimary: '#0b0f19',
  bgSecondary: '#111827',
  bgSurface: 'rgba(17, 24, 39, 0.7)',
  bgSurfaceHover: 'rgba(31, 41, 55, 0.8)',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  accentPrimary: '#6366f1',
  accentSecondary: '#a855f7',
  borderColor: 'rgba(255, 255, 255, 0.12)',
  glowColor: 'rgba(168, 85, 247, 0.25)',
};

export const DYNAMIC_PRESETS: Record<DynamicPresetKey, ThemeColors> = {
  cyberpunk: {
    name: 'Cyberpunk Neon',
    key: 'cyberpunk',
    isDark: true,
    bgPrimary: '#090a0f',
    bgSecondary: '#12131c',
    bgSurface: 'rgba(18, 19, 28, 0.75)',
    bgSurfaceHover: 'rgba(28, 30, 45, 0.85)',
    textPrimary: '#ffffff',
    textSecondary: '#a0a5c0',
    accentPrimary: '#ff007f',
    accentSecondary: '#00f3ff',
    borderColor: 'rgba(0, 243, 255, 0.25)',
    glowColor: 'rgba(255, 0, 127, 0.35)',
    badgeText: '⚡ Cyberpunk Neon',
  },
  sunset: {
    name: 'Sunset Gradient',
    key: 'sunset',
    isDark: true,
    bgPrimary: '#0f0914',
    bgSecondary: '#1a0e24',
    bgSurface: 'rgba(26, 14, 36, 0.75)',
    bgSurfaceHover: 'rgba(42, 20, 58, 0.85)',
    textPrimary: '#fff7ed',
    textSecondary: '#cbd5e1',
    accentPrimary: '#f97316',
    accentSecondary: '#ec4899',
    borderColor: 'rgba(249, 115, 22, 0.25)',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    badgeText: '🌅 Sunset Gradient',
  },
  emerald: {
    name: 'Forest Emerald',
    key: 'emerald',
    isDark: true,
    bgPrimary: '#05140d',
    bgSecondary: '#0a2318',
    bgSurface: 'rgba(10, 35, 24, 0.75)',
    bgSurfaceHover: 'rgba(16, 52, 36, 0.85)',
    textPrimary: '#f0fdf4',
    textSecondary: '#a7f3d0',
    accentPrimary: '#10b981',
    accentSecondary: '#f59e0b',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    badgeText: '🌲 Forest Emerald',
  },
  ocean: {
    name: 'Ocean Teal',
    key: 'ocean',
    isDark: true,
    bgPrimary: '#04161d',
    bgSecondary: '#082631',
    bgSurface: 'rgba(8, 38, 49, 0.75)',
    bgSurfaceHover: 'rgba(13, 58, 74, 0.85)',
    textPrimary: '#ecfeff',
    textSecondary: '#a5f3fc',
    accentPrimary: '#06b6d4',
    accentSecondary: '#22d3ee',
    borderColor: 'rgba(34, 211, 238, 0.25)',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    badgeText: '🌊 Ocean Teal',
  },
  monochrome: {
    name: 'Monochrome',
    key: 'monochrome',
    isDark: true,
    bgPrimary: '#09090b',
    bgSecondary: '#18181b',
    bgSurface: 'rgba(24, 24, 27, 0.8)',
    bgSurfaceHover: 'rgba(39, 39, 42, 0.9)',
    textPrimary: '#ffffff',
    textSecondary: '#a1a1aa',
    accentPrimary: '#f4f4f5',
    accentSecondary: '#71717a',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    glowColor: 'rgba(255, 255, 255, 0.15)',
    badgeText: '☯️ Monochrome',
  },
  terminal: {
    name: 'Retro Terminal',
    key: 'terminal',
    isDark: true,
    bgPrimary: '#050805',
    bgSecondary: '#0d160d',
    bgSurface: 'rgba(13, 22, 13, 0.85)',
    bgSurfaceHover: 'rgba(20, 36, 20, 0.9)',
    textPrimary: '#4ade80',
    textSecondary: '#22c55e',
    accentPrimary: '#22c55e',
    accentSecondary: '#86efac',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    glowColor: 'rgba(34, 197, 94, 0.35)',
    fontFamily: "'JetBrains Mono', monospace",
    badgeText: '📟 Retro Terminal',
  },
  aurora: {
    name: 'Aurora',
    key: 'aurora',
    isDark: true,
    bgPrimary: '#080c16',
    bgSecondary: '#101728',
    bgSurface: 'rgba(16, 23, 40, 0.75)',
    bgSurfaceHover: 'rgba(26, 37, 62, 0.85)',
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    accentPrimary: '#10b981',
    accentSecondary: '#a855f7',
    borderColor: 'rgba(168, 85, 247, 0.25)',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    badgeText: '🌌 Aurora Glow',
  },
  coral: {
    name: 'Coral Peach',
    key: 'coral',
    isDark: false,
    bgPrimary: '#fffbf7',
    bgSecondary: '#fdf2eb',
    bgSurface: '#ffffff',
    bgSurfaceHover: '#fff5f0',
    textPrimary: '#292524',
    textSecondary: '#57534e',
    accentPrimary: '#f97316',
    accentSecondary: '#fb7185',
    borderColor: '#fed7aa',
    glowColor: 'rgba(249, 115, 22, 0.2)',
    badgeText: '🍑 Coral Peach',
  },
  midnight: {
    name: 'Midnight Blue',
    key: 'midnight',
    isDark: true,
    bgPrimary: '#070d1e',
    bgSecondary: '#0f1833',
    bgSurface: 'rgba(15, 24, 51, 0.75)',
    bgSurfaceHover: 'rgba(25, 39, 79, 0.85)',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    accentPrimary: '#3b82f6',
    accentSecondary: '#60a5fa',
    borderColor: 'rgba(59, 130, 246, 0.25)',
    glowColor: 'rgba(96, 165, 250, 0.3)',
    badgeText: '🌃 Midnight Blue',
  },
  rose: {
    name: 'Cherry Rose',
    key: 'rose',
    isDark: true,
    bgPrimary: '#140810',
    bgSecondary: '#240e1d',
    bgSurface: 'rgba(36, 14, 29, 0.75)',
    bgSurfaceHover: 'rgba(56, 21, 45, 0.85)',
    textPrimary: '#fff1f2',
    textSecondary: '#fecdd3',
    accentPrimary: '#f43f5e',
    accentSecondary: '#fb7185',
    borderColor: 'rgba(244, 63, 94, 0.25)',
    glowColor: 'rgba(251, 113, 133, 0.35)',
    badgeText: '🍒 Cherry Rose',
  },
};

const DYNAMIC_KEYS: DynamicPresetKey[] = [
  'cyberpunk',
  'sunset',
  'emerald',
  'ocean',
  'monochrome',
  'terminal',
  'aurora',
  'coral',
  'midnight',
  'rose',
];

interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  activePresetKey: DynamicPresetKey | null;
  theme: ThemeColors;
  rerollDynamicTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getRandomPresetKey(): DynamicPresetKey {
  const index = Math.floor(Math.random() * DYNAMIC_KEYS.length);
  return DYNAMIC_KEYS[index];
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<Mode>('light');
  const [activePresetKey, setActivePresetKey] = useState<DynamicPresetKey>(getRandomPresetKey);

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    if (newMode === 'dynamic') {
      setActivePresetKey(getRandomPresetKey());
    }
  };

  const rerollDynamicTheme = () => {
    if (mode !== 'dynamic') {
      setModeState('dynamic');
    }
    setActivePresetKey((prev) => {
      const remaining = DYNAMIC_KEYS.filter((k) => k !== prev);
      return remaining[Math.floor(Math.random() * remaining.length)];
    });
  };

  const theme = useMemo(() => {
    if (mode === 'light') return LIGHT_THEME;
    if (mode === 'dark') return DARK_THEME;
    return DYNAMIC_PRESETS[activePresetKey] || DYNAMIC_PRESETS.cyberpunk;
  }, [mode, activePresetKey]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', theme.bgPrimary);
    root.style.setProperty('--bg-secondary', theme.bgSecondary);
    root.style.setProperty('--bg-surface', theme.bgSurface);
    root.style.setProperty('--bg-surface-hover', theme.bgSurfaceHover);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--accent-primary', theme.accentPrimary);
    root.style.setProperty('--accent-secondary', theme.accentSecondary);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--glow-color', theme.glowColor);

    if (theme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (theme.fontFamily) {
      root.style.setProperty('--custom-font', theme.fontFamily);
    } else {
      root.style.removeProperty('--custom-font');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        activePresetKey: mode === 'dynamic' ? activePresetKey : null,
        theme,
        rerollDynamicTheme,
      }}
    >
      <div
        className="min-h-screen transition-colors duration-500 ease-in-out"
        style={{
          backgroundColor: theme.bgPrimary,
          color: theme.textPrimary,
          fontFamily: theme.fontFamily || "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

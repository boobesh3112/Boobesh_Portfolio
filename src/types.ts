export type Mode = 'light' | 'dark' | 'dynamic';

export type DynamicPresetKey =
  | 'cyberpunk'
  | 'sunset'
  | 'emerald'
  | 'ocean'
  | 'monochrome'
  | 'terminal'
  | 'aurora'
  | 'coral'
  | 'midnight'
  | 'rose';

export interface ThemeColors {
  name: string;
  key: string;
  isDark: boolean;
  bgPrimary: string;
  bgSecondary: string;
  bgSurface: string;
  bgSurfaceHover: string;
  textPrimary: string;
  textSecondary: string;
  accentPrimary: string;
  accentSecondary: string;
  borderColor: string;
  glowColor: string;
  fontFamily?: string;
  badgeText?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  link: string;
  category: string;
  highlightMetric?: string;
  features?: string[];
  demoType?: 'analytics' | 'iot' | 'android';
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level?: string; tag?: string }[];
}

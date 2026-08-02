import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const SkeletonLoader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="w-full min-h-screen px-4 sm:px-6 lg:px-8 pt-20 pb-12 flex flex-col items-center justify-between overflow-hidden select-none"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      {/* Top Status Bar Pill Skeletons */}
      <div className="w-full flex justify-center gap-3 mb-6">
        <div
          className="h-8 w-64 sm:w-80 rounded-full relative overflow-hidden border"
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>
        <div
          className="h-8 w-32 rounded-full relative overflow-hidden border hidden sm:block"
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>
      </div>

      {/* Main Hero & Character Skeleton Center Block */}
      <div className="w-full max-w-5xl my-auto flex flex-col items-center justify-center gap-6">
        {/* Large Name Display Skeleton */}
        <div
          className="h-16 sm:h-24 w-3/4 max-w-2xl rounded-2xl relative overflow-hidden border"
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent" />
        </div>

        {/* Hero Character Frame Skeleton */}
        <div
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl relative overflow-hidden border shadow-xl flex items-center justify-center"
          style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
        >
          <div className="w-24 h-24 rounded-full bg-slate-300/30 dark:bg-slate-700/30 animate-pulse" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent" />
        </div>

        {/* Tagline Skeleton */}
        <div
          className="h-6 w-2/3 max-w-md rounded-xl relative overflow-hidden border mt-2"
          style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>

        {/* CTA Button Row Skeletons */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <div
            className="h-12 w-44 rounded-2xl relative overflow-hidden border"
            style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent" />
          </div>
          <div
            className="h-12 w-36 rounded-2xl relative overflow-hidden border"
            style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom Grid Cards Preview Skeletons */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 opacity-60 hidden sm:grid">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl relative overflow-hidden border p-4 flex flex-col justify-between"
            style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
          >
            <div className="h-4 w-1/2 rounded bg-slate-300/40 dark:bg-slate-700/40" />
            <div className="h-3 w-3/4 rounded bg-slate-200/40 dark:bg-slate-800/40" />
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

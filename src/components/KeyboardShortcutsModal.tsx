import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X, Search, MessageSquare, BookOpen, Sun, HelpCircle, CornerDownLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';

interface ShortcutItem {
  keyCombo: string[];
  description: string;
  icon: React.ElementType;
  actionName: string;
}

export const KeyboardShortcutsModal: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in input or textarea or contenteditable
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          (activeEl as HTMLElement).isContentEditable);

      // ESC always works to close modal
      if (e.key === 'Escape') {
        if (isOpen) {
          setIsOpen(false);
          soundEffects.playClick();
        }
        return;
      }

      // Cmd+K or Ctrl+K or '/' -> Focus Search
      if ((e.key === '/' && !isInput) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        soundEffects.playClick();
        const searchInput = document.getElementById('project-search-input') as HTMLInputElement | null;
        const projectsSec = document.getElementById('projects');
        if (projectsSec) {
          projectsSec.scrollIntoView({ behavior: 'smooth' });
        }
        if (searchInput) {
          setTimeout(() => {
            searchInput.focus();
            searchInput.select();
          }, 300);
        }
        return;
      }

      // Skip other single-key shortcuts if inside an input field
      if (isInput) return;

      const key = e.key.toLowerCase();

      // 'm' -> Open Contact Quick Message Modal
      if (key === 'm') {
        e.preventDefault();
        soundEffects.playClick();
        const contactSec = document.getElementById('contact');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
        window.dispatchEvent(new CustomEvent('open-contact-modal'));
        return;
      }

      // 'r' -> Toggle Reading Mode
      if (key === 'r') {
        e.preventDefault();
        soundEffects.playClick();
        window.dispatchEvent(new CustomEvent('toggle-reading-mode'));
        return;
      }

      // 't' -> Toggle Theme
      if (key === 't') {
        e.preventDefault();
        soundEffects.playClick();
        toggleTheme();
        return;
      }

      // '?' or 'h' -> Toggle Shortcuts Helper Modal
      if (e.key === '?' || key === 'h') {
        e.preventDefault();
        soundEffects.playClick();
        setIsOpen((prev) => !prev);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleTheme]);

  const shortcuts: ShortcutItem[] = [
    {
      keyCombo: ['/'],
      description: 'Quickly focus search & jump to 28 live projects',
      icon: Search,
      actionName: 'Search Projects',
    },
    {
      keyCombo: ['M'],
      description: 'Open quick email message modal instantly',
      icon: MessageSquare,
      actionName: 'Quick Message',
    },
    {
      keyCombo: ['R'],
      description: 'Toggle distraction-free text mode in About & Craft',
      icon: BookOpen,
      actionName: 'Reading Mode',
    },
    {
      keyCombo: ['T'],
      description: 'Switch between light and dark high-contrast themes',
      icon: Sun,
      actionName: 'Toggle Theme',
    },
    {
      keyCombo: ['?', 'or', 'H'],
      description: 'Open or close this keyboard navigation helper guide',
      icon: HelpCircle,
      actionName: 'Shortcuts Guide',
    },
  ];

  return (
    <>
      {/* Floating Bottom Navigation Badge */}
      <motion.button
        onClick={() => {
          soundEffects.playClick();
          setIsOpen(true);
        }}
        onMouseEnter={() => soundEffects.playHover()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border shadow-lg backdrop-blur-md cursor-pointer transition-all hover:scale-105 active:scale-95 group"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.borderColor,
          color: theme.textSecondary,
        }}
        title="Press '?' or 'H' to view keyboard shortcuts"
      >
        <Keyboard className="w-3.5 h-3.5 group-hover:text-indigo-400 transition-colors" />
        <span>Shortcuts</span>
        <kbd
          className="px-1.5 py-0.5 rounded text-[10px] font-bold border"
          style={{
            backgroundColor: theme.bgSecondary,
            borderColor: theme.borderColor,
            color: theme.textPrimary,
          }}
        >
          ?
        </kbd>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                soundEffects.playClick();
                setIsOpen(false);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl z-10 text-left overflow-hidden"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-2xl border"
                    style={{
                      backgroundColor: theme.bgSecondary,
                      borderColor: theme.borderColor,
                      color: theme.accentPrimary,
                    }}
                  >
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl" style={{ color: theme.textPrimary }}>
                      Keyboard Navigation
                    </h3>
                    <p className="text-xs font-mono" style={{ color: theme.textSecondary }}>
                      Power shortcuts for seamless portfolio browsing
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ color: theme.textSecondary }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="space-y-3 mb-6">
                {shortcuts.map((sc) => {
                  const IconComp = sc.icon;
                  return (
                    <div
                      key={sc.actionName}
                      className="p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.borderColor,
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="p-2 rounded-xl shrink-0"
                          style={{
                            backgroundColor: theme.bgSurface,
                            color: theme.accentPrimary,
                          }}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs sm:text-sm truncate" style={{ color: theme.textPrimary }}>
                            {sc.actionName}
                          </div>
                          <div className="text-[11px] truncate" style={{ color: theme.textSecondary }}>
                            {sc.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {sc.keyCombo.map((k, idx) => (
                          <React.Fragment key={idx}>
                            {k === 'or' ? (
                              <span className="text-[10px] font-mono mx-0.5" style={{ color: theme.textSecondary }}>
                                or
                              </span>
                            ) : (
                              <kbd
                                className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold border shadow-xs"
                                style={{
                                  backgroundColor: theme.bgSurface,
                                  borderColor: theme.borderColor,
                                  color: theme.accentPrimary,
                                }}
                              >
                                {k}
                              </kbd>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Tip */}
              <div
                className="p-3 rounded-xl border flex items-center justify-between text-xs font-mono"
                style={{
                  backgroundColor: theme.bgSurface,
                  borderColor: theme.borderColor,
                  color: theme.textSecondary,
                }}
              >
                <span>Press <kbd className="px-1.5 py-0.5 rounded border bg-black/10 dark:bg-white/10 font-bold">Esc</kbd> anytime to dismiss</span>
                <span className="flex items-center gap-1 font-bold text-indigo-400">
                  <CornerDownLeft className="w-3.5 h-3.5" /> Ready
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

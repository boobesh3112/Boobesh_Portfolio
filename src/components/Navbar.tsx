import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, Code2, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Craft', href: '#craft' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Interests', href: '#interests' },
  { label: 'Connect', href: '#connect' },
];

export const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 backdrop-blur-md shadow-lg border-b'
          : 'py-5 bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? theme.bgSurface : 'transparent',
        borderColor: scrolled ? theme.borderColor : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onMouseEnter={() => soundEffects.playHover()}
          onClick={() => soundEffects.playClick()}
          className="group flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight transition-transform duration-200 active:scale-95"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white shadow-md transition-all duration-300 group-hover:rotate-6"
            style={{
              background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
            }}
          >
            BJ
          </div>
          <span className="flex items-center gap-1.5 font-black tracking-wide">
            Boobesh J
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono font-medium hidden sm:inline-block border"
              style={{
                backgroundColor: theme.bgSecondary,
                color: theme.accentPrimary,
                borderColor: theme.borderColor,
              }}
            >
              Vibe Coder
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-100"
              style={{
                color: theme.textSecondary,
              }}
              onMouseEnter={(e) => {
                soundEffects.playHover();
                e.currentTarget.style.color = theme.accentPrimary;
                e.currentTarget.style.backgroundColor = theme.bgSecondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.textSecondary;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => soundEffects.playClick()}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onMouseEnter={() => soundEffects.playHover()}
            onClick={() => soundEffects.playClick()}
            className="ml-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
              color: '#ffffff',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Let's Connect
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onMouseEnter={() => soundEffects.playHover()}
          onClick={() => {
            soundEffects.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden p-2 rounded-xl border transition-colors"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderColor,
            color: theme.textPrimary,
          }}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b px-4 py-4 space-y-2 backdrop-blur-xl"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderColor,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => soundEffects.playHover()}
                onClick={() => {
                  soundEffects.playClick();
                  setMobileMenuOpen(false);
                }}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  color: theme.textPrimary,
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onMouseEnter={() => soundEffects.playHover()}
              onClick={() => {
                soundEffects.playClick();
                setMobileMenuOpen(false);
              }}
              className="mt-3 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                color: '#ffffff',
              }}
            >
              <Sparkles className="w-4 h-4" />
              Let's Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

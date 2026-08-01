import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Github, Linkedin, Mail, Twitter, Phone, MessageCircle, Send, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';

const FOOTER_NAV = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Craft', href: '#craft' },
  { label: 'Skills', href: '#skills' },
  { label: 'Interests', href: '#interests' },
  { label: 'Connect', href: '#connect' },
];

const MINI_SOCIALS = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Email', href: 'mailto:boobesh35@gmail.com', icon: Mail },
  { label: 'X / Twitter', href: 'https://x.com', icon: Twitter },
  { label: 'WhatsApp', href: 'https://wa.me/919876543210', icon: MessageCircle },
  { label: 'Telegram', href: 'https://t.me/boobesh_j', icon: Send },
];

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className="relative z-10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500"
      style={{
        backgroundColor: theme.bgSecondary,
        borderColor: theme.borderColor,
      }}
    >
      {/* Top Gradient Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.accentSecondary}, ${theme.accentPrimary})`,
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b" style={{ borderColor: theme.borderColor }}>
        {/* Monogram / Brand Wordmark */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <a
            href="#"
            onMouseEnter={() => soundEffects.playHover()}
            className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight group"
          >
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white shadow-md"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
              }}
            >
              BJ
            </motion.div>
            <span className="font-black text-2xl tracking-tight" style={{ color: theme.textPrimary }}>
              Boobesh J
            </span>
          </a>
          <p className="text-xs max-w-xs" style={{ color: theme.textSecondary }}>
            AI & Data Science Student · Full-Stack Developer · Vibe Coder building functional, high-impact products.
          </p>
        </div>

        {/* Quick Nav Links with Left-to-Right Underline Animation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
          {FOOTER_NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => soundEffects.playHover()}
              className="relative py-1 group transition-colors"
              style={{ color: theme.textSecondary }}
            >
              <span className="group-hover:text-indigo-400 transition-colors" style={{ color: theme.textSecondary }}>
                {link.label}
              </span>
              <span
                className="absolute left-0 bottom-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: theme.accentPrimary }}
              />
            </a>
          ))}
        </nav>

        {/* Compact Social Icons Row with Staggered Entrance */}
        <div className="flex items-center gap-2">
          {MINI_SOCIALS.map((soc, idx) => {
            const Icon = soc.icon;
            return (
              <motion.a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 18,
                  delay: idx * 0.05,
                }}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => soundEffects.playHover()}
                onClick={() => soundEffects.playClick()}
                className="p-2.5 rounded-xl border transition-colors shadow-sm"
                style={{
                  backgroundColor: theme.bgSurface,
                  borderColor: theme.borderColor,
                  color: theme.textPrimary,
                }}
                title={soc.label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Bottom Credits & Copyright */}
      <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono" style={{ color: theme.textSecondary }}>
        <div>
          © {new Date().getFullYear()} Boobesh J. All rights reserved.
        </div>
        <div className="flex items-center gap-2 font-medium">
          <span>Designed & built by</span>
          <span className="font-bold text-sm" style={{ color: theme.accentPrimary }}>Boobesh J</span>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accentSecondary }} />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};


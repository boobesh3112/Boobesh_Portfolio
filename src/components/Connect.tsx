import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Parallax3DCard } from './Parallax3DCard';
import {
  Phone,
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Send,
  AtSign,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';
import { StaggerText } from './StaggerText';

export interface SocialPlatform {
  name: string;
  category: string;
  handle: string;
  href: string;
  brandColor: string;
  icon: React.ElementType;
}

const CONNECTIONS: SocialPlatform[] = [
  {
    name: 'Phone Direct',
    category: 'Mobile / Call',
    handle: '+91 98765 43210',
    href: 'tel:+919876543210',
    brandColor: '#10b981',
    icon: Phone,
  },
  {
    name: 'Direct Email',
    category: 'Inquiries & Collabs',
    handle: 'boobesh35@gmail.com',
    href: 'mailto:boobesh35@gmail.com',
    brandColor: '#ea4335',
    icon: Mail,
  },
  {
    name: 'WhatsApp',
    category: 'Instant Messaging',
    handle: 'Chat on WhatsApp',
    href: 'https://wa.me/919876543210',
    brandColor: '#25D366',
    icon: MessageCircle,
  },
  {
    name: 'GitHub',
    category: 'Code Repositories',
    handle: '@boobesh-j',
    href: 'https://github.com',
    brandColor: '#6e5494',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    category: 'Professional Network',
    handle: 'in/boobesh-j',
    href: 'https://linkedin.com',
    brandColor: '#0A66C2',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    category: 'Visual & Personal',
    handle: '@boobesh.j',
    href: 'https://instagram.com',
    brandColor: '#E4405F',
    icon: Instagram,
  },
  {
    name: 'Facebook',
    category: 'Social Circle',
    handle: 'boobesh.j',
    href: 'https://facebook.com',
    brandColor: '#1877F2',
    icon: Facebook,
  },
  {
    name: 'X / Twitter',
    category: 'Tech Thoughts & Vibe',
    handle: '@boobesh_j',
    href: 'https://x.com',
    brandColor: '#1DA1F2',
    icon: Twitter,
  },
  {
    name: 'Telegram',
    category: 'Fast Messaging',
    handle: '@boobesh_j',
    href: 'https://t.me/boobesh_j',
    brandColor: '#229ED9',
    icon: Send,
  },
  {
    name: 'Threads',
    category: 'Updates & Dev Logs',
    handle: '@boobesh.j',
    href: 'https://threads.net',
    brandColor: '#a855f7',
    icon: AtSign,
  },
  {
    name: 'Discord',
    category: 'Community & Voice',
    handle: 'boobesh#0001',
    href: 'https://discord.com',
    brandColor: '#5865F2',
    icon: MessageSquare,
  },
];

export const Connect: React.FC = () => {
  const { theme } = useTheme();
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, item: SocialPlatform) => {
    e.preventDefault();
    soundEffects.playClick();
    if (item.href.startsWith('mailto:') || item.href.startsWith('tel:')) {
      window.location.href = item.href;
      return;
    }
    navigator.clipboard.writeText(item.handle);
    setCopiedHandle(item.name);
    setTimeout(() => setCopiedHandle(null), 2000);
  };

  return (
    <section id="connect" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background continuous drifting ambient orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: theme.accentSecondary }}
      />
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -20, 0],
          scale: [0.9, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: theme.accentPrimary }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <div className="mb-16 text-center sm:text-left">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.borderColor,
              color: theme.accentPrimary,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            06. CONNECT & SOCIALS
          </div>

          <StaggerText
            text="Let's build something."
            as="h2"
            className="text-4xl sm:text-6xl font-black tracking-tight mb-3"
            highlightWords={['build', 'something.']}
            highlightStyle={{ color: theme.accentPrimary }}
          />

          <p className="text-base sm:text-lg max-w-2xl" style={{ color: theme.textSecondary }}>
            Find me across the internet, or just reach out directly.
          </p>
        </div>

        {/* Connections Responsive Grid with Stagger Entrance & Wobble Icon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {CONNECTIONS.map((item, index) => {
            const IconComponent = item.icon;
            const isCopied = copiedHandle === item.name;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 25, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 22,
                  delay: (index % 8) * 0.05,
                }}
              >
                <Parallax3DCard
                  depth={16}
                  glare={true}
                  elevation={15}
                  onMouseEnter={() => soundEffects.playHover()}
                  onClick={(e) => handleCopy(e, item)}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between border group relative overflow-hidden cursor-pointer transition-shadow h-full"
                  style={{
                    backgroundColor: theme.bgSurface,
                    borderColor: theme.borderColor,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.05)`,
                  }}
                >
                  {/* Platform Ambient Tint on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: item.brandColor }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <motion.div
                        whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.15 }}
                        transition={{ duration: 0.4 }}
                        className="p-3 rounded-xl border"
                        style={{
                          backgroundColor: theme.bgSecondary,
                          borderColor: theme.borderColor,
                          color: item.brandColor,
                        }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.div>
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 opacity-60 group-hover:opacity-100"
                        style={{ color: item.brandColor }}
                      />
                    </div>

                    <h3 className="font-bold text-base tracking-tight mb-0.5" style={{ color: theme.textPrimary }}>
                      {item.name}
                    </h3>
                    <div className="text-[11px] font-mono font-medium mb-3" style={{ color: theme.textSecondary }}>
                      {item.category}
                    </div>
                  </div>

                  <div className="pt-3 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: theme.borderColor }}>
                    <span className="truncate max-w-[130px]" style={{ color: theme.accentPrimary }}>
                      {item.handle}
                    </span>
                    {isCopied ? (
                      <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <span className="text-[10px] opacity-70 group-hover:opacity-100 flex items-center gap-1" style={{ color: theme.textSecondary }}>
                        <Copy className="w-3 h-3" /> Click
                      </span>
                    )}
                  </div>
                </Parallax3DCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};


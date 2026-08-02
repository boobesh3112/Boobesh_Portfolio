import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, Sparkles, CheckCircle2, Copy, ArrowUpRight, MessageSquare, X, RefreshCw, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';

export const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState('Full-Stack Web App');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const emailAddress = 'boobesh35@gmail.com';

  const handleCopyEmail = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenModal = () => {
    soundEffects.playClick();
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleCloseModal = () => {
    soundEffects.playClick();
    setIsModalOpen(false);
  };

  // Listen for ESC key and custom event to open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setIsModalOpen(true);
      setFormSubmitted(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-contact-modal', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-contact-modal', handleOpenEvent);
    };
  }, [isModalOpen]);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEffects.playClick();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setFormSubmitted(true);
      soundEffects.playSuccess();
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Blobs matching Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-blob"
          style={{ backgroundColor: theme.accentPrimary }}
        />
        <div
          className="absolute top-0 -right-24 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-2000"
          style={{ backgroundColor: theme.accentSecondary }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.borderColor,
              color: theme.accentPrimary,
            }}
          >
            <Mail className="w-3.5 h-3.5" />
            06. CONTACT & COLLABORATION
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            Let's <span className="gradient-text">build something</span> great together.
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: theme.textSecondary }}>
            Whether you have a software project, hackathon collaboration, or open-source idea — my inbox is always open.
          </p>
        </motion.div>

        {/* Quick Email & Interactive Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto mb-12 shadow-xl border relative overflow-hidden"
          style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-xs font-mono font-bold uppercase mb-1 flex items-center gap-1.5" style={{ color: theme.textSecondary }}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Direct Inquiry Channel
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono" style={{ color: theme.textPrimary }}>
                {emailAddress}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundEffects.playHover()}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: theme.bgSecondary,
                  borderColor: theme.borderColor,
                  color: theme.textPrimary,
                }}
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleOpenModal}
                onMouseEnter={() => soundEffects.playHover()}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                  boxShadow: `0 8px 20px -6px ${theme.glowColor}`,
                }}
              >
                <MessageSquare className="w-4 h-4 animate-bounce" />
                <span>Quick Message</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-16"
        >
          <a
            href="https://github.com/boobesh3112"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            onMouseEnter={() => soundEffects.playHover()}
            className="p-4 rounded-2xl border glass-panel transition-all hover:scale-110 active:scale-95 flex items-center gap-2 font-semibold text-sm cursor-pointer"
          >
            <Github className="w-5 h-5" style={{ color: theme.accentPrimary }} />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/boobesh-j-a904b6380"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEffects.playClick()}
            onMouseEnter={() => soundEffects.playHover()}
            className="p-4 rounded-2xl border glass-panel transition-all hover:scale-110 active:scale-95 flex items-center gap-2 font-semibold text-sm cursor-pointer"
          >
            <Linkedin className="w-5 h-5" style={{ color: theme.accentSecondary }} />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${emailAddress}`}
            onClick={() => soundEffects.playClick()}
            onMouseEnter={() => soundEffects.playHover()}
            className="p-4 rounded-2xl border glass-panel transition-all hover:scale-110 active:scale-95 flex items-center gap-2 font-semibold text-sm cursor-pointer"
          >
            <Mail className="w-5 h-5" style={{ color: theme.accentPrimary }} />
            <span>Direct Email</span>
          </a>
        </motion.div>

        {/* Footer Divider & Credit Line */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono" style={{ borderColor: theme.borderColor, color: theme.textSecondary }}>
          <div>© {new Date().getFullYear()} Boobesh J. All rights reserved.</div>
          <div className="flex items-center gap-1.5 font-semibold">
            <span>Designed & built by</span>
            <span className="font-bold text-sm" style={{ color: theme.accentPrimary }}>Boobesh J</span>
            <Sparkles className="w-3.5 h-3.5 ml-0.5" style={{ color: theme.accentSecondary }} />
          </div>
        </div>
      </div>

      {/* COMPACT 'QUICK MESSAGE' MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl z-10 text-left overflow-hidden"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.35)`,
              }}
            >
              {/* Modal Top Accent Glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: theme.accentPrimary }}
              />

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2.5 rounded-2xl border"
                    style={{
                      backgroundColor: theme.bgSecondary,
                      borderColor: theme.borderColor,
                      color: theme.accentPrimary,
                    }}
                  >
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl tracking-tight" style={{ color: theme.textPrimary }}>
                      Quick Message Inquiry
                    </h3>
                    <p className="text-xs font-mono" style={{ color: theme.textSecondary }}>
                      Send an email directly without leaving the page
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  onMouseEnter={() => soundEffects.playHover()}
                  className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ color: theme.textSecondary }}
                  title="Close modal (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content / Success Screen */}
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="text-xl font-extrabold mb-2" style={{ color: theme.textPrimary }}>
                    Message Ready to Send!
                  </h4>
                  <p className="text-xs sm:text-sm max-w-sm mx-auto mb-6 leading-relaxed" style={{ color: theme.textSecondary }}>
                    Thank you, <strong style={{ color: theme.textPrimary }}>{formData.name}</strong>! Your message for <span className="font-mono">{inquiryType}</span> has been formatted.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`mailto:${emailAddress}?subject=${encodeURIComponent(`Inquiry: ${inquiryType} - from ${formData.name}`)}&body=${encodeURIComponent(`Hi Boobesh,\n\nName: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${formData.message}`)}`}
                      onClick={() => soundEffects.playClick()}
                      className="w-full py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 text-white shadow-md transition-transform hover:scale-102 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                      }}
                    >
                      <Send className="w-4 h-4" />
                      <span>Launch Direct Mail App</span>
                    </a>

                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setFormSubmitted(false);
                        setFormData({ name: '', email: '', message: '' });
                      }}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.borderColor,
                        color: theme.textPrimary,
                      }}
                    >
                      Send Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  {/* Inquiry Type Selection */}
                  <div>
                    <label className="block text-xs font-mono font-bold mb-1.5 uppercase" style={{ color: theme.textSecondary }}>
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Full-Stack Web App', 'AI / ML Integration', 'IoT & Hardware', 'Freelance / Job'].map((cat) => {
                        const isSelected = inquiryType === cat;
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => {
                              soundEffects.playClick();
                              setInquiryType(cat);
                            }}
                            className="px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer truncate"
                            style={{
                              backgroundColor: isSelected ? theme.accentPrimary : theme.bgSecondary,
                              borderColor: isSelected ? theme.accentPrimary : theme.borderColor,
                              color: isSelected ? '#ffffff' : theme.textSecondary,
                            }}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold mb-1" style={{ color: theme.textSecondary }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.borderColor,
                        color: theme.textPrimary,
                      }}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold mb-1" style={{ color: theme.textSecondary }}>
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.borderColor,
                        color: theme.textPrimary,
                      }}
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold mb-1" style={{ color: theme.textSecondary }}>
                      Project Details / Message *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell me about your project, timeline, or idea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.borderColor,
                        color: theme.textPrimary,
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.borderColor,
                        color: theme.textSecondary,
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 text-white shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                        boxShadow: `0 8px 20px -6px ${theme.glowColor}`,
                      }}
                    >
                      {isSending ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};


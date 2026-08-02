import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, ShieldCheck, Sparkles, RefreshCw, Maximize2, X, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { StaggerText } from './StaggerText';
import Stack from './Stack';
import { soundEffects } from '../utils/soundEffects';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
  gradient: string;
  badgeColor: string;
  iconBg: string;
  description: string;
  imageCandidates: string[];
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Full-Stack Web Development',
    issuer: 'Meta Professional Certification',
    date: '2025',
    credentialId: 'META-DEV-98423',
    verifyUrl: 'https://coursera.org/verify/professional-cert',
    skills: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'Database Architecture'],
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    badgeColor: '#3b82f6',
    iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    description: 'Advanced full-stack mastery covering scalable frontend systems, async server APIs, state management, and production cloud architecture.',
    imageCandidates: [
      '/certificates/cert-1.png',
      '/certificates/cert-1.jpg',
      '/certificates/cert_1.png',
      '/certificates/cert_1.jpg',
      '/certificates/cert1.png',
      '/certificates/cert1.jpg',
    ]
  },
  {
    id: 'cert-2',
    title: 'Google Cloud AI & ML Specialist',
    issuer: 'Google Cloud Platform',
    date: '2024',
    credentialId: 'GCP-AIML-74431',
    verifyUrl: 'https://cloud.google.com/certification',
    skills: ['Gemini API', 'TensorFlow', 'LLM Engineering', 'Prompt Design', 'Python'],
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    badgeColor: '#f59e0b',
    iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    description: 'Certified expertise in building generative AI applications, integrating Gemini models, prompt optimization, and cloud ML deployments.',
    imageCandidates: [
      '/certificates/cert-2.png',
      '/certificates/cert-2.jpg',
      '/certificates/cert_2.png',
      '/certificates/cert_2.jpg',
      '/certificates/cert2.png',
      '/certificates/cert2.jpg',
    ]
  },
  {
    id: 'cert-3',
    title: 'Python Data Engineering Master',
    issuer: 'Python Institute',
    date: '2024',
    credentialId: 'PY-ENG-31120',
    verifyUrl: 'https://pythoninstitute.org',
    skills: ['Python 3', 'FastAPI', 'Pandas', 'PostgreSQL', 'Data Pipelines'],
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    badgeColor: '#10b981',
    iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    description: 'Specialized credentials in Python backend infrastructure, asynchronous request handling, data analytics pipelines, and automated tooling.',
    imageCandidates: [
      '/certificates/cert-3.png',
      '/certificates/cert-3.jpg',
      '/certificates/cert_3.png',
      '/certificates/cert_3.jpg',
      '/certificates/cert3.png',
      '/certificates/cert3.jpg',
    ]
  },
  {
    id: 'cert-4',
    title: 'React & Frontend Performance',
    issuer: 'Meta Developer Circle',
    date: '2024',
    credentialId: 'META-REACT-62989',
    verifyUrl: 'https://developers.facebook.com',
    skills: ['React 18', 'State Optimization', 'Custom Hooks', 'Tailwind CSS', 'Vite'],
    gradient: 'from-sky-500 via-blue-600 to-indigo-700',
    badgeColor: '#06b6d4',
    iconBg: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
    description: 'Focused mastery in modern React architecture, zero-flicker state synchronizations, smooth spring physics, and high-performance Web APIs.',
    imageCandidates: [
      '/certificates/cert-4.png',
      '/certificates/cert-4.jpg',
      '/certificates/cert_4.png',
      '/certificates/cert_4.jpg',
      '/certificates/cert4.png',
      '/certificates/cert4.jpg',
    ]
  },
  {
    id: 'cert-5',
    title: 'UI/UX Design Systems & Micro-Interactions',
    issuer: 'Interaction Design Foundation',
    date: '2023',
    credentialId: 'IDF-UX-0708',
    verifyUrl: 'https://interaction-design.org',
    skills: ['Figma', 'Design Systems', 'Accessibility (WCAG)', 'Micro-Animations', 'Typography'],
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    badgeColor: '#ec4899',
    iconBg: 'bg-pink-500/20 text-pink-400 border-pink-500/40',
    description: 'Comprehensive certification in crafting human-centered design systems, dark-mode color balance, optical typography, and delighting users.',
    imageCandidates: [
      '/certificates/cert-5.png',
      '/certificates/cert-5.jpg',
      '/certificates/cert_5.png',
      '/certificates/cert_5.jpg',
      '/certificates/cert5.png',
      '/certificates/cert5.jpg',
    ]
  }
];

// Single Certificate Card Renderer for the Stack
const CertStackCard: React.FC<{
  cert: Certification;
  onOpenZoom: (cert: Certification, imgSrc: string | null) => void;
}> = ({ cert, onOpenZoom }) => {
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const currentImgSrc = cert.imageCandidates[candidateIdx];

  const handleImageError = () => {
    if (candidateIdx < cert.imageCandidates.length - 1) {
      setCandidateIdx((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={`w-full h-full p-6 sm:p-7 rounded-2xl border backdrop-blur-xl flex flex-col justify-between select-none shadow-2xl relative overflow-hidden bg-gradient-to-br ${cert.gradient}`}
      style={{
        borderColor: 'rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* If an image exists in /public/certificates and loads successfully, render the image header */}
      {!imageFailed && currentImgSrc && (
        <img
          src={currentImgSrc}
          alt={cert.title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />
      )}

      {/* Dark overlay for text legibility when image is loaded */}
      {imageLoaded && !imageFailed && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none" />
      )}

      {/* Background Decorative Graphic (Fallback when no image) */}
      {imageFailed && (
        <>
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 p-6 opacity-15 pointer-events-none">
            <Award className="w-28 h-28 text-white" />
          </div>
        </>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Cert
          </span>
          <span className="text-xs font-mono font-semibold text-white/90 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20">
            {cert.date}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1 drop-shadow-md leading-snug">
          {cert.title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-white/90 mb-3 flex items-center gap-1.5 drop-shadow-sm">
          <Award className="w-4 h-4 text-white" />
          {cert.issuer}
        </p>

        <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal mb-3 line-clamp-3 drop-shadow-sm">
          {cert.description}
        </p>
      </div>

      <div className="relative z-10 pt-3 border-t border-white/20">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/20 text-white border border-white/25 backdrop-blur-md font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-white/90">
          <span className="opacity-80 truncate max-w-[140px]">ID: {cert.credentialId}</span>
          <div className="flex items-center gap-2">
            {imageLoaded && !imageFailed && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundEffects.playClick();
                  onOpenZoom(cert, currentImgSrc);
                }}
                className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white border border-white/30 backdrop-blur-md transition-all active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5" /> View
              </button>
            )}
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                soundEffects.playClick();
              }}
              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-white text-gray-900 hover:bg-white/90 transition-all shadow-md active:scale-95"
            >
              Verify <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Certifications: React.FC = () => {
  const { theme } = useTheme();
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [zoomModalCert, setZoomModalCert] = useState<{ cert: Certification; imgSrc: string | null } | null>(null);

  const handleOpenZoom = (cert: Certification, imgSrc: string | null) => {
    setZoomModalCert({ cert, imgSrc });
  };

  const stackCards = CERTIFICATIONS.map((cert) => (
    <CertStackCard key={cert.id} cert={cert} onOpenZoom={handleOpenZoom} />
  ));

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        className="absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: theme.accentPrimary }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: theme.accentSecondary }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center sm:text-left">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.borderColor,
              color: theme.accentPrimary,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            05. ACADEMIC & CERTIFICATIONS
          </div>

          <StaggerText
            text="Verified Credentials."
            as="h2"
            className="text-4xl sm:text-6xl font-black tracking-tight mb-3"
            highlightWords={['Verified', 'Credentials.']}
            highlightStyle={{ color: theme.accentPrimary }}
          />

          <p className="text-base sm:text-lg max-w-2xl" style={{ color: theme.textSecondary }}>
            Drag, click, or hover over the card stack below to cycle through my official verified certifications.
          </p>
        </div>

        {/* Stack Container & Details Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Stack Component */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[360px] sm:max-w-[420px] h-[400px] sm:h-[440px] relative">
              <Stack
                randomRotation
                sensitivity={160}
                sendToBackOnClick={true}
                cards={stackCards}
                autoplay
                autoplayDelay={4000}
                pauseOnHover
              />
            </div>

            <div
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono py-1.5 px-4 rounded-full border shadow-sm"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.borderColor,
                color: theme.textSecondary,
              }}
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ color: theme.accentPrimary }} />
              Drag card or click to cycle stack • Auto-playing
            </div>
          </div>

          {/* Right Column: Full Certification Breakdown List */}
          <div className="lg:col-span-6 space-y-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveCertIndex(idx);
                }}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                  activeCertIndex === idx ? 'ring-2 shadow-lg scale-[1.01]' : 'hover:border-opacity-60'
                }`}
                style={{
                  backgroundColor: theme.bgSurface,
                  borderColor: activeCertIndex === idx ? theme.accentPrimary : theme.borderColor,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 ${cert.iconBg}`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base tracking-tight" style={{ color: theme.textPrimary }}>
                        {cert.title}
                      </h4>
                      <p className="text-xs font-medium opacity-80" style={{ color: theme.textSecondary }}>
                        {cert.issuer} • <span className="font-mono">{cert.date}</span>
                      </p>
                    </div>
                  </div>

                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEffects.playClick();
                    }}
                    className="p-2 rounded-lg border transition-colors hover:scale-105 shrink-0"
                    style={{
                      backgroundColor: theme.bgSecondary,
                      borderColor: theme.borderColor,
                      color: theme.accentPrimary,
                    }}
                    title="Verify credential link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  {cert.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: theme.bgSecondary,
                        borderColor: theme.borderColor,
                        color: theme.textPrimary,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      <AnimatePresence>
        {zoomModalCert && zoomModalCert.imgSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomModalCert(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-gray-900 rounded-2xl border border-white/20 overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white font-mono truncate">
                    {zoomModalCert.cert.title} — Certificate Preview
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomModalCert(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 flex-1 flex items-center justify-center overflow-auto bg-black/60">
                <img
                  src={zoomModalCert.imgSrc}
                  alt={zoomModalCert.cert.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                />
              </div>

              <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono text-gray-300">
                <span>{zoomModalCert.cert.issuer}</span>
                <a
                  href={zoomModalCert.cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:underline"
                >
                  Verify Online <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

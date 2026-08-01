import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Fingerprint, Activity, Gauge, Flame, Smartphone, ExternalLink, ShieldCheck, RefreshCw, Volume2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

const ATTENDANCE_DATA = [
  { day: 'Mon', attendance: 92, target: 85 },
  { day: 'Tue', attendance: 96, target: 85 },
  { day: 'Wed', attendance: 88, target: 85 },
  { day: 'Thu', attendance: 98, target: 85 },
  { day: 'Fri', attendance: 94, target: 85 },
  { day: 'Sat', attendance: 100, target: 85 },
];

export const ProjectDetailModal: React.FC<ModalProps> = ({ project, onClose }) => {
  const { theme } = useTheme();

  // AttendX State
  const [authScanned, setAuthScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  // BioCycle State
  const [biogasValue, setBiogasValue] = useState(74);
  const [tempValue, setTempValue] = useState(38.5);
  const [fertilizerYield, setFertilizerYield] = useState(128);

  // Android Card Flip State
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (project?.id === 'biocycle') {
      const interval = setInterval(() => {
        setBiogasValue((prev) => Math.min(98, Math.max(50, prev + (Math.random() * 6 - 3))));
        setTempValue((prev) => Math.min(45, Math.max(32, prev + (Math.random() * 0.8 - 0.4))));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [project]);

  if (!project) return null;

  const handleFingerprintScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setAuthScanned(true);
    }, 1200);
  };

  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Audio fallback
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/60">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl rounded-3xl border shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.borderColor,
            color: theme.textPrimary,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full border transition-transform hover:scale-110 active:scale-95"
            style={{
              backgroundColor: theme.bgSecondary,
              borderColor: theme.borderColor,
              color: theme.textPrimary,
            }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold mb-3 border"
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.borderColor,
                color: theme.accentPrimary,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              INTERACTIVE DEMO SHOWCASE
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">{project.title}</h3>
            <p className="text-sm font-medium mt-1" style={{ color: theme.accentPrimary }}>
              {project.tagline}
            </p>
          </div>

          {/* Project Interactive Custom Widget based on ID */}
          <div className="my-6 p-5 sm:p-6 rounded-2xl border" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.borderColor }}>
            {project.id === 'attendx' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border bg-black/20" style={{ borderColor: theme.borderColor }}>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleFingerprintScan}
                      disabled={scanning}
                      className={`p-3 rounded-2xl transition-all ${
                        scanning ? 'animate-pulse' : ''
                      }`}
                      style={{
                        background: authScanned
                          ? '#10b981'
                          : `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                        color: '#fff',
                      }}
                    >
                      <Fingerprint className="w-6 h-6" />
                    </button>
                    <div>
                      <div className="text-sm font-bold">WebAuthn Biometric Guard</div>
                      <div className="text-xs text-muted-foreground" style={{ color: theme.textSecondary }}>
                        {scanning
                          ? 'Scanning fingerprint hardware...'
                          : authScanned
                          ? 'Authentication Verified! Session Active'
                          : 'Click to simulate fingerprint sign-in'}
                      </div>
                    </div>
                  </div>
                  {authScanned && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>

                {/* Recharts Analytics Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: theme.textPrimary }}>
                      <Activity className="w-4 h-4" style={{ color: theme.accentPrimary }} />
                      Real-Time Weekly Attendance Analytics
                    </span>
                    <span className="text-xs font-mono" style={{ color: theme.accentPrimary }}>Avg: 94.6%</span>
                  </div>
                  <div className="h-48 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ATTENDANCE_DATA}>
                        <defs>
                          <linearGradient id="attendxGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.accentPrimary} stopOpacity={0.6} />
                            <stop offset="95%" stopColor={theme.accentPrimary} stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke={theme.textSecondary} fontSize={12} tickLine={false} />
                        <YAxis stroke={theme.textSecondary} fontSize={12} domain={[70, 100]} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: theme.bgSurface,
                            borderColor: theme.borderColor,
                            borderRadius: '12px',
                            color: theme.textPrimary,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="attendance"
                          stroke={theme.accentPrimary}
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#attendxGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {project.id === 'biocycle' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5" style={{ color: theme.accentPrimary }} />
                    <span className="font-bold text-sm">Live IoT Biomass Telemetry Stream</span>
                  </div>
                  <button
                    onClick={playBeep}
                    className="p-2 rounded-lg text-xs font-bold border flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
                    style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}
                  >
                    <Volume2 className="w-3.5 h-3.5" style={{ color: theme.accentPrimary }} />
                    WebAudio Ping
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Gauge 1 */}
                  <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}>
                    <Flame className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                    <div className="text-2xl font-black">{biogasValue.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground font-mono">Biogas Output</div>
                  </div>
                  {/* Gauge 2 */}
                  <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}>
                    <Activity className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                    <div className="text-2xl font-black">{tempValue.toFixed(1)}°C</div>
                    <div className="text-xs text-muted-foreground font-mono">Reactor Temp</div>
                  </div>
                  {/* Gauge 3 */}
                  <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: theme.bgSurface, borderColor: theme.borderColor }}>
                    <Sparkles className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
                    <div className="text-2xl font-black">{fertilizerYield} kg</div>
                    <div className="text-xs text-muted-foreground font-mono">Fertilizer Processed</div>
                  </div>
                </div>
              </div>
            )}

            {project.id === 'birthday-app' && (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-xs font-mono font-bold uppercase mb-4 text-center" style={{ color: theme.textSecondary }}>
                  Click card below to trigger Jetpack Compose 3D spring flip
                </div>
                <div
                  className="perspective-1000 cursor-pointer w-64 h-80 relative"
                  onClick={() => setFlipped(!flipped)}
                >
                  <motion.div
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                    className="w-full h-full relative transform-style-3d shadow-2xl rounded-3xl"
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col justify-between border"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                        color: '#fff',
                        borderColor: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <Smartphone className="w-6 h-6" />
                        <span className="text-xs font-mono bg-white/20 px-2.5 py-1 rounded-full">Glance Widget</span>
                      </div>
                      <div className="text-center my-auto">
                        <div className="text-4xl font-black">02 DAYS</div>
                        <div className="text-sm font-semibold opacity-90 mt-1">Sarah's Birthday 🎉</div>
                      </div>
                      <div className="text-xs font-mono text-center opacity-80 flex items-center justify-center gap-1">
                        <RefreshCw className="w-3 h-3" /> Tap to flip 3D card
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col justify-between border rotate-y-180"
                      style={{
                        backgroundColor: theme.bgSurface,
                        borderColor: theme.accentPrimary,
                        color: theme.textPrimary,
                      }}
                    >
                      <div className="text-xs font-mono font-bold uppercase" style={{ color: theme.accentPrimary }}>
                        Room DB & WorkManager
                      </div>
                      <div className="space-y-2 text-xs font-medium">
                        <p>✓ Scheduled background reminder push</p>
                        <p>✓ Local encrypted sqlite store</p>
                        <p>✓ Smooth 60fps graphicsLayer render</p>
                      </div>
                      <div className="text-xs font-mono text-center text-muted-foreground flex items-center justify-center gap-1">
                        <RefreshCw className="w-3 h-3" /> Tap to flip back
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>

          {/* Description & Tech Pills */}
          <div className="space-y-4">
            <h4 className="font-bold text-base">Project Architecture & Overview</h4>
            <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
              {project.description}
            </p>

            <div className="pt-2">
              <div className="text-xs font-mono font-bold uppercase mb-2" style={{ color: theme.textSecondary }}>
                Technology Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono border"
                    style={{
                      backgroundColor: theme.bgSecondary,
                      borderColor: theme.borderColor,
                      color: theme.textPrimary,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex justify-end gap-3 pt-4 border-t" style={{ borderColor: theme.borderColor }}>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold border transition-colors"
              style={{
                backgroundColor: theme.bgSecondary,
                borderColor: theme.borderColor,
                color: theme.textPrimary,
              }}
            >
              Close
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(`Viewing repository/demo details for ${project.title}`);
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
              style={{
                background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                color: '#fff',
              }}
            >
              <span>Repository & Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

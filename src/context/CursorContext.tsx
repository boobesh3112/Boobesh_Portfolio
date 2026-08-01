import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CursorDefinition {
  id: string;
  name: string;
  category: 'Tech & Cyber' | 'Anime & Fandom' | 'Gaming & Fun' | 'Minimal & Luxury';
  description: string;
  accentColor: string;
}

export const CURSORS_LIST: CursorDefinition[] = [
  { id: 'cyber-hud', name: 'Cyberpunk HUD', category: 'Tech & Cyber', description: 'Futuristic targeting crosshair with rotating data ring.', accentColor: '#06b6d4' },
  { id: 'neon-orb', name: 'Neon Pulse Orb', category: 'Minimal & Luxury', description: 'Glowing gradient aura ring with trailing pulse tail.', accentColor: '#ec4899' },
  { id: 'cosmic-star', name: 'Cosmic Starlight', category: 'Minimal & Luxury', description: '4-point rotating star with orbiting twinkle particles.', accentColor: '#f59e0b' },
  { id: 'quantum-matrix', name: 'Quantum Matrix', category: 'Tech & Cyber', description: 'Elastic magnetic dot grid that flexes with motion.', accentColor: '#3b82f6' },
  { id: 'flame-ignite', name: 'Flame Ignite', category: 'Tech & Cyber', description: 'Fire particle flame flare trailing cursor movement.', accentColor: '#f97316' },
  { id: 'golden-blob', name: 'Fluid Meta Blob', category: 'Minimal & Luxury', description: 'Morphing liquid blob with spring physics.', accentColor: '#eab308' },
  { id: 'laser-sight', name: 'Laser Sight Sniper', category: 'Tech & Cyber', description: 'Precision crosshair with laser dot and reticle ticks.', accentColor: '#ef4444' },
  { id: 'kawaii-star', name: 'Kawaii Anime Star', category: 'Anime & Fandom', description: 'Pink & cyan anime star with floating sakura sparkles.', accentColor: '#f43f5e' },
  { id: 'ghost-spectral', name: 'Ghost Spectral Vapor', category: 'Minimal & Luxury', description: 'Ethereal phantom vapor trailing behind cursor.', accentColor: '#a855f7' },
  { id: 'pixel-arcade', name: 'Pixel Retro Arcade', category: 'Gaming & Fun', description: '8-bit arcade sword pointer with block shadow.', accentColor: '#10b981' },
  { id: 'electric-arc', name: 'Electric Arc Voltage', category: 'Tech & Cyber', description: 'Crackling voltage ring with electric shockwaves.', accentColor: '#0284c7' },
  { id: 'gojo-infinity', name: 'Gojo Void Infinity', category: 'Anime & Fandom', description: 'Blue-violet rotating infinity symbol with domain aura.', accentColor: '#6366f1' },
  { id: 'zenitsu-thunder', name: 'Zenitsu Thunder', category: 'Anime & Fandom', description: 'Golden lightning bolt with trailing electric sparks.', accentColor: '#eab308' },
  { id: 'batman-signal', name: 'Batman Bat-Signal', category: 'Anime & Fandom', description: 'Dark Knight bat silhouette emitting sonar pulses.', accentColor: '#facc15' },
  { id: 'spiderman-sense', name: 'Spider-Sense Radar', category: 'Anime & Fandom', description: 'Red-and-blue web target with pulsing spider sense.', accentColor: '#dc2626' },
  { id: 'chakra-rasengan', name: 'Chakra Rasengan', category: 'Anime & Fandom', description: 'Swirling blue energy vortex sphere with momentum.', accentColor: '#0284c7' },
  { id: 'haki-aura', name: 'Conqueror Haki', category: 'Anime & Fandom', description: 'Red & black conqueror haki aura emitting dark lightning.', accentColor: '#991b1b' },
  { id: 'matrix-code', name: 'Cyber Matrix Code', category: 'Tech & Cyber', description: 'Digital binary digits trailing green glow.', accentColor: '#22c55e' },
  { id: 'prismic-holo', name: 'Prismic Hologram', category: 'Minimal & Luxury', description: 'Multi-color prismatic spectrum ring with hue cycle.', accentColor: '#06b6d4' },
  { id: 'ludo-dice', name: 'Ludo Dice Roller', category: 'Gaming & Fun', description: 'Mini 3D-styled die that rolls when cursor moves.', accentColor: '#ef4444' },
  { id: 'candy-crush', name: 'Candy Crush Gem', category: 'Gaming & Fun', description: 'Jelly candy gem that squishes & pops on hover.', accentColor: '#ec4899' },
  { id: 'luxury-diamond', name: 'Luxury Diamond', category: 'Minimal & Luxury', description: 'Wireframe geometric diamond with gold metallic outline.', accentColor: '#d97706' },
  { id: 'sonar-radar', name: 'Sonar Radar Scanner', category: 'Tech & Cyber', description: 'Circular radar sweep line scanning screen coordinates.', accentColor: '#10b981' },
  { id: 'hud-core', name: 'Holographic HUD Core', category: 'Tech & Cyber', description: 'Multi-tier futuristic target ring with degree ticks.', accentColor: '#38bdf8' },
  { id: 'vibe-terminal', name: 'Vibe Coder Terminal', category: 'Tech & Cyber', description: 'Blinking terminal prompt cursor with typing code glyphs.', accentColor: '#10b981' },
];

interface CursorContextType {
  activeCursorId: string;
  setActiveCursorId: (id: string) => void;
  isAutoDynamic: boolean;
  setIsAutoDynamic: (auto: boolean) => void;
  randomizeCursor: () => void;
  activeCursorDef: CursorDefinition;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCursorId, setActiveCursorId] = useState<string>('quantum-matrix');
  const [isAutoDynamic, setIsAutoDynamic] = useState<boolean>(false);

  // Auto-Dynamic cycling timer
  useEffect(() => {
    if (!isAutoDynamic) return;
    const interval = setInterval(() => {
      setActiveCursorId((prev) => {
        const currentIndex = CURSORS_LIST.findIndex((c) => c.id === prev);
        const nextIndex = (currentIndex + 1) % CURSORS_LIST.length;
        return CURSORS_LIST[nextIndex].id;
      });
    }, 8000); // changes style every 8s in auto mode

    return () => clearInterval(interval);
  }, [isAutoDynamic]);

  const randomizeCursor = () => {
    const randomIndex = Math.floor(Math.random() * CURSORS_LIST.length);
    setActiveCursorId(CURSORS_LIST[randomIndex].id);
  };

  const activeCursorDef =
    CURSORS_LIST.find((c) => c.id === activeCursorId) || CURSORS_LIST[0];

  return (
    <CursorContext.Provider
      value={{
        activeCursorId,
        setActiveCursorId,
        isAutoDynamic,
        setIsAutoDynamic,
        randomizeCursor,
        activeCursorDef,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

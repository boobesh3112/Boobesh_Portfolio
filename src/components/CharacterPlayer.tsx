import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { isLowTierDevice } from '../utils/perf';

interface CharacterPlayerProps {
  onLoaded?: () => void;
  className?: string;
  totalFrames?: number;
  targetFps?: number;
  durationSeconds?: number;
  maxWidth?: string;
}

export const CharacterPlayer: React.FC<CharacterPlayerProps> = ({
  onLoaded,
  className = '',
  totalFrames = 150,
  targetFps,
  durationSeconds = 7,
  maxWidth = '680px',
}) => {
  const { theme } = useTheme();

  // Refs for animation loop state (avoids stale closures & unnecessary re-renders)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const lastValidImageRef = useRef<HTMLImageElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  // States for loading UI feedback
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Stable callback ref
  const onLoadedRef = useRef(onLoaded);
  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  // Reduced motion preference
  const prefersReducedMotion = useRef<boolean>(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  // 1. Preload all frames into memory
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    const pad = (num: number) => String(num).padStart(3, '0');

    const loadSingleFrame = (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const frameNum = pad(index + 1);
        const src = `/model/frame_${frameNum}.png`;

        const img = new Image();
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            if (!lastValidImageRef.current) {
              lastValidImageRef.current = img;
            }
            count++;
            setLoadedCount(count);

            // Mark as loaded when initial frames are ready so character displays quickly
            if (count >= 3 && !isCancelled) {
              setIsLoaded(true);
              onLoadedRef.current?.();
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          console.warn(`[CharacterPlayer] Frame failed to load: ${src}`);
          resolve(null);
        };
        img.src = src;
      });
    };

    const loadAllFrames = async () => {
      // Controlled batches of 6 concurrent loads
      const batchSize = isLowTierDevice() ? 3 : 6;
      for (let i = 0; i < totalFrames; i += batchSize) {
        if (isCancelled) break;
        const batch: Promise<HTMLImageElement | null>[] = [];
        for (let j = i; j < Math.min(i + batchSize, totalFrames); j++) {
          batch.push(loadSingleFrame(j));
        }
        await Promise.allSettled(batch);
      }

      if (!isCancelled) {
        // Fallback propagation for any missing frame slots
        let lastGood: HTMLImageElement | null = null;
        for (let i = 0; i < totalFrames; i++) {
          if (imagesRef.current[i]) {
            lastGood = imagesRef.current[i];
          } else if (lastGood) {
            imagesRef.current[i] = lastGood;
          }
        }

        setIsLoaded(true);
        onLoadedRef.current?.();
      }
    };

    // Defer preload start slightly so fonts & layout settle first
    const timer = setTimeout(() => {
      loadAllFrames();
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [totalFrames]);

  // 2. Visibility change handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Draw current frame to canvas helper
  const drawFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameIdx = currentFrameRef.current;
    let currentImg = imagesRef.current[frameIdx];

    if (!currentImg || !currentImg.complete || currentImg.naturalWidth === 0) {
      currentImg = lastValidImageRef.current;
    } else {
      lastValidImageRef.current = currentImg;
    }

    if (!currentImg || !currentImg.complete || currentImg.naturalWidth === 0) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Object-fit: contain scaling calculation
    const imgW = currentImg.naturalWidth;
    const imgH = currentImg.naturalHeight;
    const imgAspect = imgW / imgH;
    const canvasAspect = canvas.width / canvas.height;

    let drawW = canvas.width;
    let drawH = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawH = canvas.height;
      drawW = drawH * imgAspect;
      offsetX = (canvas.width - drawW) / 2;
    } else {
      drawW = canvas.width;
      drawH = drawW / imgAspect;
      offsetY = (canvas.height - drawH) / 2;
    }

    ctx.globalAlpha = 1.0;
    ctx.drawImage(currentImg, offsetX, offsetY, drawW, drawH);

    // Seamless loop cross-fade on the final frames of the 7-second sequence (frames 144 to 150)
    const crossFadeFrames = 6;
    if (frameIdx >= totalFrames - crossFadeFrames) {
      const firstImg = imagesRef.current[0] || lastValidImageRef.current;
      if (firstImg && firstImg.complete && firstImg.naturalWidth > 0) {
        const blendAlpha = (frameIdx - (totalFrames - crossFadeFrames) + 1) / (crossFadeFrames + 1);
        ctx.globalAlpha = blendAlpha;
        ctx.drawImage(firstImg, offsetX, offsetY, drawW, drawH);
        ctx.globalAlpha = 1.0;
      }
    }
  };

  // 3. ResizeObserver for responsive canvas DPI resolution & sizing
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for high DPI performance

      const width = Math.max(100, Math.floor(rect.width));
      const height = Math.max(100, Math.floor(rect.height));

      const newCanvasWidth = Math.floor(width * dpr);
      const newCanvasHeight = Math.floor(height * dpr);

      if (canvas.width !== newCanvasWidth || canvas.height !== newCanvasHeight) {
        canvas.width = newCanvasWidth;
        canvas.height = newCanvasHeight;
        drawFrame();
      }
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isLoaded]);

  // 4. Animation RAF Loop
  useEffect(() => {
    if (!isLoaded) return;

    const isLowTier = isLowTierDevice();
    const computedFps = targetFps ?? (totalFrames / durationSeconds);
    const fps = prefersReducedMotion.current ? 12 : isLowTier ? 15 : computedFps;
    const frameInterval = 1000 / fps;

    const tick = (timestamp: number) => {
      // Always re-schedule requestAnimationFrame for continuous animation loop
      animFrameIdRef.current = requestAnimationFrame(tick);

      if (!isVisibleRef.current) return;

      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTimeRef.current;

      if (elapsed >= frameInterval) {
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);

        // Advance to next frame
        currentFrameRef.current = (currentFrameRef.current + 1) % totalFrames;

        // Render current frame to canvas
        drawFrame();
      }
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isLoaded, targetFps, totalFrames]);

  const progressPercent = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: '100%',
        maxWidth: maxWidth || '680px',
        height: 'auto',
        aspectRatio: '4 / 5',
      }}
    >
      {/* Skeleton / Loading state before initial frames are ready */}
      {!isLoaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-6 backdrop-blur-md border animate-pulse z-10"
          style={{
            backgroundColor: `${theme.bgSurface}80`,
            borderColor: theme.borderColor,
          }}
        >
          {/* Animated character silhouette glow */}
          <div
            className="w-32 h-32 sm:w-44 sm:h-44 rounded-full blur-2xl opacity-40 mb-6 animate-pulse"
            style={{ backgroundColor: theme.accentPrimary }}
          />

          <div className="w-full max-w-xs space-y-3 text-center">
            <div
              className="flex items-center justify-between text-xs font-mono font-medium"
              style={{ color: theme.textSecondary }}
            >
              <span>Loading 3D Character</span>
              <span>{progressPercent}%</span>
            </div>

            {/* Progress bar track */}
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: `${theme.borderColor}60` }}
            >
              <div
                className="h-full transition-all duration-150 rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.accentSecondary})`,
                }}
              />
            </div>
            <p className="text-[11px] font-mono opacity-70" style={{ color: theme.textSecondary }}>
              Rendering 150 HD animation frames...
            </p>
          </div>
        </div>
      )}

      {/* Main Canvas rendering character sequence */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full pointer-events-none transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          filter: `drop-shadow(0 20px 30px ${theme.glowColor})`,
        }}
      />
    </div>
  );
};


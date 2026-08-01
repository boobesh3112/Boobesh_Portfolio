/**
 * Utility for background pre-caching large character animation frames
 * and heavy static assets during browser idle periods (requestIdleCallback).
 */

export const startIdleAssetPreloading = () => {
  if (typeof window === 'undefined') return;

  const runWhenIdle = (cb: () => void) => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(cb, { timeout: 3000 });
    } else {
      setTimeout(cb, 500);
    }
  };

  runWhenIdle(() => {
    // 1. Preload key character animation frames in background batches
    const totalFrames = 150;
    const batchSize = 10;
    let currentFrame = 1;

    const loadNextBatch = () => {
      if (currentFrame > totalFrames) return;

      const end = Math.min(currentFrame + batchSize, totalFrames + 1);
      for (let i = currentFrame; i < end; i++) {
        const frameNum = String(i).padStart(3, '0');
        const img = new Image();
        img.src = `/model/frame_${frameNum}.png`;
      }
      currentFrame = end;

      if (currentFrame <= totalFrames) {
        runWhenIdle(loadNextBatch);
      }
    };

    loadNextBatch();
  });
};

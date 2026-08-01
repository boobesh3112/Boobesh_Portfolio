export const isLowTierDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check user reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  // Touch / Mobile devices
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // Hardware Concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 4 && isTouch) {
    return true;
  }

  // Device memory if supported
  const deviceMemory = (navigator as any).deviceMemory || 8;
  if (deviceMemory < 4) {
    return true;
  }

  return false;
};

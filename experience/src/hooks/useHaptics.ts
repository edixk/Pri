import { useCallback } from 'react';

type NavigatorWithVibrate = Navigator & { vibrate?: (pattern: number | number[]) => boolean };

export function useHaptics() {
  return useCallback((pattern: number | number[] = 8) => {
    try {
      const nav = navigator as NavigatorWithVibrate;
      if (typeof nav.vibrate === 'function') {
        nav.vibrate(pattern);
      }
    } catch {
      // vibración no soportada: sin error
    }
  }, []);
}
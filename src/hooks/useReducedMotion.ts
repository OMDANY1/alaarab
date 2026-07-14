'use client';

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Returns `true` when the user has enabled the
 * "prefers-reduced-motion: reduce" OS / browser setting.
 *
 * SSR-safe — defaults to `false` during server render
 * and hydrates on mount.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);

    // Set initial value from the live media query
    setPrefersReduced(mql.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    // Modern browsers
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }

    // Safari 13 and older fallback
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, []);

  return prefersReduced;
}

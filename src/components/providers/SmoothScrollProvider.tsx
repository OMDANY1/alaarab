'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Sync ScrollTrigger updates with Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect coarse pointer (touch devices)
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 
                    window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  // During SSR or on native touch devices, render children directly with native scroll
  if (!mounted || isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1 }} autoRaf={false}>
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}

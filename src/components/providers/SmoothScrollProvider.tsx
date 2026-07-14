'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.on('scroll', () => {});
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
  return (
    <ReactLenis root options={{ lerp: 0.1, syncTouch: true }} autoRaf={false}>
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}

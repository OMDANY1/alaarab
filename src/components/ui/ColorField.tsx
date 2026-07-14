'use client';

import React, { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ColorFieldProps {
  color: 'cream' | 'red' | 'burgundy';
  children?: ReactNode;
  className?: string;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  cream: {
    bg: 'var(--cream, #F1EEE8)',
    text: 'var(--burgundy, #2D070B)',
  },
  red: {
    bg: 'var(--red, #E64648)',
    text: 'var(--cream, #F1EEE8)',
  },
  burgundy: {
    bg: 'var(--burgundy, #2D070B)',
    text: 'var(--cream, #F1EEE8)',
  },
};

export default function ColorField({ color, children, className = '' }: ColorFieldProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { bg, text } = colorMap[color];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      // Smooth scroll-triggered color transition by fading in this section's background
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.85 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen ${className}`}
      style={{
        backgroundColor: bg,
        color: text,
      }}
    >
      {children}
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface StrategicStatementProps {
  lines: string[];
  bgColor?: 'cream' | 'red' | 'burgundy';
  textColor?: string;
}

const bgColorMap: Record<string, string> = {
  cream: 'var(--cream, #F1EEE8)',
  red: 'var(--red, #E64648)',
  burgundy: 'var(--burgundy, #2D070B)',
};

const defaultTextColorMap: Record<string, string> = {
  cream: 'var(--burgundy, #2D070B)',
  red: 'var(--cream, #F1EEE8)',
  burgundy: 'var(--cream, #F1EEE8)',
};

export default function StrategicStatement({
  lines,
  bgColor = 'burgundy',
  textColor,
}: StrategicStatementProps) {
  const { language, direction } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const isArabic = language === 'ar';
  const resolvedTextColor = textColor || defaultTextColorMap[bgColor];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lineElements = containerRef.current.querySelectorAll('.statement-line');

      if (prefersReduced) {
        gsap.set(lineElements, { opacity: 1, y: 0 });
        return;
      }

      lineElements.forEach((line, index) => {
        gsap.fromTo(
          line,
          {
            opacity: 0,
            y: 60,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 75%',
              end: 'top 25%',
              toggleActions: 'play none none reverse',
              // Each line gets its own trigger so they reveal as you scroll through
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [lines, language] }
  );

  return (
    <div
      ref={containerRef}
      dir={direction}
      className="relative"
      style={{
        backgroundColor: bgColorMap[bgColor],
        color: resolvedTextColor,
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center section-padding">
        <div className="max-w-5xl w-full">
          {lines.map((line, index) => (
            <p
              key={index}
              className={`
                statement-line
                text-3xl md:text-5xl lg:text-6xl xl:text-7xl
                font-light leading-[1.15] tracking-tight
                mb-4 md:mb-6
                ${isArabic
                  ? 'font-[family-name:var(--font-cairo)] text-end'
                  : 'font-[family-name:var(--font-grotesk)] text-start'
                }
              `}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Spacer — provides scroll height for the reveal effect */}
      <div style={{ height: `${lines.length * 100}vh` }} aria-hidden="true" />
    </div>
  );
}

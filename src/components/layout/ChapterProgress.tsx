'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const chapterIds = [
  'discovery',
  'insight',
  'concept',
  'strategy',
  'voice',
  'visual',
  'experience',
  'future',
];

export default function ChapterProgress() {
  const { direction } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const total = chapterIds.length;

  useGSAP(
    () => {
      // Create a ScrollTrigger for each chapter section
      chapterIds.forEach((id, index) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setCurrent(index + 1),
          onEnterBack: () => setCurrent(index + 1),
        });
      });
    },
    { scope: containerRef }
  );

  const progress = current / total;

  return (
    <div
      ref={containerRef}
      dir={direction}
      className={`
        fixed top-1/2 -translate-y-1/2 z-40
        flex flex-col items-center gap-4
        ${direction === 'rtl' ? 'left-5 md:left-8' : 'right-5 md:right-8'}
        pointer-events-none select-none
        mix-blend-difference
      `}
    >
      {/* Current chapter number */}
      <span
        className="
          font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em]
          text-[var(--cream,#F1EEE8)]
          opacity-60
        "
      >
        {String(current).padStart(2, '0')}
      </span>

      {/* Vertical progress track */}
      <div className="relative w-px h-20 bg-[var(--cream,#F1EEE8)]/20 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-[var(--cream,#F1EEE8)]/80 transition-all duration-700 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex flex-col items-center gap-1.5">
        {chapterIds.map((_, index) => (
          <div
            key={index}
            className={`
              w-[3px] h-[3px] rounded-full transition-all duration-500
              ${index + 1 === current
                ? 'bg-[var(--cream,#F1EEE8)] scale-150'
                : 'bg-[var(--cream,#F1EEE8)]/25 scale-100'
              }
            `}
          />
        ))}
      </div>

      {/* Total */}
      <span
        className="
          font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em]
          text-[var(--cream,#F1EEE8)]
          opacity-30
        "
      >
        {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

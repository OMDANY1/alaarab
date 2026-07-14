'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface ChapterIntroProps {
  number: string;
  titleAr: string;
  titleEn: string;
  id: string;
}

export default function ChapterIntro({ number, titleAr, titleEn, id }: ChapterIntroProps) {
  const { language, direction } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const isArabic = language === 'ar';
  const title = isArabic ? titleAr : titleEn;

  // Arabic numeral conversion
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const displayNumber = isArabic
    ? number
        .split('')
        .map((d) => arabicNumerals[parseInt(d)] || d)
        .join('')
    : number;

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        sectionRef.current.querySelector('.chapter-number'),
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 0.08, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
        .fromTo(
          sectionRef.current.querySelector('.chapter-line'),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
          '-=0.8'
        )
        .fromTo(
          sectionRef.current.querySelector('.chapter-title'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          sectionRef.current.querySelector('.chapter-subtitle'),
          { opacity: 0, y: 15 },
          { opacity: 0.4, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
    },
    { scope: sectionRef, dependencies: [number, language] }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      dir={direction}
      className="relative flex items-center justify-center min-h-[60vh] py-20 md:py-32 overflow-hidden"
    >
      {/* Giant background number */}
      <span
        className="
          chapter-number absolute inset-0
          flex items-center justify-center
          font-[family-name:var(--font-mono)]
          text-[40vw] md:text-[30vw] lg:text-[20vw]
          font-bold leading-none
          opacity-[0.08]
          select-none pointer-events-none
        "
        style={{ color: 'currentColor' }}
        aria-hidden="true"
      >
        {displayNumber}
      </span>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Decorative line */}
        <div
          className="chapter-line w-12 h-px mb-8"
          style={{
            backgroundColor: 'currentColor',
            opacity: 0.3,
            transformOrigin: direction === 'rtl' ? 'right' : 'left',
          }}
        />

        {/* Chapter number label */}
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] uppercase opacity-40 mb-4">
          {isArabic ? 'الفصل' : 'CHAPTER'} {displayNumber}
        </span>

        {/* Main title */}
        <h2
          className={`
            chapter-title
            text-4xl md:text-6xl lg:text-7xl
            font-light leading-tight tracking-tight
            ${isArabic
              ? 'font-[family-name:var(--font-cairo)]'
              : 'font-[family-name:var(--font-grotesk)]'
            }
          `}
        >
          {title}
        </h2>

        {/* Subtitle in opposite language */}
        <span
          className={`
            chapter-subtitle mt-3
            text-sm md:text-base tracking-wide opacity-40
            ${isArabic
              ? 'font-[family-name:var(--font-grotesk)]'
              : 'font-[family-name:var(--font-cairo)]'
            }
          `}
        >
          {isArabic ? titleEn : titleAr}
        </span>
      </div>
    </section>
  );
}

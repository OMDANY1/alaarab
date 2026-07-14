'use client';

import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface KineticHeadlineProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3';
  className?: string;
  animationType?: 'reveal' | 'slide' | 'scale';
}

export default function KineticHeadline({
  text,
  tag: Tag = 'h2',
  className = '',
  animationType = 'reveal',
}: KineticHeadlineProps) {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const isArabic = language === 'ar';

  // Split text into animatable units: words for Arabic, characters for English
  const units = useMemo(() => {
    if (isArabic) {
      // Word-level splitting for Arabic to preserve letter connections
      return text.split(/\s+/).map((word) => ({ text: word, isSpace: false }));
    } else {
      // Character-level splitting for English
      const chars: { text: string; isSpace: boolean }[] = [];
      for (const char of text) {
        chars.push({ text: char, isSpace: char === ' ' });
      }
      return chars;
    }
  }, [text, isArabic]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        // Just make everything visible immediately
        gsap.set(containerRef.current.querySelectorAll('.kinetic-unit'), {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
        });
        return;
      }

      const elements = containerRef.current.querySelectorAll('.kinetic-unit');
      if (!elements.length) return;

      let fromVars: gsap.TweenVars = {};
      let toVars: gsap.TweenVars = {};

      switch (animationType) {
        case 'reveal':
          fromVars = { opacity: 0, y: '100%', rotateX: -90 };
          toVars = {
            opacity: 1,
            y: '0%',
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: isArabic ? 0.08 : 0.03,
          };
          break;
        case 'slide':
          fromVars = { opacity: 0, x: isArabic ? 60 : -60 };
          toVars = {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: isArabic ? 0.06 : 0.02,
          };
          break;
        case 'scale':
          fromVars = { opacity: 0, scale: 0.3, filter: 'blur(10px)' };
          toVars = {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'back.out(1.7)',
            stagger: isArabic ? 0.1 : 0.04,
          };
          break;
      }

      gsap.fromTo(elements, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef, dependencies: [text, animationType, isArabic] }
  );

  const fontClass = isArabic
    ? 'font-[family-name:var(--font-cairo)]'
    : 'font-[family-name:var(--font-grotesk)]';

  const leadingClass = isArabic ? 'leading-[1.25] py-2' : 'leading-[1.0] py-2';
  
  const hasCustomSize = className.split(' ').some(c => c.startsWith('text-') || c.includes('text-['));
  const sizeClass = hasCustomSize ? '' : 'text-[8vw] md:text-[10vw] lg:text-[12vw] xl:text-[15vw]';

  return (
    <div ref={containerRef} className="overflow-hidden py-1">
      <Tag
        className={`
          ${fontClass}
          ${leadingClass}
          ${sizeClass}
          font-bold tracking-tighter
          ${className}
        `}
        style={{ perspective: '1000px' }}
      >
        {units.map((unit, index) =>
          unit.isSpace ? (
            <span key={index} className="inline-block w-[0.25em]" />
          ) : (
            <span
              key={index}
              className="kinetic-unit inline-block will-change-transform"
              style={{
                transformOrigin: 'center bottom',
                // Add word spacing for Arabic
                ...(isArabic && index < units.length - 1
                  ? { marginInlineEnd: '0.3em' }
                  : {}),
              }}
            >
              {unit.text}
            </span>
          )
        )}
      </Tag>
    </div>
  );
}

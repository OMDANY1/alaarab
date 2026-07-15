'use client';

import React, { useRef } from 'react';
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

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        gsap.set(containerRef.current.querySelectorAll('.kinetic-target'), {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
        });
        return;
      }

      const element = containerRef.current.querySelector('.kinetic-target');
      if (!element) return;

      let fromVars: gsap.TweenVars = {};
      let toVars: gsap.TweenVars = {};

      switch (animationType) {
        case 'reveal':
          fromVars = { opacity: 0, y: '25px', rotateX: -8 };
          toVars = {
            opacity: 1,
            y: '0%',
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
          };
          break;
        case 'slide':
          fromVars = { opacity: 0, x: isArabic ? 35 : -35 };
          toVars = {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
          };
          break;
        case 'scale':
          fromVars = { opacity: 0, scale: 0.9, filter: 'blur(8px)' };
          toVars = {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
          };
          break;
      }

      gsap.fromTo(element, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef, dependencies: [text, animationType, isArabic] }
  );

  const fontClass = isArabic
    ? 'font-cairo'
    : 'font-grotesk';

  const leadingClass = isArabic ? 'leading-[1.25] py-2' : 'leading-[1.0] py-2';
  
  const hasCustomSize = className.split(' ').some(c => c.startsWith('text-') || c.includes('text-['));
  const sizeClass = hasCustomSize ? '' : 'text-[8vw] md:text-[10vw] lg:text-[12vw] xl:text-[15vw]';

  return (
    <div ref={containerRef} className="relative overflow-hidden py-1">
      <Tag
        className={`
          kinetic-target
          ${fontClass}
          ${leadingClass}
          ${sizeClass}
          ${isArabic ? 'tracking-normal' : 'tracking-tighter'}
          ${className}
        `}
        style={{ perspective: '1000px', transformOrigin: 'center bottom' }}
      >
        {text}
      </Tag>
    </div>
  );
}

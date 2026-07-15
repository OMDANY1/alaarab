'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      // 1. Initial State
      gsap.set([numberRef.current, labelRef.current], { opacity: 0, y: 20 });

      // 2. Animate +30 in
      tl.to(numberRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      });

      // 3. Animate Label in
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      }, '-=0.12');

      // 4. Fade out entire container quickly
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.25,
        delay: 0.35,
        ease: 'power2.in',
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none select-none"
    >
      <div className="flex flex-col items-center gap-2 z-10">
        <div
          ref={numberRef}
          className="font-cairo text-[14vw] md:text-[8vw] font-black leading-none text-[#E64648]"
        >
          {language === 'ar' ? '+٣٠' : '+30'}
        </div>
        <div
          ref={labelRef}
          className="font-cairo text-[4vw] md:text-[2vw] font-black text-[#2D070B] tracking-wide uppercase"
        >
          {language === 'ar' ? 'سنة خبرة في الصنعة' : 'YEARS OF MASTERY'}
        </div>
      </div>
    </div>
  );
}

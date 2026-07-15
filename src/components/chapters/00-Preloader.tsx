'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [count, setCount] = useState(30);

  useEffect(() => {
    let skipped = false;

    const handleSkip = () => {
      if (skipped) return;
      skipped = true;
      
      // Remove listeners
      cleanupListeners();

      // Animate out immediately
      gsap.killTweensOf(containerRef.current);
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.out',
        onComplete: () => {
          onComplete();
        },
      });
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('wheel', handleSkip);
      window.removeEventListener('touchmove', handleSkip);
    };

    // Attach immediate-exit event listeners
    window.addEventListener('click', handleSkip);
    window.addEventListener('wheel', handleSkip, { passive: true });
    window.addEventListener('touchmove', handleSkip, { passive: true });

    const ctx = gsap.context(() => {
      // Countdown animation from 30 down (compressed timing)
      const counterObj = { value: 30 };
      const tl = gsap.timeline({
        onComplete: () => {
          if (!skipped) {
            handleSkip();
          }
        },
      });

      // Quick numbers countdown flashing (duration shortened to 0.4s)
      tl.to(counterObj, {
        value: 0,
        duration: 0.4,
        ease: 'power1.out',
        onUpdate: () => {
          const currentVal = Math.ceil(counterObj.value);
          setCount(currentVal);
        },
      });

      // Scale up count during countdown
      tl.fromTo(
        numberRef.current,
        { scale: 0.95, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power1.out' },
        0
      );

      // Fade out countdown numbers
      tl.to(numberRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.15,
        ease: 'power2.in',
      }, '+=0.05');

      // Show final +30 years / +30 سنة
      tl.set(numberRef.current, {
        innerHTML: language === 'ar' ? '+٣٠ سنة' : '+30 YEARS',
        y: 15,
      });

      tl.to(numberRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      });

      // Show 'خبرة' / 'MASTERY'
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
          innerHTML: language === 'ar' ? 'خبرة.' : 'MASTERY.',
        },
        '-=0.1'
      );

      // Brief pause before fading text layers
      tl.to([numberRef.current, labelRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        delay: 0.3,
      });

    }, containerRef);

    return () => {
      ctx.revert();
      cleanupListeners();
    };
  }, [language, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#2D070B] text-[#F1EEE8] select-none"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          ref={numberRef}
          className="font-mono text-[12vw] md:text-[8vw] font-bold leading-none tracking-tighter text-[#E64648]"
        >
          {count}
        </div>
        <div
          ref={labelRef}
          className="font-display text-[4vw] md:text-[2vw] font-black text-[#F1EEE8] tracking-widest uppercase"
        >
          {language === 'ar' ? 'جاري التحميل...' : 'LOADING...'}
        </div>
      </div>
      
      {/* Decorative brand annotations */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 text-center opacity-30">
        <span className="font-mono text-xs tracking-[0.2em] uppercase">
          {language === 'ar' ? 'شاورما العراب' : 'SHAWARMA AL-ARRAB'}
        </span>
        <span className="h-[1px] w-12 bg-[#F1EEE8]" />
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase">
          {language === 'ar' ? 'مفهوم الهوية والاستراتيجية' : 'BRAND IDENTITY & STRATEGY'}
        </span>
      </div>
    </div>
  );
}

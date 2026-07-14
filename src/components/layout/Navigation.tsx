'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitch from './LanguageSwitch';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  onToggleIndex: () => void;
}

export default function Navigation({ onToggleIndex }: NavigationProps) {
  const { language, direction, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle entrance animation
  useGSAP(
    () => {
      if (!navRef.current) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced) {
        gsap.fromTo(
          navRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );
      }
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      dir={direction}
      className={`
        fixed top-0 inset-x-0 z-50
        flex items-center justify-between
        section-padding
        transition-all duration-500 ease-out
        ${scrolled
          ? 'py-4 bg-[#F1EEE8]/90 backdrop-blur-md border-b border-[#2D070B]/5 shadow-sm text-[#2D070B]'
          : 'py-6 md:py-8 bg-transparent border-b border-transparent text-white'
        }
      `}
      style={{ mixBlendMode: scrolled ? 'normal' : 'difference' }}
    >
      {/* Left: Brand label */}
      <div
        className="
          font-[family-name:var(--font-mono)] text-[10px] md:text-[11px]
          tracking-[0.2em] uppercase
          transition-colors duration-500
        "
      >
        {String(t('nav.brandLabel'))}
      </div>

      {/* Right: INDEX button + Language Toggle */}
      <div className="flex items-center gap-6 md:gap-10">
        <button
          onClick={onToggleIndex}
          className="
            font-[family-name:var(--font-mono)] text-[10px] md:text-[11px]
            tracking-[0.2em] uppercase
            bg-transparent border-none outline-none
            cursor-pointer
            transition-all duration-300
            hover:opacity-60
            focus-visible:ring-1 focus-visible:ring-current focus-visible:ring-offset-2
          "
          data-cursor="hover"
          data-cursor-text={language === 'ar' ? 'فهرس' : 'INDEX'}
        >
          {String(t('nav.index'))}
        </button>

        <div className="flex items-center">
          <LanguageSwitch />
        </div>
      </div>
    </nav>
  );
}

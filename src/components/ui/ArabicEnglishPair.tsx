'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ArabicEnglishPairProps {
  arabic: string;
  english: string;
  layout?: 'stacked' | 'side-by-side' | 'overlay';
  arSize?: string;
  enSize?: string;
}

export default function ArabicEnglishPair({
  arabic,
  english,
  layout = 'stacked',
  arSize = 'text-4xl md:text-6xl',
  enSize = 'text-2xl md:text-4xl',
}: ArabicEnglishPairProps) {
  const { language, direction } = useLanguage();

  // In EN mode, show English prominently; in AR mode, show Arabic prominently
  const primaryIsArabic = language === 'ar';

  if (layout === 'overlay') {
    return (
      <div dir={direction} className="relative">
        {/* Background layer — the secondary language at large scale */}
        <div
          className={`
            select-none pointer-events-none
            font-[family-name:var(--font-cairo)]
            ${arSize}
            font-bold leading-none
            opacity-[0.07]
          `}
          dir="rtl"
          aria-hidden="true"
        >
          {arabic}
        </div>

        {/* Foreground layer — the primary language */}
        <div
          className={`
            absolute inset-0 flex items-center
            ${primaryIsArabic ? 'justify-end' : 'justify-start'}
          `}
        >
          <span
            className={`
              ${primaryIsArabic
                ? `font-[family-name:var(--font-cairo)] ${arSize}`
                : `font-[family-name:var(--font-grotesk)] ${enSize}`
              }
              font-light leading-tight tracking-tight
            `}
            dir={primaryIsArabic ? 'rtl' : 'ltr'}
          >
            {primaryIsArabic ? arabic : english}
          </span>
        </div>
      </div>
    );
  }

  if (layout === 'side-by-side') {
    return (
      <div
        dir={direction}
        className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 lg:gap-16"
      >
        {/* Arabic side */}
        <div
          className={`
            font-[family-name:var(--font-cairo)]
            ${arSize}
            font-light leading-tight
            ${primaryIsArabic ? 'opacity-100' : 'opacity-40'}
            transition-opacity duration-500
            ${direction === 'rtl' ? 'order-1' : 'order-1 md:order-2'}
          `}
          dir="rtl"
        >
          {arabic}
        </div>

        {/* English side */}
        <div
          className={`
            font-[family-name:var(--font-grotesk)]
            ${enSize}
            font-light leading-tight tracking-tight
            ${primaryIsArabic ? 'opacity-40' : 'opacity-100'}
            transition-opacity duration-500
            ${direction === 'rtl' ? 'order-2' : 'order-2 md:order-1'}
          `}
          dir="ltr"
        >
          {english}
        </div>
      </div>
    );
  }

  // Default: stacked layout
  return (
    <div dir={direction} className="flex flex-col gap-2 md:gap-4">
      {/* Primary language on top */}
      <div
        className={`
          ${primaryIsArabic
            ? `font-[family-name:var(--font-cairo)] ${arSize}`
            : `font-[family-name:var(--font-grotesk)] ${enSize}`
          }
          font-light leading-tight tracking-tight
        `}
        dir={primaryIsArabic ? 'rtl' : 'ltr'}
      >
        {primaryIsArabic ? arabic : english}
      </div>

      {/* Secondary language below with reduced emphasis */}
      <div
        className={`
          ${primaryIsArabic
            ? `font-[family-name:var(--font-grotesk)] ${enSize}`
            : `font-[family-name:var(--font-cairo)] ${arSize}`
          }
          font-light leading-tight tracking-tight
          opacity-35
        `}
        dir={primaryIsArabic ? 'ltr' : 'rtl'}
      >
        {primaryIsArabic ? english : arabic}
      </div>
    </div>
  );
}

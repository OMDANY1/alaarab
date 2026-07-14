'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      className="
        relative flex items-center gap-1.5
        font-[family-name:var(--font-mono)] text-[11px] tracking-[0.15em] uppercase
        cursor-pointer bg-transparent border-none outline-none
        focus-visible:ring-1 focus-visible:ring-current focus-visible:ring-offset-2
        transition-colors duration-300
      "
    >
      <motion.span
        animate={{
          opacity: language === 'ar' ? 1 : 0.35,
          scale: language === 'ar' ? 1.05 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="inline-block"
      >
        AR
      </motion.span>
      <span className="opacity-30">/</span>
      <motion.span
        animate={{
          opacity: language === 'en' ? 1 : 0.35,
          scale: language === 'en' ? 1.05 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="inline-block"
      >
        EN
      </motion.span>
    </button>
  );
}

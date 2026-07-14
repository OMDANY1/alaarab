'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface FullScreenIndexProps {
  isOpen: boolean;
  onClose: () => void;
}

const chapters = [
  { num: '01', numAr: '٠١', id: 'discovery', titleAr: 'الاكتشاف', titleEn: 'DISCOVERY', keyword: 'Research & Analysis' },
  { num: '02', numAr: '٠٢', id: 'insight', titleAr: 'الفكرة', titleEn: 'INSIGHT', keyword: 'Market Truth' },
  { num: '03', numAr: '٠٣', id: 'concept', titleAr: 'المفهوم', titleEn: 'CONCEPT', keyword: 'Brand DNA' },
  { num: '04', numAr: '٠٤', id: 'strategy', titleAr: 'الاستراتيجية', titleEn: 'STRATEGY', keyword: 'Positioning' },
  { num: '05', numAr: '٠٥', id: 'voice', titleAr: 'الصوت', titleEn: 'VOICE', keyword: 'Verbal Identity' },
  { num: '06', numAr: '٠٦', id: 'visual', titleAr: 'الصورة', titleEn: 'VISUAL', keyword: 'Design Language' },
  { num: '07', numAr: '٠٧', id: 'experience', titleAr: 'التجربة', titleEn: 'EXPERIENCE', keyword: 'Touchpoints' },
  { num: '08', numAr: '٠٨', id: 'future', titleAr: 'المستقبل', titleEn: 'FUTURE', keyword: 'Growth Vision' },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, skewY: 2 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

export default function FullScreenIndex({ isOpen, onClose }: FullScreenIndexProps) {
  const { language, direction } = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);

  const handleChapterClick = (id: string) => {
    onClose();
    // Small delay to let the overlay close animation begin
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="fullscreen-index"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          dir={direction}
          className="
            fixed inset-0 z-[60]
            flex flex-col
            overflow-y-auto overscroll-contain
          "
          style={{
            backgroundColor: 'var(--burgundy, #2D070B)',
            color: 'var(--cream, #F1EEE8)',
          }}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between section-padding py-6 md:py-8">
            <span className="font-[family-name:var(--font-mono)] text-[10px] md:text-[11px] tracking-[0.2em] uppercase opacity-50">
              {language === 'ar' ? 'الفهرس' : 'INDEX'}
            </span>
            <button
              onClick={onClose}
              className="
                font-[family-name:var(--font-mono)] text-[10px] md:text-[11px]
                tracking-[0.2em] uppercase
                bg-transparent border-none outline-none cursor-pointer
                transition-opacity duration-300 hover:opacity-60
                focus-visible:ring-1 focus-visible:ring-current focus-visible:ring-offset-2
              "
              style={{ color: 'var(--cream, #F1EEE8)' }}
              data-cursor="hover"
              data-cursor-text="CLOSE"
            >
              {language === 'ar' ? 'إغلاق' : 'CLOSE'}
            </button>
          </div>

          {/* Chapter list */}
          <motion.div
            ref={listRef}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col justify-center section-padding py-10"
          >
            {chapters.map((chapter) => (
              <motion.button
                key={chapter.id}
                variants={itemVariants}
                onClick={() => handleChapterClick(chapter.id)}
                className="
                  group relative
                  w-full text-start
                  border-t border-[var(--cream,#F1EEE8)]/10
                  py-4 md:py-5 lg:py-6
                  bg-transparent outline-none cursor-pointer
                  transition-colors duration-300
                  hover:bg-[var(--cream,#F1EEE8)]/[0.03]
                  focus-visible:bg-[var(--cream,#F1EEE8)]/[0.05]
                  last:border-b last:border-[var(--cream,#F1EEE8)]/10
                "
                style={{ color: 'var(--cream, #F1EEE8)' }}
                data-cursor="hover"
                data-cursor-text={chapter.keyword}
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  {/* Chapter number */}
                  <span className="font-[family-name:var(--font-mono)] text-[11px] md:text-sm tracking-[0.15em] opacity-40 shrink-0">
                    {language === 'ar' ? chapter.numAr : chapter.num}
                  </span>

                  {/* Chapter title */}
                  <span
                    className={`
                      text-2xl md:text-4xl lg:text-5xl font-light tracking-tight
                      transition-transform duration-500 ease-out
                      group-hover:translate-x-2 rtl:group-hover:-translate-x-2
                      ${language === 'ar'
                        ? 'font-[family-name:var(--font-cairo)]'
                        : 'font-[family-name:var(--font-grotesk)]'
                      }
                    `}
                  >
                    {language === 'ar' ? chapter.titleAr : chapter.titleEn}
                  </span>

                  {/* Strategic keyword — visible on hover */}
                  <span
                    className="
                      hidden md:inline-block
                      font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] uppercase
                      opacity-0 group-hover:opacity-40
                      transition-all duration-500 ease-out
                      translate-x-4 group-hover:translate-x-0
                      rtl:-translate-x-4 rtl:group-hover:translate-x-0
                      ms-auto
                    "
                  >
                    {chapter.keyword}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Footer */}
          <div className="section-padding py-6 flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.2em] uppercase opacity-30">
              {language === 'ar' ? 'شاورما العراب — مفهوم العلامة' : 'SHAWARMA AL-ARRAB — BRAND CONCEPT'}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.2em] uppercase opacity-30">
              08 {language === 'ar' ? 'فصول' : 'CHAPTERS'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

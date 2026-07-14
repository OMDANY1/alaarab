'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Preloader,
  Discovery,
  Insight,
  BrandIdea,
  Strategy,
  Voice,
  Visual,
  Experience,
  Future,
} from '@/components/chapters';
import Navigation from '@/components/layout/Navigation';
import FullScreenIndex from '@/components/layout/FullScreenIndex';
import ChapterProgress from '@/components/layout/ChapterProgress';
import CustomCursor from '@/components/layout/CustomCursor';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [indexOpen, setIndexOpen] = useState(false);

  return (
    <>
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Preloader */}
      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Fixed Layout Elements */}
      {!loading && (
        <>
          <Navigation onToggleIndex={() => setIndexOpen(!indexOpen)} />
          <ChapterProgress />
          
          <AnimatePresence>
            {indexOpen && (
              <FullScreenIndex
                isOpen={indexOpen}
                onClose={() => setIndexOpen(false)}
              />
            )}
          </AnimatePresence>
        </>
      )}

      {/* Main Single-Page Presentation Scroll */}
      <main
        className={`w-full overflow-x-hidden transition-opacity duration-1000 bg-[#F1EEE8] ${
          loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'
        }`}
      >
        <Discovery />
        <Insight />
        <BrandIdea />
        <Strategy />
        <Voice />
        <Visual />
        <Experience />
        <Future />
      </main>
    </>
  );
}

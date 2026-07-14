'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';
import ChapterIntro from '@/components/ui/ChapterIntro';

const SectionHeader = ({ label, number }: { label: string; number: string }) => (
  <div className="w-full flex justify-between items-center border-b border-current/10 pb-4 mb-12 select-none font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase opacity-45">
    <span>{label}</span>
    <span>{number}</span>
  </div>
);

export default function BrandIdea() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const equationRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Build-Up Timeline ──
    const tlBuild = gsap.timeline({
      scrollTrigger: {
        trigger: textRevealRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
      },
    });

    const items = gsap.utils.toArray('.buildup-item');
    const climax = document.querySelector('.climax-headline');
    const climaxSub = document.querySelector('.climax-sub');

    gsap.set(items, { opacity: 0, y: 30 });
    gsap.set(climax, { clipPath: 'inset(0 0 100% 0)', scale: 0.95 });
    gsap.set(climaxSub, { opacity: 0, y: 20 });

    items.forEach((item: any, i) => {
      tlBuild.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(item, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        delay: 0.4,
      });
    });

    tlBuild.to(climax, {
      clipPath: 'inset(0 0 0% 0)',
      scale: 1,
      duration: 1.5,
      ease: 'power4.out',
    })
    .to(climaxSub, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.5');

    // ── Interactive Equation ──
    const tlEq = gsap.timeline({
      scrollTrigger: {
        trigger: equationRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tlEq.fromTo('.interactive-node',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: 'power2.out' }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#2D070B] text-[#F1EEE8] overflow-hidden">
      {/* Intro */}
      <ChapterIntro
        id="concept"
        number="03"
        titleAr="المفهوم"
        titleEn="CONCEPT"
      />

      {/* Climax Climax Climax */}
      <section ref={textRevealRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B]">
        <SectionHeader
          label={language === 'ar' ? 'الباب الثالث / المفهوم المركزي' : 'CHAPTER 03 / CORE BRAND IDEA'}
          number="03 / 08"
        />
        
        <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col justify-center items-center relative text-center min-h-[40vh]">
          {/* Build up steps */}
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <div className="buildup-item font-display text-heading-lg font-light tracking-wide opacity-0">
              {language === 'ar' ? 'بعد تحليل الاسم...' : 'After analyzing the name...'}
            </div>
            <div className="buildup-item font-display text-heading-lg font-light tracking-wide opacity-0">
              {language === 'ar' ? 'القصة الكامنة...' : 'The latent story...'}
            </div>
            <div className="buildup-item font-display text-heading-lg font-light tracking-wide opacity-0">
              {language === 'ar' ? 'والخبرة التراكمية...' : 'And the years of mastery...'}
            </div>
          </div>

          {/* Climax reveal */}
          <div className="flex flex-col items-center gap-6">
            <h2 className="climax-headline font-arabic-display text-[12vw] md:text-[10vw] font-black text-[#E64648] leading-[1.2] py-2 select-none">
              للصنعة عرّاب
            </h2>
            <div className="climax-sub font-display text-[3vw] md:text-[2vw] font-light text-[#F1EEE8] opacity-80 uppercase tracking-[0.15em] select-none mt-4">
              EVERY CRAFT HAS ITS MASTER.
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Brand Equation Section */}
      <section
        ref={equationRef}
        className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8] text-[#2D070B]"
      >
        <SectionHeader
          label={language === 'ar' ? 'المعادلة التفاعلية' : 'INTERACTIVE EQUATION'}
          number="03 / 08"
        />
        
        <div className="flex-1 max-w-4xl mx-auto text-center flex flex-col justify-center items-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'مفهوم الصنعة بالأرقام' : 'THE ALCHEMY OF AL-ARRAB'}
            </span>
            <h3 className="font-display text-heading-lg md:text-display-md font-bold leading-tight py-1">
              {language === 'ar' ? 'كيف نصيغ الريادة؟' : 'How mastery is structured.'}
            </h3>
          </div>

          {/* Equation system */}
          <div className="grid grid-cols-1 md:grid-cols-7 items-center justify-center gap-6 font-display font-black text-[5vw] md:text-[2.2vw] w-full">
            <div className="interactive-node col-span-2 flex flex-col items-center bg-[#2D070B] text-[#F1EEE8] px-6 py-8 rounded-sm shadow-md hover:scale-105 transition-all duration-300 select-none">
              <span className="text-[11px] font-mono opacity-50 mb-2">{language === 'ar' ? 'المكون الأول' : 'YEARS'}</span>
              <span>{language === 'ar' ? 'السنين' : 'EXPERIENCE'}</span>
            </div>
            
            <div className="interactive-node text-[#E64648] font-bold text-[8vw] md:text-[3vw]">+</div>
            
            <div className="interactive-node col-span-2 flex flex-col items-center bg-[#2D070B] text-[#F1EEE8] px-6 py-8 rounded-sm shadow-md hover:scale-105 transition-all duration-300 select-none">
              <span className="text-[11px] font-mono opacity-50 mb-2">{language === 'ar' ? 'المكون الثاني' : 'SECRET'}</span>
              <span>{language === 'ar' ? 'معرفة الصنعة' : 'MASTERY'}</span>
            </div>
            
            <div className="interactive-node text-[#E64648] font-bold text-[8vw] md:text-[3vw]">=</div>
            
            <div className="interactive-node col-span-2 flex flex-col items-center bg-[#E64648] text-[#F1EEE8] px-6 py-8 rounded-sm shadow-xl hover:scale-105 transition-all duration-300 select-none">
              <span className="text-[11px] font-mono text-[#2D070B] opacity-60 mb-2">{language === 'ar' ? 'المكانة النهائية' : 'SOVEREIGNTY'}</span>
              <span>{language === 'ar' ? 'العراب' : 'AL-ARRAB'}</span>
            </div>
          </div>

          <div className="font-body text-body opacity-80 max-w-xl mx-auto leading-relaxed mt-6">
            {language === 'ar'
              ? 'العراب ليس شعارًا نرفعه، بل هو النتيجة الطبيعية لاجتماع سنين الخبرة الطويلة مع الإحاطة التامة بأسرار وإتقان المهنة.'
              : 'Al-Arrab is not a commercial claim, but the logical output when cumulative decades of experience merge with complete craft secrets.'}
          </div>
        </div>
      </section>
    </div>
  );
}

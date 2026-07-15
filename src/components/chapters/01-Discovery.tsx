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

export default function Discovery() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const noiseWallRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const turningPointRef = useRef<HTMLDivElement>(null);

  const noisePhrasesAr = [
    'ألذ شاورما',
    'الطعم الأصلي',
    'أفضل جودة',
    'نكهة لا تقاوم',
    'شاورما طازة',
    'أجود المكونات',
    'الطعم الحقيقي',
    'خلطة سرية',
    'شاورما فاخرة',
    'تجربة لا تنسى',
    'الأصل والطعم',
    'جودة لا مثيل لها',
  ];

  const noisePhrasesEn = [
    'BEST SHAWARMA',
    'ORIGINAL TASTE',
    'PREMIUM QUALITY',
    'IRRESISTIBLE FLAVOR',
    'FRESH SHAWARMA',
    'FINEST INGREDIENTS',
    'REAL TASTE',
    'SECRET RECIPE',
      'UNFORGETTABLE',
    'AUTHENTIC',
    'UNMATCHED QUALITY',
  ];

  const phrases = language === 'ar' ? noisePhrasesAr : noisePhrasesEn;

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop timeline triggers (1024px and above)
    mm.add("(min-width: 1024px)", () => {
      // ── Category Noise Wall Scroll Animation ──
      const words = gsap.utils.toArray('.noise-word');
      const tlNoise = gsap.timeline({
        scrollTrigger: {
          trigger: noiseWallRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        },
      });

      // Randomize initial positions & sizes
      words.forEach((word: any, i) => {
        const angle = (i / words.length) * Math.PI * 2;
        const radius = 100 + Math.random() * 200;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.set(word, {
          x: x * 1.6,
          y: y * 1.6,
          scale: 0.6 + Math.random() * 0.8,
          opacity: 0.05 + Math.random() * 0.3,
          rotation: -15 + Math.random() * 30,
        });
      });

      // Animate word collision/acceleration, blur out and disappear
      tlNoise.to(words, {
        x: 0,
        y: 0,
        scale: 1.4,
        opacity: 0.8,
        filter: 'blur(0px)',
        stagger: 0.02,
        duration: 1,
      })
      .to(words, {
        scale: 0.2,
        opacity: 0,
        filter: 'blur(20px)',
        stagger: 0.01,
        duration: 0.8,
      });

      // ── The Untold Story Sticky Section (Color Narrative Transition) ──
      const tlProblem = gsap.timeline({
        scrollTrigger: {
          trigger: problemRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      });

      const lines = gsap.utils.toArray('.problem-line-wrapper');
      gsap.set(lines, { opacity: 0, y: 40 });

      // Animate background color change from Cream to Deep Burgundy
      tlProblem.to(problemRef.current, {
        backgroundColor: '#2D070B',
        color: '#F1EEE8',
        duration: 1,
        ease: 'none',
      }, 0);

      lines.forEach((line: any, index) => {
        tlProblem.to(line, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
        .to(line, {
          opacity: index === lines.length - 1 ? 1 : 0.08,
          y: index === lines.length - 1 ? 0 : -20,
          duration: 0.8,
          delay: 0.5,
        });
      });
    });

    // Mobile and tablet natural layout flow fallback (Under 1024px)
    mm.add("(max-width: 1023px)", () => {
      const words = gsap.utils.toArray('.noise-word');
      const lines = gsap.utils.toArray('.problem-line-wrapper');

      // Clear any inline inline styles/transforms to allow natural relative wraps
      gsap.set(words, {
        clearProps: "all",
      });
      gsap.set(lines, {
        opacity: 1,
        y: 0,
      });
      
      // Ensure local variables match color shift instantly
      gsap.set(problemRef.current, {
        backgroundColor: '#2D070B',
        color: '#F1EEE8',
      });
    });

    // ── Turning Point 30+ Years Reveal ──
    const tlTurning = gsap.timeline({
      scrollTrigger: {
        trigger: turningPointRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tlTurning.fromTo('.turning-number',
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power4.out' }
    )
    .fromTo('.turning-sub',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.turning-desc',
      { opacity: 0, y: 30 },
      { opacity: 0.9, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bg-[#F1EEE8] text-[#2D070B] overflow-hidden">
      {/* Intro */}
      <ChapterIntro
        id="discovery"
        number="01"
        titleAr="الاكتشاف"
        titleEn="DISCOVERY"
      />

      {/* Part B: Category Statement (Redesigned Editorial Spread) */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'الباب الأول / المشكلة' : 'CHAPTER 01 / THE TENSION'}
          number="01 / 08"
        />
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Left Side: rotated English Annotation */}
          <div className="lg:col-span-3 flex lg:justify-start justify-center items-center h-full relative order-last lg:order-first">
            <div className="flex items-center gap-4 lg:rotate-90 origin-left lg:translate-x-12 whitespace-nowrap">
              <span className="h-[1px] w-12 bg-[#2D070B]/30" />
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-60">
                {language === 'ar' ? 'تصنيف السوق' : 'SHAWARMA IS EVERYWHERE.'}
              </span>
            </div>
          </div>

          {/* Right Side: Dominant Arabic Statement */}
          <div className="lg:col-span-9 flex flex-col justify-center items-start gap-8 w-full order-first lg:order-last">
            <h2 className="font-cairo text-[#E64648] text-display-xl font-black leading-[1.1] select-none w-full text-start">
              {language === 'ar' ? 'الشاورما في كل مكان.' : 'SHAWARMA IS EVERYWHERE.'}
            </h2>
            <h3 className="font-cairo text-[#2D070B] text-heading-lg md:text-display-md font-bold leading-[1.2] opacity-90 text-start max-w-3xl">
              {language === 'ar' ? 'لكن كم مكان يعرف الصنعة فعلًا؟' : 'But how many actually know the craft?'}
            </h3>
          </div>
        </div>
      </section>

      {/* Part C: Category Noise Wall */}
      <section ref={noiseWallRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8] overflow-hidden max-lg:min-h-0">
        <SectionHeader
          label={language === 'ar' ? 'ضوضاء السوق' : 'CATEGORY NOISE'}
          number="01 / 08"
        />
        <div className="flex-1 relative w-full flex items-center justify-center overflow-hidden min-h-[50vh] max-lg:flex-wrap max-lg:gap-4 max-lg:py-12 max-lg:px-4 max-lg:min-h-0">
          {phrases.map((phrase, i) => (
            <span
              key={i}
              className="noise-word absolute lg:absolute font-cairo text-[4vw] md:text-[2.5vw] font-black text-[#2D070B] whitespace-nowrap pointer-events-none opacity-20 max-lg:relative max-lg:text-body-lg max-lg:opacity-65 max-lg:pointer-events-auto"
            >
              {phrase}
            </span>
          ))}
        </div>
      </section>

      {/* Part D: The Untold Story Sticky Section (Dynamic Background Transition) */}
      <section ref={problemRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8] text-[#2D070B] transition-colors duration-300">
        <SectionHeader
          label={language === 'ar' ? 'الرؤية الاستراتيجية' : 'THE STRATEGIC INSIGHT'}
          number="01 / 08"
        />
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto w-full gap-16 relative min-h-[50vh] max-md:gap-8">
          <div className="problem-line-wrapper py-3">
            <div className="problem-line font-cairo text-heading-lg md:text-display-md font-bold leading-tight">
              {language === 'ar' ? 'المشكلة لم تكن في المنتج.' : 'THE PROBLEM WAS NEVER THE PRODUCT.'}
            </div>
          </div>
          <div className="problem-line-wrapper py-3">
            <div className="problem-line font-cairo text-heading-lg md:text-display-md font-black text-[#E64648] leading-tight">
              {language === 'ar' ? 'المشكلة كانت في القصة التي لم تُروَ بعد.' : 'THE PROBLEM WAS THE STORY UNTOLD.'}
            </div>
          </div>
        </div>
      </section>

      {/* Part E: The 30 Years Reveal (Strategic Turning Point - Redesigned Asymmetric Spread) */}
      <section
        ref={turningPointRef}
        className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#E64648] text-[#F1EEE8]"
      >
        <SectionHeader
          label={language === 'ar' ? 'نقطة التحول' : 'THE TURNING POINT'}
          number="01 / 08"
        />
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Left Column: Headline (Visual Hero) */}
          <div className="lg:col-span-8 flex flex-col justify-center items-start gap-4 text-start">
            <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">
              {language === 'ar' ? 'الخبرة التراكمية' : 'THE HISTORICAL DEPTH'}
            </span>
            <h4 className="turning-sub font-cairo text-heading-lg lg:text-display-md font-black leading-[1.1] py-1">
              {language === 'ar' ? 'خبرة في الصنعة.' : 'YEARS OF CRAFT MASTERY.'}
            </h4>
          </div>

          {/* Right Column: Numeral & Description (Supporting Composition) */}
          <div className="lg:col-span-4 flex flex-col justify-center items-start gap-6 text-start lg:border-s lg:border-[#F1EEE8]/20 lg:ps-8">
            <div className="turning-number font-mono text-[7vw] lg:text-[5vw] font-bold text-[#F1EEE8] leading-none select-none">
              {language === 'ar' ? '٣٠+' : '30+'}
            </div>
            <p className="turning-desc font-cairo text-body-lg opacity-85 leading-relaxed">
              {language === 'ar'
                ? 'أكثر من ٣٠ سنة في الصنعة. خبرة لا تبنى في حملة، بل تصنعها السنين.'
                : 'More than 30 years of professional restaurant mastery in Saudi Arabia. Built over decades, not templates.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

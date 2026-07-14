'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';
import ChapterIntro from '@/components/ui/ChapterIntro';
import KineticHeadline from '@/components/ui/KineticHeadline';

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
    'LUXURY SHAWARMA',
    'UNFORGETTABLE',
    'AUTHENTIC',
    'UNMATCHED QUALITY',
  ];

  const phrases = language === 'ar' ? noisePhrasesAr : noisePhrasesEn;

  useGSAP(() => {
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
      const radius = 80 + Math.random() * 150;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      gsap.set(word, {
        x: x * 1.5,
        y: y * 1.5,
        scale: 0.6 + Math.random() * 1.0,
        opacity: 0.1 + Math.random() * 0.35,
        rotation: -15 + Math.random() * 30,
      });
    });

    // Animate word collision/acceleration, blur out and disappear
    tlNoise.to(words, {
      x: 0,
      y: 0,
      scale: 1.5,
      opacity: 1,
      filter: 'blur(0px)',
      stagger: 0.02,
      duration: 1,
    })
    .to(words, {
      scale: 0.3,
      opacity: 0,
      filter: 'blur(15px)',
      stagger: 0.01,
      duration: 0.8,
    });

    // ── The Untold Story Sticky Section ──
    const tlProblem = gsap.timeline({
      scrollTrigger: {
        trigger: problemRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
      },
    });

    const lines = gsap.utils.toArray('.problem-line');
    gsap.set(lines, { opacity: 0, y: 55 });

    lines.forEach((line: any, index) => {
      tlProblem.to(line, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .to(line, {
        opacity: index === lines.length - 1 ? 1 : 0,
        y: index === lines.length - 1 ? 0 : -35,
        duration: 0.8,
        delay: 0.6,
      });
    });

    // ── Turning Point 30+ Years Reveal ──
    const tlTurning = gsap.timeline({
      scrollTrigger: {
        trigger: turningPointRef.current,
        start: 'top 80%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      },
    });

    // Dramatic background transition to burgundy
    gsap.to(turningPointRef.current, {
      scrollTrigger: {
        trigger: turningPointRef.current,
        start: 'top 50%',
        end: 'top 10%',
        scrub: true,
      },
      backgroundColor: '#2D070B',
      color: '#F1EEE8',
    });

    tlTurning.fromTo('.turning-number', 
      { scale: 0.6, opacity: 0, y: 80 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo('.turning-sub',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.turning-desc',
      { opacity: 0, y: 30 },
      { opacity: 0.85, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

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

      {/* Part B: Category Statement */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'الباب الأول / المشكلة' : 'CHAPTER 01 / THE TENSION'}
          number="01 / 08"
        />
        <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full gap-8">
          <KineticHeadline
            tag="h2"
            text={language === 'ar' ? 'الشاورما في كل مكان.' : 'SHAWARMA IS EVERYWHERE.'}
            className="text-[#E64648] font-black uppercase text-display-xl tracking-tight"
          />
          <KineticHeadline
            tag="h3"
            text={language === 'ar' ? 'لكن كم مكان يعرف الصنعة فعلًا؟' : 'MASTERY IS NOT.'}
            className="font-bold text-display-md tracking-tight opacity-90"
          />
        </div>
      </section>

      {/* Part C: Category Noise Wall */}
      <section ref={noiseWallRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8]">
        <SectionHeader
          label={language === 'ar' ? 'ضوضاء السوق' : 'CATEGORY NOISE'}
          number="01 / 08"
        />
        <div className="flex-1 relative w-full flex items-center justify-center overflow-hidden min-h-[50vh]">
          {phrases.map((phrase, i) => (
            <span
              key={i}
              className="noise-word absolute font-display text-[3.5vw] md:text-[2vw] font-black text-[#2D070B] whitespace-nowrap pointer-events-none"
            >
              {phrase}
            </span>
          ))}
        </div>
      </section>

      {/* Part D: The Untold Story Sticky Section */}
      <section ref={problemRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8]">
        <SectionHeader
          label={language === 'ar' ? 'الرؤية الاستراتيجية' : 'THE STRATEGIC INSIGHT'}
          number="01 / 08"
        />
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full gap-8 relative min-h-[40vh]">
          <div className="problem-line font-display text-heading-lg md:text-display-md font-bold leading-tight py-1">
            {language === 'ar' ? 'المشكلة لم تكن في المنتج.' : 'THE PROBLEM WAS NEVER THE PRODUCT.'}
          </div>
          <div className="problem-line font-display text-heading-lg md:text-display-md font-black text-[#E64648] leading-tight py-1">
            {language === 'ar' ? 'المشكلة كانت في القصة التي لم تُروَ بعد.' : 'THE PROBLEM WAS THE STORY UNTOLD.'}
          </div>
        </div>
      </section>

      {/* Part E: The 30 Years Reveal (Strategic Turning Point) */}
      <section
        ref={turningPointRef}
        className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8] text-[#2D070B] transition-colors duration-500"
      >
        <SectionHeader
          label={language === 'ar' ? 'نقطة التحول' : 'THE TURNING POINT'}
          number="01 / 08"
        />
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full gap-6">
          <div className="turning-number font-mono text-[18vw] md:text-[14vw] font-bold text-[#E64648] leading-none py-2">
            +30
          </div>
          <div className="turning-sub font-display text-heading-lg md:text-display-md font-bold uppercase tracking-widest leading-none py-1">
            {language === 'ar' ? 'سنة خبرة في الصنعة' : 'YEARS OF EXPERT CRAFT'}
          </div>
          <div className="turning-desc font-body text-body-lg md:text-heading-sm opacity-85 max-w-2xl mt-4 leading-relaxed">
            {language === 'ar'
              ? 'أكثر من ٣٠ سنة في الصنعة. خبرة لا تبنى في حملة، بل تصنعها السنين.'
              : 'More than 30 years of professional restaurant mastery in Saudi Arabia. Built over decades, not templates.'}
          </div>
        </div>
      </section>
    </div>
  );
}

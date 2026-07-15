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

export default function Insight() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const evolutionRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const equationRef = useRef<HTMLDivElement>(null);

  const stepsAr = ['العراب', 'الأب الروحي', 'المرشد', 'صاحب الخبرة', 'مرجع الصنعة'];
  const stepsEn = ['AL-ARRAB', 'THE GODFATHER', 'THE MENTOR', 'THE EXPERT', 'MASTER OF THE CRAFT'];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop only scroll-pin timelines (1024px and above)
    mm.add("(min-width: 1024px)", () => {
      // ── Evolution Sequence (Pinned Stack & Line Reveals) ──
      const steps = gsap.utils.toArray('.evolution-step');
      const tlEvolution = gsap.timeline({
        scrollTrigger: {
          trigger: evolutionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      });

      gsap.set(steps, { opacity: 0, y: 40, scale: 0.95 });
      
      // Animate grid guidelines
      tlEvolution.fromTo('.ev-line-y',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.5, ease: 'none' },
        0
      );

      steps.forEach((step: any, index) => {
        tlEvolution.to(step, {
          opacity: 1,
          y: 0,
          scale: 1,
          color: index === steps.length - 1 ? '#E64648' : '#F1EEE8',
          duration: 1,
          ease: 'power3.out',
        })
        .to(step, {
          opacity: index === steps.length - 1 ? 1 : 0.05,
          y: index === steps.length - 1 ? 0 : -30,
          scale: index === steps.length - 1 ? 1.05 : 0.95,
          duration: 0.8,
          delay: 0.4,
        });
      });

      // ── Connection Scroll Statements (Asymmetric Reveal) ──
      const tlStatements = gsap.timeline({
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        },
      });

      const lines = gsap.utils.toArray('.stmt-line-wrapper');
      gsap.set(lines, { opacity: 0, y: 30 });

      lines.forEach((line: any, index) => {
        tlStatements.to(line, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
        .to(line, {
          opacity: index === lines.length - 1 ? 1 : 0.1,
          y: index === lines.length - 1 ? 0 : -15,
          duration: 0.8,
          delay: 0.4,
        });
      });
    });

    // Mobile/Tablet natural vertical scroll layout fallback (Under 1024px)
    mm.add("(max-width: 1023px)", () => {
      const steps = gsap.utils.toArray('.evolution-step');
      const lines = gsap.utils.toArray('.stmt-line-wrapper');

      gsap.set(steps, {
        clearProps: "all",
      });
      gsap.set(steps, {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      gsap.set(lines, {
        opacity: 1,
        y: 0,
      });
    });

    // ── Interactive Equation Animate In (Blueprint Mode) ──
    const tlEq = gsap.timeline({
      scrollTrigger: {
        trigger: equationRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tlEq.fromTo('.eq-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.eq-op',
      { opacity: 0, scale: 0.8 },
      { opacity: 0.4, scale: 1, stagger: 0.1, duration: 0.4, ease: 'back.out(1.5)' },
      '-=0.6'
    )
    .fromTo('.eq-result-bp',
      { borderColor: 'rgba(45, 7, 11, 0.1)', backgroundColor: 'transparent' },
      { borderColor: '#2D070B', backgroundColor: '#2D070B', color: '#F1EEE8', duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bg-[#2D070B] text-[#F1EEE8] overflow-hidden">
      {/* Intro */}
      <ChapterIntro
        id="insight"
        number="02"
        titleAr="الفكرة"
        titleEn="INSIGHT"
      />

      {/* Part B: The Name (Asymmetric Spread with Escaped Grid Photo) */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'الباب الثاني / المعنى' : 'CHAPTER 02 / THE CODES'}
          number="02 / 08"
        />
        
        {/* Massive background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#F1EEE8]/[0.02] text-[24vw] font-cairo font-black w-full text-center select-none pointer-events-none z-0">
          {language === 'ar' ? 'العراب' : 'ARRAB'}
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto z-10 relative">
          
          {/* Left Column: Escaped Grid Photography */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute inset-0 border border-[#F1EEE8]/10 rounded-sm scale-105 pointer-events-none z-0" />
            <img
              src="/images/chef_hands.png"
              alt={language === 'ar' ? 'الأيدي الحرفية' : 'Craft hands'}
              className="w-full h-[400px] object-cover rounded-sm border border-[#F1EEE8]/20 shadow-2xl relative z-10 -rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>

          {/* Right Column: Typographic Details */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start gap-6 text-start lg:ps-12">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'المفهوم الاستراتيجي' : 'THE CONCEPT'}
            </span>
            <h3 className="font-cairo text-heading-lg lg:text-display-md font-black leading-[1.2] tracking-tighter">
              {language === 'ar' ? 'السيادة والوقار في الصنعة.' : 'SOVEREIGNTY & CRAFT STATUS.'}
            </h3>
            <div className="h-[1px] w-20 bg-[#F1EEE8]/20" />
            <p className="font-cairo text-body-lg opacity-80 leading-relaxed max-w-2xl">
              {language === 'ar'
                ? 'تجاوز الفهم السطحي للكلمة. نحن لا نستحضر أفلام المافيا ولا نسخر من الرموز السينمائية. نحن نستلهم المعاني الأعمق: المعرفة التراكمية، السيادة، الهيبة، واحترام الصنعة.'
                : 'Going beyond film parodies. We do not copy mafia aesthetics. Instead, we extract the core conceptual values: guidance, mastery, quiet confidence, and craft authority.'}
            </p>
          </div>
        </div>
      </section>

      {/* Part C: Conceptual Evolution (Redesigned Editorial Pinned Stack) */}
      <section ref={evolutionRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B] overflow-hidden max-lg:min-h-0">
        <SectionHeader
          label={language === 'ar' ? 'تطور الفكرة' : 'CONCEPT EVOLUTION'}
          number="02 / 08"
        />
        
        {/* Background blueprint guide lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white/[0.03] origin-top ev-line-y scale-y-0" />
        <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-white/[0.03] origin-top ev-line-y scale-y-0" />

        <div className="flex-1 relative w-full flex items-center justify-center min-h-[50vh] max-lg:min-h-0 max-lg:py-8">
          <div className="absolute top-4 left-4 font-mono text-[9px] opacity-35 tracking-widest uppercase max-lg:static max-lg:mb-6 max-lg:text-center">
            {language === 'ar' ? 'سلسلة التطور الدلالي' : 'SEMANTIC CHAIN PROGRESS'}
          </div>
          
          <div className="relative w-full max-w-4xl h-[200px] flex items-center justify-center max-lg:h-auto max-lg:flex-col max-lg:gap-8 max-lg:relative">
            {(language === 'ar' ? stepsAr : stepsEn).map((step, i) => (
              <div
                key={i}
                className="evolution-step absolute lg:absolute font-cairo text-display-md lg:text-display-lg font-black tracking-tighter text-center max-lg:relative max-lg:text-heading-lg"
              >
                {step}
                {i < stepsAr.length - 1 && (
                  <div className="text-[12px] opacity-30 mt-2 text-center lg:hidden">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part D: The Connection Scroll Sequence (Asymmetric Layout Reveal) */}
      <section ref={statementRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B]">
        <SectionHeader
          label={language === 'ar' ? 'الرابط الاستراتيجي' : 'THE STRATEGIC STORY'}
          number="02 / 08"
        />
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto z-10 relative">
          {/* Left Column: Giant Quote Statement (Occupies 7/12) */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start gap-4 text-start">
            <div className="stmt-line-wrapper py-2">
              <h4 className="stmt-line font-cairo text-heading-lg lg:text-display-md font-black leading-[1.1] text-[#E64648]">
                {language === 'ar' ? 'العراب ليس شخصية. العراب مكانة.' : 'AL-ARRAB IS NOT A CHARACTER. IT IS A STATUS.'}
              </h4>
            </div>
          </div>

          {/* Right Column: Supporting Annotations (Occupies 5/12) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start gap-6 text-start lg:border-s lg:border-[#F1EEE8]/20 lg:ps-8">
            <div className="stmt-line-wrapper py-1">
              <p className="stmt-line font-cairo text-heading-sm opacity-90 leading-relaxed">
                {language === 'ar' ? 'مكانة لا تصنعها حملة إعلانية.' : 'A status no ad campaign can manufacture.'}
              </p>
            </div>
            <div className="stmt-line-wrapper py-1">
              <div className="h-[1px] w-16 bg-[#E64648]/40 stmt-line" />
            </div>
            <div className="stmt-line-wrapper py-1">
              <p className="stmt-line font-cairo text-body-lg opacity-75 leading-relaxed">
                {language === 'ar'
                  ? 'مكانة تصنعها السنين المتراكمة وخبرة الصنعة التي تدرك التفاصيل.'
                  : 'A status forged by decades of kitchen mastery and process mastery.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part E: Strategic Connection Equation (Redesigned Blueprint Swatches) */}
      <section
        ref={equationRef}
        className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8] text-[#2D070B] overflow-hidden"
      >
        <SectionHeader
          label={language === 'ar' ? 'معادلة العلامة' : 'THE BRAND EQUATION'}
          number="02 / 08"
        />
        
        <div className="flex-1 flex flex-col justify-center items-center max-w-6xl mx-auto w-full gap-12 relative">
          {/* Blueprint crop marks */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#2D070B]/10" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#2D070B]/10" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#2D070B]/10" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#2D070B]/10" />

          <div className="font-mono text-[9px] tracking-[0.3em] text-[#E64648] uppercase text-center select-none opacity-80">
            {language === 'ar' ? 'تكامل الأصول والمنفعة' : 'BRAND CONSTITUTION BLUEPRINT'}
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 font-cairo font-black text-[5vw] lg:text-[2.2vw] leading-none uppercase w-full px-6">
            
            {/* Swatch 01 */}
            <div className="eq-card flex flex-col items-start border border-[#2D070B]/10 bg-white/40 p-6 md:p-8 rounded-sm w-full lg:w-[22%] relative">
              <span className="absolute top-3 right-3 font-mono text-[10px] opacity-45">01 // AGE</span>
              <span className="text-[11px] font-mono text-[#E64648] tracking-widest mb-4">THE ORIGIN</span>
              <span className="text-[#2D070B]">{language === 'ar' ? 'السنين' : 'YEARS'}</span>
            </div>
            
            <div className="eq-op text-[#E64648] text-[8vw] lg:text-[3vw] font-light select-none opacity-45">+</div>
            
            {/* Swatch 02 */}
            <div className="eq-card flex flex-col items-start border border-[#2D070B]/10 bg-white/40 p-6 md:p-8 rounded-sm w-full lg:w-[22%] relative">
              <span className="absolute top-3 right-3 font-mono text-[10px] opacity-45">02 // MASTER</span>
              <span className="text-[11px] font-mono text-[#E64648] tracking-widest mb-4">THE METHOD</span>
              <span className="text-[#2D070B]">{language === 'ar' ? 'الصنعة' : 'CRAFT'}</span>
            </div>
            
            <div className="eq-op text-[#E64648] text-[8vw] lg:text-[3vw] font-light select-none opacity-45">+</div>
            
            {/* Swatch 03 */}
            <div className="eq-card flex flex-col items-start border border-[#2D070B]/10 bg-white/40 p-6 md:p-8 rounded-sm w-full lg:w-[22%] relative">
              <span className="absolute top-3 right-3 font-mono text-[10px] opacity-45">03 // VALUE</span>
              <span className="text-[11px] font-mono text-[#E64648] tracking-widest mb-4">THE PRODUCT</span>
              <span className="text-[#2D070B]">{language === 'ar' ? 'الطعم' : 'TASTE'}</span>
            </div>
            
            <div className="eq-op text-[#E64648] text-[8vw] lg:text-[3vw] font-light select-none opacity-45">=</div>
            
            {/* Result Blueprint */}
            <div className="eq-card eq-result-bp flex flex-col items-start border border-[#2D070B]/20 p-6 md:p-8 rounded-sm w-full lg:w-[26%] shadow-lg relative transition-colors duration-500">
              <span className="absolute top-3 right-3 font-mono text-[10px] opacity-60">RESULT</span>
              <span className="text-[11px] font-mono text-[#E64648] tracking-widest mb-4">THE IDENTITY</span>
              <span className="font-bold">{language === 'ar' ? 'العراب' : 'AL-ARRAB'}</span>
            </div>

          </div>
          
          <p className="font-cairo text-body-lg max-w-2xl opacity-75 mt-4 leading-relaxed text-center px-4">
            {language === 'ar'
              ? 'تتكامل السنين التراكمية مع معرفة سر الصنعة، لنقدم الطعم الحقيقي المعاصر دون زيف أو ادعاءات مكررة.'
              : 'Three decades of accumulated taste knowledge layered with total process mastery: a fast-food brand built with sovereign authority.'}
          </p>
        </div>
      </section>
    </div>
  );
}

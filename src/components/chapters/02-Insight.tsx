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

export default function Insight() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const evolutionRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const equationRef = useRef<HTMLDivElement>(null);

  const stepsAr = ['العراب', 'الأب الروحي', 'المرشد', 'صاحب الخبرة', 'مرجع الصنعة'];
  const stepsEn = ['AL-ARRAB', 'THE GODFATHER', 'THE MENTOR', 'THE EXPERT', 'MASTER OF THE CRAFT'];

  useGSAP(() => {
    // ── Evolution Sequence ──
    const steps = gsap.utils.toArray('.evolution-step');
    const tlEvolution = gsap.timeline({
      scrollTrigger: {
        trigger: evolutionRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
      },
    });

    gsap.set(steps, { opacity: 0.1, y: 50, scale: 0.9 });

    steps.forEach((step: any, index) => {
      tlEvolution.to(step, {
        opacity: 1,
        y: 0,
        scale: 1,
        color: index === steps.length - 1 ? '#E64648' : '#F1EEE8',
        duration: 1,
        ease: 'power2.out',
      })
      .to(step, {
        opacity: index === steps.length - 1 ? 1 : 0.2,
        y: index === steps.length - 1 ? 0 : -20,
        scale: index === steps.length - 1 ? 1.2 : 0.95,
        duration: 0.8,
        delay: 0.3,
      });
    });

    // ── Connection Scroll Statements ──
    const tlStatements = gsap.timeline({
      scrollTrigger: {
        trigger: statementRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
      },
    });

    const lines = gsap.utils.toArray('.stmt-line');
    gsap.set(lines, { opacity: 0, y: 40 });

    lines.forEach((line: any, index) => {
      tlStatements.to(line, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
      .to(line, {
        opacity: index === lines.length - 1 ? 1 : 0,
        y: index === lines.length - 1 ? 0 : -30,
        duration: 1,
        delay: 0.6,
      });
    });

    // ── Interactive Equation Animate In ──
    const tlEq = gsap.timeline({
      scrollTrigger: {
        trigger: equationRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tlEq.fromTo('.eq-part',
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.3, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo('.eq-result',
      { scale: 0.9, color: '#F1EEE8' },
      { scale: 1.1, color: '#E64648', duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.2'
    );

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

      {/* Part B: The Name */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'الباب الثاني / المعنى' : 'CHAPTER 02 / THE CODES'}
          number="02 / 08"
        />
        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full text-center gap-6">
          <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
            {language === 'ar' ? 'الاسم' : 'THE NAME'}
          </span>
          <KineticHeadline
            tag="h2"
            text={language === 'ar' ? 'شاورما العراب' : 'SHAWARMA AL-ARRAB'}
            className="font-arabic-display text-display-xl text-[#F1EEE8]"
          />
          <p className="font-body text-body-lg opacity-70 max-w-2xl mx-auto mt-4 leading-relaxed">
            {language === 'ar'
              ? 'تجاوز الفهم السطحي للكلمة. نحن لا نستحضر أفلام المافيا ولا نسخر من الرموز السينمائية. نحن نستلهم المعاني الأعمق: المعرفة التراكمية، السيادة، الهيبة، واحترام الصنعة.'
              : 'Going beyond film parodies. We do not copy mafia aesthetics. Instead, we extract the core conceptual values: guidance, mastery, quiet confidence, and craft authority.'}
          </p>
        </div>
      </section>

      {/* Part C: Conceptual Evolution */}
      <section ref={evolutionRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B]">
        <SectionHeader
          label={language === 'ar' ? 'تطور الفكرة' : 'CONCEPT EVOLUTION'}
          number="02 / 08"
        />
        <div className="flex-1 flex flex-col justify-center items-center gap-12 select-none min-h-[50vh]">
          {(language === 'ar' ? stepsAr : stepsEn).map((step, i) => (
            <div
              key={i}
              className="evolution-step font-display text-heading-lg md:text-display-md font-black tracking-tight py-1"
            >
              {step}
              {i < stepsAr.length - 1 && (
                <div className="text-[12px] opacity-30 mt-2 text-center">↓</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Part D: The Connection Scroll Sequence */}
      <section ref={statementRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B]">
        <SectionHeader
          label={language === 'ar' ? 'الرابط الاستراتيجي' : 'THE STRATEGIC STORY'}
          number="02 / 08"
        />
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full gap-8 min-h-[40vh]">
          <div className="stmt-line font-display text-heading-lg md:text-display-md font-bold leading-tight py-1">
            {language === 'ar' ? 'العراب ليس شخصية.' : 'AL-ARRAB IS NOT A CHARACTER.'}
          </div>
          <div className="stmt-line font-display text-heading-lg md:text-display-md font-bold text-[#E64648] leading-tight py-1">
            {language === 'ar' ? 'العراب مكانة.' : 'AL-ARRAB IS A STATUS.'}
          </div>
          <div className="stmt-line font-display text-heading-md md:text-heading-lg font-light opacity-80 leading-tight py-1">
            {language === 'ar' ? 'مكانة لا تصنعها حملة.' : 'A STATUS NO AD CAMPAIGN CAN MANUFACTURE.'}
          </div>
          <div className="stmt-line font-display text-heading-lg md:text-display-md font-black text-[#E64648] leading-tight py-1">
            {language === 'ar' ? 'تصنعها السنين.' : 'ONLY TIME CAN.'}
          </div>
        </div>
      </section>

      {/* Part E: Strategic Connection Equation */}
      <section
        ref={equationRef}
        className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8] text-[#2D070B]"
      >
        <SectionHeader
          label={language === 'ar' ? 'معادلة العلامة' : 'THE BRAND EQUATION'}
          number="02 / 08"
        />
        <div className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto w-full gap-12">
          <div className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase text-center">
            {language === 'ar' ? 'كيف تتكامل القصة' : 'CONNECTING THE TRUTHS'}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8 font-display font-black text-[6vw] md:text-[3vw] leading-none uppercase w-full">
            <div className="eq-part flex flex-col items-center bg-[#2D070B] text-[#F1EEE8] px-8 py-6 rounded-sm min-w-[200px] border border-transparent hover:border-[#E64648] hover:scale-105 transition-all duration-300">
              <span className="text-[12px] font-mono tracking-widest opacity-50 mb-2">01</span>
              <span>{language === 'ar' ? 'السنين' : 'YEARS'}</span>
            </div>
            
            <div className="eq-part text-[#E64648] text-[8vw] md:text-[4vw]">+</div>
            
            <div className="eq-part flex flex-col items-center bg-[#2D070B] text-[#F1EEE8] px-8 py-6 rounded-sm min-w-[200px] border border-transparent hover:border-[#E64648] hover:scale-105 transition-all duration-300">
              <span className="text-[12px] font-mono tracking-widest opacity-50 mb-2">02</span>
              <span>{language === 'ar' ? 'الصنعة' : 'CRAFT'}</span>
            </div>
            
            <div className="eq-part text-[#E64648] text-[8vw] md:text-[4vw]">+</div>
            
            <div className="eq-part flex flex-col items-center bg-[#2D070B] text-[#F1EEE8] px-8 py-6 rounded-sm min-w-[200px] border border-transparent hover:border-[#E64648] hover:scale-105 transition-all duration-300">
              <span className="text-[12px] font-mono tracking-widest opacity-50 mb-2">03</span>
              <span>{language === 'ar' ? 'الطعم' : 'TASTE'}</span>
            </div>
            
            <div className="eq-part text-[#E64648] text-[8vw] md:text-[4vw]">=</div>
            
            <div className="eq-part eq-result flex flex-col items-center bg-[#2D070B] px-8 py-8 rounded-sm min-w-[240px] shadow-xl">
              <span className="text-[12px] font-mono tracking-widest text-[#E64648] mb-2">THE SOVEREIGN</span>
              <span className="text-[#F1EEE8] font-bold">{language === 'ar' ? 'العراب' : 'AL-ARRAB'}</span>
            </div>
          </div>
          
          <p className="font-body text-body max-w-xl opacity-70 mt-6 leading-relaxed text-center">
            {language === 'ar'
              ? 'تتكامل السنين التراكمية مع معرفة سر الصنعة، لنقدم الطعم الحقيقي المعاصر دون زيف أو ادعاءات مكررة.'
              : 'Three decades of accumulated taste knowledge layered with total process mastery: a fast-food brand built with sovereign authority.'}
          </p>
        </div>
      </section>
    </div>
  );
}

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

export default function Strategy() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<SVGSVGElement>(null);
  const personalityRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Matrix Animation ──
    const tlMatrix = gsap.timeline({
      scrollTrigger: {
        trigger: matrixRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    tlMatrix.fromTo('.competitor-dot',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.3, stagger: 0.1, duration: 0.6, ease: 'back.out(1.5)' }
    )
    .fromTo('.arrab-dot',
      { scale: 0, opacity: 0, x: 0, y: 0 },
      { scale: 1.2, opacity: 1, x: 120, y: -100, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo('.arrab-label',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.4'
    );

    // ── Personality Striking Anim ──
    const traits = gsap.utils.toArray('.personality-trait');
    traits.forEach((trait: any) => {
      const negative = trait.querySelector('.neg-trait');
      const line = trait.querySelector('.neg-line');

      gsap.timeline({
        scrollTrigger: {
          trigger: trait,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
      .fromTo(negative, { opacity: 0.8 }, { opacity: 0.3, duration: 0.5 })
      .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.3');
    });

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bg-[#F1EEE8] text-[#2D070B] overflow-hidden">
      {/* Intro */}
      <ChapterIntro
        id="strategy"
        number="04"
        titleAr="الاستراتيجية"
        titleEn="STRATEGY"
      />

      {/* Part B: Brand Positioning */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'الباب الرابع / التموضع الاستراتيجي' : 'CHAPTER 04 / BRAND POSITIONING'}
          number="04 / 08"
        />
        
        <div className="flex-1 max-w-5xl mx-auto flex flex-col justify-center gap-8 w-full">
          <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
            {language === 'ar' ? 'التموضع' : 'POSITIONING STATEMENT'}
          </span>
          
          <h3 className="font-display text-heading-lg md:text-display-md font-bold leading-tight max-w-4xl py-1">
            {language === 'ar'
              ? 'شاورما العراب هو مطعم وجبات سريعة معاصر، يحوّل أكثر من ثلاثة عقود من الخبرة في الصنعة إلى تجربة طعام واضحة، واثقة، وثابتة؛ ليقدم الطعم الذي لا يعتمد على المبالغة، بل على معرفة تراكمت مع السنين.'
              : 'Al-Arrab is a contemporary fast-food brand built on more than three decades of craft knowledge — turning experience, consistency and mastery into a taste that needs no exaggeration.'}
          </h3>
        </div>
      </section>

      {/* Part C: Positioning Matrix */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#E5E0D8]">
        <SectionHeader
          label={language === 'ar' ? 'خريطة التموضع' : 'POSITIONING MATRIX'}
          number="04 / 08"
        />
        
        <div className="flex-1 max-w-4xl w-full flex flex-col justify-center items-center gap-12 mx-auto">
          <div className="text-center">
            <span className="font-mono text-[10px] tracking-[0.2em] opacity-50 block mb-2">
              {language === 'ar' ? 'تحليل استراتيجي نوعي' : 'QUALITATIVE STRATEGIC ANALYSIS'}
            </span>
            <h4 className="font-display text-heading-md font-bold leading-tight">
              {language === 'ar' ? 'أين يقع العراب في السوق؟' : 'Mapping the Al-Arrab Territory'}
            </h4>
          </div>

          {/* Matrix SVG */}
          <div className="relative w-full max-w-[500px] aspect-square bg-[#F1EEE8] border border-black/10 rounded-sm shadow-inner p-8 flex items-center justify-center">
            <svg
              ref={matrixRef}
              viewBox="-200 -200 400 400"
              className="w-full h-full text-[#2D070B]"
            >
              {/* Axes */}
              <line x1="-180" y1="0" x2="180" y2="0" className="stroke-current opacity-20" strokeWidth="1" />
              <line x1="0" y1="-180" x2="0" y2="180" className="stroke-current opacity-20" strokeWidth="1" />
              
              {/* Axis labels */}
              <text x="180" y="15" className="font-mono text-[8px] fill-current opacity-50 text-end">
                {language === 'ar' ? 'معاصر' : 'CONTEMPORARY'}
              </text>
              <text x="-180" y="15" className="font-mono text-[8px] fill-current opacity-50">
                {language === 'ar' ? 'تقليدي' : 'TRADITIONAL'}
              </text>
              <text x="5" y="-170" className="font-mono text-[8px] fill-current opacity-50">
                {language === 'ar' ? 'علامة صنعة' : 'CRAFT-LED'}
              </text>
              <text x="5" y="175" className="font-mono text-[8px] fill-current opacity-50">
                {language === 'ar' ? 'وجبات سريعة عامة' : 'GENERIC FAST FOOD'}
              </text>

              {/* Competitors Clusters */}
              <circle cx="-100" cy="80" r="6" fill="currentColor" className="competitor-dot" />
              <circle cx="-120" cy="50" r="5" fill="currentColor" className="competitor-dot" />
              <circle cx="80" cy="110" r="6" fill="currentColor" className="competitor-dot" />
              <circle cx="110" cy="80" r="5" fill="currentColor" className="competitor-dot" />
              <circle cx="-50" cy="-60" r="6" fill="currentColor" className="competitor-dot" />

              {/* Al Arrab Target Node */}
              <g className="arrab-dot">
                <circle cx="0" cy="0" r="8" fill="#E64648" />
                <circle cx="0" cy="0" r="14" stroke="#E64648" strokeWidth="1" fill="none" className="animate-ping" />
                <text x="12" y="4" className="arrab-label font-display font-black text-[10px] fill-[#2D070B] tracking-wide">
                  {language === 'ar' ? 'العراب' : 'AL-ARRAB'}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Part D: Market Category Analysis */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'تحليل الفئات' : 'CATEGORY ANALYSIS'}
          number="04 / 08"
        />
        
        <div className="flex-1 max-w-6xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'السوق مزدحم... والصوت واحد.' : 'THE MARKET IS LOUD.'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'فئات المنافسة القائمة' : 'Competitor Framework'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-t border-[#2D070B]/20 pt-6">
              <span className="font-mono text-xs text-[#E64648] opacity-60">01</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'علامات المنتج أولًا' : 'Product-First'}
              </h5>
              <p className="font-body text-body-sm opacity-70 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'تركز بشكل شبه كامل على صور المنتجات القريبة والوجبات والعروض الموسمية دون هوية عاطفية.'
                  : 'Focused entirely on heavy food photography and price-driven discount offers.'}
              </p>
            </div>

            <div className="border-t border-[#2D070B]/20 pt-6">
              <span className="font-mono text-xs text-[#E64648] opacity-60">02</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'علامات التراث أولًا' : 'Heritage-First'}
              </h5>
              <p className="font-body text-body-sm opacity-70 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'تعتمد لغة النوستالجيا والتاريخ، الرموز القديمة والتقليدية المكررة مثل "الطعم الأصلي".'
                  : 'Relying heavily on nostalgia, heritage patterns and generic "original taste" visual styling.'}
              </p>
            </div>

            <div className="border-t border-[#2D070B]/20 pt-6">
              <span className="font-mono text-xs text-[#E64648] opacity-60">03</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'علامات الترند أولًا' : 'Trend-First'}
              </h5>
              <p className="font-body text-body-sm opacity-70 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'تخاطب فئة الشباب باستخدام النكت، الميمز، والألوان الصاخبة المتغيرة باستمرار.'
                  : 'Relying heavily on temporary memes, loud colors, and fast-paced trend hopping.'}
              </p>
            </div>

            <div className="border-t border-[#2D070B]/20 pt-6">
              <span className="font-mono text-xs text-[#E64648] opacity-60">04</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'علامات بريميوم' : 'Premium Fast-Casual'}
              </h5>
              <p className="font-body text-body-sm opacity-70 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'تقدم تصميمات عالية ورائعة في الديكور والمظهر، لكنها تفتقر للقصص الأصيلة الصادقة.'
                  : 'Excellent aesthetic design and interior decoration, but lacking real storytelling roots.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part E: Archetype */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B] text-[#F1EEE8]">
        <SectionHeader
          label={language === 'ar' ? 'نموذج الشخصية' : 'BRAND ARCHETYPE'}
          number="04 / 08"
        />
        
        <div className="flex-1 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'المثال الأعلى للعلامة' : 'THE ARCHETYPE SYSTEM'}
            </span>
            <h4 className="font-display text-display-md font-black leading-[1.2] py-1">
              {language === 'ar' ? 'الحكيم + القائد' : 'The Sage + The Ruler'}
            </h4>
            <p className="font-body text-body-lg opacity-85 leading-relaxed">
              {language === 'ar'
                ? 'مزيج فريد يجمع بين معرفة الحكيم العميقة في الصنعة (الخبرة، الفهم، الإتقان) وبين هيبة القائد ووقاره (السلطة، الحضور، الثقة، المعايير). هذا التوافق لا يصنع مجرد مطعم شاورما, بل أستاذاً للصنعة.'
                : 'A strategic cross between The Sage (expert knowledge, craft secrets) and The Ruler (premium standards, visual authority). Combined, they establish Al-Arrab as The Master.'}
            </p>
            
            <div className="border-t border-[#F1EEE8]/20 pt-6 mt-6">
              <span className="font-display text-heading-md font-bold text-[#E64648] block">
                {language === 'ar' ? 'الأستاذ (The Master)' : 'THE MASTER'}
              </span>
            </div>
          </div>

          <div className="bg-[#4A1018] p-6 md:p-12 rounded-sm border border-white/5 flex flex-col justify-center gap-6 min-h-[300px] relative">
            <span className="absolute top-4 right-4 font-mono text-[10px] opacity-30">STATEMENT</span>
            <div className="font-display text-[#F1EEE8] text-heading-lg font-bold leading-tight">
              {language === 'ar' ? 'يعرف أكثر.' : 'KNOWS MORE.'}
            </div>
            <div className="font-display text-[#E64648] text-display-md font-black leading-tight py-1">
              {language === 'ar' ? 'لذلك لا يحتاج أن يصرخ أكثر.' : 'SO NEEDS TO SHOUT LESS.'}
            </div>
          </div>
        </div>
      </section>

      {/* Part F: Brand Personality */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'سمات الشخصية' : 'BRAND PERSONALITY'}
          number="04 / 08"
        />

        <div ref={personalityRef} className="flex-1 max-w-4xl mx-auto flex flex-col justify-center gap-12 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'السمات والاستثناءات' : 'TRAITS AND BORDERS'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'كيف نتحدث، وماذا نتجنب؟' : 'Tone and Personality Boundaries'}
            </h4>
          </div>

          <div className="flex flex-col gap-8 mt-6">
            <div className="personality-trait border-b border-[#2D070B]/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-[#E64648] opacity-60">01</span>
                <span className="font-display text-heading-md font-black">{language === 'ar' ? 'واثق' : 'CONFIDENT'}</span>
              </div>
              <div className="relative font-mono text-body-sm text-[#2D070B] overflow-hidden py-1">
                <span className="neg-trait">{language === 'ar' ? 'ليس متعاليًا' : 'NOT ARROGANT'}</span>
                <span className="neg-line absolute left-0 right-0 top-1/2 h-[1px] bg-[#E64648] origin-left scale-x-0" />
              </div>
            </div>

            <div className="personality-trait border-b border-[#2D070B]/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-[#E64648] opacity-60">02</span>
                <span className="font-display text-heading-md font-black">{language === 'ar' ? 'خبير' : 'EXPERIENCED'}</span>
              </div>
              <div className="relative font-mono text-body-sm text-[#2D070B] overflow-hidden py-1">
                <span className="neg-trait">{language === 'ar' ? 'ليس قديمًا' : 'NOT OUTDATED'}</span>
                <span className="neg-line absolute left-0 right-0 top-1/2 h-[1px] bg-[#E64648] origin-left scale-x-0" />
              </div>
            </div>

            <div className="personality-trait border-b border-[#2D070B]/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-[#E64648] opacity-60">03</span>
                <span className="font-display text-heading-md font-black">{language === 'ar' ? 'أصيل' : 'AUTHENTIC'}</span>
              </div>
              <div className="relative font-mono text-body-sm text-[#2D070B] overflow-hidden py-1">
                <span className="neg-trait">{language === 'ar' ? 'ليس نوستالجيًا' : 'NOT NOSTALGIC'}</span>
                <span className="neg-line absolute left-0 right-0 top-1/2 h-[1px] bg-[#E64648] origin-left scale-x-0" />
              </div>
            </div>

            <div className="personality-trait border-b border-[#2D070B]/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-[#E64648] opacity-60">04</span>
                <span className="font-display text-heading-md font-black">{language === 'ar' ? 'حاضر' : 'COMMANDING'}</span>
              </div>
              <div className="relative font-mono text-body-sm text-[#2D070B] overflow-hidden py-1">
                <span className="neg-trait">{language === 'ar' ? 'ليس عدوانيًا' : 'NOT AGGRESSIVE'}</span>
                <span className="neg-line absolute left-0 right-0 top-1/2 h-[1px] bg-[#E64648] origin-left scale-x-0" />
              </div>
            </div>

            <div className="personality-trait border-b border-[#2D070B]/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-[#E64648] opacity-60">05</span>
                <span className="font-display text-heading-md font-black">{language === 'ar' ? 'دافئ' : 'WARM'}</span>
              </div>
              <div className="relative font-mono text-body-sm text-[#2D070B] overflow-hidden py-1">
                <span className="neg-trait">{language === 'ar' ? 'ليس طفوليًا' : 'NOT CHILDISH'}</span>
                <span className="neg-line absolute left-0 right-0 top-1/2 h-[1px] bg-[#E64648] origin-left scale-x-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part G: Brand Values */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#E5E0D8]">
        <SectionHeader
          label={language === 'ar' ? 'قيم العلامة' : 'BRAND VALUES'}
          number="04 / 08"
        />
        
        <div className="flex-1 max-w-6xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'ما نقف لأجله' : 'CORE VALUES'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'المبادئ التوجيهية' : 'Our fundamental values'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
            <div>
              <span className="font-mono text-xs text-[#E64648]">01</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'الصنعة' : 'CRAFT'}
              </h5>
              <p className="font-body text-body-sm opacity-80 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'نحترم العملية بأدق تفاصيلها خلف المذاق. كل لفة وكل تتبيلة لها أصول.'
                  : 'We respect the process and details behind the food. Every wrap, every spice has legacy.'}
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-[#E64648]">02</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'الخبرة' : 'EXPERIENCE'}
              </h5>
              <p className="font-body text-body-sm opacity-80 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'سنين العمل لا تهم إلا عندما تتحول لمعرفة تراكمية وعلم راسخ.'
                  : 'Years are only a number unless they turn into accumulated mastery and real know-how.'}
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-[#E64648]">03</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'الثبات' : 'CONSISTENCY'}
              </h5>
              <p className="font-body text-body-sm opacity-80 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'العميل يعود دائماً للمذاق الذي يتذكره. نحن لا نقبل تذبذب الجودة.'
                  : 'A customer returns for the taste they remember. Consistency is our signature.'}
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-[#E64648]">04</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'الاحترام' : 'RESPECT'}
              </h5>
              <p className="font-body text-body-sm opacity-80 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'احترام كامل للمنتج، وللعميل الذي يتذوقه، وللصنعة التي ننتسب إليها.'
                  : 'Full respect for the product, the customer who tastes it, and the craft we claim.'}
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-[#E64648]">05</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">
                {language === 'ar' ? 'التطور' : 'PROGRESS'}
              </h5>
              <p className="font-body text-body-sm opacity-80 mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'الخبرة تقود المستقبل ولا تحبس نفسها في ذكريات الماضي. نصنع التغيير.'
                  : 'Experience leads the future, rather than locking itself in nostalgia. We lead.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

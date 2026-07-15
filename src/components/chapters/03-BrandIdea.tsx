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
  const boardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop timeline triggers (1024px and above)
    mm.add("(min-width: 1024px)", () => {
      // ── Build-Up & Climax Timeline ──
      const tlBuild = gsap.timeline({
        scrollTrigger: {
          trigger: textRevealRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
        },
      });

      const items = gsap.utils.toArray('.buildup-item');
      const climax = document.querySelector('.climax-headline');
      const climaxSub = document.querySelector('.climax-sub');
      const boardLines = gsap.utils.toArray('.ev-guide-line');

      gsap.set(items, { opacity: 0, y: 40 });
      gsap.set(climax, { opacity: 0, scale: 0.95 });
      gsap.set(climaxSub, { opacity: 0, y: 15 });
      gsap.set(boardLines, { scaleX: 0, scaleY: 0 });

      // Draw background guide lines
      tlBuild.to(boardLines, {
        scaleX: 1,
        scaleY: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'none',
      }, 0);

      // Staggered reveal and collapse of annotations
      items.forEach((item: any, i) => {
        tlBuild.to(item, {
          opacity: 0.9,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .to(item, {
          opacity: 0.05,
          y: -20,
          duration: 0.6,
          delay: 0.4,
        });
      });

      // Final Climax Reveal
      tlBuild.to(climax, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
      })
      .to(climaxSub, {
        opacity: 0.85,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4');
    });

    // Mobile and tablet natural layout flow fallback (Under 1024px)
    mm.add("(max-width: 1023px)", () => {
      const items = gsap.utils.toArray('.buildup-item');
      const climax = document.querySelector('.climax-headline');
      const climaxSub = document.querySelector('.climax-sub');

      gsap.set(items, {
        clearProps: "all",
      });
      gsap.set(items, {
        opacity: 0.9,
        y: 0,
      });

      gsap.set(climax, {
        opacity: 1,
        scale: 1,
      });

      gsap.set(climaxSub, {
        opacity: 0.85,
        y: 0,
      });
    });

    // ── Strategy Board Sheets Fade In ──
    const tlBoard = gsap.timeline({
      scrollTrigger: {
        trigger: boardRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tlBoard.fromTo('.strategy-sheet',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.25, duration: 1.0, ease: 'power3.out' }
    );

    return () => {
      mm.revert();
    };
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

      {/* Part B: Climax Reveal (Redesigned Asymmetric Strategy Canvas) */}
      <section ref={textRevealRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B] overflow-hidden max-lg:min-h-0">
        <SectionHeader
          label={language === 'ar' ? 'الباب الثالث / المفهوم المركزي' : 'CHAPTER 03 / CORE BRAND IDEA'}
          number="03 / 08"
        />

        {/* Blueprint background grid lines */}
        <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-white/[0.02] origin-top ev-guide-line scale-y-0" />
        <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-white/[0.02] origin-top ev-guide-line scale-y-0" />
        <div className="absolute left-0 right-0 top-[35%] h-[1px] bg-white/[0.02] origin-left ev-guide-line scale-x-0" />
        
        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center items-center relative min-h-[50vh] max-lg:flex-col-reverse max-lg:gap-12 max-lg:py-8 max-lg:min-h-0">
          
          {/* Asymmetric Scattered Strategic Annotations */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none max-lg:relative max-lg:pointer-events-auto max-lg:select-text max-lg:h-auto max-lg:w-full max-lg:flex max-lg:flex-col max-lg:gap-8 max-lg:px-6">
            {/* Annotation 1: Top-Right */}
            <div className="buildup-item absolute top-[10%] right-[10%] max-w-xs text-start flex flex-col gap-2 max-lg:relative max-lg:top-auto max-lg:right-auto max-lg:max-w-none max-lg:border-s max-lg:border-[#E64648]/20 max-lg:ps-4">
              <span className="font-mono text-[9px] text-[#E64648] tracking-widest uppercase">01 // THE DIAGNOSIS</span>
              <span className="font-cairo text-body-sm opacity-60">
                {language === 'ar' ? 'سوق مزدحم بالادعاءات دون مرجعية واضحة.' : 'A market filled with generic claims and zero authority.'}
              </span>
            </div>

            {/* Annotation 2: Center-Left */}
            <div className="buildup-item absolute top-[40%] left-[8%] max-w-xs text-start flex flex-col gap-2 max-lg:relative max-lg:top-auto max-lg:left-auto max-lg:max-w-none max-lg:border-s max-lg:border-[#E64648]/20 max-lg:ps-4">
              <span className="font-mono text-[9px] text-[#E64648] tracking-widest uppercase">02 // THE DEVIATION</span>
              <span className="font-cairo text-body-sm opacity-60">
                {language === 'ar' ? 'تجنب القوالب المكررة والنوستالجيا المستهلكة.' : 'Bypassing film parodies and nostalgia clichés.'}
              </span>
            </div>

            {/* Annotation 3: Bottom-Right */}
            <div className="buildup-item absolute bottom-[15%] right-[12%] max-w-xs text-start flex flex-col gap-2 max-lg:relative max-lg:top-auto max-lg:right-auto max-lg:max-w-none max-lg:border-s max-lg:border-[#E64648]/20 max-lg:ps-4">
              <span className="font-mono text-[9px] text-[#E64648] tracking-widest uppercase">03 // THE FORMULA</span>
              <span className="font-cairo text-body-sm opacity-60">
                {language === 'ar' ? 'تكامل ثلاثون عامًا من المعرفة الفائقة.' : 'Leveraging three decades of process mastery.'}
              </span>
            </div>
          </div>

          {/* Climax reveal (Dominant Typographic Centerpiece) */}
          <div className="flex flex-col items-center gap-6 z-10 relative max-lg:text-center max-lg:mb-6">
            <h2 className="climax-headline font-cairo text-[#E64648] text-display-xl lg:text-[10vw] font-black leading-none tracking-tighter select-none py-2">
              للصنعة عرّاب
            </h2>
            <div className="climax-sub font-mono text-[10px] md:text-xs tracking-[0.35em] text-[#F1EEE8] opacity-70 uppercase select-none mt-2">
              {language === 'ar' ? 'القانون الوحيد الذي يحكم الصنعة' : 'EVERY CRAFT HAS ITS SOVEREIGN.'}
            </div>
          </div>
        </div>
      </section>

      {/* Part C: The Strategy Wall / Workshop Boards (Redesigned Corkboard Sheets) */}
      <section
        ref={boardRef}
        className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8] text-[#2D070B] overflow-hidden"
      >
        <SectionHeader
          label={language === 'ar' ? 'لوحة عمل الإستراتيجية' : 'STRATEGY BOARD'}
          number="03 / 08"
        />
        
        <div className="flex-1 flex flex-col justify-center items-center max-w-6xl mx-auto w-full gap-16 relative">
          
          <div className="flex flex-col gap-4 text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'أعمدة التموضع الرئيسي' : 'THE CORE STRATEGIC PILLARS'}
            </span>
            <h3 className="font-cairo text-heading-lg lg:text-display-md font-black leading-tight max-w-4xl">
              {language === 'ar' ? 'كيف تتجسد سيادة الصنعة؟' : 'Structuring Craft Authority.'}
            </h3>
          </div>

          {/* Overlapping Presentation Board Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start w-full relative z-10 px-4">
            
             {/* Card 01: The Master */}
            <div className="strategy-sheet flex flex-col items-start border border-[#2D070B]/10 bg-white/40 p-6 md:p-8 rounded-sm min-h-[380px] relative shadow-sm">
              <div className="absolute top-4 right-4 font-mono text-[9px] opacity-40">BOARD 01</div>
              <span className="text-[11px] font-mono text-[#E64648] tracking-widest mb-6">PILLAR // 01</span>
              <h4 className="font-cairo text-heading-md font-bold text-[#2D070B] mb-4">
                {language === 'ar' ? 'المعلّم (The Master)' : 'THE MASTER'}
              </h4>
              <p className="font-cairo text-body-sm opacity-80 leading-relaxed">
                {language === 'ar'
                  ? 'السيادة والوقار الهادئ. العراب لا يحتاج إلى الصراخ أو تبني الميمز والترندات الصاخبة؛ المعرفة الفائقة تفرض حضورها دون مبالغة.'
                  : 'Sovereign authority. Al-Arrab knows more, and therefore needs to shout less. Complete category leadership built on quiet presence.'}
              </p>
            </div>

            {/* Card 02: The Process (Solid Dark Sheet + Image Crop) */}
            <div className="strategy-sheet flex flex-col items-start bg-[#2D070B] text-[#F1EEE8] p-6 md:p-8 rounded-sm min-h-[380px] relative shadow-xl md:-translate-y-4 border border-white/5">
              <div className="absolute top-4 right-4 font-mono text-[9px] opacity-35">BOARD 02</div>
              <span className="text-[11px] font-mono text-[#E64648] tracking-widest mb-6">PILLAR // 02</span>
              <h4 className="font-cairo text-heading-md font-bold mb-4">
                {language === 'ar' ? 'الأصالة الصادقة' : 'RAW METHOD'}
              </h4>
              <p className="font-cairo text-body-sm opacity-80 leading-relaxed mb-6">
                {language === 'ar'
                  ? 'النار الحقيقية، جمر الحطب، والسكين الماهر. الصنعة هي طريقة عمل واضحة لا تقبل التنازلات أو الحلول الجاهزة.'
                  : 'True wood embers, master carving knives, and local baking. A dedication to process where shortcuts are rejected.'}
              </p>
              <div className="w-full h-24 mt-auto overflow-hidden rounded-sm relative border border-white/10">
                <img
                  src="/images/meat_texture.png"
                  alt="Raw Process"
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 03: The Status (Outline Swatch + Image Crop) */}
            <div className="strategy-sheet flex flex-col items-start border border-[#2D070B]/10 bg-white/40 p-6 md:p-8 rounded-sm min-h-[380px] relative shadow-sm">
              <div className="absolute top-4 right-4 font-mono text-[9px] opacity-40">BOARD 03</div>
              <span className="text-[11px] font-mono text-[#E64648] tracking-widest mb-6">PILLAR // 03</span>
              <h4 className="font-cairo text-heading-md font-bold text-[#2D070B] mb-4">
                {language === 'ar' ? 'السيادة والوقار' : 'SOVEREIGN STATUS'}
              </h4>
              <p className="font-cairo text-body-sm opacity-80 leading-relaxed mb-6">
                {language === 'ar'
                  ? 'مكانة مستقرة تليق بأستاذ الصنعة. تقديم تجربة طعام تحترم ذائقة العميل وتضع معايير جديدة للفئة بأكملها.'
                  : 'A status fitting the category godfather. Establishing a culinary baseline that other fast-food brands must align to.'}
              </p>
              <div className="w-full h-24 mt-auto overflow-hidden rounded-sm relative border border-[#2D070B]/10">
                <img
                  src="/images/packaging_mockup.png"
                  alt="Status packaging"
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

          <p className="font-cairo text-body opacity-85 max-w-2xl text-center px-4 leading-relaxed mt-4">
            {language === 'ar'
              ? 'العراب ليس ادعاءً تسويقيًا نروجه، بل هو الحقيقة الحتمية التي تظهر بمجرد تكامل السنين، معرفة الصنعة، والالتزام المطلق بالإنتاج الحقيقي.'
              : 'Al-Arrab is not a commercial claim, but the logical output when cumulative decades of experience merge with complete craft secrets.'}
          </p>
        </div>
      </section>
    </div>
  );
}

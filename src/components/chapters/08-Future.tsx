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

export default function Future() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scalabilityRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Scalability Reveal Anim ──
    const scaleItems = scalabilityRef.current?.querySelectorAll('.scale-item');
    if (scaleItems) {
      gsap.fromTo(scaleItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: scalabilityRef.current,
            start: 'top 75%',
          }
        }
      );
    }

    // ── Manifesto Beats Anim ──
    const beats = gsap.utils.toArray('.manifesto-beat');
    const tlManifesto = gsap.timeline({
      scrollTrigger: {
        trigger: manifestoRef.current,
        start: 'top top',
        end: '+=350%',
        scrub: 1,
        pin: true,
      },
    });

    gsap.set(beats, { opacity: 0.05, y: 50 });

    beats.forEach((beat: any, index) => {
      tlManifesto.to(beat, {
        opacity: 1,
        y: 0,
        color: index === beats.length - 1 ? '#E64648' : '#F1EEE8',
        duration: 1,
        ease: 'power3.out',
      })
      .to(beat, {
        opacity: index === beats.length - 1 ? 1 : 0,
        y: index === beats.length - 1 ? 0 : -30,
        duration: 0.8,
        delay: 0.6,
      });
    });

  }, { scope: sectionRef });

  const manifestoLinesAr = [
    'بعض الأشياء تبدأ بفكرة.',
    'وبعضها تبدأ بخبرة.',
    'خبرة تتكرر.',
    'تتعلم.',
    'وتعرف.',
    'حتى يصبح الفرق واضحًا.',
    'ليس لأنك قلت إنك الأفضل.',
    'بل لأن السنين تركت أثرها.',
    '٣٠ سنة في الصنعة.',
    'للصنعة عرّاب.',
  ];

  const manifestoLinesEn = [
    'SOME THINGS BEGIN WITH AN IDEA.',
    'AND SOME BEGIN WITH EXPERIENCE.',
    'EXPERIENCE THAT REPEATS.',
    'LEARNS.',
    'AND KNOWS.',
    'UNTIL THE DIFFERENCE BECOMES CLEAR.',
    'NOT BECAUSE YOU CLAIMED TO BE THE BEST.',
    'BUT BECAUSE THE YEARS LEFT THEIR MARK.',
    '30 YEARS IN THE CRAFT.',
    'EVERY CRAFT HAS ITS MASTER.',
  ];

  const lines = language === 'ar' ? manifestoLinesAr : manifestoLinesEn;

  return (
    <div ref={sectionRef} className="bg-[#F1EEE8] text-[#2D070B] overflow-hidden">
      {/* Intro */}
      <ChapterIntro
        id="future"
        number="08"
        titleAr="المستقبل"
        titleEn="FUTURE"
      />

      {/* Part B: Brand Scalability */}
      <section ref={scalabilityRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'القدرة على الامتداد' : 'SCALABILITY'}
          number="08 / 08"
        />
        
        <div className="flex-1 max-w-5xl mx-auto flex flex-col justify-center gap-12 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'التوسع والنمو' : 'SCALABILITY ARCHITECTURE'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'الفكرة لا تعيش على فرع واحد.' : 'The idea does not live in a single location.'}
            </h4>
            <p className="font-body text-body-lg opacity-85 leading-relaxed">
              {language === 'ar'
                ? 'لأن الصنعة قابلة للامتداد. الهوية مصممة لتستوعب الفروع المتعددة، الحملات الإعلانية، والمنتجات الفرعية تحت نفس مظلة وقوة المفهوم المركزي.'
                : 'Because craft is designed to scale. Our strategic codes (The Master archetype, the three-color blocking, and the verbal authority) apply seamlessly from store walls to packaging dielines.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs mt-6 w-full">
            <div className="scale-item border border-[#2D070B]/10 p-6 md:p-8 rounded-sm bg-[#E5E0D8]/45">
              {language === 'ar' ? 'الفروع والمواقع' : 'Branches'}
            </div>
            <div className="scale-item border border-[#2D070B]/10 p-6 md:p-8 rounded-sm bg-[#E5E0D8]/45">
              {language === 'ar' ? 'التغليف والتسليم' : 'Packaging'}
            </div>
            <div className="scale-item border border-[#2D070B]/10 p-6 md:p-8 rounded-sm bg-[#E5E0D8]/45">
              {language === 'ar' ? 'المنظومة الرقمية' : 'Digital products'}
            </div>
            <div className="scale-item border border-[#2D070B]/10 p-6 md:p-8 rounded-sm bg-[#E5E0D8]/45">
              {language === 'ar' ? 'الحملات الخارجية' : 'Campaigns'}
            </div>
          </div>
        </div>
      </section>

      {/* Part C: Brand Manifesto Sticky Beats */}
      <section ref={manifestoRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B] text-[#F1EEE8]">
        <SectionHeader
          label={language === 'ar' ? 'بيان العلامة' : 'THE MANIFESTO'}
          number="08 / 08"
        />
        
        <div className="flex-1 max-w-5xl text-center flex flex-col justify-center items-center relative select-none w-full min-h-[40vh]">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`manifesto-beat absolute font-display font-black leading-[1.25] py-2 ${
                i === lines.length - 1
                  ? 'text-[8vw] md:text-[6vw] text-[#E64648]'
                  : 'text-heading-lg md:text-display-md text-[#F1EEE8]'
              }`}
            >
              {line}
              {i === lines.length - 1 && (
                <div className="font-display text-[3.5vw] md:text-[2vw] text-[#F1EEE8] opacity-80 uppercase tracking-widest mt-4">
                  {language === 'ar' ? 'للصنعة عرّاب' : 'EVERY CRAFT HAS ITS MASTER'}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Part D: End Card */}
      <section className="min-h-screen bg-[#2D070B] text-[#F1EEE8] flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'الختام' : 'CONCLUSION'}
          number="08 / 08"
        />
        
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full gap-8">
          <div className="h-[1px] w-24 bg-[#E64648] opacity-50 mb-4" />
          
          <h2 className="font-arabic-display text-display-md text-[#F1EEE8] leading-[1.2] py-1 select-none">
            {language === 'ar' ? 'شاورما العراب' : 'SHAWARMA AL-ARRAB'}
          </h2>
          
          <div className="font-mono text-xs tracking-[0.25em] text-[#E64648] uppercase">
            {language === 'ar' ? 'مفهوم العلامة والتوجه الاستراتيجي' : 'BRAND CONCEPT & STRATEGIC DIRECTION'}
          </div>
          
          <div className="font-mono text-[9px] opacity-40 uppercase tracking-wider mt-12">
            © {new Date().getFullYear()} SHAWARMA AL-ARRAB. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>
    </div>
  );
}

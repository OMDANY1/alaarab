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

export default function Visual() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const colorSystemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Color Field Transitions ──
    const blocks = gsap.utils.toArray('.color-block');
    blocks.forEach((block: any) => {
      gsap.fromTo(block,
        { opacity: 0.8 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    });

    // ── Logo Territories Anim ──
    gsap.fromTo('.logo-box-outline',
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.logo-grid',
          start: 'top 80%',
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bg-[#F1EEE8] text-[#2D070B] overflow-hidden">
      {/* Intro */}
      <ChapterIntro
        id="visual"
        number="06"
        titleAr="الصورة"
        titleEn="VISUAL"
      />

      {/* Part B: Visual Concept */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'الباب السادس / التوجه البصري' : 'CHAPTER 06 / VISUAL CONCEPT'}
          number="06 / 08"
        />
        
        <div className="flex-1 max-w-5xl mx-auto flex flex-col justify-center gap-8 w-full">
          <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
            {language === 'ar' ? 'التوجه الفني' : 'ART DIRECTION CONCEPT'}
          </span>
          
          <h3 className="font-display text-display-md md:text-display-lg font-black text-[#2D070B] leading-[1.2] py-1">
            {language === 'ar' ? 'سلطة الصنعة السينمائية' : 'CINEMATIC CRAFT AUTHORITY'}
          </h3>
          <p className="font-mono text-xs tracking-wider opacity-60">
            THE HOUSE OF AL-ARRAB / بيت العراب
          </p>
          
          {/* Float Keywords Cloud */}
          <div className="flex flex-wrap gap-4 max-w-3xl mt-8 font-display text-body-lg md:text-heading-sm font-bold">
            <span className="text-[#E64648]">{language === 'ar' ? 'سينمائي' : 'Cinematic'}</span>
            <span className="opacity-30">•</span>
            <span>{language === 'ar' ? 'مضبوط' : 'Controlled'}</span>
            <span className="opacity-30">•</span>
            <span className="text-[#2D070B]">{language === 'ar' ? 'دفء داكن' : 'Dark warmth'}</span>
            <span className="opacity-30">•</span>
            <span>{language === 'ar' ? 'قريب' : 'Close-up'}</span>
            <span className="opacity-30">•</span>
            <span className="text-[#E64648]">{language === 'ar' ? 'ظل' : 'Shadow'}</span>
            <span className="opacity-30">•</span>
            <span>{language === 'ar' ? 'دقة' : 'Precision'}</span>
            <span className="opacity-30">•</span>
            <span>{language === 'ar' ? 'ملمس' : 'Texture'}</span>
          </div>
        </div>
      </section>

      {/* Part C: Color System Color-Blocking */}
      <section ref={colorSystemRef} className="bg-[#2D070B] text-[#F1EEE8] w-full">
        <div className="color-block min-h-screen bg-[#F1EEE8] text-[#2D070B] flex flex-col justify-start section-padding relative py-20 md:py-32">
          <SectionHeader
            label="COLOR 01 / CREAM"
            number="06 / 08"
          />
          <div className="flex-1 max-w-4xl mx-auto flex flex-col justify-center gap-6 w-full">
            <h4 className="font-display text-display-md font-black text-[#2D070B] leading-none">
              #F1EEE8
            </h4>
            <p className="font-body text-body-lg opacity-80 leading-relaxed max-w-xl">
              {language === 'ar'
                ? 'مساحة التصميم التحريري الواسعة. تعطي وضوحاً، هدوءاً، ومرونة للمقالات والتحليلات الاستراتيجية والمساحات الفارغة المتنفسة.'
                : 'The editorial foundation. Breathing room, strategic content layouts, structured grids, and premium typography background.'}
            </p>
          </div>
        </div>

        <div className="color-block min-h-screen bg-[#E64648] text-[#F1EEE8] flex flex-col justify-start section-padding relative py-20 md:py-32">
          <SectionHeader
            label="COLOR 02 / RED"
            number="06 / 08"
          />
          <div className="flex-1 max-w-4xl mx-auto flex flex-col justify-center gap-6 w-full">
            <h4 className="font-display text-display-md font-black text-[#F1EEE8] leading-none">
              #E64648
            </h4>
            <p className="font-body text-body-lg opacity-90 leading-relaxed max-w-xl">
              {language === 'ar'
                ? 'طاقة وحرارة اللهب، فتح الشهية، وقود الزخم اللفظي، ولفت الانتباه لأيقونات ومعادلات الهوية.'
                : 'Energy, fire, high-contrast attention, food appetite, and brand momentum.'}
            </p>
          </div>
        </div>

        <div className="color-block min-h-screen bg-[#2D070B] text-[#F1EEE8] flex flex-col justify-start section-padding relative py-20 md:py-32">
          <SectionHeader
            label="COLOR 03 / DEEP BURGUNDY"
            number="06 / 08"
          />
          <div className="flex-1 max-w-4xl mx-auto flex flex-col justify-center gap-6 w-full">
            <h4 className="font-display text-display-md font-black text-[#E64648] leading-none">
              #2D070B
            </h4>
            <p className="font-body text-body-lg opacity-80 leading-relaxed max-w-xl">
              {language === 'ar'
                ? 'عمق السينما، الهيبة، السيادة، وأسرار الصنعة التي نرويها تحت ظلال خافتة راقية.'
                : 'Cinematic depth, sovereignty, visual hierarchy, and craft secrets hidden in warm shadow.'}
            </p>
          </div>
        </div>
      </section>

      {/* Part D: Typography Showcase */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#F1EEE8] text-[#2D070B]">
        <SectionHeader
          label={language === 'ar' ? 'منظومة الحروف' : 'TYPOGRAPHY SPECS'}
          number="06 / 08"
        />
        
        <div className="flex-1 max-w-5xl mx-auto flex flex-col justify-center gap-12 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'الخطوط الرسمية' : 'TYPOGRAPHY DIRECTION'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'التوافق التحريري ثنائي اللغة' : 'Bilingual editorial dialogue'}
            </h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full mt-6">
            {/* Arabic Spec */}
            <div className="border-t border-[#2D070B]/10 pt-8">
              <span className="font-mono text-xs text-[#E64648] block mb-2">ARABIC HEADLINES / Cairo Display</span>
              <div className="font-arabic-display text-display-md text-[#2D070B] leading-normal font-black">
                أبجد هوز حطي
              </div>
              <p className="font-body text-body-sm opacity-70 mt-6 leading-relaxed">
                {language === 'ar'
                  ? 'خط كاييرو للمنشورات والعناوين العريضة. يتميز بوزن أسود فخم، يعطي طابع القوة والسيادة ويحافظ على الوضوح في الفراغات.'
                  : 'Cairo typeface for headlines. Strong visual presence, black weight representing sovereignty and craft confidence.'}
              </p>
            </div>

            {/* English Spec */}
            <div className="border-t border-[#2D070B]/10 pt-8">
              <span className="font-mono text-xs text-[#E64648] block mb-2">ENGLISH DISPLAY / Space Grotesk</span>
              <div className="font-english-display text-display-md text-[#2D070B] leading-none font-bold">
                THE BOLD MASTER
              </div>
              <p className="font-body text-body-sm opacity-70 mt-6 leading-relaxed">
                {language === 'ar'
                  ? 'خط سبيس غروتسك للأحرف اللاتينية. خط هندسي معاصر يعكس الاقتضاب والوضوح والسيادة التنظيمية للعلامة.'
                  : 'Space Grotesk for English headings. High geometric details and modern editorial spacing, maintaining craft brevity.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part E: Logo Territories */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#E5E0D8]">
        <SectionHeader
          label={language === 'ar' ? 'صياغة الشعار' : 'LOGO ARCHITECTURE'}
          number="06 / 08"
        />
        
        <div className="flex-1 max-w-6xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'بناء الرمز' : 'LOGO FORM'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'التصميم التيبوغرافي للشعار' : 'Typographical logo structure'}
            </h4>
          </div>

          <div className="logo-grid grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-6">
            {/* Box 1: Text Mark */}
            <div className="bg-[#F1EEE8] p-6 md:p-8 border border-black/5 rounded-sm relative flex flex-col justify-between min-h-[350px]">
              <span className="font-mono text-[9px] opacity-40 uppercase">WORDMARK / الشعار اللفظي</span>
              <div className="my-auto py-8 flex flex-col gap-4 items-center justify-center text-center">
                <div className="font-arabic-display text-heading-lg md:text-display-md text-[#2D070B] leading-normal font-black">
                  شاورما العراب
                </div>
                <div className="font-english-display text-xs md:text-sm tracking-[0.3em] opacity-80 text-[#E64648]">
                  SHAWARMA AL-ARRAB
                </div>
              </div>
              <p className="font-body text-body-sm opacity-70 leading-relaxed">
                {language === 'ar'
                  ? 'رسم حروف يعبر عن الهيبة والقوة. استخدام الأوزان الثقيلة يعكس الرسوخ والخبرة التراكمية الطويلة.'
                  : 'Custom wordmark reflecting craft authority and structural presence.'}
              </p>
            </div>

            {/* Box 2: Icon geometry */}
            <div className="bg-[#F1EEE8] p-6 md:p-8 border border-black/5 rounded-sm relative flex flex-col justify-between min-h-[350px]">
              <span className="font-mono text-[9px] opacity-40 uppercase">GEOMETRY SYSTEM / هندسة الشعار</span>
              <div className="my-auto py-8 flex items-center justify-center">
                <svg width="150" height="150" viewBox="0 0 100 100" className="text-[#2D070B]">
                  <rect x="5" y="5" width="90" height="90" fill="none" stroke="currentColor" strokeWidth="2" className="logo-box-outline" />
                  <path d="M20,20 L80,20 M20,50 L80,50 M20,80 L80,80" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="15" fill="#E64648" className="opacity-80" />
                </svg>
              </div>
              <p className="font-body text-body-sm opacity-70 leading-relaxed">
                {language === 'ar'
                  ? 'بنية هندسية متوازنة تعكس الجودة والثبات والصنعة. المربع يمثل القوة والدائرة الحمراء تمثل التميز والفرادة.'
                  : 'Balanced geometric shape. The outer square represents security, and the center red circle is Al-Arrab.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part F: Photography direction */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B] text-[#F1EEE8]">
        <SectionHeader
          label={language === 'ar' ? 'فلسفة الصورة' : 'PHOTOGRAPHY ART DIRECTION'}
          number="06 / 08"
        />
        
        <div className="flex-1 max-w-6xl mx-auto flex flex-col justify-center gap-12 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'التوجيه الفوتوغرافي' : 'PHOTOGRAPHY DIRECTIONS'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'بورتريه الطعام والعمليات الكثيفة' : 'Food portraiture & physical craft'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
            {/* CSS mock art direction frame 1 */}
            <div className="aspect-square bg-[#2D070B] border border-white/10 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              <img
                src="/images/meat_texture.png"
                alt="Meat texture"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D070B] via-transparent to-black/35 pointer-events-none z-[1]" />
              <span className="font-mono text-[10px] opacity-40 z-10">FRAME 01 / CLOSE-UP</span>
              <div className="z-10">
                <h5 className="font-display text-heading-sm font-bold text-[#E64648] leading-tight">
                  {language === 'ar' ? 'ملمس اللحم والتوابل' : 'Meat texture & fire'}
                </h5>
                <p className="font-mono text-[9px] opacity-60 mt-1 leading-normal">Hard side-light / Shallow depth of field</p>
              </div>
            </div>

            {/* CSS mock art direction frame 2 */}
            <div className="aspect-square bg-[#2D070B] border border-white/10 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              <img
                src="/images/knife_movement.png"
                alt="Knife movement"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D070B] via-transparent to-black/35 pointer-events-none z-[1]" />
              <span className="font-mono text-[10px] opacity-40 z-10">FRAME 02 / MOVEMENT</span>
              <div className="z-10">
                <h5 className="font-display text-heading-sm font-bold text-[#F1EEE8] leading-tight">
                  {language === 'ar' ? 'حركة نصل السكين السريع' : 'The blade speed cut'}
                </h5>
                <p className="font-mono text-[9px] opacity-60 mt-1 leading-normal">Motion blur / Extreme close-up / Sharp action</p>
              </div>
            </div>

            {/* CSS mock art direction frame 3 */}
            <div className="aspect-square bg-[#2D070B] border border-white/10 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              <img
                src="/images/chef_hands.png"
                alt="Chef hands"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D070B] via-transparent to-black/35 pointer-events-none z-[1]" />
              <span className="font-mono text-[10px] opacity-40 z-10">FRAME 03 / SILHOUETTE</span>
              <div className="z-10">
                <h5 className="font-display text-heading-sm font-bold text-[#F1EEE8] leading-tight">
                  {language === 'ar' ? 'أيادي الأستاذ في العمل' : 'Hands at work'}
                </h5>
                <p className="font-mono text-[9px] opacity-60 mt-1 leading-normal">Deep contrast / Steam rising / Chef hands</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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

export default function Experience() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const socialFeedRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop/Tablet horizontal animations (1024px and above)
    mm.add("(min-width: 1024px)", () => {
      // ── Social Feed Scroll Anim ──
      const feed = socialFeedRef.current;
      if (feed) {
        const cards = feed.querySelectorAll('.social-feed-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: feed,
              start: 'top 80%',
            }
          }
        );
      }

      // ── Launch Timeline Anim ──
      const nodes = gsap.utils.toArray('.timeline-node');
      const tlLaunch = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tlLaunch.fromTo(nodes,
        { opacity: 0, x: language === 'ar' ? 40 : -40 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out' }
      );
    });

    // Mobile natural layout flow fallback (Under 1024px)
    mm.add("(max-width: 1023px)", () => {
      const feed = socialFeedRef.current;
      const nodes = gsap.utils.toArray('.timeline-node');

      if (feed) {
        const cards = feed.querySelectorAll('.social-feed-card');
        gsap.set(cards, { opacity: 1, y: 0 });
      }
      gsap.set(nodes, { opacity: 1, x: 0 });
    });

  }, { scope: sectionRef, dependencies: [language] });

  return (
    <div ref={sectionRef} className="bg-[#F1EEE8] text-[#2D070B] overflow-hidden">
      {/* Intro */}
      <ChapterIntro
        id="experience"
        number="07"
        titleAr="التجربة"
        titleEn="EXPERIENCE"
      />

      {/* Part B: Packaging Dielines wireframes */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'التعبئة والتغليف' : 'PACKAGING SCHEMATICS'}
          number="07 / 08"
        />
        
        <div className="flex-1 max-w-6xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'منظومة التغليف المعاصرة' : 'PACKAGING TOUCHPOINTS'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'هندسة علب التغليف وديلاين التعبئة' : 'Dielines and wrapping patterns'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-6">
            {/* Box 1 */}
            <div className="wireframe-box bg-[#2D070B] text-[#F1EEE8] p-6 md:p-8 border border-white/10 min-h-[250px] flex flex-col justify-between rounded-sm shadow-xl">
              <div>
                <span className="font-mono text-[9px] opacity-40 uppercase">ITEM 01 / WRAPPER SLEEVE</span>
                <h5 className="font-display text-heading-md font-bold text-[#E64648] mt-3 leading-tight">
                  {language === 'ar' ? 'غلاف ورقي تيبوغرافي' : 'Typographical Paper Sleeve'}
                </h5>
                <p className="font-body text-body-sm opacity-70 mt-2 leading-relaxed">
                  {language === 'ar'
                    ? 'تصميم تيبوغرافي يعتمد على حظر لغوي واثق: "سنين. ملفوفة صح." / "صنعة ٣٠ سنة." مع خلفية بيضاء مخططة بلون الكرز.'
                    : 'A clean typographic paper wrap utilizing high-contrast vertical striping. Boldly printed with "Years. Wrapped right."'}
                </p>
              </div>
              <div className="font-mono text-[8px] opacity-35 border-t border-white/10 pt-3 mt-4">
                DIMENSIONS: 320x180mm / MATERIAL: Greaseproof 40gsm / COLOR BLOCKING
              </div>
            </div>

            {/* Box 2 */}
            <div className="wireframe-box bg-[#2D070B] text-[#F1EEE8] p-6 md:p-8 border border-white/10 min-h-[250px] flex flex-col justify-between rounded-sm shadow-xl">
              <div>
                <span className="font-mono text-[9px] opacity-40 uppercase">ITEM 02 / TAKEAWAY BOX</span>
                <h5 className="font-display text-heading-md font-bold text-[#F1EEE8] mt-3 leading-tight">
                  {language === 'ar' ? 'علبة سفري ورقية سميكة' : 'Kraft Board Takeaway Box'}
                </h5>
                <p className="font-body text-body-sm opacity-70 mt-2 leading-relaxed">
                  {language === 'ar'
                    ? 'كرتون كرافت سميك وقوي، ملون بالكامل بلون الشوكولاتة الداكن، وشعار العراب محفور بختم حراري أحمر في المركز.'
                    : 'Sovereign solid chocolate-burgundy kraft paper box. Debossed with a red hot-stamp logo mark in the optical center.'}
                </p>
              </div>
              <div className="font-mono text-[8px] opacity-35 border-t border-white/10 pt-3 mt-4">
                DIMENSIONS: 220x120x80mm / MATERIAL: Rigid Flute Board / RED FOIL DEBOSS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part C: Restaurant Environment Materials */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#E5E0D8]">
        <SectionHeader
          label={language === 'ar' ? 'ملمس البيئة' : 'SPATIAL CODE & MATERIALS'}
          number="07 / 08"
        />
        
        <div className="flex-1 max-w-6xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'الهوية الفراغية' : 'RESTAURANT SPACE'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'الهندسة والمواد التعبيرية للموقع' : 'Materials, textures and physical scale'}
            </h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full mt-6">
            <div className="lg:col-span-2">
              <p className="font-body text-body-lg opacity-85 leading-relaxed">
                {language === 'ar'
                  ? 'الهوية المكانية لمطاعم العراب تعكس هيبة الصنعة. لا نعتمد البهرجة البصرية؛ بل نركز على الصدق الفراغي من خلال استخدام الجدران الإسمنتية الرمادية، الخشب المحروق الداكن، وأنابيب الحديد السوداء الصدئة، مع لوحات الإضاءة الحمراء الدافئة التي تمنح الفراغ عمقاً سينمائياً صامتاً.'
                  : 'Al-Arrab interior environment uses spatial sovereignty. We avoid typical visual noise and focus on raw, honest materials: textured dark timber, raw concrete panels, black iron structures, and focused deep red lighting.'}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8 font-mono text-[11px] opacity-80">
                <div className="border-l border-[#2D070B]/10 pl-4 py-2">
                  <span className="text-[#E64648] font-bold block mb-1">WALL TEXTURE</span>
                  Raw aggregate concrete / إسمنت خشن
                </div>
                <div className="border-l border-[#2D070B]/10 pl-4 py-2">
                  <span className="text-[#E64648] font-bold block mb-1">FURNITURE Wood</span>
                  Charred timber (Shou Sugi Ban) / خشب محروق
                </div>
              </div>
            </div>

            {/* Environmental Graphic Wall Mockup */}
            <div className="bg-[#2D070B] text-[#F1EEE8] border border-white/5 p-6 md:p-10 rounded-sm min-h-[300px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <span className="font-mono text-[9px] opacity-30">MAIN WALL GRAPHIC / الجدار الرئيسي</span>
              <div className="my-auto text-center py-6">
                <h5 className="font-arabic-display text-display-md text-[#E64648] leading-[1.2] py-1 mb-2">
                  للصنعة عرّاب
                </h5>
                <p className="font-mono text-[9px] tracking-widest opacity-40 uppercase">EVERY CRAFT HAS ITS MASTER</p>
              </div>
              <div className="font-mono text-[8px] opacity-30 text-end">
                MATERIAL: Black Steel Plate / Laser Cut
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part D: Social Media Direction simulated feed */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'التواجد الرقمي' : 'SOCIAL & DIGITAL'}
          number="07 / 08"
        />
        
        <div className="flex-1 max-w-6xl mx-auto flex flex-col justify-center gap-12 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'منظومة السوشال ميديا' : 'SOCIAL GRID'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'المحتوى الرقمي وأعمدة النشر' : 'Pillars and digital stories'}
            </h4>
          </div>

          <div ref={socialFeedRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 w-full">
            {/* Card 1 */}
            <div className="social-feed-card aspect-[4/5] bg-[#2D070B] text-[#F1EEE8] p-6 md:p-8 flex flex-col justify-between border border-white/5 rounded-sm relative overflow-hidden group">
              <img
                src="/images/shawarma_closeup.png"
                alt="Shawarma Closeup social post"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D070B] via-transparent to-black/35 pointer-events-none z-[1]" />
              <div className="font-mono text-[9px] opacity-60 z-10">01 / CRAFT / الصنعة</div>
              <div className="font-display text-heading-md font-bold text-[#E64648] z-10 leading-tight">
                {language === 'ar' ? 'مو أول مرة نلفها.' : 'Not our first wrap.'}
              </div>
              <div className="font-mono text-[8px] opacity-50 z-10">@ALARRAB.SA</div>
            </div>

            {/* Card 2 */}
            <div className="social-feed-card aspect-[4/5] bg-[#E64648] text-[#F1EEE8] p-6 md:p-8 flex flex-col justify-between border border-white/5 rounded-sm relative overflow-hidden group">
              <img
                src="/images/packaging_mockup.png"
                alt="Packaging Mockup social post"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D070B] via-transparent to-black/35 pointer-events-none z-[1]" />
              <div className="font-mono text-[9px] opacity-60 z-10">02 / TIME / السنين</div>
              <div className="font-display text-heading-md font-bold text-[#F1EEE8] z-10 leading-tight">
                {language === 'ar' ? '٣٠ سنة ما راحت هدر.' : '30 years were not wasted.'}
              </div>
              <div className="font-mono text-[8px] opacity-50 z-10">@ALARRAB.SA</div>
            </div>

            {/* Card 3 */}
            <div className="social-feed-card aspect-[4/5] bg-[#2D070B] text-[#F1EEE8] p-6 md:p-8 flex flex-col justify-between border border-white/5 rounded-sm relative overflow-hidden group">
              <img
                src="/images/sauce_details.png"
                alt="Sauce Details social post"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D070B] via-transparent to-black/35 pointer-events-none z-[1]" />
              <div className="font-mono text-[9px] opacity-60 z-10">03 / VERDICT / الحكم</div>
              <div className="font-display text-heading-md font-bold text-[#E64648] z-10 leading-tight">
                {language === 'ar' ? 'الصنعة تبان من أول قطمة.' : 'The craft speaks in one bite.'}
              </div>
              <div className="font-mono text-[8px] opacity-50 z-10">@ALARRAB.SA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Part E: Launch Campaign timeline */}
      <section
        ref={timelineRef}
        className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B] text-[#F1EEE8]"
      >
        <SectionHeader
          label={language === 'ar' ? 'خطة الإطلاق' : 'LAUNCH CAMPAIGN'}
          number="07 / 08"
        />
        
        <div className="flex-1 max-w-4xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'حملة التدشين' : 'LAUNCH SYSTEM'}
            </span>
            <h4 className="font-display text-heading-lg font-black text-[#E64648] leading-tight">
              {language === 'ar' ? 'وصل العراب (The Master Has Arrived)' : 'THE MASTER HAS ARRIVED.'}
            </h4>
          </div>

          {/* Timeline steps */}
          <div className="flex flex-col gap-12 relative border-l border-white/10 pl-8 ml-4">
            <div className="timeline-node relative py-2">
              <div className="absolute -left-[37px] top-4 w-4 h-4 rounded-full bg-[#E64648] border-4 border-[#2D070B]" />
              <span className="font-mono text-[9px] opacity-40">01 / TEASER PHASE / التشويق</span>
              <h5 className="font-display text-heading-sm font-bold mt-1 leading-tight">
                {language === 'ar' ? 'حملات لوحات الشوارع الصامتة' : 'Silent Typographical Billboards'}
              </h5>
              <p className="font-body text-body-sm opacity-70 mt-2 max-w-xl leading-relaxed">
                {language === 'ar'
                  ? 'عرض لوحات بعبارات مختصرة دون صور طعام أو شعارات واضحة: "فيه خبرة بالطريق." / "٣٠ سنة..."'
                  : 'Bilingual text-only highway sheets without food imagery: "Experience is on the way." / "30 years..."'}
              </p>
            </div>

            <div className="timeline-node relative py-2">
              <div className="absolute -left-[37px] top-4 w-4 h-4 rounded-full bg-white/20 border-4 border-[#2D070B]" />
              <span className="font-mono text-[9px] opacity-40">02 / REVEAL PHASE / الكشف</span>
              <h5 className="font-display text-heading-sm font-bold mt-1 leading-tight">
                {language === 'ar' ? 'وصل العراب' : 'The Sovereignty Unwrapped'}
              </h5>
              <p className="font-body text-body-sm opacity-70 mt-2 max-w-xl leading-relaxed">
                {language === 'ar'
                  ? 'الكشف الرسمي بتركيب عبارة: "وصل العراب" متبوعاً بالمفهوم المركزي: "للصنعة عراب."'
                  : 'Revealing the restaurant identity: "The Master Has Arrived" backed by "Every Craft Has Its Master."'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

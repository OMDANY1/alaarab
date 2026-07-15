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

export default function Voice() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop/Tablet horizontal animations (1024px and above)
    mm.add("(min-width: 1024px)", () => {
      // Before/After line-through scroll anim
      const items = gsap.utils.toArray('.copy-transform-item');
      items.forEach((item: any) => {
        const beforeText = item.querySelector('.before-text');
        const arrow = item.querySelector('.transform-arrow');
        const afterText = item.querySelector('.after-text-wrapper');

        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
        .fromTo(beforeText, { opacity: 0.8 }, { opacity: 0.25, duration: 0.5 })
        .fromTo(arrow, { opacity: 0, scale: 0.5 }, { opacity: 0.5, scale: 1, duration: 0.4 }, '-=0.2')
        .fromTo(afterText, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.1');
      });
    });

    // Mobile natural layout flow fallback (Under 1024px)
    mm.add("(max-width: 1023px)", () => {
      const items = gsap.utils.toArray('.copy-transform-item');
      items.forEach((item: any) => {
        const beforeText = item.querySelector('.before-text');
        const arrow = item.querySelector('.transform-arrow');
        const afterText = item.querySelector('.after-text-wrapper');

        gsap.set(beforeText, { opacity: 0.25 });
        gsap.set(arrow, { opacity: 0.5, scale: 1 });
        gsap.set(afterText, { opacity: 1, y: 0 });
      });
    });

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bg-[#F1EEE8] text-[#2D070B] overflow-hidden">
      {/* Intro */}
      <ChapterIntro
        id="voice"
        number="05"
        titleAr="الصوت"
        titleEn="VOICE"
      />

      {/* Part B: Voice Principle */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#E5E0D8]">
        <SectionHeader
          label={language === 'ar' ? 'مبدأ نبرة الصوت' : 'VOICE PRINCIPLE'}
          number="05 / 08"
        />
        
        <div className="flex-1 max-w-4xl mx-auto flex flex-col justify-center text-center items-center gap-8 w-full">
          <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
            {language === 'ar' ? 'فلسفة النبرة' : 'THE PHILOSOPHY OF RESTRAINT'}
          </span>
          <h3 className="font-display text-display-md md:text-display-lg font-black text-[#E64648] leading-[1.2] py-1">
            {language === 'ar' ? 'العراب لا يشرح كثيرًا.' : 'THE MASTER DOESN\'T OVEREXPLAIN.'}
          </h3>
          <p className="font-body text-body-lg max-w-xl opacity-80 mt-4 leading-relaxed">
            {language === 'ar'
              ? 'صوت يتميز بالهدوء والاقتضاب، ينبع من ثقة مطلقة بالمعرفة والخبرة. لا نصرخ، لا نبالغ، ولا نستجدي انتباه العميل.'
              : 'Our voice speaks with quiet brevity. A language shaped by authority, mastery and calm confidence. We never oversell.'}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl mt-12 font-mono text-xs opacity-75">
            <div className="border border-[#2D070B]/10 py-6 px-4 rounded-sm">
              {language === 'ar' ? 'قصير. SHORT' : 'SHORT.'}
            </div>
            <div className="border border-[#2D070B]/10 py-6 px-4 rounded-sm">
              {language === 'ar' ? 'واثق. CONFIDENT' : 'CONFIDENT.'}
            </div>
            <div className="border border-[#2D070B]/10 py-6 px-4 rounded-sm">
              {language === 'ar' ? 'أصيل. AUTHENTIC' : 'AUTHENTIC.'}
            </div>
          </div>
        </div>
      </section>

      {/* Part C: Copywriting Shift */}
      <section ref={transformRef} className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'الهوية اللفظية' : 'VERBAL IDENTITY'}
          number="05 / 08"
        />
        
        <div className="flex-1 max-w-4xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'أمثلة تطبيقية' : 'APPLIED WRITING'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'تحويل اللغة الاستهلاكية إلى صياغة سيادية' : 'Sovereignty copywriting shift'}
            </h4>
          </div>

          <div className="flex flex-col gap-12 mt-6">
            {/* Row 1 */}
            <div className="copy-transform-item border-b border-[#2D070B]/10 pb-8 grid grid-cols-1 md:grid-cols-9 gap-6 items-center">
              <div className="md:col-span-3 flex flex-col gap-2">
                <span className="font-mono text-[9px] opacity-40 uppercase">{language === 'ar' ? 'قبل / الصياغة التجارية المعتادة' : 'BEFORE / CONVENTIONAL COMMERCIAL'}</span>
                <p className="before-text font-body text-body-sm opacity-80 leading-relaxed">
                  {language === 'ar' ? 'شاورما لذيذة ولحم بلدي طازج ومقرمش ولذيذ يخليك تطلب الثاني!' : 'Delicious fresh shawarma made from local beef that will make you crave for more! Try it now!'}
                </p>
              </div>
              <div className="md:col-span-1 flex justify-center text-xl text-[#E64648] transform-arrow select-none">→</div>
              <div className="after-text-wrapper md:col-span-5 flex flex-col gap-2 bg-[#E5E0D8]/20 p-6 md:p-8 rounded-sm">
                <span className="font-mono text-[9px] opacity-40 uppercase text-[#E64648] font-bold">{language === 'ar' ? 'بعد / صياغة العراب السيادية' : 'AFTER / AL-ARRAB SOVEREIGN'}</span>
                <p className="after-text font-display text-heading-sm font-bold text-[#2D070B] leading-normal">
                  {language === 'ar' ? 'صنعة ٣٠ سنة. ما تحتاج شرح.' : '30 years of craft. Needs no description.'}
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="copy-transform-item border-b border-[#2D070B]/10 pb-8 grid grid-cols-1 md:grid-cols-9 gap-6 items-center">
              <div className="md:col-span-3 flex flex-col gap-2">
                <span className="font-mono text-[9px] opacity-40 uppercase">{language === 'ar' ? 'قبل / الصياغة التجارية المعتادة' : 'BEFORE / CONVENTIONAL COMMERCIAL'}</span>
                <p className="before-text font-body text-body-sm opacity-80 leading-relaxed">
                  {language === 'ar' ? 'نقدم لكم أطيب صلصلة ثوم على أصولها بالخلطة السرية للمطعم!' : 'We serve you the best garlic sauce made with our secret recipe!'}
                </p>
              </div>
              <div className="md:col-span-1 flex justify-center text-xl text-[#E64648] transform-arrow select-none">→</div>
              <div className="after-text-wrapper md:col-span-5 flex flex-col gap-2 bg-[#E5E0D8]/20 p-6 md:p-8 rounded-sm">
                <span className="font-mono text-[9px] opacity-40 uppercase text-[#E64648] font-bold">{language === 'ar' ? 'بعد / صياغة العراب السيادية' : 'AFTER / AL-ARRAB SOVEREIGN'}</span>
                <p className="after-text font-display text-heading-sm font-bold text-[#2D070B] leading-normal">
                  {language === 'ar' ? 'سر الصنعة يوضع بهدوء.' : 'Process secrets are served quietly.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part D: Verbal Tone Dimensions */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative bg-[#2D070B] text-[#F1EEE8]">
        <SectionHeader
          label={language === 'ar' ? 'أبعاد النبرة' : 'TONE DIMENSIONS'}
          number="05 / 08"
        />
        
        <div className="flex-1 max-w-5xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'أعمدة الصياغة اللفظية' : 'TONE ARCHITECTURE'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'نبرة الصوت تحت المجهر' : 'The structural blocks of Al-Arrab voice'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-white/20 pt-6">
              <span className="font-mono text-xs text-[#E64648]">01</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">{language === 'ar' ? 'هيبة الصمت' : 'Sovereignty of Silence'}</h5>
              <p className="font-body text-body-sm opacity-80 mt-3 leading-relaxed">
                {language === 'ar'
                  ? 'نعبر بأقل قدر من الكلمات. نترك جودة الطعام وحجم اللوحة وإتقان الصنعة يتحدثان بالنيابة عننا.'
                  : 'We express more with less. We let the product weight, typography scale, and craft speak for us.'}
              </p>
            </div>

            <div className="border-t border-white/20 pt-6">
              <span className="font-mono text-xs text-[#E64648]">02</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">{language === 'ar' ? 'ثقة العارف' : 'Authority of Know-how'}</h5>
              <p className="font-body text-body-sm opacity-80 mt-3 leading-relaxed">
                {language === 'ar'
                  ? 'صياغتنا تقرر الحقائق ولا تناقشها. لا نستخدم صيغ الرجاء أو التفضيل، بل الجزم الواثق.'
                  : 'Our copywriting states truths. We never use superlative pitches or cheap descriptive claims.'}
              </p>
            </div>

            <div className="border-t border-white/20 pt-6">
              <span className="font-mono text-xs text-[#E64648]">03</span>
              <h5 className="font-display text-heading-sm font-bold mt-2 leading-tight">{language === 'ar' ? 'الاحترام المتبادل' : 'Quiet Confidence'}</h5>
              <p className="font-body text-body-sm opacity-80 mt-3 leading-relaxed">
                {language === 'ar'
                  ? 'لا نستخدم لغة الميمز أو السخرية، بل نخاطب عقل العميل باحترام رفيع يليق بمؤسسة ذات تاريخ.'
                  : 'We avoid memes and jokes. We speak with a calm maturity that reflects three decades of craft presence.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part E: Verbal Applications */}
      <section className="min-h-screen flex flex-col justify-start py-20 md:py-32 section-padding relative">
        <SectionHeader
          label={language === 'ar' ? 'تطبيقات اللسان اللفظي' : 'VERBAL APPLICATIONS'}
          number="05 / 08"
        />
        
        <div className="flex-1 max-w-6xl mx-auto flex flex-col justify-center gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E64648] uppercase">
              {language === 'ar' ? 'المواقع والتغليف' : 'TOUCHPOINTS'}
            </span>
            <h4 className="font-display text-heading-lg font-black leading-tight">
              {language === 'ar' ? 'حضور الهوية اللفظية في الواقع' : 'Where Al-Arrab copywriting lives'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#E5E0D8]/40 p-6 md:p-8 rounded-sm">
              <span className="font-mono text-[10px] opacity-40 uppercase">WRAP / غلاف الشاورما</span>
              <p className="font-display text-heading-sm font-bold text-[#E64648] mt-4 leading-normal">
                {language === 'ar' ? 'سنين. ملفوفة صح.' : 'Years. Wrapped right.'}
              </p>
            </div>

            <div className="bg-[#E5E0D8]/40 p-6 md:p-8 rounded-sm">
              <span className="font-mono text-[10px] opacity-40 uppercase">SAUCE CUP / علبة الصوص</span>
              <p className="font-display text-heading-sm font-bold text-[#2D070B] mt-4 leading-normal">
                {language === 'ar' ? 'من أسرار الصنعة.' : 'From the secrets.'}
              </p>
            </div>

            <div className="bg-[#E5E0D8]/40 p-6 md:p-8 rounded-sm">
              <span className="font-mono text-[10px] opacity-40 uppercase">BAG / كيس التوصيل</span>
              <p className="font-display text-heading-sm font-bold text-[#2D070B] mt-4 leading-normal">
                {language === 'ar' ? 'الخبرة وصلت.' : 'Experience arrived.'}
              </p>
            </div>

            <div className="bg-[#E5E0D8]/40 p-6 md:p-8 rounded-sm">
              <span className="font-mono text-[10px] opacity-40 uppercase">TRAY / ورق الصينية</span>
              <p className="font-display text-heading-sm font-bold text-[#E64648] mt-4 leading-normal">
                {language === 'ar' ? 'خذ وقتك. إحنا أخذنا ٣٠ سنة.' : 'Take your time. We took 30 years.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

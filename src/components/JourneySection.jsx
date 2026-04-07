import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const journeySteps = [
  {
    step: '٠١',
    icon: '🌿',
    location: 'جبال جازان، المملكة العربية السعودية',
    titleAr: 'الجذور السعودية',
    descAr:
      'في أعالي جبال جازان على ارتفاع ١٨٠٠ متر، ينمو بن عربي أصيل بعيداً عن أي ضغوط. مزارعون سعوديون يتوارثون المهنة جيلاً بعد جيل، يقطفون حبات القهوة الحمراء يدوياً في موسم الحصاد.',
    stat: { num: '١٨٠٠م', label: 'ارتفاع المزارع' },
    color: 'from-green-900/40 to-espresso-800',
    img: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=600&q=80',
  },
  {
    step: '٠٢',
    icon: '☀️',
    location: 'مشرط قَطرَة، الرياض',
    titleAr: 'التحميص الحرفي',
    descAr:
      'تصل حبوب البن الخضراء إلى مشرطنا في الرياض حيث يحمّصها خبراؤنا بدقة متناهية. درجة حرارة محسوبة، ووقت مضبوط، ليخرج كل بن بشخصيته الفريدة وطيفه الكامل من النكهات.',
    stat: { num: '+٢٠٠°', label: 'درجة التحميص' },
    color: 'from-orange-900/40 to-espresso-800',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
  },
  {
    step: '٠٣',
    icon: '🔬',
    location: 'مختبر الجودة، قَطرَة',
    titleAr: 'معايرة الطعم',
    descAr:
      'كل دفعة تمر بجلسة تقييم (كابينج) مع فريق Q-Grader المعتمد دولياً. نقيّم اثني عشر معياراً من الرائحة إلى الحموضة والمتبقي، لنضمن وصول الأفضل فقط إلى فنجانك.',
    stat: { num: '١٢', label: 'معيار جودة' },
    color: 'from-blue-900/40 to-espresso-800',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
  },
  {
    step: '٠٤',
    icon: '☕',
    location: 'فنجانك، أينما كنت',
    titleAr: 'اللحظة المثالية',
    descAr:
      'من يد البارستا الماهر، عبر طحن دقيق للحبة في اللحظة ذاتها، حتى يصل الماء بدرجته المثلى — كل هذا ليضع في يدك فنجاناً يحمل روح جبال جازان وشغف رياض اليوم.',
    stat: { num: '٩٣°', label: 'حرارة الإعداد المثلى' },
    color: 'from-espresso-600/40 to-espresso-800',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
]

function JourneyCard({ step, index }) {
  const cardRef = useRef()
  const imgRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card slide in
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: index % 2 === 0 ? 80 : -80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Image parallax
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Text stagger
      gsap.fromTo(
        textRef.current?.querySelectorAll('.reveal-text'),
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [index])

  const isEven = index % 2 === 0

  return (
    <div
      ref={cardRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/8 ${
        isEven ? '' : 'lg:direction-rtl'
      }`}
    >
      {/* Image side */}
      <div className={`relative overflow-hidden h-64 lg:h-auto ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div ref={imgRef} className="absolute inset-0 scale-110">
          <img
            src={step.img}
            alt={step.titleAr}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-${isEven ? 'r' : 'l'} ${step.color}`} />

        {/* Step badge */}
        <div className="absolute top-5 end-5 w-14 h-14 rounded-full bg-gold-400/15 backdrop-blur-xl border border-gold-400/40 flex items-center justify-center">
          <span className="font-cairo font-black text-gold-400 text-lg">{step.step}</span>
        </div>

        {/* Location */}
        <div className="absolute bottom-5 start-5 flex items-center gap-2">
          <span className="text-xl">{step.icon}</span>
          <span className="font-tajawal text-cream-200/60 text-xs bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {step.location}
          </span>
        </div>
      </div>

      {/* Text side */}
      <div ref={textRef} className={`bg-espresso-800 p-8 lg:p-10 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="reveal-text inline-block bg-gold-400/10 border border-gold-400/20 rounded-full px-3 py-1 w-fit mb-4">
          <span className="font-tajawal text-gold-400 text-xs">{step.location}</span>
        </div>

        <h3 className="reveal-text font-cairo font-black text-cream-200 text-2xl lg:text-3xl mb-4">
          {step.titleAr}
        </h3>

        <p className="reveal-text font-tajawal text-cream-200/55 leading-[1.9] text-sm lg:text-base mb-6">
          {step.descAr}
        </p>

        {/* Stat */}
        <div className="reveal-text flex items-center gap-4 pt-5 border-t border-white/8">
          <div>
            <div className="font-cairo font-black text-gold-400 text-3xl">{step.stat.num}</div>
            <div className="font-tajawal text-cream-200/35 text-xs mt-0.5">{step.stat.label}</div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="font-tajawal text-cream-200/35 text-xs">
            مرحلة {step.step} من ٠٤ مراحل رحلة البن
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JourneySection() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const lineRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.header-el'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Timeline line grows
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="relative py-24 bg-espresso-800 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
        <div className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full bg-gold-400/3 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-start mb-16">
          <span className="header-el inline-block font-tajawal text-gold-400 text-sm tracking-[0.2em] uppercase mb-4">
            ◆ رحلة البن
          </span>
          <h2 className="header-el font-cairo font-black text-cream-200 text-3xl sm:text-4xl lg:text-5xl mb-4">
            من جبال جازان
            <span className="text-gradient-gold"> إلى فنجانك</span>
          </h2>
          <p className="header-el font-tajawal text-cream-200/50 text-base max-w-xl leading-relaxed">
            نؤمن بالشفافية الكاملة — كل حبة قهوة تحكي قصتها من اليوم الأول حتى آخر رشفة.
            هذا هو وعدنا لك.
          </p>

          {/* Vision 2030 badge */}
          <motion.div
            className="header-el inline-flex items-center gap-3 bg-gradient-to-l from-green-900/30 to-espresso-700/50 border border-green-700/25 rounded-2xl px-5 py-3 mt-6"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl">🇸🇦</span>
            <div>
              <p className="font-cairo font-bold text-cream-200 text-sm">فخورون بهويتنا السعودية</p>
              <p className="font-tajawal text-cream-200/40 text-xs mt-0.5">جزء من رؤية المملكة ٢٠٣٠ لتعزيز الهوية الوطنية</p>
            </div>
          </motion.div>
        </div>

        {/* Journey cards */}
        <div className="relative space-y-6">
          {/* Animated timeline line */}
          <div className="absolute start-8 top-0 bottom-0 w-px hidden lg:block pointer-events-none">
            <div ref={lineRef} className="w-full h-full timeline-line" />
          </div>

          {journeySteps.map((step, i) => (
            <JourneyCard key={step.step} step={step} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center relative"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 rounded-full bg-gold-400/5 blur-[60px]" />
          </div>
          <span className="font-cairo text-gold-400/30 text-8xl leading-none block">"</span>
          <p className="font-cairo font-black text-cream-200 text-2xl lg:text-3xl -mt-8 relative">
            القهوة ليست مشروباً — إنها لحظة تأمل في عالم لا يتوقف
          </p>
          <p className="font-tajawal text-cream-200/35 text-sm mt-4">— فريق قَطرَة</p>
        </motion.blockquote>
      </div>
    </section>
  )
}

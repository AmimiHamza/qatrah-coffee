import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function ProcessCard({ step, index, isRTL }) {
  const cardRef = useRef()
  const imgRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: index % 2 === 0 ? 80 : -80 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.to(imgRef.current, {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: cardRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
      gsap.fromTo(
        textRef.current?.querySelectorAll('.reveal-text'),
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )
    })
    return () => ctx.revert()
  }, [index])

  const isEven = index % 2 === 0

  return (
    <div
      ref={cardRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/8"
    >
      {/* Image side */}
      <div className={`relative overflow-hidden h-64 lg:h-auto ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div ref={imgRef} className="absolute inset-0 scale-110">
          <img src={step.img} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-${isEven ? 'r' : 'l'} from-espresso-800/60 to-espresso-800`} />

        <div className="absolute top-5 end-5 w-14 h-14 rounded-full bg-gold-400/15 backdrop-blur-xl border border-gold-400/40 flex items-center justify-center">
          <span className="font-cairo font-black text-gold-400 text-xl">{step.icon}</span>
        </div>

        <div className="absolute bottom-5 start-5 flex items-center gap-2">
          <span className="font-tajawal text-cream-200/60 text-xs bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {step.location}
          </span>
        </div>
      </div>

      {/* Text side */}
      <div ref={textRef} className={`bg-espresso-800 p-8 lg:p-10 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className={`reveal-text inline-block bg-gold-400/10 border border-gold-400/20 rounded-full px-3 py-1 w-fit mb-4 ${isRTL ? 'ms-auto' : ''}`}>
          <span className="font-tajawal text-gold-400 text-xs">
            {step.step} — {step.location}
          </span>
        </div>

        <h3 className={`reveal-text font-cairo font-black text-cream-200 text-2xl lg:text-3xl mb-4 ${isRTL ? 'text-end' : 'text-start'}`}>
          {step.title}
        </h3>

        <p className={`reveal-text font-tajawal text-cream-200/55 leading-[1.9] text-sm lg:text-base mb-6 ${isRTL ? 'text-end' : 'text-start'}`}>
          {step.desc}
        </p>

        <div className={`reveal-text flex items-center gap-4 pt-5 border-t border-white/8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-end' : 'text-start'}>
            <div className="font-cairo font-black text-gold-400 text-3xl">{step.stat.num}</div>
            <div className="font-tajawal text-cream-200/35 text-xs mt-0.5">{step.stat.label}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProcessSection() {
  const { t, language } = useLanguage()
  const p = t.process
  const isRTL = language === 'ar'
  const sectionRef = useRef()
  const headerRef = useRef()
  const lineRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.header-el'),
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 40%', scrub: 1 },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="relative py-24 bg-espresso-800 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
        <div className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full bg-gold-400/3 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className={`mb-16 ${isRTL ? 'text-end' : 'text-start'}`}>
          <span className={`header-el inline-block font-tajawal text-gold-400 text-sm tracking-[0.2em] uppercase mb-4`}>
            ◆ {p.tag}
          </span>
          <h2 className="header-el font-cairo font-black text-cream-200 text-3xl sm:text-4xl lg:text-5xl mb-4">
            {p.title}
            <span className="text-gradient-gold"> {p.titleHighlight}</span>
          </h2>
          <p className="header-el font-tajawal text-cream-200/50 text-base max-w-xl leading-relaxed">
            {p.sub}
          </p>

          <motion.div
            className="header-el inline-flex items-center gap-3 bg-espresso-700/50 border border-gold-400/20 rounded-2xl px-5 py-3 mt-6"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl">☕</span>
            <div className={isRTL ? 'text-end' : 'text-start'}>
              <p className="font-cairo font-bold text-cream-200 text-sm">{p.badge}</p>
              <p className="font-tajawal text-cream-200/40 text-xs mt-0.5">{p.badgeSub}</p>
            </div>
          </motion.div>
        </div>

        {/* Process cards */}
        <div className="relative space-y-6">
          <div className="absolute start-8 top-0 bottom-0 w-px hidden lg:block pointer-events-none">
            <div ref={lineRef} className="w-full h-full timeline-line" />
          </div>

          {p.steps.map((step, i) => (
            <ProcessCard key={step.step} step={step} index={i} isRTL={isRTL} />
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
          <p className="font-cairo font-black text-cream-200 text-2xl lg:text-3xl -mt-8 relative max-w-2xl mx-auto">
            {p.quote}
          </p>
          <p className="font-tajawal text-cream-200/35 text-sm mt-4">{p.quoteBy}</p>
        </motion.blockquote>
      </div>
    </section>
  )
}

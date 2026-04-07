import { useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowDown, Star } from 'lucide-react'
import CoffeeCup3D from './CoffeeCup3D'
import { useLanguage } from '../context/LanguageContext'

function AnimatedWord() {
  const ref = useRef()
  const idx = useRef(0)
  const { t } = useLanguage()
  const words = t.hero.words

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.textContent = words[0]
    idx.current = 0

    const cycle = () => {
      gsap.to(el, {
        opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
        onComplete: () => {
          idx.current = (idx.current + 1) % words.length
          el.textContent = words[idx.current]
          gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        },
      })
    }
    const timer = setInterval(cycle, 2800)
    return () => clearInterval(timer)
  }, [words])

  return <span ref={ref} className="inline-block text-gradient-gold" style={{ minWidth: '7ch' }} />
}

export default function HeroSection({ onOrderOpen }) {
  const { t, language } = useLanguage()
  const h = t.hero
  const containerRef = useRef()
  const headlineRef = useRef()
  const subRef = useRef()
  const badgesRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'expo.out' }
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5'
      )
      .fromTo(badgesRef.current?.children,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.12, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4'
      )
    }, containerRef)
    return () => ctx.revert()
  }, [language])

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-espresso-800">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-400/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-gold-600/8 blur-[100px]" />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-400/20"
            style={{ top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%` }}
            animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.4, 1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="absolute top-24 inset-x-0 flex items-center px-6 pointer-events-none">
        <div className="flex-1 h-px bg-gradient-to-l from-gold-400/20 to-transparent" />
        <div className="mx-4 w-2 h-2 rounded-full bg-gold-400/40" />
        <div className="flex-1 h-px bg-gradient-to-r from-gold-400/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text Side */}
        <div className="order-1 text-start">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/25 rounded-full px-4 py-1.5 mb-6"
          >
            <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
            <span className="font-tajawal text-gold-400 text-xs tracking-wider">{h.badge}</span>
          </motion.div>

          <div ref={headlineRef} className="overflow-hidden">
            <h1 className="font-cairo font-black text-cream-200 leading-[1.15] mb-2">
              <span className="block text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl">{h.headline1}</span>
              <span className="block text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl mt-1">
                <AnimatedWord />
              </span>
              <span className="block text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl text-gold-400 mt-1">{h.headline3}</span>
            </h1>
          </div>

          <p ref={subRef} className="font-tajawal text-cream-200/60 text-base sm:text-lg max-w-lg mt-5 leading-relaxed">
            {h.sub}
          </p>

          <div ref={badgesRef} className="flex flex-wrap gap-3 mt-7">
            {[
              { icon: '☕', label: h.badges[0] },
              { icon: '🌿', label: h.badges[1] },
              { icon: '📍', label: h.badges[2] },
              { icon: '⭐', label: h.badges[3] },
            ].map(b => (
              <span key={b.label} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 font-tajawal text-cream-200/70 text-xs">
                <span>{b.icon}</span>{b.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-9">
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={onOrderOpen}
              className="btn-gold relative bg-gold-400 text-espresso-800 px-8 py-3.5 rounded-full font-cairo font-bold text-base shadow-[0_0_40px_rgba(241,228,154,0.3)] hover:shadow-[0_0_60px_rgba(241,228,154,0.45)] transition-shadow duration-300"
            >
              {h.orderNow}
            </motion.button>
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 border border-gold-400/30 text-cream-200 px-8 py-3.5 rounded-full font-cairo font-semibold text-base hover:bg-white/5 transition-colors duration-300"
            >
              {h.explore}
            </motion.a>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/8">
            {h.stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-cairo font-black text-gold-400 text-2xl sm:text-3xl">{s.num}</div>
                <div className="font-tajawal text-cream-200/40 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Cup Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 relative h-[420px] sm:h-[520px] lg:h-[640px]"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-gold-400/8 blur-[80px] animate-pulse-slow" />
          </div>

          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-gold-400/30 border-t-gold-400 rounded-full loader-ring" />
            </div>
          }>
            <CoffeeCup3D />
          </Suspense>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-10 left-4 bg-espresso-800/90 backdrop-blur-xl border border-gold-400/20 rounded-2xl p-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-400/15 flex items-center justify-center text-xl">☕</div>
              <div>
                <p className="font-cairo font-bold text-cream-200 text-sm">{h.floatLabel}</p>
                <p className="font-tajawal text-gold-400 text-xs mt-0.5">{h.floatSub}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute top-16 right-4 bg-espresso-800/90 backdrop-blur-xl border border-gold-400/20 rounded-2xl p-3 shadow-xl"
          >
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-gold-400 fill-gold-400" />)}
            </div>
            <p className="font-tajawal text-cream-200/60 text-[10px] text-center">+800 {language === 'ar' ? 'تقييم' : 'reviews'}</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-200/30"
      >
        <span className="font-tajawal text-xs tracking-widest uppercase">{h.discover}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const ui = {
  ar: {
    eyebrow: 'الموقع كخدمة اشتراك',
    headline: 'تحول رقمي بلا مخاطرة',
    sub: 'مقهاك يحصل على موقع استثنائي، لوحة تحكم ذكية، ودعم مستمر — بدون رسوم تأسيس، بدون رسوم خفية، بدون مخاطرة. اشتراك بسيط يعوّض عن نفسه.',
    zeroLabel: 'رسوم التأسيس',
    priceNote: 'بدون رسوم تأسيس · بدون التزامات',
    pillars: [
      { icon: '🛡', title: 'صفر مخاطرة مالية', desc: 'لا دفع مسبق. نستثمر في نجاحك — تدفع فقط عندما يكون الموقع حياً.' },
      { icon: '🔄', title: 'محدّث دائماً', desc: 'نتولى كل تحديث وإصلاح. موقعك لن يتقادم أبداً — نبقيه يعمل بأعلى أداء.' },
      { icon: '📈', title: 'مدفوع بالأداء', desc: 'تقارير أداء شهرية. نحسّن موقعك لمزيد من الزيارات والمبيعات.' },
    ],
    cta: 'ابدأ بـ ٠ ريال اليوم',
    contact: 'احجز مكالمة مجانية',
  },
  en: {
    eyebrow: 'Website as a Service',
    headline: 'Risk-Free Digital Transformation',
    sub: 'Your café gets a luxury website, smart dashboard, and ongoing support — no setup cost, no hidden fees, no risk. A simple subscription that pays for itself.',
    zeroLabel: 'Setup Fee',
    priceNote: 'No setup fees · No lock-in contract',
    pillars: [
      { icon: '🛡', title: '0% Financial Risk', desc: 'No upfront payment. We invest in your success — you only pay when your site is live.' },
      { icon: '🔄', title: 'Always Updated', desc: "We handle every update and fix. Your site never becomes outdated." },
      { icon: '📈', title: 'Performance Driven', desc: 'Monthly performance reports. We optimize for more orders and revenue.' },
    ],
    cta: 'Start for $0 Today',
    contact: 'Book a Free Call',
  },
  fr: {
    eyebrow: 'Site web en tant que Service',
    headline: 'Transformation Numérique Sans Risque',
    sub: "Votre café obtient un site de luxe, un tableau de bord intelligent et un support continu — sans frais de création, sans frais cachés, sans risque. Un abonnement simple qui se rentabilise tout seul.",
    zeroLabel: 'Frais de création',
    priceNote: "Sans frais d'installation · Sans engagement",
    pillars: [
      { icon: '🛡', title: '0% de Risque Financier', desc: "Aucun paiement initial. Vous ne payez que lorsque votre site est en ligne." },
      { icon: '🔄', title: 'Toujours à Jour', desc: "Nous gérons chaque mise à jour. Votre site ne vieillit jamais." },
      { icon: '📈', title: 'Axé sur la Performance', desc: "Rapports mensuels. Nous optimisons pour plus de commandes et de revenus." },
    ],
    cta: 'Commencer à 0 £',
    contact: 'Réserver un appel gratuit',
  },
}

export default function WaaSSection() {
  const { language } = useLanguage()
  const l = ui[language] ?? ui.en
  const isRTL = language === 'ar'
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="waas" className="relative py-24 bg-espresso-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold-400/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="font-tajawal text-gold-400 text-xs tracking-[0.25em] uppercase">◆ {l.eyebrow}</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cairo font-black text-cream-200 text-center text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight"
        >
          {l.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="font-tajawal text-cream-200/50 text-base text-center max-w-2xl mx-auto leading-relaxed mb-20"
        >
          {l.sub}
        </motion.p>

        {/* Zero + Pricing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          {/* Setup badge */}
          <div className="inline-block bg-gold-400/10 border border-gold-400/25 rounded-full px-5 py-1.5 mb-5">
            <span className="font-tajawal text-gold-400 text-xs tracking-[0.2em] uppercase">{l.zeroLabel}</span>
          </div>

          {/* Golden 0 */}
          <div
            className="font-cairo font-black text-gold-400 leading-none"
            style={{
              fontSize: 'clamp(80px, 20vw, 140px)',
              textShadow: '0 0 80px rgba(241,228,154,0.5), 0 0 40px rgba(241,228,154,0.3)',
              filter: 'drop-shadow(0 0 30px rgba(241,228,154,0.2))',
            }}
          >
            {language === 'ar' ? '٠' : '0'}
          </div>

          {/* Price note */}
          <p className="font-tajawal text-cream-200/30 text-xs mt-5 tracking-wide">{l.priceNote}</p>
        </motion.div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {l.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`bg-white/3 border border-white/8 rounded-2xl p-8 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <div className="text-4xl mb-5">{pillar.icon}</div>
              <h3 className="font-cairo font-bold text-gold-400 text-xl mb-3 leading-tight">{pillar.title}</h3>
              <p className="font-tajawal text-cream-200/45 text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className={`flex gap-4 flex-wrap justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#contact')}
            className="bg-gold-400 text-espresso-800 px-8 py-3.5 rounded-full font-cairo font-black text-sm btn-gold flex items-center gap-2"
          >
            {l.cta} <Arrow className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#contact')}
            className="border border-gold-400/40 text-gold-400 px-8 py-3.5 rounded-full font-cairo font-semibold text-sm hover:bg-gold-400/10 transition-colors"
          >
            {l.contact}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Eye, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const features = [
  {
    id: 'website', icon: '🌐',
    ar: { title: 'موقع مقهى احترافي', desc: 'تصميم مخصص بالكامل يعكس هوية مقهاك — هيرو، القصة، القائمة، والمزيد.' },
    en: { title: 'Professional Café Website', desc: 'Fully custom design tailored to your brand — hero, story, menu, and more.' },
    included: true,
  },
  {
    id: 'bilingual', icon: '🌍',
    ar: { title: 'ثنائي اللغة عربي / إنجليزي', desc: 'دعم كامل للغة العربية من اليمين لليسار. تبديل كامل للموقع بنقرة واحدة.' },
    en: { title: 'Bilingual EN / AR + RTL', desc: 'Full right-to-left Arabic support. Switch the entire site language in one click.' },
    included: true,
  },
  {
    id: 'mobile', icon: '📱',
    ar: { title: 'متوافق مع الجوال', desc: 'مثالي على كل الأجهزة — جوال، تابلت، وحاسوب.' },
    en: { title: 'Mobile-First Responsive', desc: 'Pixel-perfect on every device — phone, tablet, and desktop.' },
    included: true,
  },
  {
    id: 'menu', icon: '☕',
    ar: { title: 'قائمة قهوة رقمية تفاعلية', desc: 'قائمة قابلة للتصفية والبحث مع صور، الأصل، طريقة التحضير، والسعرات.' },
    en: { title: 'Interactive Digital Coffee Menu', desc: 'Filterable, searchable menu with photos, origin, brew method, and calories.' },
    included: false,
  },
  {
    id: 'ordering', icon: '🛍',
    ar: { title: 'طلب أونلاين ودفع إلكتروني', desc: 'تخصيص الطلب (الحجم، الحليب، السكر) مع مدى وآبل باي.' },
    en: { title: 'Online Ordering & Payment', desc: 'Order customization (size, milk, sugar) with Mada and Apple Pay.' },
    included: false,
  },
  {
    id: 'reservation', icon: '📅',
    ar: { title: 'نظام حجوزات أونلاين', desc: 'حجز الطاولات باختيار التاريخ والوقت والمنطقة مع تأكيد فوري.' },
    en: { title: 'Online Reservation System', desc: 'Table booking with date, time, and zone selection with instant confirmation.' },
    included: false,
  },
  {
    id: 'loyalty', icon: '⭐',
    ar: { title: 'نظام الولاء والنقاط', desc: 'برنامج نقاط لعملائك المميزين — يزيد معدل العودة ويبني ولاءً حقيقياً.' },
    en: { title: 'Loyalty & Points System', desc: 'A points program for your loyal customers — boosts return rate and builds real loyalty.' },
    included: false,
  },
  {
    id: 'dashboard', icon: '📊',
    ar: { title: 'لوحة تحكم إدارية ذكية', desc: 'مبيعاتك، طلباتك، ومخزونك في الوقت الفعلي — من أي جهاز.' },
    en: { title: 'Smart Admin Dashboard', desc: 'Your sales, orders, and inventory in real time — from any device.' },
    included: false,
  },
  {
    id: 'whatsapp', icon: '💬',
    ar: { title: 'كونسيرج واتساب', desc: 'زر واتساب عائم للتواصل المباشر مع عملائك وتأكيدات الطلبات التلقائية.' },
    en: { title: 'WhatsApp Concierge', desc: 'Floating WhatsApp button for direct customer support and automated order confirmations.' },
    included: false,
  },
  {
    id: 'seo', icon: '🔍',
    ar: { title: 'تهيئة SEO وخرائط جوجل', desc: 'Schema.org وعلامات ميتا وSEO محلي حتى يجدك الضيوف أولاً.' },
    en: { title: 'SEO + Google Maps Ready', desc: 'Schema.org markup, meta tags, and local SEO so guests find you first.' },
    included: true,
  },
]

export default function FeaturesSection() {
  const { t, language } = useLanguage()
  const f = t.features
  const isRTL = language === 'ar'
  const Arrow = isRTL ? ArrowLeft : ArrowRight
  const [pricingTooltip, setPricingTooltip] = useState(false)

  const [selected, setSelected] = useState(
    new Set(features.filter(f => f.included).map(f => f.id))
  )

  const toggle = (id) => {
    const feat = features.find(f => f.id === id)
    if (feat.included) return
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectedFeatures = features.filter(f => selected.has(f.id))

  const buildWAMessage = () => {
    const names = selectedFeatures.map(f => language === 'ar' ? f.ar.title : f.en.title).join(', ')
    return encodeURIComponent(
      language === 'ar'
        ? `مرحباً عميمي ديجيتال، أريد موقع مقهى بالميزات التالية: ${names}`
        : `Hello Amimi Digital, I'd like a café site with: ${names}`
    )
  }

  return (
    <section id="features" className="relative py-24 bg-espresso-800 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-start mb-12"
        >
          <span className="inline-block font-tajawal text-gold-400 text-sm tracking-[0.2em] uppercase mb-4">
            ◆ {f.tag}
          </span>
          <h2 className="font-cairo font-black text-cream-200 text-3xl sm:text-4xl lg:text-5xl mb-4">
            {f.title}
            <span className="text-gradient-gold"> {f.titleHighlight}</span>
          </h2>
          <p className="font-tajawal text-cream-200/50 text-base max-w-xl leading-relaxed">
            {f.sub}
          </p>
        </motion.div>

        <div className={`grid gap-8 ${isRTL ? '' : ''}`} style={{ gridTemplateColumns: 'minmax(0,1fr) 300px', direction: isRTL ? 'rtl' : 'ltr' }}>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feat, i) => {
              const isSelected = selected.has(feat.id)
              const content = language === 'ar' ? feat.ar : feat.en
              return (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  onClick={() => toggle(feat.id)}
                  className={`relative rounded-2xl border p-5 transition-all duration-300 ${
                    feat.included ? 'cursor-default' : 'cursor-pointer'
                  } ${
                    isSelected
                      ? 'bg-gold-400/10 border-gold-400/50 shadow-[0_0_30px_rgba(241,228,154,0.08)]'
                      : 'bg-white/3 border-white/8 hover:border-gold-400/25 hover:bg-white/5'
                  }`}
                >
                  <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-3xl">{feat.icon}</span>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected ? 'bg-gold-400 border-gold-400' : 'border-white/20'
                    }`}>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="w-3 h-3 text-espresso-800" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <h3 className={`font-cairo font-bold text-base mb-2 transition-colors duration-200 ${isRTL ? 'text-end' : 'text-start'} ${isSelected ? 'text-gold-400' : 'text-cream-200'}`}>
                    {content.title}
                    {feat.included && (
                      <span className="ms-2 font-tajawal text-[10px] font-bold text-espresso-800 bg-gold-400 px-2 py-0.5 rounded-full tracking-wider">
                        {f.included}
                      </span>
                    )}
                  </h3>
                  <p className={`font-tajawal text-cream-200/45 text-xs leading-relaxed ${isRTL ? 'text-end' : 'text-start'}`}>
                    {content.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Sticky summary */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ position: 'sticky', top: 90, alignSelf: 'start' }}
          >
            <div className="bg-espresso-900 border border-gold-400/20 rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gold-400 px-5 py-4">
                <h3 className="font-cairo font-black text-espresso-800 text-lg">{f.your_package}</h3>
                <p className="font-tajawal text-espresso-800/60 text-xs mt-0.5">
                  {selectedFeatures.length} {f.features_selected}
                </p>
              </div>

              {/* Features list */}
              <div className="px-4 py-4 max-h-64 overflow-y-auto space-y-2">
                <AnimatePresence mode="popLayout">
                  {selectedFeatures.map(feat => {
                    const content = language === 'ar' ? feat.ar : feat.en
                    return (
                      <motion.div
                        key={feat.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center gap-2.5 py-2 border-b border-white/8 last:border-0 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="text-base shrink-0">{feat.icon}</span>
                        <span className={`font-tajawal text-cream-200 text-xs flex-1 ${isRTL ? 'text-end' : 'text-start'}`}>
                          {content.title}
                        </span>
                        {!feat.included && (
                          <button
                            onClick={e => { e.stopPropagation(); toggle(feat.id) }}
                            className="text-cream-200/30 hover:text-cream-200/60 text-base leading-none bg-transparent border-none cursor-pointer p-0"
                          >
                            ×
                          </button>
                        )}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Pricing mini-block */}
              <div className="px-4 py-3 border-t border-white/8 space-y-2">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="font-tajawal text-cream-200/30 text-[10px] tracking-wider uppercase">
                    {language === 'ar' ? 'رسوم التأسيس' : language === 'fr' ? 'Frais de création' : 'Setup Fee'}
                  </span>
                  <span className="font-cairo font-bold text-gold-400 text-base">
                    {language === 'ar' ? '٠' : '0'}
                  </span>
                </div>
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="font-tajawal text-cream-200/30 text-[10px] tracking-wider uppercase">
                      {language === 'ar' ? 'الاشتراك الشهري' : language === 'fr' ? 'Abonnement mensuel' : 'Monthly Investment'}
                    </span>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setPricingTooltip(true)}
                        onMouseLeave={() => setPricingTooltip(false)}
                        className="w-3.5 h-3.5 rounded-full border border-white/20 bg-white/5 flex items-center justify-center font-tajawal text-cream-200/30 text-[8px] cursor-pointer"
                      >
                        i
                      </button>
                      {pricingTooltip && (
                        <div className={`absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 w-44 bg-espresso-900 border border-white/10 rounded-xl p-2.5 font-tajawal text-cream-200/50 text-[10px] leading-relaxed z-20 shadow-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' ? 'يشمل استضافة Vercel، شهادة SSL، والدعم التقني' : language === 'fr' ? "Inclut Vercel, SSL et support continu" : 'Includes Vercel hosting, SSL, and support'}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="font-cairo font-bold text-cream-200 text-sm">
                    {language === 'ar' ? '٢٩٩ ر.س/شهر' : language === 'fr' ? '79 £/mois' : '$79/mo'}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="px-4 pb-5 pt-3 space-y-2.5">
                <button
                  onClick={() => {
                    const ids = Array.from(selected).join(',')
                    window.location.href = `/preview?f=${ids}`
                  }}
                  className="w-full bg-gold-400 text-espresso-800 py-3 rounded-full font-cairo font-black text-sm btn-gold flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> {f.preview}
                </button>
                <a
                  href={`https://wa.me/212643626334?text=${buildWAMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-gold-400/40 text-gold-400 py-3 rounded-full font-cairo font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gold-400/10 transition-colors no-underline"
                >
                  💬 {f.send_wa}
                </a>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full text-cream-200/50 py-2 font-tajawal text-xs flex items-center justify-center gap-1 hover:text-cream-200/80 transition-colors bg-transparent border-none cursor-pointer"
                >
                  {f.contact_us} <Arrow className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #features .max-w-7xl > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TrendingUp, Package, Users, Clock, BarChart2, Zap, ShieldCheck, Smartphone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: TrendingUp, label: 'زيادة الإيرادات', value: '+٤٢٪', desc: 'مقارنة بالنظام التقليدي', color: 'text-green-400' },
  { icon: Package, label: 'تقليص هدر المخزون', value: '-٣١٪', desc: 'من خلال التنبؤ الذكي', color: 'text-blue-400' },
  { icon: Users, label: 'معدل عودة العملاء', value: '٧٨٪', desc: 'أعلى بكثير من المتوسط', color: 'text-gold-400' },
  { icon: Clock, label: 'وقت الانتظار', value: '-٤٥٪', desc: 'بفضل نظام الطلبات الذكي', color: 'text-purple-400' },
]

const features = [
  { icon: BarChart2, label: 'لوحة تحليلات لحظية', desc: 'تتبع المبيعات والمخزون في الوقت الفعلي' },
  { icon: Zap, label: 'جدولة الموظفين التلقائية', desc: 'بناءً على أوقات الذروة والطلب المتوقع' },
  { icon: ShieldCheck, label: 'نظام الولاء المتكامل', desc: 'نقاط ومكافآت للعملاء المميزين' },
  { icon: Smartphone, label: 'تطبيق المدير', desc: 'إدارة كاملة من هاتفك في أي مكان' },
]

function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef()
  const hasRun = useRef(false)

  // Extract numeric value
  const isPercent = target.includes('٪')
  const isNeg = target.includes('-')
  const numStr = target.replace(/[^\u0660-\u0669٠-٩]/g, '')
  const numAr = numStr
  const numEn = parseInt(
    numAr.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  )

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasRun.current) return
        hasRun.current = true
        let start = 0
        const step = numEn / (duration * 60)
        const frame = () => {
          start = Math.min(start + step, numEn)
          const arNum = Math.floor(start)
            .toString()
            .replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
          setCount(arNum)
          if (start < numEn) requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
      },
    })
    return () => trigger.kill()
  }, [numEn, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {isNeg ? '-' : '+'}
      {count || '٠'}
      {isPercent ? '٪' : ''}
    </span>
  )
}

// Mini bar chart
function MiniChart() {
  const bars = [35, 52, 41, 68, 73, 55, 89, 82, 91, 76, 95, 88]
  return (
    <div className="flex items-end gap-1 h-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: 'backOut' }}
          style={{ height: `${h}%`, transformOrigin: 'bottom' }}
          className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? 'bg-gold-400' : 'bg-white/20'}`}
        />
      ))}
    </div>
  )
}

export default function DashboardPreview() {
  const { t } = useLanguage()
  const d = t.dashboard
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dashboard-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-espresso-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
        <div className="absolute left-1/4 top-0 w-[600px] h-[400px] bg-gold-400/4 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-start mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/25 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-tajawal text-gold-400 text-xs tracking-wider">{d.tag}</span>
          </span>
          <h2 className="font-cairo font-black text-cream-200 text-3xl sm:text-4xl lg:text-5xl mb-4">
            {d.title}
            <span className="text-gradient-gold"> {d.titleHighlight}</span>
          </h2>
          <p className="font-tajawal text-cream-200/50 text-base max-w-xl leading-relaxed">{d.sub}</p>
        </motion.div>

        {/* Main dashboard mockup */}
        <div className="dashboard-card bg-espresso-800 border border-white/10 rounded-3xl overflow-hidden mb-6 shadow-2xl">
          {/* Mockup top bar */}
          <div className="flex items-center gap-2 px-5 py-3 bg-espresso-900/60 border-b border-white/8">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white/8 rounded-full px-6 py-1 text-center">
                <span className="font-tajawal text-cream-200/30 text-xs">dashboard.café.amimi.digital</span>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Stats */}
              <div className="lg:col-span-2 space-y-4">
                {/* Revenue chart */}
                <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-tajawal text-cream-200/40 text-xs">الإيراد الشهري</p>
                      <p className="font-cairo font-black text-cream-200 text-2xl mt-0.5">
                        ٤٨,٣٠٠ <span className="text-sm text-cream-200/40 font-tajawal font-normal">ريال</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-500/15 border border-green-500/25 px-3 py-1.5 rounded-full">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="font-tajawal text-green-400 text-xs font-bold">+٢٣٪</span>
                    </div>
                  </div>
                  <MiniChart />
                  <div className="flex justify-between mt-2">
                    {['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'].slice(0, 12).map((m, i) => (
                      <span key={i} className="font-tajawal text-cream-200/20 text-[7px]">{m.slice(0,3)}</span>
                    ))}
                  </div>
                </div>

                {/* Mini stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'طلبات اليوم', value: '١٣٤', icon: '📦', trend: '+١٢' },
                    { label: 'متوسط الطلب', value: '٣٢ ر', icon: '💰', trend: '+٥' },
                    { label: 'الحجوزات', value: '٢٧', icon: '📅', trend: '+٨' },
                    { label: 'تقييم اليوم', value: '٤.٩', icon: '⭐', trend: '+٠.١' },
                  ].map(s => (
                    <div key={s.label} className="bg-white/4 border border-white/8 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{s.icon}</span>
                        <span className="font-tajawal text-green-400 text-[10px]">▲{s.trend}</span>
                      </div>
                      <p className="font-cairo font-black text-cream-200 text-lg">{s.value}</p>
                      <p className="font-tajawal text-cream-200/35 text-[10px]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Inventory + Staff */}
              <div className="space-y-4">
                {/* Inventory */}
                <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-cairo font-bold text-cream-200 text-sm">المخزون</p>
                    <span className="font-tajawal text-green-400 text-xs bg-green-500/10 px-2 py-0.5 rounded-full">٣ تنبيه</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'بن إثيوبيا', level: 75, color: 'bg-gold-400' },
                      { name: 'حليب شوفان', level: 30, color: 'bg-orange-400' },
                      { name: 'سيروب الهيل', level: 15, color: 'bg-red-400' },
                      { name: 'كابس V60', level: 90, color: 'bg-green-400' },
                    ].map(item => (
                      <div key={item.name}>
                        <div className="flex justify-between mb-1">
                          <span className="font-tajawal text-cream-200/60 text-xs">{item.name}</span>
                          <span className="font-tajawal text-cream-200/40 text-xs">{item.level}٪</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            className={`h-full rounded-full ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Staff schedule */}
                <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
                  <p className="font-cairo font-bold text-cream-200 text-sm mb-4">جدول الشيفت</p>
                  <div className="space-y-2">
                    {[
                      { name: 'أحمد', role: 'بارستا', time: '٧ص–١٢م', status: 'active' },
                      { name: 'سلطان', role: 'كاشير', time: '٨ص–١م', status: 'active' },
                      { name: 'نورا', role: 'بارستا', time: '١٢م–٦م', status: 'upcoming' },
                      { name: 'ريم', role: 'مدير', time: '٧ص–٤م', status: 'active' },
                    ].map(staff => (
                      <div key={staff.name} className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${staff.status === 'active' ? 'bg-green-400' : 'bg-cream-200/20'}`} />
                        <div className="flex-1 min-w-0">
                          <span className="font-cairo font-bold text-cream-200 text-xs">{staff.name}</span>
                          <span className="font-tajawal text-cream-200/35 text-[10px] ms-1.5">{staff.role}</span>
                        </div>
                        <span className="font-tajawal text-cream-200/35 text-[10px] shrink-0">{staff.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                className="dashboard-card bento-card rounded-2xl p-5 border border-white/8"
                whileHover={{ scale: 1.02, borderColor: 'rgba(241,228,154,0.25)' }}
                transition={{ duration: 0.2 }}
              >
                <Icon className={`w-5 h-5 ${s.color} mb-3`} />
                <div className={`font-cairo font-black text-3xl ${s.color} mb-1`}>
                  <AnimatedCounter target={s.value} />
                </div>
                <p className="font-cairo font-bold text-cream-200 text-sm">{s.label}</p>
                <p className="font-tajawal text-cream-200/35 text-xs mt-0.5">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.label}
                className="dashboard-card bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-gold-400/25 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <p className="font-cairo font-bold text-cream-200 text-sm mb-1">{f.label}</p>
                <p className="font-tajawal text-cream-200/40 text-xs">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA for business */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center bg-gradient-to-b from-gold-400/8 to-transparent border border-gold-400/15 rounded-3xl p-10"
        >
          <h3 className="font-cairo font-black text-cream-200 text-2xl lg:text-3xl mb-3">
            {d.interested}
          </h3>
          <p className="font-tajawal text-cream-200/50 text-base mb-6 max-w-lg mx-auto">
            {d.interestedSub}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.a
              href="https://wa.me/966500000000?text=أريد عرضاً توضيحياً لنظام إدارة قطرة"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gold bg-gold-400 text-espresso-800 px-8 py-3.5 rounded-full font-cairo font-black text-base shadow-[0_0_30px_rgba(241,228,154,0.25)]"
              href={`https://wa.me/212643626334?text=${encodeURIComponent('مرحباً، أريد عرضاً توضيحياً للوحة تحكم مقهاي')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.dashboard.demoBtn}
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-gold-400/30 text-cream-200 px-8 py-3.5 rounded-full font-cairo font-semibold text-base hover:bg-white/5 transition-colors"
            >
              {t.dashboard.brochureBtn}
            </motion.button>
          </div>
          {/* Trust logos */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-white/8">
            <span className="font-tajawal text-cream-200/25 text-xs">يدعم:</span>
            {['مدى', 'Apple Pay', 'STC Pay', 'Tabby', 'Tamara'].map(p => (
              <div key={p} className="px-3 py-1.5 bg-white/6 border border-white/10 rounded-lg">
                <span className="font-tajawal text-cream-200/45 text-xs">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

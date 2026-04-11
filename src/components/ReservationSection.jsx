import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, Check, ChevronLeft, Info } from 'lucide-react'

const zones = [
  {
    id: 'window',
    icon: '🌅',
    label: 'مقعد النافذة',
    desc: 'إطلالة بانورامية وإضاءة طبيعية',
    capacity: '1–2',
    mood: 'هادئ ورومانسي',
    available: 3,
  },
  {
    id: 'work',
    icon: '💻',
    label: 'منطقة العمل الهادئة',
    desc: 'واي فاي فائق السرعة، طاولات واسعة',
    capacity: '1–3',
    mood: 'تركيز وإنتاجية',
    available: 5,
  },
  {
    id: 'social',
    icon: '🎭',
    label: 'الصالة الاجتماعية',
    desc: 'أجواء حيوية مع موسيقى هادئة',
    capacity: '2–8',
    mood: 'اجتماعي ومرح',
    available: 2,
  },
  {
    id: 'private',
    icon: '🏛️',
    label: 'الغرفة الخاصة',
    desc: 'مثالية للاجتماعات والمناسبات',
    capacity: '4–12',
    mood: 'خاص وحصري',
    available: 1,
  },
]

const timeSlots = [
  '7:00 ص', '7:30 ص', '8:00 ص', '8:30 ص',
  '9:00 ص', '9:30 ص', '10:00 ص', '10:30 ص',
  '11:00 ص', '11:30 ص', '12:00 م', '12:30 م',
  '1:00 م', '1:30 م', '2:00 م', '3:00 م',
  '4:00 م', '5:00 م', '6:00 م', '7:00 م',
  '8:00 م', '9:00 م', '10:00 م', '11:00 م',
]

// Today + 14 days
const getDates = () => {
  const dates = []
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
  const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
  for (let i = 0; i < 14; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    dates.push({
      day: days[d.getDay()],
      date: d.getDate(),
      month: months[d.getMonth()],
      full: d.toLocaleDateString('ar-SA'),
      isToday: i === 0,
    })
  }
  return dates
}

export default function ReservationSection() {
  const [step, setStep] = useState(1)
  const [guests, setGuests] = useState(2)
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedZone, setSelectedZone] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const dates = getDates()

  const canProceed1 = selectedTime !== null
  const canProceed2 = selectedZone !== null && name && phone

  const handleConfirm = () => setConfirmed(true)

  return (
    <section id="reservation" className="relative py-24 bg-espresso-900 overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-gold-400/4 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-start mb-12"
        >
          <span className="inline-block font-tajawal text-gold-400 text-sm tracking-[0.2em] uppercase mb-4">
            ◆ احجز طاولتك
          </span>
          <h2 className="font-cairo font-black text-cream-200 text-3xl sm:text-4xl lg:text-5xl mb-4">
            لحظتك تستحق
            <span className="text-gradient-gold"> المكان المثالي</span>
          </h2>

          {/* No-show policy */}
          <div className="inline-flex items-start gap-2 bg-gold-400/8 border border-gold-400/20 rounded-xl px-4 py-3 mt-2">
            <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
            <p className="font-tajawal text-cream-200/55 text-xs leading-relaxed">
              <span className="text-gold-400 font-bold">سياسة الحجز:</span> إلغاء مجاني قبل الموعد بـ2 ساعة.
              بعد التأكيد، يُرجى الحضور في الموعد المحدد للحفاظ على تجربة الجميع ✨
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
            >
              {/* ── Left: Form ── */}
              <div className="space-y-6">
                {/* Step indicator */}
                <div className="flex items-center gap-3">
                  {[
                    { n: 1, label: 'الموعد والضيوف' },
                    { n: 2, label: 'اختر المنطقة' },
                  ].map(s => (
                    <div key={s.n} className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-cairo font-bold text-xs transition-all ${
                        step >= s.n ? 'bg-gold-400 text-espresso-800' : 'bg-white/10 text-cream-200/40'
                      }`}>
                        {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
                      </div>
                      <span className={`font-tajawal text-xs ${step >= s.n ? 'text-cream-200' : 'text-cream-200/30'}`}>
                        {s.label}
                      </span>
                      {s.n < 2 && <div className="w-8 h-px bg-white/15" />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* ── STEP 1 ── */}
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      {/* Guests */}
                      <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-cairo font-bold text-cream-200 text-sm flex items-center gap-2">
                            <Users className="w-4 h-4 text-gold-400" />
                            عدد الضيوف
                          </label>
                          <span className="font-cairo font-black text-gold-400 text-2xl">{guests}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={12}
                          value={guests}
                          onChange={e => setGuests(Number(e.target.value))}
                          className="w-full accent-[#F1E49A] mt-3"
                          dir="ltr"
                        />
                        <div className="flex justify-between font-tajawal text-cream-200/25 text-xs mt-1">
                          <span>1</span>
                          <span>12</span>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
                        <label className="font-cairo font-bold text-cream-200 text-sm flex items-center gap-2 mb-4">
                          <Calendar className="w-4 h-4 text-gold-400" />
                          اختر التاريخ
                        </label>
                        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                          {dates.map((d, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedDate(i)}
                              className={`flex-shrink-0 snap-start flex flex-col items-center p-2.5 rounded-xl border min-w-[52px] transition-all duration-200 ${
                                selectedDate === i
                                  ? 'border-gold-400 bg-gold-400/15'
                                  : 'border-white/8 bg-white/3 hover:border-white/20'
                              }`}
                            >
                              <span className={`font-tajawal text-[9px] ${selectedDate === i ? 'text-gold-400' : 'text-cream-200/35'}`}>
                                {d.isToday ? 'اليوم' : d.day.slice(0, 3)}
                              </span>
                              <span className={`font-cairo font-black text-lg leading-none my-0.5 ${selectedDate === i ? 'text-gold-400' : 'text-cream-200'}`}>
                                {d.date}
                              </span>
                              <span className={`font-tajawal text-[9px] ${selectedDate === i ? 'text-gold-400/70' : 'text-cream-200/25'}`}>
                                {d.month.slice(0, 3)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time */}
                      <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
                        <label className="font-cairo font-bold text-cream-200 text-sm flex items-center gap-2 mb-4">
                          <Clock className="w-4 h-4 text-gold-400" />
                          الوقت المناسب
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map(t => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`py-2 px-1 rounded-xl text-center font-tajawal text-xs transition-all duration-200 ${
                                selectedTime === t
                                  ? 'bg-gold-400 text-espresso-800 font-bold shadow-[0_0_15px_rgba(241,228,154,0.3)]'
                                  : 'bg-white/5 border border-white/8 text-cream-200/60 hover:border-white/20 hover:text-cream-200'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!canProceed1}
                        onClick={() => setStep(2)}
                        className="w-full bg-gold-400 text-espresso-800 py-4 rounded-full font-cairo font-black text-base btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        التالي — اختر المنطقة
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ── STEP 2 ── */}
                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <button
                        onClick={() => setStep(1)}
                        className="flex items-center gap-1.5 font-tajawal text-cream-200/50 text-sm hover:text-cream-200 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 flip-rtl" />
                        {dates[selectedDate].full} · {selectedTime} · {guests} ضيوف
                      </button>

                      {/* Zone selector */}
                      <div className="space-y-2">
                        {zones.map(z => (
                          <button
                            key={z.id}
                            onClick={() => setSelectedZone(z.id)}
                            className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-start transition-all duration-200 ${
                              selectedZone === z.id
                                ? 'border-gold-400 bg-gold-400/8'
                                : 'border-white/8 bg-white/3 hover:border-white/20'
                            }`}
                          >
                            <span className="text-2xl mt-0.5 shrink-0">{z.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-cairo font-bold text-cream-200 text-sm">{z.label}</p>
                                <span className="text-[10px] font-tajawal text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded-full">
                                  {z.available} متاح
                                </span>
                              </div>
                              <p className="font-tajawal text-cream-200/45 text-xs mt-0.5">{z.desc}</p>
                              <div className="flex gap-3 mt-1.5">
                                <span className="font-tajawal text-cream-200/30 text-[10px]">👥 {z.capacity}</span>
                                <span className="font-tajawal text-cream-200/30 text-[10px]">✨ {z.mood}</span>
                              </div>
                            </div>
                            {selectedZone === z.id && (
                              <Check className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Contact info */}
                      <div className="space-y-3 pt-2">
                        <input
                          type="text"
                          placeholder="اسمك الكريم"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/30 focus:border-gold-400/50 focus:outline-none transition-colors"
                        />
                        <input
                          type="tel"
                          placeholder="رقم الجوال"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/30 focus:border-gold-400/50 focus:outline-none transition-colors"
                          dir="ltr"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!canProceed2}
                        onClick={handleConfirm}
                        className="w-full bg-gold-400 text-espresso-800 py-4 rounded-full font-cairo font-black text-base btn-gold disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(241,228,154,0.25)]"
                      >
                        تأكيد الحجز
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Right: Visual ── */}
              <div className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden h-[560px] border border-white/8"
                >
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=80"
                    alt="أجواء المقهى"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-800/90 via-espresso-800/30 to-transparent" />

                  {/* Overlay cards */}
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-3">
                    <div className="flex items-center gap-3 bg-espresso-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                      <span className="text-2xl">🌅</span>
                      <div>
                        <p className="font-cairo font-bold text-cream-200 text-sm">مقعد النافذة</p>
                        <p className="font-tajawal text-cream-200/45 text-xs">إطلالة بانورامية على الحي</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['واي فاي ⚡', 'شحن 🔌', 'هدوء 🎵'].map(f => (
                        <div key={f} className="bg-white/8 backdrop-blur-sm rounded-xl p-2.5 text-center">
                          <p className="font-tajawal text-cream-200/60 text-xs">{f}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* ── Confirmed ── */
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg mx-auto text-center py-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                className="w-24 h-24 rounded-full bg-gold-400/15 border-2 border-gold-400 flex items-center justify-center text-5xl mx-auto mb-6"
              >
                🎉
              </motion.div>
              <h3 className="font-cairo font-black text-cream-200 text-3xl mb-3">تم الحجز بنجاح!</h3>
              <p className="font-tajawal text-cream-200/55 leading-relaxed mb-6">
                يسعدنا استقبالك يا <span className="text-gold-400 font-bold">{name}</span>!
                سنرسل لك تأكيداً على رقم{' '}
                <span className="text-gold-400">{phone}</span>
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-start space-y-3 mb-8">
                {[
                  { label: 'التاريخ', value: dates[selectedDate].full },
                  { label: 'الوقت', value: selectedTime },
                  { label: 'عدد الضيوف', value: `${guests} ضيوف` },
                  { label: 'المنطقة', value: zones.find(z => z.id === selectedZone)?.label },
                ].map(r => (
                  <div key={r.label} className="flex justify-between">
                    <span className="font-tajawal text-cream-200/45 text-sm">{r.label}</span>
                    <span className="font-cairo font-bold text-cream-200 text-sm">{r.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setConfirmed(false); setStep(1); setSelectedTime(null); setSelectedZone(null); setName(''); setPhone('') }}
                className="font-tajawal text-gold-400 text-sm hover:underline"
              >
                حجز موعد آخر
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

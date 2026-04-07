import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ChevronLeft, MessageCircle, Car, UtensilsCrossed, Package, Check } from 'lucide-react'

const milkOptions = [
  { id: 'whole', label: 'كامل الدسم', icon: '🥛', extra: 0 },
  { id: 'oat', label: 'شوفان', icon: '🌾', extra: 3 },
  { id: 'almond', label: 'لوز', icon: '🌰', extra: 3 },
  { id: 'coconut', label: 'جوز الهند', icon: '🥥', extra: 4 },
  { id: 'soy', label: 'صويا', icon: '🫘', extra: 2 },
]

const sweetnessLevels = [
  { id: 0, label: 'بدون', color: 'bg-espresso-600' },
  { id: 25, label: 'خفيف', color: 'bg-gold-600' },
  { id: 50, label: 'متوسط', color: 'bg-gold-500' },
  { id: 75, label: 'حلو', color: 'bg-gold-400' },
  { id: 100, label: 'محلّى', color: 'bg-yellow-300' },
]

const orderModes = [
  { id: 'dine-in', label: 'في المكان', icon: UtensilsCrossed, desc: 'استمتع بأجواء المقهى' },
  { id: 'pickup', label: 'استلام', icon: Package, desc: 'جاهز خلال ١٠ دقائق' },
  { id: 'car', label: 'استلام بالسيارة', icon: Car, desc: 'ابقَ في سيارتك' },
]

const sizeOptions = [
  { id: 'small', label: 'صغير', oz: '٨', price: 0 },
  { id: 'medium', label: 'وسط', oz: '١٢', price: 5 },
  { id: 'large', label: 'كبير', oz: '١٦', price: 8 },
]

export default function OrderDrawer({ isOpen, onClose, preSelectedItem }) {
  const [step, setStep] = useState(1) // 1: customize, 2: cart, 3: confirm
  const [milk, setMilk] = useState('whole')
  const [sweetness, setSweetness] = useState(50)
  const [size, setSize] = useState('medium')
  const [mode, setMode] = useState('dine-in')
  const [qty, setQty] = useState(1)
  const [notes, setNotes] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsappStep, setWhatsappStep] = useState(false)
  const [ordered, setOrdered] = useState(false)

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setOrdered(false)
        setWhatsappStep(false)
        setPhone('')
        setNotes('')
        setQty(1)
      }, 400)
    }
  }, [isOpen])

  const item = preSelectedItem || {
    nameAr: 'يرغاشيف V60',
    nameEn: 'Yirgacheffe V60',
    price: '٢٢',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&q=80',
  }

  const basePrice = parseInt(item.price.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))) || 22
  const milkExtra = milkOptions.find(m => m.id === milk)?.extra || 0
  const sizeExtra = sizeOptions.find(s => s.id === size)?.price || 0
  const total = (basePrice + milkExtra + sizeExtra) * qty

  const handleOrder = () => {
    if (!whatsappStep) {
      setWhatsappStep(true)
      return
    }
    setOrdered(true)
    setStep(3)
  }

  const formatWhatsApp = () => {
    const milkLabel = milkOptions.find(m => m.id === milk)?.label
    const sizeLabel = sizeOptions.find(s => s.id === size)?.label
    const modeLabel = orderModes.find(o => o.id === mode)?.label
    const sweetnessLabel = sweetnessLevels.find(s => s.id === sweetness)?.label
    return `مرحباً، أريد طلب:\n☕ ${item.nameAr} (${sizeLabel})\n🥛 حليب: ${milkLabel}\n🍯 حلاوة: ${sweetnessLabel}\n📍 طريقة: ${modeLabel}\n🔢 الكمية: ${qty}\n💰 الإجمالي: ${total} ريال${notes ? `\n📝 ملاحظات: ${notes}` : ''}`
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-[80] drawer-overlay"
          />
        )}
      </AnimatePresence>

      {/* Drawer — slides from right (start in RTL) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 280 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-espresso-800 z-[90] flex flex-col border-s border-gold-400/10 shadow-2xl overflow-hidden"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/8 bg-espresso-900/50 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                {step > 1 && !ordered && (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className="text-cream-200/60 hover:text-cream-200 transition-colors p-1"
                  >
                    <ChevronLeft className="w-5 h-5 flip-rtl" />
                  </button>
                )}
                <div>
                  <h2 className="font-cairo font-bold text-cream-200 text-base">
                    {step === 1 ? 'خصّص طلبك' : step === 2 ? 'السلة' : 'تم الطلب! 🎉'}
                  </h2>
                  <p className="font-tajawal text-cream-200/35 text-xs mt-0.5">
                    {step === 1 ? 'لأن كل تفصيل يهم' : step === 2 ? 'راجع طلبك' : 'شكراً لاختيارك قَطرَة'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-cream-200/60 hover:text-cream-200 hover:bg-white/15 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress */}
            {!ordered && (
              <div className="flex gap-1 px-5 py-3 shrink-0">
                {[1, 2].map(s => (
                  <div
                    key={s}
                    className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                      step >= s ? 'bg-gold-400' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">

                {/* ── STEP 1: Customize ── */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 space-y-7"
                  >
                    {/* Item preview */}
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/8">
                      <img
                        src={item.img}
                        alt={item.nameAr}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-cairo font-bold text-cream-200 text-sm">{item.nameAr}</p>
                        <p className="font-tajawal text-cream-200/40 text-xs">{item.nameEn}</p>
                        <p className="font-cairo font-black text-gold-400 text-lg mt-1">{item.price} ريال</p>
                      </div>
                    </div>

                    {/* Size */}
                    <div>
                      <h3 className="font-cairo font-bold text-cream-200 text-sm mb-3">الحجم</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {sizeOptions.map(s => (
                          <button
                            key={s.id}
                            onClick={() => setSize(s.id)}
                            className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                              size === s.id
                                ? 'border-gold-400 bg-gold-400/10'
                                : 'border-white/10 bg-white/3 hover:border-white/25'
                            }`}
                          >
                            <p className="font-cairo font-bold text-cream-200 text-xs">{s.label}</p>
                            <p className="font-tajawal text-cream-200/40 text-[10px] mt-0.5">{s.oz} أوز</p>
                            {s.price > 0 && (
                              <p className="font-tajawal text-gold-400 text-[10px]">+{s.price}</p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Milk type */}
                    <div>
                      <h3 className="font-cairo font-bold text-cream-200 text-sm mb-3">نوع الحليب</h3>
                      <div className="space-y-2">
                        {milkOptions.map(m => (
                          <button
                            key={m.id}
                            onClick={() => setMilk(m.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                              milk === m.id
                                ? 'border-gold-400 bg-gold-400/10'
                                : 'border-white/10 bg-white/3 hover:border-white/25'
                            }`}
                          >
                            <span className="text-lg">{m.icon}</span>
                            <span className="font-tajawal text-cream-200 text-sm flex-1 text-start">{m.label}</span>
                            {m.extra > 0 && (
                              <span className="font-tajawal text-gold-400 text-xs">+{m.extra} ريال</span>
                            )}
                            {milk === m.id && (
                              <Check className="w-4 h-4 text-gold-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sweetness */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-cairo font-bold text-cream-200 text-sm">مستوى الحلاوة</h3>
                        <span className="font-tajawal text-gold-400 text-xs">
                          {sweetnessLevels.find(s => s.id === sweetness)?.label}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {sweetnessLevels.map(s => (
                          <button
                            key={s.id}
                            onClick={() => setSweetness(s.id)}
                            className={`flex-1 h-8 rounded-lg transition-all duration-200 ${s.color} ${
                              sweetness === s.id ? 'opacity-100 scale-105 shadow-lg' : 'opacity-40 hover:opacity-70'
                            }`}
                            title={s.label}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Order Mode */}
                    <div>
                      <h3 className="font-cairo font-bold text-cream-200 text-sm mb-3">طريقة الاستلام</h3>
                      <div className="space-y-2">
                        {orderModes.map(m => {
                          const Icon = m.icon
                          return (
                            <button
                              key={m.id}
                              onClick={() => setMode(m.id)}
                              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                                mode === m.id
                                  ? 'border-gold-400 bg-gold-400/10'
                                  : 'border-white/10 bg-white/3 hover:border-white/25'
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${mode === m.id ? 'text-gold-400' : 'text-cream-200/50'}`} />
                              <div className="text-start flex-1">
                                <p className="font-cairo font-bold text-cream-200 text-sm">{m.label}</p>
                                <p className="font-tajawal text-cream-200/40 text-xs">{m.desc}</p>
                              </div>
                              {mode === m.id && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h3 className="font-cairo font-bold text-cream-200 text-sm mb-2">ملاحظات إضافية</h3>
                      <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="مثال: لا سكر، حليب إضافي..."
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/30 focus:border-gold-400/50 focus:outline-none resize-none transition-colors"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: WhatsApp Login & Confirm ── */}
                {step === 2 && !ordered && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 space-y-5"
                  >
                    {/* Order summary */}
                    <div className="bg-white/5 rounded-2xl border border-white/8 p-4">
                      <h3 className="font-cairo font-bold text-cream-200 text-sm mb-4">ملخص الطلب</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="font-tajawal text-cream-200/60">المنتج</span>
                          <span className="font-cairo font-bold text-cream-200">{item.nameAr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-tajawal text-cream-200/60">الحجم</span>
                          <span className="font-tajawal text-cream-200">{sizeOptions.find(s => s.id === size)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-tajawal text-cream-200/60">الحليب</span>
                          <span className="font-tajawal text-cream-200">{milkOptions.find(m => m.id === milk)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-tajawal text-cream-200/60">الحلاوة</span>
                          <span className="font-tajawal text-cream-200">{sweetnessLevels.find(s => s.id === sweetness)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-tajawal text-cream-200/60">الاستلام</span>
                          <span className="font-tajawal text-cream-200">{orderModes.find(o => o.id === mode)?.label}</span>
                        </div>
                        {notes && (
                          <div className="flex justify-between gap-2">
                            <span className="font-tajawal text-cream-200/60 shrink-0">ملاحظات</span>
                            <span className="font-tajawal text-cream-200 text-end text-xs">{notes}</span>
                          </div>
                        )}
                        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                          <span className="font-cairo font-bold text-cream-200">الإجمالي</span>
                          <span className="font-cairo font-black text-gold-400 text-xl">{total} ريال</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl border border-white/8 p-3">
                      <span className="font-cairo font-bold text-cream-200 text-sm">الكمية</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQty(q => Math.max(1, q - 1))}
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-cream-200" />
                        </button>
                        <span className="font-cairo font-black text-cream-200 text-lg w-6 text-center">{qty}</span>
                        <button
                          onClick={() => setQty(q => q + 1)}
                          className="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center hover:bg-gold-400/35 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gold-400" />
                        </button>
                      </div>
                    </div>

                    {/* WhatsApp Login */}
                    <div className="bg-[#25D366]/8 border border-[#25D366]/25 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        <h3 className="font-cairo font-bold text-cream-200 text-sm">تسجيل الدخول عبر واتساب</h3>
                      </div>
                      <p className="font-tajawal text-cream-200/45 text-xs mb-3">
                        أدخل رقمك لاستلام تأكيد الطلب فوراً
                      </p>
                      <div className="flex gap-2">
                        <div className="bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
                          <span className="text-sm">🇸🇦</span>
                          <span className="font-tajawal text-cream-200/60 text-sm">+966</span>
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="٥٠٠ ١٢٣ ٤٥٦"
                          className="flex-1 bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/30 focus:border-[#25D366]/50 focus:outline-none transition-colors"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {/* Payment logos */}
                    <div>
                      <p className="font-tajawal text-cream-200/30 text-xs text-center mb-3">طرق الدفع المقبولة</p>
                      <div className="flex items-center justify-center gap-4">
                        {['مدى', 'Apple Pay', 'STC Pay'].map(p => (
                          <div
                            key={p}
                            className="px-3 py-1.5 bg-white/8 border border-white/10 rounded-lg"
                          >
                            <span className="font-tajawal text-cream-200/50 text-xs">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Success ── */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="p-8 flex flex-col items-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-24 h-24 rounded-full bg-gold-400/15 border-2 border-gold-400 flex items-center justify-center text-5xl mb-6"
                    >
                      ☕
                    </motion.div>
                    <h3 className="font-cairo font-black text-cream-200 text-2xl mb-3">
                      طلبك في الطريق!
                    </h3>
                    <p className="font-tajawal text-cream-200/55 text-sm leading-relaxed mb-6">
                      تم استلام طلبك بنجاح. ستصلك رسالة واتساب للتأكيد خلال لحظات ☕
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full mb-6">
                      <p className="font-cairo font-bold text-gold-400 text-xl">{total} ريال</p>
                      <p className="font-tajawal text-cream-200/40 text-xs mt-1">
                        {orderModes.find(o => o.id === mode)?.label} •{' '}
                        {mode === 'dine-in' ? '~١٠ دقائق' : '~١٥ دقيقة'}
                      </p>
                    </div>
                    <motion.a
                      href={`https://wa.me/966500000000?text=${encodeURIComponent(formatWhatsApp())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-cairo font-bold text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      تأكيد عبر واتساب
                    </motion.a>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer CTA */}
            {!ordered && (
              <div className="p-5 border-t border-white/8 shrink-0 bg-espresso-800">
                {step === 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full bg-gold-400 text-espresso-800 py-4 rounded-full font-cairo font-black text-base btn-gold shadow-[0_0_30px_rgba(241,228,154,0.25)]"
                  >
                    التالي — مراجعة الطلب
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOrder}
                    disabled={!phone && step === 2}
                    className="w-full bg-gold-400 text-espresso-800 py-4 rounded-full font-cairo font-black text-base btn-gold shadow-[0_0_30px_rgba(241,228,154,0.25)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    تأكيد الطلب عبر واتساب
                  </motion.button>
                )}
                <p className="font-tajawal text-cream-200/25 text-xs text-center mt-3">
                  🔒 بياناتك آمنة ومحمية
                </p>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag, Star, Info } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = ['الكل', 'Pour Over', 'لاتيه مميز', 'موسمي', 'بارد']

const menuItems = [
  {
    id: 1,
    nameAr: 'يرغاشيف V60',
    nameEn: 'Yirgacheffe V60',
    category: 'Pour Over',
    descAr: 'حموضة مشرقة من مرتفعات إثيوبيا، نكهات الياسمين والخوخ',
    price: '٢٢',
    badge: 'طرح اليوم',
    badgeColor: 'bg-gold-400 text-espresso-800',
    size: 'large',
    gradient: 'from-[#3d1f0f] to-[#5c2d15]',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    origin: '🇪🇹 إثيوبيا',
    process: 'مغسول',
  },
  {
    id: 2,
    nameAr: 'لاتيه الهيل الذهبي',
    nameEn: 'Golden Cardamom Latte',
    category: 'لاتيه مميز',
    descAr: 'إسبريسو مزدوج مع هيل جازان وحليب الشوفان المخوط',
    price: '٢٨',
    badge: 'الأكثر طلباً',
    badgeColor: 'bg-espresso-500/80 text-gold-400 border border-gold-400/30',
    size: 'medium',
    gradient: 'from-[#2c1810] to-[#4a2818]',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500&q=80',
    origin: '🇸🇦 جازان',
    process: 'مميز',
  },
  {
    id: 3,
    nameAr: 'كولد برو المطمر',
    nameEn: 'Barrel-Aged Cold Brew',
    category: 'بارد',
    descAr: 'تخمير ٢٤ ساعة، نكهات الشوكولاتة الداكنة والتمر',
    price: '٢٥',
    badge: 'موسمي',
    badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-400/20',
    size: 'medium',
    gradient: 'from-[#0f1a2c] to-[#1a2c3d]',
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80',
    origin: '🌍 كينيا',
    process: 'طبيعي',
  },
  {
    id: 4,
    nameAr: 'فلات وايت باناما',
    nameEn: 'Panama Geisha Flat White',
    category: 'لاتيه مميز',
    descAr: 'جيشا بنما نادرة مع حليب اللوز المبخر — تجربة فريدة',
    price: '٣٥',
    badge: 'نادر',
    badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-400/20',
    size: 'small',
    gradient: 'from-[#1a1025] to-[#2c1840]',
    rating: 5.0,
    img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80',
    origin: '🇵🇦 بنما',
    process: 'وشي',
  },
  {
    id: 5,
    nameAr: 'ماتشا الرياض',
    nameEn: 'Riyadh Matcha Latte',
    category: 'موسمي',
    descAr: 'ماتشا سيريمونيال من اليابان مع حليب جوز الهند وعسل السدر',
    price: '٢٦',
    badge: 'جديد',
    badgeColor: 'bg-green-500/20 text-green-300 border border-green-400/20',
    size: 'small',
    gradient: 'from-[#0f2515] to-[#1a3d22]',
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80',
    origin: '🇯🇵 اليابان',
    process: 'سيريمونيال',
  },
  {
    id: 6,
    nameAr: 'قهوة جازان المعلق',
    nameEn: 'Jazan Pour-Over',
    category: 'Pour Over',
    descAr: 'بن محلي سعودي ١٠٠٪ من مزارع جبال جازان الخضراء',
    price: '٣٠',
    badge: '🇸🇦 محلي',
    badgeColor: 'bg-green-800/40 text-green-300 border border-green-600/30',
    size: 'small',
    gradient: 'from-[#1a2c10] to-[#2c4518]',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    origin: '🇸🇦 جازان',
    process: 'طبيعي',
  },
]

function MenuCard({ item, index, onOrder }) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked] = useState(false)

  const isLarge = item.size === 'large'
  const isMedium = item.size === 'medium'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative overflow-hidden rounded-2xl border border-white/8 bento-card card-glow cursor-pointer
        ${isLarge ? 'lg:col-span-2 lg:row-span-2' : isMedium ? 'lg:col-span-1 lg:row-span-2' : 'lg:col-span-1 lg:row-span-1'}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-52 lg:h-64' : 'h-40 lg:h-48'}`}>
        <img
          src={item.img}
          alt={item.nameAr}
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-800 via-transparent to-transparent" />

        {/* Badge */}
        <span className={`absolute top-3 end-3 text-xs font-tajawal font-bold px-3 py-1 rounded-full ${item.badgeColor}`}>
          {item.badge}
        </span>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
          className="absolute top-3 start-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
        >
          <span className={`text-sm transition-all ${liked ? 'scale-125' : 'scale-100'}`}>
            {liked ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Origin */}
        <div className="absolute bottom-3 start-3">
          <span className="font-tajawal text-cream-200/60 text-[10px] bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {item.origin} • {item.process}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-cairo font-bold text-cream-200 text-base leading-tight">{item.nameAr}</h3>
            <p className="font-tajawal text-cream-200/35 text-xs mt-0.5 tracking-wider uppercase">{item.nameEn}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
            <span className="font-cairo font-bold text-gold-400 text-sm">{item.rating}</span>
          </div>
        </div>

        <p className="font-tajawal text-cream-200/50 text-xs leading-relaxed mb-4 line-clamp-2">
          {item.descAr}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-cairo font-black text-gold-400 text-xl">{item.price}</span>
            <span className="font-tajawal text-cream-200/40 text-xs">ريال</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOrder(item)}
            className="flex items-center gap-1.5 bg-gold-400 text-espresso-800 px-4 py-2 rounded-full font-cairo font-bold text-xs btn-gold"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            اطلب
          </motion.button>
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-espresso-800/60 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function MenuSection({ onOrderOpen }) {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const sectionRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const filtered = activeCategory === 'الكل'
    ? menuItems
    : menuItems.filter((m) => m.category === activeCategory)

  return (
    <section id="menu" ref={sectionRef} className="relative py-24 bg-espresso-800 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gold-400/3 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-start mb-12">
          <span className="inline-block font-tajawal text-gold-400 text-sm tracking-[0.2em] uppercase mb-4">
            ◆ قائمة اليوم
          </span>
          <h2 className="font-cairo font-black text-cream-200 text-3xl sm:text-4xl lg:text-5xl mb-4">
            كل كوب يحكي
            <span className="text-gradient-gold"> قصة</span>
          </h2>
          <p className="font-tajawal text-cream-200/50 text-base max-w-xl">
            بن مختار بعناية من أفضل مزارع العالم ومزارع جازان المحلية — يُحمّص أسبوعياً في مشرطنا
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2 rounded-full font-tajawal font-medium text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-400 text-espresso-800 shadow-[0_0_20px_rgba(241,228,154,0.3)]'
                  : 'bg-white/5 border border-white/10 text-cream-200/60 hover:border-gold-400/30 hover:text-cream-200'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <MenuCard
                key={item.id}
                item={item}
                index={i}
                onOrder={() => onOrderOpen(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-10 border-t border-white/8"
        >
          <div>
            <p className="font-cairo font-bold text-cream-200 text-lg">تفضّل بزيارتنا</p>
            <p className="font-tajawal text-cream-200/45 text-sm mt-0.5">
              حي النرجس، الرياض • يومياً ٧ص – ١٢م
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOrderOpen()}
            className="btn-gold bg-transparent border border-gold-400/40 text-gold-400 px-8 py-3 rounded-full font-cairo font-bold text-sm hover:bg-gold-400/10 transition-colors duration-300"
          >
            عرض القائمة الكاملة
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

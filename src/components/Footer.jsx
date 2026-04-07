import { motion } from 'framer-motion'
import { MapPin, Phone, Instagram, Twitter, Youtube } from 'lucide-react'

const branches = [
  { name: 'النرجس', city: 'الرياض', hours: '٧ص – ١٢م', phone: '٠١١ ١٢٣ ٤٥٦٧' },
  { name: 'العليا', city: 'الرياض', hours: '٨ص – ١١م', phone: '٠١١ ٩٨٧ ٦٥٤٣' },
  { name: 'السليمانية', city: 'الرياض', hours: '٧ص – ١م', phone: '٠١١ ٤٥٦ ٧٨٩٠' },
]

const links = {
  'روابط سريعة': ['قائمة المشروبات', 'احجز طاولة', 'اطلب الآن', 'رحلة البن', 'عروضنا'],
  'عن قَطرَة': ['قصتنا', 'القيم والمبادئ', 'فريقنا', 'الاستدامة', 'انضم إلينا'],
  'للأعمال': ['نظام الإدارة', 'شراء امتياز', 'مورّدون', 'تواصل معنا', 'الدعم الفني'],
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-espresso-900 border-t border-white/8 overflow-hidden">
      {/* Newsletter bar */}
      <div className="bg-gold-400/8 border-b border-gold-400/12 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-cairo font-bold text-cream-200 text-base">اشترك في نشرتنا الأسبوعية</h3>
            <p className="font-tajawal text-cream-200/40 text-sm mt-0.5">طروحات حصرية، وصفات، وأحداث قادمة</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 sm:w-64 bg-white/6 border border-white/12 rounded-full px-5 py-2.5 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/30 focus:border-gold-400/40 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gold-400 text-espresso-800 px-6 py-2.5 rounded-full font-cairo font-bold text-sm btn-gold whitespace-nowrap"
            >
              اشترك
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center">
                <span className="text-espresso-800 font-cairo font-black text-xl">ق</span>
              </div>
              <div>
                <span className="font-cairo font-black text-gold-400 text-2xl block">قَطرَة</span>
                <span className="font-tajawal text-cream-200/30 text-[10px] tracking-widest uppercase">QATRAH COFFEE</span>
              </div>
            </div>

            <p className="font-tajawal text-cream-200/45 text-sm leading-relaxed mb-6 max-w-xs">
              نؤمن بأن كل قطرة قهوة هي قصة — من بذرة في جازان إلى فنجان في يديك.
              موجة القهوة الثالثة في قلب الرياض.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'إنستغرام', href: '#' },
                { Icon: Twitter, label: 'تويتر / X', href: '#' },
                { Icon: Youtube, label: 'يوتيوب', href: '#' },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(241,228,154,0.15)' }}
                  className="w-10 h-10 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-cream-200/60 hover:text-gold-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Vision 2030 */}
            <div className="mt-6 flex items-center gap-2 bg-green-900/20 border border-green-700/20 rounded-xl px-4 py-2.5">
              <span className="text-xl">🇸🇦</span>
              <span className="font-tajawal text-cream-200/40 text-xs">فخور بالمنتج السعودي | رؤية ٢٠٣٠</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-cairo font-bold text-cream-200 text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-tajawal text-cream-200/40 text-sm hover:text-gold-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Branches */}
        <div className="mt-14 pt-10 border-t border-white/8">
          <h4 className="font-cairo font-bold text-cream-200 text-sm mb-5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold-400" />
            فروعنا
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {branches.map(b => (
              <motion.div
                key={b.name}
                whileHover={{ borderColor: 'rgba(241,228,154,0.25)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                className="bg-white/3 border border-white/8 rounded-2xl p-4 transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  <p className="font-cairo font-bold text-cream-200 text-sm">فرع {b.name}</p>
                </div>
                <p className="font-tajawal text-cream-200/40 text-xs">{b.city}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-tajawal text-cream-200/35 text-xs">{b.hours}</span>
                  <span className="font-tajawal text-gold-400/60 text-xs">{b.phone}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-tajawal text-cream-200/25 text-xs">
            © ٢٠٢٦ قَطرَة للقهوة المتخصصة · جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-tajawal text-cream-200/25 text-xs hover:text-cream-200/50 transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="font-tajawal text-cream-200/25 text-xs hover:text-cream-200/50 transition-colors">
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

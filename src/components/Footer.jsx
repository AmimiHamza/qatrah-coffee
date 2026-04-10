import { motion } from 'framer-motion'
import { Mail, MapPin, Share2, Camera } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t, language } = useLanguage()
  const f = t.footer
  const isRTL = language === 'ar'

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  const linkGroups = [
    { title: f.quickLinks, items: f.links.quickLinks, hrefs: ['#features', '#process', '#dashboard', '#contact'] },
    { title: f.services, items: f.links.services, hrefs: Array(5).fill('#contact') },
    { title: f.company, items: f.links.company, hrefs: Array(4).fill('#') },
  ]

  return (
    <footer id="footer" className="bg-espresso-900 border-t border-white/8 overflow-hidden">
      {/* Newsletter */}
      <div className="bg-gold-400/8 border-b border-gold-400/12 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className={isRTL ? 'text-end' : 'text-start'}>
            <h3 className="font-cairo font-bold text-cream-200 text-base">{f.newsletter}</h3>
            <p className="font-tajawal text-cream-200/40 text-sm mt-0.5">{f.newsletterSub}</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder={f.emailPh}
              className="flex-1 sm:w-64 bg-white/6 border border-white/12 rounded-full px-5 py-2.5 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/30 focus:border-gold-400/40 focus:outline-none"
              dir="ltr"
            />
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="bg-gold-400 text-espresso-800 px-6 py-2.5 rounded-full font-cairo font-bold text-sm btn-gold whitespace-nowrap"
            >
              {f.subscribe}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className={`flex items-center gap-3 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center shrink-0">
                <span className="text-espresso-800 font-cairo font-black text-xl">A</span>
              </div>
              <div className={isRTL ? 'text-end' : 'text-start'}>
                <span className="font-cairo font-black text-gold-400 text-2xl block">AMIMI</span>
                <span className="font-tajawal text-cream-200/30 text-[10px] tracking-widest uppercase">عميمي · Digital</span>
              </div>
            </div>
            <p className={`font-tajawal text-cream-200/45 text-sm leading-relaxed mb-6 max-w-xs ${isRTL ? 'text-end' : 'text-start'}`}>
              {f.tagline}
            </p>
            <div className={`flex gap-3 ${isRTL ? 'justify-end' : ''}`}>
              {[
                { Icon: Camera, label: 'Instagram', href: '#' },
                { Icon: Share2, label: 'X / Twitter', href: '#' },
                { Icon: Mail, label: 'Email', href: 'mailto:hamza.amimi.p@gmail.com' },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label} href={href} aria-label={label}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(241,228,154,0.15)' }}
                  className="w-10 h-10 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-cream-200/60 hover:text-gold-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <div className={`mt-6 flex items-center gap-2 bg-espresso-700/50 border border-white/8 rounded-xl px-4 py-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-xl">☕</span>
              <span className="font-tajawal text-cream-200/40 text-xs">
                {language === 'ar' ? 'متخصصون في مواقع المقاهي · حول العالم' : language === 'fr' ? 'Spécialistes des sites cafés · Monde entier' : 'Coffee shop website specialists · Worldwide'}
              </span>
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map(group => (
            <div key={group.title} className={isRTL ? 'text-end' : 'text-start'}>
              <h4 className="font-cairo font-bold text-cream-200 text-sm mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.items.map((item, i) => (
                  <li key={item}>
                    <a
                      href={group.hrefs[i]}
                      onClick={e => { if (group.hrefs[i].startsWith('#')) { e.preventDefault(); scrollTo(group.hrefs[i]) } }}
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

        {/* Contact row */}
        <div className="mt-14 pt-10 border-t border-white/8">
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
            {[
              { icon: '📧', label: language === 'ar' ? 'البريد' : 'Email', value: 'hamza.amimi.p@gmail.com' },
              { icon: '💬', label: 'WhatsApp', value: '+212 643 626 334' },
              { icon: <MapPin className="w-5 h-5" />, label: language === 'ar' ? 'النطاق' : language === 'fr' ? 'Zone' : 'Coverage', value: language === 'ar' ? 'حول العالم' : language === 'fr' ? 'Monde entier' : 'Worldwide' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ borderColor: 'rgba(241,228,154,0.25)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                className={`bg-white/3 border border-white/8 rounded-2xl p-4 transition-colors duration-300 ${isRTL ? 'text-end' : 'text-start'}`}
              >
                <div className="text-2xl mb-2">{typeof item.icon === 'string' ? item.icon : item.icon}</div>
                <p className="font-tajawal text-cream-200/40 text-xs">{item.label}</p>
                <p className="font-cairo font-bold text-cream-200 text-sm mt-0.5">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className={`mt-10 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <p className="font-tajawal text-cream-200/25 text-xs">{f.copyright}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-tajawal text-cream-200/25 text-xs hover:text-cream-200/50 transition-colors">{f.privacy}</a>
            <a href="#" className="font-tajawal text-cream-200/25 text-xs hover:text-cream-200/50 transition-colors">{f.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

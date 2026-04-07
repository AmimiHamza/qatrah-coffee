import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navigation({ onOrderOpen }) {
  const { t, language, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.journey, href: '#journey' },
    { label: t.nav.reserve, href: '#reservation' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-espresso-800/95 backdrop-blur-xl border-b border-gold-400/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a href="#hero" className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
              <span className="text-espresso-800 font-cairo font-black text-lg leading-none">ق</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-cairo font-black text-gold-400 text-xl tracking-wide">قَطرَة</span>
              <span className="font-tajawal text-cream-200/50 text-[10px] tracking-widest uppercase">QATRAH COFFEE</span>
            </div>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <a
                  href={link.href}
                  className="font-tajawal text-cream-200/70 hover:text-gold-400 transition-colors duration-300 text-sm relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              className="hidden sm:flex items-center gap-1.5 border border-gold-400/25 text-cream-200/70 hover:text-gold-400 hover:border-gold-400/50 px-3 py-2 rounded-full font-tajawal text-xs transition-all duration-200"
              title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            >
              <span className="text-sm">{language === 'ar' ? '🇬🇧' : '🇸🇦'}</span>
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 bg-gold-400 text-espresso-800 px-5 py-2.5 rounded-full font-cairo font-bold text-sm btn-gold"
              onClick={onOrderOpen}
            >
              <ShoppingBag className="w-4 h-4" />
              {t.nav.order}
            </motion.button>

            <button
              className="md:hidden text-cream-200 p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60] drawer-overlay"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-72 bg-espresso-800 z-[70] flex flex-col p-8 border-s border-gold-400/10"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-cairo font-black text-gold-400 text-2xl">قَطرَة</span>
                <button onClick={() => setMobileOpen(false)} className="text-cream-200/60 hover:text-cream-200 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile language toggle */}
              <button
                onClick={toggle}
                className="flex items-center gap-2 border border-gold-400/20 text-cream-200/60 px-4 py-2 rounded-full font-tajawal text-sm mb-6 w-fit"
              >
                <span>{language === 'ar' ? '🇬🇧' : '🇸🇦'}</span>
                <span>{language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}</span>
              </button>

              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setMobileOpen(false)}
                    className="font-tajawal text-cream-200/80 hover:text-gold-400 py-3 px-4 rounded-xl hover:bg-white/5 transition-all text-lg"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <button
                className="mt-6 bg-gold-400 text-espresso-800 py-3.5 rounded-full font-cairo font-bold text-base flex items-center justify-center gap-2 btn-gold"
                onClick={() => { setMobileOpen(false); onOrderOpen() }}
              >
                <ShoppingBag className="w-5 h-5" />
                {t.nav.order}
              </button>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="font-tajawal text-cream-200/30 text-xs">
                  {language === 'ar' ? 'الرياض، حي النرجس' : 'Al Narjis, Riyadh'}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

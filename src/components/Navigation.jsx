import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navigation() {
  const { t, language, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: t.nav.features, href: '#features' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.dashboard, href: '#dashboard' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-espresso-800/95 backdrop-blur-xl border-b border-gold-400/10 py-3'
            : 'bg-espresso-800/95 backdrop-blur-xl border-b border-gold-400/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
              <span className="text-espresso-800 font-cairo font-black text-lg leading-none">A</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-cairo font-black text-gold-400 text-xl tracking-wide">AMIMI</span>
              <span className="font-tajawal text-cream-200/50 text-[10px] tracking-widest uppercase">عميمي · Digital</span>
            </div>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="font-tajawal text-cream-200/70 hover:text-gold-400 transition-colors duration-300 text-sm relative group bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              className="hidden sm:flex items-center gap-1.5 border border-gold-400/30 text-gold-400 hover:border-gold-400/60 px-3 py-2 rounded-full font-tajawal text-xs transition-all duration-200"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('#contact')}
              className="hidden md:flex items-center gap-2 bg-gold-400 text-espresso-800 px-5 py-2.5 rounded-full font-cairo font-bold text-sm btn-gold"
            >
              {t.nav.cta}
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
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: language === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: language === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed top-0 ${language === 'ar' ? 'left-0' : 'right-0'} h-screen w-72 bg-espresso-800 z-[70] flex flex-col p-8 border-e border-gold-400/10`}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-cairo font-black text-gold-400 text-2xl">AMIMI</span>
                  <span className="font-tajawal text-cream-200/40 text-[10px] tracking-widest uppercase block">عميمي · Digital</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-cream-200/60 hover:text-cream-200 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <button
                onClick={toggle}
                className="flex items-center gap-2 border border-gold-400/20 text-gold-400 px-4 py-2 rounded-full font-tajawal text-sm mb-6 w-fit"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}</span>
              </button>

              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="font-tajawal text-cream-200/80 hover:text-gold-400 py-3 px-4 rounded-xl hover:bg-white/5 transition-all text-lg text-start bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <button
                onClick={() => scrollTo('#contact')}
                className="mt-6 bg-gold-400 text-espresso-800 py-3.5 rounded-full font-cairo font-bold text-base flex items-center justify-center gap-2 btn-gold"
              >
                {t.nav.cta}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

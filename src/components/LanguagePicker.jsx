import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const options = [
  { locale: 'en', label: 'English',  native: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { locale: 'fr', label: 'Français', native: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { locale: 'ar', label: 'Arabic',   native: 'العربية',  flag: '🇸🇦', dir: 'rtl' },
]

export default function LanguagePicker() {
  const { pickerOpen, pickLanguage } = useLanguage()

  // Lock body scroll while open
  useEffect(() => {
    if (pickerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [pickerOpen])

  return (
    <AnimatePresence>
      {pickerOpen && (
        <motion.div
          key="picker-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          className="flex items-center justify-center p-6"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(10, 7, 4, 0.93)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(212,175,55,0.09) 0%, transparent 70%)' }}
          />

          {/* Card */}
          <motion.div
            key="picker-card"
            initial={{ opacity: 0, scale: 0.9, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 28 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.04 }}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(26, 17, 10, 0.97)',
              border: '1px solid rgba(212,175,55,0.18)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.06)',
            }}
          >
            {/* Top gold accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

            <div className="px-8 pt-8 pb-7">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.12, type: 'spring', stiffness: 320, damping: 24 }}
                className="w-14 h-14 rounded-full bg-gold-400 flex items-center justify-center mx-auto mb-5"
                style={{ boxShadow: '0 0 36px rgba(212,175,55,0.3)' }}
              >
                <span className="font-cairo font-black text-espresso-800 text-2xl leading-none">A</span>
              </motion.div>

              {/* Welcome text */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="font-tajawal text-gold-400/80 text-xs tracking-[0.18em] uppercase text-center mb-2"
              >
                مرحباً · Welcome · Bienvenue
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="font-cairo font-black text-cream-200 text-xl text-center mb-1"
              >
                Choose Your Language
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.27 }}
                className="font-tajawal text-cream-200/35 text-xs text-center mb-7"
              >
                اختر لغتك · Choisissez votre langue
              </motion.p>

              {/* Language options */}
              <div className="flex flex-col gap-3">
                {options.map((opt, i) => (
                  <motion.button
                    key={opt.locale}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28 + i * 0.08 }}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(212,175,55,0.5)', backgroundColor: 'rgba(212,175,55,0.07)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => pickLanguage(opt.locale)}
                    dir={opt.dir}
                    className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-colors duration-200 text-left"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    <span className="text-2xl leading-none flex-shrink-0">{opt.flag}</span>
                    <span className="flex-1">
                      <span className="block font-cairo font-bold text-cream-200 text-sm">{opt.native}</span>
                      <span className="block font-tajawal text-cream-200/40 text-xs mt-0.5">{opt.label}</span>
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(212,175,55,0.6)" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="flex-shrink-0"
                      style={{ transform: opt.dir === 'rtl' ? 'scaleX(-1)' : 'none' }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.button>
                ))}
              </div>

              {/* Footer note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="font-tajawal text-cream-200/20 text-[10px] text-center mt-6"
              >
                Your choice is saved — you won't be asked again.
              </motion.p>
            </div>

            {/* Bottom gold accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

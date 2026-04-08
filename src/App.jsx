import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ProcessSection from './components/ProcessSection'
import DashboardPreview from './components/DashboardPreview'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

/* ── Loader ── */
function Loader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-espresso-800 flex flex-col items-center justify-center gap-6"
    >
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-20 h-20 rounded-full bg-gold-400 flex items-center justify-center shadow-[0_0_60px_rgba(241,228,154,0.4)]"
      >
        <span className="font-cairo font-black text-espresso-800 text-3xl leading-none">A</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center"
      >
        <p className="font-cairo font-black text-gold-400 text-3xl">AMIMI</p>
        <p className="font-tajawal text-cream-200/40 text-xs tracking-[0.3em] mt-1 uppercase">عميمي · Digital</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-40 h-px bg-white/10 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.7, duration: 1.3, ease: 'easeInOut' }}
          className="h-full bg-gold-400 rounded-full"
        />
      </motion.div>
    </motion.div>
  )
}

/* ── Inner app ── */
function AppInner() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)

  return (
    <div className="grain" dir={t.dir} lang={t.lang}>
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navigation />
          <main>
            <HeroSection />
            <FeaturesSection />
            <ProcessSection />
            <DashboardPreview />
            <ContactSection />
          </main>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}

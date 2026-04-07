import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import MenuSection from './components/MenuSection'
import OrderDrawer from './components/OrderDrawer'
import ReservationSection from './components/ReservationSection'
import JourneySection from './components/JourneySection'
import DashboardPreview from './components/DashboardPreview'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

/* ── Loader ── */
function Loader({ onDone }) {
  const { t } = useLanguage()
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
        <span className="font-cairo font-black text-espresso-800 text-4xl leading-none">ق</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center"
      >
        <p className="font-cairo font-black text-gold-400 text-3xl">قَطرَة</p>
        <p className="font-tajawal text-cream-200/40 text-xs tracking-[0.3em] mt-1 uppercase">QATRAH COFFEE</p>
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

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="font-tajawal text-cream-200/25 text-xs"
      >
        {t.loader}
      </motion.p>
    </motion.div>
  )
}

/* ── Floating order button ── */
function FloatingOrderBtn({ onClick }) {
  const { t } = useLanguage()
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="fixed bottom-6 start-6 z-40 flex items-center gap-2 bg-gold-400 text-espresso-800 px-5 py-3.5 rounded-full font-cairo font-black text-sm shadow-[0_8px_32px_rgba(241,228,154,0.4)] btn-gold"
    >
      {t.floatOrderBtn}
    </motion.button>
  )
}

/* ── Inner app (needs language context) ── */
function AppInner() {
  const { t, language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const openOrder = (item = null) => {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  return (
    <div
      className="grain"
      dir={t.dir}
      lang={language}
    >
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navigation onOrderOpen={() => openOrder()} />

          <main>
            <HeroSection onOrderOpen={() => openOrder()} />
            <MenuSection onOrderOpen={openOrder} />
            <JourneySection />
            <ReservationSection />
            <ContactSection />
            <DashboardPreview />
          </main>

          <Footer />

          <FloatingOrderBtn onClick={() => openOrder()} />

          <OrderDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            preSelectedItem={selectedItem}
          />
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

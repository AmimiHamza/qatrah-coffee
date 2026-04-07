import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ContactSection() {
  const { t, language } = useLanguage()
  const c = t.contact

  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang: language }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-espresso-800 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gold-400/4 blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] rounded-full bg-espresso-600/30 blur-[100px]" />
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
            ◆ {c.tag}
          </span>
          <h2 className="font-cairo font-black text-cream-200 text-3xl sm:text-4xl lg:text-5xl mb-4">
            {c.title}
            <span className="text-gradient-gold"> {c.titleHighlight}</span>
          </h2>
          <p className="font-tajawal text-cream-200/50 text-base max-w-xl leading-relaxed">
            {c.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center py-16 bg-white/3 border border-white/8 rounded-3xl h-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500 flex items-center justify-center mb-5"
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="font-cairo font-black text-cream-200 text-2xl mb-3">{c.successTitle}</h3>
                  <p className="font-tajawal text-cream-200/50 text-base">{c.successSub}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 font-tajawal text-gold-400 text-sm hover:underline"
                  >
                    {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/3 border border-white/8 rounded-3xl p-6 lg:p-8 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="font-tajawal text-cream-200/50 text-xs mb-1.5 block">{c.namePh}</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={c.namePh}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/25 focus:border-gold-400/50 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-tajawal text-cream-200/50 text-xs mb-1.5 block">{c.emailPh}</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={c.emailPh}
                        required
                        dir="ltr"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/25 focus:border-gold-400/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="font-tajawal text-cream-200/50 text-xs mb-1.5 block">{c.servicePh}</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-tajawal text-cream-200 text-sm focus:border-gold-400/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-espresso-800">{c.servicePh}</option>
                      {c.services.map(s => (
                        <option key={s.value} value={s.value} className="bg-espresso-800">{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-tajawal text-cream-200/50 text-xs mb-1.5 block">{c.messagePh}</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={c.messagePh}
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-tajawal text-cream-200 text-sm placeholder:text-cream-200/25 focus:border-gold-400/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="font-tajawal text-red-400 text-sm">
                      {language === 'ar' ? 'حدث خطأ، حاول مجدداً.' : 'Something went wrong, please try again.'}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gold-400 text-espresso-800 py-4 rounded-full font-cairo font-black text-base btn-gold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(241,228,154,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-espresso-800/30 border-t-espresso-800 rounded-full animate-spin" />
                        {c.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {c.send}
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Info side ── */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col justify-center space-y-5"
          >
            {/* Info cards */}
            {c.info.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="flex items-center gap-4 bg-white/3 border border-white/8 rounded-2xl p-4 hover:border-gold-400/20 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-2xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-tajawal text-cream-200/40 text-xs">{item.label}</p>
                  <p className="font-cairo font-bold text-cream-200 text-sm mt-0.5">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Decorative quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-gold-400/8 to-transparent border border-gold-400/15 rounded-2xl p-6 mt-2"
            >
              <p className="font-cairo font-bold text-cream-200 text-base leading-relaxed mb-3">
                {language === 'ar'
                  ? '"نبني تجارب رقمية تحكي قصص حقيقية"'
                  : '"We build digital experiences that tell real stories"'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-400 flex items-center justify-center">
                  <span className="font-cairo font-black text-espresso-800 text-sm">ح</span>
                </div>
                <div>
                  <p className="font-cairo font-bold text-cream-200 text-xs">Hamza Amimi</p>
                  <p className="font-tajawal text-cream-200/35 text-[10px]">
                    {language === 'ar' ? 'مطور ومصمم مواقع' : 'Full-Stack Developer & Designer'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

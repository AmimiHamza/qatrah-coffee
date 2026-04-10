import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'amimi-locale'

const LanguageContext = createContext()

export const translations = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    nav: {
      features: 'ما ستحصل عليه',
      process: 'كيف نعمل',
      dashboard: 'لوحة التحكم',
      contact: 'تواصل',
      cta: 'ابدأ الآن',
    },
    hero: {
      badge: 'عميمي ديجيتال · مواقع المقاهي',
      headline1: 'مقهاك يستحق',
      headline3: 'يليق بقهوتك الاستثنائية',
      words: ['موقعاً بجمال', 'هوية رقمية', 'تجربة فريدة', 'منصة ناجحة'],
      sub: '٠ ريال رسوم تأسيس. نبني موقع مقهاك الاستثنائي — لوحة تحكم ذكية، طلب أونلاين، حجوزات — مقابل اشتراك شهري بسيط.',
      cta1: 'ابدأ بـ ٠ ريال اليوم',
      cta2: 'شاهد لوحة التحكم',
      badges: ['١٠٠٪ مخصص', 'ثنائي اللغة EN/AR', 'متوافق مع الجوال', 'تسليم خلال أسبوع'],
      stats: [
        { num: '+٤٠', label: 'مقهى تخدمه' },
        { num: '٣', label: 'قارات' },
        { num: '٩٨٪', label: 'رضا العملاء' },
      ],
      discover: 'اكتشف',
      floatLabel: 'موقع مقهاك جاهز',
      floatSub: 'خلال ٧ أيام فقط ☕',
    },
    features: {
      tag: 'صمم حزمتك',
      title: 'اختر ما يناسب',
      titleHighlight: 'مقهاك',
      sub: 'حدد الميزات التي تريدها — سنبني موقع مقهاك بالضبط. المضللة بالذهبي مشمولة دائماً.',
      included: 'مشمول',
      all: 'الكل',
      your_package: 'حزمتك المختارة',
      features_selected: 'ميزة محددة',
      preview: 'معاينة حزمتك',
      send_wa: 'أرسل عبر واتساب',
      contact_us: 'أو اتصل بنا',
    },
    process: {
      tag: 'كيف نعمل',
      title: 'من الفكرة إلى',
      titleHighlight: 'الإطلاق',
      sub: 'عملية مجربة وواضحة — ٤ مراحل لتحويل رؤيتك إلى موقع مقهى استثنائي يحوّل الزوار إلى عملاء.',
      badge: 'فخورون بشراكة مع مقاهي الموجة الثالثة',
      badgeSub: 'نخدم عملاء حول العالم',
      quote: 'كل كوب قهوة يحكي قصة — ونحن هنا لنجعل قصة مقهاك تُسمع رقمياً',
      quoteBy: '— حمزة عميمي، مطور ومصمم مواقع',
      steps: [
        {
          step: '٠١',
          icon: '🔍',
          location: 'الاكتشاف والتخطيط',
          title: 'نفهم مقهاك أولاً',
          desc: 'في أول لقاء معك، نستمع لقصة مقهاك — هويتك البصرية، جمهورك المستهدف، ومنافسيك. نخرج من هذه الجلسة بخارطة طريق واضحة لموقعك.',
          stat: { num: '٣٠ د', label: 'جلسة اكتشاف مجانية' },
          img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
        },
        {
          step: '٠٢',
          icon: '🎨',
          location: 'التصميم والهوية',
          title: 'نصمم تجربة لا تُنسى',
          desc: 'نبني تصميماً مخصصاً بالكامل لمقهاك — من اختيار الخطوط والألوان حتى تجربة المستخدم. لا قوالب جاهزة، فقط تصميم فريد يعكس روح مقهاك.',
          stat: { num: '٣', label: 'نماذج للاختيار' },
          img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
        },
        {
          step: '٠٣',
          icon: '⚡',
          location: 'التطوير والبرمجة',
          title: 'نبني بأحدث التقنيات',
          desc: 'موقعك يُبنى بـ Next.js وTailwind CSS — أسرع الأطر الحديثة. ثنائي اللغة (AR/EN) بالكامل، محسّن لجوجل، وسريع على كل الأجهزة.',
          stat: { num: '١٠٠', label: 'نقاط PageSpeed' },
          img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
        },
        {
          step: '٠٤',
          icon: '🚀',
          location: 'الإطلاق والدعم',
          title: 'نطلق ونبقى معك',
          desc: 'بعد التسليم، نطلق موقعك على Vercel مع SSL مجاني. تحصل على دعم تقني لمدة شهر كامل لضمان عمل كل شيء بشكل مثالي.',
          stat: { num: '٧ أيام', label: 'من الاتفاق للإطلاق' },
          img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        },
      ],
    },
    dashboard: {
      tag: 'لمالك المقهى · نظام إدارة ذكي',
      title: 'أدِر مقهاك بذكاء',
      titleHighlight: 'من كل مكان',
      sub: 'لوحة تحكم متكاملة مصممة خصيصاً لمقاهي الموجة الثالثة — تتبع مبيعاتك، طلباتك، وعملاءك في الوقت الفعلي.',
      interested: 'مهتم بلوحة تحكم لمقهاك؟',
      interestedSub: 'احصل على عرض توضيحي مجاني لمدة ٣٠ دقيقة — بدون أي التزام',
      demoBtn: 'طلب عرض توضيحي',
      brochureBtn: 'تواصل معنا الآن',
      supports: 'يدعم:',
    },
    contact: {
      tag: 'تواصل معنا',
      title: 'لديك مقهى؟',
      titleHighlight: 'نحن نستمع',
      sub: 'سواء كنت تريد موقعاً بسيطاً أو منصة متكاملة — تواصل معنا وسنرد خلال ٢٤ ساعة.',
      namePh: 'اسمك الكريم',
      emailPh: 'بريدك الإلكتروني',
      servicePh: 'نوع الخدمة',
      messagePh: 'أخبرنا عن مقهاك...',
      send: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال...',
      successTitle: 'تم الإرسال بنجاح! 🎉',
      successSub: 'شكراً لتواصلك، سنرد عليك قريباً.',
      services: [
        { value: 'website', label: 'موقع مقهى كامل' },
        { value: 'menu', label: 'قائمة رقمية تفاعلية' },
        { value: 'dashboard', label: 'لوحة تحكم إدارية' },
        { value: 'branding', label: 'هوية بصرية' },
        { value: 'other', label: 'أخرى' },
      ],
      info: [
        { icon: '📧', label: 'البريد الإلكتروني', value: 'hamza.amimi.p@gmail.com' },
        { icon: '⚡', label: 'وقت الرد', value: 'خلال ٢٤ ساعة' },
        { icon: '🌍', label: 'نخدم', value: 'حول العالم' },
      ],
    },
    footer: {
      newsletter: 'ابقَ على اطلاع بآخر أعمالنا',
      newsletterSub: 'نصائح وأعمال حصرية لمقاهي حول العالم',
      subscribe: 'اشترك',
      emailPh: 'بريدك الإلكتروني',
      copyright: '© ٢٠٢٥ عميمي ديجيتال · جميع الحقوق محفوظة',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      tagline: 'مواقع مقاهي استثنائية حول العالم · مُدارة من قِبل خبراء · اشتراك شهري',
      quickLinks: 'روابط سريعة',
      services: 'خدماتنا',
      company: 'الشركة',
      links: {
        quickLinks: ['ما ستحصل عليه', 'كيف نعمل', 'لوحة التحكم', 'تواصل معنا'],
        services: ['موقع مقهى كامل', 'قائمة رقمية', 'لوحة تحكم', 'هوية بصرية'],
        company: ['قصتنا', 'أعمالنا', 'سياسة الخصوصية', 'الشروط والأحكام'],
      },
    },
    loader: 'نُحضّر تجربتك...',
  },

  en: {
    dir: 'ltr',
    lang: 'en',
    nav: {
      features: 'What You Get',
      process: 'How We Work',
      dashboard: 'Dashboard',
      contact: 'Contact',
      cta: 'Start Now',
    },
    hero: {
      badge: 'Amimi Digital · Coffee Shop Websites',
      headline1: 'Your Coffee Shop',
      headline3: 'as Beautiful as Your Coffee',
      words: ['Deserves a Site', 'Needs a Platform', 'Requires a Brand', 'Craves a Presence'],
      sub: '$0 upfront. We build your exceptional café website — smart dashboard, online ordering, reservations — for a simple monthly subscription.',
      cta1: 'Start for $0 Today',
      cta2: 'See the Dashboard',
      badges: ['100% Custom', 'Bilingual EN/AR', 'Mobile-First', 'Delivered in 7 Days'],
      stats: [
        { num: '+40', label: 'Cafés Served' },
        { num: '3', label: 'Continents' },
        { num: '98%', label: 'Satisfaction Rate' },
      ],
      discover: 'Scroll',
      floatLabel: 'Your café site is ready',
      floatSub: 'In just 7 days ☕',
    },
    features: {
      tag: 'Build Your Package',
      title: 'Choose What Your',
      titleHighlight: 'Café Needs',
      sub: "Select the features you want — we'll build your café site to fit exactly. Gold items are always included.",
      included: 'Included',
      all: 'All',
      your_package: 'Your Package',
      features_selected: 'features selected',
      preview: 'Preview My Package',
      send_wa: 'Send via WhatsApp',
      contact_us: 'Or Contact Us',
    },
    process: {
      tag: 'How We Work',
      title: 'From Idea to',
      titleHighlight: 'Launch',
      sub: 'A proven, transparent process — 4 stages to turn your vision into a café website that converts visitors into loyal customers.',
      badge: 'Proud partners with third-wave cafés',
      badgeSub: 'Serving clients worldwide',
      quote: "Every cup of coffee tells a story — we're here to make your café's story heard digitally",
      quoteBy: '— Hamza Amimi, Developer & Designer',
      steps: [
        {
          step: '01',
          icon: '🔍',
          location: 'Discovery & Planning',
          title: 'We Understand Your Café First',
          desc: "In our first session, we listen to your café's story — your brand identity, target audience, and competitors. We leave with a clear roadmap for your site.",
          stat: { num: '30 min', label: 'Free discovery session' },
          img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
        },
        {
          step: '02',
          icon: '🎨',
          location: 'Design & Identity',
          title: 'We Design an Unforgettable Experience',
          desc: 'We build a fully custom design for your café — from typography and color palettes to user experience flow. No templates, just a unique design that reflects your soul.',
          stat: { num: '3', label: 'Design concepts to choose from' },
          img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
        },
        {
          step: '03',
          icon: '⚡',
          location: 'Development & Engineering',
          title: 'We Build with Modern Tech',
          desc: 'Your site is built with Next.js and Tailwind CSS — the fastest modern frameworks. Fully bilingual (AR/EN), Google-optimized, and fast on every device.',
          stat: { num: '100', label: 'PageSpeed score' },
          img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
        },
        {
          step: '04',
          icon: '🚀',
          location: 'Launch & Support',
          title: 'We Launch and Stay with You',
          desc: 'After handoff, we deploy on Vercel with free SSL. You get one full month of technical support to ensure everything runs perfectly from day one.',
          stat: { num: '7 days', label: 'From agreement to launch' },
          img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        },
      ],
    },
    dashboard: {
      tag: 'Café Owner · Smart Management System',
      title: 'Manage Your Café Smartly',
      titleHighlight: 'From Anywhere',
      sub: 'An all-in-one dashboard designed for third-wave cafés — track your sales, orders, and customers in real time.',
      interested: 'Interested in a dashboard for your café?',
      interestedSub: 'Get a free 30-minute demo with our team — no commitment required',
      demoBtn: 'Request a Demo',
      brochureBtn: 'Get in Touch',
      supports: 'Supports:',
    },
    contact: {
      tag: 'Get In Touch',
      title: 'Have a Café?',
      titleHighlight: "We're Listening",
      sub: "Whether you need a simple landing page or a full platform — reach out and we'll respond within 24 hours.",
      namePh: 'Your Full Name',
      emailPh: 'Your Email Address',
      servicePh: 'Service Type',
      messagePh: 'Tell us about your café...',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent! 🎉',
      successSub: "Thank you for reaching out. We'll get back to you soon.",
      services: [
        { value: 'website', label: 'Full Café Website' },
        { value: 'menu', label: 'Interactive Digital Menu' },
        { value: 'dashboard', label: 'Admin Dashboard' },
        { value: 'branding', label: 'Visual Branding' },
        { value: 'other', label: 'Other' },
      ],
      info: [
        { icon: '📧', label: 'Email', value: 'hamza.amimi.p@gmail.com' },
        { icon: '⚡', label: 'Response Time', value: 'Within 24 hours' },
        { icon: '🌍', label: 'Serving', value: 'Worldwide' },
      ],
    },
    footer: {
      newsletter: 'Stay updated with our latest work',
      newsletterSub: 'Exclusive tips and projects for cafés worldwide',
      subscribe: 'Subscribe',
      emailPh: 'Your email address',
      copyright: '© 2025 Amimi Digital · All rights reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      tagline: 'Exceptional café websites worldwide · Managed by Experts · Monthly Subscription',
      quickLinks: 'Quick Links',
      services: 'Services',
      company: 'Company',
      links: {
        quickLinks: ['What You Get', 'How We Work', 'Dashboard', 'Contact Us'],
        services: ['Full Café Website', 'Digital Menu', 'Admin Dashboard', 'Visual Branding'],
        company: ['Our Story', 'Our Work', 'Privacy Policy', 'Terms of Service'],
      },
    },
    loader: 'Preparing your experience...',
  },

  fr: {
    dir: 'ltr',
    lang: 'fr',
    nav: {
      features: 'Ce que vous obtenez',
      process: 'Notre méthode',
      dashboard: 'Tableau de bord',
      contact: 'Contact',
      cta: 'Commencer',
    },
    hero: {
      badge: 'Amimi Digital · Sites pour cafés',
      headline1: 'Votre café mérite',
      headline3: 'aussi beau que votre café',
      words: ['un site web', 'une identité digitale', 'une expérience unique', 'une plateforme solide'],
      sub: "0 £ de création. Nous construisons votre site café exceptionnel — tableau de bord, commande en ligne, réservations — pour un abonnement mensuel simple.",
      cta1: 'Commencer à 0 £',
      cta2: 'Voir le tableau de bord',
      badges: ['100% Sur mesure', 'Bilingue FR/AR', 'Mobile d\'abord', 'Livré en 7 jours'],
      stats: [
        { num: '+40', label: 'Cafés servis' },
        { num: '3', label: 'Pays du Golfe' },
        { num: '98 %', label: 'Satisfaction client' },
      ],
      discover: 'Découvrir',
      floatLabel: 'Votre site café est prêt',
      floatSub: 'En seulement 7 jours ☕',
    },
    features: {
      tag: 'Composez votre offre',
      title: 'Choisissez ce dont',
      titleHighlight: 'votre café a besoin',
      sub: 'Sélectionnez les fonctionnalités souhaitées — nous construisons votre site exactement comme vous le voulez. Les éléments dorés sont toujours inclus.',
      included: 'Inclus',
      all: 'Tout',
      your_package: 'Votre offre',
      features_selected: 'fonctionnalités sélectionnées',
      preview: 'Aperçu de mon offre',
      send_wa: 'Envoyer via WhatsApp',
      contact_us: 'Ou nous contacter',
    },
    process: {
      tag: 'Notre méthode',
      title: "De l'idée au",
      titleHighlight: 'lancement',
      sub: 'Un processus éprouvé et transparent — 4 étapes pour transformer votre vision en un site café qui convertit les visiteurs en clients fidèles.',
      badge: 'Partenaires fiers des cafés de troisième vague',
      badgeSub: 'Spécialistes du marché saoudien et du Golfe',
      quote: 'Chaque tasse de café raconte une histoire — nous sommes là pour que celle de votre café soit entendue digitalement',
      quoteBy: '— Hamza Amimi, Développeur & Designer',
      steps: [
        {
          step: '01',
          icon: '🔍',
          location: 'Découverte & Planification',
          title: 'Nous comprenons votre café en premier',
          desc: "Lors de notre première session, nous écoutons l'histoire de votre café — votre identité de marque, votre audience cible et vos concurrents. Nous en ressortons avec une feuille de route claire pour votre site.",
          stat: { num: '30 min', label: 'Session découverte gratuite' },
          img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
        },
        {
          step: '02',
          icon: '🎨',
          location: 'Design & Identité',
          title: 'Nous concevons une expérience inoubliable',
          desc: 'Nous créons un design entièrement sur mesure pour votre café — de la typographie aux palettes de couleurs en passant par le parcours utilisateur. Pas de templates, juste un design unique qui reflète votre âme.',
          stat: { num: '3', label: 'Concepts design au choix' },
          img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
        },
        {
          step: '03',
          icon: '⚡',
          location: 'Développement & Ingénierie',
          title: 'Nous développons avec les dernières technologies',
          desc: 'Votre site est construit avec Next.js et Tailwind CSS — les frameworks modernes les plus rapides. Entièrement bilingue (AR/FR), optimisé Google, et rapide sur tous les appareils.',
          stat: { num: '100', label: 'Score PageSpeed' },
          img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
        },
        {
          step: '04',
          icon: '🚀',
          location: 'Lancement & Support',
          title: 'Nous lançons et restons à vos côtés',
          desc: 'Après la livraison, nous déployons sur Vercel avec SSL gratuit. Vous bénéficiez d\'un mois complet de support technique pour garantir un fonctionnement parfait dès le premier jour.',
          stat: { num: '7 jours', label: "De l'accord au lancement" },
          img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        },
      ],
    },
    dashboard: {
      tag: 'Gérant de café · Système de gestion intelligent',
      title: 'Gérez votre café intelligemment',
      titleHighlight: 'de partout',
      sub: 'Un tableau de bord tout-en-un conçu pour les cafés de troisième vague — suivez vos ventes, commandes et clients en temps réel.',
      interested: 'Intéressé par un tableau de bord pour votre café ?',
      interestedSub: 'Obtenez une démo gratuite de 30 minutes — sans engagement',
      demoBtn: 'Demander une démo',
      brochureBtn: 'Nous contacter maintenant',
      supports: 'Compatible avec :',
    },
    contact: {
      tag: 'Contactez-nous',
      title: 'Vous avez un café ?',
      titleHighlight: 'Nous vous écoutons',
      sub: "Que vous ayez besoin d'une simple page d'accueil ou d'une plateforme complète — contactez-nous et nous répondrons sous 24 heures.",
      namePh: 'Votre nom complet',
      emailPh: 'Votre adresse e-mail',
      servicePh: 'Type de service',
      messagePh: 'Parlez-nous de votre café...',
      send: 'Envoyer le message',
      sending: 'Envoi en cours...',
      successTitle: 'Message envoyé ! 🎉',
      successSub: 'Merci de nous avoir contactés. Nous vous répondrons bientôt.',
      services: [
        { value: 'website', label: 'Site café complet' },
        { value: 'menu', label: 'Menu digital interactif' },
        { value: 'dashboard', label: 'Tableau de bord admin' },
        { value: 'branding', label: 'Identité visuelle' },
        { value: 'other', label: 'Autre' },
      ],
      info: [
        { icon: '📧', label: 'E-mail', value: 'hamza.amimi.p@gmail.com' },
        { icon: '⚡', label: 'Délai de réponse', value: 'Sous 24 heures' },
        { icon: '🌍', label: 'Zones servies', value: 'Monde entier' },
      ],
    },
    footer: {
      newsletter: 'Restez informé de nos derniers projets',
      newsletterSub: 'Conseils et projets exclusifs pour les cafés du Golfe',
      subscribe: "S'abonner",
      emailPh: 'Votre adresse e-mail',
      copyright: '© 2025 Amimi Digital · Tous droits réservés',
      privacy: 'Politique de confidentialité',
      terms: "Conditions d'utilisation",
      tagline: 'Sites cafés exceptionnels dans le monde · Gérés par des Experts · Abonnement Mensuel',
      quickLinks: 'Liens rapides',
      services: 'Services',
      company: 'Entreprise',
      links: {
        quickLinks: ['Ce que vous obtenez', 'Notre méthode', 'Tableau de bord', 'Nous contacter'],
        services: ['Site café complet', 'Menu digital', 'Tableau de bord', 'Identité visuelle'],
        company: ['Notre histoire', 'Nos réalisations', 'Politique de confidentialité', "Conditions d'utilisation"],
      },
    },
    loader: 'Préparation de votre expérience...',
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('ar')
  const [pickerOpen, setPickerOpen] = useState(false)

  // On mount: check localStorage — show picker only on first visit
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && ['en', 'ar', 'fr'].includes(saved)) {
      applyLanguage(saved)
    } else {
      setPickerOpen(true)
    }
  }, [])

  const applyLanguage = (lang) => {
    setLanguageState(lang)
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }

  const setLanguage = (lang) => {
    applyLanguage(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  const pickLanguage = (lang) => {
    setLanguage(lang)
    setPickerOpen(false)
  }

  const toggle = () => {
    const next = language === 'ar' ? 'en' : language === 'en' ? 'ar' : 'en'
    setLanguage(next)
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, t, toggle, setLanguage, pickerOpen, pickLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

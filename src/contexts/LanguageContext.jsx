import React, { createContext, useContext, useState, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' }
];

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.auctions': 'Auctions',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.help': 'Help',
    
    // Landing Page
    'landing.hero.title': 'Premium Car Auctions',
    'landing.hero.subtitle': 'Discover exceptional vehicles at exclusive online auctions',
    'landing.hero.cta': 'Explore Auctions',
    'landing.features.title': 'Why Choose Our Platform',
    'landing.features.trust': 'Trusted Platform',
    'landing.features.trust.desc': 'Secure transactions with verified sellers',
    'landing.features.quality': 'Quality Vehicles',
    'landing.features.quality.desc': 'Curated selection of premium cars',
    'landing.features.support': '24/7 Support',
    'landing.features.support.desc': 'Expert assistance throughout your journey',
    'landing.stats.cars': 'Cars Sold',
    'landing.stats.success': 'Success Rate',
    'landing.stats.customers': 'Happy Customers',
    'landing.stats.experience': 'Years Experience',
    
    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to your account',
    'auth.register.title': 'Create Account',
    'auth.register.subtitle': 'Join our auction community',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.role': 'Account Type',
    'auth.role.buyer': 'Buyer',
    'auth.role.seller': 'Seller',
    'auth.login.button': 'Sign In',
    'auth.register.button': 'Create Account',
    'auth.switch.register': 'Don\'t have an account? Register',
    'auth.switch.login': 'Already have an account? Sign In',
    'auth.forgot.password': 'Forgot Password?',
    'auth.remember.me': 'Remember me',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.stats.total': 'Total',
    'dashboard.stats.active': 'Active',
    'dashboard.stats.completed': 'Completed',
    'dashboard.stats.revenue': 'Revenue',
    'dashboard.quick.actions': 'Quick Actions',
    'dashboard.recent.activity': 'Recent Activity',
    
    // Auctions
    'auctions.title': 'Car Auctions',
    'auctions.subtitle': 'Discover exceptional vehicles from verified sellers',
    'auctions.search.placeholder': 'Search by make, model, or keywords...',
    'auctions.filters': 'Filters',
    'auctions.sort.by': 'Sort by',
    'auctions.sort.ending': 'Ending Soon',
    'auctions.sort.price.low': 'Price: Low to High',
    'auctions.sort.price.high': 'Price: High to Low',
    'auctions.sort.newest': 'Newest First',
    'auctions.filter.brand': 'Brand',
    'auctions.filter.price': 'Price Range',
    'auctions.filter.year': 'Year',
    'auctions.filter.condition': 'Condition',
    'auctions.filter.location': 'Location',
    'auctions.clear.filters': 'Clear Filters',
    'auctions.no.results': 'No auctions found',
    'auctions.no.results.desc': 'Try adjusting your search criteria or filters.',
    
    // Car Details
    'car.details.title': 'Vehicle Details',
    'car.details.overview': 'Overview',
    'car.details.specifications': 'Specifications',
    'car.details.features': 'Features',
    'car.details.inspection': 'Inspection Report',
    'car.details.history': 'Bid History',
    'car.details.seller': 'Seller Information',
    'car.details.vin': 'VIN',
    'car.details.engine': 'Engine',
    'car.details.transmission': 'Transmission',
    'car.details.drivetrain': 'Drivetrain',
    'car.details.fuel': 'Fuel Type',
    'car.details.exterior': 'Exterior Color',
    'car.details.interior': 'Interior Color',
    'car.details.mileage': 'Mileage',
    'car.details.condition': 'Condition',
    'car.details.location': 'Location',
    
    // Bidding
    'bid.current': 'Current Bid',
    'bid.reserve': 'Reserve Price',
    'bid.place': 'Place Bid',
    'bid.auto': 'Auto Bid',
    'bid.history': 'Bid History',
    'bid.amount': 'Bid Amount',
    'bid.minimum': 'Minimum Bid',
    'bid.increment': 'Bid Increment',
    'bid.confirm': 'Confirm Bid',
    'bid.success': 'Bid placed successfully!',
    'bid.error': 'Failed to place bid',
    'bid.winning': 'Winning',
    'bid.outbid': 'Outbid',
    'bid.reserve.met': 'Reserve Met',
    'bid.reserve.not.met': 'Reserve Not Met',
    
    // Time
    'time.days': 'days',
    'time.hours': 'hours',
    'time.minutes': 'minutes',
    'time.seconds': 'seconds',
    'time.ended': 'Ended',
    'time.starting.soon': 'Starting Soon',
    'time.live': 'Live',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View Details',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.update': 'Update',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.share': 'Share',
    'common.copy': 'Copy',
    'common.print': 'Print',
    'common.export': 'Export',
    'common.import': 'Import',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.mark.read': 'Mark as read',
    'notifications.mark.all.read': 'Mark all as read',
    'notifications.clear.all': 'Clear all',
    'notifications.no.new': 'No new notifications',
    
    // Profile
    'profile.title': 'Profile',
    'profile.personal.info': 'Personal Information',
    'profile.preferences': 'Preferences',
    'profile.security': 'Security',
    'profile.verification': 'Verification',
    'profile.payment.methods': 'Payment Methods',
    'profile.activity': 'Activity History',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.currency': 'Currency',
    'settings.timezone': 'Timezone',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Privacy',
    'settings.theme': 'Theme',
    
    // Footer
    'footer.about': 'About Us',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact Us',
    'footer.help': 'Help Center',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.blog': 'Blog',
    'footer.copyright': '© 2024 AuctionPro. All rights reserved.'
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.auctions': 'Subastas',
    'nav.dashboard': 'Panel',
    'nav.profile': 'Perfil',
    'nav.logout': 'Cerrar Sesión',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.help': 'Ayuda',
    
    // Landing Page
    'landing.hero.title': 'Subastas de Autos Premium',
    'landing.hero.subtitle': 'Descubre vehículos excepcionales en subastas online exclusivas',
    'landing.hero.cta': 'Explorar Subastas',
    'landing.features.title': '¿Por Qué Elegir Nuestra Plataforma?',
    'landing.features.trust': 'Plataforma Confiable',
    'landing.features.trust.desc': 'Transacciones seguras con vendedores verificados',
    'landing.features.quality': 'Vehículos de Calidad',
    'landing.features.quality.desc': 'Selección curada de autos premium',
    'landing.features.support': 'Soporte 24/7',
    'landing.features.support.desc': 'Asistencia experta durante todo tu viaje',
    
    // Auth
    'auth.login.title': 'Bienvenido de Nuevo',
    'auth.login.subtitle': 'Inicia sesión en tu cuenta',
    'auth.register.title': 'Crear Cuenta',
    'auth.register.subtitle': 'Únete a nuestra comunidad de subastas',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre Completo',
    'auth.phone': 'Número de Teléfono',
    'auth.role': 'Tipo de Cuenta',
    'auth.role.buyer': 'Comprador',
    'auth.role.seller': 'Vendedor',
    'auth.login.button': 'Iniciar Sesión',
    'auth.register.button': 'Crear Cuenta',
    'auth.switch.register': '¿No tienes cuenta? Regístrate',
    'auth.switch.login': '¿Ya tienes cuenta? Iniciar Sesión',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido de vuelta',
    'dashboard.stats.total': 'Total',
    'dashboard.stats.active': 'Activo',
    'dashboard.stats.completed': 'Completado',
    'dashboard.stats.revenue': 'Ingresos',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.view': 'Ver Detalles',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.all': 'Todos',
    'common.none': 'Ninguno',
    'common.yes': 'Sí',
    'common.no': 'No',
    'common.confirm': 'Confirmar',
    'common.close': 'Cerrar',
    
    // Bidding
    'bid.current': 'Oferta Actual',
    'bid.place': 'Ofertar',
    'bid.history': 'Historial de Ofertas',
    'bid.amount': 'Cantidad de Oferta',
    'bid.confirm': 'Confirmar Oferta',
    'bid.success': '¡Oferta realizada con éxito!',
    'bid.error': 'Error al realizar oferta',
    'bid.winning': 'Ganando',
    'bid.outbid': 'Superado',
    
    // Time
    'time.days': 'días',
    'time.hours': 'horas',
    'time.minutes': 'minutos',
    'time.seconds': 'segundos',
    'time.ended': 'Terminado',
    'time.starting.soon': 'Comenzando Pronto',
    'time.live': 'En Vivo'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.auctions': 'Enchères',
    'nav.dashboard': 'Tableau de bord',
    'nav.profile': 'Profil',
    'nav.logout': 'Déconnexion',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    
    // Landing Page
    'landing.hero.title': 'Enchères de Voitures Premium',
    'landing.hero.subtitle': 'Découvrez des véhicules exceptionnels aux enchères en ligne exclusives',
    'landing.hero.cta': 'Explorer les Enchères',
    'landing.features.title': 'Pourquoi Choisir Notre Plateforme',
    'landing.features.trust': 'Plateforme de Confiance',
    'landing.features.trust.desc': 'Transactions sécurisées avec des vendeurs vérifiés',
    'landing.features.quality': 'Véhicules de Qualité',
    'landing.features.quality.desc': 'Sélection organisée de voitures premium',
    'landing.features.support': 'Support 24/7',
    'landing.features.support.desc': 'Assistance experte tout au long de votre parcours',
    
    // Common
    'common.loading': 'Chargement...',
    'common.view': 'Voir les Détails',
    'bid.current': 'Enchère Actuelle',
    'bid.place': 'Enchérir',
    'time.ended': 'Terminé'
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.auctions': 'Auktionen',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profil',
    'nav.logout': 'Abmelden',
    'nav.login': 'Anmelden',
    'nav.register': 'Registrieren',
    
    // Landing Page
    'landing.hero.title': 'Premium Auto-Auktionen',
    'landing.hero.subtitle': 'Entdecken Sie außergewöhnliche Fahrzeuge bei exklusiven Online-Auktionen',
    'landing.hero.cta': 'Auktionen Erkunden',
    'landing.features.title': 'Warum Unsere Plattform Wählen',
    'landing.features.trust': 'Vertrauenswürdige Plattform',
    'landing.features.trust.desc': 'Sichere Transaktionen mit verifizierten Verkäufern',
    'landing.features.quality': 'Qualitätsfahrzeuge',
    'landing.features.quality.desc': 'Kuratierte Auswahl von Premium-Autos',
    'landing.features.support': '24/7 Support',
    'landing.features.support.desc': 'Expertenunterstützung während Ihrer gesamten Reise',
    
    // Common
    'common.loading': 'Laden...',
    'common.view': 'Details Anzeigen',
    'bid.current': 'Aktuelles Gebot',
    'bid.place': 'Bieten',
    'time.ended': 'Beendet'
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.auctions': 'المزادات',
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.logout': 'تسجيل الخروج',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    
    // Landing Page
    'landing.hero.title': 'مزادات السيارات المميزة',
    'landing.hero.subtitle': 'اكتشف مركبات استثنائية في مزادات حصرية عبر الإنترنت',
    'landing.hero.cta': 'استكشاف المزادات',
    'landing.features.title': 'لماذا تختار منصتنا',
    'landing.features.trust': 'منصة موثوقة',
    'landing.features.trust.desc': 'معاملات آمنة مع بائعين معتمدين',
    'landing.features.quality': 'مركبات عالية الجودة',
    'landing.features.quality.desc': 'مجموعة منتقاة من السيارات المميزة',
    'landing.features.support': 'دعم 24/7',
    'landing.features.support.desc': 'مساعدة خبراء طوال رحلتك',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.view': 'عرض التفاصيل',
    'bid.current': 'المزايدة الحالية',
    'bid.place': 'تقديم مزايدة',
    'time.ended': 'انتهى'
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.auctions': '拍卖',
    'nav.dashboard': '仪表板',
    'nav.profile': '个人资料',
    'nav.logout': '登出',
    'nav.login': '登录',
    'nav.register': '注册',
    
    // Landing Page
    'landing.hero.title': '高端汽车拍卖',
    'landing.hero.subtitle': '在独家在线拍卖中发现卓越车辆',
    'landing.hero.cta': '探索拍卖',
    'landing.features.title': '为什么选择我们的平台',
    'landing.features.trust': '可信平台',
    'landing.features.trust.desc': '与经过验证的卖家进行安全交易',
    'landing.features.quality': '优质车辆',
    'landing.features.quality.desc': '精选高端汽车',
    'landing.features.support': '24/7支持',
    'landing.features.support.desc': '在您的整个旅程中提供专家协助',
    
    // Common
    'common.loading': '加载中...',
    'common.view': '查看详情',
    'bid.current': '当前出价',
    'bid.place': '出价',
    'time.ended': '已结束'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  useEffect(() => {
    const savedLang = localStorage.getItem('auction-language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) {
        setCurrentLanguage(lang);
        document.documentElement.dir = lang.dir;
        document.documentElement.lang = lang.code;
      }
    }
  }, []);

  const setLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('auction-language', language.code);
    document.documentElement.dir = language.dir;
    document.documentElement.lang = language.code;
  };

  const t = (key) => {
    return translations[currentLanguage.code]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      t, 
      availableLanguages: languages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
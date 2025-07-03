import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.auctions': 'Auctions',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
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
    
    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to your account',
    'auth.register.title': 'Create Account',
    'auth.register.subtitle': 'Join our auction community',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.role': 'Account Type',
    'auth.role.buyer': 'Buyer',
    'auth.role.seller': 'Seller',
    'auth.login.button': 'Sign In',
    'auth.register.button': 'Create Account',
    'auth.switch.register': 'Don\'t have an account? Register',
    'auth.switch.login': 'Already have an account? Sign In',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.stats.total': 'Total',
    'dashboard.stats.active': 'Active',
    'dashboard.stats.completed': 'Completed',
    'dashboard.stats.revenue': 'Revenue',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View Details',
    'common.bid': 'Place Bid',
    'common.currentBid': 'Current Bid',
    'common.timeLeft': 'Time Left',
    'common.ended': 'Auction Ended'
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
    'common.bid': 'Ofertar',
    'common.currentBid': 'Oferta Actual',
    'common.timeLeft': 'Tiempo Restante',
    'common.ended': 'Subasta Terminada'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLang = localStorage.getItem('auction-language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) setCurrentLanguage(lang);
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('auction-language', language.code);
  };

  const t = (key: string): string => {
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
import React, { createContext, useContext, useState, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', dir: 'ltr' }
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
    
    // Seller Dashboard
    'seller.add.listing': 'Add New Listing',
    'seller.my.listings': 'My Listings',
    'seller.active.listings': 'Active Listings',
    'seller.total.sales': 'Total Sales',
    'seller.success.rate': 'Success Rate',
    'seller.avg.sale.time': 'Avg. Sale Time',
    
    // Buyer Dashboard
    'buyer.active.bids': 'Active Bids',
    'buyer.watching': 'Watching',
    'buyer.won.auctions': 'Won Auctions',
    'buyer.total.spent': 'Total Spent',
    'buyer.watchlist': 'Watchlist',
    'buyer.bid.now': 'Bid Now',
    'buyer.winning': 'Winning',
    'buyer.outbid': 'Outbid',
    
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
    'profile.activity': 'Activity History'
  },
  sv: {
    // Navigation
    'nav.home': 'Hem',
    'nav.auctions': 'Auktioner',
    'nav.dashboard': 'Instrumentpanel',
    'nav.profile': 'Profil',
    'nav.logout': 'Logga ut',
    'nav.login': 'Logga in',
    'nav.register': 'Registrera',
    'nav.about': 'Om oss',
    'nav.contact': 'Kontakt',
    'nav.help': 'Hjälp',
    
    // Landing Page
    'landing.hero.title': 'Premium Bilauktioner',
    'landing.hero.subtitle': 'Upptäck exceptionella fordon på exklusiva onlineauktioner',
    'landing.hero.cta': 'Utforska Auktioner',
    'landing.features.title': 'Varför Välja Vår Plattform',
    'landing.features.trust': 'Pålitlig Plattform',
    'landing.features.trust.desc': 'Säkra transaktioner med verifierade säljare',
    'landing.features.quality': 'Kvalitetsfordon',
    'landing.features.quality.desc': 'Kurerat urval av premiumbilar',
    'landing.features.support': '24/7 Support',
    'landing.features.support.desc': 'Experthjälp under hela din resa',
    'landing.stats.cars': 'Sålda Bilar',
    'landing.stats.success': 'Framgångsgrad',
    'landing.stats.customers': 'Nöjda Kunder',
    'landing.stats.experience': 'Års Erfarenhet',
    
    // Auth
    'auth.login.title': 'Välkommen Tillbaka',
    'auth.login.subtitle': 'Logga in på ditt konto',
    'auth.register.title': 'Skapa Konto',
    'auth.register.subtitle': 'Gå med i vår auktionsgemenskap',
    'auth.email': 'E-post',
    'auth.password': 'Lösenord',
    'auth.name': 'Fullständigt Namn',
    'auth.phone': 'Telefonnummer',
    'auth.role': 'Kontotyp',
    'auth.role.buyer': 'Köpare',
    'auth.role.seller': 'Säljare',
    'auth.login.button': 'Logga In',
    'auth.register.button': 'Skapa Konto',
    'auth.switch.register': 'Har du inget konto? Registrera',
    'auth.switch.login': 'Har du redan ett konto? Logga In',
    'auth.forgot.password': 'Glömt Lösenord?',
    'auth.remember.me': 'Kom ihåg mig',
    
    // Dashboard
    'dashboard.welcome': 'Välkommen tillbaka',
    'dashboard.stats.total': 'Totalt',
    'dashboard.stats.active': 'Aktiv',
    'dashboard.stats.completed': 'Slutförd',
    'dashboard.stats.revenue': 'Intäkter',
    'dashboard.quick.actions': 'Snabbåtgärder',
    'dashboard.recent.activity': 'Senaste Aktivitet',
    
    // Seller Dashboard
    'seller.add.listing': 'Lägg Till Ny Annons',
    'seller.my.listings': 'Mina Annonser',
    'seller.active.listings': 'Aktiva Annonser',
    'seller.total.sales': 'Total Försäljning',
    'seller.success.rate': 'Framgångsgrad',
    'seller.avg.sale.time': 'Genomsnittlig Försäljningstid',
    
    // Buyer Dashboard
    'buyer.active.bids': 'Aktiva Bud',
    'buyer.watching': 'Bevakar',
    'buyer.won.auctions': 'Vunna Auktioner',
    'buyer.total.spent': 'Totalt Spenderat',
    'buyer.watchlist': 'Bevakningslista',
    'buyer.bid.now': 'Bjud Nu',
    'buyer.winning': 'Vinner',
    'buyer.outbid': 'Överbjuden',
    
    // Auctions
    'auctions.title': 'Bilauktioner',
    'auctions.subtitle': 'Upptäck exceptionella fordon från verifierade säljare',
    'auctions.search.placeholder': 'Sök efter märke, modell eller nyckelord...',
    'auctions.filters': 'Filter',
    'auctions.sort.by': 'Sortera efter',
    'auctions.sort.ending': 'Slutar Snart',
    'auctions.sort.price.low': 'Pris: Låg till Hög',
    'auctions.sort.price.high': 'Pris: Hög till Låg',
    'auctions.sort.newest': 'Nyaste Först',
    'auctions.filter.brand': 'Märke',
    'auctions.filter.price': 'Prisintervall',
    'auctions.filter.year': 'År',
    'auctions.filter.condition': 'Skick',
    'auctions.filter.location': 'Plats',
    'auctions.clear.filters': 'Rensa Filter',
    'auctions.no.results': 'Inga auktioner hittades',
    'auctions.no.results.desc': 'Försök justera dina sökkriterier eller filter.',
    
    // Car Details
    'car.details.title': 'Fordonsdetaljer',
    'car.details.overview': 'Översikt',
    'car.details.specifications': 'Specifikationer',
    'car.details.features': 'Funktioner',
    'car.details.inspection': 'Inspektionsrapport',
    'car.details.history': 'Budhistorik',
    'car.details.seller': 'Säljarinformation',
    'car.details.vin': 'VIN',
    'car.details.engine': 'Motor',
    'car.details.transmission': 'Växellåda',
    'car.details.drivetrain': 'Drivlina',
    'car.details.fuel': 'Bränsletyp',
    'car.details.exterior': 'Exteriörfärg',
    'car.details.interior': 'Interiörfärg',
    'car.details.mileage': 'Körsträcka',
    'car.details.condition': 'Skick',
    'car.details.location': 'Plats',
    
    // Bidding
    'bid.current': 'Aktuellt Bud',
    'bid.reserve': 'Reservpris',
    'bid.place': 'Lägg Bud',
    'bid.auto': 'Auto Bud',
    'bid.history': 'Budhistorik',
    'bid.amount': 'Budbelopp',
    'bid.minimum': 'Minimibud',
    'bid.increment': 'Budökning',
    'bid.confirm': 'Bekräfta Bud',
    'bid.success': 'Bud lagt framgångsrikt!',
    'bid.error': 'Misslyckades att lägga bud',
    'bid.winning': 'Vinner',
    'bid.outbid': 'Överbjuden',
    'bid.reserve.met': 'Reserv Uppnådd',
    'bid.reserve.not.met': 'Reserv Ej Uppnådd',
    
    // Time
    'time.days': 'dagar',
    'time.hours': 'timmar',
    'time.minutes': 'minuter',
    'time.seconds': 'sekunder',
    'time.ended': 'Avslutad',
    'time.starting.soon': 'Startar Snart',
    'time.live': 'Live',
    
    // Common
    'common.loading': 'Laddar...',
    'common.error': 'Ett fel uppstod',
    'common.success': 'Framgång',
    'common.cancel': 'Avbryt',
    'common.save': 'Spara',
    'common.edit': 'Redigera',
    'common.delete': 'Ta bort',
    'common.view': 'Visa Detaljer',
    'common.back': 'Tillbaka',
    'common.next': 'Nästa',
    'common.previous': 'Föregående',
    'common.search': 'Sök',
    'common.filter': 'Filtrera',
    'common.sort': 'Sortera',
    'common.all': 'Alla',
    'common.none': 'Ingen',
    'common.yes': 'Ja',
    'common.no': 'Nej',
    'common.confirm': 'Bekräfta',
    'common.close': 'Stäng',
    'common.open': 'Öppna',
    'common.add': 'Lägg till',
    'common.remove': 'Ta bort',
    'common.update': 'Uppdatera',
    'common.submit': 'Skicka',
    'common.reset': 'Återställ',
    'common.clear': 'Rensa',
    'common.apply': 'Tillämpa',
    
    // Notifications
    'notifications.title': 'Notifieringar',
    'notifications.mark.read': 'Markera som läst',
    'notifications.mark.all.read': 'Markera alla som lästa',
    'notifications.clear.all': 'Rensa alla',
    'notifications.no.new': 'Inga nya notifieringar',
    
    // Profile
    'profile.title': 'Profil',
    'profile.personal.info': 'Personlig Information',
    'profile.preferences': 'Inställningar',
    'profile.security': 'Säkerhet',
    'profile.verification': 'Verifiering',
    'profile.payment.methods': 'Betalningsmetoder',
    'profile.activity': 'Aktivitetshistorik'
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
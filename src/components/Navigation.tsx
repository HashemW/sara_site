import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { t, i18n } = useTranslation();

  // Bulletproof fallback so it never redirects randomly
  const safeLang = i18n.language === 'en' ? 'en' : 'ar';

  useEffect(() => {
    document.documentElement.dir = safeLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = safeLang;
  }, [safeLang]);

  const toggleLanguage = () => {
    const newLang = safeLang === 'en' ? 'ar' : 'en';
    const currentPath = location.pathname.replace(/^\/(en|ar)/, '');
    setIsMobileMenuOpen(false);
    navigate(`/${newLang}${currentPath}`);
  };
  
  const navItems = [
    { label: t('nav_home'), path: `/${safeLang}`, type: 'route' },
    { label: t('nav_how_it_works'), path: `/${safeLang}`, sectionId: 'features', type: 'scroll' },
    { label: t('nav_science'), path: `/${safeLang}/science`, type: 'route' },
    { label: t('nav_about'), path: `/${safeLang}/about`, type: 'route' }
  ];
  
  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    
    if (item.type === 'scroll' && item.sectionId) {
      // Updated to check for the localized home path
      if (location.pathname === `/${safeLang}` || location.pathname === `/${safeLang}/`) {
        const element = document.getElementById(item.sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(`/${safeLang}`);
        setTimeout(() => {
          const element = document.getElementById(item.sectionId);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(item.path);
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to={`/${safeLang}`} className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2">
          <span className="text-zinc-50">SARA</span>
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest hidden sm:inline border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 rounded">
            {t('nav_ai_assistant')}
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item)}
                  className="text-zinc-400 hover:text-zinc-50 transition-colors font-medium text-sm relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-zinc-800 pl-8">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors text-sm font-bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {safeLang === 'en' ? 'العربية' : 'English'}
            </button>

            {/* Restored proper Navbar Button styling */}
            <button 
              onClick={() => navigate(`/${safeLang}/dashboard`)}
              className="bg-orange-500 hover:bg-orange-400 text-zinc-950 text-sm font-bold px-5 py-2 rounded-lg transition-colors"
            >
              {t('nav_analyze')}
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-zinc-400 hover:text-zinc-50 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 absolute w-full shadow-2xl">
          <ul className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item)}
                  className="text-zinc-400 hover:text-zinc-50 transition-colors font-medium w-full text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
            
            <li className="pt-2">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors font-medium w-full text-left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {safeLang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              </button>
            </li>

            <li className="pt-4 border-t border-zinc-800">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate(`/${safeLang}/dashboard`);
                }}
                className="w-full bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold px-5 py-3 rounded-lg transition-colors"
              >
                {t('nav_analyze')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
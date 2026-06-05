import './styles/globals.css';
import './i18n'; 
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Science from './pages/Science'; 
import About from './pages/About';
import Progress from './pages/Progress';
import ScrollToTop from './components/scrollToTop';

// --- NEW: THE LANGUAGE URL WRAPPER ---
function LanguageWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    // If the URL has a valid language, apply it and flip the layout
    if (lang === 'en' || lang === 'ar') {
      i18n.changeLanguage(lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  // If someone types an invalid language (e.g., aiequine.net/fr/), redirect to Arabic
  if (lang !== 'en' && lang !== 'ar') {
    return <Navigate to="/ar" replace />;
  }

  return <Outlet />;
}

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={
        <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Loading SARA Engine...</p>
        </div>
      }>
        <Routes>
          {/* Automatically redirect the root domain to the Arabic subdirectory */}
          <Route path="/" element={<Navigate to="/ar" replace />} />

          {/* Wrap all your pages inside the /:lang route */}
          <Route path="/:lang" element={<LanguageWrapper />}>
            {/* Notice the paths no longer have leading slashes so they append to the language */}
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} /> 
            <Route path="science" element={<Science />} />
            <Route path="about" element={<About />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter> 
  );
}
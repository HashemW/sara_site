import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Updated to match the new product-focused architecture
  const navItems = [
    { label: 'Home', path: '/', type: 'route' },
    { label: 'How it Works', path: '/', sectionId: 'features', type: 'scroll' },
    { label: 'The Science', path: '/science', type: 'route' },
    { label: 'About Us', path: '/about', type: 'route' }
  ];
  
  // Handle navigation with scroll
  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    
    if (item.type === 'scroll' && item.sectionId) {
      if (location.pathname === '/') {
        const element = document.getElementById(item.sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
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
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2">
          <span className="text-zinc-50">SARA</span>
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest hidden sm:inline border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 rounded">
            AI Assistant
          </span>
        </Link>
        
        {/* Desktop Navigation */}
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
          
          {/* Primary CTA Button - Always visible on desktop */}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/dashboard');
            }}
            className="bg-orange-500 hover:bg-orange-400 text-zinc-950 text-sm font-bold px-5 py-2 rounded-lg transition-colors"
          >
            Analyze Ride
          </button>
        </div>
        
        {/* Mobile Hamburger Button */}
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
      
      {/* Mobile Menu - Slides down */}
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
            {/* Mobile CTA */}
            <li className="pt-4 border-t border-zinc-800">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold px-5 py-3 rounded-lg transition-colors"
              >
                Analyze Ride
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
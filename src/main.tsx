import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Science from './pages/Science'; // <-- Your new Tech Hub!
import About from './pages/About'
// Components
import ScrollToTop from './components/scrollToTop';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/science" element={<Science />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter> 
  );
}
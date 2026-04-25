import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features'; // Rename 'Projects' to 'Features'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
      <Navigation />
      <Hero />
      <Features /> 
      
      {/* Footer */}
      <footer className="border-t border-zinc-800/50 bg-zinc-950 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-3xl font-extrabold tracking-tight text-zinc-50">SARA</span>
            <p className="text-sm text-zinc-400 mt-2 font-medium uppercase tracking-widest">
              Skeletal Alignment & Riding Analytics
            </p>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2026 SARA • Precision Equestrian Analytics
          </p>
          <p className="text-zinc-600 text-xs mt-4">
            سارَ • "to walk"
          </p>
        </div>
      </footer>
    </div>
  );
}
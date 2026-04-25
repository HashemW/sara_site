import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

export default function Science() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
      <Navigation />
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-orange-500/5 blur-[150px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700/50 bg-zinc-800/30 text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Proprietary Architecture
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-zinc-50 leading-tight">
            The Engine Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              Your Perfect Seat
            </span>
          </h1>

          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            We combined state-of-the-art computer vision with biomechanics to build the world's most accurate equestrian pose model. No sensors. No suits. Just your camera.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        
        {/* Core Tech 1: Pose Estimation */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              {/* Replace with your man31.jpg or horse.jpg */}
              <img 
                src="horse.jpg" 
                alt="AI Pose Detection mapping keypoints on a rider"
                className="w-full h-auto object-cover opacity-90"
              />
              <div className="absolute inset-0 border inset-border border-white/10 rounded-2xl pointer-events-none"></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center text-sm">01</span>
              Kinematic Pose Mapping
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Generic AI models don't understand horseback riding. We built SARA Core v2.0 by training our neural networks on a massive, proprietary dataset of equestrian athletes. The system instantly maps your skeletal structure—locking onto your shoulder, hip, and heel—to calculate exact alignment deviations in real-time.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                <div className="text-3xl font-black text-zinc-50 mb-1">160k+</div>
                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wide">Annotated Frames</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                <div className="text-3xl font-black text-zinc-50 mb-1">95<span className="text-orange-500">%</span></div>
                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wide">Detection Precision</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 col-span-2 flex justify-between items-center">
                <span className="text-sm text-zinc-500 font-medium uppercase tracking-wide">Processing Speed</span>
                <span className="text-xl font-bold text-orange-400">14 FPS / 75ms Latency</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Tech 2: Gait Analysis */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center text-sm">02</span>
              Dynamic Gait Recognition
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Posture means nothing without context. A perfect seat at the walk is completely different from a perfect seat at the canter. SARA uses an advanced Transformer model that tracks the micro-movements of your horse's joints across a sliding window of frames, automatically determining the current gait to adjust your scoring metrics dynamically.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">🌊</div>
                <div>
                  <div className="font-bold text-zinc-200">Fluid Mechanics</div>
                  <div className="text-sm text-zinc-500">Analyzes bounce, velocity, and trajectory.</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">🧠</div>
                <div>
                  <div className="font-bold text-zinc-200">Transformer Architecture</div>
                  <div className="text-sm text-zinc-500">Trained on 75,000+ movement sequences.</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl p-2">
              {/* Replace with your gaitAnalysis.gif */}
              <div className="bg-zinc-950 rounded-xl overflow-hidden">
                <img 
                  src="gaitAnalysis.gif" 
                  alt="AI predicting horse gait"
                  className="w-full h-auto opacity-80 mix-blend-screen"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Academic Credibility Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-zinc-50 mb-4">Research-Backed Accuracy</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
              The foundational architecture behind SARA's auto-annotation pipeline and pose extraction is currently being prepared for submission to the International Conference on Pattern Recognition (ICPR).
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <span className="px-4 py-2 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-lg text-sm font-mono">PyTorch</span>
              <span className="px-4 py-2 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-lg text-sm font-mono">Ultralytics YOLO</span>
              <span className="px-4 py-2 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-lg text-sm font-mono">OpenCV</span>
              <span className="px-4 py-2 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-lg text-sm font-mono">Transformer API</span>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center pb-12">
          <h2 className="text-3xl font-bold text-zinc-50 mb-6">Stop guessing. Start analyzing.</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold rounded-lg transition-colors text-lg shadow-lg shadow-orange-500/20"
          >
            Try SARA For Free
          </button>
        </section>

      </main>
    </div>
  );
}
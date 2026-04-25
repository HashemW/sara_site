import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center bg-zinc-950 pt-20 overflow-hidden">
      
      {/* Subtle background glow so it's not pure black */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-zinc-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: The Pitch */}
          <div className="text-left pt-12 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              SARA Core v2.0 Live
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-zinc-50 leading-[1.1]">
              Elevate your coaching. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                Backed by data.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
              An advanced computer vision toolkit built for equestrian instructors. Map your student's shoulder-hip-heel alignment in real-time and provide objective, frame-by-frame telemetry to accelerate their progress.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-zinc-950 font-bold rounded-lg transition-colors text-lg flex items-center justify-center gap-2 group"
              >
                Analyze a Ride
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth'})}
                className="px-8 py-4 bg-zinc-900/50 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-semibold rounded-lg transition-colors text-lg flex items-center justify-center"
              >
                How it Works
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: The Product Showcase (Keep exactly as you had it!) */}
          <div className="relative mx-auto w-full max-w-sm">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shadow-orange-500/5">
            <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              </div>
              <div className="mx-auto text-xs font-mono text-zinc-500">live_telemetry_feed.mp4</div>
            </div>
            <div className="aspect-[4/5] bg-zinc-800 relative">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
                src="/example.mp4" 
              />
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <p className="text-zinc-600 font-mono text-sm">Awaiting Video Asset...</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-xl backdrop-blur-md hidden sm:block">
            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-1">Alignment Score</div>
            <div className="text-3xl font-black text-orange-500">78<span className="text-lg text-zinc-500">%</span></div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
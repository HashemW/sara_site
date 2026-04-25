export default function Features() {
  const steps = [
    {
      number: "01",
      title: "Film Your Students",
      description: "Prop your phone on the arena fence or film from the center. SARA works with standard 2D video—no sensors, markers, or special suits required.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Process the Telemetry",
      description: "Drop the video into our dashboard. SARA's neural networks instantly extract the skeletal map and analyze the horse's gait, providing raw visual data.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Interpret & Coach",
      description: "AI is a powerful tool, but it can hallucinate. As the instructor, you use SARA's frame-by-frame scores to filter the noise, highlight key adjustments, and guide your students to their best ride.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-32 bg-zinc-950 relative border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-50 mb-6">
            Your expert eye, <br className="md:hidden" />
            <span className="text-zinc-500">augmented.</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            SARA doesn't replace the coach. It provides objective, data-driven feedback to help you prove your point and accelerate learning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-gradient-to-r from-zinc-800 via-orange-500/20 to-zinc-800 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors h-full flex flex-col items-center text-center group">
                
                <div className="w-24 h-24 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-8 relative group-hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 text-zinc-950 font-bold flex items-center justify-center text-sm shadow-lg shadow-orange-500/20">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-zinc-50 mb-4">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
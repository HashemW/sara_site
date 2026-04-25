import Navigation from '../components/Navigation';

export default function About() {
  const team = [
    {
      name: "Hashem Wahed",
      role: "Founder & Lead AI Engineer",
      bio: "A Computer Vision Researcher and Data Engineer currently advancing cellular structure modeling at the National Institutes of Health (NIH). As a UMD Computer Science alumni, Hashem architected the SARA neural networks and computer vision pipelines from the ground up, merging high-performance computing with equestrian biomechanics.",
      imageUrl: "hashemHorse.jpg",
      email: "hwahed@terpmail.umd.edu",
      linkedin: "https://www.linkedin.com/in/hashem-wahed-b301aa253",
      github: "https://github.com/HashemW"
    },
    {
      name: "Dr. Mohammad Nayeem Teli",
      role: "Principal Investigator & Advisor",
      bio: "Provides strategic guidance, research direction, and academic oversight for the SARA project. Dr. Teli brings extensive expertise in Computer Vision and machine learning, ensuring the project's methodology maintains rigorous academic and industry standards.",
      imageUrl: "linkedInNew.jpg",
      email: "nayeem@cs.umd.edu",
      linkedin: "https://www.linkedin.com/in/mohammad-nayeem-teli-b1a697",
      website: "https://www.cs.umd.edu/~nayeem"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
      <Navigation />
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-zinc-800/50">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-zinc-50">
            Built by riders.<br />
            <span className="text-orange-500">Powered by engineering.</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            SARA was born out of the University of Maryland stables. Today, it is an advanced computer vision platform designed to democratize elite equestrian coaching.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 space-y-32">
        
        {/* The Team Grid */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-zinc-800 flex-grow"></div>
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">The Architecture Team</h2>
            <div className="h-px bg-zinc-800 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-orange-500/60 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)] transition-all duration-500 flex flex-col relative"
              >
                {/* Glowing top accent line that appears on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                <div className="h-64 overflow-hidden relative bg-zinc-950">
                  {/* Subtle dark overlay that lifts on hover so the image "pops" brighter */}
                  <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      member.name === "Hashem Wahed" 
                        ? "scale-150 origin-[center_15%] object-[center_30%] group-hover:scale-[1.30]" // Base zoom + slight extra zoom on hover
                        : "object-center contrast-125 brightness-90 opacity-90 group-hover:scale-105" // Quality fix + slight zoom on hover
                    }`}
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-grow relative z-10 bg-zinc-900">
                  <h3 className="text-2xl font-bold text-zinc-50 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium text-sm tracking-wide uppercase mb-6">{member.role}</p>
                  <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                    {member.bio}
                  </p>
                  
                  {/* Explicit Contact & Social Links */}
                  <div className="space-y-3 border-t border-zinc-800/50 pt-6">
                    <div className="flex items-center gap-3 text-zinc-300">
                      <svg className="w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                      <span className="text-sm font-mono">{member.email}</span>
                    </div>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-orange-500 transition-colors">
                         <svg className="w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                         <span className="text-sm">LinkedIn Profile</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Origin Story (Merged with "Beyond the Code") */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 md:p-16 relative overflow-hidden">
          {/* Subtle quote mark for the personal letter feel */}
          <div className="absolute -top-12 -left-4 text-[200px] text-zinc-800/30 font-serif leading-none pointer-events-none">"</div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">A Note From the Founder</h2>
            <h3 className="text-3xl font-bold mb-8 text-zinc-50">From the Stalls to the Servers</h3>
            
            <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
              <div className="space-y-6 text-zinc-400 leading-relaxed">
                <p>
                  My journey didn't start in a robotics lab; it started with cleaning stalls at the University of Maryland stables. I petted my first horse at 18 and began riding shortly after. 
                </p>
                <p>
                  I quickly realized that I could not visualize what my instructors demanded until I actually improved a skill or intrinsically picked it up after much practice. Driven by a coach's guidance, seeing direct corrections of where my body 
                  should be while riding would have been incredibly helpful for me as a beginner. This is where the idea for SARA originated.
                </p>
                <p>
                  The name <span className="text-orange-500 font-semibold">SARA</span> is a nod to both the technology and my heritage. In Arabic, "Saa-ra" (سارَ) simply translates "to walk"—the foundational gait of all equestrian movement. 
                </p>
              </div>
              <div>
                <img 
                  src="youngHashem.jpg" 
                  alt="Hashem Wahed"
                  className="w-full h-auto rounded-xl border border-zinc-800 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information (Explicit Text, No Email Clients) */}
        <section className="text-center pb-12 border-t border-zinc-800/50 pt-20">
          <h2 className="text-3xl font-bold text-zinc-50 mb-6">Partner With Us</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-10">
            Whether you are a trainer looking to integrate AI into your stable, or a researcher interested in our computer vision methodology, reach out directly:
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Email Us</div>
                <div className="text-lg text-zinc-200 font-mono">hwahed@terpmail.umd.edu</div>
              </div>
            </div>
            
            {/* If you have a phone number you want to add, you can uncomment this block!
            <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Call Us</div>
                <div className="text-lg text-zinc-200 font-mono">(555) 123-4567</div>
              </div>
            </div>
            */}
          </div>
        </section>

      </main>
    </div>
  );
}
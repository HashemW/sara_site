import { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  responsibilities: string[];
  imageUrl: string;
  email: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export default function Team() {
  const [dividerPosition, setDividerPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const team: TeamMember[] = [
    {
      name: "Dr. Mohammad Nayeem Teli",
      role: "Faculty Advisor & Principal Investigator",
      bio: "Provides strategic guidance, research direction, and academic oversight for the SARA project. Brings expertise in Computer Vision and connects the project to broader research initiatives.",
      responsibilities: [
        "Research oversight and methodology guidance",
        "Academic mentorship and strategic planning",
        "Connecting project to industry and academic networks",
        "Ensuring research rigor and publication standards"
      ],
      imageUrl: "telipic.jpg",
      email: "nayeem@cs.umd.edu",
      github: "https://github.com/nayeemmz",
      linkedin: "https://www.linkedin.com/in/mohammad-nayeem-teli-b1a697",  
      website: "https://www.cs.umd.edu/~nayeem",
    },
    {
      name: "Hashem Wahed",
      role: "Lead Researcher & Developer",
      bio: "Responsible for the hands-on research, system architecture, and implementation of SARA. Designs and develops the AI models, computer vision algorithms, and user interface under the guidance of Dr. Teli.",
      responsibilities: [
        "System architecture and technical implementation",
        "Machine learning model development and training",
        "Computer vision algorithm design",
        "Data collection, processing, and analysis",
        "UI/UX design and front-end development",
        "Documentation and technical writing"
      ],
      imageUrl: "hashemHorse.jpg",
      email: "hwahed@terpmail.umd.edu",
      github: "https://github.com/HashemW",
      linkedin: "https://www.linkedin.com/in/hashem-wahed-b301aa253",
      website: "/#/about"
    }
  ];

  // Handle mouse/touch move for dragging
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    const clampedPercentage = Math.min(Math.max(percentage, 10), 90);
    setDividerPosition(clampedPercentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      <main className="pt-24 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Meet the Team
          </h1>
          <p className="text-amber-100/70 text-center mb-8 max-w-2xl mx-auto">
            A collaborative effort combining academic expertise with hands-on research and development
          </p>
          
          {/* MOBILE: Vertical Stack (hidden on desktop) */}
          <div className="md:hidden space-y-6 mb-16">
            {/* Advisor Card */}
            <div className="rounded-2xl overflow-hidden border-2 border-amber-700/50 shadow-2xl">
              <div className="relative h-[400px]">
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundImage: `url(${"linkedInNew.jpg"})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.4)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                
                <div className="relative h-full flex flex-col p-6">
                  <h2 className="text-2xl font-bold text-amber-50 mb-2">
                    {team[0].name}
                  </h2>
                  <p className="text-amber-200 text-m mb-4 font-medium">
                    {team[0].role}
                  </p>
                  {/* This div will grow to fill all available space, pushing the bio down */}
                  <div className="flex-grow"></div>
                  <p className="text-amber-100 text-sm leading-relaxed">
                    {team[0].bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Card */}
            <div className="rounded-2xl overflow-hidden border-2 border-cyan-700/50 shadow-2xl">
              <div className="relative h-[400px]">
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundImage: `url(${team[1].imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.4)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-cyan-900/50 to-transparent" />
                
                <div className="relative h-full flex flex-col p-6">
                  <h2 className="text-2xl font-bold text-amber-50 mb-2">
                    {team[1].name}
                  </h2>
                  <p className="text-amber-200 text-m mb-4 font-medium">
                    {team[1].role}
                  </p>
                  {/* This div will grow to fill all available space, pushing the bio down */}
                  <div className="flex-grow"></div>
                  <p className="text-amber-100 text-sm leading-relaxed">
                    {team[1].bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* DESKTOP: Sliding Window (hidden on mobile) */}
          <div 
            ref={containerRef}
            className="hidden md:block relative h-[700px] rounded-2xl overflow-hidden border-2 border-indigo-800/50 shadow-2xl touch-none mb-16"
          >
            
            {/* Left Side - Advisor */}
            <div 
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{ clipPath: `inset(0 ${100 - dividerPosition}% 0 0)` }}
            >
              <div 
                className="absolute inset-0"
                style={{ 
                    backgroundImage: `url(${team[0].imageUrl})`,
                    backgroundSize: '110%',
                    backgroundPosition: '220% 20%',
                    filter: 'brightness(0.4)'
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-orange-900/70 to-transparent" />
              
              <div className="relative h-full flex flex-col justify-end p-12">
                <div className={`transition-all duration-500 ${
                  dividerPosition > 60 ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-4'
                }`}>
                  <h2 className="text-4xl font-bold text-amber-50 mb-3">
                    {team[0].name}
                  </h2>
                  <p className="text-amber-200 text-xl mb-6 font-medium">
                    {team[0].role}
                  </p>
                  
                  {dividerPosition > 70 && (
                    <div className="space-y-4 animate-fadeIn">
                      <p className="text-amber-100 leading-relaxed max-w-lg">
                        {team[0].bio}
                      </p>
                      
                      <div className="bg-amber-950/60 backdrop-blur-sm rounded-lg p-6 border border-amber-700/30 max-w-lg">
                        <h3 className="text-amber-300 font-semibold mb-3 text-lg">Key Contributions:</h3>
                        <ul className="space-y-2">
                          {team[0].responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-amber-100/90 text-sm">
                              • {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Side - Student Researcher */}
            <div 
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{ clipPath: `inset(0 0 0 ${dividerPosition}%)` }}
            >
              <div 
                className="absolute inset-0"
                style={{ 
                    backgroundImage: `url(${team[1].imageUrl})`,
                    backgroundSize: '90%',
                    backgroundPosition: '-50% 40%',
                    filter: 'brightness(0.4)'
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/80 via-blue-900/70 to-transparent" />
              
              <div className="relative h-full flex flex-col justify-end p-12 items-end text-right">
                <div className={`transition-all duration-500 ${
                  dividerPosition < 40 ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-4'
                }`}>
                  <h2 className="text-4xl font-bold text-cyan-50 mb-3">
                    {team[1].name}
                  </h2>
                  <p className="text-cyan-200 text-xl mb-6 font-medium">
                    {team[1].role}
                  </p>
                  
                  {dividerPosition < 30 && (
                    <div className="space-y-4 animate-fadeIn">
                      <p className="text-cyan-100 leading-relaxed max-w-lg">
                        {team[1].bio}
                      </p>
                      
                      <div className="bg-cyan-950/60 backdrop-blur-sm rounded-lg p-6 border border-cyan-700/30 max-w-lg">
                        <h3 className="text-cyan-300 font-semibold mb-3 text-lg">Responsibilities:</h3>
                        <ul className="space-y-2">
                          {team[1].responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-cyan-100/90 text-sm">
                              • {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Vertical Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-white to-cyan-400 shadow-2xl transition-all duration-500 ease-out z-20 cursor-ew-resize"
              style={{ left: `${dividerPosition}%` }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-indigo-900 shadow-xl flex items-center justify-center pointer-events-none">
                <div className="flex gap-1">
                  <div className="w-1 h-6 bg-indigo-900 rounded-full" />
                  <div className="w-1 h-6 bg-indigo-900 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Hover Zones */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize z-30"
              onMouseEnter={() => setDividerPosition(75)}
              onMouseLeave={() => setDividerPosition(50)}
            />
            
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize z-30"
              onMouseEnter={() => setDividerPosition(25)}
              onMouseLeave={() => setDividerPosition(50)}
            />
            
            {/* Position Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40">
              <div className={`px-4 py-2 rounded-full transition-all duration-300 ${
                dividerPosition > 60 
                  ? 'bg-amber-500 text-slate-900 font-semibold shadow-lg' 
                  : 'bg-slate-800/50 text-slate-400 text-sm'
              }`}>
                {team[0].name.split(' ')[1] || 'Advisor'}
              </div>
              <div className={`px-4 py-2 rounded-full transition-all duration-300 ${
                dividerPosition < 40 
                  ? 'bg-cyan-500 text-slate-900 font-semibold shadow-lg' 
                  : 'bg-slate-800/50 text-slate-400 text-sm'
              }`}>
                {team[1].name.split(' ')[0] || 'Researcher'}
              </div>
            </div>
          </div>
          
          {/* Contact Section - Same for both mobile and desktop */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Advisor Contact Card */}
              <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/40 backdrop-blur-sm border border-amber-700/30 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
                <div className="flex items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-50">{team[0].name}</h3>
                    <p className="text-amber-300 text-sm">{team[0].role}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${team[0].email}`}
                    className="flex items-center gap-3 text-amber-100 hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-900/50 flex items-center justify-center group-hover:bg-amber-800/50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{team[0].email}</span>
                  </a>
                  
                  {team[0].github && (
                    <a 
                      href={team[0].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-amber-100 hover:text-amber-300 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-900/50 flex items-center justify-center group-hover:bg-amber-800/50 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">GitHub Profile</span>
                    </a>
                  )}
                  
                  {team[0].linkedin && (
                    <a 
                      href={team[0].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-amber-100 hover:text-amber-300 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-900/50 flex items-center justify-center group-hover:bg-amber-800/50 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">LinkedIn Profile</span>
                    </a>
                  )}
                  
                  {team[0].website && (
                    <a 
                      href={team[0].website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-amber-100 hover:text-amber-300 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-900/50 flex items-center justify-center group-hover:bg-amber-800/50 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Faculty Profile</span>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Student Contact Card */}
              <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 backdrop-blur-sm border border-cyan-700/30 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="flex items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-50">{team[1].name}</h3>
                    <p className="text-cyan-300 text-sm">{team[1].role}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${team[1].email}`}
                    className="flex items-center gap-3 text-cyan-100 hover:text-cyan-300 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-900/50 flex items-center justify-center group-hover:bg-cyan-800/50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{team[1].email}</span>
                  </a>
                  
                  {team[1].github && (
                    <a 
                      href={team[1].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-cyan-100 hover:text-cyan-300 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cyan-900/50 flex items-center justify-center group-hover:bg-cyan-800/50 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">GitHub Profile</span>
                    </a>
                  )}
                  
                  {team[1].linkedin && (
                    <a 
                      href={team[1].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-cyan-100 hover:text-cyan-300 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cyan-900/50 flex items-center justify-center group-hover:bg-cyan-800/50 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">LinkedIn Profile</span>
                    </a>
                  )}

                  {team[1].website && (
                    <a 
                      href={team[1].website}
                      className="flex items-center gap-3 text-cyan-100 hover:text-cyan-300 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cyan-900/50 flex items-center justify-center group-hover:bg-cyan-800/50 transition-colors text-lg">
                        ✦
                      </div>
                      <span className="text-sm font-medium">About Me</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
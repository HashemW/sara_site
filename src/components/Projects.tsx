import { useNavigate } from "react-router-dom";
interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  date: string;
  path: string;
}

export default function Projects() {
    const navigate = useNavigate();
  const updates: Project[] = [
    {
      title: "Equestrian Pose Detection Model",
      description: "Created an equestrian pose detection model trained on tens of thousands of auto-annotated images.",
      tags: ["YOLO", "Pose Detection", "Data Science"],
      gradient: "from-cyan-600 to-blue-700",
      date: "May-Sep 2025",
      path: "/posedetection"
    },
    {
      title: "Gait Analysis Dashboard",
      description: "An innovative way of analyzing a horse's gait from a video.",
      tags: ["Transformers", "Neural Networks", "Edge Computing"],
      gradient: "from-indigo-600 to-purple-700",
      date: "Jun 2025",
      path: "/gaitanalysis"
    },
    {
      title: "Cadence v0.2",
      description: "Our AI equestrian coach model. Try it out today!",
      tags: ["Biomechanics", "Pose Analysis"],
      gradient: "from-amber-600 to-orange-700",
      date: "Aug 2025",
      path: '/cadence'
    },
    {
      title: "The All-Angled Breakthrough",
      description: "How we finally cracked a seven month problem.",
      tags: ["Neural Networks", "Linear Algebra"],
      gradient: "from-amber-600 to-orange-700",
      date: "Dec 2025",
      path: '/allangles'
    }
  ];

  const handleNavClick = (item: typeof updates[0]) => {
    navigate(item.path);
  };
  
  return (
    <section id="research" className="py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent p-4">
            Research Progress
          </h2>
          <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
            Tracking our journey in developing an intelligent equestrian coaching system that combines AI, computer vision, and biomechanics.
          </p>
        </div>
        
        {/* Updates Grid */}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {updates.map((update) => (
            
            <div 
              onClick={() => handleNavClick(update)}
              key={update.title}
              className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
            >
              {/* Colorful header with date */}
              <div className={`h-2 bg-gradient-to-r ${update.gradient}`} />
              
              <div className="p-6">
                {/* Date badge */}
                <span className="inline-block px-3 py-1 bg-amber-900/30 text-amber-200 rounded-full text-xs font-semibold mb-3 border border-amber-700/30">
                  {update.date}
                </span>
                
                <h3 className="text-xl font-bold mb-3 text-amber-50">{update.title}</h3>
                <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                  {update.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-indigo-900/50 text-cyan-300 rounded-full text-xs border border-indigo-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
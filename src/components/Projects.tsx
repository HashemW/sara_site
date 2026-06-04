import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // <-- Imported i18n hook

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
  const { t } = useTranslation(); // <-- Initialize translation

  const updates: Project[] = [
    {
      title: t('proj_1_title'),
      description: t('proj_1_desc'),
      tags: ["YOLO", t('proj_1_tag2'), t('proj_1_tag3')],
      gradient: "from-cyan-600 to-blue-700",
      date: t('proj_1_date'),
      path: "/posedetection"
    },
    {
      title: t('proj_2_title'),
      description: t('proj_2_desc'),
      tags: ["Transformers", t('proj_2_tag2'), t('proj_2_tag3')],
      gradient: "from-indigo-600 to-purple-700",
      date: t('proj_2_date'),
      path: "/gaitanalysis"
    },
    {
      title: t('proj_3_title'),
      description: t('proj_3_desc'),
      tags: [t('proj_3_tag1'), t('proj_3_tag2')],
      gradient: "from-amber-600 to-orange-700",
      date: t('proj_3_date'),
      path: '/cadence'
    },
    {
      title: t('proj_4_title'),
      description: t('proj_4_desc'),
      tags: [t('proj_2_tag2'), t('proj_4_tag2')], // Reused Neural Networks tag
      gradient: "from-amber-600 to-orange-700",
      date: t('proj_4_date'),
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
            {t('proj_header')}
          </h2>
          <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
            {t('proj_subtitle')}
          </p>
        </div>
        
        {/* Updates Grid */}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {updates.map((update) => (
            
            <div 
              onClick={() => handleNavClick(update)}
              key={update.title}
              // Added cursor-pointer so the hover state feels like a button
              className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
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
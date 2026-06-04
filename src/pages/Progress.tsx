import { useTranslation } from 'react-i18next'; // <-- ADDED HOOK
import Navigation from '../components/Navigation';

export default function Progress() {
  const { t } = useTranslation(); // <-- INITIALIZE TRANSLATION

  // Refactored timeline into an array for cleaner rendering
  const timelineEvents = [
    {
      date: t('t1_date'),
      title: t('t1_title'),
      desc: t('t1_desc')
    },
    {
      date: t('t2_date'),
      title: t('t2_title'),
      desc: t('t2_desc')
    },
    {
      date: t('t3_date'),
      title: t('t3_title'),
      desc: t('t3_desc')
    },
    {
      date: t('t4_date'),
      title: t('t4_title'),
      desc: t('t4_desc')
    },
    {
      date: t('t5_date'),
      title: t('t5_title'),
      desc: t('t5_desc')
    },
    {
      date: t('t6_date'),
      title: t('t6_title'),
      desc: t('t6_desc')
    },
    {
      date: t('t7_date'),
      title: t('t7_title'),
      desc: t('t7_desc')
    },
    {
      date: t('t8_date'),
      title: t('t8_title'),
      desc: t('t8_desc')
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      <main className="pt-24 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            {t('progress_title')}
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-amber-100/80 text-lg mb-10 leading-relaxed">
              {t('progress_intro')}
            </p>
            
            <ol className="relative border-s border-gray-200 dark:border-gray-700">                  
              {timelineEvents.map((event, index) => (
                <li key={index} className="mb-10 ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {event.date}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {event.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
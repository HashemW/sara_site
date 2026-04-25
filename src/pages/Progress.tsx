import Navigation from '../components/Navigation';

export default function Progress() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      <main className="pt-24 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Research Overview
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-amber-100/80 text-lg mb-6 leading-relaxed">
              The story of SARA starts around very late 2024. By that time, I did not 
              think it would become a large project that would take this much time. However,
              one step led to another and here we are! This page is a general timeline 
              of how this started and our progress.
            </p>
            
            <ol className="relative border-s border-gray-200 dark:border-gray-700">                  
            <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">November 2024</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Questioning the Experts</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">We started this project by first questioning very experienced riders at the University of Maryland Equestrian Club. We aimed to understand general biomechanic principles and key points for ideal English riding.</p>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </li>
            <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2025</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Formal Start</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">A couple months after my graduation in December 2024, I came to the conclusion that I wanted to continue this research and Dr. Teli agreed. I started the computer vision research after using our riding basics framework outlined from experienced riders.</p>
            </li>
            <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">May 2025</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pose Analysis Plan</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">By this time, a detailed pose analyzer for both rider and horse was looking very necessary for this project. We agreed on a method of auto-annotating images by using several pose models. This month was mainly experimenting with models and data collection.</p>
            </li>
            <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">June 2025</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pose Analysis Model v1.0</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">A dataset of over 10,000 images was created using YouTube videos. We used an auto-annotation pipeline to create our labels and then finetuned a pose model on our data.</p>
            </li>
            <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">July 2025</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gait Analysis Model</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Implemented a transformer model in order to tell if a horse is standing, walking, trotting, cantering, or galloping.</p>
            </li>
            <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">August 2025</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">The release of Cadence v0.1</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Our first AI model for equine analysis. Although rudimentary and basic, it was a good starting point.</p>
            </li>
            <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 2025</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pose Analysis Model v2.0</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">After doing detailed ablation studies of our auto-annotation process, we finally created a dataset of over 160,000 auto-annotated images. A pose model was finetuned on this for more accurate and stronger results. A full research paper was written to be submitted to ICPR conference in December.</p>
            </li>
            <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">December 2025</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cadence v0.2</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">The release of the first 360 degree model grader.</p>
            </li>
        </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
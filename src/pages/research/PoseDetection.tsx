import Navigation from '../../components/Navigation';
import { useNavigate } from 'react-router-dom';

export default function PoseDetection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-950 via-slate-950 to-violet-950">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-24 left-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Date & Category Badge */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-full text-sm font-semibold">
              Computer Vision
            </span>
            <span className="text-slate-400 text-sm">Apr-Sep 2025</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
            Pose Detection Model v1.0-2.0
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-amber-100/80 mb-8 leading-relaxed">
            A state of the art equestrian pose model.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>By Hashem Wahed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Featured Image */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-indigo-800/30 shadow-2xl">
          <img 
            src="man31.jpg" 
            alt="Pose detection visualization"
            className="w-full object-cover"
          />
          <div className="bg-indigo-950/60 backdrop-blur-sm px-6 py-3 border-t border-indigo-800/30">
            <p className="text-sm text-slate-400 italic">Figure 1: Pose detection overlay on rider. Video used: <a href="https://www.youtube.com/watch?v=zDtFhFZP8w4" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ahmed Al Mani'</a></p>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
            Overview
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              The basic result of our preliminary research was that a pose model was MANDATORY. However, 
              annotating thousands of images is an expensive process, and it is unrealistic with a research
              team of two people.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              We first started with a model finetuned on about ~10,000 auto-annotated riding images. This produced
              our v1.0 model. However, in September 2025, detailed ablation studies were done which led to an auto-annotated
              image database of about 160,000.
            </p>
          </div>
        </section>

        {/* Two-Column Layout Section */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="bg-indigo-950/40 border border-indigo-800/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Key Improvements</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>mAP50-95 pose score increased from 0.44 to 0.51.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Precision and Recall increased from 0.87 to 0.92. </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>A stronger ability to generalize unfamiliar poses.</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-950/40 border border-amber-700/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-amber-400 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-sm border border-cyan-700/50">YOLO</span>
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-sm border border-cyan-700/50">OpenCV</span>
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-sm border border-cyan-700/50">Pandas</span>
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-sm border border-cyan-700/50">Python</span>
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-sm border border-cyan-700/50">Numpy</span>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
            Methodology
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Our approach combines traditional computer vision techniques with modern deep learning 
              architectures. The pipeline consists of three main stages:
            </p>

            {/* Numbered Steps */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">Dataset Creation</h3>
                  <p className="text-slate-300">
                    A dataset of riding videos were collected from YouTube.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">Pose Estimation</h3>
                  <p className="text-slate-300">
                    We use two models in order to create a large dataset.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">Finetuning</h3>
                  <p className="text-slate-300">
                    Yolov8-pose was finetuned on the final dataset, giving us an equestrian detection model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image with Side Caption */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="rounded-xl overflow-hidden border border-indigo-800/30 shadow-xl">
                <img 
                  src="smallPipeline.jpg" 
                  alt="Training data visualization"
                  className="w-full h-[170px]"
                />
              </div>
            </div>
            <div className="bg-indigo-950/40 border border-indigo-800/30 rounded-xl p-6 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Training Dataset</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Our model was trained on tens of annotated video clips from various environments and professions to create a generalizable model.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Training Set Size:</span>
                  <span className="text-cyan-300 font-semibold">158,956 images</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Validation Set Size:</span>
                  <span className="text-cyan-300 font-semibold">17,437 images</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section with Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
            Results & Performance
          </h2>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-cyan-950/60 to-blue-950/60 border border-cyan-700/30 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-cyan-400 mb-2">95%</div>
              <div className="text-slate-300 text-sm">Detection Accuracy</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-700/30 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-indigo-400 mb-2">75ms</div>
              <div className="text-slate-300 text-sm">Average Latency</div>
            </div>
            <div className="bg-gradient-to-br from-amber-950/60 to-orange-950/60 border border-amber-700/30 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-amber-400 mb-2">14fps</div>
              <div className="text-slate-300 text-sm">Processing Speed</div>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed">
            These speeds were achieved by just a 3060 Laptop GPU. The most important benchmark was done by testing a "Golden Dataset" which was about
            115 images of hand annotated horse-rider images.
          </p>
        </section>

        {/* Full-Width Image */}
        <section className="mb-16 -mx-6 md:mx-0">
          <div className="rounded-none md:rounded-2xl overflow-hidden border-y md:border border-indigo-800/30 shadow-2xl">
            <img 
              src="horse.jpg" 
              alt="System architecture diagram"
              className="w-full"
            />
            <div className="bg-indigo-950/60 backdrop-blur-sm px-6 py-4 border-t border-indigo-800/30">
              <p className="text-sm text-slate-400 italic">Figure 2: System architecture showing data flow from image input to data annotation. Video used: <a href="https://youtu.be/jCCCvcZIsJ4?si=n274Z6N1oOklLvRZ" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Cai de Vanzare</a></p>
            </div>
          </div>
        </section>

        {/* Future Work */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
            Conference Submission
          </h2>
          <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-700/30 rounded-xl p-8">
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <span className="font-semibold text-cyan-300">ICPR:</span> Planning to submit the paper
                  of the full detailed pipeline of our auto-annotation to the ICPR conference!
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
            Conclusion
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              The development of Pose Detection Model v2.0 represents a crucial milestone in SARA's mission 
              to democratize high-quality equestrian coaching. 
            </p>
          </div>
        </section>

        {/* Tags & Share */}
        <section className="border-t border-indigo-800/30 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-400">Tags:</span>
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-xs border border-cyan-700/50">Computer Vision</span>
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-xs border border-cyan-700/50">Machine Learning</span>
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-xs border border-cyan-700/50">Pose Estimation</span>
            </div>
          </div>
        </section>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-lg font-semibold hover:bg-cyan-400 transition-all hover:scale-105 shadow-lg shadow-cyan-500/30"
          >
            ← Back to All Updates
          </button>
        </div>

      </article>
    </div>
  );
}
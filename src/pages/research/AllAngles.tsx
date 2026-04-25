import Navigation from '../../components/Navigation';
import { useNavigate } from 'react-router-dom';

export default function AllAngles() {
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
            <span className="text-slate-400 text-sm">Dec 2025</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
            The All-Angled Breakthrough
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-amber-100/80 mb-8 leading-relaxed">
            How we built our first 360 degree model analyzer.
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
            src="45Angled.jpg" 
            alt="Pose detection visualization"
            className="w-full"
          />
          <div className="bg-indigo-950/60 backdrop-blur-sm px-6 py-3 border-t border-indigo-800/30">
            <p className="text-sm text-slate-400 italic">Figure 1: Pose Analysis on rider coming at a 45 degree angle.</p>
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
              One of the largest setbacks we have had in this project is the Angle-of-Orientation problem. A robust way to determine
              the orientation of which direction the horse was facing was strictly needed for a 360 grader. Our keypoint model was simply
              too unstable. Our final solution was the use of the 3D Equine PFERD dataset.
            </p>
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
              The pipeline was straightforward:
            </p>

            {/* Numbered Steps */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">Obtain PFERD Data</h3>
                  <p className="text-slate-300">
                    PFERD (Poses for Equine Research Dataset) is a great dataset of 3D equine data. We at first obtained all of the collected 3D horse pose data.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">3D to 2D labeling</h3>
                  <p className="text-slate-300">
                    From the 3D keypoints, it is incredibly easy to get the angle of orientation. We therefore used a 2D equine pose estimator and concatenated PFERD's 3D annotations
                    to the 2D keypoints. We therefore then had a dataset of 2D keypoints to Angle of Orientations.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">Train a Neural Network</h3>
                  <p className="text-slate-300">
                    With all of our data, we train a new model that uses the horse's 2D keypoints to estimate an angle of orientation.
                  </p>
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

        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="rounded-xl overflow-hidden border border-indigo-800/30 shadow-xl">
                <img 
                  src="accuracy_plot.png" 
                  alt="Training data visualization"
                  className="w-full"
                />
              </div>
            </div>
            <div className="bg-indigo-950/40 border border-indigo-800/30 rounded-xl p-6 flex flex-col max-h-100">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Confusion Plot Accuracy</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Our results were strong with answers generally being correct. The bottom right and top left distribution of 
                erroneous keypoints is misleading. They are not true "misclassifications." They are instead a place where a model Predicts
                -170 or -180 instead of -170 or -180, which in our case and our model, is almost the same direction. It is like the difference between a model
                predicting 2 degrees and 358 degrees on a unit circle.  
              </p>
            </div>
          </div>
        </section>

          <p className="text-slate-300 text-lg leading-relaxed">
            This was a spectacular result! However, PFERD's data is very limited. For now, it is a great model, but for the future, we will look elsewhere. After
            this, we have begun an entire model revamp!
          </p>
        </section>


        {/* Future Work */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
            Future Directions
          </h2>
          <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-700/30 rounded-xl p-8">
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚖️</span>
                <div>
                  <span className="font-semibold text-cyan-300">Model Revamp: </span> We have decided to embark on a base model revamp.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
            PFERD Citation
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              I would highly recommend that you check out the PFERD dataset 
              <a href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/2EXONE" 
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> here </a> 
              and their research paper 
              <a href="https://www.nature.com/articles/s41597-024-03312-1"
               className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> here. </a> 
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
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-xs border border-cyan-700/50">Transformers</span>
              <span className="px-3 py-1 bg-slate-800 text-cyan-300 rounded-full text-xs border border-cyan-700/50">Torch</span>
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
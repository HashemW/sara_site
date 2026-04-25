import { useState, useRef } from 'react';
import Navigation from '../../components/Navigation';
const API_BASE_URL = "https://hashemwdp--sara-backend-flask-app.modal.run";

export default function Cadence() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Reference to the file input to reset it
  const fileInputRef = useRef<HTMLInputElement>(null);

  function downloadVideo(videoUrl: string) {
    // Prevent multiple simultaneous downloads
    if (isDownloading) {
      console.log('Download already in progress');
      return;
    }

    setIsDownloading(true);
    
    try {
      // Create a temporary link element
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'processed-video.mp4';
      
      // Append to body, click, and remove
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Reset the downloading state after a short delay
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download video. Please try again.');
      setIsDownloading(false);
    }
  }
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file');
        return;
      }
      // Validate file size (e.g., max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
      }
      setSelectedFile(file);
      setResultVideo(null);
      setAnalysisResults(null);
    }
  };

  // Handle video upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Replace this URL with your actual server endpoint
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const fullDownloadUrl = `${API_BASE_URL}${data.processedVideoUrl}`;
      // Set the results
      setResultVideo(fullDownloadUrl);
      setAnalysisResults(data.analysis);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload and process video. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Reset function for "Analyze Another Video"
  const handleReset = () => {
    setSelectedFile(null);
    setResultVideo(null);
    setAnalysisResults(null);
    setUploadProgress(0);
    setIsUploading(false);
    
    // Clear the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-950 via-slate-950 to-violet-950">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-full text-sm font-semibold mb-6">
            AI-Powered Analysis
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Cadence v0.2
          </h1>
          
          <p className="text-xl text-amber-100/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload your riding video and receive instant AI-powered feedback on posture, balance, 
            and riding technique. Our advanced computer vision model analyzes your form in real-time.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left Column: Upload Section */}
          <div>
            <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
              Upload Your Video
            </h2>

            {/* Upload Box */}
            <div className="bg-indigo-950/40 border-2 border-dashed border-indigo-700/50 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="video-upload"
                disabled={isUploading}
              />
              
              <label 
                htmlFor="video-upload" 
                className="cursor-pointer block"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                {selectedFile ? (
                  <div className="mb-4">
                    <p className="text-cyan-400 font-semibold mb-2">Selected File:</p>
                    <p className="text-slate-300 text-sm">{selectedFile.name}</p>
                    <p className="text-slate-400 text-xs mt-1">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <p className="text-amber-100 font-semibold mb-2">
                      Click to upload
                    </p>
                    <p className="text-slate-400 text-sm">
                      MP4, MOV, AVI (max 100MB)
                    </p>
                  </div>
                )}
              </label>

              {/* Upload Button */}
              {selectedFile && !isUploading && !resultVideo && (
                <button
                  onClick={handleUpload}
                  className="mt-4 px-8 py-3 bg-cyan-500 text-slate-900 rounded-lg font-semibold hover:bg-cyan-400 transition-all hover:scale-105 shadow-lg shadow-cyan-500/30"
                >
                  Analyze Video
                </button>
              )}

              {/* Download Button - Appears after processing is complete */}
              {resultVideo && !isUploading && (
                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => downloadVideo(resultVideo)}
                    disabled={isDownloading}
                    className={`w-full px-8 py-3 rounded-lg font-semibold transition-all ${
                      isDownloading 
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                        : 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 hover:scale-105 shadow-lg shadow-cyan-500/30'
                    }`}
                  >
                    {isDownloading ? 'Downloading...' : 'Download Processed Video'}
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="w-full px-8 py-3 bg-indigo-900 text-amber-100 border border-indigo-700 rounded-lg font-semibold hover:bg-indigo-800 transition-all"
                  >
                    Analyze Another Video
                  </button>
                </div>
              )}

              {/* Progress Bar */}
              {isUploading && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Processing...</span>
                    <span className="text-cyan-400 font-semibold">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-2">
                    This may take a few moments depending on video length...
                  </p>
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="mt-6 bg-amber-950/40 border border-amber-700/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-3">Video Requirements</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">✓</span>
                  <span>Clear side view of rider and horse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">✓</span>
                  <span>Good lighting conditions (outdoor or well-lit indoor)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">✓</span>
                  <span>Stable camera position (minimal movement)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">✓</span>
                  <span>Duration: Maximum of 40 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">✓</span>
                  <span>Resolution: Minimum 720p recommended</span>
                </li>
                <h3 className="text-lg font-bold text-amber-400 mb-3">Server Notes</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">😬</span>
                  <span>If there are any server errors, please send me an email in my contact!</span>
                  <span className="text-cyan-400 mt-0.5">🐢</span>
                  <span>We have very limited server hardware, so processing may be slow!</span>
                </li>
              </ul>
              </ul>
            </div>
          </div>

          {/* Right Column: Results or Info */}
          <div>
            {resultVideo && analysisResults ? (
              // Show Success Message
              <div>
                <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
                  Analysis Complete! ✓
                </h2>

                <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-700/30 rounded-xl p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-300 mb-3">Processing Complete!</h3>
                  <p className="text-slate-300 mb-2">
                    Your video has been analyzed successfully.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Download your processed video with pose corrections from the upload box on the left.
                  </p>
                </div>
              </div>
            ) : (
              // Show How It Works
              <div>
                <h2 className="text-3xl font-bold text-amber-50 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
                  How It Works
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-2">Upload Video</h3>
                      <p className="text-slate-300">
                        Select a video of your riding session. Best results come from side-angle views 
                        with clear visibility of both rider and horse.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-2">AI Processing</h3>
                      <p className="text-slate-300">
                        Our computer vision model analyzes every frame, detecting pose landmarks, 
                        tracking movement patterns, and evaluating riding form against expert standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-2">Get Results</h3>
                      <p className="text-slate-300">
                        Receive a processed video with a visual overlay of what the ideal rider
                        pose is versus your pose.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sample Result Preview */}
                <div className="mt-8 rounded-xl overflow-hidden border border-indigo-800/30">
                  <img 
                    src="correction1.gif" 
                    alt="Sample analysis"
                    className="w-full h-64 object-cover"
                  />
                  <div className="bg-indigo-950/60 backdrop-blur-sm p-4 border-t border-indigo-800/30">
                    <p className="text-sm text-slate-400 italic">
                      Example: Pose landmarks and posture analysis overlay
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* What We Analyze Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              What We Analyze
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Metric Card 2 */}
            <div className="bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-700/30 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-400 mb-3">Shoulder Alignment</h3>
              <p className="text-slate-300 text-sm mb-4">
                Evaluates shoulder levelness, rotation, and proper positioning over the horse's center.
              </p>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-indigo-300">Ideal:</span> Level, square, relaxed posture
              </div>
            </div>

            {/* Metric Card 3 */}
            <div className="bg-gradient-to-br from-purple-950/40 to-pink-950/40 border border-purple-700/30 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">Back Straightness</h3>
              <p className="text-slate-300 text-sm mb-4">
                Measures spinal alignment, detecting slouching, over-arching, or lateral bending.
              </p>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-purple-300">Ideal:</span> Straight spine, tall posture, core engaged
              </div>
            </div>

            {/* Metric Card 4 */}
            <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/40 border border-amber-700/30 rounded-xl p-6 hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-400 mb-3">Hand Position</h3>
              <p className="text-slate-300 text-sm mb-4">
                Tracks hand height, steadiness, and proper rein contact throughout movement.
              </p>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-amber-300">Ideal:</span> Steady, low, soft contact
              </div>
            </div>

            {/* Metric Card 5 */}
            <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-700/30 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-400 mb-3">Leg Position</h3>
              <p className="text-slate-300 text-sm mb-4">
                Analyzes ankle position, leg angle, and stability in the stirrup.
              </p>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-emerald-300">Ideal:</span> Leg at girth under shoulders
              </div>
            </div>

            {/* Metric Card 6 */}
            <div className="bg-gradient-to-br from-rose-950/40 to-red-950/40 border border-rose-700/30 rounded-xl p-6 hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-rose-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-rose-400 mb-3">Rhythm & Balance</h3>
              <p className="text-slate-300 text-sm mb-4">
                Evaluates movement synchronization with the horse and overall stability.
              </p>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-rose-300">Ideal:</span> Smooth, flowing, in sync with horse
              </div>
            </div>
          </div>
        </section>

        {/* Research Background */}
        <section className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-700/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              The Science Behind Cadence
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Cadence is built on our pose estimation model, gait analysis model, and mathmatical analysis.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use our pose estimation model to get the pose of the rider and horse and then correct it to an
                ideal position using math, including geometry, trigonometry, calculus, and physics.
              </p>
              <p className="text-slate-300 leading-relaxed">
                The system provides objective, consistent feedback that complements traditional instruction, 
                helping riders develop muscle memory and correct form faster.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border border-indigo-700/30">
              <img 
                src="crappyMath.png" 
                alt="Research visualization"
                className="w-full"
              />
            </div>
            
          </div>

          {/* Tech Stack */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Powered By</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-slate-800 text-cyan-300 rounded-lg text-sm border border-cyan-700/50">YOLO</span>
              <span className="px-4 py-2 bg-slate-800 text-cyan-300 rounded-lg text-sm border border-cyan-700/50">Torch</span>
              <span className="px-4 py-2 bg-slate-800 text-cyan-300 rounded-lg text-sm border border-cyan-700/50">OpenCV</span>
              <span className="px-4 py-2 bg-slate-800 text-cyan-300 rounded-lg text-sm border border-cyan-700/50">Python</span>
              <span className="px-4 py-2 bg-slate-800 text-cyan-300 rounded-lg text-sm border border-cyan-700/50">FastAPI</span>
              <span className="px-4 py-2 bg-slate-800 text-cyan-300 rounded-lg text-sm border border-cyan-700/50">Transformers</span>
            </div>
          </div>
        </section>
{/* NEW: On the Road to Cadence v0.5 */}
        <section className="relative overflow-hidden rounded-2xl border border-amber-700/30 bg-gradient-to-br from-amber-950/60 via-orange-950/40 to-red-950/60 p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/50 text-amber-300 rounded-full text-sm font-semibold mb-4">
                Coming Soon
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  On the Road to Cadence v0.5
                </span>
              </h2>
              <p className="text-amber-100/80 text-lg max-w-3xl mx-auto">
                We're constantly evolving Cadence to provide even more accurate, comprehensive, and actionable 
                feedback. Here's what may be coming next. 
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Feature 1 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-300 mb-2">The Complete Model Revamp</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      We have decided to completely revamp our base model and refactor all of our base code for
                      more accuracy for users and more organization for us! Pose model 3.0 on the way!
                    </p>
                    <div className="flex items-center gap-2 text-xs text-amber-400">
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>In Implementation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-300 mb-2">Personalized Analysis</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      Add text analysis of issues and strengths of your riding form!
                    </p>
                    <div className="flex items-center gap-2 text-xs text-orange-400">
                      <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                      <span>Research Phase</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-300 mb-2">Diagonal Recognition</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      Identify what diagonal you are trotting on and whether you are on the correct
                      diagonal or not!
                    </p>
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      <span>In Development</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-300 mb-2">Mobile App Integration</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      Record and analyze directly from your smartphone. Real-time on-device processing 
                      means instant feedback without needing an internet connection at the stable.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-yellow-400">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                      <span>Prototyping</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    🦘
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-2">Jumping</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      Form correction for jumping disciplines.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-pink-400">
                      <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                      <span>Concept Stage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-300 mb-2">Custom Training Exercises</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      AI-generated exercises tailored to your specific weaknesses. Get personalized 
                      drills and warm-up routines designed to address your unique riding challenges.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-purple-400">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      <span>Idea Generation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

import { useState, useRef, DragEvent, ChangeEvent, useEffect, useMemo } from 'react';
import Navigation from '../components/Navigation';

// Update this interface in Dashboard.tsx
interface TelemetryData {
  status: string;
  video_metadata: { fps: number };
  averages: { back_avg: number; leg_avg: number; arm_avg: number };
  frames: Array<{
    keypoints: Array<[number, number, number]>; 
    box: Array<number> | null;
    scores: { back: number | null; leg: number | null; arm: number | null };
    is_side_view: boolean;
    guidance?: { back: string | null; leg: string | null; arm: string | null };
    // --- NEW LINE ---
    ideal_keypoints?: { S_ideal: number[]; A_ideal: number[]; K_ideal: number[]; E_ideal: number[]; W_ideal: number[]; } | null;
    gait?: string | null;
  }>;
}


const API_URL = "https://hashemwdp--sara-ai-backend-v2-fastapi-app.modal.run/analyze";

export default function Dashboard() {
  // Add this to your states at the top
  const [currentLiveData, setCurrentLiveData] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'ready' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  
  // 2. UPDATE YOUR STATE TO USE THE INTERFACE
  const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null);
  
  // Exporting states
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  const videoSrc = useMemo(() => {
    if (videoFile) return URL.createObjectURL(videoFile);
    return "";
  }, [videoFile]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- DRAG AND DROP HANDLERS ---
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFileSelection(e.dataTransfer.files[0]);
  };
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) handleFileSelection(e.target.files[0]);
  };

  const resetDashboard = () => {
    setStatus('idle');
    setVideoFile(null);
    setTelemetryData(null);
    setErrorMessage("");
    setIsExporting(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- API CONNECTION ---
  const handleFileSelection = async (file: File) => {
    if (!file.type.startsWith('video/')) { alert("Please upload a valid video file (.mp4, .mov)"); return; }
    setVideoFile(file);
    setStatus('processing');
    setErrorMessage("");
    
    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch(API_URL, { method: "POST", body: formData });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      if (data.status === "error") throw new Error(data.message);
      
      setTelemetryData(data);
      setStatus('ready');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || "Failed to process video.");
    }
  };

  // --- REAL-TIME DRAWING ENGINE ---
  const drawSkeletalOverlay = (ctx: CanvasRenderingContext2D, video: HTMLVideoElement, fps: number) => {
    const currentFrameIdx = Math.floor(video.currentTime * fps);
    const frameData = telemetryData?.frames[currentFrameIdx];

    if (frameData && frameData.keypoints) {
      const kpts = frameData.keypoints;
      
      const leftConfidence = (kpts[3]?.[2] || 0) + (kpts[9]?.[2] || 0);
      const rightConfidence = (kpts[4]?.[2] || 0) + (kpts[10]?.[2] || 0);
      const isLeft = leftConfidence > rightConfidence;

      const S_IDX = isLeft ? 3 : 4;   
      const E_IDX = isLeft ? 5 : 6;   
      const W_IDX = isLeft ? 7 : 8;   
      const H_IDX = isLeft ? 9 : 10;  
      const K_IDX = isLeft ? 11 : 12; 
      const A_IDX = isLeft ? 13 : 14; 

      // --- NEW: DYNAMIC SCALING ---
      // Creates a multiplier based on the video's longest edge (using 1000px as the baseline)
      const scale = Math.max(video.videoWidth, video.videoHeight) / 1000;
      const s = (val: number) => val * scale; // Helper to quickly scale pixel values

      const backColor = (frameData.is_side_view && frameData.scores?.back != null) ? "rgba(16, 185, 129, 0.9)" : "rgba(161, 161, 170, 0.4)";
      const armColor = (frameData.is_side_view && frameData.scores?.arm != null) ? "rgba(14, 165, 233, 0.9)" : "rgba(161, 161, 170, 0.4)";
      const legColor = (frameData.is_side_view && frameData.scores?.leg != null) ? "rgba(245, 158, 11, 0.9)" : "rgba(161, 161, 170, 0.4)";

      // 1. SEGMENT-SPECIFIC MULTI-COLOR SKELETON
      const drawBone = (idx1: number, idx2: number, color: string) => {
        const p1 = kpts[idx1];
        const p2 = kpts[idx2];
        if (p1 && p2 && (p1[2] === undefined || (p1[2] > 0.3 && p2[2] > 0.3))) {
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.strokeStyle = color;
          ctx.lineWidth = s(3); // Scaled!
          ctx.lineCap = "round";
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = s(4); // Scaled!
          ctx.stroke();
        }
      };

      drawBone(S_IDX, H_IDX, backColor); 
      drawBone(S_IDX, E_IDX, armColor); 
      drawBone(E_IDX, W_IDX, armColor); 
      drawBone(H_IDX, K_IDX, legColor); 
      drawBone(K_IDX, A_IDX, legColor);

      // 2. DYNAMIC CORRECTION VECTORS
      if (frameData.ideal_keypoints) {
        ctx.lineCap = "round";
        
        const drawVector = (actualPt: number[], idealPt: number[], color: string) => {
           ctx.setLineDash([]); 
           ctx.lineWidth = s(2.5); // Scaled!
           ctx.beginPath();
           ctx.moveTo(actualPt[0], actualPt[1]);
           ctx.lineTo(idealPt[0], idealPt[1]);
           ctx.strokeStyle = color;
           ctx.shadowColor = color;
           ctx.shadowBlur = s(8); // Scaled!
           ctx.stroke();
           
           ctx.lineWidth = s(2); // Scaled!
           ctx.beginPath();
           ctx.arc(idealPt[0], idealPt[1], s(5), 0, Math.PI * 2); // Scaled!
           ctx.fillStyle = "rgba(24, 24, 27, 0.8)"; 
           ctx.fill();
           ctx.stroke(); 
        };

        if (frameData.guidance?.back && kpts[S_IDX]) {
           drawVector(kpts[S_IDX], frameData.ideal_keypoints.S_ideal, backColor);
        }

        if (frameData.guidance?.leg && kpts[A_IDX] && kpts[K_IDX]) {
           drawVector(kpts[A_IDX], frameData.ideal_keypoints.A_ideal, legColor);
           drawVector(kpts[K_IDX], frameData.ideal_keypoints.K_ideal, legColor);
        }

        if (frameData.guidance?.arm && kpts[W_IDX]) {
           drawVector(kpts[W_IDX], frameData.ideal_keypoints.W_ideal, armColor);
        }
        ctx.setLineDash([]); 
      }

      // 3. DRAW THE SLEEK TEXT TAGS
      if (frameData.guidance) {
        // Scale the font size, but don't let it drop below 10px on very tiny videos
        const fontSize = Math.max(s(11), 10); 
        ctx.font = `600 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const drawSleekTag = (text: string | null | undefined, x: number, y: number, color: string) => {
          if (!text) return;

          // Scale all box dimensions
          const paddingX = s(10);
          const textWidth = ctx.measureText(text).width;
          const boxWidth = textWidth + (paddingX * 2) + s(10); 
          const boxHeight = s(22);

          ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
          ctx.shadowBlur = s(6);
          ctx.shadowOffsetY = s(3);

          ctx.fillStyle = "rgba(24, 24, 27, 0.85)"; 
          ctx.beginPath();
          ctx.roundRect(x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight, boxHeight / 2);
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x - boxWidth / 2 + s(10), y, s(3), 0, Math.PI * 2); // Scaled!
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.fillText(text.toUpperCase(), x + s(6), y + s(0.5)); // Scaled offsets!
        };

        // Scale the anchor offsets so they float perfectly regardless of resolution!
        if (kpts[S_IDX]) drawSleekTag(frameData.guidance.back, kpts[S_IDX][0], kpts[S_IDX][1] - s(40), backColor);
        if (kpts[E_IDX]) drawSleekTag(frameData.guidance.arm, kpts[E_IDX][0] + (isLeft ? -s(45) : s(45)), kpts[E_IDX][1], armColor);
        if (kpts[A_IDX]) drawSleekTag(frameData.guidance.leg, kpts[A_IDX][0], kpts[A_IDX][1] + s(50), legColor);
      }
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    let lastDrawnFrameIdx = -1; // Tracks the last frame we actually drew

    const renderLoop = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (!video || !canvas || video.readyState < 2) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Ensure canvas size matches video size
      if (canvas.width !== video.videoWidth) {
         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;
      }

      if (telemetryData && !isExporting) {
        const fps = telemetryData.video_metadata?.fps || 30;
        const currentFrameIdx = Math.floor(video.currentTime * fps);

        if (currentFrameIdx !== lastDrawnFrameIdx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setCurrentLiveData(telemetryData.frames[currentFrameIdx]); 
          drawSkeletalOverlay(ctx, video, fps);
          lastDrawnFrameIdx = currentFrameIdx;
        }
      } else if (isExporting) {
        // THE FIX: Instantly wipe the frozen skeleton off the screen during export
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    if (status === 'ready') renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [status, telemetryData, isExporting]);

  // --- VIDEO EXPORT ENGINE ---
  // --- VIDEO EXPORT ENGINE ---
  const exportVideo = () => {
    const video = videoRef.current;
    if (!video || !telemetryData) return;

    setIsExporting(true);
    setExportProgress(0);

    // 1. Setup an offscreen canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = video.videoWidth;
    exportCanvas.height = video.videoHeight;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Fallback for Safari which prefers mp4 over webm
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
      ? 'video/webm;codecs=vp9' 
      : MediaRecorder.isTypeSupported('video/webm') 
        ? 'video/webm' 
        : 'video/mp4';

    const stream = exportCanvas.captureStream(30); 
    const mediaRecorder = new MediaRecorder(stream, { mimeType });
    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      // 4. Combine and download
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
      a.download = `SARA_Analysis_${videoFile?.name || 'video'}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Reset UI and Video
      setIsExporting(false);
      video.muted = false;
      video.controls = true;
      video.removeEventListener('ended', handleVideoEnd);
    };

    const fps = telemetryData.video_metadata?.fps || 30;
    let lastProgress = -1; // The throttle tracker
    let isRecording = true;

    const recordFrame = () => {
      if (!isRecording) return;
      
      const currentFrameIdx = Math.floor(video.currentTime * fps);
      const frameData = telemetryData.frames[currentFrameIdx];

      // Draw video and AI lines
      ctx.drawImage(video, 0, 0, exportCanvas.width, exportCanvas.height);
      drawSkeletalOverlay(ctx, video, fps);
      
      // --- NEW: BAKE THE STATUS BADGES INTO THE EXPORT ---
      // --- BAKE THE STATUS BADGES INTO THE EXPORT ---
      if (frameData) {
        ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
        ctx.textBaseline = "middle";
        const badgeY = 40;
        const badgeX = exportCanvas.width / 2;

        if (!frameData.is_side_view) {
          const text = "AWAITING SIDE PROFILE";
          ctx.textAlign = "left"; 
          const textWidth = ctx.measureText(text).width;
          const totalWidth = textWidth + 24; // text + dot + spacing
          const startX = badgeX - totalWidth / 2;

          // Background pill
          ctx.fillStyle = "rgba(24, 24, 27, 0.85)";
          ctx.beginPath();
          ctx.roundRect(startX - 15, badgeY - 16, totalWidth + 30, 32, 16);
          ctx.fill();

          // Dot
          ctx.fillStyle = "#eab308";
          ctx.beginPath();
          ctx.arc(startX, badgeY, 4, 0, Math.PI * 2);
          ctx.fill();

          // Text
          ctx.fillStyle = "#e4e4e7";
          ctx.fillText(text, startX + 12, badgeY + 1);

        } else {
          const text = "TRACKING ACTIVE";
          ctx.textAlign = "left";
          const textWidth = ctx.measureText(text).width;
          const totalWidth = textWidth + 24;
          const startX = badgeX - totalWidth / 2;

          ctx.fillStyle = "rgba(9, 9, 11, 0.6)";
          ctx.beginPath();
          ctx.roundRect(startX - 15, badgeY - 16, totalWidth + 30, 32, 16);
          ctx.fill();

          ctx.fillStyle = "#22c55e";
          ctx.beginPath();
          ctx.arc(startX, badgeY, 4, 0, Math.PI * 2);
          ctx.fill();

          // ... (After the code that draws TRACKING ACTIVE text) ...
          ctx.fillStyle = "#4ade80";
          ctx.fillText(text, startX + 12, badgeY + 1);
          
          // --- DRAW GAIT BADGE ON EXPORT ---
          if (frameData.gait) {
             const gaitText = frameData.gait;
             ctx.textAlign = "center";
             const gaitWidth = ctx.measureText(gaitText).width + 30;
             const gaitY = badgeY + 36; // Place it below the tracking badge
             
             // Amber Pill
             ctx.fillStyle = "rgba(24, 24, 27, 0.9)";
             ctx.beginPath();
             ctx.roundRect(badgeX - gaitWidth / 2, gaitY - 14, gaitWidth, 28, 14);
             ctx.fill();
             ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
             ctx.stroke();

             // Amber Text
             ctx.fillStyle = "#f59e0b";
             ctx.fillText(gaitText, badgeX, gaitY + 1);
          }
        }
        
      }

      const currentProgress = Math.floor((video.currentTime / video.duration) * 100);
      
      if (currentProgress !== lastProgress && currentProgress <= 100) {
        setExportProgress(currentProgress);
        lastProgress = currentProgress;
      }

      if (!video.ended && !video.paused) {
        requestAnimationFrame(recordFrame);
      }
    };

    const handleVideoEnd = () => {
      isRecording = false;
      mediaRecorder.stop();
    };

    // Attach native event listener for the end of the video
    video.addEventListener('ended', handleVideoEnd);

    // Prepare video for silent, rapid playback
    video.currentTime = 0;
    video.muted = true;
    video.controls = false; 

    // 3. Use a slight timeout to ensure the video resets to 0:00 before recording starts
    setTimeout(() => {
      mediaRecorder.start();
      video.play().then(() => {
        recordFrame(); // Kick off the drawing loop only AFTER the video confirms it is playing
      }).catch(err => {
        console.error("Playback prevented by browser:", err);
        setIsExporting(false);
      });
    }, 100);
  };
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
      <Navigation />
      
      <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Upload Your Ride
          </h1>
          <p className="text-xl text-zinc-400">
            Get your frame-by-frame posture analysis. <span className="text-orange-500 font-bold">100% Free.</span>
          </p>
        </div>

        {/* IDLE STATE */}
        {status === 'idle' && (
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ease-in-out ${isDragging ? 'border-orange-500 bg-orange-500/10 scale-[1.02]' : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-500 hover:bg-zinc-900'}`}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileInput} accept="video/mp4,video/quicktime" className="hidden" />
            <div className="bg-zinc-800 p-4 rounded-full mb-4 shadow-lg">
              <svg className={`w-8 h-8 ${isDragging ? 'text-orange-500' : 'text-zinc-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            <p className="text-xl font-bold text-zinc-200 mb-2">{isDragging ? 'Drop video here' : 'Click or drag video to upload'}</p>
            <p className="text-sm text-zinc-500 font-mono">MP4 or MOV • Max 15 seconds recommended</p>
          </div>
        )}

        {/* PROCESSING STATE */}
        {status === 'processing' && (
          <div className="flex flex-col items-center justify-center w-full h-80 rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-2xl shadow-orange-500/5">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-2xl font-bold text-zinc-200 mb-2">Running SARA AI Engine...</h3>
            <p className="text-zinc-500 animate-pulse">Initializing GPU and extracting keypoints.</p>
          </div>
        )}

        {/* ERROR STATE */}
        {status === 'error' && (
          <div className="flex flex-col items-center justify-center w-full h-80 rounded-2xl border border-red-900/50 bg-red-950/20">
            <div className="bg-red-900/50 p-4 rounded-full mb-4 text-red-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Analysis Failed</h3>
            <p className="text-red-300/70 mb-6 max-w-md text-center">{errorMessage}</p>
            <button onClick={resetDashboard} className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-semibold transition-colors">Try Again</button>
          </div>
        )}

        
        {/* READY STATE - THE TELEMETRY PLAYER */}
        {status === 'ready' && telemetryData && (
          <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-2xl transition-all">
            
            {/* Player Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-mono text-sm text-zinc-400 truncate max-w-[200px]">{videoFile?.name}</span>
                <span className="text-xs font-bold px-2 py-1 bg-zinc-800 text-zinc-300 rounded uppercase tracking-wider">
                  {telemetryData.video_metadata?.fps.toFixed(0)} FPS
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={exportVideo} 
                  disabled={isExporting}
                  className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isExporting ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-400 text-zinc-950'}`}
                >
                  {isExporting ? `Rendering... ${exportProgress}%` : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download Analysis
                    </>
                  )}
                </button>
                <button onClick={resetDashboard} disabled={isExporting} className="text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50">
                  New Video
                </button>
              </div>
            </div>
            {/* isExporting Overlay - Heavy blur to hide the messy export process */}
              {isExporting && (
                <div className="absolute inset-0 z-50 bg-zinc-950/90 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-300">
                  <div className="w-12 h-12 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-lg font-bold text-zinc-200 mb-2">Baking AI Overlay...</p>
                  <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-200" style={{ width: `${exportProgress}%` }}></div>
                  </div>
                </div>
              )}
            {/* THE CANVAS OVERLAY PLAYER */}
            <div className="relative w-full aspect-video bg-black overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
              
              <video 
                ref={videoRef}
                src={videoSrc}
                controls={!isExporting} 
                controlsList="nodownload" 
                disablePictureInPicture 
                className="absolute inset-0 w-full h-full object-contain" 
                crossOrigin="anonymous"
              />
              
              <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />

              {/* --- THE HTML UI OVERLAY --- */}
              {currentLiveData && (
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6 z-10 font-sans">
                  
                  {/* TOP BAR: Sensor Status & Gait Telemetry */}
                  <div className="flex flex-col items-center gap-3 transition-opacity duration-300">
                    
                    {/* 1. Tracking Status */}
                    <div className="flex justify-center">
                      {!currentLiveData.is_side_view ? (
                        <div className="backdrop-blur-md bg-zinc-900/80 border border-zinc-700 px-4 py-2 rounded-full flex items-center gap-3 shadow-xl">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
                          <span className="text-sm font-medium text-zinc-200 tracking-wide">Awaiting Side Profile</span>
                        </div>
                      ) : (
                        <div className="backdrop-blur-md bg-zinc-950/40 border border-green-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Tracking Active</span>
                        </div>
                      )}
                    </div>

                    {/* 2. THE NEW GAIT BADGE */}
                    {currentLiveData.is_side_view && currentLiveData.gait && (
                      <div className="backdrop-blur-md bg-zinc-950/80 border border-amber-500/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-amber-500/5 transition-all">
                        {/* Waveform Icon */}
                        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-xs font-black text-amber-500 uppercase tracking-widest">
                          {currentLiveData.gait}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* BOTTOM / SIDE PANELS: The Corrections */}
                  {currentLiveData.is_side_view && currentLiveData.guidance && (
                    <div className="flex flex-col gap-3 max-w-xs self-end">
                      
                      {/* Back Correction Card - ONLY renders if there is an error */}
                      {currentLiveData.guidance.back && (
                        <div className="backdrop-blur-xl bg-zinc-800/90 border border-zinc-600/50 p-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all hover:bg-zinc-800">
                          <div className="bg-orange-500/20 text-orange-400 p-2 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Posture Adjustment</h4>
                            {/* 2. LIGHTER, CLEARER TEXT FONT, white ensures readability */}
                            <p className="text-sm font-bold text-white tracking-wide">{currentLiveData.guidance.back}</p>
                          </div>
                        </div>
                      )}

                      {/* Leg Correction Card */}
                      {currentLiveData.guidance.leg && (
                        <div className="backdrop-blur-xl bg-zinc-800/90 border border-zinc-600/50 p-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all hover:bg-zinc-800">
                          <div className="bg-orange-500/20 text-orange-400 p-2 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Leg Position</h4>
                            <p className="text-sm font-bold text-white tracking-wide">{currentLiveData.guidance.leg}</p>
                          </div>
                        </div>
                      )}
                      
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Final Scores Footer */}
            <div className="bg-zinc-950 p-6 grid grid-cols-3 divide-x divide-zinc-800">
              <div className="text-center">
                <div className="text-sm text-zinc-500 font-bold uppercase tracking-widest mb-1">Back Score</div>
                <div className="text-3xl font-black text-orange-500">{telemetryData.averages?.back_avg}%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-zinc-500 font-bold uppercase tracking-widest mb-1">Leg Score</div>
                <div className="text-3xl font-black text-green-400">{telemetryData.averages?.leg_avg}%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-zinc-500 font-bold uppercase tracking-widest mb-1">Arm Score</div>
                <div className="text-3xl font-black text-sky-400">{telemetryData.averages?.arm_avg}%</div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  CheckCircle2,
  X,
  RefreshCw
} from "lucide-react";

interface OfficialVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VIDEO_SOURCES = [
  "/correio-digital-angola.mp4",
  "/Correio%20Digital%20Angola.mp4",
  "/Correio%20Digital%20Angola%20(online-video-cutter.com).mp4",
  "/Apresentacao%20Correio%20Digital%20Angola.mp4"
];

export default function OfficialVideoModal({ isOpen, onClose }: OfficialVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(66.7);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [videoSrcIndex, setVideoSrcIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close handler that safely stops playback
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  };

  // Keyboard shortcut (ESC) & Spacebar play/pause
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
      if (e.key === " " && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        togglePlay();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Video AutoPlay whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setHasError(false);
      setVideoSrcIndex(0);
      
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.volume = volume;
          videoRef.current.muted = isMuted;
          
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((err) => {
                console.log("Unmuted autoplay restricted, attempting muted playback...", err);
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  setIsMuted(true);
                  videoRef.current.play()
                    .then(() => {
                      setIsPlaying(true);
                    })
                    .catch((e) => {
                      console.log("Autoplay paused by browser policy:", e);
                      setIsPlaying(false);
                    });
                }
              });
          }
        }
      }, 60);

      return () => clearTimeout(timer);
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    setHasUserInteracted(true);
    if (videoRef.current.paused) {
      if (isMuted && !hasUserInteracted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 66.7);
      setHasError(false);
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
    if (!nextMuted && (volume === 0 || videoRef.current.volume === 0)) {
      setVolume(1);
      videoRef.current.volume = 1;
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleVideoError = () => {
    if (videoSrcIndex < VIDEO_SOURCES.length - 1) {
      setVideoSrcIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const retryPlayback = () => {
    setHasError(false);
    setVideoSrcIndex(0);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="official-video-modal" 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop with click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-neutral-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col z-10 max-h-[95vh]"
          >
            {/* Modal Top Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-800 bg-neutral-900/95 relative z-30">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shrink-0 shadow-lg shadow-red-650/20 border border-red-500/30 bg-neutral-950 flex items-center justify-center p-1 group">
                  <img
                    src="https://i.postimg.cc/P572qh2f/Icone-Correio-Angola.jpg"
                    alt="Correio Digital Angola Logomarca"
                    width="40"
                    height="40"
                    className="w-full h-full object-contain object-center rounded-md transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase">
                      Vídeo Oficial • Correio Digital Angola
                    </h3>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                      HD Oficial
                    </span>
                  </div>
                  <p className="text-gray-400 text-[10px] sm:text-[11px] font-medium hidden sm:block">
                    Apresentação Institucional & Inclusão Tecnológica
                  </p>
                </div>
              </div>

              {/* Close (X) button at top right */}
              <button
                onClick={handleClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-800/80 hover:bg-red-600 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-neutral-700/60 shadow-md active:scale-95 group"
                aria-label="Fechar Vídeo"
                title="Fechar (Esc)"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Main Video Viewport */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
              {hasError ? (
                <div className="text-center p-8 text-white/70 flex flex-col items-center justify-center gap-3">
                  <p className="text-red-500 font-black text-sm uppercase tracking-widest">
                    Erro ao carregar o vídeo
                  </p>
                  <p className="text-xs text-gray-400 max-w-md">
                    Não foi possível reproduzir a stream de vídeo automaticamente.
                  </p>
                  <button
                    onClick={retryPlayback}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    <span>Tentar Novamente</span>
                  </button>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={VIDEO_SOURCES[videoSrcIndex]}
                  playsInline
                  autoPlay
                  preload="auto"
                  controls={false}
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onError={handleVideoError}
                  className="w-full h-full object-contain cursor-pointer"
                />
              )}

              {/* Muted Autoplay Warning / Unmute Helper */}
              {isMuted && isPlaying && !hasUserInteracted && !hasError && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                    setHasUserInteracted(true);
                  }}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <VolumeX size={15} />
                  <span>Activar Som</span>
                </button>
              )}

              {/* Center Play/Pause Overlay Button when paused */}
              {!isPlaying && !hasError && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-[2px] transition-all"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-650 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 hover:scale-110 active:scale-95 transition-all">
                    <Play size={32} className="fill-white ml-1.5 sm:size-10" />
                  </div>
                </div>
              )}
            </div>

            {/* Custom Video Player Controls Bar */}
            <div className="bg-neutral-950 border-t border-neutral-800/80 p-3 sm:p-4 flex flex-col gap-3">
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-bold text-gray-400 min-w-[42px] text-right">
                  {formatTime(currentTime)}
                </span>
                <div className="relative flex-1 flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={duration || 66.7}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-gray-500 min-w-[42px]">
                  {formatTime(duration || 66.7)}
                </span>
              </div>

              {/* Bottom Deck Controls */}
              <div className="flex items-center justify-between gap-4">
                {/* Left Controls: Play, Restart, Volume */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 sm:px-4 sm:py-2 rounded-xl bg-red-650 hover:bg-red-700 text-white flex items-center gap-2 font-bold text-xs sm:text-sm cursor-pointer shadow-md transition-all"
                  >
                    {isPlaying ? <Pause size={16} className="fill-white" /> : <Play size={16} className="fill-white ml-0.5" />}
                    <span className="hidden sm:inline">{isPlaying ? "Pausar" : "Reproduzir"}</span>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white border border-neutral-800 transition-all cursor-pointer"
                    title="Reiniciar Vídeo"
                  >
                    <RotateCcw size={16} />
                  </button>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title={isMuted ? "Activar Som" : "Silenciar"}
                    >
                      {isMuted || volume === 0 ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 sm:w-20 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                  </div>
                </div>

                {/* Right Controls: Badge, Fullscreen & Fechar */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <CheckCircle2 size={14} className="text-red-500" />
                    <span>Correio Digital Angola</span>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white border border-neutral-800 transition-all cursor-pointer"
                    title="Ecrã Inteiro"
                  >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>

                  <button
                    onClick={handleClose}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white border border-neutral-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    Fechar Vídeo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

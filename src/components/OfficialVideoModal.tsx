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
  Film 
} from "lucide-react";

interface OfficialVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OfficialVideoModal({ isOpen, onClose }: OfficialVideoModalProps) {
  // Primary video source
  const defaultVideoSrc = "/Correio%20Digital%20Angola.mp4";
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(66.7);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      // Tentativa de reprodução automática imediata
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Se o navegador bloquear autoplay com som, muta e inicia automaticamente garantindo exibição
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {
                setIsPlaying(false);
              });
            }
          });
      }
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
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
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
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
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-650 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                  <Film size={18} className="text-white" />
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
            </div>

            {/* Main Video Viewport */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
              <video
                ref={videoRef}
                src={defaultVideoSrc}
                playsInline
                autoPlay
                controls={false}
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-contain cursor-pointer"
              >
                <source src="/Correio%20Digital%20Angola.mp4" type="video/mp4" />
                <source src="/Correio%20Digital%20Angola%20(online-video-cutter.com).mp4" type="video/mp4" />
                <source src="/Apresentacao%20Correio%20Digital%20Angola.mp4" type="video/mp4" />
                O seu navegador não suporta a reprodução de vídeo HTML5.
              </video>

              {/* Center Play/Pause Overlay Button when paused */}
              {!isPlaying && (
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

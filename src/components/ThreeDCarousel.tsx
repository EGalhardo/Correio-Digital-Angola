import { useState, useEffect, useRef, useCallback, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface ThreeDCarouselProps {
  isPlayingAudio?: boolean;
  onPlayClick?: () => void;
}

const CARDS = [
  { img: "https://i.postimg.cc/XNmPqn6h/1.png", label: "Identificação Civil", sub: "BI & Passaporte" },
  { img: "https://i.postimg.cc/8zHwRS9x/2-mobile.png", label: "Finanças & AGT", sub: "Impostos & Guias" },
  { img: "https://i.postimg.cc/nLW42c2Z/3-Mobile.png", label: "Serviços Públicos", sub: "ENDE & EPAL" },
  { img: "https://i.postimg.cc/yxy3MVm3/4-Mobile.png", label: "Saúde & Emergência", sub: "Círculo de Confiança" },
  { img: "https://i.postimg.cc/3RgkGKbf/6-Mobile.png", label: "Cidadania Ativa", sub: "Estado & Cidadãos" },
];

const N = CARDS.length;
const ANGLE_STEP = 360 / N;
const BASE_SPEED = 48; // seconds per full rotation

export default function ThreeDCarousel({ isPlayingAudio = false, onPlayClick }: ThreeDCarouselProps) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [radius, setRadius] = useState(360);
  const [cardW, setCardW] = useState(236);
  const [cardH, setCardH] = useState(420);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const isSpinningRef = useRef(true);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const dragStartAngleRef = useRef(0);

  const updateRadius = useCallback(() => {
    const w = window.innerWidth;
    if (w < 370) {
      setCardW(116);
      setCardH(206);
      setRadius(95);
    } else if (w < 430) {
      setCardW(136);
      setCardH(242);
      setRadius(115);
    } else if (w < 540) {
      setCardW(166);
      setCardH(295);
      setRadius(140);
    } else if (w < 640) {
      setCardW(186);
      setCardH(330);
      setRadius(175);
    } else if (w < 900) {
      setCardW(206);
      setCardH(366);
      setRadius(250);
    } else {
      setCardW(236);
      setCardH(420);
      setRadius(416);
    }
  }, []);

  useEffect(() => {
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => {
      window.removeEventListener("resize", updateRadius);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [updateRadius]);

  const snapToCard = useCallback((index: number) => {
    isSpinningRef.current = false;
    const targetForCard = -index * ANGLE_STEP;
    
    setCurrentAngle((prev) => {
      let cur = prev % 360;
      if (cur < 0) cur += 360;
      let tgt = ((targetForCard % 360) + 360) % 360;
      let delta = tgt - cur;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      return prev + delta;
    });
    setActiveCard(index);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      isSpinningRef.current = true;
      lastTimestampRef.current = null;
    }, 2500);
  }, []);

  const spin = useCallback((ts: number) => {
    if (isSpinningRef.current && !isDraggingRef.current) {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = ts;
      }
      const delta = ts - (lastTimestampRef.current ?? ts);
      lastTimestampRef.current = ts;
      const degreesPerMs = 360 / (BASE_SPEED * 1000);
      
      setCurrentAngle((prev) => {
        const next = prev - degreesPerMs * delta;
        const calculatedActive = Math.round((((-next % 360) + 360) % 360) / ANGLE_STEP) % N;
        setActiveCard(calculatedActive);
        return next;
      });
    } else {
      lastTimestampRef.current = null;
    }
    requestRef.current = requestAnimationFrame(spin);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(spin);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [spin]);

  const handleMouseDown = useCallback((e: ReactMouseEvent | ReactTouchEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartAngleRef.current = currentAngle;
    isSpinningRef.current = false;
  }, [currentAngle]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const dx = x - dragStartRef.current;
    setCurrentAngle(dragStartAngleRef.current + dx * 0.45);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    
    const norm = ((-currentAngle % 360) + 360) % 360;
    const nearestIdx = Math.round(norm / ANGLE_STEP) % N;
    snapToCard(nearestIdx);
  }, [currentAngle, snapToCard]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="flex flex-col items-center">
      <div 
        className="pentagon-stage cursor-grab active:cursor-grabbing relative flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Ring */}
        <div 
          ref={ringRef}
          className="pentagon-ring relative transition-transform duration-75 ease-linear"
          style={{
            width: `${cardW}px`,
            height: `${cardH}px`,
            transform: `rotateY(${currentAngle}deg)`,
            transformStyle: "preserve-3d"
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
               className={`penta-card ${i === activeCard ? "shadow-2xl shadow-black/50 scale-105" : ""}`}
              style={{
                width: `${cardW}px`,
                height: `${cardH}px`,
                transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${radius}px)`,
                transition: "box-shadow 0.3s, transform 0.3s"
              }}
              onClick={() => snapToCard(i)}
            >
              <img src={card.img} alt={card.label} className="w-full h-full object-cover select-none pointer-events-none" loading="lazy" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>

        {/* Translucent Glass Play Button centered over the cards */}
        {onPlayClick && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPlayClick();
            }}
            className="absolute z-20 w-16 h-16 min-[380px]:w-20 min-[380px]:h-20 sm:w-28 sm:h-28 bg-white/15 hover:bg-white/30 border-[2px] sm:border-[3px] border-white backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-115 hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] active:scale-95 cursor-pointer group"
            aria-label={isPlayingAudio ? "Pausar Áudio" : "Tocar Áudio"}
          >
            {/* Intensive dual pulsing waves */}
            <div className={`absolute inset-0 rounded-full border border-white/60 pointer-events-none ${isPlayingAudio ? "animate-ping" : "group-hover:animate-ping"}`} />
            <div className={`absolute -inset-2 sm:-inset-3 rounded-full border border-red-500/40 pointer-events-none ${isPlayingAudio ? "animate-pulse [animation-duration:1s]" : "group-hover:animate-pulse [animation-duration:1.5s]"}`} />
            {isPlayingAudio ? (
              <Pause size={cardW < 140 ? 22 : cardW < 180 ? 28 : 38} fill="currentColor" className="text-white transition-transform duration-300 group-hover:scale-115" />
            ) : (
              <Play size={cardW < 140 ? 22 : cardW < 180 ? 28 : 38} fill="currentColor" className="translate-x-[2px] sm:translate-x-[3px] text-white transition-transform duration-300 group-hover:scale-115" />
            )}
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8 relative z-10">
        <button 
          className="w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-95"
          onClick={() => snapToCard((activeCard - 1 + N) % N)}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {CARDS.map((_, i) => (
            <button
              key={i}
              className={`penta-dot ${i === activeCard ? "active" : ""}`}
              onClick={() => snapToCard(i)}
            />
          ))}
        </div>

        <button 
          className="w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-95"
          onClick={() => snapToCard((activeCard + 1) % N)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

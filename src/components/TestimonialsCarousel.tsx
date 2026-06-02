import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  img: string;
  tag: string;
  title: string;
  desc: string;
  color: string;
}

const SLIDES: Slide[] = [
  {
    img: "https://i.postimg.cc/FKbn9N6r/1-CIRCULO-DE-EMERGENCIA.png",
    tag: "Saúde Pública",
    title: "Círculo de Emergência",
    desc: "Em situações críticas, a rápida identificação dos contactos do Círculo de Confiança permite agir com celeridade e salvar vidas no atendimento de urgências.",
    color: "#e21a22"
  },
  {
    img: "https://i.postimg.cc/pTXkR88G/2-FIM-DAS-FILAS-DE-ESPERA.png",
    tag: "SME & Identificação Civil",
    title: "Fim das Filas de Espera",
    desc: "Com o Correio Digital, reduzimos drasticamente as filas nos postos de Luanda. O cidadão é notificado no segundo exacto em que o seu BI ou passaporte está pronto para levantamento.",
    color: "#e21a22"
  },
  {
    img: "https://i.postimg.cc/pLJ6vP4b/3-NOTIFICACOES-FISCAIS.png",
    tag: "Finanças - AGT",
    title: "Notificações Fiscais",
    desc: "As guias oficiais e avisos passaram a ser recebidos diretamente no BI do contribuinte, de forma segura, reduzindo perdas e extravios fiscais a zero.",
    color: "#e21a22"
  },
  {
    img: "https://i.postimg.cc/fyYvvKhk/4-FATURACAO-DIRECTA.png",
    tag: "Energia - ENDE/EPAL",
    title: "Faturação Directa",
    desc: "Disponibilizamos faturas e alertas de consumo de água e luz digitalmente de forma célere, eliminando custos gigantescos de papel impresso e distribuição.",
    color: "#e21a22"
  },
  {
    img: "https://i.postimg.cc/HkvbXKy1/5-SOBERANIA-DE-ANGOLA.png",
    tag: "Governo Digital",
    title: "Soberania de Angola",
    desc: "Esta plataforma representa a verdadeira inclusão cidadã e soberania nacional, interligando a infraestrutura pública oficial aos angolanos de forma integrada.",
    color: "#e21a22"
  }
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const total = SLIDES.length;
  const autoDelay = 9000;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((index + total) % total);
    
    // Smooth reset of interval when manually clicking
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % total);
      }, autoDelay);
    }

    setTimeout(() => setIsAnimating(false), 1050);
  }, [isAnimating, total, autoDelay]);

  const next = useCallback(() => {
    if (isAnimating) return;
    setCurrent(prev => (prev + 1) % total);
  }, [isAnimating, total]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(prev => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 1050);
  }, [isAnimating, total]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, autoDelay);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, autoDelay]);

  const getPositionStyle = (index: number) => {
    let offset = index - current;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const abs = Math.abs(offset);
    const side = offset < 0 ? -1 : 1;

    if (offset === 0) {
      return {
        zIndex: 10,
        opacity: 1,
        filter: "blur(0px) brightness(1)",
        transform: "translateX(0px) translateZ(0px) scale(1) rotateY(0deg)",
      };
    }

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 1024;
    const xOffset = isMobile ? 80 : isTablet ? 180 : 280;
    const xOffset2 = isMobile ? 150 : isTablet ? 320 : 480;

    if (abs === 1) {
      return {
        zIndex: 5,
        opacity: isMobile ? 0.35 : 0.85,
        filter: isMobile ? "blur(3px) brightness(0.5)" : "blur(2.5px) brightness(0.7)",
        transform: `translateX(${side * xOffset}px) translateZ(-160px) scale(0.82) rotateY(${-side * 18}deg)`,
      };
    }

    if (abs === 2) {
      return {
        zIndex: 2,
        opacity: isMobile ? 0 : 0.45,
        filter: "blur(5px) brightness(0.5)",
        transform: `translateX(${side * xOffset2}px) translateZ(-280px) scale(0.64) rotateY(${-side * 30}deg)`,
      };
    }

    return {
      zIndex: 1,
      opacity: 0,
      filter: "blur(10px) brightness(0.3)",
      transform: `translateX(${side * (xOffset2 + 100)}px) translateZ(-350px) scale(0.5) rotateY(${-side * 40}deg)`,
    };
  };

  return (
    <div id="testemunhas" className="relative w-full overflow-hidden bg-brand-main py-24">
      {/* Main Background Image with referrerPolicy to bypass cross-origin restrictions */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/ZnFjVdPt/Logomarca-Correio-Digital-Angola-Site.jpg" 
          alt="Correio Digital Angola Background" 
          className="w-full h-full object-cover opacity-100 filter brightness-[1.25] contrast-[1.02]"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">DEPOIMENTOS</h2>
          <p className="text-amber-400 text-lg uppercase tracking-widest font-bold">Líderes angolanos que confiam no Correio Digital</p>
        </div>

        <div className="relative flex items-center justify-center h-[480px] sm:h-[520px] perspective-1000">
          {/* Navigation Buttons */}
          <button 
            onClick={prev}
            className="absolute left-2 sm:left-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md shadow-xl flex items-center justify-center text-red-650 hover:bg-white hover:scale-110 transition-all active:scale-95"
          >
            <ChevronLeft size={20} className="sm:hidden" />
            <ChevronLeft size={24} className="hidden sm:block" />
          </button>
          <button 
            onClick={next}
            className="absolute right-2 sm:right-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md shadow-xl flex items-center justify-center text-red-650 hover:bg-white hover:scale-110 transition-all active:scale-95"
          >
            <ChevronRight size={20} className="sm:hidden" />
            <ChevronRight size={24} className="hidden sm:block" />
          </button>

          {/* Cards Track */}
          <div className="relative w-[280px] sm:w-[340px] h-[400px] sm:h-[480px] preserve-3d">
            {SLIDES.map((slide, i) => {
              const pos = getPositionStyle(i);
              const isActive = i === current;
              return (
                <div
                  key={i}
                  className="absolute inset-0 rounded-[32px] overflow-hidden cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] bg-white"
                  style={{
                    ...pos,
                    transformStyle: "preserve-3d",
                    boxShadow: isActive ? "0 30px 60px -12px rgba(0,0,0,0.3)" : "0 10px 30px -10px rgba(0,0,0,0.2)"
                  }}
                  onClick={() => !isActive && goTo(i)}
                >
                  <div 
                    className={`absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-500 ${isActive ? "scale-102" : "scale-100"}`}
                    style={{ backgroundImage: `url(${slide.img})` }}
                  />

                  {/* Counter */}
                  {isActive && (
                    <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white tracking-widest uppercase">
                      {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

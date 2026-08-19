import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Landmark, CreditCard, HeartPulse, Zap, ShieldCheck, Check, Repeat, LayoutGrid, UserCheck, Brain, Users, Flame, ShieldAlert, PlayCircle, Play, X, Volume2, Maximize2, Share2, Sparkles, Languages } from "lucide-react";
import ThreeDCarousel from "../components/ThreeDCarousel";
import DownloadModal from "../components/DownloadModal";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import OfficialVideoModal from "../components/OfficialVideoModal";

const SECTORS = [
  { icon: UserCheck, title: "Identificação Civil", desc: "Monitore e receba alertas instantâneos quando o seu Bilhete de Identidade ou Passaporte de Angola estiver pronto." },
  { icon: CreditCard, title: "Finanças & AGT", desc: "Receba notificações fiscais automáticas, guias de pagamento e prazos tributários diretamente no seu endereço oficial." },
  { icon: Zap, title: "Serviços Públicos", desc: "Aceda de forma rápida às facturas digitais da ENDE e EPAL, facilitando a consulta de consumos e prazos de pagamento." },
  { icon: HeartPulse, title: "Saúde & Hospitais", desc: "Acompanhe marcações médicas, consultas, receitas e receba com total confidencialidade os seus resultados clínicos." },
  { icon: Landmark, title: "Justiça & Tribunais", desc: "Receba notificações e intimações oficiais com segurança nacional, agilizando processos administrativos civis." },
  { icon: GraduationCap, title: "Ensino & Académicos", desc: "Envio de diplomas digitais, comprovativos de inscrições e pautas homologadas para o seu endereço electrónico oficial." },
  { icon: ShieldCheck, title: "Bancos & Seguros", desc: "Validação célere de identidade cidadã para propostas de crédito e interações corporativas de alta confiança." },
  { icon: ShieldAlert, title: "Inclusão Social", desc: "Tecnologia inclusiva que assegura a literacia digital e a participação de todos no ecossistema do país." },
  { icon: Users, title: "Círculo de Confiança", desc: "Suporte prioritário na rápida identificação e alerta dos contactos de segurança em acidentes ou emergência." },
];

interface Plan {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Cidadão",
    price: "0",
    features: [
      "Caixa de Correspondência Digital",
      "Vinculação ao Bilhete de Identidade",
      "Notificações do SME, AGT e ENDE",
      "Acesso por Biometria ou PIN Seguro",
      "Assistente IA e Suporte por Voz",
      "Configuração do Círculo de Confiança"
    ],
  },
  {
    name: "Governamental",
    price: "Estatal",
    features: [
      "Volume Ilimitado de Notificações Oficiais",
      "Interoperabilidade total entre órgãos",
      "Hospedagem em ambiente nacional blindado",
      "Mecanismos de inclusão assistida por voz",
      "Gestor robusto de correspondência",
      "Rastreamento legal para auditorias"
    ],
  },
  {
    name: "Privado",
    price: "15.000",
    features: [
      "Volume Ilimitado de Notificações Oficiais",
      "Interoperabilidade total entre órgãos",
      "Hospedagem em ambiente nacional blindado",
      "Mecanismos de inclusão assistida por voz",
      "Gestor robusto de correspondência"
    ],
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlayingAudio(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio("/Apresentacao Correio Digital Angola.mp3");
        audioRef.current.onended = () => {
          setIsPlayingAudio(false);
        };
      }

      audioRef.current.play()
        .then(() => {
          setIsPlayingAudio(true);
        })
        .catch((error) => {
          console.error("Erro ao reproduzir o áudio:", error);
        });
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isVideoOpen) {
      if (audioRef.current && isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }
      interval = setInterval(() => {
        setDemoStep((prev) => (prev + 1) % 4);
      }, 4200);
    } else {
      setDemoStep(0);
    }
    return () => clearInterval(interval);
  }, [isVideoOpen, isPlayingAudio]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div id="top" className="flex flex-col w-full">
      {/* Hero Section */}
      <section id="inicio" className="bg-brand-main relative overflow-hidden pt-20 pb-24 w-full">
        {/* Main Background Image with referrerPolicy to bypass cross-origin restrictions */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/ZnFjVdPt/Logomarca-Correio-Digital-Angola-Site.jpg" 
            alt="Correio Digital Angola Background" 
            className="w-full h-full object-cover opacity-100 filter brightness-[1.25] contrast-[1.02]"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Decorative elements */}
        <div className="absolute top-[-64px] left-[-80px] w-[336px] h-[336px] rounded-full bg-red-650/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-48px] right-[-64px] w-[304px] h-[304px] rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center z-10 relative pt-10">
          <ThreeDCarousel isPlayingAudio={isPlayingAudio} onPlayClick={handlePlayAudio} />
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-50 border-y border-gray-100 py-6 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 w-full">
            {[
              { icon: UserCheck, label: "BI como Endereço" },
              { icon: ShieldCheck, label: "Canais Verificados" },
              { icon: Zap, label: "Notificação Digital" },
              { icon: Brain, label: "Suporte com IA" },
              { icon: Users, label: "Círculo de Confiança" },
              { icon: Languages, label: "Línguas Nacionais" }
            ].map((f, i) => (
              <div 
                key={i} 
                className="w-full flex flex-col items-center gap-2.5 group p-3 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-red-600/5 hover:-translate-y-1 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-red-600 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-transparent group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                  <f.icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-[11px] font-bold text-gray-700 group-hover:text-red-600 transition-colors uppercase tracking-tight text-center">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section id="sectores" className="py-14 md:py-20 w-full bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 tracking-tight uppercase">SECTORES INTEGRADOS</h2>
            <p className="text-gray-600 text-xs md:text-sm max-w-2xl mx-auto">Modernização e comunicação inteligente adaptada à realidade angolana.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {SECTORS.map((s, i) => (
               <div key={i} className="sector-card group">
                 <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4 text-red-600 shadow-sm transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-transparent group-hover:scale-110">
                   <s.icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                 </div>
                 <h3 className="font-extrabold text-gray-900 text-base mb-2 tracking-tight uppercase">{s.title}</h3>
                 <p className="text-gray-600 text-xs leading-relaxed">{s.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Summary */}
      <section id="como-funciona" className="py-20 sm:py-24 md:py-28 lg:py-36 bg-brand-main text-white relative overflow-hidden flex items-center justify-center min-h-[620px] md:min-h-[700px] lg:min-h-[760px] w-full">
        {/* Main Background Image with centered fitting */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/ZnFjVdPt/Logomarca-Correio-Digital-Angola-Site.jpg" 
            alt="Correio Digital Angola Background" 
            className="w-full h-full object-cover object-center opacity-100 filter brightness-[1.15] contrast-[1.03]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Central Content Box - Aligned with Header Grid */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center justify-center my-auto">
          {/* Centered Heading */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-white">
              COMO FUNCIONA
            </h2>
          </div>

          {/* 3 Centered Step Cards styled like the 3D Carousel Play button */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 w-full">
            {/* Step 1 */}
            <div className="how-card group bg-white/15 hover:bg-white/25 border-[2px] sm:border-[3px] border-white backdrop-blur-md text-white rounded-2xl p-6 sm:p-7 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_55px_rgba(255,255,255,0.45)] hover:scale-[1.02] transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-10 h-10 bg-white/20 border-2 border-white/80 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:text-red-600 transition-all duration-300">
                <UserCheck size={19} />
              </div>
              <h3 className="text-base sm:text-lg font-black mb-2 uppercase tracking-wide text-white drop-shadow-md">
                1. REGISTO E ACESSO
              </h3>
              <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-medium">
                Associe a sua conta ao Número do Bilhete de Identidade com validação facial ou PIN.
              </p>
            </div>

            {/* Step 2 */}
            <div className="how-card group bg-white/15 hover:bg-white/25 border-[2px] sm:border-[3px] border-white backdrop-blur-md text-white rounded-2xl p-6 sm:p-7 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_55px_rgba(255,255,255,0.45)] hover:scale-[1.02] transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-10 h-10 bg-white/20 border-2 border-white/80 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:text-red-600 transition-all duration-300">
                <LayoutGrid size={19} />
              </div>
              <h3 className="text-base sm:text-lg font-black mb-2 uppercase tracking-wide text-white drop-shadow-md">
                2. CAIXA DE ENTRADA
              </h3>
              <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-medium">
                Receba documentos e notificações oficiais e interaja com canais de comunicação verificados.
              </p>
            </div>

            {/* Step 3 */}
            <div className="how-card group bg-white/15 hover:bg-white/25 border-[2px] sm:border-[3px] border-white backdrop-blur-md text-white rounded-2xl p-6 sm:p-7 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_55px_rgba(255,255,255,0.45)] hover:scale-[1.02] transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-10 h-10 bg-white/20 border-2 border-white/80 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:text-red-600 transition-all duration-300">
                <Brain size={19} />
              </div>
              <h3 className="text-base sm:text-lg font-black mb-2 uppercase tracking-wide text-white drop-shadow-md">
                3. SUPORTE COM IA
              </h3>
              <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-medium">
                Utilize o auxílio de IA inteligente com suporte por voz para traduzir termos administrativos complexos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="planos" className="py-14 md:py-20 w-full bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 tracking-tight uppercase">PARCERIAS & ADESÃO</h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">Sustentabilidade e inclusão digital real para todos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {PLANS.map((p, i) => (
              <div 
                key={i} 
                className={`group border-2 rounded-xl sm:rounded-[26px] p-5 md:p-6 lg:p-7 transition-all hover:-translate-y-1.5 hover:shadow-2xl relative select-none
                  ${p.popular 
                    ? "bg-white border-red-600 shadow-xl shadow-red-600/10" 
                    : "bg-white border-gray-300 hover:border-red-400"
                  }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-black px-5 py-1 rounded-full shadow-xl tracking-widest uppercase bg-red-600 text-white">
                    MAIS POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-black mb-3 uppercase tracking-wider text-gray-900">
                    {p.name.toUpperCase()}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1.5">
                    {p.price === "0" ? (
                      <span className="text-2xl font-black text-red-600">
                        Gratuito
                      </span>
                    ) : p.price === "Estatal" ? (
                      <span className="text-xl font-black uppercase tracking-tight text-red-600">
                        Acordo Estatal
                      </span>
                    ) : (
                      <>
                        <span className="text-3xl font-black text-red-600">
                          {p.price}
                        </span>
                        <div className="text-left">
                          <span className="block font-bold text-[11px] leading-none text-gray-900">
                            Kz
                          </span>
                          <span className="font-bold text-[9px] uppercase tracking-tight text-gray-500">
                            /mês
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-1.5">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex gap-2.5 text-xs font-bold text-gray-800">
                      <Check 
                        size={15} 
                        className="shrink-0 rounded-full p-0.5 animate-pulse text-red-600 bg-red-50" 
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section (Testemunha) */}
      <section>
        <TestimonialsCarousel />
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="max-w-3xl w-full flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-red-600 mb-6 tracking-tight uppercase">PRONTO PARA O FUTURO DE ANGOLA?</h2>
            <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed font-semibold italic max-w-xl">
              “Junte-se ao novo paradigma de governação digital e inclusão cidadã através de uma comunicação oficial célere, inteligente e totalmente segura.”
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
              <a 
                href="https://correio-digital-angola-oficial.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[320px] sm:w-80 md:w-96 inline-flex items-center justify-center gap-3 bg-red-600 text-white font-black text-base sm:text-lg px-8 py-4 sm:py-4.5 rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 tracking-wider uppercase cursor-pointer text-center"
              >
                Entrar
              </a>
              <button 
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="w-full max-w-[320px] sm:w-80 md:w-96 inline-flex items-center justify-center gap-3 bg-black text-white font-black text-base sm:text-lg px-8 py-4 sm:py-4.5 rounded-2xl hover:bg-neutral-800 transition-all shadow-xl shadow-black/25 hover:scale-105 active:scale-95 tracking-wider uppercase cursor-pointer text-center"
              >
                Vídeo
              </button>
            </div>
          </div>
        </div>
      </section>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Official Video Presentation Modal */}
      <OfficialVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}

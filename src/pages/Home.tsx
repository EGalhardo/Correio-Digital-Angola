import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Landmark, CreditCard, HeartPulse, Zap, ShieldCheck, Check, Repeat, LayoutGrid, UserCheck, Brain, Users, Flame, ShieldAlert, PlayCircle, Play, X, Volume2, Maximize2, Share2, Sparkles, Languages } from "lucide-react";
import ThreeDCarousel from "../components/ThreeDCarousel";
import DownloadModal from "../components/DownloadModal";
import PlanActivationModal from "../components/PlanActivationModal";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

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
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[0] | null>(null);
  const [activePlanIndex, setActivePlanIndex] = useState<number | null>(null);
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
      interval = setInterval(() => {
        setDemoStep((prev) => (prev + 1) % 4);
      }, 4200);
    } else {
      setDemoStep(0);
    }
    return () => clearInterval(interval);
  }, [isVideoOpen]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const openPlanModal = (plan: typeof PLANS[0]) => {
    setSelectedPlan(plan);
    setIsPlanModalOpen(true);
  };

  return (
    <div id="top" className="flex flex-col w-full">
      {/* Hero Section */}
      <section id="inicio" className="bg-brand-main relative overflow-hidden pt-28 pb-32 px-6">
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
        <div className="absolute top-[-80px] left-[-100px] w-[420px] h-[420px] rounded-full bg-red-650/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-80px] w-[380px] h-[380px] rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center z-10 relative pt-12">
          <ThreeDCarousel isPlayingAudio={isPlayingAudio} onPlayClick={handlePlayAudio} />
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-50 border-y border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
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
                className="w-full flex flex-col items-center gap-4 group p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-red-600/5 hover:-translate-y-2 cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-red-600 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-transparent group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                  <f.icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-red-600 transition-colors uppercase tracking-tight text-center">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section id="sectores" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight uppercase">SECTORES INTEGRADOS</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">Modernização e comunicação inteligente adaptada à realidade angolana.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SECTORS.map((s, i) => (
             <div key={i} className="sector-card group">
               <div className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-6 text-red-600 shadow-sm transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-transparent group-hover:scale-110">
                 <s.icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
               </div>
               <h3 className="font-extrabold text-gray-900 text-xl mb-3 tracking-tight uppercase">{s.title}</h3>
               <p className="text-gray-800 text-base leading-relaxed">{s.desc}</p>
             </div>
          ))}
        </div>
      </section>

      {/* How it Works Summary */}
      <section id="como-funciona" className="py-24 bg-brand-main text-white relative overflow-hidden">
        {/* Main Background Image with referrerPolicy to bypass cross-origin restrictions */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/ZnFjVdPt/Logomarca-Correio-Digital-Angola-Site.jpg" 
            alt="Correio Digital Angola Background" 
            className="w-full h-full object-cover opacity-100 filter brightness-[1.25] contrast-[1.02]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-20 tracking-tight uppercase">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="how-card group">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl group-hover:scale-110 transition-transform">
                <UserCheck size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-wide">1. Registo e Acesso</h3>
              <p className="text-red-100/90 text-lg leading-relaxed">Associe a sua conta ao Número do Bilhete de Identidade com validação facial ou PIN.</p>
            </div>
            <div className="how-card group">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl group-hover:scale-110 transition-transform">
                <LayoutGrid size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-wide">2. Caixa de Entrada</h3>
              <p className="text-red-100/90 text-lg leading-relaxed">Receba documentos e notificações oficiais e interaja com canais de comunicação verificados.</p>
            </div>
            <div className="how-card group">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl group-hover:scale-110 transition-transform">
                <Brain size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-wide">3. Suporte com IA</h3>
              <p className="text-red-100/90 text-lg leading-relaxed">Utilize o auxílio de IA inteligente com suporte por voz para traduzir termos administrativos complexos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="planos" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight uppercase">PARCERIAS & ADESÃO</h2>
          <p className="text-gray-700 text-xl max-w-2xl mx-auto">Sustentabilidade e inclusão digital real para todos.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto px-2">
          {PLANS.map((p, i) => (
            <div 
              key={i} 
              onClick={() => {
                setActivePlanIndex(i);
                openPlanModal(p);
              }}
              className={`group border-2 rounded-3xl sm:rounded-[40px] p-6 md:p-5 lg:p-10 transition-all hover:-translate-y-3 hover:shadow-3xl relative cursor-pointer
                ${activePlanIndex === i 
                  ? "bg-red-600 border-red-600 text-white shadow-2xl shadow-red-600/30" 
                  : p.popular 
                    ? "bg-white border-gray-200 hover:border-red-650 shadow-2xl shadow-red-650/10" 
                    : "bg-white border-gray-100 hover:border-red-400"
                }`}
            >
              {p.popular && (
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-black px-8 py-2 rounded-full shadow-xl tracking-widest uppercase transition-colors duration-300
                  ${activePlanIndex === i 
                    ? "bg-white text-red-600 border border-white" 
                    : "bg-red-600 text-white"
                  }`}
                >
                  MAIS POPULAR
                </div>
              )}
              <div className="text-center mb-10">
                <h3 className={`text-2xl font-black mb-6 uppercase tracking-wider transition-colors duration-300
                  ${activePlanIndex === i ? "text-white" : "text-gray-900"}`}
                >
                  {p.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  {p.price === "0" ? (
                    <span className={`text-4xl font-black transition-colors duration-300
                      ${activePlanIndex === i ? "text-white" : "text-red-600"}`}
                    >
                      Gratuito
                    </span>
                  ) : p.price === "Estatal" ? (
                    <span className={`text-3xl font-black uppercase tracking-tight transition-colors duration-300
                      ${activePlanIndex === i ? "text-white" : "text-red-600"}`}
                    >
                      Acordo Estatal
                    </span>
                  ) : (
                    <>
                      <span className={`text-5xl font-black transition-colors duration-300
                        ${activePlanIndex === i ? "text-white" : "text-red-600"}`}
                      >
                        {p.price}
                      </span>
                      <div className="text-left">
                        <span className={`block font-bold text-sm transition-colors duration-300
                          ${activePlanIndex === i ? "text-white" : "text-gray-900"}`}
                        >
                          Kz
                        </span>
                        <span className={`font-bold text-xs uppercase tracking-tight transition-colors duration-300
                          ${activePlanIndex === i ? "text-red-100" : "text-gray-500"}`}
                        >
                          /mês
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <ul className="space-y-5 mb-4">
                {p.features.map((f, fi) => (
                  <li key={fi} className={`flex gap-4 text-base font-bold transition-colors duration-300
                    ${activePlanIndex === i ? "text-white" : "text-gray-800"}`}
                  >
                    <Check 
                      size={20} 
                      className={`shrink-0 rounded-full p-0.5 animate-pulse transition-colors duration-300
                        ${activePlanIndex === i 
                          ? "text-red-600 bg-white" 
                          : "text-red-600 bg-red-50"
                        }`} 
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section (Testemunha) */}
      <section>
        <TestimonialsCarousel />
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
          <h2 className="text-5xl font-black text-red-650 mb-8 tracking-tight uppercase">Pronto para o Futuro de Angola?</h2>
          <div className="max-w-2xl w-full">
            <p className="text-gray-800 text-xl mb-12 leading-relaxed font-semibold italic">
              "Junte-se ao novo paradigma de governação digital e inclusão cidadã através de uma comunicação oficial célere, inteligente e totalmente segura."
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById("contacto");
                if (element) {
                  const headerOffset = 120;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
              className="w-full inline-flex items-center justify-center gap-4 bg-red-600 text-white font-black text-xl px-10 py-6 rounded-3xl hover:bg-red-700 transition-all shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 tracking-wide uppercase cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </div>
      </section>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {selectedPlan && (
        <PlanActivationModal 
          isOpen={isPlanModalOpen} 
          onClose={() => setIsPlanModalOpen(false)} 
          planName={selectedPlan.name} 
          planPrice={selectedPlan.price} 
        />
      )}

      {/* Interactive Video Demonstration Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <div id="video-demo-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-neutral-950 border border-neutral-800/80 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative z-10 flex flex-col"
            >
              {/* Player Top Nav Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-neutral-950/90 relative z-25">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-650 animate-pulse" />
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest font-mono">DEMO OFICIAL // CORREIO DIGITAL ANGOLA</span>
                </div>
                <button 
                  onClick={() => setIsVideoOpen(false)}
                  className="rounded-full bg-neutral-900 border border-neutral-800 p-2 text-gray-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Player Main Simulated Screen */}
              <div className="relative aspect-video w-full bg-neutral-950 flex flex-col items-center justify-center p-8 overflow-hidden min-h-[360px] sm:min-h-[420px]">
                {/* Background ambient mesh */}
                <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-red-600/5 blur-[120px] pointer-events-none -translate-y-1/2" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />
                
                {/* Simulated active stage using current demoStep */}
                <AnimatePresence mode="wait">
                  {demoStep === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center text-center max-w-md w-full relative z-10"
                    >
                      <span className="text-[10px] font-black tracking-widest text-[#B87A14] uppercase mb-4">PASSO 01 / AUTENTICAÇÃO NACIONAL</span>
                      <h4 className="text-xl sm:text-2xl font-black text-white mb-6 uppercase tracking-tight">Acesso por Identificação Única</h4>
                      
                      {/* Interactive Fingerprint/ID scan Mockup */}
                      <div className="w-32 h-32 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center relative shadow-inner shadow-black/60 mb-6">
                        <div className="absolute inset-x-4 top-1/2 h-[2px] bg-red-500 animate-bounce shadow-lg shadow-red-500/50" />
                        <UserCheck size={48} className="text-red-500 animate-pulse" />
                      </div>
                      
                      <div className="bg-neutral-900/50 border border-neutral-800/40 rounded-2xl px-5 py-3 w-full backdrop-blur-sm">
                        <p className="text-xs text-gray-400 font-mono text-center">USUÁRIO: <span className="text-white font-bold font-sans">Nº BI DOC 001239...</span></p>
                        <p className="text-[10px] text-green-400 font-mono mt-1 uppercase tracking-wider text-center animate-pulse">● Autenticado através da rede segura</p>
                      </div>
                    </motion.div>
                  )}

                  {demoStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center text-center max-w-md w-full relative z-10"
                    >
                      <span className="text-[10px] font-black tracking-widest text-[#B87A14] uppercase mb-4">PASSO 02 / ENDEREÇO OFICIAL</span>
                      <h4 className="text-xl sm:text-2xl font-black text-white mb-6 uppercase tracking-tight">O Seu Endereço Digital Único</h4>
                      
                      {/* Orbiting Envelope/Box simulation */}
                      <div className="w-48 h-32 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col items-center justify-center relative mb-6 p-4">
                        <Repeat size={36} className="text-[#B87A14] animate-spin [animation-duration:8s] mb-2" />
                        <span className="text-xs font-mono font-black text-white uppercase tracking-wider">001234567LA8.correio.ao</span>
                      </div>
                      
                      <div className="bg-neutral-900/50 border border-neutral-800/40 rounded-2xl px-5 py-3 w-full backdrop-blur-sm">
                        <p className="text-xs text-gray-300 font-bold">Vínculo automático entre o cidadão e a administração central, garantindo canal exclusivo.</p>
                      </div>
                    </motion.div>
                  )}

                  {demoStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center text-center max-w-lg w-full relative z-10"
                    >
                      <span className="text-[10px] font-black tracking-widest text-[#B87A14] uppercase mb-4">PASSO 03 / NOTIFICAÇÃO CÉLERE</span>
                      <h4 className="text-xl sm:text-2xl font-black text-white mb-6 uppercase tracking-tight">Receber Cartas e Avisos do Estado</h4>
                      
                      {/* Timeline flow */}
                      <div className="space-y-3 w-full mb-6">
                        <div className="flex items-center justify-between border border-neutral-800 bg-neutral-900/60 p-4 rounded-2xl text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-650/15 border border-red-500/20 flex items-center justify-center text-red-500 font-black text-xs font-sans">AGT</div>
                            <div>
                              <p className="text-xs font-bold text-white uppercase tracking-tight">Imposto Predial Urbano</p>
                              <p className="text-[10px] text-gray-400">Guia de pagamento emitida com código de barras.</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-[#B87A14] uppercase font-bold px-2.5 py-1 rounded bg-amber-500/5 border border-amber-500/20">Recebido</span>
                        </div>

                        <div className="flex items-center justify-between border border-neutral-800 bg-neutral-900/60 p-4 rounded-2xl text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black text-xs font-sans">SME</div>
                            <div>
                              <p className="text-xs font-bold text-white uppercase tracking-tight">Passaporte Pronto</p>
                              <p className="text-[10px] text-gray-400">Levantamento disponível no posto de atendimento.</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-green-400 uppercase font-bold px-2.5 py-1 rounded bg-green-500/5 border border-green-500/20">Novo</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {demoStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center text-center max-w-md w-full relative z-10"
                    >
                      <span className="text-[10px] font-black tracking-widest text-[#B87A14] uppercase mb-4">PASSO 04 / ASSISTÊNCIA INTEGRAL COM IA</span>
                      <h4 className="text-xl sm:text-2xl font-black text-white mb-6 uppercase tracking-tight">Inclusão Total por Teclado e Voz</h4>
                      
                      {/* Wave anim placeholder */}
                      <div className="flex items-center justify-center gap-1.5 h-12 mb-6 font-sans">
                        {[0.8, 1.4, 0.5, 1.2, 1.6, 0.9, 1.3, 0.6, 1.1, 0.4].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ scaleY: [1, 1.8, 1] }}
                            transition={{ repeat: Infinity, duration: h * 1.5, ease: "easeInOut" }}
                            className="w-1.5 h-6 bg-gradient-to-t from-red-650 to-red-400 rounded-full origin-center"
                          />
                        ))}
                      </div>
                      
                      <div className="bg-neutral-900/50 border border-neutral-800/40 rounded-2xl px-5 py-4 w-full backdrop-blur-sm text-center">
                        <p className="text-xs text-white leading-relaxed italic font-semibold">
                          "Olá, o seu novo imposto da AGT está pronto. Quer que eu leia os detalhes do documento para si?"
                        </p>
                        <p className="text-[9px] text-[#B87A14] font-bold uppercase tracking-widest mt-2 font-mono">SÍNTESE DE VOZ INTERACTIVA ACTIVADA</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Player Bottom Control Deck */}
              <div className="bg-neutral-950 border-t border-neutral-900 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Timeline and Navigation Dots for Steps */}
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3].map((step) => (
                    <button
                      key={step}
                      onClick={() => setDemoStep(step)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        demoStep === step 
                          ? "w-8 bg-red-650" 
                          : "w-2.5 bg-neutral-800 hover:bg-neutral-750"
                      }`}
                      title={`Passo ${step + 1}`}
                    />
                  ))}
                  <span className="text-[10px] font-black text-gray-500 font-mono uppercase tracking-widest ml-4">
                    PASSO {demoStep + 1} DE 4
                  </span>
                </div>

                {/* Simulated playback visual controls */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Volume2 size={16} />
                    <div className="w-16 h-1 bg-red-650 rounded" />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 font-bold uppercase tracking-tight">
                    0{demoStep + 1}:00 / 04:00
                  </span>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Maximize2 size={16} className="hover:text-white cursor-pointer transition-colors" />
                    <Share2 size={16} className="hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

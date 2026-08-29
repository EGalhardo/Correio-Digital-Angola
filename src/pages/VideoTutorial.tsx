import { useState } from "react";
import { PlayCircle, ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import OfficialVideoModal from "../components/OfficialVideoModal";

const LOGO_CORREIO_ANGOLA = "https://i.postimg.cc/ZnFjVdPt/Logomarca-Correio-Digital-Angola-Site.jpg";

const TUTORIALS = [
  {
    id: 1,
    title: "Apresentação Oficial • Correio Digital Angola",
    description: "Conheça a plataforma oficial de correspondência e inclusão digital para todos os cidadãos e instituições de Angola.",
    videoUrl: "/correio-digital-angola.mp4",
    duration: "1:07",
    color: "red",
    featured: true,
    thumbnail: LOGO_CORREIO_ANGOLA
  },
  {
    id: 2,
    title: "Como Activar e Associar o seu BI",
    description: "Siga o passo a passo para associar o seu número de BI de forma segura e rápida.",
    videoUrl: "/correio-digital-angola.mp4",
    duration: "1:10",
    color: "red",
    thumbnail: LOGO_CORREIO_ANGOLA
  },
  {
    id: 3,
    title: "Como Importar a Sua Licença ou Token",
    description: "Aprenda a carregar o ficheiro de licença (.lic) recebido pelo suporte técnico oficial.",
    videoUrl: "/correio-digital-angola.mp4",
    duration: "0:22",
    color: "orange",
    thumbnail: LOGO_CORREIO_ANGOLA
  },
  {
    id: 4,
    title: "Como Configurar Canais e Notificações",
    description: "Crie ou parametrise canais dedicados para receber notificações de forma organizada.",
    videoUrl: "/correio-digital-angola.mp4",
    duration: "2:41",
    color: "rose",
    thumbnail: LOGO_CORREIO_ANGOLA
  },
  {
    id: 5,
    title: "Como Obter a Sua Licença Especial",
    description: "Saiba como solicitar o acesso a recursos avançados e canais exclusivos integrados.",
    videoUrl: "/correio-digital-angola.mp4",
    duration: "0:24",
    color: "amber",
    thumbnail: LOGO_CORREIO_ANGOLA
  },
  {
    id: 6,
    title: "Consulta de Correspondência em Lote",
    description: "Aumente a facilidade na gestão local de múltiplas guias e notificações oficiais.",
    videoUrl: "/correio-digital-angola.mp4",
    duration: "2:41",
    color: "orange",
    thumbnail: LOGO_CORREIO_ANGOLA
  },
  {
    id: 7,
    title: "Visão Geral do Painel de Controlo",
    description: "Conheça todas as ferramentas de monitorização, canais de órgãos e logs seguros.",
    videoUrl: "/correio-digital-angola.mp4",
    duration: "2:10",
    color: "rose",
    thumbnail: LOGO_CORREIO_ANGOLA
  },
  {
    id: 8,
    title: "Segurança de Acesso e Biometria",
    description: "Actualize os dados de emparelhamento do seu dispositivo móvel e preferências de PIN.",
    videoUrl: "/correio-digital-angola.mp4",
    duration: "0:43",
    color: "amber",
    thumbnail: LOGO_CORREIO_ANGOLA
  }
];

const COLOR_MAP: Record<string, { bg: string, text: string }> = {
  red: { bg: "bg-red-50", text: "text-red-650" },
  orange: { bg: "bg-orange-50", text: "text-orange-600" },
  rose: { bg: "bg-rose-50", text: "text-rose-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" }
};

export default function VideoTutorial() {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(TUTORIALS[0]);

  const featuredTutorial = TUTORIALS.find(t => t.featured) || TUTORIALS[0];
  const otherTutorials = TUTORIALS.filter(t => t.id !== featuredTutorial.id);

  const openTutorialVideo = (tutorial: typeof TUTORIALS[0]) => {
    setSelectedTutorial(tutorial);
    setIsVideoOpen(true);
  };

  return (
    <main id="videotutorial-container" className="flex-grow max-w-7xl mx-auto w-full px-6 pt-12 pb-24 min-h-screen">
      <div className="mb-10 flex items-center gap-4">
        <button 
          onClick={() => navigate("/")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer group"
          title="Voltar para Início"
        >
          <ArrowLeft size={28} className="text-gray-900 group-hover:scale-110 transition-transform" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 leading-none">Vídeo Tutoriais</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">
            Aprenda a dominar o Correio Digital
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {/* Featured Video Card */}
        <section className="bg-white rounded-[40px] border-2 border-gray-200 p-8 shadow-xl shadow-gray-200/20 hover:border-gray-300 transition-colors">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-650 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-red-100">
              <span className="text-xs">✦</span> Recomendado para iniciantes
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-200">
                  <PlayCircle size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-2">{featuredTutorial.title}</h2>
                  <p className="text-gray-500 font-medium max-w-xl">{featuredTutorial.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 bg-gray-50 px-6 py-4 rounded-[30px] border-2 border-gray-200">
                <div className="text-center">
                  <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Duração</p>
                  <p className="text-gray-900 font-black text-lg">{featuredTutorial.duration}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => openTutorialVideo(featuredTutorial)}
                  className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Play size={14} fill="currentColor" /> Assistir Agora
                </button>
              </div>
            </div>
          </div>

          <div 
            onClick={() => openTutorialVideo(featuredTutorial)}
            className="relative aspect-video rounded-[32px] overflow-hidden bg-neutral-900 group shadow-inner border-2 border-gray-200 cursor-pointer"
          >
            <img 
              src={featuredTutorial.thumbnail} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt={featuredTutorial.title}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/25 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 border border-white/40 shadow-2xl">
                <Play size={40} fill="currentColor" className="ml-1" />
              </div>
            </div>
          </div>
        </section>

        {/* Video Grid */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Outros Tutoriais</h3>
            <div className="h-px bg-gray-100 flex-grow" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherTutorials.map((tutorial) => {
              const colors = COLOR_MAP[tutorial.color] || COLOR_MAP.red;
              return (
                <motion.div 
                  key={tutorial.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[32px] border-2 border-gray-200 overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-2xl transition-all group cursor-pointer"
                  onClick={() => openTutorialVideo(tutorial)}
                >
                  <div 
                    className="relative aspect-video overflow-hidden bg-neutral-900 cursor-pointer"
                  >
                    <img 
                      src={tutorial.thumbnail} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={tutorial.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-black">
                      {tutorial.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-2xl">
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${colors.bg.replace('50', '500')}`} />
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Hardware / Software</span>
                    </div>
                    <h3 className="font-black text-gray-900 text-sm leading-tight mb-2 group-hover:text-red-650 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-500 text-[11px] font-medium leading-relaxed flex-grow">
                      {tutorial.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Official Video Modal for Correio Digital Angola */}
      {isVideoOpen && (
        <OfficialVideoModal 
          isOpen={isVideoOpen} 
          onClose={() => setIsVideoOpen(false)}
          title={selectedTutorial.title}
          subtitle={selectedTutorial.description}
          videoUrl={selectedTutorial.videoUrl}
        />
      )}
    </main>
  );
}

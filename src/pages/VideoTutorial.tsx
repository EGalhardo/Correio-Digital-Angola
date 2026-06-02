import { useState } from "react";
import { PlayCircle, ArrowLeft, Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const TUTORIALS = [
  {
    id: 1,
    title: "Como Activar e Associar o seu BI",
    description: "Siga o passo a passo para associar o seu número de BI de forma segura e rápida.",
    videoUrl: "/Activacao Oficial.mp4",
    duration: "1:10",
    color: "red",
    thumbnail: "https://i.postimg.cc/t4DsrvjV/Imagem-video.jpg"
  },
  {
    id: 2,
    title: "Como Importar a Sua Licença ou Token",
    description: "Aprenda a carregar o ficheiro de licença (.lic) recebido pelo suporte técnico oficial.",
    videoUrl: "/Activacao Via Ficheiro Oficial.mp4",
    duration: "0:22",
    color: "orange",
    thumbnail: "https://i.postimg.cc/t4DsrvjV/Imagem-video.jpg"
  },
  {
    id: 3,
    title: "Como Configurar Canais e Notificações",
    description: "Crie ou parametrise canais dedicados para receber notificações de forma organizada.",
    videoUrl: "/Criar Modelo Oficial .mp4",
    duration: "2:41",
    color: "rose",
    featured: true,
    thumbnail: "https://i.postimg.cc/t4DsrvjV/Imagem-video.jpg"
  },
  {
    id: 4,
    title: "Como Obter a Sua Licença Especial",
    description: "Saiba como solicitar o acesso a recursos avançados e canais exclusivos integrados.",
    videoUrl: "/Obtencao da Licenca Oficial.mp4",
    duration: "0:24",
    color: "amber",
    thumbnail: "https://i.postimg.cc/t4DsrvjV/Imagem-video.jpg"
  },
  {
    id: 5,
    title: "Consulta de Correspondência em Lote",
    description: "Aumente a facilidade na gestão local de múltiplas guias e notificações oficiais.",
    videoUrl: "/Pagina Extracao Oficial.mp4",
    duration: "2:41",
    color: "orange",
    thumbnail: "https://i.postimg.cc/t4DsrvjV/Imagem-video.jpg"
  },
  {
    id: 6,
    title: "Visão Geral do Painel de Controlo",
    description: "Conheça todas as ferramentas de monitorização, canais de órgãos e logs seguros.",
    videoUrl: "/Pagina Painel Oficial.mp4",
    duration: "2:10",
    color: "rose",
    thumbnail: "https://i.postimg.cc/t4DsrvjV/Imagem-video.jpg"
  },
  {
    id: 7,
    title: "Segurança de Acesso e Biometria",
    description: "Actualize os dados de emparelhamento do seu dispositivo móvel e preferências de PIN.",
    videoUrl: "/Pagina Perfil Oficial.mp4",
    duration: "0:43",
    color: "amber",
    thumbnail: "https://i.postimg.cc/t4DsrvjV/Imagem-video.jpg"
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
  const [selectedTutorial, setSelectedTutorial] = useState<typeof TUTORIALS[0] | null>(null);
  const [videoError, setVideoError] = useState(false);

  const featuredTutorial = TUTORIALS.find(t => t.featured) || TUTORIALS[0];
  const otherTutorials = TUTORIALS.filter(t => t.id !== featuredTutorial.id);

  const openVideo = (tutorial: typeof TUTORIALS[0]) => {
    setSelectedTutorial(tutorial);
    setVideoError(false);
  };

  return (
    <main id="videotutorial-container" className="flex-grow max-w-6xl mx-auto w-full px-6 pt-12 pb-24 min-h-screen">
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
        <section className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-xl shadow-gray-200/20">
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
              <div className="flex items-center gap-6 shrink-0 bg-gray-50 px-6 py-4 rounded-[30px] border border-gray-100">
                <div className="text-center">
                  <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Duração</p>
                  <p className="text-gray-900 font-black text-lg">{featuredTutorial.duration}</p>
                </div>
                <button 
                  onClick={() => openVideo(featuredTutorial)}
                  className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Play size={14} fill="currentColor" /> Assistir Agora
                </button>
              </div>
            </div>
          </div>

          <div 
            onClick={() => openVideo(featuredTutorial)}
            className="relative aspect-video rounded-[32px] overflow-hidden bg-gray-100 group cursor-pointer shadow-inner border border-gray-100"
          >
            <img 
              src={featuredTutorial.thumbnail} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt={featuredTutorial.title}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 border border-white/30 shadow-2xl">
                <Play size={40} fill="currentColor" />
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
                  className="bg-white rounded-[32px] border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all group"
                >
                  <div 
                    onClick={() => openVideo(tutorial)}
                    className="relative aspect-video overflow-hidden bg-gray-100 cursor-pointer"
                  >
                    <img 
                      src={tutorial.thumbnail} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={tutorial.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-black">
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

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedTutorial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTutorial(null)}
              className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-black rounded-[40px] overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Header */}
              <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                    <PlayCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm leading-none mb-1">{selectedTutorial.title}</h4>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{selectedTutorial.duration} • Original Tutorial</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTutorial(null)}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all group active:scale-90"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
                {videoError ? (
                  <div className="video-error-msg text-center p-12 text-white/50 flex flex-col items-center justify-center">
                    <div className="mb-6 opacity-20">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10.29 3.86T1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <p className="font-black uppercase tracking-[0.3em] text-[10px] mb-4 text-red-500">Vídeo não encontrado</p>
                    <p className="text-xs max-w-sm mx-auto leading-relaxed font-medium">
                      O ficheiro <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">{selectedTutorial.videoUrl}</span> não está presente na pasta <span className="text-white font-bold">public/</span>.
                    </p>
                    <div className="mt-8 px-5 py-3 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[9px] uppercase font-black text-gray-500 tracking-widest mb-1">Dica para o Desenvolvedor</p>
                      <p className="text-[10px]">Arraste os ficheiros MP4 para a pasta <b>public/</b> no explorador de arquivos.</p>
                    </div>
                  </div>
                ) : (
                  <video 
                    key={selectedTutorial.id}
                    src={selectedTutorial.videoUrl}
                    className="w-full h-full relative z-10 block"
                    controls
                    autoPlay
                    playsInline
                    onError={() => setVideoError(true)}
                  />
                )}
              </div>

              {/* Footer Info */}
              <div className="p-8 bg-gray-900 border-t border-white/5">
                <p className="text-gray-400 font-medium text-sm leading-relaxed italic">
                  "{selectedTutorial.description}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

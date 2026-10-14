import { useState, useEffect, useRef, ChangeEvent, FormEvent, MouseEvent } from "react";
import { 
  Play, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Film, 
  X, 
  ArrowLeft, 
  Upload, 
  Link2, 
  FileVideo,
  AlertCircle,
  Save,
  Code2,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import OfficialVideoModal from "../components/OfficialVideoModal";
import { 
  savePersistentVideo, 
  getPersistentVideo, 
  deletePersistentVideo, 
  SECOND_VIDEO_KEY 
} from "../utils/mediaStorage";

const LOGO_CORREIO_ANGOLA = "https://i.postimg.cc/ZnFjVdPt/Logomarca-Correio-Digital-Angola-Site.jpg";

export interface VideoItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  duration: string;
  badge?: string;
  badgeColor?: "red" | "amber" | "emerald";
  isAvailable: boolean;
  thumbnail: string;
  isCustom?: boolean;
}

export default function VideoTutorial() {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  
  // Custom uploaded/linked video state for Video #2
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [customVideoName, setCustomVideoName] = useState<string>("");
  const [customVideoSize, setCustomVideoSize] = useState<string>("");
  const [lastSavedText, setLastSavedText] = useState<string>("");
  const [isSavedInCodebase, setIsSavedInCodebase] = useState<boolean>(false);
  const [storedLocalBlob, setStoredLocalBlob] = useState<Blob | null>(null);
  const [storedLocalName, setStoredLocalName] = useState<string>("");
  const [confirmSaveButtonText, setConfirmSaveButtonText] = useState<string>("Salvo no Código ✓");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSavingToCode, setIsSavingToCode] = useState<boolean>(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string>("");
  const [uploadErrorMsg, setUploadErrorMsg] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [showUrlField, setShowUrlField] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const modalFileInputRef = useRef<HTMLInputElement | null>(null);
  // Guarda o object URL atualmente em uso para o poder libertar.
  const objectUrlRef = useRef<string | null>(null);

  // Function to save a File or Blob directly into the codebase (public/segundo-video-correio-digital.mp4)
  const saveBlobToCodebase = async (blob: Blob, fileName: string): Promise<boolean> => {
    setIsSavingToCode(true);
    setUploadErrorMsg("");
    setUploadSuccessMsg("");

    try {
      const res = await fetch("/api/save-video-to-code", {
        method: "POST",
        headers: {
          "Content-Type": blob.type || "video/mp4",
          "X-Video-Name": encodeURIComponent(fileName || "Correio Digital Angola - Vídeo 2")
        },
        body: blob
      });

      if (!res.ok) {
        throw new Error(`O servidor respondeu com o código HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setIsSavedInCodebase(true);
        setCustomVideoUrl("/segundo-video-correio-digital.mp4");
        const displayName = data.originalName || fileName;
        setCustomVideoName(displayName);
        const sizeMb = (data.size / (1024 * 1024)).toFixed(1);
        setCustomVideoSize(`${sizeMb} MB`);
        setLastSavedText(`Guardado no Código do Projecto • ${sizeMb} MB`);
        setStoredLocalBlob(null);
        // Clear any old indexedDB blob since it's now permanent in codebase
        deletePersistentVideo(SECOND_VIDEO_KEY).catch(() => {});
        setUploadSuccessMsg(`🎉 O vídeo "${displayName}" (${sizeMb} MB) foi guardado com sucesso no código do projecto (/public/segundo-video-correio-digital.mp4)! Está agora permanente para todos os utilizadores.`);
        return true;
      } else {
        throw new Error(data.error || "Erro desconhecido ao gravar vídeo no código");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn("Aviso ao salvar no código:", message);
      setUploadErrorMsg(`Aviso ao gravar no código: ${message}. O ficheiro continua disponível no sistema.`);
      return false;
    } finally {
      setIsSavingToCode(false);
    }
  };

  // Check if video already exists in the codebase backend
  const checkCodebaseStatus = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/video2-status");
      if (res.ok) {
        const data = await res.json();
        if (data.exists && data.url) {
          setIsSavedInCodebase(true);
          setCustomVideoUrl(data.url);
          setCustomVideoName(data.originalName || "Segundo Vídeo Oficial");
          const sizeMb = data.size ? (data.size / (1024 * 1024)).toFixed(1) : "";
          setCustomVideoSize(sizeMb ? `${sizeMb} MB` : "Ficheiro Oficial");
          setLastSavedText(`Integrado no Código do Projecto (public/segundo-video-correio-digital.mp4)`);
          return true;
        }
      }
    } catch (err) {
      console.warn("Aviso ao verificar status do vídeo no servidor:", err);
    }
    return false;
  };

  // Load video: first check codebase, then local storage
  useEffect(() => {
    const loadStored = async () => {
      // 1. FIRST: Check if video already exists in the project codebase
      const foundInCodebase = await checkCodebaseStatus();
      if (foundInCodebase) {
        // Clean up any obsolete local IndexedDB cache that might cause desync
        try {
          await deletePersistentVideo(SECOND_VIDEO_KEY);
        } catch {
          // ignore cache cleanup error
        }
        return;
      }

      // 2. If not found in codebase, check browser IndexedDB
      try {
        const stored = await getPersistentVideo(SECOND_VIDEO_KEY);
        if (stored && stored.blob) {
          setStoredLocalBlob(stored.blob);
          const name = stored.name || "Segundo Vídeo • Correio Digital Angola";
          setStoredLocalName(name);
          const sizeMb = stored.size ? (stored.size / (1024 * 1024)).toFixed(1) : "";
          setCustomVideoSize(sizeMb ? `${sizeMb} MB` : "Ficheiro Local");
          objectUrlRef.current = URL.createObjectURL(stored.blob);
          setCustomVideoUrl(objectUrlRef.current);
          setLastSavedText(`Guardado no Armazenamento Local • ${sizeMb} MB`);
          return;
        }
      } catch (syncErr) {
        console.warn("Aviso ao verificar sincronização local:", syncErr);
      }

      // 3. Fallback to localStorage if an online video link was saved
      try {
        const savedUrl = localStorage.getItem("correio_second_video_url");
        const savedUrlName = localStorage.getItem("correio_second_video_name");
        if (savedUrl) {
          setCustomVideoUrl(savedUrl);
          setCustomVideoName(savedUrlName || "Vídeo Online");
          setCustomVideoSize("Link Web");
          setLastSavedText("Salvo no Sistema");
        }
      } catch (err) {
        console.warn("Erro ao carregar vídeo do armazenamento local:", err);
      }
    };

    loadStored();

    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  // Formatted videos list (always exactly 2 videos)
  const videos: VideoItem[] = [
    {
      id: 1,
      title: "Apresentação Oficial • Correio Digital Angola",
      subtitle: "Vídeo Oficial de Apresentação",
      description: "Conheça em detalhe a plataforma de correspondência e inclusão digital para todos os cidadãos, empresas e instituições da República de Angola.",
      videoUrl: "/correio-digital-angola.mp4",
      duration: "1:07",
      badgeColor: "red",
      isAvailable: true,
      thumbnail: LOGO_CORREIO_ANGOLA
    },
    {
      id: 2,
      title: "Apresentação Oficial • Correio Digital Angola",
      subtitle: "Vídeo Oficial de Apresentação",
      description: "Apresentação institucional oficial do Correio Digital Angola. Assista à demonstração completa da plataforma de correspondência e inclusão digital que está a transformar a comunicação em Angola — permitindo a cidadãos, empresas e instituições públicas receber, consultar e gerir documentos de forma simples, segura e sem filas de espera.",
      videoUrl: "/segundo-video-correio-digital.mp4",
      duration: "1:53",
      badgeColor: "red",
      isAvailable: true,
      thumbnail: LOGO_CORREIO_ANGOLA
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videos[0]);

  // Handle explicit Save confirmation button click
  const handleConfirmSaveClick = () => {
    if (storedLocalBlob && !isSavedInCodebase) {
      saveBlobToCodebase(storedLocalBlob, storedLocalName);
      return;
    }
    setConfirmSaveButtonText("✓ Confirmado & Salvo!");
    setUploadSuccessMsg(`O vídeo "${customVideoName || 'Vídeo 2'}" está guardado no sistema.`);
    setTimeout(() => {
      setConfirmSaveButtonText("Salvo no Código ✓");
    }, 3000);
  };

  // Handle file selection from user device
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadErrorMsg("");
    setUploadSuccessMsg("");
    setIsUploading(true);

    try {
      // 1. Save into IndexedDB so it's always cached locally
      await savePersistentVideo(file, file.name, SECOND_VIDEO_KEY);
      
      // Liberta o URL anterior antes de criar o novo (evita fuga de memoria)
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const newUrl = URL.createObjectURL(file);
      objectUrlRef.current = newUrl;
      setCustomVideoUrl(newUrl);
      setCustomVideoName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setCustomVideoSize(`${sizeMb} MB`);
      setStoredLocalBlob(file);
      setStoredLocalName(file.name);

      // 2. Immediately stream file directly into the project codebase (public/segundo-video-correio-digital.mp4)
      await saveBlobToCodebase(file, file.name);
      
      // Auto-select Video 2
      setSelectedVideo({
        ...videos[1],
        videoUrl: "/segundo-video-correio-digital.mp4",
        title: `Segundo Vídeo • ${file.name}`,
        isAvailable: true,
        duration: `${sizeMb} MB`,
        badgeColor: "emerald"
      });
    } catch (err) {
      console.warn("Aviso ao processar o vídeo:", err);
      setUploadErrorMsg("Ocorreu um erro ao processar o vídeo. Tente novamente.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Handle URL submission
  const handleUrlSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const trimmed = urlInput.trim();
    localStorage.setItem("correio_second_video_url", trimmed);
    localStorage.setItem("correio_second_video_name", "Vídeo Online");
    setCustomVideoUrl(trimmed);
    setCustomVideoName("Vídeo Online");
    setCustomVideoSize("Link Web");
    setLastSavedText("Salvo no Sistema");
    setUploadSuccessMsg("Link do vídeo configurado e salvo com sucesso!");
    setShowUrlField(false);
    setUrlInput("");
  };

  // Remove custom video from both codebase and local storage
  const handleRemoveCustomVideo = async (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      // Remove from server codebase
      await fetch("/api/save-video-to-code", { method: "DELETE" }).catch(() => {});
      // Remove from local IndexedDB
      await deletePersistentVideo(SECOND_VIDEO_KEY);
      localStorage.removeItem("correio_second_video_url");
      localStorage.removeItem("correio_second_video_name");
      if (customVideoUrl && customVideoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(customVideoUrl);
      }
      setIsSavedInCodebase(false);
      setStoredLocalBlob(null);
      setStoredLocalName("");
      setCustomVideoUrl(null);
      setCustomVideoName("");
      setCustomVideoSize("");
      setLastSavedText("");
      setUploadSuccessMsg("Vídeo removido do código do projecto.");
      setUploadErrorMsg("");
      setSelectedVideo(videos[0]);
    } catch (err) {
      console.warn("Erro ao remover vídeo:", err);
    }
  };

  const handleVideoCardClick = (video: VideoItem) => {
    setSelectedVideo(video);
    if (video.isAvailable && video.videoUrl) {
      setIsVideoModalOpen(true);
    } else {
      setIsNoticeModalOpen(true);
    }
  };

  return (
    <main id="videos-container" className="flex-grow max-w-7xl mx-auto w-full px-6 pt-10 pb-24 min-h-screen">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="video/mp4,video/webm,video/quicktime,video/*" 
        className="hidden" 
      />

      {/* Top Header / Navigation */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => navigate("/")}
            className="p-3 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-all cursor-pointer group border-2 border-gray-200 hover:border-gray-300"
            title="Voltar para a Página Inicial"
            aria-label="Voltar para a Página Inicial"
          >
            <ArrowLeft size={24} className="text-gray-900 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none">
                Vídeos
              </h1>
              <span className="bg-gray-100 text-gray-700 font-extrabold text-xs px-3 py-1 rounded-full border border-gray-200">
                2 Vídeos
              </span>
            </div>
            <p className="text-gray-500 font-bold uppercase text-[10px] sm:text-[11px] tracking-[0.25em] mt-1.5">
              Galeria Oficial • Correio Digital Angola
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!customVideoUrl && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-2xl shadow-sm border border-neutral-700 active:scale-95 transition-all cursor-pointer"
              title="Carregar ficheiro de vídeo de 20MB ou mais do seu computador"
            >
              <Upload size={14} className="text-amber-400" />
              {isUploading ? "A Carregar..." : "Carregar Vídeo 2 (MP4)"}
            </button>
          )}
        </div>
      </div>

      {/* Mensagem de Erro se houver */}
      {uploadErrorMsg && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-2xl flex items-center justify-between gap-3 text-red-800 text-xs sm:text-sm font-bold animate-fade-in shadow-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-red-600 shrink-0" />
            <span>{uploadErrorMsg}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setUploadErrorMsg("")} 
            className="p-1 hover:bg-red-100 rounded-lg text-red-700 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Banner de aviso de sucesso */}
      {uploadSuccessMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-between gap-3 text-emerald-800 text-xs sm:text-sm font-bold animate-fade-in shadow-sm">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>{uploadSuccessMsg}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setUploadSuccessMsg("")} 
            className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* CASO 1: Vídeo de 20 MB detectado no navegador mas ainda não guardado no código do projecto */}
      {storedLocalBlob && !isSavedInCodebase && (
        <div className="mb-8 p-6 bg-gradient-to-r from-amber-500/15 via-amber-50 to-orange-500/10 border-2 border-amber-400 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 animate-fade-in">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg">
              <Code2 size={28} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-gray-900">
                  Vídeo de {customVideoSize || "20 MB"} Carregado no Navegador
                </h3>
                <span className="bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                  Pronto para Gravar no Código
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
                Ficheiro: <strong>{customVideoName}</strong>. Clique no botão ao lado para <strong>gravar fisicamente no código do projecto</strong> e disponibilizá-lo para todos os visitantes do mundo!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => saveBlobToCodebase(storedLocalBlob, storedLocalName)}
              disabled={isSavingToCode}
              className="w-full md:w-auto px-6 py-4 bg-gray-950 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer"
            >
              {isSavingToCode ? (
                <>
                  <Loader2 size={16} className="animate-spin text-amber-400" />
                  <span>A Gravar no Código do Projecto...</span>
                </>
              ) : (
                <>
                  <Save size={16} className="text-emerald-400" />
                  <span>💾 Gravar no Código do Projecto Agora</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleVideoCardClick(videos[1])}
              className="px-4 py-4 bg-white hover:bg-gray-100 text-gray-800 border-2 border-gray-300 font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Play size={14} fill="currentColor" />
              Pré-visualizar
            </button>
          </div>
        </div>
      )}

      {/* Grid com exactamente 2 vídeos com bordas cinzentas reforçadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {videos.map((video, index) => {
          const isFirst = index === 0;
          return (
            <motion.article 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="bg-white rounded-[36px] border-2 border-gray-300 hover:border-gray-400 p-6 md:p-8 shadow-xl shadow-gray-200/40 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 relative"
            >
              <div>
                {/* Header do Card • Duração */}
                <div className="flex items-center justify-end gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-[11px] font-black px-3 py-1.5 rounded-full border border-gray-200">
                    <Clock size={12} className="text-gray-500" />
                    {video.duration}
                  </span>
                </div>

                {/* Área da Imagem / Pré-visualização do Vídeo */}
                <div 
                  onClick={() => handleVideoCardClick(video)}
                  className="relative aspect-video rounded-[24px] overflow-hidden bg-neutral-900 group cursor-pointer border-2 border-gray-200 hover:border-gray-400 shadow-inner mb-6"
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Gradiente de sobreposição */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:opacity-90 transition-opacity" />

                  {/* Botão de Play Centralizado */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {video.isAvailable ? (
                      <div className="w-20 h-20 bg-red-600 group-hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white/60">
                        <Play size={32} fill="currentColor" className="ml-1" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-amber-500/90 group-hover:bg-amber-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white/60">
                        <Sparkles size={30} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Informação no canto inferior da imagem */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold px-2">
                    <span className="flex items-center gap-1.5 drop-shadow">
                      <Film size={14} className={isFirst ? "text-red-400" : "text-amber-400"} />
                      {isFirst ? "Vídeo Principal #1" : "Novo Vídeo #2"}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black border border-white/20">
                      {video.isAvailable ? "Disponível para Reprodução" : "A Adicionar Brevemente"}
                    </span>
                  </div>
                </div>

                {/* Título e Descrição */}
                <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-2.5 group-hover:text-red-650 transition-colors">
                  {video.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-[15px] font-medium leading-relaxed mb-6">
                  {video.description}
                </p>
              </div>

              {/* Botões de Acção no rodapé do Card */}
              <div className="pt-4 border-t-2 border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                {video.isAvailable ? (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleVideoCardClick(video)}
                      className="flex-1 w-full bg-gray-950 hover:bg-red-600 text-white py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <Play size={16} fill="currentColor" />
                      Assistir Agora
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                    <button 
                      type="button"
                      onClick={() => handleVideoCardClick(video)}
                      className="flex-1 w-full bg-amber-50 hover:bg-amber-100 text-amber-800 border-2 border-amber-300 py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Clock size={16} />
                      Adicionar Brevemente
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full sm:w-auto bg-gray-950 hover:bg-amber-500 hover:text-black text-white py-3.5 px-5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
                      title="Carregar o seu vídeo de 20 MB directamente"
                    >
                      <Upload size={14} />
                      Carregar Vídeo
                    </button>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Modal de Reprodução do Vídeo */}
      {isVideoModalOpen && (
        <OfficialVideoModal 
          isOpen={isVideoModalOpen} 
          onClose={() => setIsVideoModalOpen(false)}
          title={selectedVideo.title}
          subtitle={selectedVideo.description}
          videoUrl={selectedVideo.videoUrl}
        />
      )}

      {/* Modal Informativo e de Ajuda de Carregamento para o Segundo Vídeo */}
      {isNoticeModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setIsNoticeModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[32px] border-2 border-gray-300 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsNoticeModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            {/* Cabeçalho */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
                <FileVideo size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  Adicionar o Segundo Vídeo
                </h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Opções de Carregamento & Publicação
                </p>
              </div>
            </div>

            {/* Explicação e Opção 1: Upload Direto para o Código do Projecto */}
            <div className="bg-amber-50/60 rounded-2xl p-4 sm:p-5 border-2 border-amber-200 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <Code2 size={18} className="text-amber-700" />
                <h4 className="font-black text-gray-900 text-sm">
                  Opção 1: Selecionar o seu vídeo de 20 MB (Grava no Código)
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Pode selecionar o ficheiro do seu computador. O vídeo é guardado tanto no navegador quanto transmitido directamente para os ficheiros do projecto (<code className="font-mono bg-amber-100 text-amber-900 px-1 py-0.5 rounded">public/segundo-video-correio-digital.mp4</code>), ficando integrado no código e visível para todos os utilizadores.
              </p>

              <input 
                type="file" 
                ref={modalFileInputRef} 
                onChange={(e) => {
                  handleFileChange(e);
                  setIsNoticeModalOpen(false);
                }} 
                accept="video/mp4,video/webm,video/*" 
                className="hidden" 
              />

              <button
                type="button"
                onClick={() => modalFileInputRef.current?.click()}
                disabled={isUploading || isSavingToCode}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Upload size={16} />
                {isSavingToCode ? "A Gravar no Código..." : (isUploading ? "A Carregar..." : "Selecionar e Gravar no Código (MP4)")}
              </button>
            </div>

            {/* Opção 2: Inserir Link Online (YouTube, Google Drive, etc) */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border-2 border-gray-200 mb-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Link2 size={18} className="text-gray-700" />
                  <h4 className="font-black text-gray-900 text-sm">
                    Opção 2: Inserir Link do Vídeo (YouTube / Drive)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUrlField(!showUrlField)}
                  className="text-xs font-bold text-red-650 hover:underline"
                >
                  {showUrlField ? "Recolher" : "Inserir Link"}
                </button>
              </div>

              {showUrlField ? (
                <form onSubmit={(e) => { handleUrlSubmit(e); setIsNoticeModalOpen(false); }} className="mt-3">
                  <div className="flex gap-2">
                    <input 
                      type="url" 
                      placeholder="https://exemplo.com/video.mp4 ou YouTube"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <button 
                      type="submit" 
                      className="bg-gray-950 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-xs text-gray-500 leading-relaxed">
                  Se alojar o vídeo no YouTube (como "Não Listado") ou Google Drive, pode colar o link para que todos os visitantes assistam.
                </p>
              )}
            </div>

            {/* Guia de Ajuda para GitHub / Compressão */}
            <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200 mb-6 text-xs text-blue-900 flex items-start gap-3">
              <AlertCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Por que não carregou no chat?</strong> O chat do assistente tem limite de tamanho em mensagens de texto. No entanto, através do botão acima ou no GitHub (na pasta <code>public/</code>), ficheiros de 20 MB carregam sem qualquer problema.
              </div>
            </div>

            {/* Ações inferiores */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsNoticeModalOpen(false);
                  setSelectedVideo(videos[0]);
                  setIsVideoModalOpen(true);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider py-3.5 px-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Play size={14} fill="currentColor" />
                Assistir ao Vídeo Actual
              </button>
              <button
                type="button"
                onClick={() => setIsNoticeModalOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-2xl transition-all cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

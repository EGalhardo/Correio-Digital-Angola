import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="download-modal-wrapper" className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            id="download-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            id="download-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-[340px] w-full shadow-2xl relative z-10"
          >
            <button
              id="download-modal-close-btn"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-100">
                <Download className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-1 uppercase tracking-tight">Download</h3>
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest leading-tight">Escolha a sua plataforma preferida</p>
            </div>

            <div className="flex flex-col gap-3">
              <button id="download-modal-apple-btn" className="flex items-center gap-4 border border-gray-100 hover:border-blue-400 rounded-2xl p-3.5 transition-all hover:bg-blue-50 group">
                <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.06 2.37.73 3.19.72.94-.01 2.05-.79 3.46-.67 1.87.17 3.26.89 4.17 2.24-3.82 2.31-3.22 7.39.67 8.99-.93 1.88-1.99 3.48-3.49 4.46zM12.03 7.25c-.2-2.97 2.52-5.44 5.33-5.25.36 3.36-3.08 5.74-5.33 5.25z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[9px] uppercase font-black text-gray-400 tracking-wider">Download na</div>
                  <div className="font-extrabold text-gray-900 text-sm">App Store</div>
                </div>
              </button>

              <button id="download-modal-google-btn" className="flex items-center gap-4 border border-gray-100 hover:border-blue-400 rounded-2xl p-3.5 transition-all hover:bg-blue-50 group">
                <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.38.2.8.24 1.22.1l12.4-7.15-2.78-2.78-10.84 9.83zM20.75 10.08L17.78 8.4l-3.2 3.2 3.2 3.2 3-1.7c.86-.48.86-1.86-.03-2.02zM1.7.39C1.47.65 1.34 1.03 1.34 1.5v21c0 .47.13.85.36 1.11l.07.06L13.15 12v-.28L1.77.33 1.7.39zm14.47 8.37L3.18.24c-.42-.14-.84-.1-1.22.1l11.42 11.42 2.79-2.99z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[9px] uppercase font-black text-gray-400 tracking-wider">Download no</div>
                  <div className="font-extrabold text-gray-900 text-sm">Google Play</div>
                </div>
              </button>
            </div>

            <button
              id="download-modal-later-btn"
              onClick={onClose}
              className="mt-8 w-full text-center text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
            >
              Talvez mais tarde
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, WifiOff, Copy, MessageCircle, Check, Smartphone } from 'lucide-react';

interface PlanActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
}

const PAYMENT_METHODS = [
  {
    name: "Afrimoney",
    type: "Nº:",
    value: "951 006 421",
    color: "bg-purple-700",
    icon: <Smartphone size={18} />,
    isLogo: true
  }
];

export default function PlanActivationModal({ isOpen, onClose, planName, planPrice }: PlanActivationModalProps) {
  const [activeTab, setActiveTab] = useState<'online' | 'offline'>('online');
  const [copied, setCopied] = useState(false);
  const [responseCode, setResponseCode] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const deviceCode = "LJ06-K560-7PD6-X190";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(deviceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActionClick = () => {
    if (activeTab === 'online') {
      const message = `Olá! Gostaria de activar o Plano ${planName} (${planPrice} Kz/mês).\n\nCódigo do Dispositivo: ${deviceCode}`;
      window.open(`https://wa.me/244951006421?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      if (responseCode.trim().length >= 8) {
        setIsActivated(true);
      }
    }
  };

  if (isActivated) {
    return (
      <AnimatePresence>
        <div id="plan-activation-modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            id="plan-activation-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => {
              setIsActivated(false);
              setResponseCode("");
              onClose();
            }}
          />
          
          <motion.div 
            id="plan-activation-modal-content-success"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden relative z-10 shadow-3xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-emerald-600" size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Licença Activada!</h3>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Plano {planName} está pronto</p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6 text-left">
              <p className="text-emerald-800 text-xs font-medium leading-relaxed">
                A sua licença offline foi validada e registada com sucesso para este dispositivo. Agora já pode usufruir de todos os recursos premium do Correio Digital Angola sem internet e com total soberania sobre os seus dados.
              </p>
            </div>
            <button 
              onClick={() => {
                setIsActivated(false);
                setResponseCode("");
                onClose();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-xl active:scale-95"
            >
              Concluir
            </button>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <div id="plan-activation-modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          id="plan-activation-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        <motion.div 
          id="plan-activation-modal-content"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-[32px] w-full max-w-md overflow-hidden relative z-10 shadow-3xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 pb-2 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-0.5">Activar Plano {planName}</h2>
              <p className="text-blue-600 font-bold text-sm">{planPrice} Kz/mês</p>
            </div>
            <button 
              id="plan-activation-modal-close-btn"
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
            {/* Tab Switcher */}
            <div className="bg-gray-100 p-1 rounded-xl flex mb-6">
              <button 
                onClick={() => setActiveTab('online')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-bold text-[11px] transition-all ${activeTab === 'online' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Globe size={14} />
                Activação Online
              </button>
              <button 
                onClick={() => setActiveTab('offline')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-bold text-[11px] transition-all ${activeTab === 'offline' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <WifiOff size={14} />
                Activação Offline
              </button>
            </div>

            {activeTab === 'offline' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3.5 bg-orange-50 border border-orange-100 rounded-xl flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 font-black text-xs">i</div>
                <div>
                  <h4 className="font-black text-orange-900 text-[11px] mb-0.5">Como activar:</h4>
                  <p className="text-orange-800 text-[10px] font-medium leading-tight">
                    Copie o código, realize o pagamento via Afrimoney, envie o comprovativo por WhatsApp e insira o código de resposta recebido.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Offline Section 1: Device Code */}
            {activeTab === 'offline' && (
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-black text-[10px]">1</div>
                  <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-[11px]">Código do Dispositivo</h3>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-mono text-gray-700 font-bold tracking-widest flex items-center justify-center text-xs">
                    {deviceCode}
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl flex items-center gap-2 text-[10px] transition-colors"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>
            )}

            {/* Section: Payment Methods */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-black text-[10px]">
                  {activeTab === 'offline' ? '2' : '1'}
                </div>
                <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-[11px]">Métodos de Pagamento</h3>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {PAYMENT_METHODS.map((method, idx) => (
                  <div key={idx} className="p-3 border border-gray-100 rounded-xl flex items-start gap-3 hover:border-blue-100 transition-colors">
                    <div className={`w-8 h-8 rounded-lg ${method.color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                      {React.cloneElement(method.icon as React.ReactElement, { size: 14 })}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-gray-900 text-[11px] truncate uppercase tracking-tight">{method.name}</h4>
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{method.type} <span className="text-gray-700">{method.value}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline Section 3: WhatsApp */}
            {activeTab === 'offline' && (
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gray-950 text-white flex items-center justify-center font-black text-[10px]">3</div>
                  <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-[11px]">Envio via WhatsApp</h3>
                </div>
                <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                      <MessageCircle size={18} fill="white" />
                    </div>
                    <div>
                      <h4 className="font-black text-emerald-900 text-[11px]">Enviar via WhatsApp</h4>
                      <p className="text-emerald-700 text-[10px] font-bold">+244 951 006 421</p>
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/244951006421?text=${encodeURIComponent(`Olá! Gostaria de activar o Plano ${planName} (${planPrice} Kz/mês).\n\nCódigo do Dispositivo: ${deviceCode}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border border-emerald-200 hover:border-emerald-500 hover:text-white text-emerald-600 font-black rounded-full text-[9px] transition-all shadow-sm shrink-0 flex items-center justify-center"
                  >
                    Abrir
                  </a>
                </div>
              </div>
            )}

            {/* Offline Section 4: Response Code */}
            {activeTab === 'offline' && (
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-black text-[10px]">4</div>
                  <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-[11px]">Código de Resposta</h3>
                </div>
                <p className="text-gray-500 text-[10px] mb-3 font-medium">Insira o código de resposta recebido pelo suporte para concluir a activação offline.</p>
                <input 
                  type="text" 
                  value={responseCode}
                  onChange={(e) => setResponseCode(e.target.value)}
                  placeholder="XXXX - XXXX - XXXX - XXXX" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center font-mono text-gray-700 font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase text-xs"
                />
              </div>
            )}

            {/* Action Button */}
            <button 
              onClick={handleActionClick}
              disabled={activeTab === 'offline' && responseCode.trim().length < 8}
              className={`w-full py-4 rounded-xl font-black text-base transition-all shadow-xl active:scale-95 uppercase tracking-wide flex items-center justify-center gap-3 ${ 
                activeTab === 'online' 
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                : responseCode.trim().length >= 8 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer' 
                  : 'bg-orange-200/50 text-orange-400 cursor-not-allowed'
              }`}
            >
              <Check size={20} />
              {activeTab === 'online' ? 'Pagar' : 'Activar Offline'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

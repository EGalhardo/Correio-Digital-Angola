import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-brand-footer text-white pt-12 pb-10 md:pt-14 md:pb-11 lg:pt-18 lg:pb-14 xl:pt-20 xl:pb-16 border-t-[7px] border-red-650 relative overflow-hidden">
      {/* Main Background Image with referrerPolicy to bypass cross-origin restrictions */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://i.postimg.cc/ZnFjVdPt/Logomarca-Correio-Digital-Angola-Site.jpg" 
          alt="Correio Digital Angola Background" 
          className="w-full h-full object-cover object-center opacity-100 filter brightness-[1.25] contrast-[1.02] select-none"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="font-black text-lg lg:text-xl mb-2.5 italic tracking-tightest leading-tight">Correio Digital Angola</div>
              <p className="text-red-100/90 text-xs lg:text-[13px] leading-relaxed mb-3.5 font-medium">Mais rápido. Mais seguro. Mais perto de si.</p>
            </div>
            <div className="flex gap-2.5">
              <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 lg:w-8.5 lg:h-8.5 rounded-lg lg:rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-red-950/40 border border-white/10">
                <Facebook size={15} />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 lg:w-8.5 lg:h-8.5 rounded-lg lg:rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-red-950/40 border border-white/10">
                <Instagram size={15} />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 lg:w-8.5 lg:h-8.5 rounded-lg lg:rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-red-950/40 border border-white/10">
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-black text-xs tracking-widest text-amber-400 uppercase mb-3.5">Empresa</h4>
            <ul className="space-y-2.5 text-xs lg:text-[13px] text-white font-bold">
              <li><Link to="/sobre-nos" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-1.5 inline-block">Sobre Nós</Link></li>
              <li><Link to="/como-funciona" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-1.5 inline-block">Como Funciona</Link></li>
              <li><a href="/#planos" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-1.5 inline-block">Planos</a></li>
            </ul>
          </div>

          {/* Beautiful Empty Spacer for Center Logo Visibility */}
          <div className="hidden lg:block pointer-events-none" aria-hidden="true" />

          {/* Suporte */}
          <div>
            <h4 className="font-black text-xs tracking-widest text-amber-400 uppercase mb-3.5">Suporte</h4>
            <ul className="space-y-2.5 text-xs lg:text-[13px] text-white font-bold">
              <li><Link to="/central-ajuda" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-1.5 inline-block">Central de Ajuda</Link></li>
              <li><Link to="/faq" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-1.5 inline-block">FAQ</Link></li>
              <li><Link to="/video-tutorial" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-1.5 inline-block">Vídeo Tutorial</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-black text-xs tracking-widest text-amber-400 uppercase mb-3.5">Contacto</h4>
            <ul className="space-y-2.5 text-xs lg:text-[13px] text-white font-bold">
              <li className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <div className="p-1 bg-red-600 rounded-md shrink-0"><Phone size={13} /></div> 
                <span className="truncate">+244 951006421</span>
              </li>
              <li className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <div className="p-1 bg-red-600 rounded-md shrink-0"><Mail size={13} /></div> 
                <span className="truncate">suporte@correiodigital.ao</span>
              </li>
              <li className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <div className="p-1 bg-red-600 rounded-md shrink-0"><MapPin size={13} /></div> 
                <span>Luanda, Angola</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-gray-400 text-[11px] font-black tracking-widest w-full">
          <span>© 2026 Correio Digital Angola.</span>
        </div>
      </div>
    </footer>
  );
}

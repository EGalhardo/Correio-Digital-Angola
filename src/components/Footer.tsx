import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-brand-footer text-white pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36 xl:pt-48 xl:pb-44 2xl:pt-56 2xl:pb-52 border-t-8 border-red-650 relative overflow-hidden">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="font-black text-2xl lg:text-3xl mb-4 italic tracking-tightest leading-tight">Correio Digital Angola</div>
              <p className="text-red-100/90 text-xs lg:text-sm leading-relaxed mb-6 font-medium">Mais rápido. Mais seguro. Mais perto de si.</p>
            </div>
            <div className="flex gap-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="w-11 h-11 rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-red-950/40 border border-white/10">
                <Facebook size={22} />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="w-11 h-11 rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-red-950/40 border border-white/10">
                <Instagram size={22} />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="w-11 h-11 rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-red-950/40 border border-white/10">
                <Youtube size={22} />
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-black text-xs tracking-widest text-amber-400 uppercase mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm lg:text-base text-white font-bold">
              <li><Link to="/sobre-nos" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-2 inline-block">Sobre Nós</Link></li>
              <li><Link to="/como-funciona" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-2 inline-block">Como Funciona</Link></li>
              <li><a href="/#planos" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-2 inline-block">Planos</a></li>
            </ul>
          </div>

          {/* Beautiful Empty Spacer for Center Logo Visibility */}
          <div className="hidden lg:block pointer-events-none" aria-hidden="true" />

          {/* Suporte */}
          <div>
            <h4 className="font-black text-xs tracking-widest text-amber-400 uppercase mb-6">Suporte</h4>
            <ul className="space-y-4 text-sm lg:text-base text-white font-bold">
              <li><Link to="/central-ajuda" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-2 inline-block">Central de Ajuda</Link></li>
              <li><Link to="/faq" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-2 inline-block">FAQ</Link></li>
              <li><Link to="/video-tutorial" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-all hover:translate-x-2 inline-block">Vídeo Tutorial</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-black text-xs tracking-widest text-amber-400 uppercase mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm lg:text-base text-white font-bold">
              <li className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                <div className="p-1.5 bg-red-600 rounded-lg shrink-0"><Phone size={16} /></div> 
                <span className="truncate">+244 951006421</span>
              </li>
              <li className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                <div className="p-1.5 bg-red-600 rounded-lg shrink-0"><Mail size={16} /></div> 
                <span className="truncate">suporte@facilitascan.ao</span>
              </li>
              <li className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                <div className="p-1.5 bg-red-600 rounded-lg shrink-0"><MapPin size={16} /></div> 
                <span>Luanda, Angola</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 flex flex-col lg:flex-row justify-between items-center gap-6 text-gray-400 text-sm font-black tracking-widest w-full">
          <span>© 2026 Correio Digital Angola.</span>
        </div>
      </div>
    </footer>
  );
}

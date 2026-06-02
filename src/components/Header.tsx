import { useState, useEffect, MouseEvent, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const isManualScrollRef = useRef(false);
  const location = useLocation();

  const navLinks = [
    { name: "Início", path: "/", id: "top" },
    { name: "Sectores", path: "/#sectores", id: "sectores" },
    { name: "Como Funciona", path: "/#como-funciona", id: "como-funciona" },
    { name: "Planos", path: "/#planos", id: "planos" },
    { name: "Testemunhos", path: "/#testemunhas", id: "testemunhas" },
    { name: "Contacto", path: "/#contacto", id: "contacto" },
  ];

  const handleNavClick = (e: MouseEvent, id: string) => {
    if (location.pathname === "/") {
      e.preventDefault();
      isManualScrollRef.current = true;
      setActiveSection(id);
      
      // Specific reinforcement requested:
      // 1. Inicio -> Sectores: second activation after 100ms
      // 2. Contacto -> Testemunhas: second activation after 100ms
      const isSectoresFromInicio = activeSection === "top" && id === "sectores";
      const isTestemunhasFromContacto = activeSection === "contacto" && id === "testemunhas";

      if (isSectoresFromInicio || isTestemunhasFromContacto) {
        // First activation
        setActiveSection(id);
        // Second activation after 100ms (as requested)
        setTimeout(() => {
          setActiveSection(id);
        }, 100);
      } else {
        setActiveSection(id);
        // Reinforcement for others too
        setTimeout(() => {
          setActiveSection(id);
        }, 100);
      }

      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        // Update hash without jumping
        window.history.pushState(null, "", id === "top" ? "/" : `/#${id}`);
      }
      setIsOpen(false);
      
      // Release lock after scroll ends (smooth scroll usually takes 500-800ms)
      setTimeout(() => {
        isManualScrollRef.current = false;
      }, 1000);
    } 
  };

  useEffect(() => {
    // Ao carregar a página inicial pela primeira vez
    if (location.pathname === "/") {
      setActiveSection("top");
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Scroll observation only on landing page
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Force "Início" when at the very top
      if (scrollPosition < 50) {
        setActiveSection("top");
        return;
      }

      // Check for bottom of page for "Contacto"
      if (scrollPosition + windowHeight >= documentHeight - 150) {
        setActiveSection("contacto");
        return;
      }

      const sectionIds = ["top", "sectores", "como-funciona", "planos", "testemunhas", "contacto"];
      let activeId = "top";
      const scanLine = 160; // Header height is ~90-100px, 160px is a perfect offset

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= scanLine) {
            activeId = id;
          }
        }
      }

      setActiveSection(activeId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    // Force initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

  const isActive = (link: { path: string, id: string }) => {
    if (location.pathname === "/") {
      if (activeSection) {
        return activeSection === link.id;
      }
      return link.id === "top";
    }
    return location.pathname === link.path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" onClick={(e) => handleNavClick(e, "top")}>
          <img
            src="https://i.postimg.cc/P572qh2f/Icone-Correio-Angola.jpg"
            alt="Correio Digital Angola Logo"
            className="h-11 w-auto rounded-xl object-cover transition-transform group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="font-black text-lg text-gray-900 leading-tight tracking-tighter">Correio Digital Angola</div>
            <div className="text-[10px] text-red-600 font-black tracking-widest uppercase">Plataforma Oficial</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={isActive(link) ? "nav-active" : "nav-link"}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center justify-between py-4 px-5 rounded-2xl transition-all ${
                      isActive(link) 
                        ? "bg-red-600 text-white font-black shadow-lg shadow-red-600/30" 
                        : "text-gray-900 font-bold hover:bg-gray-50"
                    }`}
                    onClick={(e) => handleNavClick(e, link.id)}
                  >
                    <span>{link.name}</span>
                    {isActive(link) && (
                      <motion.div 
                        layoutId="activeCircle"
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-black tracking-widest text-gray-400 text-center">
                  FacilitaScan © 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

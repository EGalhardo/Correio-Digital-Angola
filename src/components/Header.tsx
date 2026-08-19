import { useState, useEffect, MouseEvent, TouchEvent, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const isManualScrollRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Início", path: "/", id: "top" },
    { name: "Sectores", path: "/#sectores", id: "sectores" },
    { name: "Como Funciona", path: "/#como-funciona", id: "como-funciona" },
    { name: "Planos", path: "/#planos", id: "planos" },
    { name: "Testemunhos", path: "/#testemunhas", id: "testemunhas" },
    { name: "Contacto", path: "/#contacto", id: "contacto" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    isManualScrollRef.current = true;

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        window.history.pushState(null, "", "/");
      } catch {
        // ignore
      }
      setTimeout(() => {
        isManualScrollRef.current = false;
      }, 700);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // scrollIntoView works consistently across all mobile viewports
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        window.history.pushState(null, "", `/#${id}`);
      } catch {
        // ignore
      }
    } else {
      // Fallback calculation
      const section = document.querySelector(`[id="${id}"]`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 700);
  };

  const handleNavClick = (id: string) => {
    setIsOpen(false);

    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate(id === "top" ? "/" : `/#${id}`);
      setTimeout(() => {
        scrollToSection(id);
      }, 200);
    }
  };

  useEffect(() => {
    // Handle initial load with hash or route change
    if (location.pathname === "/") {
      const hash = location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          scrollToSection(hash);
        }, 100);
      } else {
        setActiveSection("top");
      }
    } else {
      setActiveSection("");
    }
  }, [location.pathname, location.hash]);

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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group shrink-0" onClick={() => handleNavClick("top")}>
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100 flex items-center justify-center bg-gray-50">
            <img
              src="https://i.postimg.cc/P572qh2f/Icone-Correio-Angola.jpg"
              alt="Correio Digital Angola Logo"
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base md:text-lg text-gray-900 leading-tight tracking-tight">Correio Digital Angola</span>
            <span className="text-[10px] text-red-600 font-extrabold tracking-widest uppercase">Plataforma Oficial</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={isActive(link) ? "nav-active" : "nav-link"}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={isOpen}
          className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-red-600/30"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} className="text-red-600" /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden relative z-50"
          >
            <div className="px-6 py-5 flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const active = isActive(link);
                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <button
                      type="button"
                      className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl text-left transition-all select-none active:scale-[0.98] cursor-pointer ${
                        active 
                          ? "bg-red-600 text-white font-black shadow-md shadow-red-600/30" 
                          : "text-gray-900 font-bold hover:bg-gray-50 active:bg-gray-100"
                      }`}
                      onClick={() => handleNavClick(link.id)}
                    >
                      <span className="text-sm tracking-wide">{link.name}</span>
                      {active && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                      )}
                    </button>
                  </motion.div>
                );
              })}
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[10px] font-black tracking-widest text-gray-400 text-center uppercase">
                  Correio Digital Angola © 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

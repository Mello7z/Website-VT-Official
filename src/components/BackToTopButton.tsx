import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

interface BackToTopButtonProps {
  activeSection?: string;
  className?: string;
}

export default function BackToTopButton({ activeSection, className = "" }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (e.g. > 400px or when activeSection is not hero)
      const scrolledPastHero = window.scrollY > Math.min(400, window.innerHeight * 0.6);
      const notInHeroSection = activeSection ? activeSection !== "hero" : false;

      setIsVisible(scrolledPastHero || notInHeroSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.9 }}
          className={`fixed bottom-24 right-5 sm:bottom-28 sm:right-8 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-[#D0B2FF]/60 hover:text-[#D0B2FF] hover:shadow-[0_0_20px_rgba(208,178,255,0.4)] transition-all cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0B2FF] ${className}`}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowUp className="w-5 h-5 text-white/80 group-hover:text-[#D0B2FF] transition-colors" />
          </motion.div>

          {/* Subtle cyber glow ring on hover */}
          <span className="absolute inset-0 rounded-full border border-[#D0B2FF]/0 group-hover:border-[#D0B2FF]/40 transition-all pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

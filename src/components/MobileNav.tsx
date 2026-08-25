import React from "react";
import { Home, Disc, Music, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MobileNavProps {
  visible: boolean;
  onScrollToSection: (id: string) => void;
  activeSection: string;
}

export default function MobileNav({ visible, onScrollToSection, activeSection }: MobileNavProps) {
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "content-section", label: "Discography", icon: Disc },
    { id: "footer", label: "About", icon: User },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <div className="bg-[#131313]/80 backdrop-blur-3xl border border-white/5 rounded-full px-6 py-2.5 flex items-center justify-around shadow-lg">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onScrollToSection(item.id)}
                  className="flex flex-col items-center gap-1 relative py-1 focus:outline-none"
                  aria-label={item.label}
                >
                  <IconComponent 
                    className={`w-4.5 h-4.5 transition-all duration-300 ${isActive ? 'text-[#D0B2FF] scale-110' : 'text-neutral-400 hover:text-white'}`} 
                  />
                  <span className={`font-mono text-[8px] tracking-wider transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-neutral-500'}`}>
                    {item.label.toUpperCase()}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="mobileNavIndicator"
                      className="absolute -top-1 w-1 h-1 rounded-full bg-[#D0B2FF]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

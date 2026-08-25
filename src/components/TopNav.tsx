import React, { useState } from "react";
import { Music, MoreHorizontal, Volume2, VolumeX, Volume1 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TopNavProps {
  visible: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  volumeLevel?: number;
  onChangeVolume?: (vol: number) => void;
  onOpenMenu?: () => void;
}

export default function TopNav({
  visible,
  isPlaying,
  isMuted,
  onToggleMute,
  volumeLevel = 1.0,
  onChangeVolume,
  onOpenMenu,
}: TopNavProps) {
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full z-40 px-6 py-4 md:px-16"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="font-sans text-lg font-bold tracking-widest text-white hover:opacity-80 transition-opacity">
              VILLAFAN
            </a>

            {/* Sound Mute & Volume Control */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 group relative"
                onMouseEnter={() => setIsVolumeHovered(true)}
                onMouseLeave={() => setIsVolumeHovered(false)}
              >
                <AnimatePresence>
                  {(isVolumeHovered || isMuted) && onChangeVolume && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 65, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden flex items-center"
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volumeLevel}
                        onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
                        className="w-14 h-1.5 bg-white/20 accent-[#D0B2FF] rounded-lg appearance-none cursor-pointer"
                        aria-label="Ajustar Volume"
                        title={`Volume: ${Math.round((isMuted ? 0 : volumeLevel) * 100)}%`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={onToggleMute}
                  className="p-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/10 hover:border-red-500/30 transition-all hover:text-red-500 cursor-pointer active:scale-95 flex items-center justify-center"
                  aria-label="Mute Toggle"
                  title={isMuted ? "Ativar som" : `Volume: ${Math.round(volumeLevel * 100)}%`}
                >
                  {isMuted || volumeLevel === 0 ? (
                    <VolumeX className="w-4.5 h-4.5 text-neutral-400 group-hover:text-white" />
                  ) : volumeLevel < 0.5 ? (
                    <Volume1 className="w-4.5 h-4.5 text-neutral-400 group-hover:text-white" />
                  ) : (
                    <Volume2 className="w-4.5 h-4.5 text-neutral-400 group-hover:text-white" />
                  )}
                </button>
              </div>

              {/* Menu Button */}
              <button 
                onClick={onOpenMenu}
                className="p-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/10 hover:border-red-500/30 transition-all hover:text-red-500 cursor-pointer active:scale-95 flex items-center justify-center"
                id="menu-btn"
                aria-label="Menu"
                title="Abrir Menu"
              >
                <MoreHorizontal className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

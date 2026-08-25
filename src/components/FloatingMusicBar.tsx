import React, { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Volume1 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Track } from "../types";
import CorruptedCoverImage from "./CorruptedCoverImage";

interface FloatingMusicBarProps {
  visible: boolean;
  activeTrack: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  volumeLevel?: number;
  onChangeVolume?: (vol: number) => void;
  isFooterActive?: boolean;
}

export default function FloatingMusicBar({
  visible,
  activeTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  isMuted,
  onToggleMute,
  volumeLevel = 1.0,
  onChangeVolume,
  isFooterActive = false,
}: FloatingMusicBarProps) {
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ 
            y: isPlaying ? [0, -4, 2, -1, 0] : [0, -3, 1, 0],
            x: "-50%",
            opacity: 1,
            rotate: isPlaying ? [0, -0.5, 0.4, -0.3, 0] : [0, -0.2, 0.2, 0],
          }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ 
            y: { repeat: Infinity, duration: isPlaying ? 4.5 : 6, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: isPlaying ? 5.2 : 8, ease: "easeInOut" },
            default: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-32px)] sm:w-[calc(100%-48px)] max-w-[540px]"
          id="floating-player-bar"
        >
          {/* Main Floating Bar */}
          <div className={`rounded-full px-4 py-2 flex items-center justify-between shadow-2xl relative transition-all duration-[1200ms] ${
            isFooterActive 
              ? "bg-[#09090b]/15 border border-white/5 opacity-30 select-none scale-95 pointer-events-none filter blur-[0.5px]" 
              : "bg-[#131313]/60 border border-white/10 backdrop-blur-3xl"
          }`}>
            {/* Ambient Background Glow matching the artist style */}
            <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-[#8B5CF6]/10 to-white/10 blur-xl transition-all duration-[1200ms] ${
              isFooterActive ? "opacity-0 scale-75" : "opacity-30"
            }`} />

            {/* Track Info */}
            <div className="flex items-center gap-3 select-none flex-1 min-w-0 pr-2">
              <div className="relative w-10 h-10 aspect-square bg-[#1a1a1a] rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                <CorruptedCoverImage
                  isCorrupted={activeTrack.isCorrupted}
                  src={activeTrack.coverPath}
                  alt={activeTrack.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'animate-spin-slow' : ''}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white truncate leading-tight">
                  {activeTrack.name}
                </span>
                <span className="font-sans text-[9px] text-[#8B5CF6]/80 uppercase tracking-widest font-medium mt-0.5 truncate">
                  {activeTrack.artist}
                </span>
              </div>
            </div>

            {/* Audio Controls with horror kinetic animations and glows */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <motion.button
                onClick={onPrevious}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: -10,
                  color: "#8B5CF6",
                  textShadow: "0px 0px 8px #8B5CF6" 
                }}
                whileTap={{ scale: 0.85, rotate: -25 }}
                animate={{
                  y: [0, -1.8, 1.2, 0],
                  rotate: [0, -2, 2, 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3.4, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
                }}
                className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center text-white/70 hover:text-white transition-all outline-none cursor-pointer focus:outline-none"
                aria-label="Previous track"
              >
                <SkipBack className="w-4.5 h-4.5" />
              </motion.button>

              <motion.button
                onClick={onPlayPause}
                whileHover={{ 
                  scale: 1.12, 
                  boxShadow: isPlaying ? "0px 0px 15px rgba(239, 68, 68, 0.7)" : "0px 0px 15px rgba(139, 92, 246, 0.7)"
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, 2, -2, 0],
                  scale: isPlaying ? [1, 1.03, 0.97, 1] : 1,
                  rotate: isPlaying ? [0, 1.5, -1.5, 0] : 0,
                }}
                transition={{
                  y: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
                  scale: { repeat: isPlaying ? Infinity : 0, duration: 1.5, ease: "easeInOut" },
                  rotate: { repeat: isPlaying ? Infinity : 0, duration: 2.1, ease: "easeInOut" },
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all outline-none shadow-md cursor-pointer ${
                  isPlaying 
                    ? "bg-rose-600 text-white shadow-rose-900/40 border border-rose-500" 
                    : "bg-white text-black"
                }`}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current animate-pulse" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </motion.button>

              <motion.button
                onClick={onNext}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 10,
                  color: "#8B5CF6",
                  textShadow: "0px 0px 8px #8B5CF6" 
                }}
                whileTap={{ scale: 0.85, rotate: 25 }}
                animate={{
                  y: [0, -1.2, 1.8, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3.1, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                }}
                className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center text-white/70 hover:text-white transition-all outline-none cursor-pointer focus:outline-none"
                aria-label="Next track"
              >
                <SkipForward className="w-4.5 h-4.5" />
              </motion.button>
            </div>

            {/* Mute/Volume Controls */}
            <div 
              className="flex items-center justify-end pl-1 flex-shrink-0 relative group"
              onMouseEnter={() => setIsVolumeHovered(true)}
              onMouseLeave={() => setIsVolumeHovered(false)}
            >
              <AnimatePresence>
                {(isVolumeHovered || isMuted) && onChangeVolume && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 70, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden flex items-center mr-1"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volumeLevel}
                      onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
                      className="w-16 h-1.5 bg-white/20 accent-[#D0B2FF] hover:accent-purple-300 rounded-lg appearance-none cursor-pointer"
                      aria-label="Controle de volume"
                      title={`Volume: ${Math.round((isMuted ? 0 : volumeLevel) * 100)}%`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={onToggleMute}
                whileHover={{ scale: 1.25, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.8 }}
                animate={{
                  y: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 4.1, ease: "easeInOut" },
                }}
                className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center text-white/50 hover:text-[#8B5CF6] transition-colors outline-none cursor-pointer focus:outline-none"
                aria-label={isMuted ? "Unmute" : "Mute"}
                title={isMuted ? "Ativar Som" : `Volume: ${Math.round(volumeLevel * 100)}%`}
              >
                {isMuted || volumeLevel === 0 ? (
                  <VolumeX className="w-4.5 h-4.5 text-rose-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                ) : volumeLevel < 0.5 ? (
                  <Volume1 className="w-4.5 h-4.5 text-violet-400" />
                ) : (
                  <Volume2 className="w-4.5 h-4.5 text-violet-400" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


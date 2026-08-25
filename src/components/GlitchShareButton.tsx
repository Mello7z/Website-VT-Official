import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, Check } from "lucide-react";
import { Track } from "../types";

interface GlitchShareButtonProps {
  track: Track;
  isCopied: boolean;
  onShare: (track: Track) => void;
  className?: string;
  iconSize?: string;
  buttonSize?: string;
}

export default function GlitchShareButton({
  track,
  isCopied,
  onShare,
  className = "",
  iconSize = "w-4 h-4",
  buttonSize = "w-10 h-10",
}: GlitchShareButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onShare(track);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center rounded-full bg-white/5 border transition-all active:scale-90 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0B2FF] focus-visible:ring-offset-1 focus-visible:ring-offset-black overflow-hidden ${
        isCopied
          ? "border-green-500/60 bg-green-950/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.35)]"
          : "border-white/10 text-neutral-400 hover:text-[#D0B2FF] hover:bg-white/10 hover:border-[#D0B2FF]/30"
      } ${buttonSize} ${className}`}
      aria-label="Partilhar música"
      title={isCopied ? "Link Copiado!" : "Partilhar Link"}
    >
      <AnimatePresence mode="wait">
        {isCopied ? (
          <motion.div
            key="copied-glitch"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [1, 1.35, 0.85, 1.15, 1],
              x: [0, -4, 4, -2, 2, 0],
              y: [0, 2, -2, 1, -1, 0],
              skewX: [0, -15, 15, -7, 4, 0],
              rotate: [0, -12, 10, -5, 3, 0],
              opacity: 1,
            }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.15 } }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.7, 1],
            }}
            className="relative flex items-center justify-center"
          >
            {/* Cyan Glitch Ghost Layer */}
            <motion.div
              animate={{
                x: [-3, 3, -1, 0],
                opacity: [0.8, 0.4, 0.8, 0],
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 text-cyan-400 pointer-events-none filter blur-[0.5px]"
            >
              <Check className={iconSize} />
            </motion.div>

            {/* Red Glitch Ghost Layer */}
            <motion.div
              animate={{
                x: [3, -3, 1, 0],
                opacity: [0.8, 0.4, 0.8, 0],
              }}
              transition={{ duration: 0.3, delay: 0.04 }}
              className="absolute inset-0 text-rose-500 pointer-events-none filter blur-[0.5px]"
            >
              <Check className={iconSize} />
            </motion.div>

            {/* Primary Check Icon */}
            <Check className={`${iconSize} text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]`} />

            {/* Horizontal Glitch Scan Line */}
            <motion.div
              initial={{ x: "-100%", opacity: 1 }}
              animate={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: "linear" }}
              className="absolute inset-0 h-[2px] my-auto bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
            />
          </motion.div>
        ) : (
          <motion.div
            key="share-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Share2 className={iconSize} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyber pulse ring animation on copy */}
      <AnimatePresence>
        {isCopied && (
          <motion.span
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-green-400/80 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </button>
  );
}

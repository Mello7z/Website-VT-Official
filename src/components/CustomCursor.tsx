import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CustomCursorProps {
  isEnabled?: boolean;
}

export default function CustomCursor({ isEnabled = true }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isHoveringCapituloTwo, setIsHoveringCapituloTwo] = useState(false);
  const [lastCapituloTwoId, setLastCapituloTwoId] = useState<string | null>(null);

  // Detect pointer features (mouse vs touch)
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setIsFinePointer(media.matches);
    const listener = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Set cursor:none on document element when fine-pointer is active and cursor is visible
  useEffect(() => {
    if (isFinePointer && visible && isEnabled) {
      document.documentElement.classList.add("custom-cursor-active");
    } else {
      document.documentElement.classList.remove("custom-cursor-active");
    }
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isFinePointer, visible, isEnabled]);

  // Handle global mouse moves / events
  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Traversal to find hover status of Capítulo II or interactive elements
      let el = e.target as HTMLElement | null;
      let clickable = false;
      let capituloTwo = false;
      let trackId: string | null = null;

      while (el && el !== document.body) {
        const tagName = el.tagName?.toLowerCase();
        
        if (
          tagName === "button" ||
          tagName === "a" ||
          el.classList.contains("cursor-pointer") ||
          el.getAttribute("role") === "button"
        ) {
          clickable = true;
        }

        if (el.getAttribute("data-capitulo-ii") === "true") {
          capituloTwo = true;
          const trId = el.getAttribute("key") || el.getAttribute("data-track-id");
          if (trId) trackId = trId;
        }

        el = el.parentElement;
      }

      setIsHoveringClickable(clickable);
      setIsHoveringCapituloTwo(capituloTwo);
      if (capituloTwo && trackId) {
        setLastCapituloTwoId(trackId);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isFinePointer, visible]);

  if (!isFinePointer || !visible || !isEnabled) return null;

  return (
    <div
      id="bespoke-reticle-cursor"
      className="fixed inset-0 pointer-events-none z-[9999] select-none"
    >
      <div
        className="absolute top-0 left-0 transition-all duration-75 ease-out"
        style={{
          transform: `translate3d(calc(${position.x}px - 50%), calc(${position.y}px - 50%), 0)`,
        }}
      >
        {/* Cursor Jitter and Theme Container */}
        <div
          className={`relative flex items-center justify-center w-16 h-16 transition-all duration-300 ${
            isHoveringCapituloTwo
              ? "animate-cursor-jitter text-red-500 scale-110"
              : isHoveringClickable
              ? "text-[#D0B2FF] scale-125"
              : "text-white/60 scale-100"
          }`}
        >
          {/* Central target dot */}
          <span
            className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isHoveringCapituloTwo
                ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
                : clicked
                ? "bg-white scale-75"
                : "bg-[#D0B2FF]/80"
            }`}
          />

          {/* Outer Crosshair Circle */}
          <span
            className={`absolute inset-3 rounded-full border transition-all duration-300 ${
              isHoveringCapituloTwo
                ? "border-red-600/70 border-dashed border-spacing-1 animate-spin-[2s_linear_infinite]"
                : isHoveringClickable
                ? "border-[#D0B2FF]/50 border-double scale-110"
                : "border-white/20"
            }`}
          />

          {/* Precision Reticle Crosshairs */}
          {/* Top Hair */}
          <span
            className={`absolute top-0 w-[1px] h-2 transition-all duration-300 ${
              isHoveringCapituloTwo ? "bg-red-500/80 h-3" : "bg-white/30"
            }`}
          />
          {/* Bottom Hair */}
          <span
            className={`absolute bottom-0 w-[1px] h-2 transition-all duration-300 ${
              isHoveringCapituloTwo ? "bg-red-500/80 h-3" : "bg-white/30"
            }`}
          />
          {/* Left Hair */}
          <span
            className={`absolute left-0 h-[1px] w-2 transition-all duration-300 ${
              isHoveringCapituloTwo ? "bg-red-500/80 w-3" : "bg-white/30"
            }`}
          />
          {/* Right Hair */}
          <span
            className={`absolute right-0 h-[1px] w-2 transition-all duration-300 ${
              isHoveringCapituloTwo ? "bg-red-500/80 w-3" : "bg-white/30"
            }`}
          />

          {/* Eerie scanner ripple ring on click or on Capitulo II item hover */}
          <AnimatePresence>
            {(clicked || isHoveringCapituloTwo) && (
              <motion.span
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isHoveringCapituloTwo ? 0.45 : 0.25, repeat: isHoveringCapituloTwo ? Infinity : 0, ease: "easeOut" }}
                className={`absolute inset-0 rounded-full border ${
                  isHoveringCapituloTwo ? "border-red-700/50" : "border-[#D0B2FF]/40"
                }`}
              />
            )}
          </AnimatePresence>

          {/* Subtle text telemetry when pointing at Capitulo II items */}
          <AnimatePresence>
            {isHoveringCapituloTwo && (
              <motion.div
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 18, y: 18 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute left-1/2 top-1/2 font-mono text-[7px] text-red-500 font-bold whitespace-nowrap bg-black/80 px-1 py-0.5 border border-red-500/30 rounded select-none shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex flex-col space-y-0.5 tracking-wider"
              >
                <span className="flex items-center space-x-1">
                  <span className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                  <span>SINAL CORROMPIDO</span>
                </span>
                <span className="text-[6px] text-red-500/65">LOCK // AUDIO_RAW</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

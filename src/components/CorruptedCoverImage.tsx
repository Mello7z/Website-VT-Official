import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CorruptedCoverImageProps {
  isCorrupted?: boolean;
  src?: string;
  className?: string;
  alt?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  [key: string]: any;
}

export default function CorruptedCoverImage({
  isCorrupted,
  src,
  className,
  alt,
  onError,
  ...props
}: CorruptedCoverImageProps) {
  const frames = [
    "/previas/VT1.png",
    "/previas/VT2.png",
    "/previas/VT3.png",
    "/previas/VT4.png",
    "/previas/VT5.png",
    "/previas/VT6.png",
    "/previas/VT7.png"
  ];
  
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [horrorNoise, setHorrorNoise] = useState(0); // 0 to 4 different distortion layers
  const [flickerActive, setFlickerActive] = useState(false);

  // Cycle through VT1-VT5 with creepy instability and high-speed flickering horror animation
  useEffect(() => {
    if (!isCorrupted) return;

    // Fast image cycle interval for that erratic "unstable transformation / terror look"
    const frameInterval = setInterval(() => {
      // Sometimes jump to a random index for scary unpredictability, otherwise sequential.
      setCurrentFrameIndex((prev) => {
        const isSpasm = Math.random() < 0.35;
        if (isSpasm) {
          return Math.floor(Math.random() * frames.length);
        }
        return (prev + 1) % frames.length;
      });

      // Rapid contrast/brightness spike
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 90);
    }, 280); // Fast cycle rate of 280ms for spooky energy

    // Fast lights flicker & black screens representing terror glitches
    const flickerInterval = setInterval(() => {
      setFlickerActive(true);
      setHorrorNoise(Math.floor(Math.random() * 4));
      setTimeout(() => {
        setFlickerActive(false);
      }, Math.random() * 120 + 30); // Random short blackout bursts
    }, 600);

    return () => {
      clearInterval(frameInterval);
      clearInterval(flickerInterval);
    };
  }, [isCorrupted]);

  const finalSrc = isCorrupted ? frames[currentFrameIndex] : src;

  if (isCorrupted) {
    return (
      <div className="relative overflow-hidden w-full h-full bg-black select-none pointer-events-none flex items-center justify-center">
        {/* Extreme Red Vignetts & Terror Static Overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/80 to-red-950/90 z-20 pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-0 bg-red-950/30 mix-blend-color-dodge pointer-events-none z-10 animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-10" />

        {/* Static horizontal glitch lines */}
        <div 
          className="absolute left-0 right-0 h-[2px] bg-red-500/45 z-20 pointer-events-none"
          style={{
            top: `${(horrorNoise * 25) + 10}%`,
            opacity: glitchActive ? 1 : 0.2,
            boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)"
          }}
        />

        {/* Absolute pitch black screen flicker dropouts */}
        <div 
          className={`absolute inset-0 bg-black z-30 transition-opacity duration-75 pointer-events-none ${
            flickerActive && Math.random() < 0.7 ? "opacity-95" : "opacity-0"
          }`} 
        />
        
        {/* Red Warning Glitch Block */}
        {glitchActive && Math.random() < 0.4 && (
          <div className="absolute inset-0 bg-red-900/50 mix-blend-difference z-25 flex items-center justify-center">
            <span className="font-mono text-[9px] text-red-500 font-extrabold tracking-[0.25em] bg-black/80 px-2 py-1 border border-red-500/30 animate-ping">
              ERROR: CORRUPT_MUT_SYS
            </span>
          </div>
        )}

        {/* Transformable Animated Frames */}
        <motion.img
          src={finalSrc}
          alt={alt}
          className={`${className} filter transition-all duration-75`}
          animate={{
            scale: glitchActive ? [1, 1.15, 0.92, 1.08, 1] : [1, 1.02, 1],
            x: glitchActive ? [0, -12, 12, -6, 0] : [0, -1, 1, 0],
            y: glitchActive ? [0, 8, -8, 4, 0] : [0, 1, -1, 0],
            filter: glitchActive 
              ? "brightness(2.2) contrast(2.5) hue-rotate(45deg) saturate(3)" 
              : "brightness(0.6) contrast(1.4) saturate(0.8) sepia(0.35)",
            rotate: glitchActive ? [0, -2, 2, -1, 0] : 0
          }}
          transition={{
            duration: 0.18,
            ease: "linear"
          }}
          onError={onError}
          {...(props as any)}
        />

        {/* Binary cyber lines indicator overlay */}
        <div className="absolute bottom-2 left-2 right-2 font-mono text-[7px] text-red-600/70 tracking-widest z-20 flex justify-between">
          <span>MUT_SEQ_ACTIVE: {currentFrameIndex + 1}/{frames.length}</span>
          <span className="animate-pulse">FALHA_VILLAFAN</span>
        </div>
      </div>
    );
  }

  // Fallback to regular image rendering if not corrupted
  return (
    <img
      src={src}
      className={className}
      alt={alt}
      onError={onError}
      {...props}
    />
  );
}

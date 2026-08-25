import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  isHovered?: boolean;
  footerProgress?: number; // 0 to 1 as the section approaches full view
  activeSection?: string;
  isAbsoluteEnd?: boolean;
}

// Letter-by-letter staggered subtitle with timed cinematic sequencing
function CinemaSubtitle({ text, isVisible, delay = 0.6 }: { text: string; isVisible: boolean; delay?: number }) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
    visible: {
      opacity: 0.75,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="font-mono text-[9px] sm:text-xs text-neutral-400 max-w-xl mx-auto uppercase tracking-[0.4em] flex flex-wrap justify-center gap-x-[0.4em] select-none leading-relaxed"
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex flex-nowrap whitespace-nowrap">
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              variants={letterVariants}
              key={charIdx}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.p>
  );
}

// Highly stylized Glitch Text component supporting advanced letter-by-letter scrambling, physical stability loss & drift
function GlitchLogo({ 
  text, 
  trigger, 
  tiltX, 
  tiltY, 
  isHorrorVibrating 
}: { 
  text: string; 
  trigger: boolean; 
  tiltX: number; 
  tiltY: number; 
  isHorrorVibrating: boolean;
}) {
  const [letters, setLetters] = useState<Array<{
    id: number;
    char: string;
    origChar: string;
    driftX: number;
    driftY: number;
    rotate: number;
    scale: number;
    opacity: number;
    color: string;
    isFlying: boolean;
    flyX: number;
  }>>([]);

  const [glitchActive, setGlitchActive] = useState(false);

  // Initialize and synchronize with incoming text
  useEffect(() => {
    const chars = text.split("");
    setLetters(chars.map((char, index) => ({
      id: index,
      char: char,
      origChar: char,
      driftX: 0,
      driftY: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      color: "#F5F5F5",
      isFlying: false,
      flyX: 0
    })));

    if (!trigger) return;

    // Trigger immediate transition scramble when text swaps
    let counter = 0;
    const glitchSymbols = "✦۞✶◌_X!%@#710[]&†‡☠§¶";
    const interval = setInterval(() => {
      setLetters(prev => prev.map((l, index) => {
        if (index >= chars.length) return l;
        const targetChar = chars[index];
        const isDone = counter > 7;
        
        if (isDone) {
          return {
            ...l,
            char: targetChar,
            origChar: targetChar,
            driftX: 0,
            driftY: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            color: "#F5F5F5",
            isFlying: false,
          };
        }

        // Mid-scramble state: high entropy, physical destructuring
        const randomChar = Math.random() < 0.38 ? glitchSymbols[Math.floor(Math.random() * glitchSymbols.length)] : targetChar;
        const driftX = (Math.random() * 30 - 15); // Letters slip out of alignment
        const driftY = (Math.random() * 18 - 9);
        const rotate = (Math.random() * 24 - 12); // Letters rotate slightly
        const scale = Math.random() * 0.3 + 0.85;
        const opacity = Math.random() * 0.45 + 0.55;
        const colors = ["#F5F5F5", "#7A0000", "#A30000", "#4B1E6D", "#8B5CF6", "#7A7A7A"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Flying letter chance - shoots horizontally
        const isFlying = Math.random() < 0.08;
        const flyX = isFlying ? (Math.random() * 400 - 200) : 0;

        return {
          ...l,
          char: randomChar,
          origChar: targetChar,
          driftX,
          driftY,
          rotate,
          scale,
          opacity,
          color,
          isFlying,
          flyX
        };
      }));

      counter++;
      if (counter > 9) {
        clearInterval(interval);
        // Ensure perfect alignment rest
        setLetters(chars.map((char, index) => ({
          id: index,
          char: char,
          origChar: char,
          driftX: 0,
          driftY: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          color: "#F5F5F5",
          isFlying: false,
          flyX: 0
        })));
      }
    }, 60);

    return () => clearInterval(interval);
  }, [text, trigger]);

  // Slow ambient drift & separation animation loop to make letters float, move, and rotate slightly
  useEffect(() => {
    if (!trigger) return;
    const driftInterval = setInterval(() => {
      setLetters(prev => prev.map(l => {
        // Slow drift offset (VILLAFAN is sliding out of control)
        const isDrifting = Math.random() < 0.35;
        const targetDriftX = isDrifting ? (Math.random() * 14 - 7) : l.driftX * 0.75;
        const targetDriftY = isDrifting ? (Math.random() * 10 - 5) : l.driftY * 0.75;
        const targetRotate = isDrifting ? (Math.random() * 12 - 6) : l.rotate * 0.75;
        const targetScale = isDrifting ? (0.94 + Math.random() * 0.12) : 1;
        const targetOpacity = isDrifting ? (0.75 + Math.random() * 0.25) : 1;
        
        // Randomly scramble a single character for brief digital noise
        const shouldNoise = Math.random() < 0.04;
        const noiseSymbols = "✦۞✶_X%☠";
        const currentCharacter = shouldNoise ? noiseSymbols[Math.floor(Math.random() * noiseSymbols.length)] : l.origChar;

        return {
          ...l,
          char: currentCharacter,
          driftX: targetDriftX,
          driftY: targetDriftY,
          rotate: targetRotate,
          scale: targetScale,
          opacity: targetOpacity
        };
      }));
    }, 1100);

    return () => clearInterval(driftInterval);
  }, [trigger]);

  // When high horror vibration or screamer pops, shake letters severely
  useEffect(() => {
    if (isHorrorVibrating) {
      setLetters(prev => prev.map(l => {
        const severeDriftX = (Math.random() * 32 - 16);
        const severeDriftY = (Math.random() * 32 - 16);
        const severeRotate = (Math.random() * 45 - 22.5);
        const severeScale = 0.82 + Math.random() * 0.35;
        const severeOpacity = 0.55 + Math.random() * 0.45;
        const colors = ["#7A0000", "#A30000", "#4B1E6D", "#8B5CF6", "#7A7A7A"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Let some letters fly across the screen
        const isFlying = Math.random() < 0.18;
        const flyX = isFlying ? (Math.random() * 600 - 300) : 0;

        return {
          ...l,
          driftX: severeDriftX,
          driftY: severeDriftY,
          rotate: severeRotate,
          scale: severeScale,
          opacity: severeOpacity,
          color,
          isFlying,
          flyX
        };
      }));
    } else {
      // Ease back
      setLetters(prev => prev.map(l => ({
        ...l,
        color: "#F5F5F5",
        isFlying: false,
        flyX: 0
      })));
    }
  }, [isHorrorVibrating]);

  const randomShiftX = isHorrorVibrating ? (Math.random() * 8 - 4) : 0;
  const randomShiftY = isHorrorVibrating ? (Math.random() * 8 - 4) : 0;

  return (
    <div 
      className="relative select-none cursor-default py-4 flex items-center justify-center flex-wrap gap-x-1 sm:gap-x-2 md:gap-x-3 notranslate"
      translate="no"
      style={{
        transform: `perspective(1000px) rotateX(${tiltY * -12 + randomShiftY}deg) rotateY(${tiltX * 12 + randomShiftX}deg) translate3d(${randomShiftX}px, ${randomShiftY}px, 0px)`,
        transformStyle: "preserve-3d"
      }}
    >
      {letters.map((l, index) => (
        <motion.span
          key={`${index}-${l.origChar}`}
          animate={{
            x: l.isFlying ? l.flyX : l.driftX,
            y: l.driftY,
            rotate: l.rotate,
            scale: l.scale,
            opacity: l.opacity,
            color: l.color
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            mass: 0.6
          }}
          className="font-sans text-[66px] sm:text-[104px] md:text-[148px] font-bold tracking-tighter leading-none uppercase inline-block select-none"
          style={{
            textShadow: l.color !== "#F5F5F5" ? `0px 0px 10px ${l.color}` : "none",
            transformOrigin: "center center"
          }}
        >
          {l.char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Footer({ isHovered = false, footerProgress = 0, activeSection = "", isAbsoluteEnd = false }: FooterProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);
  const [timePhase, setTimePhase] = useState(0); // For timing text screens
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Identity Glitch state values inside Footer
  const [footerTitle, setFooterTitle] = useState("VILLAFAN");
  const [footerGlitchActive, setFooterGlitchActive] = useState(false);
  const [footerTitleOffset, setFooterTitleOffset] = useState({ x: 0, y: 0 });
  const [shutdownInitiated, setShutdownInitiated] = useState(false);
  const [shutdownFinished, setShutdownFinished] = useState(false);
  const [fullScreenFlash, setFullScreenFlash] = useState(false);
  
  // Social link reactive text scrambling and glitch indicators
  const [socialTexts, setSocialTexts] = useState<string[]>(["INSTAGRAM", "SPOTIFY", "YOUTUBE"]);
  const [socialHoveredIndex, setSocialHoveredIndex] = useState<number | null>(null);

  // Psychological Horror End state components
  const [isScreenFlickering, setIsScreenFlickering] = useState(false);
  const [showSubliminal, setShowSubliminal] = useState(false);
  const [forceNonExistentPhrase, setForceNonExistentPhrase] = useState(false);

  // Stillness Screamer Easter Egg states
  const [idleScreamerActive, setIdleScreamerActive] = useState(false);
  const [idleScreamerFlash, setIdleScreamerFlash] = useState(false);
  const [footerFrameIndex, setFooterFrameIndex] = useState(0);
  const [activeFramesCount, setActiveFramesCount] = useState(5);
  const [availableFrames, setAvailableFrames] = useState<string[]>([
    "/final/VT0.png",
    "/final/VT1.png",
    "/final/VT2.png",
    "/final/VT3.png",
    "/final/VT4.png"
  ]);

  // Dynamic self-healing routine to detect exactly how many consecutive VT*.png files exist in /final/
  useEffect(() => {
    let active = true;
    const checkFrames = async () => {
      const found: string[] = [];
      for (let i = 0; i <= 7; i++) {
        try {
          const path = `/final/VT${i}.png`;
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = path;
          });
          if (!active) return;
          found.push(path);
        } catch (e) {
          // If files don't load, skip them gracefully
        }
      }
      if (active && found.length > 0) {
        setAvailableFrames(found);
        setActiveFramesCount(found.length);
      }
    };
    checkFrames();
    return () => {
      active = false;
    };
  }, []);

  // Synthesis of eerie analogue TV signal static interference on hover (low hum & noise pop)
  const playWebAudioStaticInterference = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Setup low tension frequency oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(60, ctx.currentTime); // Low electricity transformer hum (60 Hz)
      
      // Make a white noise click pop buffer to simulate old cathode failure
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3) * 0.18;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(450, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      
      osc.connect(gain);
      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      noise.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Audio fallback bypass
    }
  };

  const socialLinks = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/villafanx/", target: "_blank" },
    { label: "SPOTIFY I", href: "https://open.spotify.com/intl-pt/artist/0edPG862fVT7XSF3J5aGmo", target: "_blank" },
    { label: "SPOTIFY II", href: "https://open.spotify.com/intl-pt/artist/0dD9AbgWM9XSkkq9EpXAkX", target: "_blank" },
  ];

  // Mouse vector tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Set sequence of core subtitle stages
  const isSectionEntered = footerProgress > 0.1 || activeSection === "footer";

  useEffect(() => {
    if (!isSectionEntered) {
      setTimePhase(0);
      // Reset all dramatic TV signal lost and horror states
      setShutdownInitiated(false);
      setShutdownFinished(false);
      setFullScreenFlash(false);
      setIsScreenFlickering(false);
      setShowSubliminal(false);
      setForceNonExistentPhrase(false);
      setIdleScreamerActive(false);
      setIdleScreamerFlash(false);
      setFooterTitle("VILLAFAN");
      setFooterGlitchActive(false);
      setFooterTitleOffset({ x: 0, y: 0 });
      return;
    }

    // Phase 1: "ESSE É MEU FUTURO."
    const timer1 = setTimeout(() => {
      setTimePhase(1);
    }, 1800);

    return () => {
      clearTimeout(timer1);
    };
  }, [isSectionEntered]);

  // High-frequency horror frame cycling for footer terror triggers matching the corrupted music track cover sequence
  useEffect(() => {
    if (!isSectionEntered) return;

    const interval = setInterval(() => {
      setFooterFrameIndex((prev) => {
        // Scary twitch offsets (sometimes jumps to a random frame, otherwise sequential)
        const isSpasm = Math.random() < 0.28;
        if (isSpasm) {
          return Math.floor(Math.random() * activeFramesCount);
        }
        return (prev + 1) % activeFramesCount;
      });
    }, 120); // Extreme lightning speed (120ms cycle time)

    return () => clearInterval(interval);
  }, [isSectionEntered, activeFramesCount]);

  // 1. Ambient Frequent Logo Identity Glitch loop inside Footer (VILLAFAN <-> VT)
  useEffect(() => {
    if (!isSectionEntered || shutdownInitiated) return;
    
    let active = true;
    
    const triggerAmbientLogoGlitch = () => {
      if (!active || shutdownInitiated) return;
      
      const sequence = [
        { text: "VILLAF_N", duration: 90, offset: { x: -3, y: 1 } },
        { text: "VT", duration: 110, offset: { x: 4, y: -2 } },
        { text: "VILLAFAN", duration: 80, offset: { x: 0, y: 0 } }
      ];
      
      let stepIdx = 0;
      
      const executeStep = () => {
        if (!active || shutdownInitiated) return;
        if (stepIdx >= sequence.length) {
          // Dynamic back and forth swap between VILLAFAN and VT to keep them alternating constantly
          setFooterTitle(prev => prev === "VILLAFAN" ? "VT" : "VILLAFAN");
          setFooterGlitchActive(false);
          setFooterTitleOffset({ x: 0, y: 0 });
          
          // Schedule next glitch cycle very frequently (every 1.5 to 3.2 seconds)
          const nextDelay = Math.random() * 1500 + 1200;
          setTimeout(triggerAmbientLogoGlitch, nextDelay);
          return;
        }
        
        const step = sequence[stepIdx];
        setFooterTitle(step.text);
        setFooterGlitchActive(true);
        setFooterTitleOffset(step.offset);
        
        // Symmetrically trigger sfx or quick lights flickering
        if (Math.random() < 0.4) {
          setIsScreenFlickering(true);
          setTimeout(() => setIsScreenFlickering(false), 60);
        }
        
        stepIdx++;
        setTimeout(executeStep, step.duration);
      };
      
      executeStep();
    };
    
    const initialDelay = setTimeout(triggerAmbientLogoGlitch, 2000);
    
    return () => {
      active = false;
      clearTimeout(initialDelay);
    };
  }, [isSectionEntered, shutdownInitiated]);

  // Rare, ultra-subliminal hover image flashes prior to shutdown to build tension
  useEffect(() => {
    if (!isSectionEntered || shutdownInitiated) return;
    
    const interval = setInterval(() => {
      if (Math.random() * 100 < 8) {
        setFullScreenFlash(true);
        playWebAudioStaticInterference();
        setTimeout(() => {
          setFullScreenFlash(false);
        }, 45);
      }
    }, 4500);
    
    return () => clearInterval(interval);
  }, [isSectionEntered, shutdownInitiated]);

  // Rapid, intermittent horror flashes of the full-screen VT face once shutdown takes over
  useEffect(() => {
    if (!shutdownInitiated) return;
    
    let active = true;
    
    const runFlashes = () => {
      if (!active) return;
      
      setFullScreenFlash(true);
      playWebAudioStaticInterference();
      
      setTimeout(() => {
        setFullScreenFlash(false);
        const nextInterval = Math.random() * 550 + 350; // between 350ms and 900ms
        setTimeout(runFlashes, nextInterval);
      }, Math.random() * 70 + 50); // visible for 50-120ms
    };
    
    const startTimeout = setTimeout(runFlashes, 200);
    
    return () => {
      active = false;
      clearTimeout(startTimeout);
    };
  }, [shutdownInitiated]);

  // 2. Cinematic TV Signal Lost Shutdown script triggered by scroll depth or 5 seconds stillness
  const startTVShutdown = () => {
    if (shutdownInitiated) return;
    setShutdownInitiated(true);
    
    // Sequence steps: VILLAFAN -> VT -> VILLAFAN -> VT -> ████████ -> VT
    const steps = [
      { text: "VILLAFAN", duration: 250, flashColor: "white", textOffset: { x: -2, y: 1 } },
      { text: "VT", duration: 220, flashColor: "purple", textOffset: { x: 4, y: -2 } },
      { text: "VILLAFAN", duration: 240, flashColor: "red", textOffset: { x: -4, y: 3 } },
      { text: "VT", duration: 200, flashColor: "purple", textOffset: { x: 3, y: -1 } },
      { text: "████████", duration: 320, flashColor: "none", textOffset: { x: 0, y: 0 } },
      { text: "VT", duration: 400, flashColor: "white", textOffset: { x: 5, y: -3 } }
    ];
    
    let delayAccumulator = 0;
    
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setFooterTitle(step.text);
        setFooterGlitchActive(true);
        setFooterTitleOffset(step.textOffset);
        setIsScreenFlickering(true);
        
        // Play static pops
        playWebAudioStaticInterference();
        
        setTimeout(() => {
          setIsScreenFlickering(false);
        }, step.duration - 50);
        
      }, delayAccumulator);
      delayAccumulator += step.duration;
    });
    
    // Move to pure void black screen aftermath
    setTimeout(() => {
      setFooterTitle("");
      setShutdownFinished(true); // locks everything in absolute static drop
      
      // Keep it pitch black for 1.3 seconds
      setTimeout(() => {
        // Trigger ONE lightning fast visual scream frame of the scary image
        setIdleScreamerFlash(true);
        playWebAudioStaticInterference();
        
        // Turn off scare flash, and display only grey VT text representation
        setTimeout(() => {
          setIdleScreamerFlash(false);
          setFooterTitle("VT");
          setFooterGlitchActive(true);
          setFooterTitleOffset({ x: 0, y: 0 });
          
          // Let "VT" fade out completely to absolute silence after 3 seconds
          setTimeout(() => {
            setFooterTitle("");
            setFooterGlitchActive(false);
          }, 3000);
          
        }, 180);
      }, 1300);
      
    }, delayAccumulator);
  };

  // 3. Monitor scroll depth or inactivity timer to kick off TV signal lost shutdown
  useEffect(() => {
    if (!isSectionEntered || shutdownInitiated) return;
    
    // If user is at Absolute End, trigger shutdown instantly
    if (isAbsoluteEnd) {
      startTVShutdown();
      return;
    }
    
    let idleTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      if (shutdownInitiated) return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        startTVShutdown();
      }, 5000); // 5 seconds of inactivity
    };
    
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    
    // Start initial timer
    resetTimer();
    
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [isSectionEntered, isAbsoluteEnd, shutdownInitiated]);

  // HTML5 Starfield Canvas Particle Code representing drifting glowing static dust
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particlesCount = 40;
    const particlesList: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
      phase: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      particlesList.push({
        x: px,
        y: py,
        baseX: px,
        baseY: py,
        size: Math.random() * 1.3 + 0.4,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.4 + 0.1,
        twinkleSpeed: Math.random() * 0.008 + 0.002,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // In case of absolute end, or full idle black screen screamer, dim down completely
      const globalDecay = (isAbsoluteEnd || idleScreamerActive) ? 0 : 1;

      particlesList.forEach((p) => {
        p.baseX += p.speedX;
        p.baseY += p.speedY;

        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        // Gravity drag towards interactive cursor
        const interactionX = mousePos.x * 20 * (p.size * 0.6);
        const interactionY = mousePos.y * 20 * (p.size * 0.6);

        p.x = p.baseX + interactionX;
        p.y = p.baseY + interactionY;

        p.phase += p.twinkleSpeed;
        const alpha = p.opacity * (0.3 + Math.sin(p.phase) * 0.7) * globalDecay;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 205, 255, ${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mousePos, isAbsoluteEnd, idleScreamerActive]);

  // Atmospheric symbols and details revealed only under illumination
  const doodles = [
    { text: "✦", x: "15%", y: "22%", size: "text-2xl" },
    { text: "☾", x: "85%", y: "16%", size: "text-4xl" },
    { text: "۞", x: "22%", y: "68%", size: "text-3xl" },
    { text: "✶", x: "74%", y: "77%", size: "text-xl" },
    { text: "♆", x: "48%", y: "12%", size: "text-2xl" },
    { text: "◌", x: "89%", y: "48%", size: "text-lg" },
  ];

  // Map interactive coordinates to sweep the spotlight flashlight effect on mouse movement
  const posX = (mousePos.x + 1) * 50; 
  const posY = (mousePos.y + 1) * 50;

  return (
    <footer 
      id="footer" 
      className={`relative min-h-[110vh] sm:min-h-screen flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden z-20 select-none pb-32 transition-all duration-[1200ms] ${
        shutdownInitiated ? "bg-[#000000]" : isHovered ? "bg-black/0" : "bg-black"
      } ${isScreenFlickering ? "brightness-[0.35] saturate-[1.8]" : "brightness-100"}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtle-analog-film {
          0% { transform: translate(0, 0) }
          12% { transform: translate(-0.5%, -0.5%) }
          25% { transform: translate(-1%, 0.5%) }
          38% { transform: translate(0.5%, -1%) }
          50% { transform: translate(-0.5% ,1.2%) }
          63% { transform: translate(-0.5%, 0.5%) }
          75% { transform: translate(1%, -0.5%) }
          88% { transform: translate(-1%, 1%) }
          100% { transform: translate(0, 0) }
        }
        .vibrating-grain {
          animation: subtle-analog-film 1.4s steps(6) infinite;
        }
        .crt-scanline {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.4) 50%
          ), linear-gradient(
            90deg, 
            rgba(255, 0, 0, 0.08), 
            rgba(0, 255, 0, 0.04), 
            rgba(0, 0, 255, 0.08)
          );
          background-size: 100% 4px, 6px 100%;
        }
      `}} />

      {/* Cinematic TV Scanlines Layer with heightened interference on system failure */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 crt-scanline mix-blend-color-burn transition-opacity duration-[1500ms]" 
        style={{ 
          opacity: shutdownInitiated ? 0.65 : 0.22,
          display: isAbsoluteEnd ? "none" : "block" 
        }}
      />

      {/* VHS Analog Grain Noise layer - heavily amplified when horror begins */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/></svg>')] vibrating-grain transition-opacity duration-[1500ms]" 
        style={{ 
          opacity: shutdownInitiated ? 0.38 : 0.11,
          display: isAbsoluteEnd ? "none" : "block"
        }}
      />

      {/* HTML5 Starfield system */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 brightness-150" 
      />

      {/* Fallback illuminating flashlight tracking mouse vector */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          opacity: (isAbsoluteEnd || idleScreamerActive || shutdownInitiated) ? 0 : 0.42,
          background: `radial-gradient(circle 350px at ${posX}% ${posY}%, rgba(255,255,255,0.065) 0%, rgba(208,178,255,0.01) 45%, transparent 100%)`
        }}
      />

      {/* Hand-drawn cryptic outlines hidden to be revealed inside flashlight sweep */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden object-cover select-none">
        {doodles.map((d, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isSectionEntered && !isAbsoluteEnd && !idleScreamerActive && !shutdownInitiated ? 0.08 : 0, 
                scale: 1 + mousePos.y * 0.05 
              }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
              className={`absolute font-mono text-neutral-400 select-none ${d.size}`}
              style={{
                left: d.x,
                top: d.y,
                filter: "blur(0.5px)"
              }}
            >
              {d.text}
            </motion.div>
          );
        })}
      </div>

      {/* Subliminal VT-MAL Flash effect, showing up very briefly on random ticks */}
      <AnimatePresence>
        {showSubliminal && !isAbsoluteEnd && !idleScreamerActive && !shutdownInitiated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 pointer-events-none bg-black/50 flex items-center justify-center mix-blend-difference"
          >
            <motion.img 
              src={availableFrames[footerFrameIndex % availableFrames.length]}
              alt="VT Subliminal Frame"
              referrerPolicy="no-referrer"
              className="w-full max-w-[420px] h-auto object-contain grayscale brightness-200 invert filter contrast-200"
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                x: [0, -6, 6, -3, 0],
                y: [0, 4, -4, 2, 0],
              }}
              transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
              onError={(e) => {
                e.currentTarget.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg: Idle Screamer single fast flash of VT-MAL */}
      <AnimatePresence>
        {idleScreamerFlash && !isAbsoluteEnd && (
          <div className="absolute inset-0 z-40 bg-[#080808] flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Extreme Red Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/90 to-red-950/95 z-20 pointer-events-none mix-blend-multiply" />
            <div className="absolute inset-0 bg-red-900/10 pointer-events-none z-10 animate-pulse" />
            
            <motion.img 
              src={availableFrames[footerFrameIndex % availableFrames.length]}
              alt="VT Screamer static"
              referrerPolicy="no-referrer"
              className="w-full max-w-[500px] h-auto object-contain filter transition-all grayscale contrast-[2] brightness-[1.8] saturate-[1.8]"
              animate={{
                scale: [1.02, 1.15, 0.95, 1.1, 1.02],
                x: [0, -12, 12, -6, 0],
                y: [0, 8, -8, 4, 0],
                rotate: [0, -2, 2, -1, 0]
              }}
              transition={{ duration: 0.16, repeat: Infinity, ease: "linear" }}
              onError={(e) => {
                e.currentTarget.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
              }}
            />
            
            {/* Severe blood outline border overlay */}
            <div className="absolute inset-0 bg-red-950/15 border-[10px] sm:border-[20px] border-red-900/60 pointer-events-none z-30" />
            
            {/* Binary tech overlays */}
            <div className="absolute bottom-5 left-5 font-mono text-[8px] text-red-500/80 tracking-widest z-30 animate-pulse">
              ANOMALIA DETECTADA: SINAL_FIM_ATIVO
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Cinematic Full Screen Intermittent Flash of VT Image covering viewport 100% */}
      <AnimatePresence>
        {fullScreenFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#000000] flex items-center justify-center pointer-events-none select-none overflow-hidden"
          >
            {/* Dark crimson vignette backing */}
            <div 
              className="absolute inset-0 z-10" 
              style={{
                background: "radial-gradient(circle, rgba(139,0,0,0.65) 0%, rgba(0,0,0,1) 85%)",
                mixBlendMode: "multiply"
              }}
            />
            {/* Blood red color dodge glow overlay */}
            <div className="absolute inset-0 bg-red-950/40 mix-blend-color-dodge pointer-events-none z-10 animate-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.3)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.08),_rgba(0,255,0,0.03),_rgba(0,0,255,0.08))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-20" />

            {/* Solid Horizontal Glitch Line */}
            <div className="absolute left-0 right-0 h-[3px] bg-red-500/60 z-30 shadow-[0_0_15px_rgba(239,68,68,0.9)] animate-bounce" style={{ top: "42%" }} />

            {/* The full-screen VT face itself with ultimate shake & color/brightness spasms */}
            <motion.img 
              src={availableFrames[footerFrameIndex % availableFrames.length]}
              alt="VT Cinematic Flash"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter transition-transform duration-75 grayscale contrast-[2.2] scale-[1.08] mix-blend-screen opacity-95"
              animate={{
                scale: [1.05, 1.25, 0.92, 1.18, 1.05],
                x: [0, -18, 18, -10, 0],
                y: [0, 12, -12, 6, 0],
                rotate: [0, -3, 3, -1.5, 0],
                filter: [
                  "brightness(0.65) contrast(2.2) saturate(1.5)",
                  "brightness(1.5) contrast(3.0) hue-rotate(90deg) saturate(3)",
                  "brightness(0.4) contrast(1.8) saturate(0.8)",
                  "brightness(1.2) contrast(2.5) hue-rotate(-30deg) saturate(2)",
                  "brightness(0.65) contrast(2.2) saturate(1.5)"
                ]
              }}
              transition={{
                duration: 0.22,
                repeat: Infinity,
                ease: "linear"
              }}
              onError={(e) => {
                e.currentTarget.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
              }}
            />
            
            {/* Tech details panel overlay for cybernetic horror feel */}
            <div className="absolute top-6 left-6 font-mono text-[9px] text-red-500 tracking-[0.2em] z-30 select-none flex flex-col space-y-1">
              <span className="flex items-center space-x-1.5 font-black text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                <span>ADVERTENCIA: INSTABILIDADE DE SINAL</span>
              </span>
              <span className="text-red-600/70">SYS_VILLAFAN_CORRUPTED // SEQUENCIA_TERMINAL: VT{footerFrameIndex}</span>
            </div>

            <div className="absolute bottom-6 right-6 font-mono text-[8px] text-red-600/70 tracking-[0.3em] z-30 select-none">
              NÃO HÁ ESCAPATÓRIA.
            </div>

            {/* Severe frame border */}
            <div className="absolute inset-0 border-[16px] sm:border-[28px] border-red-950/80 pointer-events-none z-30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE TIMELINE COMPONENT */}
      <AnimatePresence mode="wait">
        {!shutdownFinished || footerTitle !== "" ? (
          <motion.div 
            key="horror-core"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 1 }}
            className={`text-center relative z-20 w-full max-w-4xl flex flex-col items-center justify-center transition-all ${
              shutdownFinished ? "space-y-0" : "space-y-20 px-4"
            }`}
          >
            {/* Massive Logo with Tilt Vectors and dynamic Identity Glitch coordinate shifts */}
            <div className="space-y-8 flex flex-col items-center relative">
              <div 
                style={{
                  transform: `translate3d(${footerTitleOffset.x}px, ${footerTitleOffset.y}px, 0px)`,
                  transition: "transform 0.08s ease-out"
                }}
              >
                <GlitchLogo 
                  text={footerTitle} 
                  trigger={isSectionEntered} 
                  tiltX={mousePos.x} 
                  tiltY={mousePos.y} 
                  isHorrorVibrating={isScreenFlickering || footerGlitchActive}
                />
              </div>

              {/* Phased Sequenced Cinematic Subtitles (Controlled by Time + Terror Flashes) */}
              {!shutdownInitiated && (
                <div className="min-h-[46px] flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    {forceNonExistentPhrase ? (
                      <motion.div
                        key="phrase-terror-flash"
                        initial={{ opacity: 0, filter: "brightness(2) blur(3px)" }}
                        animate={{ opacity: 1, filter: "brightness(1) blur(0px)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.05 }}
                      >
                        <CinemaSubtitle text="NÃO EXISTE VOLTA." isVisible={true} delay={0} />
                      </motion.div>
                    ) : (
                      timePhase === 1 && (
                        <motion.div
                           key="phrase-cinematic-future"
                           initial={{ opacity: 0, filter: "blur(6px)" }}
                           animate={{ opacity: 1, filter: "blur(0px)" }}
                           exit={{ opacity: 0, y: -10 }}
                           transition={{ duration: 0.8 }}
                        >
                          <CinemaSubtitle text="ESSE É MEU FUTURO." isVisible={true} delay={0} />
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Secret interface layout for social linkages with custom interactive character scrambles */}
            {!shutdownInitiated && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isSectionEntered ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-6 pt-4 w-full"
              >
                {socialLinks.map((link, index) => {
                  const labelToDisplay = socialTexts[index] || link.label;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={link.target}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center relative font-mono text-[10px] text-zinc-500 hover:text-white transition-all duration-300 py-3 px-5 rounded-md border border-white/0 hover:border-white/10 bg-transparent"
                      onMouseEnter={() => {
                        playWebAudioStaticInterference();
                        setSocialHoveredIndex(index);
                        
                        // Scramble letters dynamically for interactive noise feedback
                        let scrambleCounter = 0;
                        const charsList = "✦۞✶◌_X[]";
                        const originalWord = link.label;
                        const tokenInterval = setInterval(() => {
                          setSocialTexts(prev => {
                            const clone = [...prev];
                            clone[index] = originalWord.split("").map(c => {
                              return Math.random() < 0.38 ? charsList[Math.floor(Math.random() * charsList.length)] : c;
                            }).join("");
                            return clone;
                          });
                          scrambleCounter++;
                          if (scrambleCounter > 5) {
                            clearInterval(tokenInterval);
                            setSocialTexts(prev => {
                              const clone = [...prev];
                              clone[index] = originalWord;
                              return clone;
                            });
                          }
                        }, 50);
                      }}
                      onMouseLeave={() => {
                        setSocialHoveredIndex(null);
                        setSocialTexts(prev => {
                          const clone = [...prev];
                          clone[index] = link.label;
                          return clone;
                        });
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        textShadow: "0px 0px 14px rgba(255,255,255,1)"
                      }}
                    >
                      <span className="tracking-[0.45em] group-hover:tracking-[0.55em] transition-all duration-500 ease-out select-none">
                        [ {labelToDisplay} ]
                      </span>
                      
                      {/* Glowing hover accent layout */}
                      <span className="absolute inset-0 rounded-md bg-white/[0.01] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Pitch Black stillness drop */
          <div className="h-20" />
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ 
          opacity: isSectionEntered && !shutdownInitiated && !shutdownFinished ? 0.3 : 0,
          y: shutdownInitiated ? 20 : 0 
        }}
        transition={{ duration: 1 }}
        className="absolute bottom-8 w-full text-center px-4 z-10"
      >
        <p className="font-mono text-[8px] text-neutral-500 uppercase tracking-[0.45em]">
          &copy; 2026 VILLAFAN &middot; CINEMATIC TERMINAL SIGNAL LOSS &middot; ALL RIGHTS RESERVED
        </p>
      </motion.div>
    </footer>
  );
}

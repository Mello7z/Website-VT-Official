import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Instagram, Youtube, Mail, Send, Music, Video } from "lucide-react";
import { Track } from "../types";
import ScrambleText from "./ScrambleText";

// Synthesize premium futuristic sci-fi interface sounds with AudioContext
function playInterfaceSound(type: "open" | "hover" | "click" | "glitch" | "lock" | "change-tab") {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (type === "open") {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      const gain2 = audioCtx.createGain();
      
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(55, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.35);
      gain1.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(900, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(450, audioCtx.currentTime + 0.08);
      osc2.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.38);
      
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.45);
      osc2.stop(audioCtx.currentTime + 0.45);
    } else if (type === "hover") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === "change-tab") {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc1.frequency.setValueAtTime(880, audioCtx.currentTime + 0.07);
      
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(660, audioCtx.currentTime + 0.07);
      
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.2);
    } else if (type === "click") {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      const gain2 = audioCtx.createGain();
      
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(90, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.7);
      gain1.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.75);
      
      osc2.type = "square";
      osc2.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(2500, audioCtx.currentTime + 0.2);
      gain2.gain.setValueAtTime(0.025, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.8);
      osc2.stop(audioCtx.currentTime + 0.3);
    } else if (type === "glitch") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(60 + Math.random() * 400, audioCtx.currentTime);
      osc.frequency.setValueAtTime(1000 + Math.random() * 1000, audioCtx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === "lock") {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc1.frequency.setValueAtTime(80, audioCtx.currentTime + 0.08);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(75, audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.3);
      osc2.stop(audioCtx.currentTime + 0.3);
    }
  } catch (e) {
    console.warn("Audio Context is blocked:", e);
  }
}

const PREVIEWS_DATA: Track[] = [
  {
    id: "respira",
    number: "06",
    name: "RESPIRA",
    duration: "TBA",
    coverPath: "/previas/respira.jpg",
    audioPath: "/previas/respira.mp3",
    artist: "VT",
    trackType: "SINGLE",
    release: "EM PRODUÇÃO",
    year: "2026",
    isUnreleased: true,
    statusLabel: "EM PRODUÇÃO",
  },
  {
    id: "amanhecer",
    number: "07",
    name: "AMANHECER",
    duration: "TBA",
    coverPath: "/previas/amanhecer.jpg",
    audioPath: "/previas/amanhecer.mp3",
    artist: "VT",
    trackType: "SINGLE",
    release: "EM BREVE",
    year: "2026",
    isUnreleased: true,
    statusLabel: "EM BREVE",
  },
  {
    id: "miragem",
    number: "08",
    name: "████████████",
    duration: "TBA",
    coverPath: "/previas/miragem.jpg",
    audioPath: "/previas/miragem.mp3",
    artist: "CLASSIFICADO",
    trackType: "RESTRITO",
    release: "ACESSO RESTRITO",
    year: "XXXX",
    isUnreleased: true,
    isLocked: true,
    statusLabel: "ACESSO RESTRITO",
  }
];

interface CinematicMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadDiscography: () => void;
  activeTrack: Track;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  hoveredTrack: Track | null;
  setHoveredTrack: (track: Track | null) => void;
  triggerDeniedAlert: (msg: string) => void;
  triggerScreenDistortion: () => void;
}

export default function CinematicMenu({
  isOpen,
  onClose,
  onLoadDiscography,
  activeTrack,
  isPlaying,
  onTrackSelect,
  hoveredTrack,
  setHoveredTrack,
  triggerDeniedAlert,
  triggerScreenDistortion
}: CinematicMenuProps) {
  const isCorruptedHovered = !!(hoveredTrack && hoveredTrack.isCorrupted);

  const [openingState, setOpeningState] = useState<"closed" | "blackout_init" | "glitch_init" | "ready">("closed");
  const [loadingState, setLoadingState] = useState<"idle" | "loading" | "complete">("idle");

  // Swapping Subtitle: UNIVERSO VILLAFAN, ARQUIVOS CONFIDENCIAIS, ACESSO LIBERADO
  const subtitles = ["UNIVERSO VILLAFAN", "ARQUIVOS CONFIDENCIAIS", "ACESSO LIBERADO"];
  const [subtitle, setSubtitle] = useState(subtitles[0]);

  // Active Tab/Chapter selection
  const [activeTab, setActiveTab] = useState("01");

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactChannel, setContactChannel] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [contactLogs, setContactLogs] = useState<string[]>([]);
  const [isButtonGlitching, setIsButtonGlitching] = useState(false);
  const [isVillafanShaking, setIsVillafanShaking] = useState(false);

  useEffect(() => {
    if (activeTab !== "05") {
      setIsVillafanShaking(false);
      return;
    }

    const interval = setInterval(() => {
      setIsVillafanShaking(true);
      try {
        playInterfaceSound("glitch");
      } catch (e) {}

      // Keep shaking for 1.4 seconds, then stop
      const timer = setTimeout(() => {
        setIsVillafanShaking(false);
      }, 1400);

      return () => clearTimeout(timer);
    }, 4200); // Trigger every 4.2 seconds

    return () => clearInterval(interval);
  }, [activeTab]);

  // Custom synth metallic sound for dossier release
  const playDossierMetallicSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(75, audioCtx.currentTime + 0.6);
      
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(580, audioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.55);
      
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.6);
      osc2.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.error(e);
    }
  };

  // Dossier States
  const [dossierLoading, setDossierLoading] = useState(false);
  const [dossierLoadingStep, setDossierLoadingStep] = useState<"idle" | "accessing" | "decrypting" | "unlocked" | "ready">("idle");
  const [dossierLoadingProgress, setDossierLoadingProgress] = useState(0);
  const [dossierGlitchActive, setDossierGlitchActive] = useState(false);
  const [dossierImage, setDossierImage] = useState("/imagens-inicio/VT-MAL.png");
  const [activeTimelineItem, setActiveTimelineItem] = useState<string | null>(null);
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null);
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [showSecretFile, setShowSecretFile] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorOverScannerInfo, setIsCursorOverScannerInfo] = useState(false);

  // New cinematic states for our game-like investigation wall
  const [dossierIntroState, setDossierIntroState] = useState<"idle" | "blackout" | "sentence1" | "sentence2" | "sentence3" | "sentence4" | "sentence5" | "sentence6" | "sentence7" | "sentence8" | "sentence9" | "sentence10" | "sentence11" | "sentence12" | "sentence13" | "sentence14" | "interactive_wall">("idle");
  const [revealStep, setRevealStep] = useState(0);
  const [revealText, setRevealText] = useState("");
  const [investigationStep, setInvestigationStep] = useState(0); // 0: Sealed envelope, 1: Polaroid, 2: Note behind, 3: Audio tape, 4: Corrupted VHS, 5: Decoded song
  const [activeBoardItem, setActiveBoardItem] = useState<string | null>(null); // For São Paulo map or case reports
  const [corkboardStringsColor, setCorkboardStringsColor] = useState("crimson"); // 'crimson' | 'neon-red' | 'glitched-orange'
  const [isPlayingTape, setIsPlayingTape] = useState(false);
  const [isPlayingDecodedBeat, setIsPlayingDecodedBeat] = useState(false);
  const [hoveredTimelineTrack, setHoveredTimelineTrack] = useState<string | null>(null);
  const [hoveredTimelineCover, setHoveredTimelineCover] = useState<string | null>(null);

  const playLowBassRumble = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(32, audioCtx.currentTime); // 32 Hz super low rumble
      osc.frequency.linearRampToValueAtTime(24, audioCtx.currentTime + 3);
      
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(45, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.8);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 4.5);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 4.5);
    } catch (e) {
      console.error(e);
    }
  };

  const playCassetteSqueal = (isPlay: boolean) => {
    if (!isPlay) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const lfo = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(80.8, audioCtx.currentTime); // 80.8 Hz Reference
      osc.frequency.linearRampToValueAtTime(40, audioCtx.currentTime + 4);
      
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(5, audioCtx.currentTime); // vibrato
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(12, audioCtx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      filter.type = "peaking";
      filter.Q.setValueAtTime(8, audioCtx.currentTime);
      filter.frequency.setValueAtTime(120, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(380, audioCtx.currentTime + 3.5);
      
      gain.gain.setValueAtTime(0.0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.5);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 4.0);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      lfo.start();
      osc.start();
      lfo.stop(audioCtx.currentTime + 4.0);
      osc.stop(audioCtx.currentTime + 4.0);
    } catch (e) {
      console.error(e);
    }
  };

  const playDecodedIndustrialBeat = (isPlay: boolean) => {
    if (!isPlay) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      
      for (let i = 0; i < 6; i++) {
        const time = now + i * 0.6;
        // Kick hit
        const kickOsc = audioCtx.createOscillator();
        const kickGain = audioCtx.createGain();
        kickOsc.type = "sine";
        kickOsc.frequency.setValueAtTime(120, time);
        kickOsc.frequency.exponentialRampToValueAtTime(35, time + 0.3);
        
        kickGain.gain.setValueAtTime(0.2, time);
        kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);
        
        kickOsc.connect(kickGain);
        kickGain.connect(audioCtx.destination);
        kickOsc.start(time);
        kickOsc.stop(time + 0.5);
        
        // Noise hihat
        const bufferSize = audioCtx.sampleRate * 0.1;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 2 - 1;
        }
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = "highpass";
        noiseFilter.frequency.setValueAtTime(3000, time);
        
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.05, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start(time);
        noise.stop(time + 0.1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startDossierLoadingSequence = () => {
    setActiveTab("02");
  };

  const handleDossierTitleClick = () => {
    playInterfaceSound("glitch");
    setEasterEggCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowSecretFile(true);
        playInterfaceSound("open");
        return 0;
      }
      return next;
    });
  };

  // Dossier intro cinematic sequence transition
  useEffect(() => {
    if (activeTab === "02") {
      setDossierIntroState("blackout");
      setRevealStep(0);
      setRevealText("");
      setInvestigationStep(0);
      setActiveBoardItem(null);
      setIsPlayingTape(false);
      setIsPlayingDecodedBeat(false);
      playLowBassRumble();
      
      const t1 = setTimeout(() => {
        setDossierIntroState("sentence1");
        playLowBassRumble();
      }, 1500);

      const t2 = setTimeout(() => {
        setDossierIntroState("sentence2");
        playLowBassRumble();
      }, 4000);

      const t3 = setTimeout(() => {
        setDossierIntroState("sentence3");
        playLowBassRumble();
      }, 6500);

      const t4 = setTimeout(() => {
        setDossierIntroState("sentence4");
        playLowBassRumble();
      }, 9000);

      const t5 = setTimeout(() => {
        setDossierIntroState("sentence5");
        playLowBassRumble();
      }, 11500);

      const t6 = setTimeout(() => {
        setDossierIntroState("sentence6");
        playLowBassRumble();
      }, 14000);

      const t7 = setTimeout(() => {
        setDossierIntroState("sentence7");
        playLowBassRumble();
      }, 16500);

      const t8 = setTimeout(() => {
        setDossierIntroState("sentence8");
        playLowBassRumble();
      }, 19000);

      const t9 = setTimeout(() => {
        setDossierIntroState("sentence9");
        playLowBassRumble();
      }, 21500);

      const t10 = setTimeout(() => {
        setDossierIntroState("sentence10");
        playLowBassRumble();
      }, 24000);

      const t11 = setTimeout(() => {
        setDossierIntroState("sentence11");
        playLowBassRumble();
      }, 26500);

      const t12 = setTimeout(() => {
        setDossierIntroState("sentence12");
        playLowBassRumble();
      }, 29000);

      const t13 = setTimeout(() => {
        setDossierIntroState("sentence13");
        playLowBassRumble();
      }, 31500);

      const t14 = setTimeout(() => {
        setDossierIntroState("sentence14");
        playLowBassRumble();
      }, 34000);

      const t15 = setTimeout(() => {
        // Smooth fade-in to interactive wall with NO flashing (sem piscar!) and clean sliding transition
        setDossierIntroState("interactive_wall");
        playDossierMetallicSound();
      }, 36500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
        clearTimeout(t7);
        clearTimeout(t8);
        clearTimeout(t9);
        clearTimeout(t10);
        clearTimeout(t11);
        clearTimeout(t12);
        clearTimeout(t13);
        clearTimeout(t14);
        clearTimeout(t15);
      };
    } else {
      setDossierIntroState("idle");
    }
  }, [activeTab]);

  // Dynamic Time and random coordinates tracking
  const [timeStr, setTimeStr] = useState("21:38:14");
  const [dateStr, setDateStr] = useState("24 OCT 2026");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cinematic VT Right-side Live Trailer states
  const [vtState, setVtState] = useState<"normal" | "transforming" | "transformed">("normal");
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchType, setGlitchType] = useState<"soft" | "red" | "none">("none");
  const [lightMode, setLightMode] = useState(0);

  // Alternating dynamic title states for the menu title (VILLAFAN <-> VT)
  const [menuTitle, setMenuTitle] = useState("VILLAFAN");
  const [menuGlitchActive, setMenuGlitchActive] = useState(false);
  const [menuOffset, setMenuOffset] = useState({ x: 0, y: 0 });
  const [menuGlitchColor, setMenuGlitchColor] = useState<"none" | "deep-purple" | "blood-red" | "cold-gray" | "ice-white">("none");

  // Logo Identity Glitch loop inside Cinematic Menu (VILLAFAN <-> VT)
  useEffect(() => {
    if (!isOpen || openingState !== "ready") return;
    let active = true;

    const runTitleGlitchCycle = () => {
      if (!active) return;

      const glitchSequence = [
        { text: "VILLAF_N", duration: 80, color: "deep-purple" as const, offset: { x: -3, y: 1 } },
        { text: "VT", duration: 120, color: "blood-red" as const, offset: { x: 3, y: -2 } },
        { text: "VILL_F_N", duration: 70, color: "cold-gray" as const, offset: { x: -2, y: -3 } },
        { text: "VT", duration: 110, color: "ice-white" as const, offset: { x: 2, y: 2 } },
      ];

      let currentStep = 0;

      const executeStep = () => {
        if (!active) return;
        if (currentStep >= glitchSequence.length) {
          setMenuTitle("VILLAFAN");
          setMenuGlitchActive(false);
          setMenuGlitchColor("none");
          setMenuOffset({ x: 0, y: 0 });

          // Plan next random swap glitch in 3.5 to 7.5 seconds
          const nextInterval = Math.random() * 4000 + 3500;
          setTimeout(runTitleGlitchCycle, nextInterval);
          return;
        }

        const step = glitchSequence[currentStep];
        setMenuTitle(step.text);
        setMenuGlitchActive(true);
        setMenuGlitchColor(step.color);
        setMenuOffset(step.offset);

        currentStep++;
        setTimeout(executeStep, step.duration);
      };

      executeStep();
    };

    // Run first title glitch after 3 seconds
    const initialTimer = setTimeout(runTitleGlitchCycle, 3000);

    return () => {
      active = false;
      clearTimeout(initialTimer);
    };
  }, [isOpen, openingState]);

  // Chapters list with unique custom coordinates
  const chapters = [
    { number: "01", label: "MÚSICAS", coords: "48°13'S 123°14'W" },
    { number: "04", label: "PRÉVIAS", coords: "48°13'S 123°14'W" },
    { number: "05", label: "CONTATO", coords: "48°13'S 123°14'W" }
  ];

  // Preload narrative assets on mount
  useEffect(() => {
    const assets = [
      "/imagens-inicio/VT-NORMAL.png",
      "/imagens-inicio/VT-TRANSFORMANDO.png",
      "/imagens-inicio/VT-MAL.png"
    ];
    assets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Living lighting slow shifts (changes center & pool dimensions)
  useEffect(() => {
    if (openingState !== "ready" || !isOpen) return;
    const interval = setInterval(() => {
      setLightMode((prev) => (prev + 1) % 4);
    }, 5500);
    return () => clearInterval(interval);
  }, [openingState, isOpen]);

  // Narrative Glitches (random intervals of 8-15 seconds)
  useEffect(() => {
    if (openingState !== "ready" || !isOpen) return;

    let timeoutId: NodeJS.Timeout;

    const runGlitchCycle = () => {
      const delay = Math.random() * (15000 - 8000) + 8000;
      timeoutId = setTimeout(() => {
        const isTypeB = Math.random() > 0.5;

        if (!isTypeB) {
          // Sequence A: VT under transformation
          setGlitchType("soft");
          setGlitchActive(true);
          setVtState("transforming");
          playInterfaceSound("glitch");

          const duration = Math.random() * (150 - 80) + 80;
          setTimeout(() => {
            setVtState("normal");
            setGlitchActive(false);
            setGlitchType("none");
            runGlitchCycle();
          }, duration);
        } else {
          // Sequence B: Fast red flash, VT completely transformed
          setGlitchType("red");
          setGlitchActive(true);
          setVtState("transformed");
          playInterfaceSound("glitch");

          setTimeout(() => {
            setVtState("normal");
            setGlitchActive(false);
            setGlitchType("none");
            runGlitchCycle();
          }, 110);
        }
      }, delay);
    };

    runGlitchCycle();
    return () => clearTimeout(timeoutId);
  }, [openingState, isOpen]);

  // Play opening sequence when isOpen triggers
  useEffect(() => {
    if (isOpen) {
      setOpeningState("blackout_init");
      setLoadingState("idle");

      // Play start sound
      playInterfaceSound("open");

      // 120ms blackout then fast glitch
      const blackoutTimer = setTimeout(() => {
        setOpeningState("glitch_init");
        playInterfaceSound("glitch");
        
        // Full menu enters
        const glitchTimer = setTimeout(() => {
          setOpeningState("ready");
        }, 150);

        return () => clearTimeout(glitchTimer);
      }, 120);

      return () => {
        clearTimeout(blackoutTimer);
      };
    } else {
      setOpeningState("closed");
    }
  }, [isOpen]);

  // Update real-time clock and date formatted like the reference image
  useEffect(() => {
    const updateHUDTime = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      
      // Time format: HH:MM:SS
      setTimeStr(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
      
      // Date format: DD MMM YYYY
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      setDateStr(`${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`);
    };

    updateHUDTime();
    const interval = setInterval(updateHUDTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtitle random switcher
  useEffect(() => {
    if (openingState !== "ready") return;

    const swapSubtitle = () => {
      const filtered = subtitles.filter((s) => s !== subtitle);
      const randomSub = filtered[Math.floor(Math.random() * filtered.length)];
      setSubtitle(randomSub);

      const nextDelay = 3000 + Math.random() * 4000;
      setTimeout(swapSubtitle, nextDelay);
    };

    const timer = setTimeout(swapSubtitle, 5000);
    return () => clearTimeout(timer);
  }, [openingState, subtitle]);

  // Interactive Live Canvas Particles, smoke and deep red ambient breathing glow
  useEffect(() => {
    if (openingState !== "ready" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.width = window.innerWidth;
        height = canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Particles: discrete very small dust specs floating
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Red sparks (glow specs)
    const sparks: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      speedY: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: -Math.random() * 0.2 - 0.05,
        opacity: Math.random() * 0.25 + 0.05
      });
    }

    for (let i = 0; i < 20; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.3,
        speedY: -Math.random() * 0.4 - 0.1
      });
    }

    let breathing = 0;
    let breathDir = 1;

    // Canvas rendering loop
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
      ctx.fillRect(0, 0, width, height);

      // Deep red ambient stage lighting in the center/right side breathing
      breathing += 0.001 * breathDir;
      if (breathing > 0.05) breathDir = -1;
      if (breathing < -0.05) breathDir = 1;

      const intensity = 0.15 + breathing;
      
      // Main stage lighting radial gradient (high contrast dark edges)
      const gradient = ctx.createRadialGradient(
        width * 0.55,
        height * 0.5,
        15,
        width * 0.55,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, `rgba(55, 3, 3, ${intensity})`);
      gradient.addColorStop(0.4, "rgba(10, 1, 1, 0.03)");
      gradient.addColorStop(0.9, "rgba(0, 0, 0, 1)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render small dust particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5 || p.x > width + 5) {
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render red spark glows (floating upwards)
      sparks.forEach((s) => {
        s.y += s.speedY;
        if (s.y < -5) {
          s.y = height + 5;
          s.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(220, 38, 38, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [openingState]);

  // Click handler on "MÚSICAS" menu button
  const handleMusicClick = () => {
    playInterfaceSound("click");
    setLoadingState("loading");

    // Sequence of terminal log loading phrases
    const loadingPhrases = [
      "CARREGANDO ARQUIVO...",
      "VT_DATABASE",
      "MUSIC_ARCHIVE",
      "STATUS... OK",
    ];

    setTerminalLogs([loadingPhrases[0]]);

    let step = 1;
    const interval = setInterval(() => {
      if (step < loadingPhrases.length) {
        setTerminalLogs((prev) => [...prev, loadingPhrases[step]]);
        playInterfaceSound("glitch");
        step++;
      } else {
        clearInterval(interval);
        setLoadingState("complete");
        // Complete fast loading screens in less than 0.8 seconds (approx 550ms)
        setTimeout(() => {
          onClose();
          onLoadDiscography();
        }, 150);
      }
    }, 110);
  };

  // Click handlers for placeholder buttons (selecting them as current tab)
  const handlePlaceholderClick = (chapterNum: string) => {
    playInterfaceSound("change-tab");
    setActiveTab(chapterNum);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactChannel || !contactMessage) return;

    // Trigger subtle click glitch effect on button
    setIsButtonGlitching(true);
    playInterfaceSound("glitch");

    setTimeout(() => {
      setIsButtonGlitching(false);
      setContactStatus("sending");
      setContactLogs([]);

      const logs = [
        "RISCANDO O MURO DA SESSÃO...",
        "CONECTANDO FREQUÊNCIA DE SÃO PAULO...",
        "ASSINANDO TAG NA MENSAGEM...",
        "REGISTRANDO CANAL DE RETORNO...",
        "SINAL INJETADO NA REDE VT!"
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setContactLogs((prev) => [...prev, log]);
          playInterfaceSound("hover");
          
          if (index === logs.length - 1) {
            setTimeout(() => {
              setContactStatus("sent");
              playInterfaceSound("glitch");
              triggerScreenDistortion();
            }, 600);
          }
        }, (index + 1) * 350);
      });
    }, 450); // Glitch runs for 450ms before submission proceeds
  };

  const resetContactForm = () => {
    setContactName("");
    setContactChannel("");
    setContactSubject("");
    setContactMessage("");
    setContactStatus("idle");
    setContactLogs([]);
    playInterfaceSound("change-tab");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="cinematic-menu-viewport"
          className={`fixed inset-0 z-50 overflow-hidden bg-black select-none ${
            isCorruptedHovered ? "animate-screen-shake-terror" : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* STAGE 1: INTRO BLACKOUT (120ms) */}
          {openingState === "blackout_init" && (
            <div className="absolute inset-0 bg-black z-50 flex items-center justify-center pointer-events-none" />
          )}

          {/* STAGE 2: INTRO GLITCH (FAST 150ms) */}
          {openingState === "glitch_init" && (
            <div className="absolute inset-0 bg-black z-50 pointer-events-none overflow-hidden flex items-center justify-center">
              {/* Quick CRT horizontal screen flash line */}
              <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] transform -translate-y-1/2" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />
            </div>
          )}

          {/* LIVING ENVIRONMENT BACKDROP & LIVING TRAILER ON THE RIGHT */}
          {activeTab !== "02" && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
              {/* The Cinematic VT Trailer container */}
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] h-full pointer-events-none overflow-hidden select-none opacity-20 md:opacity-100 transition-opacity duration-1000"
                style={{
                  // Fast screen shake during glitches or when corrupted is hovered
                  x: (glitchActive || isCorruptedHovered) ? (Math.random() - 0.5) * 16 : 0,
                  y: (glitchActive || isCorruptedHovered) ? (Math.random() - 0.5) * 16 : 0,
                }}
              >
                <motion.img
                  src={
                    hoveredTrack && (hoveredTrack.isUnreleased || hoveredTrack.isLocked || hoveredTrack.isCorrupted)
                      ? (hoveredTrack.isCorrupted ? "/imagens-inicio/VT-MAL.png" : hoveredTrack.coverPath)
                      : vtState === "normal"
                      ? "/imagens-inicio/VT-NORMAL.png"
                      : vtState === "transforming"
                      ? "/imagens-inicio/VT-TRANSFORMANDO.png"
                      : "/imagens-inicio/VT-MAL.png"
                  }
                  alt="VT Live Trailer"
                  className={`w-full h-full object-cover object-center pointer-events-none transition-all duration-300 ${
                    isCorruptedHovered
                      ? "filter saturate-[2.2] contrast-[1.9] brightness-50 invert-[0.1] hue-rotate-[15deg]"
                      : hoveredTrack
                      ? "filter saturate-[0.65] contrast-[1.15] brightness-75"
                      : ""
                  }`}
                  // Extremely subtle breathing and slow camera drift
                  animate={{
                    scale: [1, 1.012, 1],
                    x: [-3, 3, -1.5, 1.5, -3],
                    y: [-2, 2, 1, -1, -2],
                  }}
                  transition={{
                    scale: { duration: 8, ease: "easeInOut", repeat: Infinity },
                    x: { duration: 14, ease: "easeInOut", repeat: Infinity },
                    y: { duration: 12, ease: "easeInOut", repeat: Infinity },
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Dynamic spotlight living illumination */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-[4000ms] ease-in-out"
                  style={{
                    background:
                      lightMode === 0
                        ? "radial-gradient(circle at 58% 42%, transparent 8%, rgba(0,0,0,0.96) 38%)" // spotlight only on eyes
                        : lightMode === 1
                        ? "radial-gradient(circle at 48% 52%, transparent 4%, rgba(0,0,0,0.98) 32%)" // spotlight on left half cheek
                        : lightMode === 2
                        ? "radial-gradient(circle at 55% 48%, rgba(90,0,0,0.06) 0%, transparent 25%, rgba(0,0,0,0.95) 55%)" // soft overall deep red atmosphere
                        : "radial-gradient(circle at 58% 42%, transparent 2%, rgba(0,0,0,0.99) 18%)" // shrouded in almost total darkness
                  }}
                />

                {/* Edge mask vignettes to blend the trailer seamlessly with the absolute black site backdrop */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-32 md:w-52 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          )}

          {/* Interactive particles rendering on top of the background */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

          {/* CINEMATIC MONITOR CRT LINES EFFECT (SCANLINES) */}
          <div 
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-150"
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.35))",
              backgroundSize: "100% 4px",
              opacity: isCorruptedHovered ? 0.9 : (glitchActive ? 0.65 : 0.28)
            }}
          />
          

          {/* Dark cinematic framing vignettes */}
          <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_120px_rgba(0,0,0,0.98)]" />

          {/* Corrupted Hover / Fast red-black flashing strobe overlay */}
          <AnimatePresence>
            {isCorruptedHovered && (
              <motion.div
                className="absolute inset-0 bg-red-950/30 z-40 pointer-events-none mix-blend-color-burn"
                animate={{
                  opacity: [0.1, 0.85, 0.05, 0.9, 0.15, 0.8, 0.1],
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </AnimatePresence>

          {/* Red flash glitch overlay */}
          <AnimatePresence>
            {glitchActive && glitchType === "red" && (
              <motion.div
                className="absolute inset-0 bg-[#5A0000]/30 z-40 pointer-events-none mix-blend-color-burn"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              />
            )}
          </AnimatePresence>

          {/* HUD DETAILS AND CONTENT ONLY RENDERED WHEN MENU IS READY */}
          {openingState === "ready" && (
            <motion.div 
              className="absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* HUD DETAILS IDENTICAL TO REFERENCE IMAGE */}
              
              {/* TOP LEFT: Three menu dots */}
              <div className="absolute top-8 left-8 z-30 flex gap-1.5 select-none pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 opacity-65" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 opacity-65" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 opacity-65" />
              </div>

              {/* BOTTOM LEFT: Version, Date, Time & Log Status */}
              <div className="absolute bottom-8 left-8 z-20 font-mono text-[9px] text-neutral-500 select-none pointer-events-none tracking-wider hidden md:block uppercase">
                v3.2.1 | {dateStr} | {timeStr} | DATA_LOG
              </div>

              {/* MAIN MENU CLOSE BUTTON */}
              <button
                onClick={() => {
                  playInterfaceSound("lock");
                  onClose();
                }}
                className="absolute top-6 right-6 z-40 p-2.5 rounded-full bg-black/40 hover:bg-red-950/20 border border-white/5 hover:border-red-500/30 text-neutral-400 hover:text-red-500 transition-all duration-300 backdrop-blur-md cursor-pointer group active:scale-95 sm:top-8 sm:right-8"
                aria-label="Close Menu"
                title="Fechar"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* MAIN SCREEN LAYOUT: SCROLLABLE WITH VERTICAL CENTERING THAT PREVENTS OVERFLOW TOP-CUTOFF */}
              <div className="absolute inset-0 overflow-y-auto w-full h-full text-center z-20">
                <div 
                  className="min-h-full w-full flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-16 sm:py-24"
                  style={{
                    // Minor screen trembling on menu content during glitches
                    transform: glitchActive ? `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)` : "none"
                  }}
                >
                
                {/* CENTERED TITLE: VILLAFAN WITH IDENTITY GLITCH TO VT */}
                <div 
                  className="select-none cursor-default mb-12 sm:mb-16 mt-8 relative flex flex-col items-center transition-all duration-75"
                  style={{
                    transform: `translate3d(${menuOffset.x}px, ${menuOffset.y}px, 0px)`
                  }}
                >
                  <div className="relative inline-block h-16 sm:h-20 md:h-24">
                    
                    {/* Floating scatter glitched letters absolute offset like Travis Scott / Carti aesthetic */}
                    <span className="absolute -top-4 left-6 font-mono text-xs text-neutral-500 tracking-normal opacity-40 select-none rotate-12">V</span>
                    <span className="absolute -top-1 right-20 font-mono text-[10px] text-neutral-600 tracking-normal opacity-50 select-none -rotate-12">T</span>
                    <span className="absolute top-10 -left-6 font-mono text-xs text-red-500/30 tracking-normal opacity-40 select-none -rotate-90">G</span>
                    <span className="absolute top-12 left-28 font-mono text-[11px] text-neutral-500 tracking-normal opacity-40 select-none">N</span>
                    <span className="absolute -bottom-2 right-12 font-mono text-xs text-neutral-400/40 tracking-normal opacity-50 select-none rotate-45">T</span>
                    <span className="absolute top-1 right-4 font-mono text-xs text-neutral-500/40 tracking-normal opacity-40 select-none -rotate-12">O</span>
                    <span className="absolute top-8 -right-8 font-mono text-[10px] text-neutral-600 tracking-normal opacity-50 select-none rotate-12">T</span>
                    <span className="absolute bottom-6 right-2 font-mono text-xs text-red-500/30 tracking-normal opacity-40 select-none">I</span>
                    <span className="absolute bottom-1 -right-4 font-mono text-xs text-neutral-500 tracking-normal opacity-40 select-none -rotate-45">A</span>
                    <span className="absolute bottom-2 left-16 font-mono text-[10px] text-neutral-600 tracking-normal opacity-50 select-none rotate-12">t</span>

                    <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.12em] text-white uppercase relative z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] select-none">
                      {menuTitle}
                    </h2>

                    {menuGlitchActive && (
                      <>
                        <span 
                          className="absolute top-0 left-0 w-full font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.12em] uppercase select-none translate-x-[-3px] translate-y-[2px] z-10"
                          style={{ 
                            clipPath: "polygon(0 15%, 100% 15%, 100% 45%, 0 45%)",
                            color: menuGlitchColor === "blood-red" ? "#7A0000" : 
                                   menuGlitchColor === "deep-purple" ? "#4B1E6D" : 
                                   menuGlitchColor === "cold-gray" ? "#7A7A7A" : 
                                   menuGlitchColor === "ice-white" ? "#F5F5F5" : "#A30000"
                          }}
                        >
                          {menuTitle}
                        </span>
                        <span 
                          className="absolute top-0 left-0 w-full font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.12em] uppercase select-none translate-x-[3px] translate-y-[-2px] z-10"
                          style={{ 
                            clipPath: "polygon(0 55%, 100% 55%, 100% 85%, 0 85%)",
                            color: menuGlitchColor === "blood-red" ? "#A30000" : 
                                   menuGlitchColor === "deep-purple" ? "#8B5CF6" : 
                                   menuGlitchColor === "cold-gray" ? "#7A7A7A" : 
                                   menuGlitchColor === "ice-white" ? "#F5F5F5" : "#4B1E6D"
                          }}
                        >
                          {menuTitle}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <p className="font-mono text-[9px] sm:text-xs tracking-[0.4em] text-neutral-400 uppercase mt-3 select-none">
                    {subtitle}
                  </p>
                </div>

                {/* TAB CHAPTERS CENTERED IN THE PANEL OR ACTIVE PREVIEWS SUBDIRECTORY */}
                <div className="w-full flex flex-col items-center justify-center my-4 px-4 sm:px-6">
                  {activeTab === "04" ? (
                    <div className="w-full max-w-4xl flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center gap-1.5 mb-6 text-center select-none">
                        <span className="font-mono text-[9px] text-red-500/80 tracking-[0.4em] uppercase animate-pulse">
                          CONEXÃO DIRETA // CAPÍTULO II
                        </span>
                        <h3 className="font-sans text-lg sm:text-xl font-black text-white tracking-[0.2em] uppercase">
                          PRÉVIAS & ARQUIVOS OCULTOS
                        </h3>
                      </div>

                      {/* Header for Previews */}
                      <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 select-none px-4 w-full">
                        <div className="col-span-3">ARTISTA</div>
                        <div className="col-span-3">MÚSICA</div>
                        <div className="col-span-2">TIPO</div>
                        <div className="col-span-3">STATUS</div>
                        <div className="col-span-1 text-right">ANO</div>
                      </div>

                      <div className="w-full flex flex-col border-b border-white/10 select-none bg-black/40 backdrop-blur-md rounded-md overflow-hidden">
                        {PREVIEWS_DATA.map((track) => {
                          const isHovered = hoveredTrack?.id === track.id;
                          const isCurrent = activeTrack.id === track.id;

                          return (
                            <div
                              key={track.id}
                              onMouseEnter={() => {
                                setHoveredTrack(track);
                                playInterfaceSound("hover");
                              }}
                              onMouseLeave={() => setHoveredTrack(null)}
                              onTouchStart={() => {
                                setHoveredTrack(track);
                                playInterfaceSound("hover");
                              }}
                              onClick={() => {
                                onTrackSelect(track);
                                if (track.isLocked || track.isCorrupted) {
                                  triggerDeniedAlert("SINAL CRÍPTICO DETECTADO // TRANSMISSÃO PROTEGIDA");
                                  triggerScreenDistortion();
                                } else {
                                  triggerDeniedAlert("DECODIFICANDO AUDIO // EXECUTANDO PRÉVIA");
                                }
                              }}
                              className={`group relative py-6 sm:py-8 border-t border-white/10 cursor-pointer select-none transition-all duration-200 ${
                                isHovered 
                                  ? "bg-red-500/[0.015] px-4" 
                                  : "bg-transparent px-2"
                              } ${
                                isCurrent ? "bg-white/[0.01]" : ""
                              } ${
                                hoveredTrack && !isHovered ? "opacity-25 filter blur-[0.5px]" : "opacity-100"
                              }`}
                            >
                              {/* Interactive red glowing cyber line overlay on hover */}
                              {isHovered && (
                                <motion.div 
                                  layoutId="hoverGlowLineMenuUnreleased"
                                  className="absolute -top-[1.5px] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.7)]"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                />
                              )}

                              {/* Mobile Layout (<sm) */}
                              <div className="flex sm:hidden items-center justify-between w-full">
                                <div className="flex items-center gap-3 min-w-0 w-full">
                                  <span className={`font-mono text-xs select-none ${
                                    isCurrent ? "text-[#D0B2FF]" : "text-red-500/60"
                                  }`}>
                                    {track.number}
                                  </span>
                                  <div className="flex flex-col min-w-0 w-full">
                                    <div className="flex items-center justify-between gap-2 w-full">
                                      <span className={`font-sans text-sm font-bold tracking-tight uppercase truncate ${
                                        isCurrent ? "text-[#D0B2FF]" : (track.isLocked ? "text-red-500/80" : "text-neutral-300")
                                      }`}>
                                        {track.name}
                                      </span>
                                      {isCurrent && isPlaying && (
                                        <div className="flex items-end gap-0.5 h-3 shrink-0 mr-1">
                                          <span className="w-0.5 h-full bg-[#D0B2FF] rounded-full animate-pulse" />
                                          <span className="w-0.5 h-2 bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.1s]" />
                                          <span className="w-0.5 h-3 bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.2s]" />
                                        </div>
                                      )}
                                      <span className={`font-mono text-[9px] uppercase tracking-widest shrink-0 ${
                                        isCurrent 
                                          ? "text-[#D0B2FF]/90" 
                                          : (track.isLocked ? "text-red-500/80" : "text-amber-500/80")
                                      }`}>
                                        {track.statusLabel}
                                      </span>
                                    </div>
                                    <span className="font-mono text-[9px] text-neutral-400 mt-1">
                                      {track.artist} &middot; {track.trackType} &middot; {track.year}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Desktop Layout (>=sm) */}
                              <div className="hidden sm:grid grid-cols-12 gap-4 items-center w-full">
                                {/* ARTISTA (col-span-3) */}
                                <div className="col-span-3 flex items-center gap-3 min-w-0 text-left">
                                  <span className={`font-mono text-[9px] select-none font-bold ${
                                    isCurrent ? "text-[#D0B2FF]" : "text-red-500/70"
                                  }`}>
                                    {track.number}
                                  </span>
                                  <span className={`font-mono text-xs sm:text-sm font-medium transition-colors duration-300 truncate ${
                                    isCurrent ? "text-[#D0B2FF]" : "text-neutral-400 group-hover:text-white"
                                  }`}>
                                    <ScrambleText text={track.artist} trigger={isHovered} />
                                  </span>
                                </div>

                                {/* MÚSICA (col-span-3) */}
                                <div className={`col-span-3 flex items-center gap-2 font-sans text-sm sm:text-lg md:text-xl font-bold tracking-tight transition-all duration-300 truncate text-left ${
                                  isCurrent 
                                    ? "text-[#D0B2FF]" 
                                    : (track.isLocked ? "text-red-500/80 group-hover:text-red-400" : "text-neutral-300 group-hover:text-white")
                                }`}>
                                  <ScrambleText text={track.name} trigger={isHovered} />
                                  {isCurrent && isPlaying && (
                                    <div className="flex items-end gap-0.5 h-3 ml-2 shrink-0">
                                      <span className="w-0.5 h-full bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.1s]" />
                                      <span className="w-0.5 h-2 bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.2s]" />
                                      <span className="w-0.5 h-3 bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.3s]" />
                                    </div>
                                  )}
                                </div>

                                {/* TIPO (col-span-2) */}
                                <div className={`col-span-2 font-mono text-[10px] sm:text-xs transition-colors duration-300 truncate text-left ${
                                  isCurrent ? "text-[#D0B2FF]/80" : "text-neutral-500 group-hover:text-neutral-300"
                                }`}>
                                  <ScrambleText text={track.trackType} trigger={isHovered} />
                                </div>

                                {/* STATUS (col-span-3) */}
                                <div className={`col-span-3 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-colors duration-300 truncate text-left ${
                                  isCurrent 
                                    ? "text-[#D0B2FF]/95" 
                                    : (track.isLocked ? "text-red-500/75 group-hover:text-red-400" : "text-amber-500/80 group-hover:text-amber-400")
                                }`}>
                                  <ScrambleText text={track.statusLabel || ""} trigger={isHovered} />
                                </div>

                                {/* ANO (col-span-1) */}
                                <div className={`col-span-1 font-mono text-[10px] sm:text-xs transition-colors duration-300 text-right ${
                                  isCurrent ? "text-[#D0B2FF]/80" : "text-neutral-500 group-hover:text-neutral-300"
                                }`}>
                                  <ScrambleText text={track.year} trigger={isHovered} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Back button to main directory */}
                      <button
                        onClick={() => {
                          playInterfaceSound("change-tab");
                          setActiveTab("01"); // Return to initial/Músicas list index
                        }}
                        className="mt-8 px-5 py-2 font-mono text-[9px] text-neutral-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 hover:border-white/40 transition-all rounded uppercase tracking-[0.2em] shrink-0 active:scale-95 cursor-pointer flex items-center gap-2 group/backbtn"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover/backbtn:bg-red-500 animate-pulse group-hover/backbtn:animate-ping shrink-0" />
                        <ScrambleText text="[ VOLTAR AO MENU PRINCIPAL ]" trigger={false} />
                      </button>
                    </div>
                  ) : activeTab === "05" ? (
                    <motion.div 
                      animate={isVillafanShaking ? {
                        x: [0, -3.5, 3.5, -2, 2, -4.5, 4.5, -1.5, 1.5, 0],
                        y: [0, 2.5, -2.5, 3.5, -3.5, 1.5, -1.5, 4, -4, 0],
                        skewX: [0, -2.5, 2.5, -1, 1, 0]
                      } : {
                        x: [0, -0.6, 0.6, -0.3, 0.3, -0.6, 0.6, 0],
                        y: [0, 0.3, -0.3, 0.6, -0.6, 0.3, -0.3, 0],
                        skewX: [0, -0.4, 0.4, 0]
                      }}
                      transition={isVillafanShaking ? {
                        duration: 0.35,
                        repeat: 3,
                        ease: "easeInOut"
                      } : {
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 1.8,
                        ease: "easeInOut",
                        repeatDelay: 3.5
                      }}
                      className="w-full max-w-4xl flex flex-col items-center justify-center p-4 select-none relative z-10 text-left my-2 overflow-hidden min-h-[85vh]"
                    >
                      {/* Interactive Neon Glows */}
                      <div className={`absolute w-72 h-72 rounded-full blur-[120px] pointer-events-none top-1/4 -left-20 transition-all duration-700 ${
                        isVillafanShaking ? "bg-red-500/15" : "bg-purple-500/10"
                      } animate-pulse duration-3000`} />
                      <div className="absolute w-72 h-72 rounded-full bg-red-500/5 blur-[120px] pointer-events-none bottom-1/4 -right-20 animate-pulse duration-4000" />

                      {/* Realistic Faint Street Graffiti overlays (Non-AI background tags) */}
                      <motion.div 
                        animate={isVillafanShaking ? {
                          x: [0, -8, 8, -5, 5, -10, 10, 0],
                          y: [0, 4, -4, 6, -6, 0],
                          scale: [1, 1.12, 0.95, 1.08, 1]
                        } : {
                          x: [0, 1, -1, 0.5, -0.5, 0],
                          y: [0, -0.5, 0.5, -1, 1, 0]
                        }}
                        transition={isVillafanShaking ? {
                          duration: 0.4,
                          repeat: 2,
                          ease: "linear"
                        } : {
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: 2.2,
                          ease: "linear",
                          repeatDelay: 1.8
                        }}
                        className={`absolute top-10 left-4 font-marker text-3xl rotate-[-12deg] tracking-widest pointer-events-none select-none transition-all duration-300 ${
                          isVillafanShaking 
                            ? "text-red-500/40 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                            : "text-[#d0b2ff]/30 drop-shadow-[0_0_4px_rgba(208,178,255,0.25)]"
                        }`}
                      >
                        VILLAFAN
                      </motion.div>
                      <div className="absolute bottom-20 left-10 font-rock text-neutral-800/15 text-lg rotate-[8deg] tracking-wider pointer-events-none select-none">
                        SP - 011
                      </div>
                      <div className="absolute top-24 right-8 font-marker text-neutral-800/20 text-2xl rotate-[15deg] tracking-widest pointer-events-none select-none">
                        VIBE RARA
                      </div>
                      <div className="absolute bottom-32 right-12 font-rock text-neutral-800/15 text-sm rotate-[-5deg] tracking-widest pointer-events-none select-none">
                        NÃO SOMOS DAQUI
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sedgwick text-neutral-800/5 text-8xl rotate-[-4deg] tracking-widest pointer-events-none select-none">
                        SUBGRAVE
                      </div>

                      {/* Header Title Section with raw, handwritten tags */}
                      <div className="flex flex-col items-center mb-10 text-center w-full relative z-10">
                        <div className="relative inline-block mb-1">
                          <h2 className="font-marker text-5xl sm:text-7xl font-black text-white tracking-wider select-none leading-none uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-300">
                            CONTATO
                          </h2>
                          <div className={`absolute -bottom-2 -right-4 font-marker text-[11px] sm:text-xs rotate-[-8deg] tracking-[0.2em] bg-black/80 px-2 py-1 rounded border transition-all duration-300 ${
                            isVillafanShaking 
                              ? "text-red-500 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
                              : "text-[#d0b2ff] border-purple-400/30 shadow-[0_0_10px_rgba(208,178,255,0.15)]"
                          }`}>
                            VT MÁXIMO RESPEITO
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-1 mt-4">
                          <p className="font-sedgwick text-lg sm:text-xl text-neutral-300 tracking-wider">
                            ENTRA EM CONTATO GET IN TOUCH
                          </p>
                          <span className="font-mono text-[8px] text-neutral-500 tracking-[0.4em] uppercase">
                            FREQUÊNCIA DE SÃO PAULO
                          </span>
                        </div>
                      </div>

                      {/* Main Interactive Form with rough hand-drawn borders */}
                      <div className={`w-full max-w-3xl bg-black/40 border p-5 sm:p-8 rounded-lg relative z-10 backdrop-blur-md transition-all duration-300 ${
                        isVillafanShaking 
                          ? "border-red-500/30 shadow-[0_0_35px_rgba(239,68,68,0.15)]" 
                          : "border-neutral-900/80 shadow-[0_30px_70px_rgba(0,0,0,0.9)]"
                      } overflow-hidden`}>
                        {/* Decorative background crosshairs */}
                        <div className="absolute top-3 left-3 text-[8px] text-neutral-700 font-mono">[ SP 32.8HZ ]</div>
                        <div className="absolute top-3 right-3 text-[8px] text-neutral-700 font-mono">[ SECURE_SESSION ]</div>
                        <div className="absolute bottom-3 right-3 text-[8px] text-neutral-600 font-mono">VILLAFAN SYSTEM</div>

                        {contactStatus === "idle" && (
                          <form onSubmit={handleContactSubmit} className="space-y-6">
                            {/* 3-column input row for Name, Email, Subject */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                              {/* Name Input */}
                              <div className="space-y-1.5">
                                <motion.label 
                                  initial={{ opacity: 0.8, x: 0 }}
                                  whileHover={{ x: 2, opacity: 1 }}
                                  className={`font-marker text-[11px] uppercase tracking-widest flex items-center gap-1 cursor-default select-none transition-colors duration-300 ${
                                    isVillafanShaking ? "text-red-500" : "text-[#d0b2ff]"
                                  }`}
                                >
                                  NOME / NICK
                                </motion.label>
                                <motion.div 
                                  whileHover={{ scale: 1.015, boxShadow: isVillafanShaking ? "0 0 15px rgba(239,68,68,0.15)" : "0 0 15px rgba(208,178,255,0.15)" }}
                                  whileTap={{ scale: 0.995 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  className={`transition-all duration-300 bg-black/50 ${
                                    isVillafanShaking 
                                      ? "rough-border-red focus-within:rough-border-red" 
                                      : "rough-border-purple focus-within:rough-border-purple"
                                  }`}
                                >
                                  <input
                                    type="text"
                                    required
                                    placeholder="SEU NOME"
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                    className="w-full bg-transparent text-white px-3.5 py-2.5 text-xs outline-none uppercase font-mono tracking-wider placeholder-neutral-700"
                                    onClick={() => playInterfaceSound("click")}
                                  />
                                </motion.div>
                              </div>

                              {/* Email Input */}
                              <div className="space-y-1.5">
                                <motion.label 
                                  initial={{ opacity: 0.8, x: 0 }}
                                  whileHover={{ x: 2, opacity: 1 }}
                                  className={`font-marker text-[11px] uppercase tracking-widest flex items-center gap-1 cursor-default select-none transition-colors duration-300 ${
                                    isVillafanShaking ? "text-red-500" : "text-white"
                                  }`}
                                >
                                  EMAIL / CHAVE
                                </motion.label>
                                <motion.div 
                                  whileHover={{ scale: 1.015, boxShadow: isVillafanShaking ? "0 0 15px rgba(239,68,68,0.15)" : "0 0 15px rgba(208,178,255,0.15)" }}
                                  whileTap={{ scale: 0.995 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  className={`transition-all duration-300 bg-black/50 ${
                                    isVillafanShaking 
                                      ? "rough-border-red focus-within:rough-border-red" 
                                      : "rough-border-purple focus-within:rough-border-purple"
                                  }`}
                                >
                                  <input
                                    type="text"
                                    required
                                    placeholder="SEU EMAIL"
                                    value={contactChannel}
                                    onChange={(e) => setContactChannel(e.target.value)}
                                    className="w-full bg-transparent text-white px-3.5 py-2.5 text-xs outline-none uppercase font-mono tracking-wider placeholder-neutral-700"
                                    onClick={() => playInterfaceSound("click")}
                                  />
                                </motion.div>
                              </div>

                              {/* Subject Input */}
                              <div className="space-y-1.5">
                                <motion.label 
                                  initial={{ opacity: 0.8, x: 0 }}
                                  whileHover={{ x: 2, opacity: 1 }}
                                  className={`font-marker text-[11px] uppercase tracking-widest flex items-center gap-1 cursor-default select-none transition-colors duration-300 ${
                                    isVillafanShaking ? "text-red-500" : "text-white"
                                  }`}
                                >
                                  ASSUNTO / VIBE
                                </motion.label>
                                <motion.div 
                                  whileHover={{ scale: 1.015, boxShadow: isVillafanShaking ? "0 0 15px rgba(239,68,68,0.15)" : "0 0 15px rgba(208,178,255,0.15)" }}
                                  whileTap={{ scale: 0.995 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  className={`transition-all duration-300 bg-black/50 ${
                                    isVillafanShaking 
                                      ? "rough-border-red focus-within:rough-border-red" 
                                      : "rough-border-purple focus-within:rough-border-purple"
                                  }`}
                                >
                                  <input
                                    type="text"
                                    required
                                    placeholder="SUNTINHO..."
                                    value={contactSubject}
                                    onChange={(e) => setContactSubject(e.target.value)}
                                    className="w-full bg-transparent text-white px-3.5 py-2.5 text-xs outline-none uppercase font-mono tracking-wider placeholder-neutral-700"
                                    onClick={() => playInterfaceSound("click")}
                                  />
                                </motion.div>
                              </div>
                            </div>

                            {/* Larger Message Box */}
                            <div className="space-y-1.5 relative">
                              <motion.label 
                                initial={{ opacity: 0.8, x: 0 }}
                                whileHover={{ x: 2, opacity: 1 }}
                                className={`font-marker text-[11px] uppercase tracking-widest flex items-center gap-1 cursor-default select-none transition-colors duration-300 ${
                                  isVillafanShaking ? "text-red-500" : "text-white"
                                }`}
                              >
                                MENSAGEM / PAPO
                              </motion.label>
                              <motion.div 
                                whileHover={{ scale: 1.01, boxShadow: isVillafanShaking ? "0 0 15px rgba(239,68,68,0.18)" : "0 0 15px rgba(208,178,255,0.15)" }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className={`transition-all duration-300 bg-black/50 relative pb-2 ${
                                  isVillafanShaking 
                                    ? "rough-border-red focus-within:rough-border-red" 
                                    : "rough-border-purple focus-within:rough-border-purple"
                                }`}
                              >
                                <textarea
                                  required
                                  rows={5}
                                  placeholder="MANDA O PAPO / YOUR VIBE"
                                  value={contactMessage}
                                  onChange={(e) => setContactMessage(e.target.value)}
                                  className="w-full bg-transparent text-white px-3.5 py-3 text-xs outline-none uppercase font-mono tracking-wider placeholder-neutral-700 resize-none min-h-[140px]"
                                  onClick={() => playInterfaceSound("click")}
                                />
                              </motion.div>
                            </div>

                            {/* Submit Row featuring stylized street alien/cactus button */}
                            <div className="pt-2">
                              <motion.button
                                type="submit"
                                className="w-full relative group cursor-pointer overflow-hidden select-none outline-none rounded-lg"
                                whileHover={{ scale: 1.012 }}
                                whileTap={{ scale: 0.985 }}
                                animate={isButtonGlitching ? {
                                  x: [0, -3, 3, -2, 2, -4, 4, 0],
                                  y: [0, 2, -2, 1, -1, 3, -3, 0],
                                  skewX: [0, -4, 4, -2, 2, 0],
                                  filter: [
                                    "hue-rotate(0deg) contrast(1)",
                                    "hue-rotate(90deg) contrast(1.2)",
                                    "hue-rotate(180deg) contrast(1.4)",
                                    "hue-rotate(270deg) contrast(1.2)",
                                    "hue-rotate(0deg) contrast(1)"
                                  ]
                                } : {}}
                                transition={{ duration: 0.45, ease: "linear" }}
                              >
                                <div className={`transition-all duration-300 p-4 flex items-center justify-center gap-4 relative overflow-hidden ${
                                  isVillafanShaking 
                                    ? "rough-border-red bg-red-500 hover:bg-red-400 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]" 
                                    : "rough-border-purple bg-[#d0b2ff] hover:bg-[#c09eff] text-black shadow-[0_0_20px_rgba(208,178,255,0.25)]"
                                }`}>
                                  {/* Glitch CRT split layers */}
                                  {isButtonGlitching && (
                                    <>
                                      <div className="absolute inset-0 bg-[#ff0055]/30 mix-blend-screen translate-x-1.5 translate-y-0.5 pointer-events-none" />
                                      <div className="absolute inset-0 bg-[#00f0ff]/30 mix-blend-screen -translate-x-1.5 -translate-y-0.5 pointer-events-none" />
                                    </>
                                  )}

                                  {/* Custom Hand-Drawn Alien Vector Face */}
                                  <svg viewBox="0 0 100 100" className="w-6 h-6 stroke-black fill-none shrink-0 group-hover:rotate-12 transition-transform duration-300" strokeWidth="4">
                                    <path d="M50 15 C30 15 15 35 15 55 C15 70 30 85 50 85 C70 85 85 70 85 55 C85 35 70 15 50 15 Z" />
                                    <path d="M32 44 C34 38 43 38 45 46 C43 52 34 52 32 44 Z" fill="currentColor" />
                                    <path d="M68 44 C66 38 57 38 55 46 C57 52 66 52 68 44 Z" fill="currentColor" />
                                    <path d="M42 68 Q50 71 58 68" strokeLinecap="round" />
                                  </svg>

                                  <span className="font-marker text-base sm:text-lg tracking-[0.25em] uppercase font-black leading-none pt-1">
                                    ENVIAR VIBE / SEND IT
                                  </span>

                                  {/* Custom Hand-Drawn Cactus Vector */}
                                  <svg viewBox="0 0 100 100" className="w-5 h-5 stroke-black fill-none shrink-0 group-hover:-rotate-12 transition-transform duration-300" strokeWidth="4" strokeLinecap="round">
                                    <path d="M50 90 V25 C50 20 42 20 42 25 V90" />
                                    <path d="M42 55 H28 C23 55 23 45 23 45 V35" />
                                    <path d="M50 45 H64 C69 45 69 35 69 35 V25" />
                                    <path d="M50 30 H48" />
                                    <path d="M50 50 H52" />
                                    <path d="M23 40 H25" />
                                    <path d="M69 30 H67" />
                                  </svg>
                                </div>
                              </motion.button>
                            </div>
                          </form>
                        )}

                        {contactStatus === "sending" && (
                          <div className="flex flex-col justify-center min-h-[300px] space-y-4 select-none py-6 font-mono text-left">
                            <div className={`flex items-center gap-3 transition-colors duration-300 ${isVillafanShaking ? "text-red-500" : "text-[#d0b2ff]"}`}>
                              <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isVillafanShaking ? "bg-red-500" : "bg-[#d0b2ff]"}`} />
                              <span className="text-sm tracking-widest uppercase font-black font-marker">TRANSMITINDO VIBE...</span>
                            </div>
                            <div className="border border-neutral-900 bg-black/80 rounded p-4 space-y-2 h-[160px] overflow-y-auto text-[10px] text-neutral-400 select-none">
                              {contactLogs.map((log, i) => (
                                <div key={i} className="tracking-wider uppercase font-semibold">
                                  &gt; {log}
                                </div>
                              ))}
                              <span className={`inline-block w-2 h-3 animate-pulse ${isVillafanShaking ? "bg-red-500" : "bg-[#d0b2ff]"}`} />
                            </div>
                          </div>
                        )}

                        {contactStatus === "sent" && (
                          <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-6 py-6">
                            {/* Stylized paint stamp for sent confirmation */}
                            <motion.div
                              initial={{ scale: 3, rotate: 45, opacity: 0 }}
                              animate={{ scale: 1, rotate: -8, opacity: 1 }}
                              transition={{ type: "spring", damping: 10, stiffness: 120 }}
                              className={`border-4 border-double font-marker text-lg px-6 py-3 rounded uppercase tracking-[0.2em] pointer-events-none select-none inline-block bg-black/80 transition-all duration-300 ${
                                isVillafanShaking 
                                  ? "border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                                  : "border-[#d0b2ff] text-[#d0b2ff] shadow-[0_0_15px_rgba(208,178,255,0.25)]"
                              }`}
                            >
                              SINAL GRAVADO // ENVIADO
                            </motion.div>
                            
                            <div className="space-y-2 px-4 max-w-md">
                              <h4 className="font-sedgwick text-xl tracking-wider text-white">GRAVADO NO MURO!</h4>
                              <p className="text-[10px] text-neutral-400 uppercase tracking-widest leading-relaxed">
                                Seu manifesto foi catalogado com sucesso nos canais oficiais de VT. O sinal foi injetado nas frequências baixas de SP. Retornaremos em breve.
                              </p>
                            </div>
                            <button
                              onClick={resetContactForm}
                              className={`px-5 py-2 border text-[10px] transition-all uppercase rounded font-marker cursor-pointer bg-black/40 ${
                                isVillafanShaking 
                                  ? "border-red-500/30 hover:border-red-500 text-neutral-500 hover:text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.1)]" 
                                  : "border-neutral-800 hover:border-[#d0b2ff] text-neutral-500 hover:text-[#d0b2ff]"
                              }`}
                            >
                              [ ENVIAR OUTRO SINAL ]
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Redes Sociais Section with a high-end, minimalist street aesthetic */}
                      <div className="w-full max-w-3xl mt-8 pt-6 border-t border-neutral-900/60 relative z-10">
                        <div className="flex flex-col items-start gap-1 mb-5 font-mono text-left">
                          <h4 className="font-marker text-2xl text-white tracking-widest uppercase">
                            REDES SOCIAIS
                          </h4>
                          <p className="text-[9px] text-neutral-500 uppercase tracking-widest">
                            CONECTE-SE COM AS PLATAFORMAS OFICIAIS DE ARTUR VILLA
                          </p>
                        </div>

                        {/* Social Media Bento Grid - Matuê & Travis Scott Street Wear Aesthetic with VT Signature Face */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono">
                          {/* Instagram */}
                          <a
                            href="https://www.instagram.com/villafanx/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playInterfaceSound("click")}
                            className={`relative group p-5 bg-neutral-950/90 border transition-all duration-300 rounded-md overflow-hidden cursor-pointer flex flex-col justify-between min-h-[130px] hover:scale-[1.03] hover:-rotate-1 ${
                              isVillafanShaking 
                                ? "border-red-500/20 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]" 
                                : "border-neutral-900 hover:border-[#d0b2ff]/70 hover:shadow-[0_0_25px_rgba(208,178,255,0.2)]"
                            }`}
                          >
                            {/* VT signature face watermark inside the button background */}
                            <svg viewBox="0 0 100 100" className={`absolute -bottom-2 -right-2 w-24 h-24 opacity-15 group-hover:opacity-40 transition-all duration-300 fill-none stroke-current pointer-events-none group-hover:scale-105 ${
                              isVillafanShaking ? "text-red-500" : "text-[#d0b2ff]"
                            }`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 50 C12 30 35 15 50 15 C65 15 88 30 85 50 C83 68 62 85 50 85 C38 85 17 68 15 50 Z" />
                              <path d="M28 42 L42 48" strokeWidth="8" />
                              <path d="M72 42 L58 48" strokeWidth="8" />
                              <path d="M35 66 Q50 71 65 66" strokeWidth="6" />
                              <path d="M50 82 V92" strokeWidth="4" />
                              <path d="M30 75 V83" strokeWidth="3" />
                            </svg>

                            <div className="flex items-center justify-between w-full">
                              <div className={`p-1.5 bg-neutral-900/80 border rounded text-neutral-400 group-hover:text-white transition-all ${
                                isVillafanShaking ? "border-red-500/20 group-hover:border-red-500" : "border-neutral-800 group-hover:border-[#d0b2ff]"
                              }`}>
                                <Instagram size={14} />
                              </div>
                              <span className="text-[7px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-bold">STICKER #01</span>
                            </div>
                            
                            <div className="mt-4 text-left z-10">
                              <span className={`block text-xl font-black tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-white group-hover:text-[#d0b2ff]"
                              }`}>INSTAGRAM</span>
                              <span className="block text-[9px] text-neutral-500 uppercase tracking-wider font-semibold font-mono mt-0.5">@villafanx</span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-neutral-900/60 pt-2 z-10">
                              <span className="text-[8px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-semibold font-mono">[ COLA JUNTOS ]</span>
                              <span className={`text-[8px] font-bold tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-[#d0b2ff]"
                              }`}>ABRIR</span>
                            </div>
                          </a>

                          {/* YouTube */}
                          <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playInterfaceSound("click")}
                            className={`relative group p-5 bg-neutral-950/90 border transition-all duration-300 rounded-md overflow-hidden cursor-pointer flex flex-col justify-between min-h-[130px] hover:scale-[1.03] hover:rotate-1 ${
                              isVillafanShaking 
                                ? "border-red-500/20 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]" 
                                : "border-neutral-900 hover:border-[#d0b2ff]/70 hover:shadow-[0_0_25px_rgba(208,178,255,0.25)]"
                            }`}
                          >
                            {/* VT signature face watermark inside the button background with a custom tilt */}
                            <svg viewBox="0 0 100 100" className={`absolute -bottom-2 -left-2 w-24 h-24 opacity-15 group-hover:opacity-40 transition-all duration-300 fill-none stroke-current pointer-events-none group-hover:scale-105 group-hover:-rotate-6 ${
                              isVillafanShaking ? "text-red-500" : "text-[#d0b2ff]"
                            }`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 50 C12 30 35 15 50 15 C65 15 88 30 85 50 C83 68 62 85 50 85 C38 85 17 68 15 50 Z" />
                              <path d="M28 42 L42 48" strokeWidth="8" />
                              <path d="M72 42 L58 48" strokeWidth="8" />
                              <path d="M35 66 Q50 71 65 66" strokeWidth="6" />
                              <path d="M50 82 V92" strokeWidth="4" />
                              <path d="M30 75 V83" strokeWidth="3" />
                            </svg>

                            <div className="flex items-center justify-between w-full">
                              <div className={`p-1.5 bg-neutral-900/80 border rounded text-neutral-400 group-hover:text-white transition-all ${
                                isVillafanShaking ? "border-red-500/20 group-hover:border-red-500" : "border-neutral-800 group-hover:border-[#d0b2ff]"
                              }`}>
                                <Youtube size={14} />
                              </div>
                              <span className="text-[7px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-bold">STICKER #02</span>
                            </div>

                            <div className="mt-4 text-left z-10">
                              <span className={`block text-xl font-black tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-white group-hover:text-[#d0b2ff]"
                              }`}>YOUTUBE</span>
                              <span className="block text-[9px] text-neutral-500 uppercase tracking-wider font-semibold font-mono mt-0.5">CANAL OFICIAL</span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-neutral-900/60 pt-2 z-10">
                              <span className="text-[8px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-semibold font-mono">[ ASSINAR CANAL ]</span>
                              <span className={`text-[8px] font-bold tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-[#d0b2ff]"
                              }`}>ASSINAR</span>
                            </div>
                          </a>

                          {/* Spotify I */}
                          <a
                            href="https://open.spotify.com/intl-pt/artist/0edPG862fVT7XSF3J5aGmo"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playInterfaceSound("click")}
                            className={`relative group p-5 bg-neutral-950/90 border transition-all duration-300 rounded-md overflow-hidden cursor-pointer flex flex-col justify-between min-h-[130px] hover:scale-[1.03] hover:-rotate-2 ${
                              isVillafanShaking 
                                ? "border-red-500/20 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]" 
                                : "border-neutral-900 hover:border-[#d0b2ff]/70 hover:shadow-[0_0_25px_rgba(208,178,255,0.2)]"
                            }`}
                          >
                            {/* VT signature face watermark inside the button background with custom tilt */}
                            <svg viewBox="0 0 100 100" className={`absolute -bottom-2 -right-2 w-24 h-24 opacity-15 group-hover:opacity-40 transition-all duration-300 fill-none stroke-current pointer-events-none group-hover:scale-105 group-hover:rotate-6 ${
                              isVillafanShaking ? "text-red-500" : "text-[#d0b2ff]"
                            }`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 50 C12 30 35 15 50 15 C65 15 88 30 85 50 C83 68 62 85 50 85 C38 85 17 68 15 50 Z" />
                              <path d="M28 42 L42 48" strokeWidth="8" />
                              <path d="M72 42 L58 48" strokeWidth="8" />
                              <path d="M35 66 Q50 71 65 66" strokeWidth="6" />
                              <path d="M50 82 V92" strokeWidth="4" />
                              <path d="M30 75 V83" strokeWidth="3" />
                            </svg>

                            <div className="flex items-center justify-between w-full">
                              <div className={`p-1.5 bg-neutral-900/80 border rounded text-neutral-400 group-hover:text-white transition-all ${
                                isVillafanShaking ? "border-red-500/20 group-hover:border-red-500" : "border-neutral-800 group-hover:border-[#d0b2ff]"
                              }`}>
                                <Music size={14} />
                              </div>
                              <span className="text-[7px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-bold">STICKER #03</span>
                            </div>

                            <div className="mt-4 text-left z-10">
                              <span className={`block text-xl font-black tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-white group-hover:text-[#d0b2ff]"
                              }`}>SPOTIFY I</span>
                              <span className="block text-[9px] text-neutral-500 uppercase tracking-wider font-semibold font-mono mt-0.5">ARTUR VILLA</span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-neutral-900/60 pt-2 z-10">
                              <span className="text-[8px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-semibold font-mono">[ SINGLES & TRAPS ]</span>
                              <span className={`text-[8px] font-bold tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-[#d0b2ff]"
                              }`}>OUVIR</span>
                            </div>
                          </a>

                          {/* Spotify II */}
                          <a
                            href="https://open.spotify.com/intl-pt/artist/0dD9AbgWM9XSkkq9EpXAkX"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playInterfaceSound("click")}
                            className={`relative group p-5 bg-neutral-950/90 border transition-all duration-300 rounded-md overflow-hidden cursor-pointer flex flex-col justify-between min-h-[130px] hover:scale-[1.03] hover:rotate-2 ${
                              isVillafanShaking 
                                ? "border-red-500/20 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]" 
                                : "border-neutral-900 hover:border-[#d0b2ff]/70 hover:shadow-[0_0_25px_rgba(208,178,255,0.25)]"
                            }`}
                          >
                            {/* VT signature face watermark inside the button background with custom tilt */}
                            <svg viewBox="0 0 100 100" className={`absolute -bottom-2 -right-2 w-24 h-24 opacity-15 group-hover:opacity-40 transition-all duration-300 fill-none stroke-current pointer-events-none group-hover:scale-105 group-hover:-rotate-3 ${
                              isVillafanShaking ? "text-red-500" : "text-[#d0b2ff]"
                            }`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 50 C12 30 35 15 50 15 C65 15 88 30 85 50 C83 68 62 85 50 85 C38 85 17 68 15 50 Z" />
                              <path d="M28 42 L42 48" strokeWidth="8" />
                              <path d="M72 42 L58 48" strokeWidth="8" />
                              <path d="M35 66 Q50 71 65 66" strokeWidth="6" />
                              <path d="M50 82 V92" strokeWidth="4" />
                              <path d="M30 75 V83" strokeWidth="3" />
                            </svg>

                            <div className="flex items-center justify-between w-full">
                              <div className={`p-1.5 bg-neutral-900/80 border rounded text-neutral-400 group-hover:text-white transition-all ${
                                isVillafanShaking ? "border-red-500/20 group-hover:border-red-500" : "border-neutral-800 group-hover:border-[#d0b2ff]"
                              }`}>
                                <Music size={14} />
                              </div>
                              <span className="text-[7px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-bold">STICKER #04</span>
                            </div>

                            <div className="mt-4 text-left z-10">
                              <span className={`block text-xl font-black tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-white group-hover:text-[#d0b2ff]"
                              }`}>SPOTIFY II</span>
                              <span className="block text-[9px] text-neutral-500 uppercase tracking-wider font-semibold font-mono mt-0.5">VT ARTISTA</span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-neutral-900/60 pt-2 z-10">
                              <span className="text-[8px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-semibold font-mono">[ MIXS & COLLABS ]</span>
                              <span className={`text-[8px] font-bold tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-[#d0b2ff]"
                              }`}>OUVIR</span>
                            </div>
                          </a>

                          {/* Email */}
                          <a
                            href="mailto:contato.vt@gmail.com"
                            onClick={() => playInterfaceSound("click")}
                            className={`relative group p-5 bg-neutral-950/90 border transition-all duration-300 rounded-md overflow-hidden cursor-pointer flex flex-col justify-between min-h-[130px] hover:scale-[1.03] hover:-rotate-1 ${
                              isVillafanShaking 
                                ? "border-red-500/20 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]" 
                                : "border-neutral-900 hover:border-[#d0b2ff]/70 hover:shadow-[0_0_25px_rgba(208,178,255,0.2)]"
                            }`}
                          >
                            {/* VT signature face watermark inside the button background with a custom tilt */}
                            <svg viewBox="0 0 100 100" className={`absolute -bottom-2 -right-2 w-24 h-24 opacity-15 group-hover:opacity-40 transition-all duration-300 fill-none stroke-current pointer-events-none group-hover:scale-105 group-hover:rotate-6 ${
                              isVillafanShaking ? "text-red-500" : "text-[#d0b2ff]"
                            }`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 50 C12 30 35 15 50 15 C65 15 88 30 85 50 C83 68 62 85 50 85 C38 85 17 68 15 50 Z" />
                              <path d="M28 42 L42 48" strokeWidth="8" />
                              <path d="M72 42 L58 48" strokeWidth="8" />
                              <path d="M35 66 Q50 71 65 66" strokeWidth="6" />
                              <path d="M50 82 V92" strokeWidth="4" />
                              <path d="M30 75 V83" strokeWidth="3" />
                            </svg>

                            <div className="flex items-center justify-between w-full">
                              <div className={`p-1.5 bg-neutral-900/80 border rounded text-neutral-400 group-hover:text-white transition-all ${
                                isVillafanShaking ? "border-red-500/20 group-hover:border-red-500" : "border-neutral-800 group-hover:border-[#d0b2ff]"
                              }`}>
                                <Mail size={14} />
                              </div>
                              <span className="text-[7px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-bold">STICKER #05</span>
                            </div>

                            <div className="mt-4 text-left z-10">
                              <span className={`block text-xl font-black tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-white group-hover:text-[#d0b2ff]"
                              }`}>GMAIL</span>
                              <span className="block text-[9px] text-neutral-500 uppercase tracking-wider font-semibold font-mono mt-0.5">contato.vt@gmail.com</span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-neutral-900/60 pt-2 z-10">
                              <span className="text-[8px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest font-semibold font-mono">[ CONTATO DIRETO ]</span>
                              <span className={`text-[8px] font-bold tracking-widest uppercase font-marker transition-colors ${
                                isVillafanShaking ? "text-red-400 group-hover:text-red-500" : "text-[#d0b2ff]"
                              }`}>ENVIAR</span>
                            </div>
                          </a>
                        </div>
                      </div>

                      {/* Back button - Re-architected as a raw, bold graffiti-sticker "STREET" button */}
                      <motion.button
                        onClick={() => {
                          playInterfaceSound("change-tab");
                          setActiveTab("01"); // Return to initial/Músicas list
                        }}
                        className={`mt-12 relative group cursor-pointer select-none self-center max-w-full sm:w-[420px] rounded-md transition-all duration-300 ${
                          isVillafanShaking 
                            ? "rough-border-red bg-red-500 text-white shadow-[0_10px_35px_rgba(239,68,68,0.3)]" 
                            : "rough-border-purple bg-black/90 hover:bg-[#d0b2ff] text-white hover:text-black shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
                        }`}
                        whileHover={{ scale: 1.04, rotate: -0.5 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="p-4 sm:p-5 flex items-center gap-5 w-full relative">
                          {/* Street tag style ribbon label */}
                          <div className={`absolute top-0 right-0 font-marker text-[9px] px-3 py-1 uppercase tracking-widest pointer-events-none rounded-bl transition-all duration-300 ${
                            isVillafanShaking ? "bg-black text-red-500 font-bold" : "bg-[#d0b2ff] text-black font-extrabold group-hover:bg-black group-hover:text-[#d0b2ff]"
                          }`}>
                            VOLTAR
                          </div>

                          {/* Hand-drawn VT Face Icon (Bold, high-impact raw street design) */}
                          <div className={`w-14 h-14 shrink-0 rounded-md flex items-center justify-center transition-all duration-300 relative overflow-hidden border-2 ${
                            isVillafanShaking 
                              ? "bg-black border-red-400" 
                              : "bg-neutral-900 border-neutral-700 group-hover:bg-black group-hover:border-black"
                          }`}>
                            <svg viewBox="0 0 100 100" className={`w-10 h-10 stroke-2 fill-none transition-colors duration-300 ${
                              isVillafanShaking ? "stroke-red-500" : "stroke-white group-hover:stroke-[#d0b2ff]"
                            }`} strokeLinecap="round" strokeLinejoin="round">
                              {/* Raw graffiti VT tag head shape */}
                              <path d="M15 50 C12 30 35 15 50 15 C65 15 88 30 85 50 C83 68 62 85 50 85 C38 85 17 68 15 50 Z" strokeWidth="6" />
                              {/* Stencil spray eyes */}
                              <path d="M28 42 L42 48" strokeWidth="10" />
                              <path d="M72 42 L58 48" strokeWidth="10" />
                              {/* Gritty marker mouth */}
                              <path d="M35 66 Q50 71 65 66" strokeWidth="7" />
                              {/* Extra raw paint drips */}
                              <path d="M50 82 V92" strokeWidth="5" />
                              <path d="M30 75 V83" strokeWidth="4" />
                            </svg>
                          </div>

                          <div className="flex flex-col text-left font-mono">
                            <span className={`font-marker text-sm sm:text-base tracking-wider uppercase transition-colors duration-300 ${
                              isVillafanShaking ? "text-black group-hover:text-white" : "text-neutral-200 group-hover:text-black font-bold"
                            }`}>
                              FECHAR CONTATO
                            </span>
                            <span className={`text-[8px] uppercase tracking-widest transition-colors duration-300 ${
                              isVillafanShaking ? "text-neutral-800" : "text-neutral-500 group-hover:text-neutral-800"
                            }`}>
                              &gt; VOLTAR AO MENU PRINCIPAL
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    </motion.div>
                  ) : activeTab === "02" ? (
                    <div 
                      id="dossier-root-container"
                      className="w-full max-w-6xl flex flex-col items-center justify-center relative select-none min-h-[80vh] pb-12 overflow-hidden px-4"
                    >
                      {/* CINEMATIC INTRO SECTIONS */}
                      <AnimatePresence mode="wait">
                        {dossierIntroState === "blackout" && (
                          <motion.div
                            key="blackout"
                            className="absolute inset-0 bg-black z-50 flex items-center justify-center text-center p-6"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                          >
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                            <motion.div 
                              animate={{ scale: [1, 1.02, 1], opacity: [0.1, 0.2, 0.1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-xs font-mono tracking-[0.5em] text-neutral-800"
                            >
                              [ SISTEMA ENTRANDO EM AMBIENTE DE INVESTIGAÇÃO ]
                            </motion.div>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence1" && (
                          <motion.div
                            key="sentence1"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(30,10,10,0.2)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10 opacity-60" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            {/* Technical HUD overlays */}
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-500/60 tracking-widest uppercase select-none text-left z-20 space-y-1">
                              <div>SYS_STATUS: INIT_LOAD</div>
                              <div>STREAM: ENCRYPTED_RX // CH_02</div>
                            </div>
                            <div className="absolute top-6 right-6 font-mono text-[8px] text-neutral-500 tracking-widest uppercase select-none text-right z-20 space-y-1">
                              <div>LOC: SP_SUB_DIR</div>
                              <div>FREQ: DECODING...</div>
                            </div>

                            <motion.div 
                              className="w-16 h-[2px] bg-red-600 mb-8 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                              animate={{ scaleX: [0, 1, 0.8, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />

                            <motion.h2 
                              className="text-2xl sm:text-4xl font-sans font-black tracking-[0.25em] text-white text-center select-none z-20 uppercase"
                              initial={{ letterSpacing: "0.1em", opacity: 0 }}
                              animate={{ letterSpacing: "0.25em", opacity: [0, 1, 1, 0.9] }}
                              transition={{ duration: 2.2, ease: "easeOut" }}
                            >
                              "Iniciando transmissão analógica..."
                            </motion.h2>

                            {/* Oscilloscope lines */}
                            <svg className="absolute bottom-16 left-0 right-0 h-24 w-full pointer-events-none opacity-20 z-0">
                              <path
                                d="M 0 48 Q 200 10 400 90 T 800 48 T 1200 80 T 1600 48"
                                fill="none"
                                stroke="#dc2626"
                                strokeWidth="1.5"
                                className="animate-pulse"
                              />
                            </svg>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence2" && (
                          <motion.div
                            key="sentence2"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(30,10,10,0.15)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10 opacity-40" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-500/60 tracking-widest uppercase select-none text-left z-20">
                              TARGET: ID_UNRESOLVED // CAP_II
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Ninguém conhece a verdadeira face de VT."
                            </motion.h2>

                            {/* Oscilloscope waves */}
                            <svg className="absolute bottom-16 left-0 right-0 h-24 w-full pointer-events-none opacity-20 z-0">
                              <path
                                d="M 0 48 Q 300 90 600 10 T 1200 80 T 1800 48"
                                fill="none"
                                stroke="#dc2626"
                                strokeWidth="2"
                                className="animate-pulse"
                              />
                            </svg>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence3" && (
                          <motion.div
                            key="sentence3"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(30,10,10,0.15)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Só conhecem os fragmentos que ele permitiu escapar."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence4" && (
                          <motion.div
                            key="sentence4"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(30,10,10,0.18)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-500/60 tracking-widest uppercase select-none text-left z-20">
                              FREQ_MAPPING: SUB_BASS // 32.8Hz
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Uma assinatura oculta no espectro dos subgraves de São Paulo."
                            </motion.h2>

                            <svg className="absolute bottom-16 left-0 right-0 h-24 w-full pointer-events-none opacity-30 z-0">
                              <path
                                d="M 0 60 Q 250 120 500 10 T 1000 110 T 1500 60"
                                fill="none"
                                stroke="#dc2626"
                                strokeWidth="2.5"
                                className="animate-pulse"
                              />
                            </svg>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence5" && (
                          <motion.div
                            key="sentence5"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(30,10,10,0.2)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <motion.div className="absolute inset-0 w-full h-full relative z-0">
                              <motion.img
                                src="/imagens-inicio/VT-MAL.png"
                                alt="VT Shadow Detail"
                                className="absolute inset-0 w-full h-full object-cover filter saturate-[0.02] contrast-[2.2] brightness-[0.18] pointer-events-none z-0"
                                style={{ objectPosition: "50% 12%" }}
                                initial={{ scale: 1.75, opacity: 0 }}
                                animate={{ scale: 1.7, opacity: 0.22 }}
                                transition={{ duration: 2.5 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent w-full h-full z-10" />
                            </motion.div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20 max-w-2xl"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Sua voz é o eco que vibra sob as fendas da metrópole de cinzas."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence6" && (
                          <motion.div
                            key="sentence6"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(40,10,10,0.18)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20 max-w-2xl"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Cada ruído, cada batida distorcida esconde uma verdade censurada."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence7" && (
                          <motion.div
                            key="sentence7"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(30,10,10,0.2)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-500/60 tracking-widest uppercase select-none text-left z-20">
                              MEDIA_RX: K7_DECK // MON_01
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Um manifesto construído com fitas K7 e ondas de rádio pirata."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence8" && (
                          <motion.div
                            key="sentence8"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(30,10,10,0.22)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-35 z-10" />
                            
                            <motion.div className="absolute inset-0 w-full h-full relative z-0">
                              <motion.img
                                src="/imagens-inicio/VT-MAL.png"
                                alt="VT Face Detail"
                                className="absolute inset-0 w-full h-full object-cover filter saturate-[0.10] contrast-[2.6] brightness-[0.24] pointer-events-none z-0"
                                style={{ objectPosition: "58% 28%" }}
                                initial={{ scale: 3.2, opacity: 0 }}
                                animate={{ scale: 3.1, opacity: 0.28 }}
                                transition={{ duration: 2.5 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent w-full h-full z-10" />
                            </motion.div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20 max-w-2xl"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Frequências que desafiam o esquecimento e rasgam o silêncio urbano."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence9" && (
                          <motion.div
                            key="sentence9"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(40,10,10,0.25)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-35 z-10" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-500/60 tracking-widest uppercase select-none text-left z-20">
                              SYS_WAKE: CHAPTER_II_LOAD // CRITICAL
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Subgraves analógicos de 2007 despertando o Capítulo II."
                            </motion.h2>

                            <svg className="absolute bottom-16 left-0 right-0 h-24 w-full pointer-events-none opacity-40 z-0">
                              <path
                                d="M 0 30 Q 150 120 300 10 T 600 110 T 900 20 T 1200 100 T 1500 30"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="3"
                                className="animate-pulse"
                              />
                            </svg>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence10" && (
                          <motion.div
                            key="sentence10"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(20,40,20,0.15)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-25 z-10" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-emerald-500/60 tracking-widest uppercase select-none text-left z-20">
                              SIGNAL: LOCK // VERIFIED // 100%
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "O sinal subterrâneo foi restabelecido com sucesso."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence11" && (
                          <motion.div
                            key="sentence11"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(40,10,10,0.22)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-500/60 tracking-widest uppercase select-none text-left z-20">
                              DECODING: CH2_STREAM_FINAL
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Prepare-se para sintonizar a frequência final..."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence12" && (
                          <motion.div
                            key="sentence12"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(40,10,10,0.22)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-500/60 tracking-widest uppercase select-none text-left z-20">
                              BROADCAST: PIRATE_TX // ONLINE
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20 max-w-2xl"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "Sua arte é uma transmissão clandestina que nenhum canal pôde silenciar."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence13" && (
                          <motion.div
                            key="sentence13"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(50,10,10,0.2)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-500/60 tracking-widest uppercase select-none text-left z-20">
                              RESONANCE: METROPOLIS_ECHO
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.15em] text-neutral-300 text-center select-none leading-relaxed z-20 max-w-2xl"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.8, ease: "easeOut" }}
                            >
                              "As fendas nos muros de concreto revelam as marcas de uma geração sem amor."
                            </motion.h2>
                          </motion.div>
                        )}

                        {dossierIntroState === "sentence14" && (
                          <motion.div
                            key="sentence14"
                            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center p-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0.95 }}
                            transition={{ 
                              opacity: { duration: 0.6 },
                              y: { duration: 1.5, ease: [0.77, 0, 0.175, 1] } 
                            }}
                          >
                            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(50,5,5,0.25)_0%,#000000_100%] pointer-events-none z-0" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10 opacity-30" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />
                            
                            <div className="absolute top-6 left-6 font-mono text-[8px] text-red-600/70 tracking-widest uppercase select-none text-left z-20">
                              DECODING: COMPLETE_DOSSIER_OPEN
                            </div>

                            <motion.h2 
                              className="text-xl sm:text-3xl font-sans font-light tracking-[0.18em] text-white text-center select-none leading-relaxed z-20 max-w-2xl"
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 1.6, ease: "easeOut" }}
                            >
                              "O dossiê foi liberado. Conecte-se aos fragmentos."
                            </motion.h2>

                            <motion.div 
                              className="absolute bottom-16 text-neutral-500 font-mono text-[9px] tracking-[0.3em] uppercase animate-pulse"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.6 }}
                              transition={{ delay: 1 }}
                            >
                              REVELANDO MURAL DE PROVAS...
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ULTRA-PREMIUM SKIP INTRO BUTTON */}
                      {dossierIntroState !== "interactive_wall" && dossierIntroState !== "idle" && dossierIntroState !== "blackout" && (
                        <motion.button
                          onClick={() => {
                            playInterfaceSound("change-tab");
                            playDossierMetallicSound();
                            setDossierIntroState("interactive_wall");
                          }}
                          className="absolute bottom-10 right-10 z-50 px-4 py-2 bg-black/70 hover:bg-red-950/20 border border-neutral-900 hover:border-red-600/50 text-neutral-500 hover:text-red-500 font-mono text-[9px] tracking-[0.25em] rounded uppercase transition-all duration-300 cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          [ PULAR INTRODUÇÃO ]
                        </motion.button>
                      )}

                      {/* MAIN INTERACTIVE INVESTIGATION BOARD (CORKBOARD WALL) */}
                      {dossierIntroState === "interactive_wall" && (
                        <motion.div
                          className="w-full flex flex-col relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.0 }}
                        >
                          {/* Board Metadata Header */}
                          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-900 pb-4 mb-6 select-none font-sans">
                            <div className="flex flex-col text-left">
                              <span className="text-xs text-red-600 font-black tracking-[0.3em] uppercase">ARQUIVO DE SINAIS // DOSSIÊ VT</span>
                              <span className="text-[10px] text-neutral-500 tracking-widest uppercase font-medium mt-1">EXPOSIÇÃO DE MEMORÁBILIA E EVÍDENCIAS COLECIONADAS</span>
                            </div>
                            <div className="flex items-center gap-4 mt-4 sm:mt-0 font-mono">
                              {/* Cable color toggle trigger */}
                              <button
                                onClick={() => {
                                  playInterfaceSound("glitch");
                                  triggerScreenDistortion();
                                  setCorkboardStringsColor((prev) => 
                                    prev === "crimson" ? "neon-red" : prev === "neon-red" ? "glitched-orange" : "crimson"
                                  );
                                }}
                                className="px-3 py-1.5 text-[9px] border border-neutral-800 hover:border-red-600 bg-neutral-950 text-neutral-500 hover:text-red-500 transition-all uppercase cursor-pointer rounded"
                              >
                                FIOS: {corkboardStringsColor.toUpperCase()}
                              </button>

                              <button
                                onClick={() => {
                                  playInterfaceSound("change-tab");
                                  setDossierIntroState("blackout");
                                  setTimeout(() => {
                                    setActiveTab("01");
                                  }, 800);
                                }}
                                className="px-4 py-2 border border-red-900/40 hover:border-red-600 bg-red-950/10 hover:bg-red-950/20 text-red-500 text-[10px] hover:text-white transition-all rounded uppercase tracking-[0.2em] cursor-pointer flex items-center gap-1.5 active:scale-95 font-bold"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                FECHAR MURAL
                              </button>
                            </div>
                          </div>

                          {/* INSTRUCTIONS BANNER */}
                          <div className="w-full flex justify-center mb-6 select-none">
                            <p className="text-neutral-400 font-sans text-xs tracking-wider max-w-2xl leading-relaxed text-center font-light">
                              Coleção de fragmentos físicos, fitas analógicas e fotos recuperadas sobre a identidade subterrânea de VT. Clique nos artefatos da mesa de investigação abaixo para examinar os registros históricos.
                            </p>
                          </div>

                          {/* CORKBOARD AREA WRAPPER FOR HORIZONTAL PANNING ON SMALL SCREENS */}
                          <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-900 flex justify-start lg:justify-center">
                            
                            {/* CORKBOARD AREA - FIXED DIMENSIONS FOR PIXEL-PERFECT DESKTOP ALIGNMENT */}
                            <div className="relative w-[1000px] h-[610px] bg-[#060608] border border-neutral-900 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] shrink-0 flex flex-col md:block">
                              
                              {/* Ambient Vignette & Fine Grit Textures */}
                              <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(40,4,4,0.12)_0%,rgba(0,0,0,1)_100%] pointer-events-none z-0" />
                              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10 opacity-30" />
                              <div 
                                className="absolute inset-0 pointer-events-none z-10 opacity-[0.12] mix-blend-overlay"
                                style={{
                                  backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')"
                                }}
                              />

                              {/* SVG CANVAS FOR DRAWING STRINGS - PERFECTLY STATIC & RESISTANT TO DRIFTING */}
                              <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-20">
                                <defs>
                                  <filter id="stringShadow" x="-10%" y="-10%" width="120%" height="120%">
                                    <feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.85" />
                                  </filter>
                                </defs>
                                <g filter="url(#stringShadow)" className="transition-all duration-500">
                                  {/* String 1: Manila Folder Pin (250, 40) to Central Clipboard Pin (620, 35) */}
                                  <path
                                    d="M 250 40 Q 435 150 620 35"
                                    stroke={corkboardStringsColor === "crimson" ? "#991b1b" : corkboardStringsColor === "neon-red" ? "#ef4444" : "#f97316"}
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="opacity-80 animate-pulse [animation-duration:6s]"
                                  />
                                  {/* String 2: Sticky Note Pin (50, 435) to Central Clipboard Pin (620, 35) */}
                                  <path
                                    d="M 50 435 Q 335 300 620 35"
                                    stroke={corkboardStringsColor === "crimson" ? "#991b1b" : corkboardStringsColor === "neon-red" ? "#ef4444" : "#f97316"}
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="opacity-80"
                                  />
                                  {/* String 3: Polaroid Pin (840, 230) to Central Clipboard Pin (620, 35) */}
                                  <path
                                    d="M 840 230 Q 730 180 620 35"
                                    stroke={corkboardStringsColor === "crimson" ? "#991b1b" : corkboardStringsColor === "neon-red" ? "#ef4444" : "#f97316"}
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="opacity-80 animate-pulse [animation-duration:8s]"
                                  />
                                  {/* String 4: Ziploc Bag Pin (565, 80) to Central Clipboard Pin (620, 35) */}
                                  <path
                                    d="M 565 80 Q 590 60 620 35"
                                    stroke={corkboardStringsColor === "crimson" ? "#991b1b" : corkboardStringsColor === "neon-red" ? "#ef4444" : "#f97316"}
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="opacity-80"
                                  />
                                </g>
                              </svg>

                              {/* --- MOBILE LAYOUT: SCROLLABLE LIST OF ARTIFACTS --- */}
                              <div className="md:hidden flex flex-col space-y-6 p-4 z-30 relative select-none">
                                
                                {/* Central Deck Container Mobile */}
                                <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 flex flex-col items-center">
                                  <span className="text-[10px] text-red-500 font-bold tracking-[0.2em] font-sans mb-3">ARQUIVO DE PROVAS CENTRAL</span>
                                  <MobileCentralDeck
                                    step={investigationStep}
                                    setStep={setInvestigationStep}
                                    isPlayingTape={isPlayingTape}
                                    setIsPlayingTape={setIsPlayingTape}
                                    isPlayingDecodedBeat={isPlayingDecodedBeat}
                                    setIsPlayingDecodedBeat={setIsPlayingDecodedBeat}
                                    playCassetteSqueal={playCassetteSqueal}
                                    playDecodedIndustrialBeat={playDecodedIndustrialBeat}
                                  />
                                </div>

                                {/* Other items Mobile List */}
                                <div className="grid grid-cols-2 gap-4">
                                  <button
                                    onClick={() => {
                                      playInterfaceSound("change-tab");
                                      setActiveBoardItem("map");
                                    }}
                                    className="bg-neutral-900 border border-neutral-800/80 rounded p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-neutral-700 transition-all"
                                  >
                                    <span className="text-red-500 text-xs mb-1">🗺️ MAPA DE SINAIS</span>
                                    <span className="font-sans text-[9px] text-neutral-400 font-medium">SÃO PAULO 2007</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      playInterfaceSound("change-tab");
                                      setActiveBoardItem("report");
                                    }}
                                    className="bg-neutral-900 border border-neutral-800/80 rounded p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-neutral-700 transition-all"
                                  >
                                    <span className="text-red-500 text-xs mb-1">📄 DIÁRIO DE OBSERVAÇÃO</span>
                                    <span className="font-sans text-[9px] text-neutral-400 font-medium">PERFIL PSICOLÓGICO</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      playInterfaceSound("change-tab");
                                      setActiveBoardItem("timeline");
                                    }}
                                    className="bg-neutral-900 border border-neutral-800/80 rounded p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-neutral-700 transition-all"
                                  >
                                    <span className="text-red-500 text-xs mb-1">💿 DISK CRONOLOGIA</span>
                                    <span className="font-sans text-[9px] text-neutral-400 font-medium">LANÇAMENTOS REAIS</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      playInterfaceSound("glitch");
                                      triggerScreenDistortion();
                                      setActiveBoardItem("rune");
                                    }}
                                    className="bg-neutral-900 border border-neutral-800/80 rounded p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-neutral-700 transition-all"
                                  >
                                    <span className="text-red-500 text-xs mb-1">⎔ CÓDIGO DO SINAL</span>
                                    <span className="font-sans text-[9px] text-neutral-400 font-medium">INFECTAR FREQUÊNCIA</span>
                                  </button>
                                </div>

                              </div>

                              {/* --- DESKTOP LAYOUT: ULTRA-IMMERSIVE CASE COLLAGE BOARD --- */}
                              <div className="hidden md:block absolute inset-0 z-30">
                                
                                {/* ----------------================ LEFT COLUMN: THE REAL MANILA DOSSIER FOLDER ================---------------- */}
                                <div className="absolute left-[20px] top-[20px] w-[460px] h-[565px] select-none">
                                  {/* Manila Cardboard Folder Tab Base */}
                                  <div className="absolute inset-0 bg-[#d2be9f] border border-[#ab9573]/60 rounded-xl shadow-[2px_18px_45px_rgba(0,0,0,0.95)] z-0 overflow-hidden">
                                    {/* Fiber and paper grain pattern */}
                                    <div className="absolute inset-0 bg-radial-[circle_at_top_left,rgba(255,255,255,0.15)_0%,transparent_100%] opacity-40" />
                                    <div className="absolute top-[18px] right-4 bg-[#bca683]/50 border border-[#ab9573]/40 rounded px-1.5 py-0.5 text-[7px] text-[#5c492d] font-mono tracking-widest uppercase">
                                      VT-09 // REF-RECEPTOR
                                    </div>
                                  </div>

                                  {/* Upper Manila File Tab Sticker */}
                                  <div className="absolute -top-[12px] left-[35px] h-[22px] w-[140px] bg-[#d2be9f] border-t border-l border-r border-[#ab9573]/50 rounded-t shadow-sm z-0 flex items-center px-3">
                                    <span className="font-mono text-[7px] font-black text-[#503f26] tracking-[0.2em] uppercase">SUBJECT_VT_09</span>
                                  </div>

                                  {/* The Typed White Investigation Paper Sheet inside folder */}
                                  <div 
                                    className="absolute left-[12px] right-[12px] top-[14px] bottom-[14px] bg-[#fbfbfa] border border-neutral-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] rounded-sm p-5 flex flex-col justify-between text-left font-sans z-10 hover:brightness-[1.01] transition-all"
                                    onClick={() => {
                                      playInterfaceSound("change-tab");
                                      setActiveBoardItem("report");
                                    }}
                                  >
                                    {/* Steel T-Bar / Push Pin Head at top center pinning the white paper */}
                                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-radial-[circle_at_35%_35%,#e5e5e5_0%,#737373_70%,#404040_100%] rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.75)] border border-neutral-500 flex items-center justify-center z-20 cursor-pointer">
                                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full opacity-60" />
                                    </div>

                                    <div>
                                      {/* Document Title header exactly matching reference */}
                                      <div className="text-center mt-3 mb-1">
                                        <h1 className="text-[#a81c1c] font-black font-sans text-3xl tracking-[0.05em] uppercase leading-none">DOSSIÊ VILLAFAN</h1>
                                        <p className="text-[#a81c1c] font-bold text-[8px] tracking-[0.16em] uppercase mt-2 leading-none">
                                          CLASSIFICAÇÃO: SECRETO / CÓDIGO VT-09 / ARQUIVO DIGITAL
                                        </p>
                                      </div>

                                      {/* Top Divider bar */}
                                      <div className="w-full h-[1px] bg-[#a81c1c]/25 my-3" />

                                      {/* Subject Demographics Panel */}
                                      <div className="bg-neutral-100/75 border border-neutral-200 rounded p-3 font-mono text-[9px] text-neutral-800 leading-relaxed relative">
                                        {/* Corner paper clip illustration */}
                                        <div className="absolute -top-1.5 right-4 w-3.5 h-6 border-2 border-neutral-400 border-b-0 rounded-t-sm rotate-[12deg] opacity-75" />
                                        
                                        <div><strong className="text-neutral-500">[SUBJECT ID: VT]</strong></div>
                                        <div className="mt-0.5"><strong>NAME:</strong> VILLA, ARTUR "VT"</div>
                                        <div className="mt-0.5"><strong>AFFILIATION:</strong> INDEPENDENTE</div>
                                        <div className="mt-0.5"><strong>STATUS:</strong> <span className="text-emerald-700 bg-emerald-100/80 px-1 py-0.5 rounded font-black text-[8px] border border-emerald-200/40 font-mono">[G] ATIVO</span></div>
                                        <div className="mt-0.5"><strong>LOCATION:</strong> DESCONHECIDO (ÚLTIMA LEITURA: 12/04/2026)</div>
                                        <div className="mt-0.5"><strong>RISK LEVEL:</strong> <span className="text-red-700 bg-red-100/80 px-1 py-0.5 rounded font-black text-[8px] border border-red-200/40 font-mono">[R] ALTO</span></div>
                                      </div>

                                      {/* Two Column metrics & Observation block */}
                                      <div className="grid grid-cols-2 gap-4 mt-4 select-none">
                                        {/* Left Column: Metrics with custom cross-strike Tally Marks */}
                                        <div className="space-y-2.5 font-mono">
                                          <div className="text-[9px] text-neutral-500 font-bold tracking-wider uppercase border-b border-neutral-200 pb-1">[ANALYSIS METRICS]</div>
                                          
                                          <div className="text-[8px] leading-tight">
                                            <span className="text-emerald-600 font-bold">[G]</span> EXPERIMENTALISMO
                                            <div className="text-red-700 font-black tracking-widest text-[9px] mt-0.5 flex gap-1 items-center font-sans">
                                              <span className="line-through decoration-red-700 decoration-[1.5px] decoration-solid">||||</span>
                                              <span className="line-through decoration-red-700 decoration-[1.5px] decoration-solid">||||</span>
                                              <span>|||</span>
                                            </div>
                                          </div>

                                          <div className="text-[8px] leading-tight">
                                            <span className="text-emerald-600 font-bold">[G]</span> INOVAÇÃO
                                            <div className="text-red-700 font-black tracking-widest text-[9px] mt-0.5 flex gap-1 items-center font-sans">
                                              <span className="line-through decoration-red-700 decoration-[1.5px] decoration-solid">||||</span>
                                              <span>||</span>
                                            </div>
                                          </div>

                                          <div className="text-[8px] leading-tight">
                                            <span className="text-red-600 font-bold">[R]</span> ABSTRATIVIDADE
                                            <div className="text-red-700 font-black tracking-widest text-[9px] mt-0.5 font-sans">
                                              <span>||||</span>
                                            </div>
                                          </div>

                                          <div className="text-[8px] leading-tight">
                                            <span className="text-red-600 font-bold">[R]</span> REBELDIA
                                            <div className="text-red-700 font-black tracking-widest text-[9px] mt-0.5 flex gap-1 items-center font-sans">
                                              <span className="line-through decoration-red-700 decoration-[1.5px] decoration-solid">||||</span>
                                              <span className="line-through decoration-red-700 decoration-[1.5px] decoration-solid">||||</span>
                                              <span>|||</span>
                                            </div>
                                          </div>

                                          <div className="text-[8px] leading-tight">
                                            <span className="text-[#a81c1c] font-bold">[R]</span> CAPACIDADE ADAPTATIVA
                                            <div className="text-neutral-400 text-[7px] italic mt-0.5 uppercase tracking-tight">[DADOS EM COLEÇÃO]</div>
                                          </div>
                                        </div>

                                        {/* Right Column: Observation logs */}
                                        <div className="space-y-2 text-[8px] font-sans text-neutral-700 leading-normal border-l border-neutral-150 pl-3">
                                          <div className="font-mono text-[9px] text-neutral-500 font-bold tracking-wider uppercase border-b border-neutral-200 pb-1">[SUMMARY LOG]</div>
                                          <div className="font-mono text-[7px] text-red-600 font-black uppercase tracking-wider mb-1">[DATA LOG: OBSERVAÇÃO]</div>
                                          
                                          <ul className="space-y-1.5 list-none pl-0">
                                            <li className="relative pl-2.5">
                                              <span className="absolute left-0 top-1 w-1 h-1 bg-red-600 rounded-full" />
                                              SUJEITO EXIBE CONDUTAS FORA DOS PADRÕES ESTABELECIDOS.
                                            </li>
                                            <li className="relative pl-2.5">
                                              <span className="absolute left-0 top-1 w-1 h-1 bg-red-600 rounded-full" />
                                              RESPOSTAS COGNITIVAS NÃO LINEARES REGISTRADAS.
                                            </li>
                                            <li className="relative pl-2.5">
                                              <span className="absolute left-0 top-1 w-1 h-1 bg-red-600 rounded-full" />
                                              INCIDENTES DE "DISTORÇÃO DE DADOS" REGISTRADOS EM FREQUÊNCIA CRESCENTE.
                                            </li>
                                          </ul>

                                          {/* Stamp exactly matching bottom of folder */}
                                          <div className="pt-2">
                                            <div className="border border-red-600/70 border-dashed text-red-600 text-[10px] font-black tracking-[0.25em] px-1.5 py-1 text-center rotate-[-3deg] uppercase font-sans select-none bg-red-50/50 shadow-sm">
                                              MANTENHA VIGILÂNCIA
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer Technical Sign-offs of typewriter sheet */}
                                    <div className="flex justify-between items-end font-mono text-[6.5px] text-neutral-400 mt-4 border-t border-neutral-100 pt-2 select-none uppercase">
                                      <span>N02.3 | 48/V/373 123°14' | D4ZA_LOG<br />V5.2.2 | 48°14'6 127°558 | D5TA_LOG</span>
                                      <span className="text-red-500/60 font-bold text-right tracking-widest">[ CLIQUE PARA EXPANDIR TEXTO ]</span>
                                    </div>
                                  </div>

                                  {/* Pinned Yellow Sticky Note (Bottom-Left) */}
                                  <motion.div 
                                    className="absolute left-[20px] bottom-[20px] z-20 cursor-pointer"
                                    whileHover={{ scale: 1.08, rotate: -2, zIndex: 45 }}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Avoid triggering folder click
                                      playInterfaceSound("hover");
                                      setActiveBoardItem("map");
                                    }}
                                  >
                                    <div className="relative w-[110px] bg-[#fef08a] border border-yellow-300 shadow-[2px_10px_20px_rgba(0,0,0,0.6)] px-3 py-2.5 rounded-sm -rotate-[4deg] text-left select-none text-neutral-800">
                                      {/* Glossy Plastic Red Pin Head securing the sticky note */}
                                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-radial-[circle_at_35%_35%,#f43f5e_0%,#be123c_70%,#4c0519_100%] rounded-full shadow-[0_2.5px_5px_rgba(0,0,0,0.7)] border border-rose-800 flex items-center justify-center z-10">
                                        <span className="w-1 h-1 bg-white/70 rounded-full opacity-60" />
                                      </div>
                                      
                                      <div className="text-center font-sans font-black tracking-wider leading-none mt-1">
                                        <span className="text-xl leading-none">2024</span>
                                        <div className="h-[1px] bg-neutral-400 w-full my-1" />
                                        <span className="text-[10px] tracking-widest text-neutral-600">DINHEIRO</span>
                                      </div>

                                      {/* Handwritten red arrow pointing right using SVG */}
                                      <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-[28px] h-[15px] pointer-events-none z-30">
                                        <svg viewBox="0 0 30 15" className="w-full h-full text-red-500/90 filter drop-shadow-[1px_2px_2px_rgba(0,0,0,0.5)]">
                                          <path d="M 2 7 Q 15 2 26 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                          <path d="M 18 1 L 27 7 L 19 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                                        </svg>
                                      </div>
                                    </div>
                                  </motion.div>

                                  {/* Pinned Brown Kraft Envelope "ARQUIVO 001" (Bottom-Middle-Right) */}
                                  <motion.div 
                                    className="absolute left-[180px] bottom-[15px] z-20 cursor-pointer"
                                    whileHover={{ scale: 1.06, rotate: 5, zIndex: 45 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playInterfaceSound("open");
                                      setInvestigationStep(0); // Restart tape sequence
                                    }}
                                  >
                                    <div className="relative w-[110px] bg-[#c3a887] border border-[#a48a68] shadow-[3px_11px_22px_rgba(0,0,0,0.7)] px-3 py-2 text-[#311702] rounded-sm rotate-[3deg] text-center select-none font-mono">
                                      {/* Glossy Plastic Red Pin Head securing the envelope */}
                                      <div className="absolute -top-1.5 left-[30px] w-3.5 h-3.5 bg-radial-[circle_at_35%_35%,#f43f5e_0%,#be123c_70%,#4c0519_100%] rounded-full shadow-[0_2.5px_5px_rgba(0,0,0,0.7)] border border-rose-800 flex items-center justify-center z-10">
                                        <span className="w-1 h-1 bg-white/70 rounded-full opacity-60" />
                                      </div>

                                      <div className="text-[10px] font-black tracking-widest mt-1 border-b border-[#a48a68]/40 pb-0.5">
                                        ARQUIVO
                                      </div>
                                      <div className="text-xl font-sans font-black tracking-wide leading-none py-1">
                                        001
                                      </div>

                                      {/* Red arrow pointing to polaroids */}
                                      <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-[28px] h-[15px] pointer-events-none z-30">
                                        <svg viewBox="0 0 30 15" className="w-full h-full text-red-500/90 filter drop-shadow-[1px_2px_2px_rgba(0,0,0,0.5)]">
                                          <path d="M 2 7 Q 15 2 26 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                          <path d="M 18 1 L 27 7 L 19 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                                        </svg>
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>


                                {/* ----------------================ CENTRAL CLIPBOARD: INTERACTIVE PROOFS & DECK ================---------------- */}
                                <div className="absolute left-[500px] top-[20px] w-[240px] z-30">
                                  <motion.div
                                    className="relative p-3 pb-4 bg-neutral-900 border border-neutral-800 shadow-[0_25px_55px_rgba(0,0,0,0.95)] rounded-md select-none flex flex-col items-center"
                                    whileHover={{ scale: 1.015 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {/* High-fidelity Steel Clipboard Spring Clamp header */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-500 border border-neutral-600 rounded-md shadow-md z-40 flex flex-col items-center justify-center">
                                      <div className="w-20 h-1 bg-neutral-700/65 rounded-full" />
                                      <div className="w-4 h-4 rounded-full bg-neutral-600 border border-neutral-700 mt-1 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
                                      </div>
                                    </div>

                                    {/* Silver Push Pin pinning the clip board to the back wall */}
                                    <div className="absolute top-[8px] left-[15px] w-3 h-3 bg-radial-[circle_at_30%_30%,#e5e5e5_0%,#737373_70%,#404040_100%] rounded-full shadow-[0_2.5px_4px_rgba(0,0,0,0.8)] border border-neutral-500 z-40" />
                                    
                                    <div className="w-full flex flex-col items-center text-center mt-3 bg-neutral-950/40 p-2.5 rounded border border-neutral-850/50">
                                      {/* Sub-header label on clipboard */}
                                      <span className="text-[7.5px] text-red-500 font-bold tracking-[0.25em] font-sans mb-3 block uppercase">DECK DE EVIDÊNCIAS DE VT // MULTIMÍDIA</span>
                                      
                                      <MobileCentralDeck
                                        step={investigationStep}
                                        setStep={setInvestigationStep}
                                        isPlayingTape={isPlayingTape}
                                        setIsPlayingTape={setIsPlayingTape}
                                        isPlayingDecodedBeat={isPlayingDecodedBeat}
                                        setIsPlayingDecodedBeat={setIsPlayingDecodedBeat}
                                        playCassetteSqueal={playCassetteSqueal}
                                        playDecodedIndustrialBeat={playDecodedIndustrialBeat}
                                      />
                                    </div>
                                  </motion.div>
                                </div>


                                {/* ----------------================ RIGHT SIDE: PHYSICAL COLLAGE ARCHIVE ================---------------- */}
                                {/* BACKGROUND FILM NEGATIVE TRANSPARENT STRIPS WITH RED FRAMES */}
                                <div className="absolute right-[40px] top-[40px] w-[440px] h-[540px] pointer-events-none select-none z-10 overflow-hidden opacity-60">
                                  {/* Long sprocket negative ribbon */}
                                  <div className="absolute right-[10px] top-[40px] w-24 h-[420px] bg-neutral-950/85 border-l border-r border-dashed border-red-500/20 rotate-[12deg] flex flex-col justify-between p-1 z-0">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                      <div key={n} className="w-full h-11 border border-red-950/40 rounded bg-red-950/5 flex items-center justify-center overflow-hidden">
                                        <div className="w-4 h-4 rounded-full border border-red-500/20 animate-pulse" />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* BACKGROUND OVERLAPPING POLAROIDS (TUCKED BEHIND) */}
                                {/* Polaroid B (Top Area behind deck) */}
                                <motion.div 
                                  className="absolute cursor-pointer z-10"
                                  style={{ left: "505px", top: "375px" }}
                                  whileHover={{ scale: 1.05, rotate: 10, zIndex: 35 }}
                                  onClick={() => {
                                    playInterfaceSound("change-tab");
                                    setActiveBoardItem("timeline");
                                  }}
                                >
                                  <div className="relative p-2.5 bg-[#f5f4ed] border border-neutral-300 shadow-[2px_12px_22px_rgba(0,0,0,0.8)] rounded-sm rotate-[12deg] w-[135px]">
                                    {/* Silver metallic tack head */}
                                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-radial-[circle_at_30%_30%,#f5f5f5_0%,#a3a3a3_60%,#404040_100%] rounded-full shadow-[0_3px_5px_black] border border-neutral-400" />
                                    
                                    <div className="relative w-full h-[85px] bg-black overflow-hidden flex items-center justify-center rounded-sm border border-neutral-200/20">
                                      <img src="/previas/VT3.png" alt="Sinal de Mente" className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] saturate-[0.15] contrast-125" />
                                      <div className="absolute inset-0 bg-red-900/10 mix-blend-color" />
                                    </div>
                                    <div className="mt-2 text-center font-mono text-[7px] font-bold text-neutral-700 tracking-wider">
                                      COLETIVO_VT_07
                                    </div>
                                  </div>
                                </motion.div>

                                {/* Polaroid C (Top Right Corner area) */}
                                <motion.div 
                                  className="absolute cursor-pointer z-10"
                                  style={{ left: "765px", top: "30px" }}
                                  whileHover={{ scale: 1.05, rotate: -8, zIndex: 35 }}
                                  onClick={() => {
                                    playInterfaceSound("hover");
                                    setActiveBoardItem("map");
                                  }}
                                >
                                  <div className="relative p-2.5 bg-[#f2f1ea] border border-neutral-300 shadow-[2px_12px_22px_rgba(0,0,0,0.8)] rounded-sm -rotate-[8deg] w-[140px]">
                                    {/* Silver metallic tack head */}
                                    <div className="absolute top-1 left-1/3 w-3.5 h-3.5 bg-radial-[circle_at_30%_30%,#f5f5f5_0%,#a3a3a3_60%,#404040_100%] rounded-full shadow-[0_3px_5px_black] border border-neutral-400" />
                                    
                                    <div className="relative w-full h-[90px] bg-black overflow-hidden flex items-center justify-center rounded-sm border border-neutral-200/20">
                                      <img src="/previas/VT2.png" alt="Sinal de Rua" className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] saturate-[0.1] contrast-[1.4]" />
                                      <div className="absolute inset-0 bg-red-950/15 mix-blend-color" />
                                    </div>
                                    <div className="mt-2 text-center font-mono text-[7px] font-bold text-neutral-700 tracking-wider">
                                      ROTA_SINAL_SP_07
                                    </div>
                                  </div>
                                </motion.div>

                                {/* --- FOREGROUND POLAROID: MAIN INTERACTIVE PORTRAIT EXACTLY IN CENTER-RIGHT --- */}
                                <motion.div 
                                  className="absolute z-20 cursor-pointer"
                                  style={{ left: "755px", top: "185px" }}
                                  whileHover={{ scale: 1.07, rotate: 2, zIndex: 45 }}
                                  onClick={() => {
                                    playInterfaceSound("change-tab");
                                    setActiveBoardItem("report");
                                  }}
                                >
                                  {/* Polaroid Frame exactly matching reference */}
                                  <div className="relative p-4 pb-6 bg-[#fbfbfa] border border-neutral-200 shadow-[6px_18px_38px_rgba(0,0,0,0.95)] rounded-sm rotate-[3deg] w-[185px] hover:shadow-2xl hover:border-red-600/30 transition-all duration-300">
                                    {/* Silver metallic push-pin tack at the top of the photo */}
                                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-radial-[circle_at_30%_30%,#fdfdfd_0%,#9c9c9c_60%,#3d3d3d_100%] rounded-full shadow-[0_4px_8px_black] border border-neutral-400 flex items-center justify-center z-10">
                                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full opacity-60" />
                                    </div>

                                    {/* Real photo area with dual-tone black/red look */}
                                    <div className="relative w-full h-[155px] bg-black overflow-hidden rounded-sm border border-neutral-200/40">
                                      <img 
                                        src="/previas/VT1.png" 
                                        alt="Main portrait of Subject VT" 
                                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.4] saturate-[1.3] hue-rotate-[340deg]" 
                                      />
                                      {/* Radial vignette shader overlay */}
                                      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%] pointer-events-none" />
                                    </div>

                                    {/* Caption written in pencil/felt-marker styling */}
                                    <div className="mt-3.5 text-center font-mono text-[9px] font-black text-neutral-800 tracking-widest uppercase">
                                      VILLA, ARTUR "VT"
                                    </div>
                                    <div className="mt-1 text-center font-mono text-[6.5px] text-neutral-400 tracking-wide leading-none">
                                      SUBMETIDO À EXPOSIÇÃO SINAL // ATIVO
                                    </div>
                                  </div>
                                </motion.div>


                                {/* ----------------================ EVIDENCE DETAILS: ZIPLOCS, STAMPS, FILM STRIPS ================---------------- */}
                                {/* FILM STRIP NEGATIVE WITH "DISTORÇÃO" RED STAMP OVERLAY */}
                                <motion.div 
                                  className="absolute z-20 cursor-pointer"
                                  style={{ left: "500px", top: "275px" }}
                                  whileHover={{ scale: 1.05, rotate: -4, zIndex: 42 }}
                                  onClick={() => {
                                    playInterfaceSound("glitch");
                                    triggerScreenDistortion();
                                    setActiveBoardItem("rune");
                                  }}
                                >
                                  {/* Film Strip Negative with sprocket lines */}
                                  <div className="relative w-[150px] h-[55px] bg-neutral-950/90 border border-neutral-800/80 rounded shadow-[4px_8px_16px_rgba(0,0,0,0.75)] p-1.5 -rotate-[10deg] flex justify-between items-center overflow-hidden">
                                    <div className="absolute inset-x-0 top-0.5 flex justify-between px-1 text-[4px] text-neutral-600 tracking-[0.1em] font-sans">
                                      <span>▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪</span>
                                      <span>▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪</span>
                                    </div>

                                    <div className="w-full h-full relative bg-[#1c0808]/40 border border-red-950/50 rounded-sm flex items-center justify-center overflow-hidden">
                                      {/* Micro thumbnail */}
                                      <img src="/previas/VT4.png" alt="Film thumb" className="absolute inset-0 w-full h-full object-cover filter saturate-0 brightness-40 opacity-40 mix-blend-color-dodge" />
                                      {/* Glowing Distorção neon block sticker exactly matching image */}
                                      <div className="z-10 border border-red-600 bg-black/80 px-2 py-0.5 rounded shadow-[0_0_8px_rgba(220,38,38,0.7)] text-[8px] font-black tracking-widest text-red-500 uppercase animate-pulse">
                                        DISTORÇÃO
                                      </div>
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0.5 flex justify-between px-1 text-[4px] text-neutral-600 tracking-[0.1em] font-sans">
                                      <span>▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪</span>
                                      <span>▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪</span>
                                    </div>
                                  </div>
                                </motion.div>

                                {/* ZIPLOC BAG 1: Burned logo "VT" round seal inside bag (Top area) */}
                                <motion.div 
                                  className="absolute z-20 cursor-pointer"
                                  style={{ left: "515px", top: "70px" }}
                                  whileHover={{ scale: 1.08, rotate: 10, zIndex: 42 }}
                                  onClick={() => {
                                    playInterfaceSound("glitch");
                                    triggerScreenDistortion();
                                    setActiveBoardItem("rune");
                                  }}
                                >
                                  {/* Clear plastic bag container */}
                                  <div className="relative w-[95px] h-[105px] bg-white/5 border border-white/10 backdrop-blur-[0.5px] shadow-[4px_10px_20px_rgba(0,0,0,0.6)] rounded p-2 rotate-[6deg] flex flex-col justify-between overflow-hidden">
                                    {/* Red horizontal seal line of Ziploc strip */}
                                    <div className="absolute top-2.5 inset-x-0 h-[2px] bg-red-600/70" />
                                    <div className="absolute top-3.5 inset-x-0 h-[1px] bg-red-600/40" />

                                    <div className="w-full h-full flex items-center justify-center mt-3 relative z-10">
                                      {/* Scorched wax/paper logo seal with charcoal scorched borders */}
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1c1410] to-[#0d0908] border-2 border-neutral-900 shadow-md flex items-center justify-center relative overflow-hidden"
                                           style={{ boxShadow: "0 0 10px rgba(0,0,0,0.8), inset 0 0 8px #000" }}>
                                        {/* Burnt outer edges ring */}
                                        <div className="absolute inset-0.5 rounded-full border border-dashed border-[#a82c14]/30 animate-pulse [animation-duration:5s]" />
                                        <span className="text-[14px] text-[#ff3a1a] font-sans font-black tracking-wider leading-none drop-shadow-[0_0_4px_rgba(255,58,26,0.6)]">VT</span>
                                      </div>
                                    </div>

                                    <div className="text-center font-mono text-[5.5px] text-neutral-400 font-bold uppercase tracking-widest">
                                      OBJ_SEAL_E_09
                                    </div>

                                    {/* Thick Diagonal Gaffer/Electrical Tape pinning down the top corner */}
                                    <div className="absolute -top-1 -right-4 w-12 h-4.5 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-t border-neutral-800/30 shadow rotate-[35deg] opacity-90 z-20" />
                                  </div>
                                </motion.div>

                                {/* ZIPLOC BAG 2: Burned logo seal inside bag (Bottom area) */}
                                <motion.div 
                                  className="absolute z-20 cursor-pointer"
                                  style={{ left: "505px", top: "475px" }}
                                  whileHover={{ scale: 1.08, rotate: -5, zIndex: 42 }}
                                  onClick={() => {
                                    playInterfaceSound("glitch");
                                    triggerScreenDistortion();
                                    setActiveBoardItem("rune");
                                  }}
                                >
                                  {/* Clear plastic bag container */}
                                  <div className="relative w-[110px] h-[105px] bg-white/5 border border-white/10 backdrop-blur-[0.5px] shadow-[4px_10px_20px_rgba(0,0,0,0.6)] rounded p-2.5 -rotate-[8deg] flex flex-col justify-between overflow-hidden">
                                    {/* Red horizontal seal line of Ziploc strip */}
                                    <div className="absolute top-2.5 inset-x-0 h-[2px] bg-red-600/70" />
                                    <div className="absolute top-3.5 inset-x-0 h-[1px] bg-red-600/40" />

                                    <div className="w-full h-full flex items-center justify-center mt-3 relative z-10">
                                      {/* Scorched wax/paper logo seal */}
                                      <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#1c1410] to-[#0d0908] border-2 border-neutral-900 shadow-md flex items-center justify-center relative overflow-hidden"
                                           style={{ boxShadow: "0 0 10px rgba(0,0,0,0.8), inset 0 0 8px #000" }}>
                                        <div className="absolute inset-0.5 rounded-full border border-dashed border-[#a82c14]/30" />
                                        <span className="text-[15px] text-[#ff3a1a] font-sans font-black tracking-wider leading-none drop-shadow-[0_0_4px_rgba(255,58,26,0.6)]">VT</span>
                                      </div>
                                    </div>

                                    <div className="text-center font-mono text-[5.5px] text-neutral-400 font-bold uppercase tracking-widest">
                                      OBJ_SEAL_E_12
                                    </div>

                                    {/* Thick Diagonal Gaffer/Electrical Tape pinning down the top corner */}
                                    <div className="absolute -top-1.5 -left-5 w-14 h-4.5 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-t border-neutral-800/30 shadow -rotate-[35deg] opacity-90 z-20" />
                                  </div>
                                </motion.div>

                                {/* GREEN sticker/paper reading "VERIFICADO" exactly matching reference */}
                                <div className="absolute left-[620px] top-[490px] z-20 select-none">
                                  <div className="border-[1.5px] border-emerald-600 text-emerald-500 bg-emerald-950/20 px-2 py-0.5 rounded-sm font-black font-sans text-[8px] tracking-[0.25em] uppercase shadow-sm rotate-[4deg]">
                                    VERIFICADO
                                  </div>
                                </div>

                                {/* SLEEK BLACK DESIGNER SUNGLASSES lying at the bottom right exactly matching reference */}
                                <div className="absolute left-[800px] top-[480px] z-30 select-none pointer-events-none">
                                  <svg viewBox="0 0 160 60" className="w-[170px] h-[65px] drop-shadow-[2px_14px_12px_rgba(0,0,0,0.9)] opacity-[0.93]">
                                    {/* Left lens */}
                                    <path d="M 12 22 C 12 9, 47 9, 52 22 C 57 37, 17 42, 12 22 Z" fill="#08090b" stroke="#17191e" strokeWidth="1.5" />
                                    <path d="M 14 20 C 14 11, 45 11, 50 20" fill="none" stroke="white" strokeWidth="0.5" opacity="0.12" />
                                    {/* Glossy reflection on left lens */}
                                    <path d="M 16 16 Q 32 13, 40 19" fill="none" stroke="white" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" />
                                    
                                    {/* Right lens */}
                                    <path d="M 64 22 C 69 9, 104 9, 104 22 C 99 42, 59 37, 64 22 Z" fill="#08090b" stroke="#17191e" strokeWidth="1.5" />
                                    <path d="M 66 20 C 71 11, 102 11, 102 20" fill="none" stroke="white" strokeWidth="0.5" opacity="0.12" />
                                    {/* Glossy reflection on right lens */}
                                    <path d="M 68 16 Q 84 13, 92 19" fill="none" stroke="white" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" />
                                    
                                    {/* Bridge */}
                                    <path d="M 51 16 Q 58 12, 65 16" fill="none" stroke="#25272f" strokeWidth="1.5" />
                                    <path d="M 50 20 Q 58 17, 66 20" fill="none" stroke="#14151a" strokeWidth="1" />
                                    
                                    {/* Left temple arm */}
                                    <path d="M 12 18 Q -3 16, -8 32 Q -10 37, -13 32" fill="none" stroke="#14151a" strokeWidth="1.5" />
                                    {/* Right temple arm */}
                                    <path d="M 104 18 Q 119 16, 124 32 Q 126 37, 129 32" fill="none" stroke="#14151a" strokeWidth="1.5" />
                                  </svg>
                                </div>

                                {/* Coordinate stamp labels at bottom right */}
                                <div className="absolute right-8 bottom-3 font-mono text-[7px] text-neutral-500 select-none tracking-widest uppercase">
                                  V3.2.1 48°137'S 123°14' | DATA_LOG
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* LIGHTBOX POPUP PANELS FOR OTHER INVESTIGATION ARTIFACTS */}
                          <AnimatePresence>
                            {activeBoardItem && (
                              <motion.div
                                className="absolute inset-0 bg-neutral-950/96 z-50 flex items-center justify-center p-4 rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                {/* Heavy scanning visual noise */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 z-0" />
                                
                                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg max-w-lg w-full relative z-10 font-mono text-left select-none max-h-[90vh] overflow-y-auto">
                                  
                                  {/* Cross Close button with Red vertical line capsule */}
                                  <button
                                    onClick={() => {
                                      playInterfaceSound("change-tab");
                                      setActiveBoardItem(null);
                                    }}
                                    className="absolute top-4 right-4 flex items-center gap-2 group cursor-pointer"
                                  >
                                    <span className="w-[4px] h-6 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,1)] group-hover:h-8 transition-all duration-300" />
                                    <div className="text-neutral-500 group-hover:text-white p-1 group-hover:bg-neutral-800 rounded transition-all">
                                      <X size={18} />
                                    </div>
                                  </button>

                                  {/* MAP CASE DETAIL */}
                                  {activeBoardItem === "map" && (
                                    <div className="space-y-4">
                                      <div className="text-[9px] text-red-500 font-bold tracking-widest uppercase mb-1">ARQUIVO // COORDENADAS DO SURGIMENTO</div>
                                      <h3 className="text-2xl font-sans font-black text-white uppercase tracking-wider mb-2">PONTO ZERO (2007)</h3>
                                      
                                      <div className="w-full h-40 bg-black border border-neutral-800 rounded relative flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#a18a5e_15%,transparent_90%)] filter contrast-125 saturate-[0.1] opacity-40" />
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_50%,transparent_50%)] bg-[size:100%_2px]" />
                                        <div className="text-center font-mono space-y-1">
                                          <div className="text-red-600 font-bold text-xl tracking-[0.2em]">COORDENADAS DETECTADAS:</div>
                                          <div className="text-neutral-400 text-xs">-23.5505° S, -46.6333° W // CENTRO DE SÃO PAULO</div>
                                        </div>
                                      </div>

                                      <p className="text-xs text-neutral-400 leading-relaxed uppercase">
                                        As primeiras frequências moduladas de rádio pirata foram registradas em agosto de 2007, nas extremidades industriais abandonadas da Grande São Paulo. Sob o codinome "VT", a entidade começou a enviar fragmentos de loops instrumentais sob o ruído analógico clássico das transmissões de ondas curtas.
                                      </p>
                                      <p className="text-xs text-red-500/70 leading-relaxed uppercase">
                                        REGISTRO ADICIONAL: NENHUMA FONTE FÍSICA FOI LOCALIZADA. O SINAL EMITE DIRETAMENTE DE INSTALAÇÕES DE ENERGIA SUBTERRÂNEAS DESATIVADAS.
                                      </p>
                                    </div>
                                  )}

                                  {/* DIÁRIO MILITAR CASE DETAIL */}
                                  {activeBoardItem === "report" && (
                                    <div className="space-y-4">
                                      <div className="text-[9px] text-red-500 font-bold tracking-widest uppercase mb-1">REGISTRO // PERFIL PSICOLÓGICO</div>
                                      <h3 className="text-2xl font-sans font-black text-white uppercase tracking-wider mb-2">ARQUIVO_VT_PSYCH</h3>

                                      <p className="text-xs text-neutral-300 leading-relaxed uppercase">
                                        O indivíduo opera sob restrição de luz direta. Ele demonstra obsessão crônica com frequências extremamente baixas (faixa do subgrave, 20-40Hz). Recusa-se terminantemente a revelar traços de rosto completos.
                                      </p>
                                      
                                      <div className="pt-4 border-t border-neutral-800">
                                        <div className="text-[10px] text-neutral-500 tracking-[0.2em] uppercase mb-3">TRAÇOS DE INTERFERÊNCIA CONDUZIDA</div>
                                        <div className="flex flex-wrap gap-2.5">
                                          {["OBSESSIVO", "EXPERIMENTAL", "IMPREVISÍVEL", "CINEMATOGRÁFICO", "SEM LIMITES"].map((word) => (
                                            <span 
                                              key={word}
                                              onClick={() => {
                                                playInterfaceSound("glitch");
                                                triggerScreenDistortion();
                                              }}
                                              className="px-2 py-1 border border-neutral-800 hover:border-red-600 text-neutral-400 hover:text-white bg-neutral-950 transition-all text-[10px] uppercase font-bold cursor-pointer"
                                            >
                                              {word}
                                            </span>
                                          ))}
                                        </div>
                                      </div>

                                      <p className="text-[9px] text-neutral-500 leading-relaxed uppercase pt-4">
                                        NOTA DO INVESTIGADOR: QUALQUER TENTATIVA DE SINTONIZAR O REVELADOR DO ROSTO RESULTA EM GLITCH DE REDE. A VERDADEIRA IDENTIDADE PARECE TEMPORARIAMENTE ARQUIVADA.
                                      </p>
                                    </div>
                                  )}

                                  {/* CRONOLOGIA / TIMELINE CASE DETAIL */}
                                  {activeBoardItem === "timeline" && (
                                    <div className="space-y-4">
                                      <div className="text-[9px] text-red-500 font-bold tracking-widest uppercase mb-1">CRONOLOGIA // SINAIS DE HISTÓRIA</div>
                                      <h3 className="text-2xl font-sans font-black text-white uppercase tracking-wider mb-2">SINAIS TRANSMITIDOS</h3>

                                      <div className="space-y-3.5 pt-2 max-h-[50vh] overflow-y-auto">
                                        {[
                                          { year: "2024", name: "DINHEIRO", desc: "Primeira explosão do trap cinemático de VT. Sons arrastados de 808 colidindo com trilhas de terror analógico." },
                                          { year: "2024", name: "FUTURO", desc: "A distorção de identidade se estabelece. Um manifesto sobre solidão metropolitana e o avanço da névoa eletrônica." },
                                          { year: "2024", name: "LEAN NO COPO", desc: "Redução de batida. Perda total de percepção do tempo através de graves pesados de sintetizador." },
                                          { year: "2025", name: "SEM AMOR", desc: "A dor e o experimental se unem. Melodias melancólicas cortadas por distorção industrial severa." },
                                          { year: "2025 / 2026", name: "CAPÍTULO II", desc: "A mutação completa. Onde o sinal de rádio se rompe por completo e a transmissão de VT assume as frequências." }
                                        ].map((item, index) => (
                                          <div key={index} className="border-b border-neutral-800 pb-3 text-left">
                                            <div className="flex justify-between items-center mb-1">
                                              <span className="text-xs font-black text-red-500">{item.name}</span>
                                              <span className="text-[10px] text-neutral-500 font-bold">{item.year}</span>
                                            </div>
                                            <p className="text-[10px] text-neutral-400 uppercase leading-relaxed">{item.desc}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* RUNE CODE CORRUPTION CASE DETAIL */}
                                  {activeBoardItem === "rune" && (
                                    <div className="space-y-4">
                                      <div className="text-[9px] text-red-500 font-bold tracking-widest uppercase mb-1">SISTEMA // CÓDIGO DE CORRUPÇÃO DETECTADO</div>
                                      <h3 className="text-xl font-sans font-black text-red-600 uppercase tracking-wider mb-2">INFECÇÃO ANALÓGICA</h3>

                                      <div className="p-4 bg-red-950/20 border border-red-900/40 rounded flex flex-col items-center text-center">
                                        <span className="text-5xl text-red-500 animate-ping [animation-duration:3s] mb-3 leading-none">⎔</span>
                                        <span className="text-xs text-red-500 font-bold uppercase tracking-widest">SINAL INFECCIOSO ATIVO</span>
                                      </div>

                                      <p className="text-xs text-neutral-400 leading-relaxed uppercase">
                                        A runa ⎔ representa a frequência 80.8Hz que reverbera no núcleo de todos os Beats produzidos por VT. Ao tocar nessa frequência, o sistema entra em colapso intencional, permitindo a infiltração de sinais do Capítulo II.
                                      </p>

                                      <button
                                        onClick={() => {
                                          playInterfaceSound("glitch");
                                          triggerScreenDistortion();
                                        }}
                                        className="w-full py-2.5 border border-red-600 bg-red-950/20 hover:bg-red-950/40 text-red-500 font-bold text-xs uppercase tracking-widest rounded transition-all active:scale-95 cursor-pointer"
                                      >
                                        [ DISPARAR DISTORÇÃO DE FREQUÊNCIA ]
                                      </button>
                                    </div>
                                  )}

                                  <div className="pt-6 border-t border-neutral-800 text-center">
                                    <button
                                      onClick={() => {
                                        playInterfaceSound("change-tab");
                                        setActiveBoardItem(null);
                                      }}
                                      className="px-4 py-1.5 border border-neutral-800 hover:border-neutral-500 text-[10px] hover:text-white transition-all uppercase rounded text-neutral-500 cursor-pointer"
                                    >
                                      [ VOLTAR AO MURAL ]
                                    </button>
                                  </div>

                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Footer Action of the wall */}
                          <div className="w-full mt-12 pb-8 flex justify-center text-center font-mono">
                            <button
                              onClick={() => {
                                playInterfaceSound("change-tab");
                                setDossierIntroState("blackout");
                                setTimeout(() => {
                                  setActiveTab("01");
                                }, 800);
                              }}
                              className="mt-12 px-6 py-3 text-[10px] text-neutral-400 hover:text-white border border-neutral-800 hover:border-red-600 bg-transparent transition-all duration-300 rounded uppercase tracking-[0.3em] active:scale-95 cursor-pointer flex items-center gap-2 group"
                            >
                              <span className="w-2 h-2 rounded-full bg-red-600 group-hover:animate-ping" />
                              [ RETORNAR AO CANAL PRINCIPAL ]
                            </button>
                          </div>

                        </motion.div>
                      )}

                    </div>
                  ) : (
                    <nav className="flex flex-col space-y-6 sm:space-y-8 w-full max-w-md select-none text-left">
                      {chapters.map((ch) => {
                        const isChActive = activeTab === ch.number;
                        const isPrevias = ch.number === "04";
                        return (
                          <MenuChapterItem
                            key={ch.number}
                            number={ch.number}
                            label={ch.label}
                            isActive={isChActive}
                            coords={ch.coords}
                            onMouseEnter={() => {
                              if (isPrevias) {
                                // Simulate the corrupted track hover state
                                const corruptedTrack: Track = {
                                  id: "erro_corrompido",
                                  number: "XX",
                                  name: "SISTEMA CORROMPIDO",
                                  duration: "XX:XX",
                                  coverPath: "/previas/VT1.png",
                                  audioPath: "",
                                  artist: "DESCONHECIDO",
                                  trackType: "FALHA / TBA",
                                  release: "NÃO ENCONTRADO",
                                  year: "20XX",
                                  isCorrupted: true
                                };
                                setHoveredTrack(corruptedTrack);
                              }
                            }}
                            onMouseLeave={() => {
                              if (isPrevias) {
                                setHoveredTrack(null);
                              }
                            }}
                            onClick={() => {
                              if (ch.number === "01") {
                                setActiveTab("01");
                                handleMusicClick();
                              } else if (ch.number === "02") {
                                startDossierLoadingSequence();
                              } else if (isPrevias) {
                                // Close Menu & trigger the corrupted track action to unlock and scroll to Chapter II
                                onClose();
                                onTrackSelect({
                                  id: "erro_corrompido",
                                  number: "XX",
                                  name: "SISTEMA CORROMPIDO",
                                  duration: "XX:XX",
                                  coverPath: "/previas/VT1.png",
                                  audioPath: "",
                                  artist: "DESCONHECIDO",
                                  trackType: "FALHA / TBA",
                                  release: "NÃO ENCONTRADO",
                                  year: "20XX",
                                  isCorrupted: true
                                });
                              } else {
                                handlePlaceholderClick(ch.number);
                              }
                            }}
                          />
                        );
                      })}
                    </nav>
                  )}
                </div>

              </div>
              </div>
            </motion.div>
          )}

          {/* PAGE LOAD PROGRESS / ATMOSPHERIC CINEMATIC TRANSITION */}
          <AnimatePresence>
            {loadingState === "loading" && (
              <motion.div
                className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Background ambient deep red glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,0,0,0.14)_0%,transparent_70%)] pointer-events-none" />

                <div className="flex flex-col items-center space-y-6 text-center">
                  {/* Fine spinning loader ring */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <span className="absolute inset-0 border border-white/5 rounded-full" />
                    <motion.span 
                      className="absolute inset-0 border-t-2 border-red-600 rounded-full" 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
                    />
                    <span className="font-mono text-[10px] text-neutral-400 font-bold">
                      {Math.min(100, Math.round((terminalLogs.length / 4) * 100))}%
                    </span>
                  </div>

                  {/* Wide-spaced elegant typography title */}
                  <div className="space-y-2">
                    <motion.h3 
                      className="font-sans text-xs sm:text-sm font-semibold tracking-[0.4em] text-white/95 uppercase filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Sincronizando Áudio
                    </motion.h3>
                    
                    <p className="font-mono text-[9px] text-neutral-500 tracking-[0.25em] uppercase">
                      Universo Villafan &middot; Canal Privado
                    </p>
                  </div>
                </div>

                {/* Bottom fine cinematic reference details */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[8px] text-neutral-600 tracking-[0.2em] uppercase">
                  <span>Sinal Estável</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span>Cod: VT-FLUXO</span>
                </div>
              </motion.div>
            )}

            {dossierLoading && (
              <motion.div
                className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Horizontal CRT Scanline grid */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10 opacity-30"
                  style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.5))",
                    backgroundSize: "100% 4px"
                  }}
                />
                
                {/* Glowing subtle red vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,0,0,0.2)_0%,transparent_75%)] pointer-events-none" />

                <div className="flex flex-col items-start w-full max-w-sm px-6 font-mono text-xs text-neutral-400 space-y-8 tracking-wider">
                  <div className="flex items-center gap-2 text-red-500 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em]">CONEXÃO CRÍPTICA ESTABELECIDA</span>
                  </div>

                  <div className="space-y-4 w-full">
                    {dossierLoadingStep === "accessing" && (
                      <div className="space-y-2">
                        <div className="text-white text-xs tracking-widest font-bold">ACESSANDO ARQUIVOS...</div>
                        <div className="text-red-500 font-mono text-sm leading-none select-none">
                          ■■■■□□□□□□□□ <span className="text-neutral-300">32%</span>
                        </div>
                      </div>
                    )}

                    {dossierLoadingStep === "decrypting" && (
                      <div className="space-y-2">
                        <div className="text-neutral-500 text-xs tracking-widest">ACESSANDO ARQUIVOS... OK</div>
                        <div className="text-white text-xs tracking-widest font-bold">DESCRIPTOGRAFANDO...</div>
                        <div className="text-red-500 font-mono text-sm leading-none select-none">
                          ■■■■■■■■■■□□ <span className="text-neutral-300">84%</span>
                        </div>
                      </div>
                    )}

                    {dossierLoadingStep === "unlocked" && (
                      <div className="space-y-2">
                        <div className="text-neutral-500 text-xs tracking-widest">ACESSANDO ARQUIVOS... OK</div>
                        <div className="text-neutral-500 text-xs tracking-widest">DESCRIPTOGRAFANDO... OK</div>
                        <motion.div 
                          className="text-red-500 text-sm font-bold tracking-[0.3em] uppercase animate-pulse mt-2"
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                        >
                          ARQUIVO LIBERADO
                        </motion.div>
                        <div className="text-red-600 font-mono text-sm leading-none select-none">
                          ■■■■■■■■■■■■ <span className="text-neutral-100">100%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-8 text-[8px] font-mono text-neutral-600 tracking-[0.3em] uppercase">
                  VILLAFAN INTELLIGENCE CORE
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Sub-Component: MenuChapterItem with 300ms hover scramble transform
interface MenuChapterItemProps {
  number: string;
  label: string;
  isActive: boolean;
  coords: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  key?: string;
}

function MenuChapterItem({ number, label, isActive, coords, onClick, onMouseEnter, onMouseLeave }: MenuChapterItemProps) {
  const [displayText, setDisplayText] = useState(label);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Scramble sequence (under 300ms) on hover/touch
  const handleMouseEnter = () => {
    setIsHovered(true);
    playInterfaceSound("hover");
    if (onMouseEnter) onMouseEnter();

    // Total Duration: 240ms, update characters quickly
    const scrambleChars = "A15FVTØ█082█MØS1C4S";
    const startTime = Date.now();
    const duration = 240;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(label);
      } else {
        const scrambled = label
          .split("")
          .map((char) => {
            if (Math.random() < 0.45) {
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
            return char;
          })
          .join("");
        setDisplayText(scrambled);
      }
    }, 40);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(label);
    if (onMouseLeave) onMouseLeave();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative flex items-center pl-10 py-2 cursor-pointer transition-all duration-300 ${
        isHovered ? "translate-x-1" : ""
      }`}
    >
      
      {/* Glow highlight background behind the hovered/active element */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div 
            className="absolute left-6 right-0 top-0 bottom-0 bg-red-950/10 rounded-md filter blur-md -z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Red vertical side line capsule exactly like the uploaded reference image */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-9 bg-red-600 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(239,68,68,1)] ${
          isHovered || isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
        }`} 
      />

      {/* Chapter Number */}
      <span 
        className={`font-mono text-xl sm:text-2xl tracking-tight transition-colors duration-300 w-12 select-none ${
          isActive 
            ? "text-neutral-200 font-bold" 
            : isHovered 
              ? "text-neutral-300" 
              : "text-neutral-500"
        }`}
      >
        {number}
      </span>

      {/* Chapter Title and coordinate metadata block */}
      <div className="flex flex-col select-none">
        
        {/* Large chapter name text */}
        <span
          className={`font-sans text-2xl sm:text-3xl font-bold tracking-widest transition-all duration-300 uppercase ${
            isActive 
              ? "text-white filter drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]" 
              : isHovered 
                ? "text-red-500 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]" 
                : "text-neutral-200"
          }`}
        >
          {displayText}
        </span>

        {/* Coords & Online status directly underneath like the reference image */}
        <div className={`flex items-center gap-1.5 font-mono text-[8px] tracking-widest mt-1 transition-colors duration-300 ${
          isActive 
            ? "text-neutral-300" 
            : isHovered 
              ? "text-neutral-400" 
              : "text-neutral-600"
        }`}>
          <span>COORDS: {coords}</span>
          <span>|</span>
          <span className={isActive ? "text-red-500 font-bold" : isHovered ? "text-red-400" : ""}>
            STATUS_ONLINE
          </span>
        </div>

      </div>

    </div>
  );
}

// Sub-Component: MobileCentralDeck for step-by-step investigation of VT evidence
interface MobileCentralDeckProps {
  step: number;
  setStep: (step: number | ((prev: number) => number)) => void;
  isPlayingTape: boolean;
  setIsPlayingTape: (is: boolean) => void;
  isPlayingDecodedBeat: boolean;
  setIsPlayingDecodedBeat: (is: boolean) => void;
  playCassetteSqueal: (isPlay: boolean) => void;
  playDecodedIndustrialBeat: (isPlay: boolean) => void;
}

function MobileCentralDeck({
  step,
  setStep,
  isPlayingTape,
  setIsPlayingTape,
  isPlayingDecodedBeat,
  setIsPlayingDecodedBeat,
  playCassetteSqueal,
  playDecodedIndustrialBeat
}: MobileCentralDeckProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {step === 0 && (
        <div className="flex flex-col items-center p-2 text-center">
          <div className="w-24 h-32 bg-amber-950/20 border-2 border-dashed border-amber-900/40 rounded flex flex-col items-center justify-center relative shadow-inner">
            <span className="text-4xl text-amber-700/80 font-bold font-mono">✉</span>
            <div className="absolute bottom-2 font-mono text-[8px] text-amber-800/60 font-bold uppercase tracking-widest">SEGREDO</div>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mt-4">
            [ ENVELOPE LACRADO ]
          </div>
          <p className="text-[9px] text-neutral-500 font-mono uppercase mt-1 leading-normal max-w-xs">
            CONTEÚDO SECRETO DE INTERFERÊNCIA ANALÓGICA DE VT.
          </p>
          <button
            onClick={() => {
              playInterfaceSound("open");
              setStep(1);
            }}
            className="mt-4 px-4 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-600 rounded text-red-500 hover:text-white font-mono text-[10px] uppercase font-bold cursor-pointer active:scale-95 transition-all"
          >
            ABRIR ENVELOPE SECRETO
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center p-2 text-center w-full">
          <div className="p-3 bg-white border border-neutral-300 shadow-xl rounded-sm rotate-2 w-48 text-center select-none">
            <div className="relative w-full h-36 bg-black overflow-hidden flex items-center justify-center">
              <img 
                src="/imagens-inicio/VT-MAL.png" 
                alt="VT Polaroid" 
                className="absolute inset-0 w-full h-full object-cover filter saturate-[0.1] contrast-[1.8] brightness-[0.55]" 
                style={{ objectPosition: "58% 28%" }}
              />
              <div className="absolute inset-0 bg-radial-[circle_at_60%_30%,transparent_35%,#000_100%] opacity-80" />
            </div>
            <div className="mt-3 font-mono text-[9px] text-neutral-800 font-bold tracking-widest leading-none">
              VT // 2026_PORTRAIT
            </div>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mt-4">
            [ FOTO REVELADA ]
          </div>
          <p className="text-[9px] text-neutral-500 font-mono uppercase mt-1 leading-normal max-w-xs">
            CAPTURA DE LENTE RETRO: FACE DETECTADA PARCIALMENTE NA SOMBRA.
          </p>
          <button
            onClick={() => {
              playInterfaceSound("hover");
              setStep(2);
            }}
            className="mt-4 px-4 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-500 rounded text-neutral-400 hover:text-white font-mono text-[10px] uppercase font-bold cursor-pointer active:scale-95 transition-all"
          >
            REVELAR VERSO (BILHETE)
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center p-2 text-center">
          <div className="p-4 bg-yellow-50 border border-yellow-200 shadow-lg rounded max-w-xs -rotate-2 select-none">
            <p className="font-mono text-xs text-neutral-700 uppercase leading-relaxed font-bold">
              "O som de 'FUTURO' não foi criado em 2024. O sinal existe desde 2007. Ele está preso na fita cassete. Sintonize a frequência 80.8Hz para ouvir."
            </p>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mt-5">
            [ MENSAGEM OCULTA NO VERSO ]
          </div>
          <p className="text-[9px] text-neutral-500 font-mono uppercase mt-1 leading-normal max-w-xs">
            NOTA ESCRITA À MÃO ATRÁS DO RETRATO DE VT.
          </p>
          <button
            onClick={() => {
              playInterfaceSound("change-tab");
              setStep(3);
            }}
            className="mt-4 px-4 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-600 rounded text-red-500 hover:text-white font-mono text-[10px] uppercase font-bold cursor-pointer active:scale-95 transition-all"
          >
            SINTONIZAR FITA CASSETE
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center p-2 text-center w-full">
          {/* Cassette Graphic */}
          <div className="w-56 h-32 bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 relative shadow-lg flex flex-col justify-between">
            <div className="h-4 border-b border-neutral-850 flex justify-between items-center px-1">
              <span className="font-mono text-[7px] text-neutral-500 uppercase">SIDE A</span>
              <span className="font-mono text-[7px] text-red-600 font-bold">MENSAGEM_REVERSA</span>
            </div>
            
            {/* Reel gears rotating when playing */}
            <div className="flex justify-around items-center h-14">
              <div className="w-9 h-9 rounded-full border-2 border-dashed border-neutral-850 flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border border-neutral-700 flex items-center justify-center ${isPlayingTape ? "animate-spin [animation-duration:4s]" : ""}`}>
                  <span className="text-neutral-500 font-mono text-[6px] font-bold">✴</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-dashed border-neutral-850 flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border border-neutral-700 flex items-center justify-center ${isPlayingTape ? "animate-spin [animation-duration:4s]" : ""}`}>
                  <span className="text-neutral-500 font-mono text-[6px] font-bold">✴</span>
                </div>
              </div>
            </div>

            <div className="h-4 bg-red-950/20 border border-red-900/30 rounded flex items-center justify-center">
              <span className="font-mono text-[7px] text-red-500 font-bold">VT_SYS_80.8HZ</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => {
                playInterfaceSound("click");
                setIsPlayingTape(!isPlayingTape);
                playCassetteSqueal(!isPlayingTape);
              }}
              className={`px-4 py-1.5 border rounded font-mono text-[10px] font-bold uppercase cursor-pointer active:scale-95 transition-all ${
                isPlayingTape 
                  ? "border-amber-600 bg-amber-950/20 text-amber-500" 
                  : "border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white"
              }`}
            >
              {isPlayingTape ? "[ DESLIGAR ]" : "[ TOCAR TRANSMISSÃO ]"}
            </button>
          </div>

          <div className="h-8 mt-3 flex items-center justify-center">
            {isPlayingTape ? (
              <span className="font-mono text-[9px] text-amber-500 uppercase tracking-wider animate-pulse text-center leading-normal">
                "NENHUM DE NÓS É REAL... O SILÊNCIO GRITA NO SUBGRAVE..."
              </span>
            ) : (
              <span className="font-mono text-[7px] text-neutral-600 uppercase tracking-widest text-center">
                [ TOQUE PARA ESCUTAR O REVERSO DA SINTONIA ]
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setIsPlayingTape(false);
              playCassetteSqueal(false);
              playInterfaceSound("change-tab");
              setStep(4);
            }}
            className="mt-4 px-4 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-500 rounded text-neutral-400 hover:text-white font-mono text-[10px] uppercase font-bold cursor-pointer active:scale-95 transition-all"
          >
            SINAL DE VÍDEO VHS
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center p-2 text-center w-full">
          <div className="w-56 h-32 bg-black border border-neutral-800 rounded relative flex items-center justify-center overflow-hidden">
            {/* Animated VHS scanning glitch lines */}
            <div className="absolute inset-0 bg-green-950/10 pointer-events-none z-10" />
            <div className="absolute left-0 right-0 h-[1px] bg-red-600/30 shadow-[0_0_8px_red] z-20 animate-bounce" />
            
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#000_100%] opacity-85 z-10 pointer-events-none" />
              <div className="text-center space-y-1 z-0 animate-pulse">
                <span className="text-3xl text-red-600 opacity-60">👤</span>
                <p className="font-mono text-[7px] text-red-500/70 tracking-widest uppercase">CAPTURA_SINAL_RUA_SP_2026</p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mt-4">
            [ RETRO MONITOR RETIDO ]
          </div>
          <p className="text-[9px] text-neutral-500 font-mono uppercase mt-1 leading-normal max-w-xs">
            ALVO DETECTADO MOVENDO-SE NAS SOMBRAS DA CIDADE.
          </p>
          <button
            onClick={() => {
              playInterfaceSound("glitch");
              setStep(5);
            }}
            className="mt-4 px-4 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-600 rounded text-red-500 hover:text-white font-mono text-[10px] uppercase font-bold cursor-pointer active:scale-95 transition-all"
          >
            DESCRIPTOGRAFAR MÚSICA SECRETA
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-col items-center p-2 text-center w-full">
          <div className="bg-neutral-950 border border-neutral-900 p-4 rounded w-full flex flex-col items-center">
            {/* Waveform bars simulation */}
            <div className="flex items-end gap-1 h-12 justify-center w-full max-w-xs select-none">
              {[8, 18, 35, 10, 48, 26, 14, 40, 11, 30, 18, 48, 8, 38, 11, 24, 10, 40, 14, 5].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-1 bg-red-600 rounded-full transition-all duration-300 ${isPlayingDecodedBeat ? "animate-pulse" : "opacity-40"}`}
                  style={{ 
                    height: isPlayingDecodedBeat ? `${Math.floor(Math.random() * (42 - 4) + 4)}px` : `${h}px`,
                    animationDelay: `${i * 0.05}s`
                  }} 
                />
              ))}
            </div>
            
            <p className="font-mono text-[9px] text-neutral-400 mt-3 uppercase tracking-widest leading-none">
              CAPÍTULO II // FUSÃO_PREVIEW
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => {
                playInterfaceSound("click");
                setIsPlayingDecodedBeat(!isPlayingDecodedBeat);
                playDecodedIndustrialBeat(!isPlayingDecodedBeat);
              }}
              className={`px-4 py-1.5 border rounded font-mono text-[10px] font-bold uppercase cursor-pointer active:scale-95 transition-all ${
                isPlayingDecodedBeat 
                  ? "border-red-600 bg-red-950/20 text-red-500" 
                  : "border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white"
              }`}
            >
              {isPlayingDecodedBeat ? "[ PARAR ÁUDIO ]" : "[ TOCAR BEAT ]"}
            </button>
          </div>

          <p className="text-[8px] text-neutral-600 font-mono uppercase mt-4 max-w-xs leading-normal">
            BATERIA ELETRÔNICA REVELADA: SUBGRAVES SINTETIZADOS DO CAPÍTULO II.
          </p>

          <button
            onClick={() => {
              setIsPlayingDecodedBeat(false);
              playDecodedIndustrialBeat(false);
              playInterfaceSound("open");
              setStep(0);
            }}
            className="mt-6 px-4 py-1 border border-neutral-800 hover:border-neutral-500 rounded text-neutral-500 hover:text-neutral-300 font-mono text-[9px] uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
          >
            [ REINICIAR ARQUIVOS ]
          </button>
        </div>
      )}
    </div>
  );
}

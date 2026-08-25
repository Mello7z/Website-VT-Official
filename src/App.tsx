import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Track } from "./types";
import WebGLFlashlight from "./components/WebGLFlashlight";
import FloatingMusicBar from "./components/FloatingMusicBar";
import Footer from "./components/Footer";
import ScrambleText from "./components/ScrambleText";
import CorruptedCoverImage from "./components/CorruptedCoverImage";
import CustomCursor from "./components/CustomCursor";
import RadioStaticNoise from "./components/RadioStaticNoise";
import GlitchDustCanvas from "./components/GlitchDustCanvas";
import TopNav from "./components/TopNav";
import CinematicMenu from "./components/CinematicMenu";
import GlitchShareButton from "./components/GlitchShareButton";
import BackToTopButton from "./components/BackToTopButton";
import BackToTopButton from "./components/BackToTopButton";
import { VolumeX, Eye, HelpCircle, Youtube, Share2, Check, Search, X, ArrowUp, ArrowDown, ArrowUpDown, Shuffle, Disc } from "lucide-react";

const TRACKS_DATA: Track[] = [
  {
    id: "dinheiro",
    number: "01",
    name: "DINHEIRO",
    duration: "02:12",
    coverPath: "/capas/DINHEIRO.png",
    audioPath: "/Musicas/DINHEIRO.mp3",
    artist: "VT & V.NA",
    trackType: "FEAT",
    release: "SELF RELEASED",
    year: "2024",
    youtubeUrl: "https://www.youtube.com/watch?v=N-cl1rcye1k"
  },
  {
    id: "futuro",
    number: "02",
    name: "FUTURO",
    duration: "02:38",
    coverPath: "/capas/FUTURO.png",
    audioPath: "/imagens-inicio/Imagens-Musicas/FUTURO/FUTURO-Part1.mp3",
    artist: "VT",
    trackType: "SINGLE",
    release: "FEAT",
    year: "2024",
    youtubeUrl: "https://www.youtube.com/watch?v=AMyy1nZ-LD4"
  },
  {
    id: "lean_no_copo",
    number: "03",
    name: "LEAN NO COPO",
    duration: "02:35",
    coverPath: "/capas/LEAN NO COPO.png",
    audioPath: "/Musicas/LEAN NO COPO.mp3",
    artist: "VT",
    trackType: "SINGLE",
    release: "SELF RELEASED",
    year: "2024",
    youtubeUrl: "https://www.youtube.com/watch?v=Ll1QZ2f_jKk"
  },
  {
    id: "sem_amor",
    number: "04",
    name: "SEM AMOR",
    duration: "02:53",
    coverPath: "/capas/SEM AMOR.png",
    audioPath: "/Musicas/SEM AMOR.mp3",
    artist: "VT & Santthekid",
    trackType: "FEAT",
    release: "SELF RELEASED",
    year: "2025",
    youtubeUrl: "https://www.youtube.com/watch?v=SUFAN2uq9Gk"
  },
  {
    id: "wave",
    number: "05",
    name: "WAVE",
    duration: "02:26",
    coverPath: "/capas/WAVE.png",
    audioPath: "/Musicas/WAVE.mp3",
    artist: "VT",
    trackType: "SINGLE",
    release: "SELF RELEASED",
    year: "2024",
    youtubeUrl: "https://www.youtube.com/watch?v=Q6lYQuXc41M"
  },
  {
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
  }
];

const UNRELEASED_TRACKS_DATA: Track[] = [
  {
    id: "respxxx",
    number: "06",
    name: "RESPXXX",
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
    id: "amanhxxxx",
    number: "07",
    name: "AMANHXXXX",
    duration: "TBA",
    coverPath: "/previas/amanhecer.jpg",
    audioPath: "/previas/amanhecer.mp3",
    artist: "VT",
    trackType: "XXXX",
    release: "EM BREVE",
    year: "2026",
    isUnreleased: true,
    statusLabel: "EM BREVE",
  },
  {
    id: "mirxxxx",
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

const SecretTransmissionTooltip: React.FC<{ track: Track }> = ({ track }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 18, mins: 42, secs: 19 });

  useEffect(() => {
    let initialSecs = 19;
    let initialMins = 42;
    let initialHours = 18;
    let initialDays = 4;

    if (track.id === "mirxxxx") {
      initialDays = 28;
      initialHours = 2;
      initialMins = 15;
      initialSecs = 40;
    } else if (track.id === "respxxx") {
      initialDays = 5;
      initialHours = 11;
      initialMins = 20;
      initialSecs = 55;
    } else if (track.id === "amanhxxxx") {
      initialDays = 14;
      initialHours = 6;
      initialMins = 0;
      initialSecs = 12;
    } else if (track.id === "erro_corrompido") {
      initialDays = 0;
      initialHours = 0;
      initialMins = 0;
      initialSecs = 0;
    }

    setTimeLeft({ days: initialDays, hours: initialHours, mins: initialMins, secs: initialSecs });

    if (track.id === "erro_corrompido") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return { days: 0, hours: 0, mins: 0, secs: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [track.id]);

  const getSecretHint = () => {
    if (track.isLocked) {
      return "SINAL CRÍPTICO // TRANSMISSÃO PROTEGIDA";
    }
    if (track.isCorrupted) {
      return "MEMÓRIA CORROMPIDA // RECONSTRUINDO DADOS";
    }
    return "TRANSMISSÃO SECRETA // MASTER EM PROCESSAMENTO";
  };

  const isCorruptedOrLocked = track.isCorrupted || track.isLocked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`absolute right-2 sm:right-6 -top-14 sm:-top-16 z-50 pointer-events-none flex flex-col p-2 sm:p-2.5 rounded-lg border backdrop-blur-xl shadow-2xl ${
        isCorruptedOrLocked
          ? "bg-[#120206]/95 border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.35)]"
          : "bg-[#0A0512]/95 border-[#D0B2FF]/60 shadow-[0_0_25px_rgba(208,178,255,0.3)]"
      }`}
    >
      {/* Corner cyber ticks */}
      <div className={`absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 ${isCorruptedOrLocked ? "border-red-500" : "border-[#D0B2FF]"}`} />
      <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 ${isCorruptedOrLocked ? "border-red-500" : "border-[#D0B2FF]"}`} />
      <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 ${isCorruptedOrLocked ? "border-red-500" : "border-[#D0B2FF]"}`} />
      <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 ${isCorruptedOrLocked ? "border-red-500" : "border-[#D0B2FF]"}`} />

      {/* Header with signal beacon */}
      <div className="flex items-center justify-between gap-3 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-white">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full animate-ping ${isCorruptedOrLocked ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-[#D0B2FF] shadow-[0_0_8px_#D0B2FF]"}`} />
          <span className={isCorruptedOrLocked ? "text-red-400" : "text-[#D0B2FF]"}>
            {getSecretHint()}
          </span>
        </div>
        <span className="text-[8px] font-mono text-neutral-400 tracking-wider">CH-02</span>
      </div>

      {/* Countdown Timer or Error State */}
      <div className="mt-1 flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest">
        {track.isCorrupted ? (
          <span className="text-red-400 text-[9px] uppercase tracking-wider font-mono flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-red-500 animate-pulse" />
            [ FALHA CRÍTICA: DADOS NATIVOS CORROMPIDOS ]
          </span>
        ) : (
          <>
            <span className="text-neutral-400 text-[8px] uppercase tracking-wider">LIBERAÇÃO EM:</span>
            <span className={`px-1.5 py-0.5 rounded border font-mono tracking-widest ${
              isCorruptedOrLocked 
                ? "bg-red-950/60 border-red-500/40 text-red-200" 
                : "bg-purple-950/60 border-[#D0B2FF]/40 text-[#EAD8FF]"
            }`}>
              {String(timeLeft.days).padStart(2, "0")}D : {String(timeLeft.hours).padStart(2, "0")}H : {String(timeLeft.mins).padStart(2, "0")}M : {String(timeLeft.secs).padStart(2, "0")}S
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [footerProgress, setFooterProgress] = useState(0);
  const [isAbsoluteEnd, setIsAbsoluteEnd] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);
  const [activeTrack, setActiveTrack] = useState<Track>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const trackId = params.get("track");
      if (trackId) {
        const found = TRACKS_DATA.find((t) => t.id === trackId) || UNRELEASED_TRACKS_DATA.find((t) => t.id === trackId);
        if (found) return found;
      }
    }
    return TRACKS_DATA[1]; // Default to "FUTURO"
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlayingToast, setNowPlayingToast] = useState<{ track: Track; id: number } | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerNowPlayingToast = (track: Track) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setNowPlayingToast({ track, id: Date.now() });
    toastTimerRef.current = setTimeout(() => {
      setNowPlayingToast(null);
    }, 4500);
  };
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);
  const [shareNotification, setShareNotification] = useState<string | null>(null);

  // Persistent preferred volume level (0.0 to 1.0)
  const [volumeLevel, setVolumeLevel] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("villafan_volume_level");
        if (saved !== null) {
          const parsed = parseFloat(saved);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn("Could not read volume from localStorage:", e);
      }
    }
    return 1.0;
  });

  // Persistent muted state
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("villafan_is_muted");
        if (saved !== null) {
          return saved === "true";
        }
      } catch (e) {
        console.warn("Could not read muted state from localStorage:", e);
      }
    }
    return false;
  });

  // Persist volumeLevel changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("villafan_volume_level", String(volumeLevel));
    } catch (e) {
      console.warn("Could not write volume to localStorage:", e);
    }
  }, [volumeLevel]);

  // Persist isMuted changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("villafan_is_muted", String(isMuted));
    } catch (e) {
      console.warn("Could not write muted state to localStorage:", e);
    }
  }, [isMuted]);

  // Handler to adjust volume and un-mute automatically when sliding up volume
  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeLevel(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    } else if (clamped === 0 && !isMuted) {
      setIsMuted(true);
    }
  };
  const [activeSection, setActiveSection] = useState("hero");
  const [deniedAlert, setDeniedAlert] = useState<string | null>(null);
  const [isChapterTwoVisible, setIsChapterTwoVisible] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [isScreenDistorted, setIsScreenDistorted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const scanTimeoutRef = useRef<any>(null);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setIsScanning(true);
    
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
    
    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  // Cleanup scan timeout on unmount
  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, []);

  // Track sorting state: Alphabetical, Year, Duration
  type SortField = "default" | "name" | "artist" | "year" | "duration";
  type SortDirection = "asc" | "desc";

  const [sortField, setSortField] = useState<SortField>("default");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortField("default");
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const parseDurationInSeconds = (durStr: string): number => {
    if (!durStr || durStr.includes("X") || durStr.includes("?")) return 99999;
    const parts = durStr.split(":");
    if (parts.length === 2) {
      const mins = parseInt(parts[0], 10) || 0;
      const secs = parseInt(parts[1], 10) || 0;
      return mins * 60 + secs;
    }
    return 0;
  };

  const filteredTracks = TRACKS_DATA.filter((track) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      track.name.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query)
    );
  });

  const sortedFilteredTracks = React.useMemo(() => {
    if (sortField === "default") return filteredTracks;

    return [...filteredTracks].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") {
        cmp = a.name.localeCompare(b.name, "pt", { sensitivity: "base" });
      } else if (sortField === "artist") {
        cmp = a.artist.localeCompare(b.artist, "pt", { sensitivity: "base" });
      } else if (sortField === "year") {
        const yearA = parseInt(a.year, 10) || 0;
        const yearB = parseInt(b.year, 10) || 0;
        cmp = yearA - yearB;
      } else if (sortField === "duration") {
        const durA = parseDurationInSeconds(a.duration);
        const durB = parseDurationInSeconds(b.duration);
        cmp = durA - durB;
      }

      if (cmp === 0) {
        cmp = a.name.localeCompare(b.name, "pt");
      }

      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [filteredTracks, sortField, sortDirection]);

  const sortedUnreleasedTracks = React.useMemo(() => {
    if (sortField === "default") return UNRELEASED_TRACKS_DATA;

    return [...UNRELEASED_TRACKS_DATA].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") {
        cmp = a.name.localeCompare(b.name, "pt", { sensitivity: "base" });
      } else if (sortField === "artist") {
        cmp = a.artist.localeCompare(b.artist, "pt", { sensitivity: "base" });
      } else if (sortField === "year") {
        const yearA = parseInt(a.year, 10) || 0;
        const yearB = parseInt(b.year, 10) || 0;
        cmp = yearA - yearB;
      } else if (sortField === "duration") {
        const durA = parseDurationInSeconds(a.duration);
        const durB = parseDurationInSeconds(b.duration);
        cmp = durA - durB;
      }

      if (cmp === 0) {
        cmp = a.name.localeCompare(b.name, "pt");
      }

      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [sortField, sortDirection]);

  const renderSortHeader = (label: string, field: SortField, className = "") => {
    const isActive = sortField === field;
    return (
      <button
        type="button"
        onClick={() => handleSort(field)}
        className={`group inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.3em] transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D0B2FF] focus-visible:ring-offset-1 focus-visible:ring-offset-black rounded px-1 -mx-1 ${
          isActive 
            ? "text-[#D0B2FF] font-bold" 
            : "text-neutral-500 hover:text-white"
        } ${className}`}
        aria-label={`Ordenar por ${label} (${isActive ? (sortDirection === 'asc' ? 'Ordem crescente' : 'Ordem decrescente') : 'clique para ordenar'})`}
        title={`Ordenar por ${label}`}
      >
        <span>{label}</span>
        {isActive ? (
          sortDirection === "asc" ? (
            <ArrowUp className="w-3 h-3 text-[#D0B2FF] shrink-0" />
          ) : (
            <ArrowDown className="w-3 h-3 text-[#D0B2FF] shrink-0" />
          )
        ) : (
          <ArrowUpDown className="w-2.5 h-2.5 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        )}
      </button>
    );
  };
  
  // Hide navigation at the initial entry of the site, revealing on scroll or after 5 seconds
  const [isNavInitiallyHidden, setIsNavInitiallyHidden] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY <= 100;
    }
    return true;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavInitiallyHidden(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Hero Section Identity Glitch states
  const [heroTitle, setHeroTitle] = useState("VILLAFAN");
  const [heroGlitchActive, setHeroGlitchActive] = useState(false);
  const [heroGlitchColor, setHeroGlitchColor] = useState<"blood-red" | "deep-purple" | "cold-gray" | "ice-white" | "none">("none");
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });

  // WebGL image textures fallbacks lists to ensure gorgeous visual stability
  const shaderImages = {
    normal: "/imagens-inicio/VT-NORMAL.png",
    transforming: "/imagens-inicio/VT-TRANSFORMANDO.png",
    evil: "/imagens-inicio/VT-MAL.png"
  };

  // Audio References
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioCtxRef = useRef<AudioContext | null>(null);
  const wasPlayingBeforePreview = useRef(false);
  const chapterTwoRef = useRef<HTMLDivElement | null>(null);
  const fadeInIntervalRef = useRef<any>(null);
  const fadeInProgressRef = useRef<number>(1.0);
  const targetVolumeRef = useRef<number>(1.0);
  const isFirstRenderRef = useRef<boolean>(true);

  // Handle Chapter Two visibility when active track changes
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const inChapterTwo = UNRELEASED_TRACKS_DATA.some((t) => t.id === activeTrack.id);
    if (inChapterTwo && !isChapterTwoVisible) {
      setIsChapterTwoVisible(true);
    }
  }, [activeTrack.id]);

  // Monitor screen scrolling to update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setIsNavInitiallyHidden(false);
      }
      const wakeUpLimit = window.innerHeight * 0.7; // fully awake after scrolling 70% of viewport
      
      const progress = scrollY / Math.max(wakeUpLimit, 1);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));

      // Smooth cinematic mathematical bottom footer progress entry (0.0 to 1.0)
      const totalH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const maxScroll = totalH - winH;
      if (maxScroll > 0) {
        const scrollPct = scrollY / maxScroll;
        // Map last some portion of the page scroll timeline (0.8 - 1.0) to footer progress 
        const fp = scrollPct > 0.8 ? (scrollPct - 0.8) / 0.2 : 0;
        setFooterProgress(Math.min(Math.max(fp, 0), 1));
        
        // Final absolute scroll threshold trigger
        const isAtAbsoluteBottom = scrollY >= maxScroll - 16;
        setIsAbsoluteEnd(isAtAbsoluteBottom);
      } else {
        setFooterProgress(0);
        setIsAbsoluteEnd(false);
      }

      // Track active section for mobile indicator
      const contentSec = document.getElementById("content-section");
      const footerSec = document.getElementById("footer");
      
      if (footerSec && scrollY >= footerSec.offsetTop - 300) {
        setActiveSection("footer");
      } else if (contentSec && scrollY >= contentSec.offsetTop - 300) {
        setActiveSection("content-section");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intro and ambient exploration glitches (VILLAFAN <-> VT)
  useEffect(() => {
    let active = true;

    const runGlitchCycle = () => {
      if (!active) return;

      // Glitch sequence representation: VILLAFAN -> VILLAF_N -> VT -> VILLAFAN
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
          setHeroTitle("VILLAFAN");
          setHeroGlitchActive(false);
          setHeroGlitchColor("none");
          setHeroOffset({ x: 0, y: 0 });

          // Plan next random swap glitch in 3 to 6.5 seconds
          const nextInterval = Math.random() * 3500 + 3000;
          setTimeout(runGlitchCycle, nextInterval);
          return;
        }

        const step = glitchSequence[currentStep];
        setHeroTitle(step.text);
        setHeroGlitchActive(true);
        setHeroGlitchColor(step.color);
        setHeroOffset(step.offset);

        currentStep++;
        setTimeout(executeStep, step.duration);
      };

      executeStep();
    };

    // First glitch occurs after 2.5 seconds on fresh join
    const initialDelay = setTimeout(runGlitchCycle, 2500);

    return () => {
      active = false;
      clearTimeout(initialDelay);
    };
  }, []);

  // Sync main player state to Audio Element
  useEffect(() => {
    if (!mainAudioRef.current) {
      mainAudioRef.current = new Audio(activeTrack.audioPath);
      mainAudioRef.current.loop = true;
    } else {
      const absoluteTargetSrc = new URL(activeTrack.audioPath, window.location.href).href;
      if (mainAudioRef.current.src !== absoluteTargetSrc) {
        mainAudioRef.current.src = activeTrack.audioPath;
      }
    }

    mainAudioRef.current.muted = isMuted;

    if (isPlaying) {
      mainAudioRef.current.play().catch((err) => {
        console.log("Main playback blocked until interaction:", err);
        setIsPlaying(false);
      });
    } else {
      mainAudioRef.current.pause();
    }

    return () => {
      if (mainAudioRef.current) {
        mainAudioRef.current.pause();
      }
    };
  }, [activeTrack, isPlaying]);

  // Trigger periodical screen-shaking episodes while Chapter II (Prévia & Arquivos Ocultos) is visible
  useEffect(() => {
    if (!isChapterTwoVisible) {
      setIsScreenShaking(false);
      return;
    }

    // Trigger an immediate subtle impact tremor of 800ms when Chapter II is revealed!
    setIsScreenShaking(true);
    const initialTremorId = setTimeout(() => {
      setIsScreenShaking(false);
    }, 800);

    // Subtle ongoing tremors occurring periodically every 4-6 seconds
    const intervalId = setInterval(() => {
      if (Math.random() < 0.40) {
        setIsScreenShaking(true);
        // Tremor period lasts between 500ms and 1400ms
        const duration = 500 + Math.random() * 900;
        const tremorTimer = setTimeout(() => {
          setIsScreenShaking(false);
        }, duration);
        return () => clearTimeout(tremorTimer);
      }
    }, 5000);

    return () => {
      clearTimeout(initialTremorId);
      clearInterval(intervalId);
    };
  }, [isChapterTwoVisible]);

  // Sync volume/mute with smart cinematic footer dampening and user volume level
  useEffect(() => {
    const isFooter = activeSection === "footer";
    // Dampen audio level subtly when entering the footer sequence or reaching absolute end
    const baseVolume = isMuted ? 0 : (isAbsoluteEnd ? 0.15 : (isFooter ? 0.35 : 1.0));
    const targetVolume = baseVolume * volumeLevel;
    targetVolumeRef.current = targetVolume;

    if (mainAudioRef.current) {
      mainAudioRef.current.muted = isMuted;
      mainAudioRef.current.volume = Math.max(0, Math.min(1, targetVolume * fadeInProgressRef.current));
    }
    if (previewAudioRef.current) {
      previewAudioRef.current.muted = isMuted;
      previewAudioRef.current.volume = Math.max(0, Math.min(1, targetVolume));
    }
  }, [isMuted, volumeLevel, activeSection, isAbsoluteEnd]);

  // Synthesize a subtle low-frequency corrupted 'hiss / click' sound effect for tracklist row hover
  const playHoverSound = () => {
    if (isMuted) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      if (!hoverAudioCtxRef.current) {
        hoverAudioCtxRef.current = new AudioCtxClass();
      }
      const ctx = hoverAudioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // 1. Low-frequency click/thump (sine pitch drop from 130Hz to 35Hz)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.045);

      oscGain.gain.setValueAtTime(0.08, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);

      // 2. Analog tape hiss/crackle burst (filtered noise)
      const bufferSize = Math.floor(ctx.sampleRate * 0.035); // ~35ms burst
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter for dark low-frequency hiss
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(550, now);
      filter.Q.setValueAtTime(1.4, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
    } catch {
      // AudioContext autoplay restrictions caught safely
    }
  };

  // Manage visual Hover or Touch state to change dark cover backdrop background
  const startPreview = (track: Track) => {
    if (hoveredTrack?.id !== track.id) {
      playHoverSound();
    }
    setHoveredTrack(track);
  };

  const stopPreview = () => {
    setHoveredTrack(null);
  };

  // Helper selectors
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePlayPause = () => {
    if (mainAudioRef.current) {
      if (isPlaying) {
        mainAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        triggerNowPlayingToast(activeTrack);
        mainAudioRef.current.play().catch((err) => {
          console.log("Direct play failure", err);
        });
      }
    } else {
      setIsPlaying(!isPlaying);
      if (!isPlaying) triggerNowPlayingToast(activeTrack);
    }
  };

  const playTrackWithCrossfade = (track: Track) => {
    triggerNowPlayingToast(track);

    if (!mainAudioRef.current) {
      mainAudioRef.current = new Audio(track.audioPath);
      mainAudioRef.current.loop = true;
    }

    const prevSrc = mainAudioRef.current.src;
    const prevTime = mainAudioRef.current.currentTime;
    const prevVolume = mainAudioRef.current.volume;

    // 1. Fade out previous track if playing
    if (isPlaying && prevSrc && !mainAudioRef.current.paused) {
      try {
        const fadeOutAudio = new Audio(prevSrc);
        fadeOutAudio.currentTime = prevTime;
        fadeOutAudio.volume = prevVolume;
        fadeOutAudio.muted = isMuted;

        fadeOutAudio.play()
          .then(() => {
            let startTime = performance.now();
            const fadeOutDuration = 1500; // 1.5 seconds crossfade
            const fadeOutInterval = setInterval(() => {
              const elapsed = performance.now() - startTime;
              const progress = Math.min(elapsed / fadeOutDuration, 1);
              fadeOutAudio.volume = prevVolume * (1 - progress);
              if (progress >= 1) {
                clearInterval(fadeOutInterval);
                fadeOutAudio.pause();
                fadeOutAudio.src = "";
              }
            }, 30);
          })
          .catch((err) => {
            console.log("Crossfade old track play failed:", err);
          });
      } catch (err) {
        console.log("Crossfade old track setup failed:", err);
      }
    }

    // 2. Set the new track as active
    setActiveTrack(track);
    setIsPlaying(true);

    // Cancel any ongoing fade-in interval
    if (fadeInIntervalRef.current) {
      clearInterval(fadeInIntervalRef.current);
      fadeInIntervalRef.current = null;
    }

    // Set source and start new track from 0 volume
    mainAudioRef.current.src = track.audioPath;
    mainAudioRef.current.currentTime = 0;
    mainAudioRef.current.volume = 0;
    fadeInProgressRef.current = 0.0;

    mainAudioRef.current.play()
      .then(() => {
        let startTime = performance.now();
        const fadeInDuration = 1500; // 1.5 seconds fade in

        fadeInIntervalRef.current = setInterval(() => {
          const elapsed = performance.now() - startTime;
          const progress = Math.min(elapsed / fadeInDuration, 1);
          fadeInProgressRef.current = progress;

          if (mainAudioRef.current) {
            mainAudioRef.current.volume = targetVolumeRef.current * progress;
          }

          if (progress >= 1) {
            if (fadeInIntervalRef.current) {
              clearInterval(fadeInIntervalRef.current);
              fadeInIntervalRef.current = null;
            }
          }
        }, 30);
      })
      .catch((err) => {
        console.log("Crossfade play of new track blocked/failed:", err);
        // Fallback: set full volume
        fadeInProgressRef.current = 1.0;
        if (mainAudioRef.current) {
          mainAudioRef.current.volume = targetVolumeRef.current;
        }
      });
  };

  const scrollToTrack = (trackId: string) => {
    setTimeout(() => {
      const el = document.getElementById(`track-row-${trackId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
    }, 100);
  };

  const handleNext = () => {
    const allTracks = [...sortedFilteredTracks, ...(isChapterTwoVisible ? sortedUnreleasedTracks : [])];
    const availableTracks = allTracks.length > 0 ? allTracks : TRACKS_DATA;
    if (availableTracks.length === 0) return;

    const currentIndex = availableTracks.findIndex((t) => t.id === activeTrack.id);
    let targetTrack: Track;

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % availableTracks.length;
      targetTrack = availableTracks[nextIndex];
    } else {
      targetTrack = availableTracks[0];
    }

    if (targetTrack.isUnreleased || UNRELEASED_TRACKS_DATA.some((t) => t.id === targetTrack.id)) {
      setIsChapterTwoVisible(true);
    }

    playTrackWithCrossfade(targetTrack);
    scrollToTrack(targetTrack.id);
  };

  const handlePrevious = () => {
    const allTracks = [...sortedFilteredTracks, ...(isChapterTwoVisible ? sortedUnreleasedTracks : [])];
    const availableTracks = allTracks.length > 0 ? allTracks : TRACKS_DATA;
    if (availableTracks.length === 0) return;

    const currentIndex = availableTracks.findIndex((t) => t.id === activeTrack.id);
    let targetTrack: Track;

    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + availableTracks.length) % availableTracks.length;
      targetTrack = availableTracks[prevIndex];
    } else {
      targetTrack = availableTracks[availableTracks.length - 1];
    }

    if (targetTrack.isUnreleased || UNRELEASED_TRACKS_DATA.some((t) => t.id === targetTrack.id)) {
      setIsChapterTwoVisible(true);
    }

    playTrackWithCrossfade(targetTrack);
    scrollToTrack(targetTrack.id);
  };

  const handleTrackSelect = (track: Track) => {
    if (track.isCorrupted) {
      const nextVisible = !isChapterTwoVisible;
      setIsChapterTwoVisible(nextVisible);
      triggerScreenDistortion();
      if (nextVisible) {
        triggerDeniedAlert("LOG_ESTADO // DESBLOQUEANDO CAPÍTULO II");
        setTimeout(() => {
          chapterTwoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 400);
      } else {
        triggerDeniedAlert("SISTEMA BLOQUEADO // ACESSO ADIADO");
      }
      return;
    }
    const isSame = activeTrack.id === track.id;

    if (isSame) {
      if (isPlaying) {
        setIsPlaying(false);
        if (mainAudioRef.current) mainAudioRef.current.pause();
      } else {
        setIsPlaying(true);
        if (mainAudioRef.current) {
          mainAudioRef.current.play().catch((err) => {
            console.log("Play failed, relying on useEffect fallback", err);
          });
        }
      }
    } else {
      playTrackWithCrossfade(track);
    }
  };

  const handleShuffle = () => {
    const allAvailable = [...TRACKS_DATA, ...UNRELEASED_TRACKS_DATA].filter((t) => !t.isCorrupted && !t.isLocked);
    if (allAvailable.length === 0) return;

    let candidateTracks = allAvailable.filter((t) => t.id !== activeTrack.id);
    if (candidateTracks.length === 0) candidateTracks = allAvailable;

    const randomIndex = Math.floor(Math.random() * candidateTracks.length);
    const selected = candidateTracks[randomIndex];

    if (selected.isUnreleased || UNRELEASED_TRACKS_DATA.some((t) => t.id === selected.id)) {
      setIsChapterTwoVisible(true);
    }

    triggerDeniedAlert(`MODO ALEATÓRIO // SELECIONADO: ${selected.name}`);
    playTrackWithCrossfade(selected);
    scrollToTrack(selected.id);
  };

  const playAccessDeniedSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.setValueAtTime(100, audioCtx.currentTime + 0.08);
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.log("Audio Context blocked:", e);
    }
  };

  const triggerDeniedAlert = (message: string) => {
    setDeniedAlert(message);
    playAccessDeniedSound();
    setTimeout(() => {
      setDeniedAlert(null);
    }, 2800);
  };

  const handleShareTrack = (track: Track) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?track=${track.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setCopiedTrackId(track.id);
          setTimeout(() => setCopiedTrackId(null), 2000);
          setShareNotification(`LINK COPIADO: ${track.name}`);
          setTimeout(() => setShareNotification(null), 2800);
        })
        .catch((err) => {
          console.error("Failed to copy using clipboard API:", err);
          fallbackCopyText(shareUrl, track);
        });
    } else {
      fallbackCopyText(shareUrl, track);
    }
  };

  const fallbackCopyText = (text: string, track: Track) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) {
        setCopiedTrackId(track.id);
        setTimeout(() => setCopiedTrackId(null), 2000);
        setShareNotification(`LINK COPIADO: ${track.name}`);
        setTimeout(() => setShareNotification(null), 2800);
      } else {
        setShareNotification("ERRO AO COPIAR LINK");
        setTimeout(() => setShareNotification(null), 2800);
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
      setShareNotification("FALHA NO PROTOCOLO");
      setTimeout(() => setShareNotification(null), 2800);
    }
  };

  const triggerScreenDistortion = () => {
    setIsScreenDistorted(true);
    setTimeout(() => {
      setIsScreenDistorted(false);
    }, 550);
  };

  // Woken up state threshold
  const isWokenUp = scrollProgress > 0.05;
  const isFullyWokenUp = scrollProgress > 0.95;

  // Deriving flashlight opacity based on scrollProgress
  // We want it to be 1 at scrollProgress <= 0.1, and 0 at scrollProgress >= 0.75
  const flashlightOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.1) / (0.75 - 0.1)));

  const isInteractingWithChapterTwo = !!(
    (hoveredTrack && (hoveredTrack.isUnreleased || hoveredTrack.isLocked)) ||
    (activeTrack && activeTrack.isUnreleased && isPlaying)
  );

  const isTerrorVibrationActive = !!(
    hoveredTrack &&
    (hoveredTrack.isUnreleased || hoveredTrack.isLocked || hoveredTrack.isCorrupted)
  );

  return (
    <div className={`relative min-h-screen bg-black text-white selection:bg-[#D0B2FF] selection:text-black font-sans scroll-smooth overflow-x-hidden ${isScreenDistorted ? "animate-screen-distortion" : ""}`}>
      
      {/* Top Navigation Bar */}
      <TopNav
        visible={!isMenuOpen && !isNavInitiallyHidden}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        volumeLevel={volumeLevel}
        onChangeVolume={handleVolumeChange}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Global Cinematic Universe Menu Overlay */}
      <CinematicMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLoadDiscography={() => {
          setIsMenuOpen(false);
          handleScrollToSection("content-section");
        }}
        activeTrack={activeTrack}
        isPlaying={isPlaying}
        onTrackSelect={handleTrackSelect}
        hoveredTrack={hoveredTrack}
        setHoveredTrack={setHoveredTrack}
        triggerDeniedAlert={triggerDeniedAlert}
        triggerScreenDistortion={triggerScreenDistortion}
      />

      {/* Global Custom precision digital reticle cursor */}
      <CustomCursor isEnabled={activeSection !== "hero"} />

      {/* Background corrupted radio static sound loop synced with global sound system */}
      <RadioStaticNoise
        isActive={isInteractingWithChapterTwo}
        isMuted={isMuted}
        volumeLevel={volumeLevel}
        activeSection={activeSection}
        isAbsoluteEnd={isAbsoluteEnd}
      />

      {/* Lights out ambient state */}

      {/* WebGL Flashlight Shader component centered as background */}
      <WebGLFlashlight scrollProgress={scrollProgress} opacity={flashlightOpacity} />

      {/* Global Cinematic Album Cover backdrop (Camadas 2 & 3) */}
      <AnimatePresence>
        {hoveredTrack && (
          <motion.div
            key={hoveredTrack.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-10 pointer-events-none overflow-hidden select-none animate-none"
          >
            {/* Cinematic subtle zoom effect representing Scale 1.05 */}
            <motion.div
              initial={{ scale: 1.01 }}
              animate={{ scale: 1.05 }}
              exit={{ scale: 1.01 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <CorruptedCoverImage
                isCorrupted={hoveredTrack.isCorrupted}
                className="w-full h-full object-cover"
                src={hoveredTrack.coverPath}
                alt={hoveredTrack.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                }}
              />
            </motion.div>

            {hoveredTrack.isUnreleased && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-950/20 pointer-events-none overflow-hidden mix-blend-screen">
                {/* Glow behind the grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)] animate-pulse" />
                
                {/* Running horizontal cyber line */}
                <motion.div 
                  className="absolute left-0 right-0 h-[1.5px] bg-[#D0B2FF]/40 shadow-[0_0_15px_rgba(208,178,255,0.6)]"
                  initial={{ top: "-5%" }}
                  animate={{ top: "105%" }}
                  transition={{ repeat: Infinity, duration: 4.8, ease: "linear" }}
                />

                {/* Micro tech grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />

                {/* Left diagnostic status */}
                <div className="absolute bottom-[10%] left-10 font-mono text-[8px] text-red-500/40 tracking-widest leading-relaxed select-none hidden md:block">
                  SINAL DE PRÉVIA MISTERIOSO // CANAL ATIVO<br />
                  SINAL DE OUTRO MUNDO / VT DETECTADO<br />
                  DIRETÓRIO: /PREVIAS/
                </div>

                {/* Right security warning */}
                <div className="absolute top-[10%] right-10 font-mono text-[8px] text-red-500/45 tracking-widest leading-relaxed select-none hidden md:block text-right">
                  ARQUIVOS SECRETOS VT CLASSIFICADOS<br />
                  MODO DE ESCUTA ATIVADO<br />
                  ESTADO: EM FASE DE DECODIFICAÇÃO
                </div>
              </div>
            )}
            {/* 70% dark overlay layer to keep text readability extremely clean & high-contrast */}
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shaking layout wrapper containing all active UI and headers, keeping the backdrop cover image completely stable */}
      <div className={isTerrorVibrationActive ? "animate-screen-shake-terror" : (isScreenShaking ? "animate-screen-shake-subtle" : "")}>

      {/* INTRO SCREEN (THE VOID) */}
      <section 
        id="hero" 
        className="relative h-screen w-full flex flex-col items-center justify-center z-20 pointer-events-none select-none overflow-hidden"
      >
        <div className="text-center space-y-6 px-6">
          {/* Display title in thin contemporary grotesque architecture with split RGB rendering support */}
          <div 
            className="relative select-none cursor-default py-4 transition-all duration-75 notranslate"
            translate="no"
            style={{
              opacity: Math.max(1 - scrollProgress * 1.5, 0),
              transform: `translateY(${scrollProgress * 60}px) scale(${1 - scrollProgress * 0.1}) translate3d(${heroOffset.x}px, ${heroOffset.y}px, 0px)`,
            }}
          >
            <h1 className="font-sans text-[72px] sm:text-[110px] md:text-[180px] font-bold tracking-tighter leading-none text-white uppercase select-none">
              {heroTitle}
            </h1>

            {heroGlitchActive && (
              <>
                <span 
                  className="absolute top-4 left-0 w-full font-sans text-[72px] sm:text-[110px] md:text-[180px] font-bold tracking-tighter leading-none uppercase select-none translate-x-[-3px] translate-y-[2px]"
                  style={{ 
                    clipPath: "polygon(0 15%, 100% 15%, 100% 45%, 0 45%)",
                    color: heroGlitchColor === "blood-red" ? "#7A0000" : 
                           heroGlitchColor === "deep-purple" ? "#4B1E6D" : 
                           heroGlitchColor === "cold-gray" ? "#7A7A7A" : 
                           heroGlitchColor === "ice-white" ? "#F5F5F5" : "#A30000"
                  }}
                >
                  {heroTitle}
                </span>
                <span 
                  className="absolute top-4 left-0 w-full font-sans text-[72px] sm:text-[110px] md:text-[180px] font-bold tracking-tighter leading-none uppercase select-none translate-x-[3px] translate-y-[-2px]"
                  style={{ 
                    clipPath: "polygon(0 55%, 100% 55%, 100% 85%, 0 85%)",
                    color: heroGlitchColor === "blood-red" ? "#A30000" : 
                           heroGlitchColor === "deep-purple" ? "#8B5CF6" : 
                           heroGlitchColor === "cold-gray" ? "#7A7A7A" : 
                           heroGlitchColor === "ice-white" ? "#F5F5F5" : "#4B1E6D"
                  }}
                >
                  {heroTitle}
                </span>
              </>
            )}
          </div>
          
          <p 
            className="font-mono text-[9px] sm:text-xs tracking-[0.5em] text-neutral-400 transition-opacity duration-300 uppercase pl-[0.5em]"
            style={{ opacity: Math.max(1 - scrollProgress * 2, 0) }}
          >
            {heroTitle === "VT" ? "NÃO EXISTE VOLTA" : "ESSE É MEU FUTURO"}
          </p>
        </div>

        {/* Scrollytelling lock overlay ready */}
      </section>

      {/* SCROLLYTELLING MAIN VIEW (THE DAWN) */}
      {/* Container is faded in smoothly depending on scroll progress, and fades out when scrolled to the outro credits */}
      <main 
        id="content-section" 
        className="relative min-h-screen z-20 px-4 sm:px-8 md:px-16 lg:px-24 py-24 bg-transparent transition-all duration-1000"
        style={{
          opacity: Math.min(scrollProgress * 3, 1) * (1 - footerProgress),
          transform: `translateY(${20 - scrollProgress * 20}px)`,
          pointerEvents: footerProgress > 0.5 ? "none" : "auto",
        }}
      >
        <div className="max-w-7xl mx-auto space-y-6">


          {/* Self-contained .discography wrapper to isolate the hover background effects entirely */}
          <div className="discography relative w-full bg-transparent transition-all duration-700">
            {/* Cinematic Glitch-Dust Interactive Canvas Particle Overlay restricted to music area */}
            <GlitchDustCanvas isPlaying={isPlaying} />

            {/* The Tracklist content layer above background */}
            <div className="relative z-10 tracklist space-y-16">

              {/* SECTION: CAPÍTULO I - MAIS OUVIDAS */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none px-2 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-neutral-500 tracking-[0.4em] uppercase">CAPÍTULO I</span>
                    <h2 className="font-sans text-xl sm:text-2xl font-black text-white/90 tracking-wide uppercase">MAIS OUVIDAS</h2>
                  </div>

                  {/* Search and Shuffle Controls Group */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Shuffle / Random Track Button */}
                    <button
                      type="button"
                      onClick={handleShuffle}
                      onMouseEnter={() => playHoverSound()}
                      className="group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-[#D0B2FF]/15 border border-white/10 hover:border-[#D0B2FF]/50 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(208,178,255,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0B2FF] shrink-0"
                      aria-label="Reproduzir música aleatória"
                      title="Reproduzir música aleatória"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-[#D0B2FF] group-hover:rotate-180 transition-transform duration-500 shrink-0" />
                      <span className="font-semibold text-[10px] sm:text-xs">ALEATÓRIO</span>
                    </button>

                    {/* Real-time Track Search Input */}
                    <div className="relative flex-1 md:w-56 lg:w-72">
                      <motion.div
                        animate={isScanning ? {
                          x: [0, -1, 1.5, -1.5, 1, -0.5, 0.5, 0],
                          y: [0, 0.5, -0.5, 0.5, -0.5, 0.3, -0.3, 0],
                          skewX: [0, -1.5, 1.5, -1, 1, 0],
                          opacity: [1, 0.85, 1, 0.9, 1, 0.95, 1],
                        } : {}}
                        transition={{
                          duration: 0.2,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "linear"
                        }}
                        className={`relative flex items-center rounded-full transition-all group duration-300 overflow-hidden ${
                          isScanning 
                            ? "bg-white/[0.06] border border-[#D0B2FF]/70 shadow-[0_0_20px_rgba(208,178,255,0.3)]" 
                            : "bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 focus-within:border-[#D0B2FF]/40 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_15px_rgba(208,178,255,0.15)]"
                        }`}
                      >
                        <Search className="absolute left-4 w-4 h-4 text-neutral-500 group-focus-within:text-[#D0B2FF] transition-colors z-30" />
                        
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                          className="w-full bg-transparent pl-11 pr-10 py-2.5 font-mono text-xs text-transparent caret-[#D0B2FF] focus:outline-none uppercase tracking-wider relative z-20"
                        />

                        {/* Scrambled Text Overlay */}
                        <div className="absolute inset-0 flex items-center pl-11 pr-10 font-mono text-xs uppercase tracking-wider pointer-events-none select-none z-10">
                          {searchQuery ? (
                            <ScrambleText text={searchQuery} trigger={isScanning} baseColor="#FFFFFF" />
                          ) : (
                            <span className="text-neutral-500">
                              <ScrambleText text="BUSCAR MÚSICA..." trigger={isInputFocused} baseColor="#737373" />
                            </span>
                          )}
                        </div>

                        {searchQuery && (
                          <button
                            onClick={() => {
                              setSearchQuery("");
                              setIsScanning(false);
                            }}
                            className="absolute right-4 text-neutral-500 hover:text-white transition-colors cursor-pointer z-30"
                            aria-label="Limpar busca"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Mobile Sort Bar */}
                <div className="sm:hidden flex items-center gap-2 overflow-x-auto pb-3 font-mono text-[9px] uppercase tracking-wider text-neutral-400 select-none no-scrollbar px-2">
                  <span className="text-neutral-500 text-[8px] tracking-[0.2em] shrink-0">ORDENAR:</span>
                  
                  <button
                    type="button"
                    onClick={() => handleSort("name")}
                    className={`px-2.5 py-1 rounded border flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer ${
                      sortField === "name" 
                        ? "bg-[#D0B2FF]/10 text-[#D0B2FF] border-[#D0B2FF]/40 font-bold" 
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>ALFABÉTICA</span>
                    {sortField === "name" && (
                      sortDirection === "asc" ? <ArrowUp className="w-2.5 h-2.5 text-[#D0B2FF]" /> : <ArrowDown className="w-2.5 h-2.5 text-[#D0B2FF]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSort("year")}
                    className={`px-2.5 py-1 rounded border flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer ${
                      sortField === "year" 
                        ? "bg-[#D0B2FF]/10 text-[#D0B2FF] border-[#D0B2FF]/40 font-bold" 
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>ANO</span>
                    {sortField === "year" && (
                      sortDirection === "asc" ? <ArrowUp className="w-2.5 h-2.5 text-[#D0B2FF]" /> : <ArrowDown className="w-2.5 h-2.5 text-[#D0B2FF]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSort("duration")}
                    className={`px-2.5 py-1 rounded border flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer ${
                      sortField === "duration" 
                        ? "bg-[#D0B2FF]/10 text-[#D0B2FF] border-[#D0B2FF]/40 font-bold" 
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>DURAÇÃO</span>
                    {sortField === "duration" && (
                      sortDirection === "asc" ? <ArrowUp className="w-2.5 h-2.5 text-[#D0B2FF]" /> : <ArrowDown className="w-2.5 h-2.5 text-[#D0B2FF]" />
                    )}
                  </button>

                  {sortField !== "default" && (
                    <button
                      type="button"
                      onClick={() => setSortField("default")}
                      className="text-neutral-500 hover:text-neutral-300 text-[8px] tracking-wider shrink-0 underline ml-1 cursor-pointer"
                    >
                      PADRÃO
                    </button>
                  )}
                </div>

                {/* Minimalist 6-Column Discography Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 select-none px-2">
                  <div className="col-span-3 flex items-center">
                    {renderSortHeader("ARTISTA", "artist")}
                  </div>
                  <div className="col-span-3 flex items-center">
                    {renderSortHeader("MÚSICA", "name")}
                  </div>
                  <div className="col-span-2 flex items-center">TIPO</div>
                  <div className="col-span-1 flex items-center">LANÇAMENTO</div>
                  <div className="col-span-1 text-center flex items-center justify-center">PARTILHAR</div>
                  <div className="col-span-1 text-center flex items-center justify-center">YOUTUBE</div>
                  <div className="col-span-1 flex items-center justify-end gap-1.5">
                    {renderSortHeader("ANO", "year")}
                    <span className="text-neutral-600">·</span>
                    {renderSortHeader("DUR.", "duration")}
                  </div>
                </div>

                {/* Elegant List of Tracks in responsive configurations */}
                <div className="flex flex-col border-b border-white/10">
                  {sortedFilteredTracks.length > 0 ? (
                    sortedFilteredTracks.map((track, i) => {
                    const isHovered = hoveredTrack?.id === track.id;
                    const isCurrent = activeTrack.id === track.id;

                    return (
                      <div
                        key={track.id}
                        id={`track-row-${track.id}`}
                        tabIndex={0}
                        role="button"
                        aria-label={`Reproduzir ${track.name} por ${track.artist}`}
                        aria-current={isCurrent ? "true" : undefined}
                        onMouseEnter={() => startPreview(track)}
                        onMouseLeave={stopPreview}
                        onTouchStart={() => startPreview(track)}
                        onFocus={() => startPreview(track)}
                        onBlur={stopPreview}
                        onClick={() => handleTrackSelect(track)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleTrackSelect(track);
                          } else if (e.key === "ArrowDown") {
                            e.preventDefault();
                            if (i < sortedFilteredTracks.length - 1) {
                              document.getElementById(`track-row-${sortedFilteredTracks[i + 1].id}`)?.focus();
                            } else if (isChapterTwoVisible && sortedUnreleasedTracks.length > 0) {
                              document.getElementById(`track-row-${sortedUnreleasedTracks[0].id}`)?.focus();
                            }
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            if (i > 0) {
                              document.getElementById(`track-row-${sortedFilteredTracks[i - 1].id}`)?.focus();
                            }
                          } else if (e.key === "Home") {
                            e.preventDefault();
                            if (sortedFilteredTracks.length > 0) {
                              document.getElementById(`track-row-${sortedFilteredTracks[0].id}`)?.focus();
                            }
                          } else if (e.key === "End") {
                            e.preventDefault();
                            if (isChapterTwoVisible && sortedUnreleasedTracks.length > 0) {
                              document.getElementById(`track-row-${sortedUnreleasedTracks[sortedUnreleasedTracks.length - 1].id}`)?.focus();
                            } else if (sortedFilteredTracks.length > 0) {
                              document.getElementById(`track-row-${sortedFilteredTracks[sortedFilteredTracks.length - 1].id}`)?.focus();
                            }
                          }
                        }}
                        className={`group relative py-6 sm:py-8 border-t border-white/10 cursor-pointer select-none transition-all duration-200 rounded-lg focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0B2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black/90 focus-visible:bg-white/[0.04] focus-visible:border-[#D0B2FF]/50 ${
                          isHovered 
                            ? (track.isCorrupted ? "bg-red-950/5 px-4" : "bg-white/[0.02] px-4") 
                            : "bg-transparent px-2"
                        } ${
                          isCurrent ? "bg-white/[0.01]" : ""
                        } ${
                          hoveredTrack && !isHovered ? "opacity-20 filter blur-[1.5px]" : "opacity-100"
                        }`}
                      >
                        {/* Interactive glowing header line overlay */}
                        {isHovered && (
                          <motion.div 
                            layoutId={track.isCorrupted ? "hoverGlowLineCorrupted" : "hoverGlowLine"}
                            className={`absolute -top-[1px] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent to-transparent ${
                              track.isCorrupted 
                                ? "via-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.7)]" 
                                : "via-[#D0B2FF]/80 shadow-[0_0_12px_rgba(208,178,255,0.7)]"
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}

                        {/* Secret Transmission Tooltip on hover */}
                        <AnimatePresence>
                          {isHovered && (track.isUnreleased || track.isLocked || track.isCorrupted) && (
                            <SecretTransmissionTooltip track={track} />
                          )}
                        </AnimatePresence>
                        {/* Mobile Layout (<sm) */}
                        <div className="flex sm:hidden items-center justify-between w-full">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <span className={`font-mono text-xs select-none ${
                              track.isCorrupted ? "text-red-500/40 animate-pulse" : "text-neutral-600"
                            }`}>
                              {track.number}
                            </span>
                            <div className="flex flex-col min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`font-sans text-sm font-bold tracking-tight uppercase truncate ${
                                  track.isCorrupted 
                                    ? "text-red-500/80" 
                                    : (isCurrent ? "text-[#D0B2FF]" : "text-white")
                                }`}>
                                  {track.name}
                                </span>
                                {isCurrent && isPlaying && (
                                  <div className="flex items-end gap-0.5 h-3 shrink-0">
                                    <span className="w-0.5 h-full bg-[#D0B2FF] rounded-full animate-pulse" />
                                    <span className="w-0.5 h-2 bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.1s]" />
                                    <span className="w-0.5 h-3 bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.2s]" />
                                  </div>
                                )}
                              </div>
                              <span className={`font-mono text-[9px] ${
                                track.isCorrupted ? "text-red-500/60" : "text-neutral-400"
                              }`}>
                                {track.artist} &middot; {track.trackType} &middot; <span className={track.isCorrupted ? "text-red-500 font-bold" : ""}>{track.year}</span>
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-2 shrink-0">
                            {/* Share button with glitch animation */}
                            <GlitchShareButton
                              track={track}
                              isCopied={copiedTrackId === track.id}
                              onShare={handleShareTrack}
                              buttonSize="w-11 h-11"
                              iconSize="w-5 h-5"
                            />

                            {/* Youtube Link Action configured as an accessible touch target */}
                            {track.youtubeUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(track.youtubeUrl, "_blank", "noopener,noreferrer");
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.stopPropagation();
                                  }
                                }}
                                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-[#ff0000] hover:bg-white/10 hover:border-[#ff0000]/30 transition-all active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000] focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                                aria-label="Assistir no YouTube"
                                title="Assistir no YouTube"
                              >
                                <Youtube className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Desktop Layout (>=sm) */}
                        <div className="hidden sm:grid grid-cols-12 gap-4 items-center w-full">
                          {/* ARTISTA (col-span-3) */}
                          <div className="col-span-3 flex items-center gap-3 min-w-0">
                            <span className={`font-mono text-[9px] select-none ${
                              track.isCorrupted 
                                ? "text-red-500/40 animate-pulse" 
                                : "text-neutral-600 group-hover:text-[#D0B2FF]"
                            }`}>
                              {track.number}
                            </span>
                            <span className={`font-mono text-xs sm:text-sm font-medium transition-colors duration-300 truncate ${
                              track.isCorrupted 
                                ? "text-red-500/65 group-hover:text-red-400" 
                                : "text-neutral-300 group-hover:text-white"
                            }`}>
                              <ScrambleText text={track.artist} trigger={isHovered} baseColor={track.isCorrupted ? "#EF4444" : undefined} />
                            </span>
                          </div>

                          {/* MÚSICA (col-span-3) */}
                          <div className={`col-span-3 flex items-center gap-2 font-sans text-sm sm:text-lg md:text-xl font-bold tracking-tight transition-all duration-300 truncate ${
                            track.isCorrupted 
                              ? "text-red-500 group-hover:text-red-400" 
                              : "text-white group-hover:text-[#D0B2FF]"
                          }`}>
                            <ScrambleText text={track.name} trigger={isHovered} baseColor={track.isCorrupted ? "#EF4444" : undefined} />
                            {isCurrent && isPlaying && (
                              <div className="flex items-end gap-0.5 h-3 ml-2 shrink-0">
                                <span className="w-0.5 h-full bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.1s]" />
                                <span className="w-0.5 h-2 bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-0.5 h-3 bg-[#D0B2FF] rounded-full animate-bounce [animation-delay:0.3s]" />
                              </div>
                            )}
                          </div>

                          {/* TIPO (col-span-2) */}
                          <div className={`col-span-2 font-mono text-[10px] sm:text-xs transition-colors duration-300 truncate ${
                            track.isCorrupted 
                              ? "text-red-500/50 group-hover:text-red-400" 
                              : "text-neutral-400 group-hover:text-white"
                          }`}>
                            <ScrambleText text={track.trackType} trigger={isHovered} baseColor={track.isCorrupted ? "#EF4444" : undefined} />
                          </div>

                          {/* LANÇAMENTO (col-span-1) */}
                          <div className={`col-span-1 font-mono text-[10px] sm:text-xs transition-colors duration-300 truncate ${
                            track.isCorrupted 
                              ? "text-red-500/50 group-hover:text-red-400" 
                              : "text-neutral-400 group-hover:text-white"
                          }`}>
                            <ScrambleText text={track.release} trigger={isHovered} baseColor={track.isCorrupted ? "#EF4444" : undefined} />
                          </div>

                          {/* PARTILHAR (col-span-1) */}
                          <div className="col-span-1 flex justify-center">
                            <GlitchShareButton
                              track={track}
                              isCopied={copiedTrackId === track.id}
                              onShare={handleShareTrack}
                              buttonSize="w-10 h-10"
                              iconSize="w-4 h-4"
                            />
                          </div>

                          {/* ASSISTIR NO YOUTUBE (col-span-1) */}
                          <div className="col-span-1 flex justify-center">
                            {track.youtubeUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(track.youtubeUrl, "_blank", "noopener,noreferrer");
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.stopPropagation();
                                  }
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-[#ff0000] hover:bg-white/10 hover:border-[#ff0000]/30 transition-all active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000] focus-visible:ring-offset-1 focus-visible:ring-offset-black"
                                aria-label="Assistir no YouTube"
                                title="Assistir no YouTube"
                              >
                                <Youtube className="w-4.5 h-4.5" />
                              </button>
                            )}
                          </div>

                          {/* ANO (col-span-1) */}
                          <div className={`col-span-1 font-mono text-[10px] sm:text-xs transition-colors duration-300 text-right ${
                            track.isCorrupted 
                              ? "text-red-500/70 group-hover:text-red-400" 
                              : "text-neutral-400 group-hover:text-white"
                          }`}>
                            <ScrambleText text={`${track.year} · ${track.duration}`} trigger={isHovered} baseColor={track.isCorrupted ? "#EF4444" : undefined} />
                          </div>
                        </div>
                      </div>
                    );
                  })) : (
                    <div className="py-20 text-center border-t border-white/10 flex flex-col items-center justify-center gap-4 select-none">
                      <div className="font-mono text-[10px] text-neutral-500 tracking-[0.3em] uppercase">
                        PROTOCOLO DE BUSCA
                      </div>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D0B2FF] max-w-md px-4 leading-relaxed">
                        NENHUMA FAIXA ENCONTRADA PARA "{searchQuery}"
                      </span>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="font-mono text-[10px] text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full tracking-[0.15em] uppercase cursor-pointer mt-2 focus:outline-none transition-all active:scale-95"
                      >
                        RECOMEÇAR BUSCA
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* DIVIDER BETWEEN CHAPTERS */}
              <div className="py-8 flex items-center justify-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              </div>

              {/* SECTION: CAPÍTULO II - PRÉVIAS & ARQUIVOS OCULTOS */}
              <div ref={chapterTwoRef}>
                <AnimatePresence mode="wait">
                  {isChapterTwoVisible && (
                    <motion.div
                      key="open-archive"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none px-2 mb-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[9px] text-neutral-500 tracking-[0.4em] uppercase">CAPÍTULO II</span>
                        <h2 className="font-sans text-xl sm:text-2xl font-black text-red-500/80 tracking-wide uppercase">PRÉVIAS & ARQUIVOS OCULTOS</h2>
                      </div>
                      <button
                        onMouseEnter={() => setIsCloseHovered(true)}
                        onMouseLeave={() => setIsCloseHovered(false)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsChapterTwoVisible(false);
                          triggerDeniedAlert("SISTEMA BLOQUEADO // ACESSO ADIADO");
                        }}
                        className="px-4 py-2 font-mono text-[9px] text-rose-500 hover:text-white bg-red-950/10 hover:bg-red-950/40 border border-red-500/20 hover:border-red-500/80 transition-all rounded uppercase tracking-[0.15em] shrink-0 active:scale-95 cursor-pointer max-w-max flex items-center gap-2 group/closebtn"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse group-hover/closebtn:animate-ping shrink-0" />
                        <ScrambleText text="[ FECHAR DIRETÓRIO // FALHA NO SINAL ]" trigger={isCloseHovered} baseColor="#EF4444" />
                      </button>
                    </div>

                    {/* Header for Capítulo II */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 select-none px-2" data-capitulo-ii="true">
                      <div className="col-span-3 flex items-center">
                        {renderSortHeader("ARTISTA", "artist")}
                      </div>
                      <div className="col-span-3 flex items-center">
                        {renderSortHeader("MÚSICA", "name")}
                      </div>
                      <div className="col-span-2 flex items-center">TIPO</div>
                      <div className="col-span-2 flex items-center">STATUS</div>
                      <div className="col-span-1 text-center flex items-center justify-center">PARTILHAR</div>
                      <div className="col-span-1 flex items-center justify-end gap-1.5">
                        {renderSortHeader("ANO", "year")}
                        <span className="text-neutral-600">·</span>
                        {renderSortHeader("DUR.", "duration")}
                      </div>
                    </div>

                    {/* Unreleased and Restricted files list */}
                    <div className="flex flex-col border-b border-white/10" data-capitulo-ii="true">
                      {sortedUnreleasedTracks.map((track, i) => {
                        const isHovered = hoveredTrack?.id === track.id;
                        const isCurrent = activeTrack.id === track.id;

                        return (
                          <div
                            key={track.id}
                            id={`track-row-${track.id}`}
                            data-capitulo-ii="true"
                            tabIndex={0}
                            role="button"
                            aria-label={`Prévia de ${track.name}`}
                            aria-current={isCurrent ? "true" : undefined}
                            onMouseEnter={() => startPreview(track)}
                            onMouseLeave={stopPreview}
                            onTouchStart={() => startPreview(track)}
                            onFocus={() => startPreview(track)}
                            onBlur={stopPreview}
                            onClick={() => {
                              handleTrackSelect(track);
                              if (track.isLocked || track.isCorrupted) {
                                triggerDeniedAlert("SINAL CRÍPTICO DETECTADO // TRANSMISSÃO PROTEGIDA");
                                triggerScreenDistortion();
                              } else {
                                triggerDeniedAlert("DECODIFICANDO AUDIO // EXECUTANDO PRÉVIA");
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleTrackSelect(track);
                                if (track.isLocked || track.isCorrupted) {
                                  triggerDeniedAlert("SINAL CRÍPTICO DETECTADO // TRANSMISSÃO PROTEGIDA");
                                  triggerScreenDistortion();
                                } else {
                                  triggerDeniedAlert("DECODIFICANDO AUDIO // EXECUTANDO PRÉVIA");
                                }
                              } else if (e.key === "ArrowDown") {
                                e.preventDefault();
                                if (i < sortedUnreleasedTracks.length - 1) {
                                  document.getElementById(`track-row-${sortedUnreleasedTracks[i + 1].id}`)?.focus();
                                }
                              } else if (e.key === "ArrowUp") {
                                e.preventDefault();
                                if (i > 0) {
                                  document.getElementById(`track-row-${sortedUnreleasedTracks[i - 1].id}`)?.focus();
                                } else if (sortedFilteredTracks.length > 0) {
                                  document.getElementById(`track-row-${sortedFilteredTracks[sortedFilteredTracks.length - 1].id}`)?.focus();
                                }
                              } else if (e.key === "Home") {
                                e.preventDefault();
                                if (sortedFilteredTracks.length > 0) {
                                  document.getElementById(`track-row-${sortedFilteredTracks[0].id}`)?.focus();
                                }
                              } else if (e.key === "End") {
                                e.preventDefault();
                                if (sortedUnreleasedTracks.length > 0) {
                                  document.getElementById(`track-row-${sortedUnreleasedTracks[sortedUnreleasedTracks.length - 1].id}`)?.focus();
                                }
                              }
                            }}
                            className={`group relative py-6 sm:py-8 border-t border-white/10 cursor-pointer select-none transition-all duration-200 rounded-lg focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black/90 focus-visible:bg-red-950/20 focus-visible:border-red-500/50 ${
                              isHovered 
                                ? "bg-red-500/[0.015] px-4" 
                                : "bg-transparent px-2"
                            } ${
                              isCurrent ? "bg-white/[0.01]" : ""
                            } ${
                              hoveredTrack && !isHovered ? "opacity-20 filter blur-[1.5px]" : "opacity-100"
                            }`}
                          >
                            {/* Interactive red glowing cyber line overlay on hover */}
                            {isHovered && (
                              <motion.div 
                                layoutId="hoverGlowLineUnreleased"
                                className="absolute -top-[1.5px] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.7)]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}

                            {/* Secret Transmission Tooltip on hover */}
                            <AnimatePresence>
                              {isHovered && (track.isUnreleased || track.isLocked || track.isCorrupted) && (
                                <SecretTransmissionTooltip track={track} />
                              )}
                            </AnimatePresence>

                            {/* Mobile Layout (<sm) */}
                            <div className="flex sm:hidden items-center justify-between w-full">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className={`font-mono text-xs select-none ${
                                  isCurrent ? "text-[#D0B2FF]" : "text-red-500/60"
                                }`}>
                                  {track.number}
                                </span>
                                <div className="flex flex-col min-w-0 flex-1">
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

                              <div className="flex items-center ml-2 shrink-0">
                                {/* Share button with glitch animation */}
                                <GlitchShareButton
                                  track={track}
                                  isCopied={copiedTrackId === track.id}
                                  onShare={handleShareTrack}
                                  buttonSize="w-11 h-11"
                                  iconSize="w-5 h-5"
                                />
                              </div>
                            </div>

                            {/* Desktop Layout (>=sm) */}
                            <div className="hidden sm:grid grid-cols-12 gap-4 items-center w-full">
                              {/* ARTISTA (col-span-3) */}
                              <div className="col-span-3 flex items-center gap-3 min-w-0">
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
                              <div className={`col-span-3 flex items-center gap-2 font-sans text-sm sm:text-lg md:text-xl font-bold tracking-tight transition-all duration-300 truncate ${
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
                              <div className={`col-span-2 font-mono text-[10px] sm:text-xs transition-colors duration-300 truncate ${
                                isCurrent ? "text-[#D0B2FF]/80" : "text-neutral-500 group-hover:text-neutral-300"
                              }`}>
                                <ScrambleText text={track.trackType} trigger={isHovered} />
                              </div>

                              {/* STATUS (col-span-2) */}
                              <div className={`col-span-2 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-colors duration-300 truncate ${
                                isCurrent 
                                  ? "text-[#D0B2FF]/95" 
                                  : (track.isLocked ? "text-red-500/75 group-hover:text-red-400" : "text-amber-500/80 group-hover:text-amber-400")
                              }`}>
                                <ScrambleText text={track.statusLabel || ""} trigger={isHovered} />
                              </div>

                              {/* PARTILHAR (col-span-1) */}
                              <div className="col-span-1 flex justify-center">
                                <GlitchShareButton
                                  track={track}
                                  isCopied={copiedTrackId === track.id}
                                  onShare={handleShareTrack}
                                  buttonSize="w-10 h-10"
                                  iconSize="w-4 h-4"
                                />
                              </div>

                              {/* ANO (col-span-1) */}
                              <div className={`col-span-1 font-mono text-[10px] sm:text-xs transition-colors duration-300 text-right ${
                                isCurrent ? "text-[#D0B2FF]/80" : "text-neutral-500 group-hover:text-neutral-300"
                              }`}>
                                <ScrambleText text={`${track.year} · ${track.duration}`} trigger={isHovered} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            </div>
          </div>
        </div>
      </main>

      {/* Cinematic ending footer with high tracking social link indicators */}
      <Footer 
        isHovered={!!hoveredTrack} 
        footerProgress={footerProgress}
        activeSection={activeSection}
        isAbsoluteEnd={isAbsoluteEnd}
      />

      {/* Glassmorphic floating Player Controls pill for ultimate desktop immersion */}
      <FloatingMusicBar
        visible={isWokenUp}
        activeTrack={activeTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        volumeLevel={volumeLevel}
        onChangeVolume={handleVolumeChange}
        isFooterActive={activeSection === "footer"}
      />

      {/* Access Denied Warning Toast Alert */}
      <AnimatePresence>
        {deniedAlert && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-28 left-1/2 -notranslate-x bg-black/95 border border-red-500/30 px-6 py-3 rounded-md shadow-[0_0_25px_rgba(239,68,68,0.25)] flex items-center gap-3 backdrop-blur-md z-50 pointer-events-none"
            style={{ x: "-50%" }}
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em]">
              <ScrambleText text={deniedAlert} trigger={true} baseColor="#EF4444" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share / Success Toast Alert */}
      <AnimatePresence>
        {shareNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-28 left-1/2 -notranslate-x bg-black/95 border border-[#D0B2FF]/30 px-6 py-3 rounded-md shadow-[0_0_25px_rgba(208,178,255,0.25)] flex items-center gap-3 backdrop-blur-md z-50 pointer-events-none"
            style={{ x: "-50%" }}
          >
            <div className="w-2 h-2 rounded-full bg-[#D0B2FF] animate-ping" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white">
              <ScrambleText text={shareNotification} trigger={true} baseColor="#D0B2FF" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Now Playing Track Toast */}
      <AnimatePresence>
        {nowPlayingToast && (
          <motion.div
            key={nowPlayingToast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-28 right-4 sm:right-8 z-50 pointer-events-auto max-w-[280px] sm:max-w-xs bg-[#0B0514]/95 border border-[#D0B2FF]/40 rounded-xl p-3.5 shadow-[0_0_30px_rgba(208,178,255,0.25)] backdrop-blur-xl flex items-center gap-3 relative overflow-hidden group select-none"
          >
            {/* Top glowing accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D0B2FF] to-transparent" />
            
            {/* Spinning Disc Icon */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#D0B2FF]/10 border border-[#D0B2FF]/30 shrink-0">
              <Disc className="w-5 h-5 text-[#D0B2FF] animate-spin" style={{ animationDuration: "4s" }} />
              <div className="absolute inset-0 rounded-lg bg-[#D0B2FF]/5 animate-pulse" />
            </div>

            {/* Track Metadata */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#D0B2FF] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D0B2FF] animate-ping shrink-0" />
                <span>A TOCAR AGORA</span>
              </div>
              <h4 className="font-sans text-xs sm:text-sm font-black text-white tracking-wide truncate mt-0.5">
                {nowPlayingToast.track.name}
              </h4>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider truncate">
                {nowPlayingToast.track.artist}
              </p>
            </div>

            {/* Close / Dismiss button */}
            <button
              onClick={() => setNowPlayingToast(null)}
              className="text-neutral-500 hover:text-white p-1 rounded-md transition-colors cursor-pointer shrink-0"
              aria-label="Fechar notificação"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Auto-dismiss progress timer bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4.5, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D0B2FF]/60 origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}

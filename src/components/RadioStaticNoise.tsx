import { useEffect, useRef, useState } from "react";

interface RadioStaticNoiseProps {
  isActive: boolean;
  isMuted: boolean;
  volumeLevel?: number;
  activeSection: string;
  isAbsoluteEnd: boolean;
}

export default function RadioStaticNoise({
  isActive,
  isMuted,
  volumeLevel = 1.0,
  activeSection,
  isAbsoluteEnd,
}: RadioStaticNoiseProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const bandpassFilterRef = useRef<BiquadFilterNode | null>(null);
  const oscillatorNodeRef = useRef<OscillatorNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the audio graph
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 1. Generate Custom Corrupted Radio Brown Static Buffer (2 seconds)
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brownian filter to create deep, rumble background rumble
        lastOut = (lastOut + 0.025 * white) / 1.025;
        data[i] = lastOut * 4.0; // High amplitude static

        // Periodic radio pops and cracks
        if (Math.random() < 0.0006) {
          data[i] += (Math.random() - 0.5) * 0.9;
        }
      }

      // 2. Setup Loop Source
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      sourceNodeRef.current = source;

      // 3. Bandpass Biquad Filter to emulate narrow radio speaker band (300Hz - 2500Hz)
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1100, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      bandpassFilterRef.current = filter;

      // 4. Low humming ground loop oscillator (60Hz AC hum for cyber horror feel)
      const lowHum = ctx.createOscillator();
      lowHum.type = "sine";
      lowHum.frequency.setValueAtTime(60, ctx.currentTime);
      
      const lowHumGain = ctx.createGain();
      lowHumGain.gain.setValueAtTime(0.04, ctx.currentTime); // Subtle volume

      // 5. Connect hum node to filter
      lowHum.connect(lowHumGain);
      lowHumGain.connect(filter);
      lowHum.start();
      oscillatorNodeRef.current = lowHum;

      // 6. Master gain node
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNodeRef.current = gainNode;

      // Connect nodes: Static Source -> Bandpass Filter -> Master Gain -> Destination
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start();
      setIsInitialized(true);
    } catch (err) {
      console.warn("Failed to initialize Web Audio API for radio static noise:", err);
    }
  };

  // Trigger init on user action / change in active status
  useEffect(() => {
    if (isActive && !isInitialized) {
      initAudio();
    }
  }, [isActive, isInitialized]);

  // Handle active status, play/pause, and master volume synchronization
  useEffect(() => {
    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;
    if (!ctx || !gainNode) return;

    // Calculate volume based on system values
    const isFooter = activeSection === "footer";
    const systemVolumeMultiplier = (isMuted ? 0 : (isAbsoluteEnd ? 0.15 : (isFooter ? 0.35 : 1.0))) * volumeLevel;
    
    // Static base volume is 0.28 when active, otherwise completely silent (0)
    const activeVolume = isActive ? 0.28 : 0;
    const targetVolume = activeVolume * systemVolumeMultiplier;

    // Smooth transition to avoid raw clicks/pops
    gainNode.gain.setTargetAtTime(targetVolume, ctx.currentTime, 0.12);

    // Resume context if suspended (browser security fallback)
    if (isActive && ctx.state === "suspended") {
      ctx.resume();
    }
  }, [isActive, isMuted, volumeLevel, activeSection, isAbsoluteEnd, isInitialized]);

  // Clean up Web Audio node instances on unmount
  useEffect(() => {
    return () => {
      try {
        if (sourceNodeRef.current) {
          sourceNodeRef.current.stop();
        }
        if (oscillatorNodeRef.current) {
          oscillatorNodeRef.current.stop();
        }
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      } catch (e) {
        // Silently skip disposal errors
      }
    };
  }, []);

  return null; // Purely audio logic component
}

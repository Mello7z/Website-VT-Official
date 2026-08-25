import React, { useEffect, useRef } from "react";

interface GlitchDustCanvasProps {
  isPlaying?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  flickerSpeed: number;
  color: string;
  isGlitch: boolean;
  glitchTimer: number;
}

export default function GlitchDustCanvas({ isPlaying = false }: GlitchDustCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    window.addEventListener("resize", updateDimensions);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      mouseRef.current.x = mouseX;
      mouseRef.current.y = mouseY;
      mouseRef.current.active = isInside;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle Palette
    const COLORS = [
      "rgba(208, 178, 255,", // #D0B2FF Light Lavender
      "rgba(168, 115, 255,", // Bright Purple
      "rgba(234, 216, 255,", // Pale Lilac
      "rgba(255, 255, 255,", // Neon White
      "rgba(239, 68, 68,",   // Occasional Corrupted Red
      "rgba(6, 182, 212,",   // Cyber Cyan
    ];

    const PARTICLE_COUNT = Math.min(80, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const isRedOrCyan = Math.random() < 0.08;
      const colorBase = isRedOrCyan
        ? Math.random() < 0.5
          ? COLORS[4]
          : COLORS[5]
        : COLORS[Math.floor(Math.random() * 4)];

      const baseAlpha = Math.random() * 0.5 + 0.15;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.1, // Slow upward drift
        size: Math.random() * 2 + 0.8,
        alpha: baseAlpha,
        baseAlpha,
        flickerSpeed: Math.random() * 0.05 + 0.01,
        color: colorBase,
        isGlitch: Math.random() < 0.05,
        glitchTimer: 0,
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const speedMultiplier = isPlaying ? 1.6 : 1.0;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion update with gentle sine wave wobble
        p.x += (p.vx + Math.sin(time + i) * 0.15) * speedMultiplier;
        p.y += (p.vy - (isPlaying ? 0.2 : 0)) * speedMultiplier;

        // Mouse influence (repulsion + aura expansion)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 140;

          if (distSq < maxDist * maxDist && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 1.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.alpha = Math.min(1, p.baseAlpha + (1 - dist / maxDist) * 0.6);
          }
        }

        // Flicker effect
        p.alpha += Math.sin(time * 10 + i) * p.flickerSpeed;
        const currentAlpha = Math.max(0.05, Math.min(0.9, p.alpha));

        // Occasional Glitch Shift (horizontal line skip)
        let renderX = p.x;
        let renderY = p.y;
        if (p.isGlitch && Math.random() < 0.03) {
          renderX += (Math.random() - 0.5) * 18;
          ctx.fillStyle = `rgba(208, 178, 255, ${currentAlpha * 0.8})`;
          ctx.fillRect(renderX - 4, renderY, p.size * 3, 1);
        }

        // Screen wrap
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle dot with soft ambient glow
        ctx.save();
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.shadowColor = p.color.includes("239")
          ? "rgba(239, 68, 68, 0.8)"
          : "rgba(208, 178, 255, 0.6)";
        ctx.shadowBlur = p.size > 1.8 || isPlaying ? 8 : 3;

        ctx.beginPath();
        if (p.isGlitch && Math.random() < 0.1) {
          // Square pixel glitch particle
          ctx.fillRect(renderX, renderY, p.size * 1.4, p.size * 1.4);
        } else {
          ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70 transition-opacity duration-1000 rounded-3xl"
      aria-hidden="true"
    />
  );
}

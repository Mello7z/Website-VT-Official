import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface ScrambleTextProps {
  text: string;
  trigger: boolean;
  duration?: number;
  baseColor?: string;
}

interface LetterState {
  id: number;
  char: string;
  origChar: string;
  driftX: number;
  driftY: number;
  rotate: number;
  scale: number;
  opacity: number;
  color: string;
}

export default function ScrambleText({ text, trigger, duration = 800, baseColor = "#F5F5F5" }: ScrambleTextProps) {
  const [letters, setLetters] = useState<LetterState[]>([]);

  // 1. Initialize and synchronize letters whenever string text changes
  useEffect(() => {
    const chars = text.split("");
    setLetters(
      chars.map((char, index) => ({
        id: index,
        char: char,
        origChar: char,
        driftX: 0,
        driftY: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        color: baseColor,
      }))
    );
  }, [text, baseColor]);

  // 2. High-intensity scramble sequence on selection/hover trigger
  useEffect(() => {
    if (!trigger) {
      // Revert completely to pristine aligned ice-white/baseColor state
      const chars = text.split("");
      setLetters(
        chars.map((char, index) => ({
          id: index,
          char: char,
          origChar: char,
          driftX: 0,
          driftY: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          color: baseColor,
        }))
      );
      return;
    }

    const chars = text.split("");
    let tick = 0;
    const maxTicks = 12;
    const glitchSymbols = "✦۞✶◌_X!%@#710[]&†‡☠§¶";

    const interval = setInterval(() => {
      setLetters((prev) =>
        prev.map((l, index) => {
          if (index >= chars.length) return l;
          const targetChar = chars[index];
          const isDone = tick > 8;

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
              color: baseColor,
            };
          }

          // Randomly substitute character under active corruption
          const isScrambled = Math.random() < 0.45;
          const randomChar = isScrambled
            ? glitchSymbols[Math.floor(Math.random() * glitchSymbols.length)]
            : targetChar;

          // Destabilize layout dimensions (sliding & rotation offsets)
          const driftX = Math.random() * 12 - 6;
          const driftY = Math.random() * 8 - 4;
          const rotate = Math.random() * 14 - 7;
          const scale = 0.9 + Math.random() * 0.22;
          const opacity = 0.6 + Math.random() * 0.4;

          // Select from cinematic physical horror colors (VILLAFAN brand)
          const colors = [baseColor, "#7A0000", "#A30000", "#4B1E6D", "#8B5CF6", "#7A7A7A"];
          const color = colors[Math.floor(Math.random() * colors.length)];

          return {
            ...l,
            char: randomChar,
            driftX,
            driftY,
            rotate,
            scale,
            opacity,
            color,
          };
        })
      );

      tick++;
      if (tick >= maxTicks) {
        clearInterval(interval);
        // Settle back
        setLetters(
          chars.map((char, index) => ({
            id: index,
            char: char,
            origChar: char,
            driftX: 0,
            driftY: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            color: baseColor,
          }))
        );
      }
    }, 45);

    return () => clearInterval(interval);
  }, [trigger, text, baseColor]);

  // 3. Constant slow-frequency ambient tremor to keep the text alive, breathing & haunted
  useEffect(() => {
    // When actively hovered/triggered, continuous unsettling runs frequently
    const delay = trigger ? 500 : 2400;

    const ambientInterval = setInterval(() => {
      setLetters((prev) =>
        prev.map((l) => {
          // Calculate individual letter instability risk
          const shouldUnsettle = trigger ? Math.random() < 0.4 : Math.random() < 0.05;

          if (!shouldUnsettle) {
            // Gradually realign to pristine baseline coordinates
            return {
              ...l,
              char: l.origChar,
              driftX: l.driftX * 0.65,
              driftY: l.driftY * 0.65,
              rotate: l.rotate * 0.65,
              scale: l.scale * 0.8 + 0.2,
              opacity: l.opacity * 0.8 + 0.2,
              color: l.color === baseColor ? baseColor : Math.random() < 0.25 ? baseColor : l.color,
            };
          }

          // Unsettling variables based on interactive focus
          const driftMaxX = trigger ? 7 : 1.5;
          const driftMaxY = trigger ? 5 : 1;
          const rotateMax = trigger ? 10 : 2.5;

          const driftX = Math.random() * (driftMaxX * 2) - driftMaxX;
          const driftY = Math.random() * (driftMaxY * 2) - driftMaxY;
          const rotate = Math.random() * (rotateMax * 2) - rotateMax;
          const scale = 0.93 + Math.random() * 0.14;
          const opacity = 0.85 + Math.random() * 0.15;

          // Colors matching the cinema palette
          let color = l.color;
          if (trigger) {
            const hPalette = ["#7A0000", "#A30000", "#4B1E6D", "#8B5CF6", "#7A7A7A", baseColor];
            color = hPalette[Math.floor(Math.random() * hPalette.length)];
          }

          // Occasional micro text substitution for high sensory detail
          const shouldScrambleChar = trigger && Math.random() < 0.15;
          const currentSymbols = "✦۞✶_X%☠";
          const char = shouldScrambleChar
            ? currentSymbols[Math.floor(Math.random() * currentSymbols.length)]
            : l.origChar;

          return {
            ...l,
            char,
            driftX,
            driftY,
            rotate,
            scale,
            opacity,
            color,
          };
        })
      );
    }, delay);

    return () => clearInterval(ambientInterval);
  }, [trigger, text, baseColor]);

  return (
    <span className="inline-flex flex-wrap items-center notranslate" translate="no">
      {letters.map((l) => (
        <motion.span
          key={`${l.id}-${l.origChar}`}
          animate={{
            x: l.driftX,
            y: l.driftY,
            rotate: l.rotate,
            scale: l.scale,
            opacity: l.opacity,
            color: l.color,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 12,
            mass: 0.5,
          }}
          className="inline-block whitespace-pre select-none origin-center"
          style={{
            textShadow: l.color !== "#F5F5F5" && l.color !== "#7A7A7A" ? `0px 0px 8px ${l.color}40` : "none",
          }}
        >
          {l.char}
        </motion.span>
      ))}
    </span>
  );
}


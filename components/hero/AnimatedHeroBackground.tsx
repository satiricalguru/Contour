/**
 * AnimatedHeroBackground — A high-performance, real-time procedural canvas animation.
 * Features 5-second automatic palette cycling with continuous real-time color lerping (morphing)
 * for a silky-smooth background transition.
 */
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { PALETTES, PaletteDef } from '@/data/palettes';
import { interpolateRamp, parseHex, lerpRGB, toHex, RGB } from '@/lib/engine/color';

export function AnimatedHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paletteIndex, setPaletteIndex] = useState(0);

  const targetPalette: PaletteDef = PALETTES[paletteIndex] ?? PALETTES[0];
  const targetRampRef = useRef<RGB[]>([]);

  const nextPalette = useCallback(() => {
    setPaletteIndex((prev) => (prev + 1) % PALETTES.length);
  }, []);

  // Update target ramp ref when target palette changes
  useEffect(() => {
    targetRampRef.current = interpolateRamp(targetPalette.anchors, 10).map(parseHex);
  }, [targetPalette.anchors]);

  // 5-second automatic atmosphere cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setPaletteIndex((prev) => (prev + 1) % PALETTES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Target ramp colors
    const targetRamp = interpolateRamp(targetPalette.anchors, 10).map(parseHex);
    targetRampRef.current = targetRamp;
    // Current animated ramp colors (initialized to target)
    const activeColors: RGB[] = targetRamp.map((c) => ({ ...c }));

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.008; // smooth slow wave progression
      const w = canvas.width;
      const h = canvas.height;

      const currentTargets = targetRampRef.current;

      // Smoothly morph active colors towards target colors (lerp 0.03 per frame)
      for (let i = 0; i < activeColors.length; i++) {
        const target = currentTargets[i] || currentTargets[currentTargets.length - 1] || activeColors[i];
        activeColors[i] = lerpRGB(activeColors[i], target, 0.03);
      }

      // Base fill
      ctx.fillStyle = toHex(activeColors[0]);
      ctx.fillRect(0, 0, w, h);

      // Render 6 animated flowing wave contours back-to-front
      const layers = 6;
      for (let l = 0; l < layers; l++) {
        const layerRatio = (l + 1) / layers;
        const colorIdx = Math.min(
          Math.floor(layerRatio * (activeColors.length - 1)) + 1,
          activeColors.length - 1,
        );

        ctx.fillStyle = toHex(activeColors[colorIdx]);
        ctx.beginPath();
        ctx.moveTo(0, h);

        const baseY = h * (0.35 + layerRatio * 0.5);
        const amplitude = h * (0.08 + Math.sin(time * 0.5 + l) * 0.02);
        const frequency = 0.002 + l * 0.0006;
        const phase = time * (0.6 + l * 0.15) + l * 1.5;

        for (let x = 0; x <= w; x += 15) {
          const y1 = Math.sin(x * frequency + phase) * amplitude;
          const y2 = Math.cos(x * frequency * 1.8 - phase * 0.7) * (amplitude * 0.5);
          const y3 = Math.sin(x * frequency * 0.5 + phase * 1.2) * (amplitude * 0.8);
          const y = baseY + y1 + y2 + y3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      }

      // Soft ambient light particles floating upwards
      const particleCount = 20;
      for (let p = 0; p < particleCount; p++) {
        const pt = (time * 0.2 + p / particleCount) % 1;
        const px = (Math.sin(p * 10 + time * 0.3) * 0.5 + 0.5) * w;
        const py = (1 - pt) * h;
        const pSize = (Math.sin(pt * Math.PI) * 12 + 4) * (w / 1000);
        const pColor = activeColors[Math.min(p % activeColors.length, activeColors.length - 1)];

        ctx.fillStyle = `rgba(${pColor.r}, ${pColor.g}, ${pColor.b}, ${0.15 * Math.sin(pt * Math.PI)})`;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- canvas animation loop runs continuously for the lifetime of the component

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-1000 opacity-60"
      />
      {/* Vignette and Gradient Overlay adapting to theme CSS variables */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/60 to-[var(--background)]" />

      {/* Interactivity trigger floating pill button */}
      <div className="absolute bottom-6 right-6 pointer-events-auto z-10">
        <button
          onClick={nextPalette}
          className="flex items-center gap-2 text-xs font-medium text-inherit bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] hover:opacity-90 px-3.5 py-2 rounded-full shadow-lg transition-all duration-300 group"
          title="Change background atmosphere (Auto-cycles every 5s)"
        >
          <span
            className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
            style={{ backgroundColor: targetPalette.anchors[2] || '#6fc8e0' }}
          />
          Atmosphere: <span className="font-semibold">{targetPalette.name}</span>
        </button>
      </div>
    </div>
  );
}

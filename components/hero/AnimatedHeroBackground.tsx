/**
 * AnimatedHeroBackground — Apple-style multicolor aurora wave animation.
 * Adapts seamlessly between Dark mode (luminous glowing neon waves on dark canvas)
 * and Light mode (soft pastel fluid waves on light canvas).
 */
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { PALETTES, PaletteDef } from '@/data/palettes';
import { interpolateRamp, parseHex, lerpRGB, RGB } from '@/lib/engine/color';

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
    targetRampRef.current = interpolateRamp(targetPalette.anchors, 12).map(parseHex);
  }, [targetPalette.anchors]);

  // 8-second automatic atmosphere cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setPaletteIndex((prev) => (prev + 1) % PALETTES.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Initialize active color ramp
    const targetRamp = interpolateRamp(targetPalette.anchors, 12).map(parseHex);
    targetRampRef.current = targetRamp;
    const activeColors: RGB[] = targetRamp.map((c) => ({ ...c }));

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Aurora ribbon configuration
    const ribbonCount = 5;
    const ribbonConfigs = Array.from({ length: ribbonCount }, (_, i) => ({
      yCenter: 0.4 + (i / ribbonCount) * 0.35,        // vertically distributed
      amplitude: 0.06 + Math.random() * 0.04,          // wave height
      frequency: 0.0015 + i * 0.0004,                  // wave frequency
      speed: 0.3 + i * 0.12,                            // wave speed
      phase: (i * Math.PI * 2) / ribbonCount,           // phase offset
      thickness: 60 + Math.random() * 80,               // ribbon thickness
      opacity: 0.25 + Math.random() * 0.15,             // base opacity
      colorOffset: Math.floor((i / ribbonCount) * 8) + 2, // color index offset
    }));

    const render = () => {
      time += 0.006;
      const w = canvas.width;
      const h = canvas.height;

      const isLight = document.documentElement.classList.contains('light-theme');

      const currentTargets = targetRampRef.current;

      // Smoothly morph active colors towards target (lerp 0.02 per frame for buttery transitions)
      for (let i = 0; i < activeColors.length; i++) {
        const target = currentTargets[i] || currentTargets[currentTargets.length - 1] || activeColors[i];
        activeColors[i] = lerpRGB(activeColors[i], target, 0.02);
      }

      // Fill canvas background according to theme
      ctx.fillStyle = isLight ? '#f8fafc' : '#000000';
      ctx.fillRect(0, 0, w, h);

      // Enable compositing: 'multiply' or 'source-over' for light mode, 'lighter' for dark mode glow
      ctx.globalCompositeOperation = isLight ? 'multiply' : 'lighter';

      // Render aurora ribbons
      for (let r = 0; r < ribbonCount; r++) {
        const cfg = ribbonConfigs[r];
        const colorIdx = Math.min(cfg.colorOffset, activeColors.length - 1);
        const color = activeColors[colorIdx];

        // Draw the flowing ribbon path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, h);

        // Build the ribbon wave shape
        const points: { x: number; y: number }[] = [];
        const step = 8;
        for (let x = 0; x <= w; x += step) {
          const normalX = x / w;
          const wave1 = Math.sin(x * cfg.frequency + time * cfg.speed + cfg.phase) * cfg.amplitude * h;
          const wave2 = Math.cos(x * cfg.frequency * 1.6 - time * cfg.speed * 0.7 + cfg.phase * 2) * cfg.amplitude * h * 0.4;
          const wave3 = Math.sin(x * cfg.frequency * 0.4 + time * cfg.speed * 1.3) * cfg.amplitude * h * 0.6;
          // Edge fade: ribbons fade near left/right edges
          const edgeFade = Math.sin(normalX * Math.PI);
          const y = cfg.yCenter * h + (wave1 + wave2 + wave3) * edgeFade;
          points.push({ x, y });
        }

        // Draw top edge of ribbon
        for (let i = 0; i < points.length; i++) {
          if (i === 0) ctx.moveTo(points[i].x, points[i].y - cfg.thickness / 2);
          else ctx.lineTo(points[i].x, points[i].y - cfg.thickness / 2);
        }
        // Draw bottom edge (reversed)
        for (let i = points.length - 1; i >= 0; i--) {
          ctx.lineTo(points[i].x, points[i].y + cfg.thickness / 2);
        }
        ctx.closePath();

        // Ribbon gradient fill
        const ribbonCenterY = cfg.yCenter * h;
        const ribbonGrad = ctx.createLinearGradient(0, ribbonCenterY - cfg.thickness, 0, ribbonCenterY + cfg.thickness);
        const alphaMul = isLight ? 0.35 : 1.0;
        ribbonGrad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        ribbonGrad.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${cfg.opacity * 0.6 * alphaMul})`);
        ribbonGrad.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${cfg.opacity * alphaMul})`);
        ribbonGrad.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${cfg.opacity * 0.6 * alphaMul})`);
        ribbonGrad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = ribbonGrad;
        ctx.filter = `blur(${Math.round(cfg.thickness * 0.4)}px)`;
        ctx.fill();
        ctx.restore();

        // Inner bright core line
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          if (i === 0) ctx.moveTo(points[i].x, points[i].y);
          else ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${cfg.opacity * (isLight ? 0.4 : 0.8)})`;
        ctx.lineWidth = isLight ? 1.5 : 2;
        ctx.filter = `blur(${Math.round(cfg.thickness * 0.15)}px)`;
        ctx.stroke();
        ctx.restore();
      }

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      // Ambient floating particles
      const particleCount = 15;
      for (let p = 0; p < particleCount; p++) {
        const pt = (time * 0.15 + p / particleCount) % 1;
        const px = (Math.sin(p * 7.3 + time * 0.2) * 0.5 + 0.5) * w;
        const py = (1 - pt) * h;
        const pSize = (Math.sin(pt * Math.PI) * 6 + 2) * (w / 1200);
        const pColor = activeColors[Math.min(p % activeColors.length, activeColors.length - 1)];

        ctx.globalCompositeOperation = isLight ? 'source-over' : 'lighter';
        ctx.fillStyle = `rgba(${pColor.r}, ${pColor.g}, ${pColor.b}, ${(isLight ? 0.08 : 0.12) * Math.sin(pt * Math.PI)})`;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
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
        className="w-full h-full object-cover transition-opacity duration-1000 opacity-80"
      />
      {/* Subtle top/bottom gradient fade into page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />

      {/* Interactivity trigger floating pill button */}
      <div className="absolute bottom-6 right-6 pointer-events-auto z-10">
        <button
          onClick={nextPalette}
          className="flex items-center gap-2 text-xs font-medium text-inherit bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] hover:opacity-90 px-3.5 py-2 rounded-full shadow-lg transition-all duration-300 group"
          title="Change background atmosphere (Auto-cycles every 8s)"
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

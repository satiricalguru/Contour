/**
 * AnimatedHeroBackground — Apple Siri AI / iOS 27 style multicolor fluid wave animation.
 * Recreates the vibrant, luminous neon light ribbons from Apple.com/os/ios
 * flowing continuously in the background behind the hero section.
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

    // Apple Siri AI Luminous Wave configuration (6 fluid, vibrant ribbons)
    const ribbonCount = 6;
    const ribbonConfigs = Array.from({ length: ribbonCount }, (_, i) => ({
      yCenter: 0.35 + (i / ribbonCount) * 0.4,          // vertically distributed across hero
      amplitude: 0.08 + (i % 3) * 0.03,                 // fluid wave height
      frequency: 0.0012 + i * 0.0003,                   // wave frequency
      speed: 0.4 + i * 0.15,                            // wave speed
      phase: (i * Math.PI * 2) / ribbonCount,           // phase offset
      thickness: 110 + (i % 4) * 35,                    // broad glowing ribbon thickness
      opacity: 0.55 + (i % 3) * 0.1,                    // vibrant base opacity for high visibility
      colorOffset: Math.floor((i / ribbonCount) * 10),  // color index offset
    }));

    const render = () => {
      time += 0.008;
      const w = canvas.width;
      const h = canvas.height;

      const isLight = document.documentElement.classList.contains('light-theme');

      const currentTargets = targetRampRef.current;

      // Smoothly morph active colors towards target (lerp 0.025 per frame)
      for (let i = 0; i < activeColors.length; i++) {
        const target = currentTargets[i] || currentTargets[currentTargets.length - 1] || activeColors[i];
        activeColors[i] = lerpRGB(activeColors[i], target, 0.025);
      }

      // Base background fill
      ctx.fillStyle = isLight ? '#f8fafc' : '#040406';
      ctx.fillRect(0, 0, w, h);

      // Enable additive blending for luminous Apple neon glow in dark mode
      ctx.globalCompositeOperation = isLight ? 'multiply' : 'lighter';

      // Render Apple Siri AI fluid glowing wave ribbons
      for (let r = 0; r < ribbonCount; r++) {
        const cfg = ribbonConfigs[r];
        const colorIdx = Math.min(cfg.colorOffset, activeColors.length - 1);
        const color = activeColors[colorIdx];

        // Draw flowing fluid wave path
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, h);

        const points: { x: number; y: number }[] = [];
        const step = 6;
        for (let x = 0; x <= w; x += step) {
          const normalX = x / w;
          const wave1 = Math.sin(x * cfg.frequency + time * cfg.speed + cfg.phase) * cfg.amplitude * h;
          const wave2 = Math.cos(x * cfg.frequency * 1.8 - time * cfg.speed * 0.8 + cfg.phase * 2) * cfg.amplitude * h * 0.5;
          const wave3 = Math.sin(x * cfg.frequency * 0.5 + time * cfg.speed * 1.4) * cfg.amplitude * h * 0.4;
          // Edge fade: ribbons gracefully taper near viewport edges
          const edgeFade = Math.sin(normalX * Math.PI);
          const y = cfg.yCenter * h + (wave1 + wave2 + wave3) * edgeFade;
          points.push({ x, y });
        }

        // Top contour
        for (let i = 0; i < points.length; i++) {
          if (i === 0) ctx.moveTo(points[i].x, points[i].y - cfg.thickness / 2);
          else ctx.lineTo(points[i].x, points[i].y - cfg.thickness / 2);
        }
        // Bottom contour (reversed)
        for (let i = points.length - 1; i >= 0; i--) {
          ctx.lineTo(points[i].x, points[i].y + cfg.thickness / 2);
        }
        ctx.closePath();

        // Vibrant gradient fill (bright center glow, soft transparent edges)
        const ribbonCenterY = cfg.yCenter * h;
        const ribbonGrad = ctx.createLinearGradient(0, ribbonCenterY - cfg.thickness, 0, ribbonCenterY + cfg.thickness);
        const alphaMul = isLight ? 0.45 : 0.85;

        ribbonGrad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        ribbonGrad.addColorStop(0.25, `rgba(${color.r}, ${color.g}, ${color.b}, ${cfg.opacity * 0.7 * alphaMul})`);
        ribbonGrad.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${cfg.opacity * alphaMul})`);
        ribbonGrad.addColorStop(0.75, `rgba(${color.r}, ${color.g}, ${color.b}, ${cfg.opacity * 0.7 * alphaMul})`);
        ribbonGrad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = ribbonGrad;
        ctx.filter = `blur(${Math.round(cfg.thickness * 0.35)}px)`;
        ctx.fill();
        ctx.restore();

        // High-luminance inner core light ray (Apple Siri light effect)
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          if (i === 0) ctx.moveTo(points[i].x, points[i].y);
          else ctx.lineTo(points[i].x, points[i].y);
        }
        const coreBrightR = Math.min(color.r + 70, 255);
        const coreBrightG = Math.min(color.g + 70, 255);
        const coreBrightB = Math.min(color.b + 70, 255);
        ctx.strokeStyle = `rgba(${coreBrightR}, ${coreBrightG}, ${coreBrightB}, ${cfg.opacity * (isLight ? 0.6 : 0.95)})`;
        ctx.lineWidth = isLight ? 2 : 3.5;
        ctx.filter = `blur(${Math.round(cfg.thickness * 0.12)}px)`;
        ctx.stroke();
        ctx.restore();
      }

      // Reset composite mode
      ctx.globalCompositeOperation = 'source-over';

      // Floating ambient light particles
      const particleCount = 20;
      for (let p = 0; p < particleCount; p++) {
        const pt = (time * 0.12 + p / particleCount) % 1;
        const px = (Math.sin(p * 7.3 + time * 0.25) * 0.5 + 0.5) * w;
        const py = (1 - pt) * h;
        const pSize = (Math.sin(pt * Math.PI) * 8 + 3) * (w / 1100);
        const pColor = activeColors[Math.min(p % activeColors.length, activeColors.length - 1)];

        ctx.globalCompositeOperation = isLight ? 'source-over' : 'lighter';
        ctx.fillStyle = `rgba(${pColor.r}, ${pColor.g}, ${pColor.b}, ${(isLight ? 0.12 : 0.22) * Math.sin(pt * Math.PI)})`;
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- canvas animation loop runs continuously

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-1000 opacity-95"
      />
      {/* Soft gradient fade into page content below */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)] opacity-60 pointer-events-none" />

      {/* Atmosphere toggle floating pill button */}
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

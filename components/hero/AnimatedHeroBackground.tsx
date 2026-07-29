/**
 * AnimatedHeroBackground — Apple iOS-style 3D floating Apple devices & multicolor aurora wave canvas.
 * Inspired by the Apple.com/in/os/ios hero video animation featuring MacBook Pro, iPad Pro,
 * iPhone 17 Pro, and Apple Watch Ultra 2 floating in dark 3D space with live generative wallpaper displays.
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
      yCenter: 0.35 + (i / ribbonCount) * 0.4,
      amplitude: 0.05 + Math.random() * 0.04,
      frequency: 0.0012 + i * 0.0004,
      speed: 0.25 + i * 0.1,
      phase: (i * Math.PI * 2) / ribbonCount,
      thickness: 70 + Math.random() * 70,
      opacity: 0.22 + Math.random() * 0.15,
      colorOffset: Math.floor((i / ribbonCount) * 8) + 2,
    }));

    // Helper: draw rounded rectangle
    const drawRoundRect = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      c.beginPath();
      c.moveTo(x + radius, y);
      c.lineTo(x + width - radius, y);
      c.arcTo(x + width, y, x + width, y + radius, radius);
      c.lineTo(x + width, y + height - radius);
      c.arcTo(x + width, y + height, x + width - radius, y + height, radius);
      c.lineTo(x + radius, y + height);
      c.arcTo(x, y + height, x, y + height - radius, radius);
      c.lineTo(x, y + radius);
      c.arcTo(x, y, x + radius, y, radius);
      c.closePath();
    };

    // Helper: draw procedural generative wallpaper inside a device screen
    const drawDeviceWallpaper = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      seedOffset: number,
      t: number
    ) => {
      c.save();
      // Clip to screen bounds
      c.beginPath();
      c.rect(x, y, w, h);
      c.clip();

      // Screen base background gradient
      const c1 = activeColors[(seedOffset) % activeColors.length];
      const c2 = activeColors[(seedOffset + 3) % activeColors.length];
      const c3 = activeColors[(seedOffset + 6) % activeColors.length];

      const grad = c.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0, `rgb(${c1.r}, ${c1.g}, ${c1.b})`);
      grad.addColorStop(0.5, `rgb(${c2.r}, ${c2.g}, ${c2.b})`);
      grad.addColorStop(1, `rgb(${c3.r}, ${c3.g}, ${c3.b})`);
      c.fillStyle = grad;
      c.fillRect(x, y, w, h);

      // Render 3 flowing procedural wave layers on screen
      const waveLayers = 3;
      for (let wl = 0; wl < waveLayers; wl++) {
        const wc = activeColors[(seedOffset + wl * 2 + 1) % activeColors.length];
        c.fillStyle = `rgba(${wc.r}, ${wc.g}, ${wc.b}, 0.65)`;
        c.beginPath();
        c.moveTo(x, y + h);

        const baseY = y + h * (0.4 + wl * 0.2);
        const waveAmp = h * 0.15;
        const waveFreq = 0.025 + wl * 0.01;
        const wavePhase = t * (0.8 + wl * 0.3) + seedOffset;

        for (let px = 0; px <= w; px += 4) {
          const py = baseY + Math.sin(px * waveFreq + wavePhase) * waveAmp;
          c.lineTo(x + px, py);
        }
        c.lineTo(x + w, y + h);
        c.closePath();
        c.fill();
      }

      // Glossy glass diagonal glare
      const glareGrad = c.createLinearGradient(x, y, x + w * 0.6, y + h * 0.6);
      glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      glareGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
      glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      c.fillStyle = glareGrad;
      c.fillRect(x, y, w, h);

      c.restore();
    };

    const render = () => {
      time += 0.006;
      const w = canvas.width;
      const h = canvas.height;

      const isLight = document.documentElement.classList.contains('light-theme');
      const currentTargets = targetRampRef.current;

      // Morph active colors towards target
      for (let i = 0; i < activeColors.length; i++) {
        const target = currentTargets[i] || currentTargets[currentTargets.length - 1] || activeColors[i];
        activeColors[i] = lerpRGB(activeColors[i], target, 0.02);
      }

      // Background fill
      ctx.fillStyle = isLight ? '#f8fafc' : '#000000';
      ctx.fillRect(0, 0, w, h);

      // Aurora wave composite
      ctx.globalCompositeOperation = isLight ? 'multiply' : 'lighter';

      // 1. RENDER AURORA RIBBONS
      for (let r = 0; r < ribbonCount; r++) {
        const cfg = ribbonConfigs[r];
        const colorIdx = Math.min(cfg.colorOffset, activeColors.length - 1);
        const color = activeColors[colorIdx];

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, h);

        const points: { x: number; y: number }[] = [];
        const step = 10;
        for (let x = 0; x <= w; x += step) {
          const normalX = x / w;
          const wave1 = Math.sin(x * cfg.frequency + time * cfg.speed + cfg.phase) * cfg.amplitude * h;
          const wave2 = Math.cos(x * cfg.frequency * 1.6 - time * cfg.speed * 0.7 + cfg.phase * 2) * cfg.amplitude * h * 0.4;
          const wave3 = Math.sin(x * cfg.frequency * 0.4 + time * cfg.speed * 1.3) * cfg.amplitude * h * 0.6;
          const edgeFade = Math.sin(normalX * Math.PI);
          const y = cfg.yCenter * h + (wave1 + wave2 + wave3) * edgeFade;
          points.push({ x, y });
        }

        for (let i = 0; i < points.length; i++) {
          if (i === 0) ctx.moveTo(points[i].x, points[i].y - cfg.thickness / 2);
          else ctx.lineTo(points[i].x, points[i].y - cfg.thickness / 2);
        }
        for (let i = points.length - 1; i >= 0; i--) {
          ctx.lineTo(points[i].x, points[i].y + cfg.thickness / 2);
        }
        ctx.closePath();

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
      }

      ctx.globalCompositeOperation = 'source-over';

      // 2. RENDER FLOATING APPLE DEVICES (Apple.com/in/os/ios style)
      // Devices float gently with sinusoidal physics
      const scaleBase = Math.min(w, h) / 1000;

      // Floating Devices Spec (MacBook Pro, iPad Pro, iPhone 17 Pro, Apple Watch Ultra 2)
      const devices = [
        {
          // MacBook Pro 14" (Top Left)
          name: 'macbook',
          aspect: 1.54,
          width: 280 * scaleBase,
          x: w * 0.12,
          yBase: h * 0.28,
          floatAmp: 14 * scaleBase,
          floatSpeed: 0.7,
          floatPhase: 0,
          rotation: -0.06,
          radius: 12 * scaleBase,
          bezel: 10 * scaleBase,
          hasNotch: true,
          seedOffset: 0,
          opacity: isLight ? 0.85 : 0.75,
        },
        {
          // iPad Pro 11" (Top Right)
          name: 'ipad',
          aspect: 1.41,
          width: 210 * scaleBase,
          x: w * 0.82,
          yBase: h * 0.22,
          floatAmp: 16 * scaleBase,
          floatSpeed: 0.6,
          floatPhase: 1.8,
          rotation: 0.08,
          radius: 14 * scaleBase,
          bezel: 8 * scaleBase,
          hasNotch: false,
          seedOffset: 2,
          opacity: isLight ? 0.85 : 0.75,
        },
        {
          // iPhone 17 Pro (Middle Right)
          name: 'iphone',
          aspect: 0.46,
          width: 105 * scaleBase,
          x: w * 0.87,
          yBase: h * 0.62,
          floatAmp: 18 * scaleBase,
          floatSpeed: 0.8,
          floatPhase: 3.5,
          rotation: -0.05,
          radius: 20 * scaleBase,
          bezel: 6 * scaleBase,
          hasDynamicIsland: true,
          seedOffset: 4,
          opacity: isLight ? 0.9 : 0.8,
        },
        {
          // Apple Watch Ultra 2 (Bottom Left)
          name: 'watch',
          aspect: 0.81,
          width: 80 * scaleBase,
          x: w * 0.14,
          yBase: h * 0.68,
          floatAmp: 12 * scaleBase,
          floatSpeed: 0.9,
          floatPhase: 5.0,
          rotation: 0.07,
          radius: 22 * scaleBase,
          bezel: 7 * scaleBase,
          seedOffset: 6,
          opacity: isLight ? 0.9 : 0.8,
        },
      ];

      for (const dev of devices) {
        ctx.save();

        const floatY = dev.yBase + Math.sin(time * dev.floatSpeed + dev.floatPhase) * dev.floatAmp;
        const devH = dev.width / dev.aspect;

        ctx.translate(dev.x, floatY);
        ctx.rotate(dev.rotation);
        ctx.globalAlpha = dev.opacity;

        // Device Outer Shadow
        ctx.shadowColor = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 24 * scaleBase;
        ctx.shadowOffsetY = 12 * scaleBase;

        // Outer Metallic Chassis Frame
        ctx.fillStyle = isLight ? '#e2e8f0' : '#1e293b';
        ctx.strokeStyle = isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, -dev.width / 2, -devH / 2, dev.width, devH, dev.radius);
        ctx.fill();
        ctx.stroke();

        // Reset shadow for internal screen render
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Inner Screen Box
        const screenX = -dev.width / 2 + dev.bezel;
        const screenY = -devH / 2 + dev.bezel;
        const screenW = dev.width - dev.bezel * 2;
        const screenH = devH - dev.bezel * 2;
        const screenR = Math.max(DevRadiusToScreen(dev.radius, dev.bezel), 2);

        // Screen bezel black fill
        ctx.fillStyle = '#000000';
        drawRoundRect(ctx, screenX, screenY, screenW, screenH, screenR);
        ctx.fill();

        // Draw Live Generative Wallpaper inside Screen
        drawDeviceWallpaper(
          ctx,
          screenX,
          screenY,
          screenW,
          screenH,
          dev.seedOffset,
          time
        );

        // Draw Device Cutout (Notch or Dynamic Island)
        if (dev.hasNotch) {
          const notchW = screenW * 0.18;
          const notchH = screenH * 0.05;
          ctx.fillStyle = '#000000';
          drawRoundRect(ctx, -notchW / 2, screenY, notchW, notchH, 3);
          ctx.fill();
        } else if (dev.hasDynamicIsland) {
          const islandW = screenW * 0.32;
          const islandH = screenH * 0.035;
          ctx.fillStyle = '#000000';
          drawRoundRect(ctx, -islandW / 2, screenY + screenH * 0.02, islandW, islandH, islandH / 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Helper function for corner radius calculation
      function DevRadiusToScreen(r: number, b: number) {
        return Math.max(r - b, 2);
      }

      // 3. AMBIENT PARTICLES
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-1000 opacity-80"
      />
      {/* Subtle top/bottom gradient fade into page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />

      {/* Atmosphere control button */}
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

/**
 * HeroFeatureStage — Premium device showcase with Apple-grade floating
 * hardware mockups. Displays 4 device categories side-by-side with
 * cross-fade transitions and 6-second automatic pattern cycling.
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DeviceFrame } from '@/components/device-frame/DeviceFrame';
import { WallpaperCanvas } from '@/components/WallpaperCanvas';
import { getDeviceById } from '@/lib/devices';
import { PATTERNS } from '@/lib/engine/patterns';
import { PALETTES } from '@/data/palettes';

export function HeroFeatureStage() {
  const [patternIdx, setPatternIdx] = useState(0);
  const [paletteIdx, setPaletteIdx] = useState(18); // Glacier
  const [seed, setSeed] = useState(42);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const macDevice = getDeviceById('macbook-pro-14');
  const padDevice = getDeviceById('ipad-pro-11');
  const phoneDevice = getDeviceById('iphone-17-pro');
  const watchDevice = getDeviceById('apple-watch-ultra-2');

  const cycleRandom = useCallback(() => {
    setIsTransitioning(true);

    setTimeout(() => {
      setPatternIdx((prev) => (prev + 1) % PATTERNS.length);
      setPaletteIdx((prev) => (prev + 3) % PALETTES.length);
      setSeed((prev) => Math.floor((prev + 1337) % 99999) + 1);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 400);
  }, []);

  // 6-second automatic transition timer
  useEffect(() => {
    const timer = setInterval(() => {
      cycleRandom();
    }, 6000);

    return () => clearInterval(timer);
  }, [cycleRandom]);

  const currentPattern = PATTERNS[patternIdx];
  const currentPalette = PALETTES[paletteIdx];

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-12 mb-4 px-2 sm:px-4">
      {/* Glow aura behind stage */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-[100px] opacity-15 pointer-events-none rounded-full transition-colors duration-[2000ms]"
        style={{
          backgroundColor: currentPalette.anchors[2] || '#6fc8e0',
        }}
      />

      {/* 4-Device Side-by-Side Showcase */}
      <div className="relative flex flex-col md:flex-row items-end justify-center gap-6 md:gap-5 lg:gap-8 pt-4 pb-3">
        {/* 1. MacBook Pro 14" */}
        <div className="w-full md:w-[40%] max-w-md transition-all duration-700 hover:scale-[1.015] flex flex-col items-center gap-4">
          {macDevice && (
            <DeviceFrame device={macDevice} inverted={true}>
              <div
                className={`w-full h-full transition-all duration-600 ${
                  isTransitioning ? 'opacity-20 blur-sm scale-[1.02]' : 'opacity-100 blur-none scale-100'
                }`}
              >
                <WallpaperCanvas
                  patternId={currentPattern.id}
                  paletteId={currentPalette.id}
                  seed={seed}
                  inverted={true}
                  width={1200}
                  height={780}
                />
              </div>
            </DeviceFrame>
          )}
          <span className="text-[11px] font-medium text-white/50 tracking-wide">
            MacBook Pro 14″
          </span>
        </div>

        {/* 2. iPad Pro 11" */}
        <div className="w-52 sm:w-60 md:w-[24%] max-w-xs transition-all duration-700 hover:scale-[1.02] flex flex-col items-center gap-4">
          {padDevice && (
            <DeviceFrame device={padDevice} inverted={true}>
              <div
                className={`w-full h-full transition-all duration-600 ${
                  isTransitioning ? 'opacity-20 blur-sm scale-[1.02]' : 'opacity-100 blur-none scale-100'
                }`}
              >
                <WallpaperCanvas
                  patternId={currentPattern.id}
                  paletteId={currentPalette.id}
                  seed={seed + 2}
                  inverted={true}
                  width={800}
                  height={550}
                />
              </div>
            </DeviceFrame>
          )}
          <span className="text-[11px] font-medium text-white/50 tracking-wide">
            iPad Pro 11″
          </span>
        </div>

        {/* 3. iPhone 17 Pro */}
        <div className="w-36 sm:w-44 md:w-[18%] max-w-[180px] transition-all duration-700 hover:scale-[1.02] flex flex-col items-center gap-4">
          {phoneDevice && (
            <DeviceFrame device={phoneDevice} inverted={true}>
              <div
                className={`w-full h-full transition-all duration-600 ${
                  isTransitioning ? 'opacity-20 blur-sm scale-[1.02]' : 'opacity-100 blur-none scale-100'
                }`}
              >
                <WallpaperCanvas
                  patternId={currentPattern.id}
                  paletteId={currentPalette.id}
                  seed={seed + 1}
                  inverted={true}
                  width={600}
                  height={1300}
                />
              </div>
            </DeviceFrame>
          )}
          <span className="text-[11px] font-medium text-white/50 tracking-wide">
            iPhone 17 Pro
          </span>
        </div>

        {/* 4. Apple Watch Ultra 2 */}
        <div className="w-28 sm:w-36 md:w-[14%] max-w-[140px] transition-all duration-700 hover:scale-[1.02] flex flex-col items-center gap-4">
          {watchDevice && (
            <DeviceFrame device={watchDevice} inverted={true}>
              <div
                className={`w-full h-full transition-all duration-600 ${
                  isTransitioning ? 'opacity-20 blur-sm scale-[1.02]' : 'opacity-100 blur-none scale-100'
                }`}
              >
                <WallpaperCanvas
                  patternId={currentPattern.id}
                  paletteId={currentPalette.id}
                  seed={seed + 3}
                  inverted={true}
                  width={410}
                  height={502}
                />
              </div>
            </DeviceFrame>
          )}
          <span className="text-[11px] font-medium text-white/50 tracking-wide">
            Watch Ultra 2
          </span>
        </div>
      </div>

      {/* Floating control bar — minimal, refined */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 bg-white/[0.05] backdrop-blur-3xl border border-white/[0.08] rounded-full p-2.5 px-6 mt-8 shadow-2xl shadow-black/50 max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/30" />
          <div className="text-left">
            <div className="text-[11px] font-medium text-white/80 tracking-tight">
              {currentPattern.name}
            </div>
            <div className="text-[10px] text-white/35 font-mono">
              {currentPalette.name} · #{seed}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={cycleRandom}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white/90 bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 rounded-full transition-all duration-200"
            title="Auto-cycles every 6 seconds"
          >
            <svg
              className={`w-3 h-3 transition-transform duration-500 ${
                isTransitioning ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.846a.75.75 0 00-.75.75v3.386a.75.75 0 001.5 0V14.56l.238.238a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39c-.1.372-.236.728-.404 1.065l-.381.089zm.002-2.848a.75.75 0 00.734-.613A7 7 0 004.336 4.825l-.238-.238v1.654a.75.75 0 01-1.5 0V2.855a.75.75 0 01.75-.75h3.386a.75.75 0 010 1.5H4.301l.312.311a5.5 5.5 0 019.201-2.466.75.75 0 001.449.39c.1-.371.236-.727.404-1.064l.381-.089a.75.75 0 00-.734-.613z" clipRule="evenodd" />
            </svg>
            Shuffle
          </button>

          <Link
            href={`/studio?pattern=${currentPattern.id}&palette=${currentPalette.id}&seed=${seed}&inverted=true`}
            className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-semibold text-black bg-white hover:bg-white/90 active:scale-95 rounded-full transition-all duration-200 shadow-lg shadow-white/10"
          >
            Customize →
          </Link>
        </div>
      </div>
    </div>
  );
}

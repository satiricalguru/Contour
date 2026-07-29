/**
 * HeroFeatureStage — Floating interactive device stage showcased inside the Hero header.
 * Displays all 3 Apple hardware categories (MacBook Pro 14", iPad Pro 11", iPhone 17 Pro)
 * side-by-side with zero overlap, cross-fade transitions, and automatic 5-second pattern cycling.
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
    }, 400); // 400ms fade-out duration
  }, []);

  // 5-second automatic transition timer
  useEffect(() => {
    const timer = setInterval(() => {
      cycleRandom();
    }, 5000);

    return () => clearInterval(timer);
  }, [cycleRandom]);

  const currentPattern = PATTERNS[patternIdx];
  const currentPalette = PALETTES[paletteIdx];

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-8 mb-6 px-2 sm:px-4">
      {/* Glow aura behind stage */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 blur-3xl opacity-20 pointer-events-none rounded-full transition-colors duration-1000"
        style={{
          backgroundColor: currentPalette.anchors[2] || '#6fc8e0',
        }}
      />

      {/* 4-Device Side-by-Side Showcase (MacBook, iPad, iPhone, Apple Watch) */}
      <div className="relative flex flex-col md:flex-row items-end justify-center gap-6 md:gap-4 lg:gap-6 pt-4 pb-2">
        {/* 1. MacBook Pro 14" */}
        <div className="w-full md:w-[40%] max-w-md transition-all duration-500 hover:scale-[1.02] drop-shadow-2xl flex flex-col items-center gap-3">
          {macDevice && (
            <DeviceFrame device={macDevice} inverted={true}>
              <div
                className={`w-full h-full transition-opacity duration-500 ${
                  isTransitioning ? 'opacity-30 blur-xs' : 'opacity-100 blur-none'
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
          <div className="px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[10px] font-semibold text-white/80 backdrop-blur-md whitespace-nowrap shadow-xs">
            MacBook Pro 14-inch
          </div>
        </div>

        {/* 2. iPad Pro 11" */}
        <div className="w-52 sm:w-60 md:w-[24%] max-w-xs transition-all duration-500 hover:scale-[1.03] drop-shadow-2xl flex flex-col items-center gap-3">
          {padDevice && (
            <DeviceFrame device={padDevice} inverted={true}>
              <div
                className={`w-full h-full transition-opacity duration-500 ${
                  isTransitioning ? 'opacity-30 blur-xs' : 'opacity-100 blur-none'
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
          <div className="px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[10px] font-semibold text-white/80 backdrop-blur-md whitespace-nowrap shadow-xs">
            iPad Pro 11-inch
          </div>
        </div>

        {/* 3. iPhone 17 Pro */}
        <div className="w-36 sm:w-44 md:w-[18%] max-w-[180px] transition-all duration-500 hover:scale-[1.03] drop-shadow-2xl flex flex-col items-center gap-3">
          {phoneDevice && (
            <DeviceFrame device={phoneDevice} inverted={true}>
              <div
                className={`w-full h-full transition-opacity duration-500 ${
                  isTransitioning ? 'opacity-30 blur-xs' : 'opacity-100 blur-none'
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
          <div className="px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[10px] font-semibold text-white/80 backdrop-blur-md whitespace-nowrap shadow-xs">
            iPhone 17 Pro
          </div>
        </div>

        {/* 4. Apple Watch Ultra 2 */}
        <div className="w-28 sm:w-36 md:w-[14%] max-w-[140px] transition-all duration-500 hover:scale-[1.03] drop-shadow-2xl flex flex-col items-center gap-3">
          {watchDevice && (
            <DeviceFrame device={watchDevice} inverted={true}>
              <div
                className={`w-full h-full transition-opacity duration-500 ${
                  isTransitioning ? 'opacity-30 blur-xs' : 'opacity-100 blur-none'
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
          <div className="px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[10px] font-semibold text-white/80 backdrop-blur-md whitespace-nowrap shadow-xs">
            Apple Watch Ultra 2
          </div>
        </div>
      </div>

      {/* Floating Segmented Control Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 bg-white/[0.08] backdrop-blur-3xl border border-white/15 rounded-full p-2.5 px-5 mt-5 sm:mt-6 shadow-2xl shadow-black/40 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
          <div className="text-left">
            <div className="text-xs font-semibold text-white tracking-tight transition-opacity duration-300">
              {currentPattern.name}
            </div>
            <div className="text-[10px] text-white/60 font-mono">
              {currentPalette.name} • Seed #{seed}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={cycleRandom}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full transition-all duration-200"
            title="Auto-cycles every 5 seconds"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-500 ${
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
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-black bg-white hover:bg-white/95 active:scale-95 rounded-full transition-all duration-200 shadow-md"
          >
            Customize in Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}

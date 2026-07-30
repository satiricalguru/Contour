/**
 * GalleryCard — A single wallpaper card with viewport IntersectionObserver,
 * asynchronous canvas rendering, and skeleton loading state for ultra-fast page loads.
 */
'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { CuratedWallpaper } from '@/data/wallpapers';
import { drawPattern, getPattern } from '@/lib/engine/patterns';
import { PALETTES } from '@/data/palettes';

interface GalleryCardProps {
  wallpaper: CuratedWallpaper;
}

export function GalleryCard({ wallpaper }: GalleryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const pattern = getPattern(wallpaper.patternId);
  const palette = PALETTES.find((p) => p.id === wallpaper.paletteId);

  // 1. IntersectionObserver — only mark as visible when scrolling near viewport
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }, // Pre-render 200px before scrolling into view
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // 2. Asynchronous Canvas Rendering when visible
  useEffect(() => {
    if (!isVisible || isRendered || !pattern || !palette) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use non-blocking async scheduling so initial React mount is instantaneous
    const renderTimer = setTimeout(() => {
      const w = 240;
      const h = 160;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      drawPattern(
        ctx,
        w,
        h,
        wallpaper.patternId,
        wallpaper.paletteId,
        wallpaper.seed,
        wallpaper.inverted,
      );

      setIsRendered(true);
    }, 0);

    return () => clearTimeout(renderTimer);
  }, [isVisible, isRendered, wallpaper, pattern, palette]);

  const studioParams = new URLSearchParams({
    pattern: wallpaper.patternId,
    palette: wallpaper.paletteId,
    seed: wallpaper.seed.toString(),
    inverted: wallpaper.inverted.toString(),
  });

  return (
    <div ref={cardRef}>
      <Link
        href={`/studio?${studioParams.toString()}`}
        className="group block rounded-xl overflow-hidden bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <div className="relative aspect-[3/2] overflow-hidden bg-white/5">
          {/* Skeleton pulse before render */}
          {!isRendered && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 animate-pulse" />
          )}

          <canvas
            ref={canvasRef}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              isRendered ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        <div className="p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-inherit">
              {pattern?.name ?? wallpaper.patternId}
            </span>
            <span className="text-[10px] opacity-50 font-medium uppercase tracking-wider">
              {wallpaper.inverted ? 'Light' : 'Dark'}
            </span>
          </div>
          <span className="text-xs opacity-60 block">
            {palette?.name ?? wallpaper.paletteId}
          </span>
        </div>
      </Link>
    </div>
  );
}

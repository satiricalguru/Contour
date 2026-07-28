/**
 * WallpaperCanvas — renders a pattern onto a <canvas> element.
 * Shared by gallery thumbnails, studio preview, and export.
 */
'use client';

import React, { useRef, useEffect } from 'react';
import { drawPattern } from '@/lib/engine/patterns';

interface WallpaperCanvasProps {
  patternId: string;
  paletteId: string;
  seed: number;
  inverted: boolean;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export function WallpaperCanvas({
  patternId,
  paletteId,
  seed,
  inverted,
  width,
  height,
  className,
  style,
}: WallpaperCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set actual pixel dimensions
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawPattern(ctx, width, height, patternId, paletteId, seed, inverted);
  }, [patternId, paletteId, seed, inverted, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style,
      }}
    />
  );
}

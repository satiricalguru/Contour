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
  isLive?: boolean;
  speed?: number;
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
  isLive = false,
  speed = 1.0,
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

    if (!isLive) {
      drawPattern(ctx, width, height, patternId, paletteId, seed, inverted, 0);
      return;
    }

    let animId: number;
    let startTime: number | null = null;

    const renderFrame = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsedSec = ((timestamp - startTime) / 1000) * speed;

      drawPattern(ctx, width, height, patternId, paletteId, seed, inverted, elapsedSec);
      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [patternId, paletteId, seed, inverted, width, height, isLive, speed]);

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

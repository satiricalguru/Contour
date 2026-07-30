/**
 * PatternPicker — grid of live mini-canvas thumbnails for each pattern.
 */
'use client';

import { useRef, useEffect } from 'react';
import { PATTERNS } from '@/lib/engine/patterns';
import { useContourStore } from '@/lib/store';
import { interpolateRamp } from '@/lib/engine/color';
import { PALETTES, RAMP_STOPS } from '@/data/palettes';

function MiniPatternCanvas({
  patternId,
  paletteId,
  seed,
  inverted,
}: {
  patternId: string;
  paletteId: string;
  seed: number;
  inverted: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = 120;
    const h = 80;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pattern = PATTERNS.find((p) => p.id === patternId);
    const palette = PALETTES.find((p) => p.id === paletteId);
    if (!pattern || !palette) return;

    const ramp = interpolateRamp(palette.anchors, RAMP_STOPS);
    pattern.draw(ctx, w, h, ramp, seed, inverted);
  }, [patternId, paletteId, seed, inverted]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover rounded-md"
      style={{ imageRendering: 'auto' }}
    />
  );
}

export function PatternPicker() {
  const { patternId, paletteId, seed, inverted, setPattern } = useContourStore();

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] px-1">
        Pattern
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPattern(p.id)}
            className={`group relative aspect-[3/2] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
              patternId === p.id
                ? 'border-[var(--heading-color)] shadow-md'
                : 'border-[var(--card-border)] hover:border-slate-400/40'
            }`}
            title={p.name}
            aria-label={`Select ${p.name} pattern`}
          >
            <MiniPatternCanvas
              patternId={p.id}
              paletteId={paletteId}
              seed={seed}
              inverted={inverted}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-1 px-1.5">
              <span className="text-[10px] text-white/80 font-medium leading-none">
                {p.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * PalettePicker — swatch strips showing the actual interpolated gradient.
 */
'use client';

import { PALETTES, RAMP_STOPS } from '@/data/palettes';
import { interpolateRamp } from '@/lib/engine/color';
import { useContourStore } from '@/lib/store';

export function PalettePicker() {
  const { paletteId, setPalette } = useContourStore();

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] px-1">
        Palette
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {PALETTES.map((pal) => {
          const ramp = interpolateRamp(pal.anchors, RAMP_STOPS);
          const isActive = paletteId === pal.id;

          return (
            <button
              key={pal.id}
              onClick={() => setPalette(pal.id)}
              className={`group flex flex-col gap-1 rounded-lg p-1.5 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[var(--pill-bg)] ring-2 ring-[var(--heading-color)]'
                  : 'hover:bg-[var(--pill-bg)]'
              }`}
              aria-label={`Select ${pal.name} palette`}
            >
              {/* Gradient swatch */}
              <div className="flex h-4 rounded-md overflow-hidden w-full border border-[var(--card-border)]">
                {ramp.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-[var(--foreground-muted)] group-hover:text-[var(--heading-color)] font-medium text-left leading-none">
                {pal.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Curated gallery wallpaper combinations.
 * These define the initial browsable gallery — good coverage across
 * every pattern and palette, both polarities.
 */

export interface CuratedWallpaper {
  id: string;
  patternId: string;
  paletteId: string;
  seed: number;
  inverted: boolean;
}

export const CURATED_WALLPAPERS: readonly CuratedWallpaper[] = [
  // Flowing Hills across palettes
  { id: 'fh-jade-d', patternId: 'flowing-hills', paletteId: 'midnight-jade', seed: 42, inverted: false },
  { id: 'fh-glacier-l', patternId: 'flowing-hills', paletteId: 'glacier', seed: 108, inverted: true },
  { id: 'fh-copper-d', patternId: 'flowing-hills', paletteId: 'copper-dusk', seed: 77, inverted: false },
  { id: 'fh-forest-d', patternId: 'flowing-hills', paletteId: 'deep-forest', seed: 256, inverted: false },

  // Smooth Wave
  { id: 'sw-blue-d', patternId: 'smooth-wave', paletteId: 'blue', seed: 13, inverted: false },
  { id: 'sw-rose-l', patternId: 'smooth-wave', paletteId: 'rose-quartz', seed: 99, inverted: true },
  { id: 'sw-neon-d', patternId: 'smooth-wave', paletteId: 'neon-horizon', seed: 201, inverted: false },

  // Sand Dunes
  { id: 'sd-copper-d', patternId: 'sand-dunes', paletteId: 'copper-dusk', seed: 55, inverted: false },
  { id: 'sd-solar-l', patternId: 'sand-dunes', paletteId: 'solar-flare', seed: 888, inverted: true },
  { id: 'sd-stone-d', patternId: 'sand-dunes', paletteId: 'stone', seed: 333, inverted: false },

  // Mountains
  { id: 'mt-slate-d', patternId: 'mountains', paletteId: 'slate-mist', seed: 42, inverted: false },
  { id: 'mt-arctic-l', patternId: 'mountains', paletteId: 'arctic-winter', seed: 192, inverted: true },
  { id: 'mt-blood-d', patternId: 'mountains', paletteId: 'blood-moon', seed: 666, inverted: false },

  // Concentric Arcs
  { id: 'ca-sunrise-d', patternId: 'concentric-arcs', paletteId: 'sunrise', seed: 17, inverted: false },
  { id: 'ca-purple-l', patternId: 'concentric-arcs', paletteId: 'purple', seed: 404, inverted: true },
  { id: 'ca-ocean-d', patternId: 'concentric-arcs', paletteId: 'ocean-depths', seed: 77, inverted: false },

  // Scribble
  { id: 'sc-charcoal-d', patternId: 'scribble', paletteId: 'charcoal', seed: 29, inverted: false },
  { id: 'sc-toxic-d', patternId: 'scribble', paletteId: 'toxic-glow', seed: 150, inverted: false },
  { id: 'sc-rose-l', patternId: 'scribble', paletteId: 'rose-quartz', seed: 234, inverted: true },

  // Aurora Bands
  { id: 'ab-cosmic-d', patternId: 'aurora-bands', paletteId: 'cosmic-blush', seed: 45, inverted: false },
  { id: 'ab-jade-d', patternId: 'aurora-bands', paletteId: 'midnight-jade', seed: 321, inverted: false },
  { id: 'ab-neon-d', patternId: 'aurora-bands', paletteId: 'neon-horizon', seed: 512, inverted: false },

  // Topographic Contours
  { id: 'tc-slate-d', patternId: 'topographic-contours', paletteId: 'slate-mist', seed: 67, inverted: false },
  { id: 'tc-forest-l', patternId: 'topographic-contours', paletteId: 'deep-forest', seed: 180, inverted: true },

  // Marble Ink
  { id: 'mi-purple-d', patternId: 'marble-ink', paletteId: 'purple', seed: 88, inverted: false },
  { id: 'mi-glacier-d', patternId: 'marble-ink', paletteId: 'glacier', seed: 222, inverted: false },
  { id: 'mi-fire-l', patternId: 'marble-ink', paletteId: 'fire', seed: 400, inverted: true },

  // Terrazzo
  { id: 'tz-sunrise-l', patternId: 'terrazzo', paletteId: 'sunrise', seed: 56, inverted: true },
  { id: 'tz-cosmic-d', patternId: 'terrazzo', paletteId: 'cosmic-blush', seed: 190, inverted: false },

  // Grain Field
  { id: 'gf-slate-d', patternId: 'grain-field', paletteId: 'slate-mist', seed: 19, inverted: false },
  { id: 'gf-copper-l', patternId: 'grain-field', paletteId: 'copper-dusk', seed: 500, inverted: true },
  { id: 'gf-charcoal-d', patternId: 'grain-field', paletteId: 'charcoal', seed: 101, inverted: false },

  // Halftone Gradient
  { id: 'hg-blue-d', patternId: 'halftone-gradient', paletteId: 'blue', seed: 33, inverted: false },
  { id: 'hg-rose-l', patternId: 'halftone-gradient', paletteId: 'rose-quartz', seed: 777, inverted: true },

  // Geometric Facets
  { id: 'gfc-arctic-d', patternId: 'geometric-facets', paletteId: 'arctic-winter', seed: 44, inverted: false },
  { id: 'gfc-solar-d', patternId: 'geometric-facets', paletteId: 'solar-flare', seed: 115, inverted: false },
  { id: 'gfc-jade-l', patternId: 'geometric-facets', paletteId: 'midnight-jade', seed: 600, inverted: true },
];

/**
 * Pattern registry — the single entry point for all pattern draw functions.
 *
 * Adding a new pattern is a one-function, one-array-entry change:
 * 1. Create a new file in patterns/
 * 2. Add an entry to PATTERNS below
 */
import { interpolateRamp } from '../color';
import { PALETTES, RAMP_STOPS } from '@/data/palettes';

import { drawFlowingHills } from './flowingHills';
import { drawSmoothWave } from './smoothWave';
import { drawSandDunes } from './sandDunes';
import { drawMountains } from './mountains';
import { drawConcentricArcs } from './concentricArcs';
import { drawScribble } from './scribble';
import { drawAuroraBands } from './auroraBands';
import { drawTopographicContours } from './topographicContours';
import { drawMarbleInk } from './marbleInk';
import { drawTerrazzo } from './terrazzo';
import { drawGrainField } from './grainField';
import { drawHalftoneGradient } from './halftoneGradient';
import { drawGeometricFacets } from './geometricFacets';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CanvasContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export type PatternDrawFn = (
  ctx: CanvasContext,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
  t?: number,
) => void;

export interface PatternDef {
  id: string;
  name: string;
  description: string;
  draw: PatternDrawFn;
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const PATTERNS: readonly PatternDef[] = [
  {
    id: 'flowing-hills',
    name: 'Flowing Hills',
    description: 'Layered ridgelines with silhouette pine trees',
    draw: drawFlowingHills,
  },
  {
    id: 'smooth-wave',
    name: 'Smooth Wave',
    description: 'Stacked bell-curve waveforms from an off-center peak',
    draw: drawSmoothWave,
  },
  {
    id: 'sand-dunes',
    name: 'Sand Dunes',
    description: 'Flat, flowing desert ridgelines',
    draw: drawSandDunes,
  },
  {
    id: 'mountains',
    name: 'Mountains',
    description: 'Sharp triangular peaks layered back-to-front',
    draw: drawMountains,
  },
  {
    id: 'concentric-arcs',
    name: 'Concentric Arcs',
    description: 'Nested circles radiating from below the frame',
    draw: drawConcentricArcs,
  },
  {
    id: 'scribble',
    name: 'Scribble',
    description: 'Loose bezier-curve line art with varied strokes',
    draw: drawScribble,
  },
  {
    id: 'aurora-bands',
    name: 'Aurora Bands',
    description: 'Flowing vertical gradient bands with fbm distortion',
    draw: drawAuroraBands,
  },
  {
    id: 'topographic-contours',
    name: 'Topographic Contours',
    description: 'Nested contour lines like an elevation map',
    draw: drawTopographicContours,
  },
  {
    id: 'marble-ink',
    name: 'Marble Ink',
    description: 'Domain-warped noise for fluid marbled swirls',
    draw: drawMarbleInk,
  },
  {
    id: 'terrazzo',
    name: 'Terrazzo',
    description: 'Scattered rounded shapes over a flat base',
    draw: drawTerrazzo,
  },
  {
    id: 'grain-field',
    name: 'Grain Field',
    description: 'Smooth gradient with fine noise dither',
    draw: drawGrainField,
  },
  {
    id: 'halftone-gradient',
    name: 'Halftone Gradient',
    description: 'Dot grid with radius driven by a gradient field',
    draw: drawHalftoneGradient,
  },
  {
    id: 'geometric-facets',
    name: 'Geometric Facets',
    description: 'Low-poly triangulated mesh with gradient shading',
    draw: drawGeometricFacets,
  },
] as const;

// ---------------------------------------------------------------------------
// Main draw entry point
// ---------------------------------------------------------------------------

/**
 * Render a pattern onto a canvas context at the given dimensions.
 * This is the single function everything in the app calls — gallery thumbnails,
 * device mockup previews, and full-resolution exports all use this same path.
 */
export function drawPattern(
  ctx: CanvasContext,
  w: number,
  h: number,
  patternId: string,
  paletteId: string,
  seed: number,
  inverted: boolean,
  t: number = 0,
) {
  const pattern = PATTERNS.find((p) => p.id === patternId);
  const palette = PALETTES.find((p) => p.id === paletteId);

  if (!pattern || !palette) {
    // Fallback: solid grey
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, w, h);
    return;
  }

  const ramp = interpolateRamp(palette.anchors, RAMP_STOPS);
  pattern.draw(ctx, w, h, ramp, seed, inverted, t);
}

/** Get a pattern definition by ID. */
export function getPattern(id: string): PatternDef | undefined {
  return PATTERNS.find((p) => p.id === id);
}

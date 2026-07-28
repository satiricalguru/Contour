/**
 * Color interpolation utilities for the Contour palette system.
 *
 * Palettes are defined as short lists of hex anchor colors; these helpers
 * interpolate them into full gradient ramps of any length.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

// ---------------------------------------------------------------------------
// Parsing & formatting
// ---------------------------------------------------------------------------

/** Parse a hex color string (#RGB, #RRGGBB) into {r, g, b} 0–255. */
export function parseHex(hex: string): RGB {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/** Convert RGB 0–255 back to a #RRGGBB string. */
export function toHex(c: RGB): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    clamp(c.r).toString(16).padStart(2, '0') +
    clamp(c.g).toString(16).padStart(2, '0') +
    clamp(c.b).toString(16).padStart(2, '0')
  );
}

/** Return an `rgba(r,g,b,a)` CSS string from a hex color and alpha 0–1. */
export function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ---------------------------------------------------------------------------
// Interpolation
// ---------------------------------------------------------------------------

/** Linearly interpolate between two RGB colors by factor t ∈ [0, 1]. */
export function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

/** Lerp two hex colors, return hex. */
export function lerpColor(c1: string, c2: string, t: number): string {
  return toHex(lerpRGB(parseHex(c1), parseHex(c2), t));
}

/**
 * Interpolate a short list of anchor hex colors into a full ramp of `stops` colors.
 * E.g. 4 anchors → 10 stops yields a smooth gradient sampled at even intervals.
 */
export function interpolateRamp(anchors: readonly string[], stops: number): string[] {
  if (anchors.length === 0) return [];
  if (anchors.length === 1 || stops <= 1) return [anchors[0]];

  const parsed = anchors.map(parseHex);
  const result: string[] = [];

  for (let i = 0; i < stops; i++) {
    const t = i / (stops - 1); // 0 → 1
    const scaled = t * (parsed.length - 1);
    const idx = Math.min(Math.floor(scaled), parsed.length - 2);
    const frac = scaled - idx;
    result.push(toHex(lerpRGB(parsed[idx], parsed[idx + 1], frac)));
  }

  return result;
}

/**
 * Given a ramp and a value t ∈ [0, 1], sample the ramp at that position
 * with smooth interpolation between entries.
 */
export function sampleRamp(ramp: readonly string[], t: number): string {
  if (ramp.length === 0) return '#000000';
  if (ramp.length === 1) return ramp[0];

  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (ramp.length - 1);
  const idx = Math.min(Math.floor(scaled), ramp.length - 2);
  const frac = scaled - idx;

  return lerpColor(ramp[idx], ramp[idx + 1], frac);
}

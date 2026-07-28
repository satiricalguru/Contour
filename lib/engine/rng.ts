/**
 * Seeded PRNG and noise utilities for the Contour generative engine.
 *
 * mulberry32 is a fast, deterministic 32-bit PRNG — the same seed always
 * produces the same sequence, which is what makes "shuffle" reproducible
 * and shareable URLs possible.
 */

// ---------------------------------------------------------------------------
// mulberry32 core
// ---------------------------------------------------------------------------

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// RNG wrapper with convenience methods
// ---------------------------------------------------------------------------

export class Rng {
  private _next: () => number;

  constructor(seed: number) {
    this._next = mulberry32(seed);
  }

  /** Returns a float in [0, 1). */
  next(): number {
    return this._next();
  }

  /** Returns a float in [min, max). */
  range(min: number, max: number): number {
    return min + this._next() * (max - min);
  }

  /** Returns an integer in [min, max] (inclusive). */
  int(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }

  /** Pick a random element from an array. */
  pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(this._next() * arr.length)];
  }

  /** Shuffle an array in place (Fisher-Yates). */
  shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this._next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /** Returns true with probability `p` (default 0.5). */
  chance(p = 0.5): boolean {
    return this._next() < p;
  }
}

// ---------------------------------------------------------------------------
// 1D value noise
// ---------------------------------------------------------------------------

/** Simple hash for 1D noise. */
function hash1(n: number): number {
  let s = (n * 127.1 + 311.7) | 0;
  s = Math.sin(s) * 43758.5453;
  return s - Math.floor(s);
}

/** Smooth 1D value noise with cosine interpolation. */
export function noise1D(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f); // smoothstep
  return hash1(i) * (1 - u) + hash1(i + 1) * u;
}

// ---------------------------------------------------------------------------
// 2D value noise
// ---------------------------------------------------------------------------

/** Hash two ints into a pseudo-random float in [0,1). */
function hash2(ix: number, iy: number): number {
  let s = ix * 127.1 + iy * 311.7;
  s = Math.sin(s) * 43758.5453;
  return s - Math.floor(s);
}

/** Smooth 2D value noise. */
export function noise2D(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);

  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);

  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

// ---------------------------------------------------------------------------
// Fractal Brownian Motion (fbm)
// ---------------------------------------------------------------------------

/**
 * 1D fbm — layers of noise at increasing frequency / decreasing amplitude.
 * Returns a value roughly in [0, 1] (can slightly exceed due to summation).
 */
export function fbm1D(
  x: number,
  octaves = 4,
  lacunarity = 2.0,
  gain = 0.5,
): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1.0;
  let maxAmp = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise1D(x * frequency);
    maxAmp += amplitude;
    frequency *= lacunarity;
    amplitude *= gain;
  }

  return value / maxAmp;
}

/**
 * 2D fbm — layers of 2D noise for domain warping and complex patterns.
 */
export function fbm2D(
  x: number,
  y: number,
  octaves = 4,
  lacunarity = 2.0,
  gain = 0.5,
): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1.0;
  let maxAmp = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency);
    maxAmp += amplitude;
    frequency *= lacunarity;
    amplitude *= gain;
  }

  return value / maxAmp;
}

export { mulberry32 };

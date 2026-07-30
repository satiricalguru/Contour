/**
 * Pattern: Smooth Wave
 * Stacked bell-curve waveforms of decreasing amplitude, radiating from
 * an off-center peak.
 */
import { Rng } from '../rng';

export function drawSmoothWave(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
  tSec: number = 0,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];
  const layers = Math.max(colors.length, 8);

  // Background
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, w, h);

  // Off-center peak position with subtle motion
  const peakX = w * (rng.range(0.25, 0.75) + Math.sin(tSec * 0.8) * 0.04);
  const peakY = h * rng.range(0.2, 0.4);

  for (let layer = 0; layer < layers; layer++) {
    const t = (layer + 1) / layers;
    const colorIdx = Math.min(
      Math.floor(t * (colors.length - 1)),
      colors.length - 1,
    );

    const amplitude = h * (0.5 - t * 0.3) * rng.range(0.8, 1.2);
    const spread = w * (0.3 + t * 0.5);
    const baseY = peakY + t * (h - peakY) * 0.6;

    ctx.fillStyle = colors[colorIdx];
    ctx.beginPath();
    ctx.moveTo(0, h);

    for (let x = 0; x <= w; x += Math.max(1, w / 400)) {
      const dx = x - peakX;
      const gaussian = Math.exp(-(dx * dx) / (2 * spread * spread));
      const y = baseY + h * 0.3 - gaussian * amplitude;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }
}

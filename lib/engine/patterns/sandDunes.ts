/**
 * Pattern: Sand Dunes
 * Layered sine + fbm ridgelines, flatter and more horizontal than
 * Flowing Hills, evoking a desert landscape.
 */
import { Rng, fbm1D } from '../rng';

export function drawSandDunes(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];
  const layers = 7;

  // Background
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, w, h);

  for (let layer = 0; layer < layers; layer++) {
    const t = (layer + 1) / (layers + 1);
    const baseY = h * (0.25 + t * 0.6);
    const amplitude = h * rng.range(0.015, 0.04); // much flatter than hills
    const offset = rng.range(0, 200);
    const freq = rng.range(0.8, 2.0);
    const sineFreq = rng.range(1.5, 3.5);

    const colorIdx = Math.min(
      Math.floor(t * (colors.length - 1)) + 1,
      colors.length - 1,
    );
    ctx.fillStyle = colors[colorIdx];

    ctx.beginPath();
    ctx.moveTo(0, h);

    for (let x = 0; x <= w; x += Math.max(1, w / 400)) {
      const nx = (x / w) * freq + offset;
      const sineVal = Math.sin((x / w) * Math.PI * sineFreq + offset) * 0.5 + 0.5;
      const noiseVal = fbm1D(nx, 4, 2.0, 0.45);
      const combined = sineVal * 0.6 + noiseVal * 0.4;
      const y = baseY - combined * amplitude;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }
}

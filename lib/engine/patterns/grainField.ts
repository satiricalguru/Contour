/**
 * Pattern: Grain Field
 * A smooth two-stop gradient with a fine per-pixel noise dither on top.
 * One of the most popular minimalist wallpaper styles — simple but rich.
 */
import { Rng } from '../rng';
import { parseHex, lerpRGB } from '../color';

export function drawGrainField(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];

  // Pick two stops from the ramp for the base gradient
  const idx1 = Math.floor(colors.length * 0.15);
  const idx2 = Math.floor(colors.length * 0.75);
  const c1 = parseHex(colors[idx1]);
  const c2 = parseHex(colors[idx2]);

  // Gradient angle
  const angle = rng.range(0, Math.PI * 2);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Use ImageData for per-pixel control (much faster than individual fillRect)
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  // Grain intensity
  const grainAmount = rng.range(15, 35);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Gradient position along angle
      const nx = x / w - 0.5;
      const ny = y / h - 0.5;
      let t = (nx * cos + ny * sin + 0.5);
      t = Math.max(0, Math.min(1, t));

      // Interpolate gradient
      const gc = lerpRGB(c1, c2, t);

      // Add high-entropy noise with robust seed integration
      let noiseHash = (x * 374761393) ^ (y * 668265263) ^ (seed * 1446777085);
      noiseHash = Math.imul(noiseHash ^ (noiseHash >>> 15), 2246822519);
      noiseHash = Math.imul(noiseHash ^ (noiseHash >>> 13), 3266489917);
      const normHash = ((noiseHash ^ (noiseHash >>> 16)) >>> 0) / 4294967295;
      const grain = (normHash - 0.5) * grainAmount;

      const idx = (y * w + x) * 4;
      data[idx] = Math.max(0, Math.min(255, gc.r + grain));
      data[idx + 1] = Math.max(0, Math.min(255, gc.g + grain));
      data[idx + 2] = Math.max(0, Math.min(255, gc.b + grain));
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

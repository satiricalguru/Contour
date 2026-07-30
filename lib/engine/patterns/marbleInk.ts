/**
 * Pattern: Marble Ink
 * Domain-warped noise (feed fbm output back into itself as a coordinate
 * offset) for fluid, marbled swirls.
 */
import { Rng, fbm2D } from '../rng';
import { sampleRamp } from '../color';

export function drawMarbleInk(
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

  const offsetX = rng.range(0, 100) + tSec * 0.06;
  const offsetY = rng.range(0, 100) + tSec * 0.04;
  const scale = rng.range(2.5, 5);
  const warpStrength = rng.range(1.5, 3.5);

  // Render with high detail (adaptive step scaled to canvas dimension)
  const step = Math.max(2, Math.min(4, Math.ceil(w / 600)));

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const nx = (x / w) * scale + offsetX;
      const ny = (y / h) * scale + offsetY;

      // First warp pass
      const warpX = fbm2D(nx, ny, 3, 2.0, 0.5) * warpStrength;
      const warpY = fbm2D(nx + 5.2, ny + 1.3, 3, 2.0, 0.5) * warpStrength;

      // Second warp pass (domain warp)
      const warpX2 = fbm2D(nx + warpX, ny + warpY, 3, 2.0, 0.5) * warpStrength * 0.7;
      const warpY2 = fbm2D(nx + warpX + 3.7, ny + warpY + 8.1, 3, 2.0, 0.5) * warpStrength * 0.7;

      // Final value
      const value = fbm2D(nx + warpX2, ny + warpY2, 4, 2.0, 0.5);

      ctx.fillStyle = sampleRamp(colors, value);
      ctx.fillRect(x, y, step, step);
    }
  }
}

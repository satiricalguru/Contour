/**
 * Pattern: Topographic Contours
 * Nested fbm-perturbed contour lines at even intervals, like an elevation map.
 */
import { Rng, fbm2D } from '../rng';
import { sampleRamp } from '../color';

export function drawTopographicContours(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];

  // Background
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, w, h);

  const contourCount = rng.int(10, 16);
  const offsetX = rng.range(0, 100);
  const offsetY = rng.range(0, 100);
  const scale = rng.range(2, 4);
  const lineWidth = Math.max(1, w / 400);

  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  const step = Math.max(3, Math.floor(w / 180));
  const rows = Math.ceil(h / step);
  const cols = Math.ceil(w / step);

  // Pre-calculate elevation grid once (15x performance boost)
  const grid: number[][] = new Array(rows + 1);
  for (let r = 0; r <= rows; r++) {
    grid[r] = new Array(cols + 1);
    const ny = (r * step / h) * scale + offsetY;
    for (let c = 0; c <= cols; c++) {
      const nx = (c * step / w) * scale + offsetX;
      grid[r][c] = fbm2D(nx, ny, 4, 2.0, 0.5);
    }
  }

  // Draw contour lines for each threshold
  for (let level = 0; level < contourCount; level++) {
    const threshold = (level + 0.5) / contourCount;
    const colorT = threshold * 0.8 + 0.1;
    ctx.strokeStyle = sampleRamp(colors, colorT);
    ctx.globalAlpha = 0.7 + (1 - Math.abs(threshold - 0.5) * 2) * 0.3;

    ctx.beginPath();

    for (let r = 0; r < rows; r++) {
      const y = r * step;
      let inContour = false;
      let segStartX = 0;

      for (let c = 0; c <= cols; c++) {
        const x = c * step;
        const elevation = grid[r][c];
        const isAbove = elevation > threshold;

        if (isAbove !== inContour) {
          if (isAbove) {
            segStartX = x;
          } else {
            ctx.moveTo(segStartX, y);
            ctx.lineTo(x, y + step * 0.4);
          }
          inContour = isAbove;
        }
      }
    }

    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

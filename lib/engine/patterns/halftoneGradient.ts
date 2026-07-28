/**
 * Pattern: Halftone Gradient
 * A dot grid where each dot's radius is driven by a gradient field,
 * creating a Ben-Day dot / newspaper print aesthetic.
 */
import { Rng } from '../rng';
import { sampleRamp } from '../color';

export function drawHalftoneGradient(
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

  // Gradient direction
  const angle = rng.range(0, Math.PI);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Dot grid parameters
  const dotSpacing = Math.max(4, w / rng.range(40, 70));
  const maxRadius = dotSpacing * 0.48;
  const cols = Math.ceil(w / dotSpacing) + 1;
  const rows = Math.ceil(h / dotSpacing) + 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * dotSpacing + (row % 2 ? dotSpacing * 0.5 : 0);
      const cy = row * dotSpacing;

      // Gradient value at this position
      const nx = cx / w - 0.5;
      const ny = cy / h - 0.5;
      const t = Math.max(0, Math.min(1, nx * cos + ny * sin + 0.5));

      // Dot radius proportional to gradient value
      const radius = maxRadius * t;

      if (radius > 0.5) {
        const colorT = 0.3 + t * 0.6;
        ctx.fillStyle = sampleRamp(colors, colorT);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

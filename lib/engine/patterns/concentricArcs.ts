/**
 * Pattern: Concentric Arcs
 * Nested circles from an origin point below the frame, each ring one
 * gradient step darker/lighter, creating a sunrise/sunset arc effect.
 */
import { Rng } from '../rng';

export function drawConcentricArcs(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];
  const ringCount = colors.length + 4;

  // Background
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, w, h);

  // Origin below the frame
  const originX = w * rng.range(0.3, 0.7);
  const originY = h * rng.range(1.1, 1.5);

  // Maximum radius to cover the canvas
  const maxRadius = Math.sqrt(
    Math.pow(Math.max(originX, w - originX), 2) + Math.pow(originY, 2),
  ) * 1.2;

  // Draw rings from outermost to innermost
  for (let i = ringCount - 1; i >= 0; i--) {
    const t = i / (ringCount - 1);
    const radius = maxRadius * (1 - t);
    const colorIdx = Math.min(
      Math.floor(t * (colors.length - 1)),
      colors.length - 1,
    );

    ctx.fillStyle = colors[colorIdx];
    ctx.beginPath();
    ctx.arc(originX, originY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

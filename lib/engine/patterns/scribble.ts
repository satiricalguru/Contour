/**
 * Pattern: Scribble
 * Loose bezier-curve line art with varied stroke widths, no fill.
 * Creates an abstract, hand-drawn aesthetic.
 */
import { Rng, fbm1D } from '../rng';
import { sampleRamp } from '../color';

export function drawScribble(
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

  const lineCount = rng.int(12, 25);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 0; i < lineCount; i++) {
    const t = (i + 1) / (lineCount + 1);
    const strokeColor = sampleRamp(colors, t * 0.8 + 0.1);
    const strokeWidth = (w / 300) * rng.range(0.5, 3.0);
    const alpha = rng.range(0.3, 0.9);

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = alpha;

    // Generate a flowing bezier path
    ctx.beginPath();
    const startX = rng.range(-w * 0.1, w * 0.3);
    const startY = rng.range(h * 0.1, h * 0.9);
    ctx.moveTo(startX, startY);

    const segments = rng.int(3, 8);
    for (let s = 0; s < segments; s++) {
      const st = (s + 1) / segments;
      const noiseOffset = rng.range(0, 100);

      const cp1x = startX + w * st * rng.range(0.3, 0.6);
      const cp1y = startY + h * fbm1D(st * 3 + noiseOffset, 3) * rng.range(-0.4, 0.4);
      const cp2x = startX + w * st * rng.range(0.5, 0.9);
      const cp2y = startY + h * fbm1D(st * 5 + noiseOffset, 3) * rng.range(-0.3, 0.3);
      const endX = startX + w * st * rng.range(0.7, 1.2);
      const endY = startY + h * rng.range(-0.15, 0.15);

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    }

    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

/**
 * Pattern: Terrazzo
 * Scattered random-sized rounded polygons/blobs over a flat base color,
 * with varied opacity for a modern decorative surface look.
 */
import { Rng } from '../rng';
import { sampleRamp, withAlpha } from '../color';

export function drawTerrazzo(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];

  // Solid base color — use a mid-tone
  ctx.fillStyle = sampleRamp(colors, 0.15);
  ctx.fillRect(0, 0, w, h);

  const blobCount = rng.int(40, 80);
  const minSize = Math.max(4, w * 0.01);
  const maxSize = w * 0.06;

  for (let i = 0; i < blobCount; i++) {
    const cx = rng.range(-maxSize, w + maxSize);
    const cy = rng.range(-maxSize, h + maxSize);
    const size = rng.range(minSize, maxSize);
    const colorT = rng.range(0.25, 0.95);
    const alpha = rng.range(0.4, 0.9);
    const rotation = rng.range(0, Math.PI * 2);

    const blobColor = withAlpha(sampleRamp(colors, colorT), alpha);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    // Draw a rounded polygon (3–6 sides)
    const sides = rng.int(3, 6);
    const radiusVariance = rng.range(0.6, 1.0);

    ctx.fillStyle = blobColor;
    ctx.beginPath();

    for (let s = 0; s <= sides; s++) {
      const angle = (s / sides) * Math.PI * 2;
      const r = size * (radiusVariance + rng.range(0, 1 - radiusVariance));
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;

      if (s === 0) {
        ctx.moveTo(px, py);
      } else {
        // Use quadratic curves for rounded appearance
        const prevAngle = ((s - 0.5) / sides) * Math.PI * 2;
        const cpR = size * (radiusVariance + rng.range(0, 0.3));
        const cpx = Math.cos(prevAngle) * cpR;
        const cpy = Math.sin(prevAngle) * cpR;
        ctx.quadraticCurveTo(cpx, cpy, px, py);
      }
    }

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

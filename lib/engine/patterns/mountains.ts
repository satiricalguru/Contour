/**
 * Pattern: Mountains
 * Multiple sharp triangular peaks per layer with power-curve falloff,
 * layered back-to-front.
 */
import { Rng } from '../rng';

export function drawMountains(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];
  const layers = 5;

  // Background — sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
  skyGrad.addColorStop(0, colors[0]);
  skyGrad.addColorStop(1, colors[Math.min(1, colors.length - 1)]);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  for (let layer = 0; layer < layers; layer++) {
    const t = (layer + 1) / (layers + 0.5);
    const baseY = h * (0.35 + t * 0.5);
    const peakHeight = h * (0.15 + (1 - t) * 0.25);
    const peakCount = rng.int(3, 6);

    const colorIdx = Math.min(
      Math.floor((t * 0.8 + 0.2) * (colors.length - 1)),
      colors.length - 1,
    );
    ctx.fillStyle = colors[colorIdx];

    ctx.beginPath();
    ctx.moveTo(0, h);

    // Start from far left
    ctx.lineTo(0, baseY);

    const peaks: Array<{ x: number; peakY: number }> = [];
    for (let p = 0; p < peakCount; p++) {
      const px = (w / (peakCount + 1)) * (p + 1) + rng.range(-w * 0.08, w * 0.08);
      const py = baseY - peakHeight * rng.range(0.5, 1.0);
      peaks.push({ x: px, peakY: py });
    }

    // Sort by x position
    peaks.sort((a, b) => a.x - b.x);

    // Build mountain silhouette
    let prevX = 0;
    for (const peak of peaks) {
      // Rising edge — power curve for sharp peak
      const riseWidth = (peak.x - prevX) * rng.range(0.3, 0.7);
      const riseStart = peak.x - riseWidth;

      // Add subtle slope from previous position
      const steps = Math.max(8, Math.floor(w / 50));
      for (let s = 0; s <= steps; s++) {
        const st = s / steps;
        const sx = riseStart + riseWidth * st;
        // Power curve for sharp peaks
        const sy = baseY - (baseY - peak.peakY) * Math.pow(st, 1.5);
        ctx.lineTo(sx, sy);
      }

      // Falling edge
      const fallWidth = riseWidth * rng.range(0.8, 1.3);
      for (let s = 0; s <= steps; s++) {
        const st = s / steps;
        const sx = peak.x + fallWidth * st;
        const sy = peak.peakY + (baseY - peak.peakY) * Math.pow(st, 1.3);
        ctx.lineTo(sx, sy);
      }

      prevX = peak.x + fallWidth;
    }

    ctx.lineTo(w, baseY);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }
}

/**
 * Pattern: Flowing Hills
 * Layered fbm ridgelines drawn back-to-front, with silhouette pine trees
 * scattered along the two frontmost ridges.
 */
import { Rng, fbm1D } from '../rng';
import { sampleRamp } from '../color';

export function drawFlowingHills(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];
  const layers = 6;

  // Background
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, w, h);

  for (let layer = 0; layer < layers; layer++) {
    const t = (layer + 1) / layers;
    const baseY = h * (0.3 + t * 0.55);
    const amplitude = h * (0.08 + rng.range(0, 0.06));
    const offset = rng.range(0, 100);
    const freq = 1.5 + rng.range(0, 1.5);

    const colorIdx = Math.min(Math.floor(t * (colors.length - 1)) + 1, colors.length - 1);
    ctx.fillStyle = colors[colorIdx];

    ctx.beginPath();
    ctx.moveTo(0, h);

    const points: Array<{ x: number; y: number }> = [];

    for (let x = 0; x <= w; x += Math.max(1, w / 300)) {
      const nx = (x / w) * freq + offset;
      const noiseVal = fbm1D(nx, 5, 2.0, 0.5);
      const y = baseY - noiseVal * amplitude;
      ctx.lineTo(x, y);
      points.push({ x, y });
    }

    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    // Draw silhouette pine trees on the two frontmost ridges
    if (layer >= layers - 2) {
      const treeCount = Math.floor(w / 80) + rng.int(2, 6);
      const treeColor = sampleRamp(colors, Math.min(t + 0.08, 1));

      for (let ti = 0; ti < treeCount; ti++) {
        const tx = rng.range(w * 0.02, w * 0.98);
        // Find the ridge Y at this x position
        const ptIdx = Math.min(
          Math.floor((tx / w) * points.length),
          points.length - 1,
        );
        const ridgeY = points[Math.max(0, ptIdx)].y;

        const treeH = h * rng.range(0.02, 0.05);
        const treeW = treeH * rng.range(0.25, 0.45);

        drawPineTree(ctx, tx, ridgeY, treeW, treeH, treeColor);
      }
    }
  }
}

function drawPineTree(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  x: number,
  baseY: number,
  halfW: number,
  height: number,
  color: string,
) {
  ctx.fillStyle = color;

  // Trunk
  const trunkW = halfW * 0.25;
  const trunkH = height * 0.2;
  ctx.fillRect(x - trunkW, baseY - trunkH, trunkW * 2, trunkH);

  // Canopy — three stacked triangles
  const tiers = 3;
  for (let t = 0; t < tiers; t++) {
    const tierH = (height * 0.8) / tiers;
    const tierY = baseY - trunkH - t * tierH * 0.7;
    const tierW = halfW * (1 - t * 0.2);

    ctx.beginPath();
    ctx.moveTo(x, tierY - tierH);
    ctx.lineTo(x - tierW, tierY);
    ctx.lineTo(x + tierW, tierY);
    ctx.closePath();
    ctx.fill();
  }
}

/**
 * Pattern: Aurora Bands
 * Vertical flowing gradient bands distorted by low-frequency fbm,
 * with soft edges creating a northern-lights effect.
 */
import { Rng, fbm1D, fbm2D } from '../rng';
import { sampleRamp, withAlpha } from '../color';

export function drawAuroraBands(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ramp: readonly string[],
  seed: number,
  inverted: boolean,
) {
  const rng = new Rng(seed);
  const colors = inverted ? [...ramp].reverse() : [...ramp];

  // Dark background
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, w, h);

  const bandCount = rng.int(5, 9);
  const bandWidth = w / bandCount;

  for (let b = 0; b < bandCount; b++) {
    const baseX = b * bandWidth;
    const t = (b + 0.5) / bandCount;
    const bandColor = sampleRamp(colors, t * 0.7 + 0.2);
    const offset = rng.range(0, 100);
    const warpScale = rng.range(0.8, 2.0);

    // Draw the band as a series of thin vertical strips
    const stripCount = Math.max(20, Math.floor(bandWidth / 2));

    for (let s = 0; s < stripCount; s++) {
      const st = s / stripCount;
      const localX = baseX + st * bandWidth;

      // fbm distortion on the x position
      const warpX = fbm1D(
        (localX / w) * 3 + offset,
        4,
        2.0,
        0.5,
      ) * bandWidth * warpScale;

      // Alpha falloff at band edges (soft edges)
      const edgeDist = Math.abs(st - 0.5) * 2; // 0 center, 1 edge
      const alpha = Math.pow(1 - edgeDist, 2) * rng.range(0.15, 0.5);

      // Vertical variation using 2D noise
      const ySteps = 20;
      for (let yi = 0; yi < ySteps; yi++) {
        const yt = yi / ySteps;
        const yWarp = fbm2D(
          (localX / w) * 2 + offset,
          yt * 3 + offset * 0.5,
          3,
        );
        const localAlpha = alpha * (0.3 + yWarp * 0.7);

        ctx.fillStyle = withAlpha(bandColor, localAlpha);
        ctx.fillRect(
          localX + warpX * (yt - 0.5),
          yt * h,
          Math.max(2, bandWidth / stripCount + 1),
          h / ySteps + 1,
        );
      }
    }
  }
}

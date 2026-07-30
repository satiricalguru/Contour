/**
 * Pattern: Geometric Facets
 * A low-poly triangulated mesh where each triangle is shaded by a
 * gradient sample at its centroid.
 */
import { Rng } from '../rng';
import { sampleRamp } from '../color';

interface Point {
  x: number;
  y: number;
}

interface Triangle {
  a: Point;
  b: Point;
  c: Point;
}

export function drawGeometricFacets(
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

  // Generate a grid of jittered points
  const cols = rng.int(8, 14);
  const rows = rng.int(6, 10);
  const cellW = w / cols;
  const cellH = h / rows;
  const jitter = 0.6;

  const points: Point[] = [];

  // Add edge points and interior points
  for (let r = -1; r <= rows + 1; r++) {
    for (let c = -1; c <= cols + 1; c++) {
      const x = c * cellW + rng.range(-cellW * jitter, cellW * jitter);
      const y = r * cellH + rng.range(-cellH * jitter, cellH * jitter);
      points.push({ x, y });
    }
  }

  // Simple Delaunay-ish triangulation using a grid-based approach
  const gridCols = cols + 3;
  const triangles: Triangle[] = [];

  for (let r = 0; r < rows + 2; r++) {
    for (let c = 0; c < cols + 2; c++) {
      const i = r * gridCols + c;
      const iRight = i + 1;
      const iBelow = i + gridCols;
      const iBelowRight = i + gridCols + 1;

      if (
        i < points.length &&
        iRight < points.length &&
        iBelow < points.length &&
        iBelowRight < points.length
      ) {
        // Split each quad into two triangles
        if (rng.chance(0.5)) {
          triangles.push({
            a: points[i],
            b: points[iRight],
            c: points[iBelow],
          });
          triangles.push({
            a: points[iRight],
            b: points[iBelowRight],
            c: points[iBelow],
          });
        } else {
          triangles.push({
            a: points[i],
            b: points[iRight],
            c: points[iBelowRight],
          });
          triangles.push({
            a: points[i],
            b: points[iBelowRight],
            c: points[iBelow],
          });
        }
      }
    }
  }

  // Gradient angle for shading
  const angle = rng.range(0, Math.PI);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Draw triangles
  for (const tri of triangles) {
    // Centroid
    const cx = (tri.a.x + tri.b.x + tri.c.x) / 3;
    const cy = (tri.a.y + tri.b.y + tri.c.y) / 3;

    // Gradient value at centroid
    const nx = cx / w - 0.5;
    const ny = cy / h - 0.5;
    const t = Math.max(0, Math.min(1, nx * cos + ny * sin + 0.5));

    ctx.fillStyle = sampleRamp(colors, t);
    ctx.strokeStyle = sampleRamp(colors, t);
    ctx.lineWidth = Math.max(0.5, Math.min(w, h) * 0.001);

    ctx.beginPath();
    ctx.moveTo(tri.a.x, tri.a.y);
    ctx.lineTo(tri.b.x, tri.b.y);
    ctx.lineTo(tri.c.x, tri.c.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke(); // Stroke same color to hide anti-aliasing seams
  }
}

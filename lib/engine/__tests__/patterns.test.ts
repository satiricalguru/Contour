import { describe, it, expect } from 'vitest';
import { PATTERNS, drawPattern } from '../patterns';

describe('Pattern registry & rendering', () => {
  it('contains registered patterns', () => {
    expect(PATTERNS.length).toBeGreaterThan(0);
    const flowingHills = PATTERNS.find((p) => p.id === 'flowing-hills');
    expect(flowingHills).toBeDefined();
  });

  it('draws pattern onto canvas context without throwing errors', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    expect(() => {
      drawPattern(ctx, 400, 300, 'flowing-hills', 'nordic-frost', 12345, false);
    }).not.toThrow();
  });

  it('handles unknown pattern or palette ids gracefully fallback', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    expect(() => {
      drawPattern(ctx, 100, 100, 'non-existent-pattern', 'invalid-palette', 1, false);
    }).not.toThrow();
  });
});

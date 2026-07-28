import { describe, it, expect } from 'vitest';
import { Rng } from '../rng';

describe('Rng pseudo-random generator', () => {
  it('produces deterministic output for the same seed', () => {
    const rng1 = new Rng(12345);
    const rng2 = new Rng(12345);

    const val1 = rng1.next();
    const val2 = rng2.next();

    expect(val1).toBe(val2);
  });

  it('produces values strictly within range', () => {
    const rng = new Rng(42);
    for (let i = 0; i < 100; i++) {
      const num = rng.range(10, 20);
      expect(num).toBeGreaterThanOrEqual(10);
      expect(num).toBeLessThan(20);
    }
  });

  it('picks random items from arrays deterministically', () => {
    const rng1 = new Rng(999);
    const rng2 = new Rng(999);
    const items = ['a', 'b', 'c', 'd', 'e'];

    expect(rng1.pick(items)).toBe(rng2.pick(items));
  });
});

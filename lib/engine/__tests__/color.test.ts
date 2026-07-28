import { describe, it, expect } from 'vitest';
import { parseHex, toHex, lerpRGB, interpolateRamp } from '../color';

describe('color engine utilities', () => {
  it('parses valid hex strings to RGB', () => {
    expect(parseHex('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(parseHex('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(parseHex('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
    expect(parseHex('0000ff')).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('converts RGB to hex string', () => {
    expect(toHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
    expect(toHex({ r: 0, g: 255, b: 0 })).toBe('#00ff00');
  });

  it('interpolates linearly between RGB values', () => {
    const c1 = { r: 0, g: 0, b: 0 };
    const c2 = { r: 100, g: 200, b: 50 };
    expect(lerpRGB(c1, c2, 0.5)).toEqual({ r: 50, g: 100, b: 25 });
  });

  it('interpolates multi-stop ramps smoothly', () => {
    const anchors = ['#000000', '#ffffff'];
    const ramp = interpolateRamp(anchors, 5);
    expect(ramp).toHaveLength(5);
    expect(ramp[0]).toBe('#000000');
    expect(ramp[4]).toBe('#ffffff');
  });
});

/**
 * Apple Watch device configurations — verified against official Apple specs.
 * Includes Apple Watch Ultra 2, Series 10 (46mm & 42mm), and SE (44mm).
 */
import { DeviceModel } from './types';

export const WATCH_DEVICES: readonly DeviceModel[] = [
  {
    id: 'apple-watch-ultra-2',
    category: 'watch',
    displayName: 'Apple Watch Ultra 2',
    bezelStyle: 'plain-bezel',
    resolution: { width: 410, height: 502 },
    aspectRatio: 410 / 502,
    cornerRadiusPct: 22,
    generation: '49mm Titanium',
  },
  {
    id: 'apple-watch-series-10-46',
    category: 'watch',
    displayName: 'Apple Watch Series 10 (46mm)',
    bezelStyle: 'plain-bezel',
    resolution: { width: 416, height: 496 },
    aspectRatio: 416 / 496,
    cornerRadiusPct: 24,
    generation: '46mm',
  },
  {
    id: 'apple-watch-series-10-42',
    category: 'watch',
    displayName: 'Apple Watch Series 10 (42mm)',
    bezelStyle: 'plain-bezel',
    resolution: { width: 374, height: 446 },
    aspectRatio: 374 / 446,
    cornerRadiusPct: 24,
    generation: '42mm',
  },
  {
    id: 'apple-watch-se-44',
    category: 'watch',
    displayName: 'Apple Watch SE (44mm)',
    bezelStyle: 'plain-bezel',
    resolution: { width: 368, height: 448 },
    aspectRatio: 368 / 448,
    cornerRadiusPct: 20,
    generation: '44mm SE',
  },
];

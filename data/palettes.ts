/**
 * Contour palette definitions.
 *
 * Each palette is a short list of anchor hex colors (dark → light).
 * At runtime, these are interpolated into a 10-stop ramp via `interpolateRamp`.
 * The `inverted` flag in the pattern draw call decides which end is background.
 */

export interface PaletteDef {
  id: string;
  name: string;
  anchors: readonly string[];
}

export const PALETTES: readonly PaletteDef[] = [
  // --- Original 14 moods ---
  {
    id: 'charcoal',
    name: 'Charcoal',
    anchors: ['#0a0a0a', '#1a1a2e', '#3d3d5c', '#8888aa', '#d0d0e0'],
  },
  {
    id: 'stone',
    name: 'Stone',
    anchors: ['#1c1c1c', '#3a3a3a', '#787878', '#b0b0b0', '#e8e8e8'],
  },
  {
    id: 'blue',
    name: 'Blue',
    anchors: ['#020c1b', '#0a2540', '#1565c0', '#64b5f6', '#e3f2fd'],
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    anchors: ['#1a0a00', '#4a1500', '#e65100', '#ff9800', '#fff3e0'],
  },
  {
    id: 'fire',
    name: 'Fire',
    anchors: ['#1b0000', '#4a0000', '#d32f2f', '#ff7043', '#ffe0b2'],
  },
  {
    id: 'purple',
    name: 'Purple',
    anchors: ['#0d001a', '#2a0845', '#7b1fa2', '#ce93d8', '#f3e5f5'],
  },
  {
    id: 'toxic-glow',
    name: 'Toxic Glow',
    anchors: ['#001a00', '#003300', '#00c853', '#76ff03', '#f0fff0'],
  },
  {
    id: 'arctic-winter',
    name: 'Arctic Winter',
    anchors: ['#0a1628', '#1a3a5c', '#4fc3f7', '#b3e5fc', '#ffffff'],
  },
  {
    id: 'neon-horizon',
    name: 'Neon Horizon',
    anchors: ['#0a001a', '#2d004d', '#e040fb', '#ff6090', '#fff0f5'],
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    anchors: ['#1a0500', '#5d1500', '#ff6d00', '#ffd740', '#fffde7'],
  },
  {
    id: 'deep-forest',
    name: 'Deep Forest',
    anchors: ['#021a05', '#0d3b13', '#2e7d32', '#81c784', '#e8f5e9'],
  },
  {
    id: 'cosmic-blush',
    name: 'Cosmic Blush Nebula',
    anchors: ['#0d0015', '#2a0a3a', '#8e24aa', '#f48fb1', '#fce4ec'],
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    anchors: ['#001020', '#003050', '#006064', '#26c6da', '#e0f7fa'],
  },
  {
    id: 'blood-moon',
    name: 'Blood Moon',
    anchors: ['#1a0000', '#3b0000', '#b71c1c', '#ef5350', '#ffcdd2'],
  },

  // --- 5 concrete palette starters from spec ---
  {
    id: 'midnight-jade',
    name: 'Midnight Jade',
    anchors: ['#04120d', '#0d3d2e', '#35b88a', '#eafff3'],
  },
  {
    id: 'rose-quartz',
    name: 'Rose Quartz',
    anchors: ['#1a0a12', '#6b2440', '#e8829f', '#fff0f4'],
  },
  {
    id: 'slate-mist',
    name: 'Slate Mist',
    anchors: ['#0d1117', '#384454', '#93a4b8', '#f2f5f8'],
  },
  {
    id: 'copper-dusk',
    name: 'Copper Dusk',
    anchors: ['#170a05', '#6b3410', '#e08a3c', '#ffe3b0'],
  },
  {
    id: 'glacier',
    name: 'Glacier',
    anchors: ['#020a12', '#0f3a52', '#6fc8e0', '#eafcff'],
  },
] as const;

/** Number of interpolated stops per palette ramp. */
export const RAMP_STOPS = 10;

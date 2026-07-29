/**
 * Contour global state — Zustand store.
 *
 * Manages: pattern, palette, seed, polarity, device selection, favorites.
 * Hydrates from URL params and persists favorites to localStorage.
 */
'use client';

import { create } from 'zustand';
import { DeviceCategory } from './devices';
import { PATTERNS } from './engine/patterns';
import { PALETTES } from '@/data/palettes';

export interface FavoriteItem {
  patternId: string;
  paletteId: string;
  seed: number;
  inverted: boolean;
}

export interface ContourState {
  // Generator state
  patternId: string;
  paletteId: string;
  seed: number;
  inverted: boolean;

  // Device selection
  deviceCategory: DeviceCategory;
  modelId: string;

  // Favorites (persisted in localStorage)
  favorites: FavoriteItem[];

  // Actions
  setPattern: (id: string) => void;
  setPalette: (id: string) => void;
  setSeed: (seed: number) => void;
  setInverted: (inverted: boolean) => void;
  togglePolarity: () => void;
  shuffle: () => void;
  setDeviceCategory: (cat: DeviceCategory) => void;
  setModelId: (id: string) => void;
  addFavorite: () => void;
  removeFavorite: (fav: FavoriteItem) => void;
  hydrateFromParams: (params: URLSearchParams) => void;
}

function generateSeed(): number {
  return Math.floor(Math.random() * 2147483647);
}

function loadFavorites(): FavoriteItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('contour-favorites');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs: FavoriteItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('contour-favorites', JSON.stringify(favs));
  } catch {
    // localStorage might be full or disabled
  }
}

export const useContourStore = create<ContourState>((set, get) => ({
  patternId: PATTERNS[0].id,
  paletteId: PALETTES[0].id,
  seed: 42, // Fixed deterministic initial seed for SSR hydration match
  inverted: false,
  deviceCategory: 'iphone',
  modelId: 'iphone-17-pro',
  favorites: loadFavorites(),

  setPattern: (id) => set({ patternId: id }),
  setPalette: (id) => set({ paletteId: id }),
  setSeed: (seed) => set({ seed }),
  setInverted: (inverted) => set({ inverted }),
  togglePolarity: () => set((s) => ({ inverted: !s.inverted })),

  shuffle: () => set({ seed: generateSeed() }),

  setDeviceCategory: (cat) => {
    // Also update the modelId to the default for that category
    const defaults: Record<DeviceCategory, string> = {
      mac: 'macbook-pro-14',
      iphone: 'iphone-17-pro',
      ipad: 'ipad-pro-11',
      watch: 'apple-watch-ultra-2',
    };
    set({ deviceCategory: cat, modelId: defaults[cat] });
  },

  setModelId: (id) => set({ modelId: id }),

  addFavorite: () => {
    const { patternId, paletteId, seed, inverted, favorites } = get();
    const exists = favorites.some(
      (f) =>
        f.patternId === patternId &&
        f.paletteId === paletteId &&
        f.seed === seed &&
        f.inverted === inverted,
    );
    if (!exists) {
      const newFavs = [...favorites, { patternId, paletteId, seed, inverted }];
      saveFavorites(newFavs);
      set({ favorites: newFavs });
    }
  },

  removeFavorite: (fav) => {
    const { favorites } = get();
    const newFavs = favorites.filter(
      (f) =>
        !(
          f.patternId === fav.patternId &&
          f.paletteId === fav.paletteId &&
          f.seed === fav.seed &&
          f.inverted === fav.inverted
        ),
    );
    saveFavorites(newFavs);
    set({ favorites: newFavs });
  },

  hydrateFromParams: (params) => {
    const updates: Partial<ContourState> = {};
    const p = params.get('pattern');
    const pal = params.get('palette');
    const s = params.get('seed');
    const inv = params.get('inverted');
    const cat = params.get('device');
    const model = params.get('model');

    if (p && PATTERNS.some((pt) => pt.id === p)) updates.patternId = p;
    if (pal && PALETTES.some((pl) => pl.id === pal)) updates.paletteId = pal;
    if (s) {
      const seedNum = parseInt(s, 10);
      if (!isNaN(seedNum)) updates.seed = seedNum;
    }
    if (inv !== null) updates.inverted = inv === 'true' || inv === '1';
    if (cat && ['mac', 'iphone', 'ipad'].includes(cat))
      updates.deviceCategory = cat as DeviceCategory;
    if (model) updates.modelId = model;

    if (Object.keys(updates).length > 0) set(updates);
  },
}));

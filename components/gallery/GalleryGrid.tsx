/**
 * GalleryGrid — browsable grid grouped by pattern, with filtering and Saved Favorites tab.
 */
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CURATED_WALLPAPERS } from '@/data/wallpapers';
import { PALETTES } from '@/data/palettes';
import { PATTERNS } from '@/lib/engine/patterns';
import { useContourStore, FavoriteItem } from '@/lib/store';
import { GalleryCard } from './GalleryCard';

export function GalleryGrid() {
  const { favorites, removeFavorite } = useContourStore();
  const [activeTab, setActiveTab] = useState<'catalog' | 'favorites'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'favorites') return 'favorites';
    }
    return 'catalog';
  });
  const [filterPalette, setFilterPalette] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'dark' | 'light'>('all');
  const [filterPattern, setFilterPattern] = useState<string>('all');

  const filteredCatalog = useMemo(() => {
    return CURATED_WALLPAPERS.filter((w) => {
      if (filterPalette !== 'all' && w.paletteId !== filterPalette) return false;
      if (filterMode === 'dark' && w.inverted) return false;
      if (filterMode === 'light' && !w.inverted) return false;
      if (filterPattern !== 'all' && w.patternId !== filterPattern) return false;
      return true;
    });
  }, [filterPalette, filterMode, filterPattern]);

  // Group catalog wallpapers by pattern
  const groupedCatalog = useMemo(() => {
    const groups: Record<string, typeof filteredCatalog> = {};
    for (const w of filteredCatalog) {
      if (!groups[w.patternId]) groups[w.patternId] = [];
      groups[w.patternId].push(w);
    }
    return groups;
  }, [filteredCatalog]);

  return (
    <div className="space-y-8">
      {/* Primary Tab Switcher: Catalog vs Saved Favorites */}
      <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-4">
        <div className="flex items-center gap-2 bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-[var(--heading-color)] text-[var(--background)] font-semibold shadow-sm'
                : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
            }`}
          >
            Curated Catalog ({CURATED_WALLPAPERS.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-semibold shadow-xs'
                : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'text-rose-500 fill-current' : 'text-current'}`}
              viewBox="0 0 20 20"
              fill={favorites.length > 0 ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={favorites.length > 0 ? '0' : '1.5'}
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Saved Favorites ({favorites.length})
          </button>
        </div>

        {activeTab === 'catalog' && (
          <span className="text-xs text-[var(--foreground-muted)] hidden sm:inline-block">
            Showing {filteredCatalog.length} of {CURATED_WALLPAPERS.length} wallpapers
          </span>
        )}
      </div>

      {/* VIEW 1: CURATED CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Pattern filter */}
            <select
              value={filterPattern}
              onChange={(e) => setFilterPattern(e.target.value)}
              className="bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-xl px-3 py-1.5 text-xs font-medium text-[var(--heading-color)] cursor-pointer hover:border-slate-400/40 transition-colors focus:outline-none"
              aria-label="Filter by pattern"
            >
              <option value="all" className="bg-slate-900 text-white">All Patterns</option>
              {PATTERNS.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>

            {/* Palette filter */}
            <select
              value={filterPalette}
              onChange={(e) => setFilterPalette(e.target.value)}
              className="bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-xl px-3 py-1.5 text-xs font-medium text-[var(--heading-color)] cursor-pointer hover:border-slate-400/40 transition-colors focus:outline-none"
              aria-label="Filter by palette"
            >
              <option value="all" className="bg-slate-900 text-white">All Palettes</option>
              {PALETTES.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>

            {/* Mode filter */}
            <div className="flex gap-1 bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-xl p-0.5">
              {(['all', 'dark', 'light'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 capitalize cursor-pointer ${
                    filterMode === mode
                      ? 'bg-[var(--heading-color)] text-[var(--background)] font-semibold shadow-xs'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Grouped grid */}
          {Object.entries(groupedCatalog).map(([patternId, wallpapers]) => {
            const pattern = PATTERNS.find((p) => p.id === patternId);
            return (
              <section key={patternId} className="space-y-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[var(--heading-color)]">
                    {pattern?.name ?? patternId}
                  </h2>
                  {pattern && (
                    <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                      {pattern.description}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {wallpapers.map((w) => (
                    <GalleryCard key={w.id} wallpaper={w} />
                  ))}
                </div>
              </section>
            );
          })}

          {filteredCatalog.length === 0 && (
            <div className="text-center py-20 text-[var(--foreground-muted)] space-y-2">
              <p className="text-base font-semibold text-[var(--heading-color)]">No wallpapers match your filters</p>
              <p className="text-xs">Try clearing or adjusting your pattern, palette, or mode filters above.</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: SAVED FAVORITES */}
      {activeTab === 'favorites' && (
        <div>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {favorites.map((fav: FavoriteItem, idx: number) => {
                const wallpaperItem = {
                  id: `fav-${idx}-${fav.patternId}-${fav.paletteId}-${fav.seed}`,
                  patternId: fav.patternId,
                  paletteId: fav.paletteId,
                  seed: fav.seed,
                  inverted: fav.inverted,
                };
                return (
                  <div key={wallpaperItem.id} className="relative group">
                    <GalleryCard wallpaper={wallpaperItem} />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFavorite(fav);
                      }}
                      className="absolute top-3 right-3 z-20 bg-black/70 hover:bg-rose-600 text-white rounded-full p-2 text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-lg"
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-8 space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--heading-color)]">
                  No Saved Favorites Yet
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] max-w-xs mx-auto leading-relaxed">
                  When you tweak wallpapers in the Generative Studio and click <strong>Save</strong>, they will be saved here for instant access.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-xs py-2.5 px-5 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                >
                  Go to Generative Studio →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

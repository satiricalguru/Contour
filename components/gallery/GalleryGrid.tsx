/**
 * GalleryGrid — browsable grid grouped by pattern, with filtering and Saved Favorites tab.
 */
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CURATED_WALLPAPERS } from '@/data/wallpapers';
import { PALETTES } from '@/data/palettes';
import { PATTERNS } from '@/lib/engine/patterns';
import { useContourStore, FavoriteItem } from '@/lib/store';
import { GalleryCard } from './GalleryCard';

export function GalleryGrid() {
  const { favorites, removeFavorite } = useContourStore();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [userTab, setUserTab] = useState<'catalog' | 'favorites' | null>(null);

  const activeTab = userTab ?? (tabParam === 'favorites' ? 'favorites' : 'catalog');
  const setActiveTab = (tab: 'catalog' | 'favorites') => setUserTab(tab);

  const [filterPalette, setFilterPalette] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'dark' | 'light'>('all');
  const [filterPattern, setFilterPattern] = useState<string>('all');

  const [pillStyle, setPillStyle] = useState<{ left: number; top: number; width: number; height: number; opacity: number }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const updatePillPosition = () => {
      const activeEl = tabRefs.current[activeTab];
      if (activeEl) {
        setPillStyle({
          left: activeEl.offsetLeft,
          top: activeEl.offsetTop,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          opacity: 1,
        });
      }
    };

    updatePillPosition();
    window.addEventListener('resize', updatePillPosition);
    return () => window.removeEventListener('resize', updatePillPosition);
  }, [activeTab]);

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
        <div className="relative flex items-center gap-1 bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-2xl p-1">
          {/* Sliding Liquid Glass Indicator */}
          <div
            className="absolute top-0 left-0 rounded-xl bg-[var(--heading-color)] shadow-sm transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            style={{
              transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
              width: `${pillStyle.width}px`,
              height: `${pillStyle.height}px`,
              opacity: pillStyle.opacity,
            }}
          />

          <button
            ref={(el) => {
              tabRefs.current['catalog'] = el;
            }}
            onClick={() => setActiveTab('catalog')}
            className={`relative z-10 px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              activeTab === 'catalog'
                ? 'text-[var(--background)] font-semibold'
                : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
            }`}
          >
            Curated Catalog ({CURATED_WALLPAPERS.length})
          </button>
          <button
            ref={(el) => {
              tabRefs.current['favorites'] = el;
            }}
            onClick={() => setActiveTab('favorites')}
            className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
              activeTab === 'favorites'
                ? 'text-[var(--background)] font-semibold'
                : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors ${
                activeTab === 'favorites'
                  ? 'text-rose-500 fill-current'
                  : favorites.length > 0
                  ? 'text-rose-500 fill-current'
                  : 'text-current'
              }`}
              viewBox="0 0 20 20"
              fill={activeTab === 'favorites' || favorites.length > 0 ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={activeTab === 'favorites' || favorites.length > 0 ? '0' : '1.5'}
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
        <div className="space-y-12">
          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl">
            {/* Pattern Filter */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-1">
                Pattern
              </label>
              <select
                value={filterPattern}
                onChange={(e) => setFilterPattern(e.target.value)}
                className="w-full bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-xl px-3 py-1.5 text-xs text-[var(--heading-color)] focus:outline-none focus:ring-1 focus:ring-[var(--heading-color)] cursor-pointer"
              >
                <option value="all">All Patterns ({PATTERNS.length})</option>
                {PATTERNS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Palette Filter */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-1">
                Palette
              </label>
              <select
                value={filterPalette}
                onChange={(e) => setFilterPalette(e.target.value)}
                className="w-full bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-xl px-3 py-1.5 text-xs text-[var(--heading-color)] focus:outline-none focus:ring-1 focus:ring-[var(--heading-color)] cursor-pointer"
              >
                <option value="all">All Palettes ({PALETTES.length})</option>
                {PALETTES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-1">
                Polarity Mode
              </label>
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value as 'all' | 'dark' | 'light')}
                className="w-full bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-xl px-3 py-1.5 text-xs text-[var(--heading-color)] focus:outline-none focus:ring-1 focus:ring-[var(--heading-color)] cursor-pointer"
              >
                <option value="all">All Modes</option>
                <option value="dark">Dark Only</option>
                <option value="light">Light Only</option>
              </select>
            </div>
          </div>

          {/* Grouped Pattern Sections */}
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
            <div className="relative text-center py-16 px-8 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl shadow-lg max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--pill-bg)] border border-[var(--card-border)] flex items-center justify-center mx-auto text-[var(--foreground-muted)]">
                <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p className="text-base font-bold text-[var(--heading-color)]">No wallpapers match your filters</p>
              <p className="text-xs text-[var(--foreground-muted)] max-w-xs mx-auto">Try adjusting your pattern, palette, or mode options above.</p>
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
            <div className="relative overflow-hidden text-center py-20 px-8 bg-gradient-to-b from-[var(--card-bg)] via-[var(--card-bg)] to-rose-500/[0.04] border border-[var(--card-border)] rounded-3xl backdrop-blur-2xl shadow-2xl space-y-6 max-w-lg mx-auto group">
              {/* Ambient Rose Glass Glow Orb */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-rose-500/15 via-rose-500/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* Premium Heart Glass Badge */}
              <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-rose-600/5 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto shadow-[0_8px_32px_rgba(244,63,94,0.25)] group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
                <svg className="w-9 h-9 fill-current text-rose-500 drop-shadow-[0_2px_12px_rgba(244,63,94,0.6)]" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--heading-color)]">
                  No Saved Favorites Yet
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-sm mx-auto leading-relaxed">
                  When you customize wallpapers in the <strong className="text-[var(--heading-color)] font-semibold">Generative Studio</strong> and click <strong className="text-[var(--heading-color)] font-semibold">Save</strong>, they will be stored here for instant 4K export and access.
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-[var(--heading-color)] text-[var(--background)] hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group/btn"
                >
                  <span>Open Generative Studio</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

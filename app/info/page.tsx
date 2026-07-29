/**
 * Information page — Complete A to Z Reference Guide & Technical Specifications for Contour.
 * Designed with Apple-grade editorial typography, bento cards, interactive spec search, and glassmorphism.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PATTERNS } from '@/lib/engine/patterns';
import { PALETTES } from '@/data/palettes';
import { ALL_DEVICES } from '@/lib/devices';

export default function InfoPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mac' | 'iphone' | 'ipad' | 'watch'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const macCount = ALL_DEVICES.filter((d) => d.category === 'mac').length;
  const iphoneCount = ALL_DEVICES.filter((d) => d.category === 'iphone').length;
  const ipadCount = ALL_DEVICES.filter((d) => d.category === 'ipad').length;
  const watchCount = ALL_DEVICES.filter((d) => d.category === 'watch').length;

  const filteredDevices = ALL_DEVICES.filter((d) => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch =
      d.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.bezelStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${d.resolution.width}x${d.resolution.height}`.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* ================================================================
          HERO HEADER
          ================================================================ */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--pill-bg)] border border-[var(--card-border)] text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)] shadow-xs">
          <span>System Architecture &amp; Reference</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-[var(--heading-color)] leading-[1.1]">
          Contour <span className="text-[var(--foreground-muted)] font-normal">A to Z Documentation</span>
        </h1>

        <p className="text-base sm:text-xl text-[var(--foreground-muted)] font-light leading-relaxed max-w-2xl mx-auto">
          Everything about Contour — from our procedural canvas rendering algorithms and color interpolation math to verified specs for {ALL_DEVICES.length} native Apple hardware profiles.
        </p>
      </div>

      {/* ================================================================
          STATS HIGHLIGHTS STRIP
          ================================================================ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[2rem] p-6 sm:p-8 text-center backdrop-blur-2xl shadow-xl">
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--heading-color)] tracking-tight font-[system-ui]">
            {PATTERNS.length}
          </div>
          <div className="text-[11px] text-[var(--foreground-muted)] font-semibold uppercase tracking-widest">
            Generative Patterns
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--heading-color)] tracking-tight font-[system-ui]">
            {PALETTES.length}
          </div>
          <div className="text-[11px] text-[var(--foreground-muted)] font-semibold uppercase tracking-widest">
            Atmospheric Ramps
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--heading-color)] tracking-tight font-[system-ui]">
            {ALL_DEVICES.length}
          </div>
          <div className="text-[11px] text-[var(--foreground-muted)] font-semibold uppercase tracking-widest">
            Apple Devices Verified
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--heading-color)] tracking-tight font-[system-ui]">
            100%
          </div>
          <div className="text-[11px] text-[var(--foreground-muted)] font-semibold uppercase tracking-widest">
            Procedural Engine
          </div>
        </div>
      </div>

      {/* ================================================================
          A to Z SYSTEM GUIDE & SPECIFICATIONS
          ================================================================ */}
      <section className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--card-border)] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Core Architecture</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--heading-color)] tracking-tight mt-1">
              A to Z Technical Reference
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-md">
            Comprehensive breakdown of mathematical generators, frame treatments, and 4K export pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* A — Algorithms */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/30 rounded-[2rem] p-6 sm:p-8 space-y-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-sm">
                A
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Algorithms &amp; Procedural Generation
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed font-normal">
              Every pattern in Contour is created procedurally using pure mathematical algorithms. We utilize a seeded{' '}
              <code className="text-cyan-400 bg-[var(--pill-bg)] border border-[var(--card-border)] px-2 py-0.5 rounded-md text-xs font-mono">
                mulberry32
              </code>{' '}
              Pseudo-Random Number Generator (PRNG) combined with 1D/2D value noise and fractal Brownian motion (fBm). This ensures that every random seed generates a completely deterministic, reproducible vector wallpaper at infinite scale.
            </p>
          </div>

          {/* B — Bezel Treatments */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-indigo-500/30 rounded-[2rem] p-6 sm:p-8 space-y-5 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-sm">
                B
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Bezel Treatments &amp; Hardware Frames
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Contour features a configuration-driven frame system supporting four native Apple bezel styles:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--pill-bg)] border border-[var(--card-border)] space-y-1">
                <div className="text-xs font-bold text-[var(--heading-color)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Dynamic Island
                </div>
                <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Pill-shaped sensor cutout scaled in exact percentage for modern Pro/Air iPhones.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--pill-bg)] border border-[var(--card-border)] space-y-1">
                <div className="text-xs font-bold text-[var(--heading-color)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" /> Notch Display
                </div>
                <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Trapezoidal display cutout with rounded bottom radii for MacBook Air/Pro and flagship iPhones.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--pill-bg)] border border-[var(--card-border)] space-y-1">
                <div className="text-xs font-bold text-[var(--heading-color)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Plain Uniform Bezel
                </div>
                <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Minimalist symmetrical border frame for MacBook Neo, classic MacBooks, and iPad displays.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--pill-bg)] border border-[var(--card-border)] space-y-1">
                <div className="text-xs font-bold text-[var(--heading-color)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Home Button &amp; Wearable Squircle
                </div>
                <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Touch ID chin bezel for iPhone SE &amp; authentic squircle OLED display chassis for Apple Watch.
                </div>
              </div>
            </div>
          </div>

          {/* C — Color Ramps & Polarity */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-purple-500/30 rounded-[2rem] p-6 sm:p-8 space-y-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold text-sm">
                C
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Color Ramps &amp; Polarity Synthesis
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Palettes consist of 3–5 anchor colors interpolated at runtime into a smooth 10-stop color ramp using linear RGB interpolation (<code className="text-purple-400 bg-[var(--pill-bg)] border border-[var(--card-border)] px-2 py-0.5 rounded-md text-xs font-mono">lerpRGB</code>). The <strong className="text-[var(--heading-color)]">Polarity Toggle</strong> enables instantaneous switching between light and dark modes by reversing ramp orientation without altering the curated palette selection.
            </p>
          </div>

          {/* D — Device Database */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-emerald-500/30 rounded-[2rem] p-6 sm:p-8 space-y-6 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm">
                  D
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                    Device Database &amp; Specifications
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                    Verified resolutions for {ALL_DEVICES.length} Apple hardware models ({macCount} Mac, {iphoneCount} iPhone, {ipadCount} iPad, {watchCount} Watch).
                  </p>
                </div>
              </div>

              {/* Filter pills & Search input */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search model or resolution..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3.5 py-1.5 rounded-full bg-[var(--pill-bg)] border border-[var(--card-border)] text-xs text-[var(--heading-color)] placeholder-[var(--foreground-muted)] focus:outline-none focus:border-emerald-500/50 w-44 sm:w-56"
                  />
                </div>
                {(['all', 'mac', 'iphone', 'ipad', 'watch'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-black shadow-md'
                        : 'bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Device Table */}
            <div className="overflow-x-auto border border-[var(--card-border)] rounded-2xl bg-[var(--pill-bg)]">
              <table className="w-full text-left text-xs text-[var(--foreground-muted)]">
                <thead className="bg-[var(--card-bg)] text-[var(--heading-color)] font-bold border-b border-[var(--card-border)]">
                  <tr>
                    <th className="p-3.5">Hardware Model</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Bezel Style</th>
                    <th className="p-3.5">Native Resolution</th>
                    <th className="p-3.5">Aspect Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--card-border)] font-mono">
                  {filteredDevices.length > 0 ? (
                    filteredDevices.map((d) => (
                      <tr key={d.id} className="hover:bg-[var(--card-bg)] transition-colors">
                        <td className="p-3.5 font-semibold text-[var(--heading-color)] font-sans">{d.displayName}</td>
                        <td className="p-3.5 capitalize font-sans">
                          <span className="px-2 py-0.5 rounded-md bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[11px]">
                            {d.category}
                          </span>
                        </td>
                        <td className="p-3.5 capitalize font-sans">{d.bezelStyle.replace('-', ' ')}</td>
                        <td className="p-3.5 text-emerald-400 font-semibold">
                          {d.resolution.width} × {d.resolution.height} px
                        </td>
                        <td className="p-3.5">{d.aspectRatio.toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-xs text-[var(--foreground-muted)] font-sans">
                        No devices match your search query &quot;{searchQuery}&quot;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* E — Export Engine */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-amber-500/30 rounded-[2rem] p-6 sm:p-8 space-y-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-sm">
                E
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Export Engine &amp; 4K Lossless Rendering
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Exporting renders wallpapers directly at the 1:1 pixel resolution of your chosen device target (e.g. 3456 × 2234 for MacBook Pro 16&quot; or 1320 × 2868 for iPhone 17 Pro Max). We use client-side{' '}
              <code className="text-amber-400 bg-[var(--pill-bg)] border border-[var(--card-border)] px-2 py-0.5 rounded-md text-xs font-mono">
                OffscreenCanvas
              </code>{' '}
              to execute ultra-fast, lossless 4K image generation without server bottlenecks or compression artifacts.
            </p>
          </div>

          {/* F & G — Favorites & Gallery */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-pink-500/30 rounded-[2rem] p-6 sm:p-8 space-y-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold text-sm">
                F
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Favorites &amp; Gallery Curation
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              The <strong className="text-[var(--heading-color)]">Gallery</strong> features 37 hand-selected preset wallpapers organized by pattern families. Any customized design can be saved directly to your personal <strong className="text-[var(--heading-color)]">Favorites</strong> collection backed by client-side <code className="text-pink-400 bg-[var(--pill-bg)] border border-[var(--card-border)] px-2 py-0.5 rounded-md text-xs font-mono">localStorage</code> persistence.
            </p>
          </div>

          {/* K — Keyboard Shortcuts */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-teal-500/30 rounded-[2rem] p-6 sm:p-8 space-y-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold text-sm">
                K
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Keyboard Navigation Shortcuts
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              While inside the Studio generator, press{' '}
              <kbd className="bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] px-2.5 py-1 rounded-md text-xs font-mono shadow-xs">
                Space
              </kbd>{' '}
              to instantly roll a new random seed and refresh the wallpaper algorithm live.
            </p>
          </div>

          {/* P — Pattern Catalog */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-blue-500/30 rounded-[2rem] p-6 sm:p-8 space-y-6 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm">
                P
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Pattern Catalog &amp; Algorithms ({PATTERNS.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PATTERNS.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-[var(--pill-bg)] border border-[var(--card-border)] space-y-1.5 hover:border-blue-500/30 transition-colors">
                  <div className="text-xs font-bold text-[var(--heading-color)] flex items-center justify-between">
                    <span>{p.name}</span>
                    <span className="text-[10px] font-mono text-[var(--foreground-muted)] uppercase">{p.id}</span>
                  </div>
                  <div className="text-xs text-[var(--foreground-muted)] leading-relaxed font-normal">{p.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* T — Tech Stack */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-violet-500/30 rounded-[2rem] p-6 sm:p-8 space-y-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold text-sm">
                T
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Modern Web Tech Stack
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Engineered with Next.js 16 (App Router &amp; Turbopack), TypeScript, Tailwind CSS v4, Zustand state management, and HTML5 Canvas 2D API. Zero backend database or external image dependencies required.
            </p>
          </div>

          {/* Z — Zero Scraped Assets */}
          <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-rose-500/30 rounded-[2rem] p-6 sm:p-8 space-y-4 backdrop-blur-2xl transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-sm">
                Z
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] tracking-tight">
                Zero Stock or Scraped Assets
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Contour is 100% mathematical and generative. No stock photos, pre-rendered raster assets, or scraped images are used — delivering zero payload latency and infinite customizable wallpaper variations.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          BOTTOM CALL TO ACTION BANNER
          ================================================================ */}
      <div className="relative bg-gradient-to-b from-[var(--card-bg)] to-[var(--pill-bg)] border border-[var(--card-border)] rounded-[2.5rem] p-8 sm:p-12 text-center space-y-6 shadow-2xl backdrop-blur-3xl overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--heading-color)] tracking-tight">
            Ready to design your wallpaper?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--foreground-muted)] font-normal leading-relaxed">
            Configure mathematical algorithms live inside our Studio or pick from 37 curated presets in the Gallery.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/studio"
            className="px-6 py-3 rounded-full bg-[var(--heading-color)] text-[var(--background)] font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-lg hover:scale-[1.02]"
          >
            Open Studio Generator →
          </Link>
          <Link
            href="/gallery"
            className="px-6 py-3 rounded-full bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--heading-color)] font-medium text-xs sm:text-sm hover:border-cyan-500/40 transition-all"
          >
            Browse Gallery Presets
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Information page — Complete A to Z Reference Guide & Documentation for Contour.
 */
import Link from 'next/link';
import { PATTERNS } from '@/lib/engine/patterns';
import { PALETTES } from '@/data/palettes';
import { ALL_DEVICES } from '@/lib/devices';

export const metadata = {
  title: 'Information A–Z — Contour Studio',
  description: 'Complete documentation, technical specs, device database, and pattern guide for Contour Generative Wallpaper Studio.',
};

export default function InfoPage() {
  const macCount = ALL_DEVICES.filter((d) => d.category === 'mac').length;
  const iphoneCount = ALL_DEVICES.filter((d) => d.category === 'iphone').length;
  const ipadCount = ALL_DEVICES.filter((d) => d.category === 'ipad').length;
  const watchCount = ALL_DEVICES.filter((d) => d.category === 'watch').length;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--heading-color)]">
          Contour: A to Z Documentation
        </h1>
        <p className="text-base sm:text-lg text-[var(--foreground-muted)] font-normal leading-relaxed">
          Everything you need to know about Contour — from our procedural canvas rendering engines and color interpolation science to the full database of {ALL_DEVICES.length} native Apple device specifications.
        </p>
      </div>

      {/* Quick Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 text-center shadow-xs">
        <div>
          <div className="text-3xl font-extrabold text-[var(--heading-color)]">{PATTERNS.length}</div>
          <div className="text-xs text-[var(--foreground-muted)] font-medium mt-1 uppercase tracking-wider">Generative Patterns</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-[var(--heading-color)]">{PALETTES.length}</div>
          <div className="text-xs text-[var(--foreground-muted)] font-medium mt-1 uppercase tracking-wider">Mood Palettes</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-[var(--heading-color)]">{ALL_DEVICES.length}</div>
          <div className="text-xs text-[var(--foreground-muted)] font-medium mt-1 uppercase tracking-wider">Device Hardware Specs</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-[var(--heading-color)]">0</div>
          <div className="text-xs text-[var(--foreground-muted)] font-medium mt-1 uppercase tracking-wider">Scraped / Stock Assets</div>
        </div>
      </div>

      {/* A to Z Glossary & Guide */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-[var(--heading-color)] tracking-tight border-b border-[var(--card-border)] pb-4">
          A to Z Comprehensive Reference
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* A */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">A</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Algorithms & Procedural Generation</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Every pattern in Contour is created procedurally using pure mathematical algorithms. We utilize a seeded <code className="text-[var(--heading-color)] bg-[var(--pill-bg)] border border-[var(--card-border)] px-1.5 py-0.5 rounded text-xs font-mono">mulberry32</code> Pseudo-Random Number Generator (PRNG) combined with 1D/2D value noise and fractal Brownian motion (fbm). This ensures that every random seed generates a completely deterministic, reproducible wallpaper.
            </p>
          </div>

          {/* B */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">B</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Bezel Treatments & Cutouts</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Contour features a configuration-driven frame system supporting four distinct bezel styles:
            </p>
            <ul className="list-disc list-inside text-sm text-[var(--foreground-muted)] space-y-1.5 pt-1">
              <li><strong className="text-[var(--heading-color)]">Dynamic Island:</strong> Pill-shaped sensor cutout scaled in percentage for modern Pro/Air iPhones.</li>
              <li><strong className="text-[var(--heading-color)]">Notch:</strong> Trapezoidal display cutout with bottom rounded corners for MacBook Air/Pro and iPhone 14/16e/17e.</li>
              <li><strong className="text-[var(--heading-color)]">Plain Bezel:</strong> Uniform border frame for MacBook Neo, classic MacBooks, and all iPad models.</li>
              <li><strong className="text-[var(--heading-color)]">Home Button:</strong> Legacy chin bezel with physical Touch ID circle for iPhone SE.</li>
            </ul>
          </div>

          {/* C */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">C</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Color Ramps & Polarity</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Palettes consist of 3–5 anchor colors interpolated at runtime into a smooth 10-stop color ramp using linear RGB interpolation (<code className="text-[var(--heading-color)] bg-[var(--pill-bg)] border border-[var(--card-border)] px-1.5 py-0.5 rounded text-xs font-mono">lerpRGB</code>). The <strong className="text-[var(--heading-color)]">Polarity Toggle</strong> allows switching between dark mode and light mode by reversing the ramp orientation without altering the palette choice.
            </p>
          </div>

          {/* D */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-4">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">D</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Device Database & Hardware Specifications</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Contour contains verified screen resolutions and aspect ratios for {ALL_DEVICES.length} Apple hardware models ({macCount} Mac laptops, {iphoneCount} iPhones, {ipadCount} iPads, and {watchCount} Apple Watches).
            </p>

            {/* Device list table */}
            <div className="overflow-x-auto border border-[var(--card-border)] rounded-xl">
              <table className="w-full text-left text-xs text-[var(--foreground-muted)]">
                <thead className="bg-[var(--pill-bg)] text-[var(--heading-color)] font-bold border-b border-[var(--card-border)]">
                  <tr>
                    <th className="p-3">Model</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Bezel Style</th>
                    <th className="p-3">Native Resolution</th>
                    <th className="p-3">Aspect Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--card-border)]">
                  {ALL_DEVICES.map((d) => (
                    <tr key={d.id} className="hover:bg-[var(--pill-bg)] transition-colors">
                      <td className="p-3 font-semibold text-[var(--heading-color)]">{d.displayName}</td>
                      <td className="p-3 capitalize">{d.category}</td>
                      <td className="p-3 capitalize">{d.bezelStyle.replace('-', ' ')}</td>
                      <td className="p-3 font-mono">{d.resolution.width} × {d.resolution.height} px</td>
                      <td className="p-3 font-mono">{d.aspectRatio.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* E */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">E</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Export Engine</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Exporting renders the wallpaper at the exact native resolution of the selected device (e.g. 3456 × 2234 for MacBook Pro 16&quot; or 1320 × 2868 for iPhone 17 Pro Max). We use <code className="text-[var(--heading-color)] bg-[var(--pill-bg)] border border-[var(--card-border)] px-1.5 py-0.5 rounded text-xs font-mono">OffscreenCanvas</code> to perform high-resolution rendering efficiently.
            </p>
          </div>

          {/* F & G */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">F</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Favorites & Gallery Curation</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              The <strong className="text-[var(--heading-color)]">Gallery</strong> tab features 37 curated wallpapers grouped by pattern family. Any design can be saved to your local <strong className="text-[var(--heading-color)]">Favorites</strong> collection using browser <code className="text-[var(--heading-color)] bg-[var(--pill-bg)] border border-[var(--card-border)] px-1.5 py-0.5 rounded text-xs font-mono">localStorage</code>.
            </p>
          </div>

          {/* K */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">K</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Keyboard Shortcuts</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              In the Studio generator, press <kbd className="bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] px-2 py-0.5 rounded text-xs font-mono">Space</kbd> to instantly generate a new variation with a new random seed.
            </p>
          </div>

          {/* P */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-4">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">P</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Pattern Catalog</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PATTERNS.map((p) => (
                <div key={p.id} className="bg-[var(--pill-bg)] border border-[var(--card-border)] p-3.5 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-[var(--heading-color)]">{p.name}</div>
                  <div className="text-[11px] text-[var(--foreground-muted)] leading-normal">{p.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* T */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">T</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Tech Stack</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Zustand, and HTML5 Canvas 2D API. No backend, database, or external image dependencies required.
            </p>
          </div>

          {/* Z */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 space-y-3">
            <span className="inline-block w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--heading-color)] font-bold text-center leading-8 text-sm">Z</span>
            <h3 className="text-lg font-bold text-[var(--heading-color)]">Zero Scraped Assets</h3>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              Contour is 100% generative. There are no stock photos, pre-rendered JPEGs, or scraped assets anywhere in the application — allowing instant, lightweight loading and infinite variation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer banner */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-bold text-[var(--heading-color)]">Ready to create your wallpaper?</h3>
        <p className="text-sm text-[var(--foreground-muted)] max-w-xl mx-auto">
          Jump straight into the Studio generator or browse our curated gallery collection.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/studio"
            className="px-6 py-2.5 rounded-full bg-[var(--heading-color)] text-[var(--background)] font-semibold text-xs hover:opacity-90 transition-all shadow-sm"
          >
            Open Studio Generator →
          </Link>
          <Link
            href="/gallery"
            className="px-6 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--heading-color)] font-medium text-xs hover:border-slate-400/40 transition-all"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

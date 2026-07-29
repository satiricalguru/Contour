/**
 * Contour Homepage — Dedicated product homepage featuring the full-screen
 * procedural animated background canvas, hero stage, feature pillars, and navigation portals.
 */
import Link from 'next/link';
import { AnimatedHeroBackground } from '@/components/hero/AnimatedHeroBackground';
import { HeroFeatureStage } from '@/components/hero/HeroFeatureStage';

export default function Homepage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* --- HERO SECTION WITH ANIMATED CANVAS BACKGROUND --- */}
      <section className="relative flex flex-col items-center text-center px-4 pt-2 sm:pt-4 pb-12 overflow-hidden bg-black">
        {/* Real-time procedural animated background canvas */}
        <AnimatedHeroBackground />

        {/* Hero content layer */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-4 pt-0">
          {/* Apple Ecosystem Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs font-medium text-white/80 backdrop-blur-2xl shadow-lg shadow-black/20 hover:bg-white/[0.12] transition-colors">
            <svg className="w-3.5 h-3.5 fill-current text-white/90" viewBox="0 0 814 1000">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
            </svg>
            <span>Crafted for macOS, iOS, iPadOS & watchOS</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter bg-gradient-to-b from-white via-white/95 to-white/50 bg-clip-text text-transparent leading-[1.1]">
            Generative Wallpapers <br className="hidden sm:inline" />
            <span className="font-light text-white/75 text-2xl sm:text-4xl block mt-1 tracking-tight">
              Pro Studio & Mockup Engine
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto font-normal leading-relaxed tracking-normal">
            Procedurally render minimalist vector landscapes at 1:1 Apple hardware resolution.
            Preview live inside Liquid Retina & Super Retina displays before 4K export.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/studio"
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-white/90 shadow-xl shadow-white/10 hover:shadow-white/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
            >
              <span>Open Studio Generator</span>
              <span className="text-base">→</span>
            </Link>
            <Link
              href="/gallery"
              className="px-5 py-3 rounded-full bg-white/[0.08] border border-white/15 text-white font-medium text-xs sm:text-sm hover:bg-white/15 backdrop-blur-2xl transition-all duration-300 flex items-center gap-2"
            >
              <span>Browse Gallery Presets</span>
              <span className="text-base opacity-70">→</span>
            </Link>
          </div>

          {/* Interactive Feature Mockup Stage */}
          <HeroFeatureStage />
        </div>

        {/* Feature stats strip */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8 pt-6 border-t border-white/10 text-center">
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-white tracking-tight">13</div>
            <div className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Procedural Algorithms</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-white tracking-tight">19</div>
            <div className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Atmospheric Ramps</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-white tracking-tight">33</div>
            <div className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Apple Hardware Profiles</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-bold text-white tracking-tight">4K</div>
            <div className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Lossless Render Engine</div>
          </div>
        </div>
      </section>

      {/* --- HOMEPAGE FEATURE PILLARS SECTION (APPLE BENTO GRID) --- */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pill-bg)] border border-[var(--card-border)] text-[11px] font-bold uppercase tracking-widest text-[var(--foreground-muted)] shadow-xs">
            Ecosystem Highlights
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--heading-color)] tracking-tighter">
            Built for Apple Displays
          </h2>
          <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-lg mx-auto leading-relaxed">
            Engineered from pure mathematics for pixel-perfect clarity on ProMotion & Retina panels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1: Generative Studio */}
          <Link
            href="/studio"
            className="group relative flex flex-col justify-between bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-cyan-500/40 dark:hover:border-cyan-400/40 rounded-[2.25rem] p-7 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
          >
            <div className="space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                  REAL-TIME ENGINE
                </span>
                <span className="text-xs font-medium text-[var(--subtle-link)] group-hover:text-cyan-400 transition-colors">
                  Studio →
                </span>
              </div>

              {/* Visual Mini Graphic: Animated Wave & Sliders */}
              <div className="dark-preview-box h-32 w-full rounded-2xl bg-slate-950 border border-white/10 p-4 flex flex-col justify-between overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center justify-between text-[10px] text-white/50 font-mono">
                  <span>PROMOTION 120HZ</span>
                  <span className="text-cyan-400 font-semibold">SEED #4092</span>
                </div>
                {/* Sine wave mockup */}
                <div className="relative h-12 w-full flex items-center justify-center">
                  <svg className="w-full h-full text-cyan-400/90" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 15 Q25 0, 50 15 T100 15" />
                    <path d="M0 20 Q25 5, 50 20 T100 20" opacity="0.5" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 bg-white/15 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-cyan-400 rounded-full" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[var(--heading-color)] tracking-tight">
                  Generative Studio
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Tweak 13 mathematical algorithms, 19 mood ramps, polarity, and seed states live with floating glass controls.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-[var(--heading-color)] group-hover:translate-x-1.5 transition-transform">
              <span>Launch Studio Configurator</span>
              <span className="text-cyan-400">→</span>
            </div>
          </Link>

          {/* Pillar 2: Curated Gallery */}
          <Link
            href="/gallery"
            className="group relative flex flex-col justify-between bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-purple-500/40 dark:hover:border-purple-400/40 rounded-[2.25rem] p-7 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden"
          >
            <div className="space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400">
                  37 PRESETS
                </span>
                <span className="text-xs font-medium text-[var(--subtle-link)] group-hover:text-purple-400 transition-colors">
                  Gallery →
                </span>
              </div>

              {/* Visual Mini Graphic: Stacked Palette Cards */}
              <div className="dark-preview-box h-32 w-full rounded-2xl bg-slate-950 border border-white/10 p-4 flex items-center justify-center gap-2 overflow-hidden relative group-hover:border-purple-500/30 transition-colors">
                <div className="w-16 h-22 rounded-xl bg-gradient-to-b from-indigo-500 to-purple-800 border border-white/20 transform -rotate-6 shadow-md transition-transform group-hover:-rotate-12" />
                <div className="w-16 h-22 rounded-xl bg-gradient-to-b from-teal-400 to-blue-700 border border-white/20 z-10 shadow-lg scale-105" />
                <div className="w-16 h-22 rounded-xl bg-gradient-to-b from-rose-500 to-amber-700 border border-white/20 transform rotate-6 shadow-md transition-transform group-hover:rotate-12" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[var(--heading-color)] tracking-tight">
                  Curated Gallery
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Browse 37 hand-selected pattern & palette combinations, filterable by family, mood tone, and polarity.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-[var(--heading-color)] group-hover:translate-x-1.5 transition-transform">
              <span>Explore Palette Catalog</span>
              <span className="text-purple-400">→</span>
            </div>
          </Link>

          {/* Pillar 3: Documentation */}
          <Link
            href="/info"
            className="group relative flex flex-col justify-between bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-emerald-500/40 dark:hover:border-emerald-400/40 rounded-[2.25rem] p-7 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden"
          >
            <div className="space-y-5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  TECHNICAL SPECS
                </span>
                <span className="text-xs font-medium text-[var(--subtle-link)] group-hover:text-emerald-400 transition-colors">
                  Info →
                </span>
              </div>

              {/* Visual Mini Graphic: Code Chips & Architecture Specs */}
              <div className="dark-preview-box h-32 w-full rounded-2xl bg-slate-950 border border-white/10 p-4 flex flex-col justify-between font-mono text-[10px] overflow-hidden relative group-hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between text-emerald-400 font-semibold">
                  <span>OFFSCREENCANVAS</span>
                  <span className="text-white/60">4K PNG</span>
                </div>
                <div className="space-y-1.5">
                  <div className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-white/90 flex items-center justify-between">
                    <span>Mulberry32 PRNG</span>
                    <span className="text-emerald-400 font-semibold">OK</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-white/90 flex items-center justify-between">
                    <span>33 Apple Devices</span>
                    <span className="text-emerald-400 font-semibold">100%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[var(--heading-color)] tracking-tight">
                  System Architecture
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Learn about our 33 hardware specifications, OffscreenCanvas 4K export pipeline, and PRNG algorithms.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-[var(--heading-color)] group-hover:translate-x-1.5 transition-transform">
              <span>Read Documentation</span>
              <span className="text-emerald-400">→</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

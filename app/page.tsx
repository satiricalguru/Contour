/**
 * Contour Homepage — Apple-grade premium product homepage with full-screen
 * aurora canvas hero, device showcase, and editorial feature sections.
 */
import Link from 'next/link';
import { AnimatedHeroBackground } from '@/components/hero/AnimatedHeroBackground';
import { HeroFeatureStage } from '@/components/hero/HeroFeatureStage';

export default function Homepage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* ================================================================
          HERO — Full-viewport aurora canvas with centered editorial copy
          (Intentionally dark — aurora animation requires black background)
          ================================================================ */}
      <section className="relative flex flex-col items-center text-center px-6 pt-6 sm:pt-10 pb-20 overflow-hidden bg-black">
        <AnimatedHeroBackground />

        {/* Hero editorial content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 pt-4 sm:pt-8 pb-6">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-[11px] font-medium text-white/70 tracking-wide backdrop-blur-2xl">
            <svg className="w-3.5 h-3.5 fill-current text-white/80" viewBox="0 0 814 1000">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
            </svg>
            <span>Crafted for macOS, iOS, iPadOS &amp; watchOS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.04em] bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent leading-[1.05] max-w-3xl">
            Generative Wallpapers
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white/50 tracking-[-0.02em] -mt-2">
            Pro Studio &amp; Mockup Engine
          </p>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/45 max-w-xl mx-auto leading-relaxed font-normal">
            Procedurally render minimalist vector landscapes at 1:1 Apple hardware resolution.
            Preview live inside Liquid Retina &amp; Super Retina displays before 4K export.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/studio"
              className="group px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
            >
              <span>Open Studio</span>
              <span className="text-lg transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/gallery"
              className="group px-6 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/90 font-medium text-sm hover:bg-white/[0.12] backdrop-blur-2xl transition-all duration-300 flex items-center gap-2"
            >
              <span>Browse Gallery</span>
              <span className="text-lg opacity-50 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>

        {/* Device showcase stage (reveals as user scrolls) */}
        <div className="relative z-10 w-full pt-6">
          <HeroFeatureStage />
        </div>

        {/* Stats strip */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-12 pt-10 border-t border-white/[0.08] text-center">
          {[
            { value: '13', label: 'Algorithms' },
            { value: '19', label: 'Color Ramps' },
            { value: '37', label: 'Device Profiles' },
            { value: '4K', label: 'Lossless Export' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1.5">
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[system-ui]">
                {stat.value}
              </div>
              <div className="text-[11px] text-white/40 font-medium uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          FEATURES — Editorial bento grid (theme-aware)
          ================================================================ */}
      <section className="relative z-10 bg-[var(--background)] border-t border-[var(--card-border)]">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-28 sm:py-36">
          {/* Section header */}
          <div className="text-center mb-20 space-y-5">
            <p className="text-[13px] font-medium text-[var(--foreground-muted)] uppercase tracking-[0.2em]">
              Ecosystem Highlights
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--heading-color)] tracking-[-0.04em] leading-[1.1]">
              Built for Apple&nbsp;Displays.
            </h2>
            <p className="text-base sm:text-lg text-[var(--foreground-muted)] max-w-lg mx-auto leading-relaxed font-light">
              Engineered from pure mathematics for pixel-perfect clarity on ProMotion &amp; Retina panels.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {/* Card 1: Generative Studio */}
            <Link
              href="/studio"
              className="group relative flex flex-col bg-[var(--card-bg)] rounded-[28px] overflow-hidden border border-[var(--card-border)] hover:border-cyan-500/40 transition-all duration-700 hover:shadow-[0_8px_64px_rgba(111,200,224,0.08)]"
            >
              {/* Card visual — intentionally dark mockup */}
              <div className="dark-preview-box relative h-56 w-full bg-gradient-to-b from-[#0c1b2a] to-[#0a0a12] p-6 flex flex-col justify-between overflow-hidden rounded-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/[0.08] rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60" />

                <div className="relative flex items-center justify-between text-[10px] font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/[0.12] text-cyan-400 tracking-wider uppercase font-semibold">
                    Real-Time Engine
                  </span>
                  <span className="text-white/30 group-hover:text-white/60 transition-colors">
                    Studio →
                  </span>
                </div>

                <div className="relative flex-1 flex items-center justify-center">
                  <svg className="w-full h-16 text-cyan-400/60 group-hover:text-cyan-400/90 transition-colors duration-700" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M0 30 Q25 10, 50 30 T100 30 T150 30 T200 30" />
                    <path d="M0 38 Q25 18, 50 38 T100 38 T150 38 T200 38" opacity="0.4" strokeWidth="1" />
                    <path d="M0 22 Q25 2, 50 22 T100 22 T150 22 T200 22" opacity="0.25" strokeWidth="0.75" />
                  </svg>
                </div>

                <div className="relative flex items-center justify-between text-[10px] text-white/30 font-mono">
                  <span>PROMOTION 120HZ</span>
                  <div className="flex items-center gap-2">
                    <div className="h-[3px] w-16 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-cyan-400/60 rounded-full" />
                    </div>
                    <span className="text-cyan-400/60">SEED #4092</span>
                  </div>
                </div>
              </div>

              {/* Card text */}
              <div className="px-7 py-7 space-y-3 flex-1 flex flex-col">
                <h3 className="text-[22px] font-semibold text-[var(--heading-color)] tracking-tight leading-tight">
                  Generative Studio
                </h3>
                <p className="text-[13px] text-[var(--foreground-muted)] leading-relaxed flex-1">
                  Tweak 13 mathematical algorithms, 19 mood ramps, polarity, and seed states live with floating glass controls.
                </p>
                <div className="pt-4 flex items-center gap-2 text-[13px] font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-0 group-hover:translate-x-1 transform">
                  Launch Studio <span className="text-base">→</span>
                </div>
              </div>
            </Link>

            {/* Card 2: Curated Gallery */}
            <Link
              href="/gallery"
              className="group relative flex flex-col bg-[var(--card-bg)] rounded-[28px] overflow-hidden border border-[var(--card-border)] hover:border-purple-500/40 transition-all duration-700 hover:shadow-[0_8px_64px_rgba(168,85,247,0.08)]"
            >
              <div className="dark-preview-box relative h-56 w-full bg-gradient-to-b from-[#180c2a] to-[#0a0a12] p-6 flex flex-col justify-between overflow-hidden rounded-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/[0.08] rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60" />

                <div className="relative flex items-center justify-between text-[10px] font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/[0.12] text-purple-400 tracking-wider uppercase font-semibold">
                    37 Presets
                  </span>
                  <span className="text-white/30 group-hover:text-white/60 transition-colors">
                    Gallery →
                  </span>
                </div>

                <div className="relative flex-1 flex items-center justify-center gap-3 py-4">
                  <div className="w-14 h-24 rounded-2xl bg-gradient-to-b from-indigo-500 to-purple-800 border border-white/[0.12] transform -rotate-6 shadow-xl transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-105" />
                  <div className="w-14 h-24 rounded-2xl bg-gradient-to-b from-teal-400 to-blue-700 border border-white/[0.12] z-10 shadow-2xl scale-110" />
                  <div className="w-14 h-24 rounded-2xl bg-gradient-to-b from-rose-500 to-amber-700 border border-white/[0.12] transform rotate-6 shadow-xl transition-transform duration-700 group-hover:rotate-12 group-hover:scale-105" />
                </div>

                <div className="relative flex items-center justify-between text-[10px] text-white/30 font-mono">
                  <span>CURATED COLLECTION</span>
                  <span className="text-purple-400/60">13 FAMILIES</span>
                </div>
              </div>

              <div className="px-7 py-7 space-y-3 flex-1 flex flex-col">
                <h3 className="text-[22px] font-semibold text-[var(--heading-color)] tracking-tight leading-tight">
                  Curated Gallery
                </h3>
                <p className="text-[13px] text-[var(--foreground-muted)] leading-relaxed flex-1">
                  Browse 37 hand-selected pattern &amp; palette combinations, filterable by family, mood tone, and polarity.
                </p>
                <div className="pt-4 flex items-center gap-2 text-[13px] font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-0 group-hover:translate-x-1 transform">
                  Explore Gallery <span className="text-base">→</span>
                </div>
              </div>
            </Link>

            {/* Card 3: System Architecture */}
            <Link
              href="/info"
              className="group relative flex flex-col bg-[var(--card-bg)] rounded-[28px] overflow-hidden border border-[var(--card-border)] hover:border-emerald-500/40 transition-all duration-700 hover:shadow-[0_8px_64px_rgba(52,211,153,0.08)]"
            >
              <div className="dark-preview-box relative h-56 w-full bg-gradient-to-b from-[#0a1a15] to-[#0a0a12] p-6 flex flex-col justify-between overflow-hidden rounded-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/[0.08] rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60" />

                <div className="relative flex items-center justify-between text-[10px] font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/[0.12] text-emerald-400 tracking-wider uppercase font-semibold">
                    Technical Specs
                  </span>
                  <span className="text-white/30 group-hover:text-white/60 transition-colors">
                    Info →
                  </span>
                </div>

                <div className="relative flex-1 flex flex-col justify-center gap-2 py-3 font-mono text-[10px]">
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-emerald-400/80">OffscreenCanvas</span>
                    <span className="text-white/30">4K PNG</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-white/50">Mulberry32 PRNG</span>
                    <span className="text-emerald-400/80 font-semibold">OK</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-white/50">37 Apple Devices</span>
                    <span className="text-emerald-400/80 font-semibold">100%</span>
                  </div>
                </div>
              </div>

              <div className="px-7 py-7 space-y-3 flex-1 flex flex-col">
                <h3 className="text-[22px] font-semibold text-[var(--heading-color)] tracking-tight leading-tight">
                  System Architecture
                </h3>
                <p className="text-[13px] text-[var(--foreground-muted)] leading-relaxed flex-1">
                  Learn about our 37 hardware specifications, OffscreenCanvas 4K export pipeline, and PRNG algorithms.
                </p>
                <div className="pt-4 flex items-center gap-2 text-[13px] font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-0 group-hover:translate-x-1 transform">
                  Read Documentation <span className="text-base">→</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom editorial CTA */}
          <div className="mt-20 text-center space-y-4">
            <p className="text-sm text-[var(--foreground-muted)] font-light">
              Every pixel mathematically generated. Zero raster assets.
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link
                href="/studio"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--heading-color)] transition-colors duration-300 flex items-center gap-1.5"
              >
                Try the Studio <span className="opacity-40">→</span>
              </Link>
              <span className="text-[var(--card-border)]">|</span>
              <Link
                href="/info"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--heading-color)] transition-colors duration-300 flex items-center gap-1.5"
              >
                Learn More <span className="opacity-40">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

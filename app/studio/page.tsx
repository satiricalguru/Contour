/**
 * Studio page — the main generator with live device mockup preview,
 * configurator controls, shuffle, and export.
 */
'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useContourStore } from '@/lib/store';
import { getDeviceById } from '@/lib/devices';
import { DeviceFrame } from '@/components/device-frame/DeviceFrame';
import { WallpaperCanvas } from '@/components/WallpaperCanvas';
import { PatternPicker } from '@/components/studio/PatternPicker';
import { PalettePicker } from '@/components/studio/PalettePicker';
import { PolarityToggle } from '@/components/studio/PolarityToggle';
import { DeviceModelPicker } from '@/components/studio/DeviceModelPicker';
import { ExportPanel } from '@/components/studio/ExportPanel';
import { PALETTES } from '@/data/palettes';
import { interpolateRamp } from '@/lib/engine/color';

function StudioContent() {
  const searchParams = useSearchParams();
  const {
    patternId,
    paletteId,
    seed,
    inverted,
    modelId,
    shuffle,
    hydrateFromParams,
  } = useContourStore();

  const [isMounted, setIsMounted] = useState(false);

  // Hydrate from URL params on mount
  useEffect(() => {
    queueMicrotask(() => setIsMounted(true));
    if (searchParams) {
      hydrateFromParams(searchParams);
      if (!searchParams.get('seed')) {
        shuffle();
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- intentionally runs on initial mount to populate state from URL params

  // Update palette-reactive accent colors on the root
  useEffect(() => {
    const palette = PALETTES.find((p) => p.id === paletteId);
    if (!palette) return;

    const ramp = interpolateRamp(palette.anchors, 10);
    const accentColor = inverted ? ramp[3] : ramp[6];

    const root = document.documentElement;
    root.style.setProperty('--accent-primary', accentColor);
    root.style.setProperty(
      '--accent-subtle',
      accentColor.replace('#', '') + '14',
    );
  }, [paletteId, inverted]);

  const device = useMemo(() => getDeviceById(modelId), [modelId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        shuffle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shuffle]);

  // Canvas size — render at a reasonable preview resolution
  const previewW = device ? Math.min(device.resolution.width, 800) : 800;
  const previewH = device
    ? Math.round(previewW / device.aspectRatio)
    : 600;

  // Compact responsive max width so mockups fit comfortably in viewport
  const containerMaxWidth =
    device?.category === 'watch'
      ? 'max-w-[200px] sm:max-w-[240px]'
      : device?.category === 'iphone'
      ? 'max-w-[220px] sm:max-w-[260px]'
      : device?.category === 'ipad'
      ? 'max-w-md sm:max-w-lg'
      : 'max-w-xl lg:max-w-2xl';

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Device Stage — large centered area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[450px]">
        <div className={`w-full ${containerMaxWidth} mx-auto flex flex-col items-center justify-center transition-all duration-300`}>
          {device ? (
            <DeviceFrame device={device} inverted={inverted}>
              <WallpaperCanvas
                patternId={patternId}
                paletteId={paletteId}
                seed={seed}
                inverted={inverted}
                width={previewW}
                height={previewH}
              />
            </DeviceFrame>
          ) : (
            <div className="aspect-video bg-white/5 rounded-xl flex items-center justify-center text-white/30">
              Select a device
            </div>
          )}

          {/* Shuffle button below device */}
          <div className="flex justify-center mt-5">
            <button
              onClick={shuffle}
              className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-5 py-2 text-xs font-medium text-inherit hover:opacity-90 transition-all duration-200 shadow-md group"
              aria-label="Generate new variation (Space)"
            >
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.846a.75.75 0 00-.75.75v3.386a.75.75 0 001.5 0V14.56l.238.238a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39c-.1.372-.236.728-.404 1.065l-.381.089zm.002-2.848a.75.75 0 00.734-.613A7 7 0 004.336 4.825l-.238-.238v1.654a.75.75 0 01-1.5 0V2.855a.75.75 0 01.75-.75h3.386a.75.75 0 010 1.5H4.301l.312.311a5.5 5.5 0 019.201-2.466.75.75 0 001.449.39c.1-.371.236-.727.404-1.064l.381-.089a.75.75 0 00-.734-.613z"
                  clipRule="evenodd"
                />
              </svg>
              Shuffle
              <kbd className="text-[10px] opacity-60 bg-[var(--pill-bg)] rounded px-1.5 py-0.5 ml-1">
                Space
              </kbd>
            </button>
          </div>
        </div>
      </div>

      {/* Control Dock — floating glass panel */}
      <aside className="w-full lg:w-80 xl:w-96 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto border-t lg:border-t-0 lg:border-l border-[var(--card-border)] bg-[var(--nav-bg)] backdrop-blur-xl transition-colors duration-300">
        <div className="p-4 sm:p-6 space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-lg font-bold text-inherit">
              Wallpaper Studio
            </h2>
            <p className="text-xs opacity-60 mt-1">
              Customize and export at native resolution
            </p>
          </div>

          <DeviceModelPicker />
          <div className="h-px bg-[var(--card-border)]" />
          <PatternPicker />
          <div className="h-px bg-[var(--card-border)]" />
          <PalettePicker />
          <div className="h-px bg-[var(--card-border)]" />
          <PolarityToggle />
          <div className="h-px bg-[var(--card-border)]" />
          <ExportPanel />

          <div className="text-[10px] opacity-40 text-center pt-4">
            Seed: {isMounted ? seed : ''}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="opacity-50">Loading Studio…</div>
        </div>
      }
    >
      <StudioContent />
    </Suspense>
  );
}

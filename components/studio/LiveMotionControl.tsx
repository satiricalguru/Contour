'use client';

import { useContourStore } from '@/lib/store';

export function LiveMotionControl() {
  const { isLiveMode, liveSpeed, toggleLiveMode, setLiveSpeed } = useContourStore();

  const speedOptions = [0.5, 1.0, 1.5, 2.0];

  return (
    <div className="space-y-3 p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-[var(--heading-color)] animate-pulse' : 'bg-[var(--foreground-muted)] opacity-40'}`} />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--heading-color)]">
            Live Wallpaper Motion
          </h3>
        </div>

        {/* Toggle Play/Pause Button */}
        <button
          onClick={toggleLiveMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
            isLiveMode
              ? 'bg-[var(--heading-color)] text-[var(--background)] font-semibold'
              : 'bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
          }`}
          title={isLiveMode ? 'Pause live wallpaper preview' : 'Play 60 FPS live wallpaper preview'}
        >
          {isLiveMode ? (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Pause Motion</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Play Motion</span>
            </>
          )}
        </button>
      </div>

      {/* Speed Slider / Selector */}
      {isLiveMode && (
        <div className="pt-2 border-t border-[var(--card-border)] space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[var(--foreground-muted)] font-medium">
            <span>Playback Speed</span>
            <span className="text-[var(--heading-color)] font-bold">{liveSpeed}x</span>
          </div>

          <div className="flex gap-1 bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-xl p-1">
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => setLiveSpeed(speed)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                  liveSpeed === speed
                    ? 'bg-[var(--heading-color)] text-[var(--background)]'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

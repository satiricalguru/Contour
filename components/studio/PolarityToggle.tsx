/**
 * PolarityToggle — light/dark toggle for the wallpaper.
 * Independent of the site's UI theme.
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useContourStore } from '@/lib/store';

export function PolarityToggle() {
  const { inverted, togglePolarity } = useContourStore();
  const activeKey = inverted ? 'light' : 'dark';

  const [pillStyle, setPillStyle] = useState<{ left: number; top: number; width: number; height: number; opacity: number }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const updatePillPosition = () => {
      const activeEl = buttonRefs.current[activeKey];
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
  }, [activeKey]);

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] px-1">
        Mode
      </h3>
      <div className="relative flex gap-1 bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-lg p-1">
        {/* Sliding Liquid Glass Indicator */}
        <div
          className="absolute top-0 left-0 rounded-md bg-[var(--heading-color)] shadow-sm transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
          style={{
            transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
            width: `${pillStyle.width}px`,
            height: `${pillStyle.height}px`,
            opacity: pillStyle.opacity,
          }}
        />

        <button
          ref={(el) => {
            buttonRefs.current['dark'] = el;
          }}
          onClick={() => !inverted || togglePolarity()}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 rounded-md py-2 px-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
            !inverted
              ? 'text-[var(--background)] font-semibold'
              : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
          }`}
          aria-label="Dark wallpaper mode"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
          </svg>
          Dark
        </button>

        <button
          ref={(el) => {
            buttonRefs.current['light'] = el;
          }}
          onClick={() => inverted || togglePolarity()}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 rounded-md py-2 px-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
            inverted
              ? 'text-[var(--background)] font-semibold'
              : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
          }`}
          aria-label="Light wallpaper mode"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z" />
          </svg>
          Light
        </button>
      </div>
    </div>
  );
}

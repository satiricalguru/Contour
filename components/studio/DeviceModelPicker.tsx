/**
 * DeviceModelPicker — category tabs (Mac / iPhone / iPad) with clean SVG icons
 * and model dropdown per category.
 */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useContourStore } from '@/lib/store';
import { getDevicesByCategory, DeviceCategory } from '@/lib/devices';

const CATEGORIES: {
  id: DeviceCategory;
  label: string;
  renderIcon: () => React.ReactNode;
}[] = [
  {
    id: 'mac',
    label: 'Mac',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    id: 'iphone',
    label: 'iPhone',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="3" />
        <line x1="11" y1="5" x2="13" y2="5" />
      </svg>
    ),
  },
  {
    id: 'ipad',
    label: 'iPad',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2.5" />
        <circle cx="12" cy="18" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'watch',
    label: 'Watch',
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="12" height="12" rx="3" />
        <path d="M9 3h6v3H9zM9 18h6v3H9z" />
        <path d="M19 9.5h1v3h-1z" fill="currentColor" />
      </svg>
    ),
  },
];

export function DeviceModelPicker() {
  const { deviceCategory, modelId, setDeviceCategory, setModelId } =
    useContourStore();

  const models = getDevicesByCategory(deviceCategory);
  const activeIndex = CATEGORIES.findIndex((c) => c.id === deviceCategory);

  const [pillStyle, setPillStyle] = useState<{ left: number; top: number; width: number; height: number; opacity: number }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const updatePillPosition = () => {
      if (activeIndex === -1) {
        setPillStyle((s) => ({ ...s, opacity: 0 }));
        return;
      }
      const activeEl = tabRefs.current[activeIndex];
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
  }, [activeIndex, deviceCategory]);

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] px-1">
        Device
      </h3>

      {/* Category tabs with sliding liquid glass pill */}
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

        {CATEGORIES.map((cat, idx) => {
          const isSelected = deviceCategory === cat.id;
          return (
            <button
              key={cat.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              onClick={() => setDeviceCategory(cat.id)}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors duration-200 cursor-pointer ${
                isSelected
                  ? 'text-[var(--background)] font-semibold'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--heading-color)]'
              }`}
              aria-label={`Select ${cat.label} device category`}
            >
              {cat.renderIcon()}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Model dropdown */}
      <select
        value={modelId}
        onChange={(e) => setModelId(e.target.value)}
        className="w-full bg-[var(--pill-bg)] border border-[var(--card-border)] rounded-lg px-3 py-2 text-sm text-[var(--heading-color)] appearance-none cursor-pointer hover:border-slate-400/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--heading-color)]"
        aria-label="Select device model"
      >
        {models.map((m) => (
          <option key={m.id} value={m.id} className="bg-slate-900 text-white">
            {m.displayName}
            {m.generation ? ` (${m.generation})` : ''}
          </option>
        ))}
      </select>

      {/* Resolution info */}
      {(() => {
        const selected = models.find((m) => m.id === modelId);
        if (!selected) return null;
        return (
          <div className="text-[10px] text-[var(--foreground-muted)] px-1 flex items-center justify-between font-mono">
            <span>{selected.resolution.width} × {selected.resolution.height} px</span>
            <span className="capitalize">{selected.bezelStyle.replace('-', ' ')}</span>
          </div>
        );
      })()}
    </div>
  );
}

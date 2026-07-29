/**
 * DeviceModelPicker — category tabs (Mac / iPhone / iPad) with clean SVG icons
 * and model dropdown per category.
 */
'use client';

import React from 'react';
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

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-inherit opacity-60 px-1">
        Device
      </h3>

      {/* Category tabs */}
      <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
        {CATEGORIES.map((cat) => {
          const isSelected = deviceCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setDeviceCategory(cat.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-white/20 text-inherit font-semibold shadow-sm'
                  : 'opacity-60 hover:opacity-100 hover:bg-white/10'
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
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-inherit appearance-none cursor-pointer hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
        aria-label="Select device model"
      >
        {models.map((m) => (
          <option key={m.id} value={m.id} className="bg-[#1a1a1a] text-white">
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
          <div className="text-[10px] opacity-40 px-1 flex items-center justify-between font-mono">
            <span>{selected.resolution.width} × {selected.resolution.height} px</span>
            <span className="capitalize">{selected.bezelStyle.replace('-', ' ')}</span>
          </div>
        );
      })()}
    </div>
  );
}

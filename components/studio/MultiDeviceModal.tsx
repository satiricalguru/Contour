'use client';

import { useState, useMemo } from 'react';
import { ALL_DEVICES, DeviceModel, DeviceCategory } from '@/lib/devices';
import { exportDeviceBatch } from '@/lib/batchExporter';

interface MultiDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  patternId: string;
  paletteId: string;
  seed: number;
  inverted: boolean;
}

const DEFAULT_FLAGSHIPS = [
  'macbook-pro-16',
  'ipad-pro-13',
  'iphone-17-pro',
  'apple-watch-s10-46',
];

const IPHONE_WATCH_SUITE = [
  'iphone-17-pro',
  'iphone-17-pro-max',
  'iphone-air',
  'apple-watch-s10-46',
  'apple-watch-ultra-2',
];

const MAC_IPAD_SUITE = [
  'macbook-pro-16',
  'macbook-air-15',
  'macbook-neo',
  'ipad-pro-13',
  'ipad-mini',
];

export function MultiDeviceModal({
  isOpen,
  onClose,
  patternId,
  paletteId,
  seed,
  inverted,
}: MultiDeviceModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(DEFAULT_FLAGSHIPS);
  const [exportingStatus, setExportingStatus] = useState<{
    isExporting: boolean;
    completed: number;
    total: number;
    currentDevice: string;
  }>({
    isExporting: false,
    completed: 0,
    total: 0,
    currentDevice: '',
  });

  const categories: { id: DeviceCategory; label: string }[] = [
    { id: 'mac', label: 'Mac' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'ipad', label: 'iPad' },
    { id: 'watch', label: 'Watch' },
  ];

  const devicesByCategory = useMemo(() => {
    const map: Record<DeviceCategory, DeviceModel[]> = {
      mac: [],
      iphone: [],
      ipad: [],
      watch: [],
    };
    for (const d of ALL_DEVICES) {
      map[d.category].push(d);
    }
    return map;
  }, []);

  if (!isOpen) return null;

  const toggleDevice = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectPreset = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const selectAll = () => {
    setSelectedIds(ALL_DEVICES.map((d) => d.id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  const handleStartBatchDownload = async () => {
    if (selectedIds.length === 0 || exportingStatus.isExporting) return;

    setExportingStatus({
      isExporting: true,
      completed: 0,
      total: selectedIds.length,
      currentDevice: 'Initializing…',
    });

    try {
      await exportDeviceBatch({
        deviceIds: selectedIds,
        patternId,
        paletteId,
        seed,
        inverted,
        onProgress: ({ completed, total, currentDevice }) => {
          setExportingStatus({
            isExporting: true,
            completed,
            total,
            currentDevice,
          });
        },
      });
    } catch (err) {
      console.error('Batch export failed:', err);
    } finally {
      setExportingStatus({
        isExporting: false,
        completed: 0,
        total: 0,
        currentDevice: '',
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="multi-device-modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--card-border)] flex items-center justify-between">
          <div>
            <h2 id="multi-device-modal-title" className="text-lg font-bold text-[var(--heading-color)]">
              Export Apple Ecosystem Pack
            </h2>
            <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
              Select your devices to download custom wallpapers formatted to each screen resolution.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={exportingStatus.isExporting}
            className="p-2 rounded-full hover:bg-[var(--pill-bg)] text-[var(--foreground-muted)] hover:text-[var(--heading-color)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Preset Suite Quick Buttons */}
        <div className="p-4 bg-[var(--pill-bg)] border-b border-[var(--card-border)] flex flex-wrap gap-2 items-center justify-between text-xs">
          <span className="font-semibold text-[var(--foreground-muted)] text-[10px] uppercase tracking-wider">Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => selectPreset(DEFAULT_FLAGSHIPS)}
              className="px-3 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--heading-color)] text-[var(--heading-color)] font-medium transition-colors cursor-pointer"
            >
               Flagship Suite (4)
            </button>
            <button
              onClick={() => selectPreset(IPHONE_WATCH_SUITE)}
              className="px-3 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--heading-color)] text-[var(--heading-color)] font-medium transition-colors cursor-pointer"
            >
              📱 iPhone + Watch
            </button>
            <button
              onClick={() => selectPreset(MAC_IPAD_SUITE)}
              className="px-3 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--heading-color)] text-[var(--heading-color)] font-medium transition-colors cursor-pointer"
            >
              💻 Mac + iPad Workstation
            </button>
            <button
              onClick={selectAll}
              className="px-2.5 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground-muted)] hover:text-[var(--heading-color)] transition-colors cursor-pointer"
            >
              Select All
            </button>
            <button
              onClick={deselectAll}
              className="px-2.5 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground-muted)] hover:text-[var(--heading-color)] transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Device List Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {categories.map((cat) => {
            const list = devicesByCategory[cat.id];
            if (list.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--heading-color)] flex items-center justify-between">
                  <span>{cat.label} ({list.length})</span>
                  <span className="text-[10px] text-[var(--foreground-muted)] font-normal">
                    {list.filter((d) => selectedIds.includes(d.id)).length} selected
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {list.map((device) => {
                    const isSelected = selectedIds.includes(device.id);
                    return (
                      <label
                        key={device.id}
                        onClick={() => toggleDevice(device.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                          isSelected
                            ? 'bg-[var(--pill-bg)] border-[var(--heading-color)] shadow-xs'
                            : 'border-[var(--card-border)] hover:border-slate-400/40 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // Handled by container onClick
                            className="w-4 h-4 rounded accent-[var(--heading-color)] cursor-pointer"
                          />
                          <span className="text-xs font-semibold text-[var(--heading-color)]">
                            {device.displayName}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
                          {device.resolution.width} × {device.resolution.height}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[var(--card-border)] bg-[var(--card-bg)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[var(--foreground-muted)]">
            <span className="font-bold text-[var(--heading-color)]">{selectedIds.length}</span> device{selectedIds.length === 1 ? '' : 's'} ready for native resolution export
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={exportingStatus.isExporting}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-medium text-[var(--foreground-muted)] hover:text-[var(--heading-color)] border border-[var(--card-border)] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleStartBatchDownload}
              disabled={selectedIds.length === 0 || exportingStatus.isExporting}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-semibold bg-[var(--heading-color)] text-[var(--background)] hover:opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {exportingStatus.isExporting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>
                    Exporting {exportingStatus.completed}/{exportingStatus.total}…
                  </span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Download Ecosystem Pack</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

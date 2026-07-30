/**
 * ExportPanel — shows target resolution, triggers static PNG, 4K Live Video, and Apple Ecosystem Pack exports.
 */
'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useContourStore, FavoriteItem } from '@/lib/store';
import { getDeviceById } from '@/lib/devices';
import { drawPattern } from '@/lib/engine/patterns';
import { MultiDeviceModal } from './MultiDeviceModal';

export function ExportPanel() {
  const {
    patternId,
    paletteId,
    seed,
    inverted,
    modelId,
    favorites,
    addFavorite,
    removeFavorite,
  } = useContourStore();

  const [exporting, setExporting] = useState(false);
  const [recordingVideo, setRecordingVideo] = useState(false);
  const [isMultiDeviceOpen, setIsMultiDeviceOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const device = getDeviceById(modelId);

  const isFavorite = favorites.some(
    (f: FavoriteItem) =>
      f.patternId === patternId &&
      f.paletteId === paletteId &&
      f.seed === seed &&
      f.inverted === inverted
  );

  const handleExport = useCallback(async () => {
    if (!device || exporting) return;
    setExporting(true);

    try {
      const { width, height } = device.resolution;
      const fileName = `contour-${patternId}-${paletteId}-${device.id}.png`;

      // Use OffscreenCanvas if supported by browser environment
      if (typeof OffscreenCanvas !== 'undefined') {
        const canvas = new OffscreenCanvas(width, height);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawPattern(ctx, width, height, patternId, paletteId, seed, inverted);
          const blob = await canvas.convertToBlob({ type: 'image/png' });
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          return;
        }
      }

      // Fallback: standard HTMLCanvasElement
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get 2D canvas context');

      drawPattern(ctx, width, height, patternId, paletteId, seed, inverted);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  }, [device, patternId, paletteId, seed, inverted, exporting]);

  const handleExportLiveVideo = useCallback(async () => {
    if (!device || exporting || recordingVideo) return;
    setRecordingVideo(true);

    try {
      const { width, height } = device.resolution;
      const fileName = `contour-live-${patternId}-${paletteId}-${device.id}.webm`;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get 2D canvas context');

      const stream = canvas.captureStream(60);
      const mimeType = typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/mp4;codecs=h264')
        ? 'video/mp4;codecs=h264'
        : typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setRecordingVideo(false);
      };

      const durationMs = 5000;
      const startTime = performance.now();
      mediaRecorder.start();

      const recordFrame = (now: number) => {
        const elapsedSec = (now - startTime) / 1000;
        drawPattern(ctx, width, height, patternId, paletteId, seed, inverted, elapsedSec);

        if (now - startTime < durationMs) {
          requestAnimationFrame(recordFrame);
        } else {
          mediaRecorder.stop();
        }
      };

      requestAnimationFrame(recordFrame);
    } catch (err) {
      console.error('Live video export failed:', err);
      setRecordingVideo(false);
    }
  }, [device, patternId, paletteId, seed, inverted, exporting, recordingVideo]);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite({ patternId, paletteId, seed, inverted });
    } else {
      addFavorite();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  }, [isFavorite, removeFavorite, addFavorite, patternId, paletteId, seed, inverted]);

  const handleShare = useCallback(() => {
    const params = new URLSearchParams({
      pattern: patternId,
      palette: paletteId,
      seed: seed.toString(),
      inverted: inverted.toString(),
      model: modelId,
    });

    const url = `${window.location.origin}/studio?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [patternId, paletteId, seed, inverted, modelId]);

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] px-1">
        Actions
      </h3>

      <div className="flex flex-col gap-2">
        {/* Export Apple Ecosystem Pack (Multi-Device) */}
        <button
          onClick={() => setIsMultiDeviceOpen(true)}
          disabled={exporting || recordingVideo}
          className="flex items-center justify-center gap-2 bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--heading-color)] hover:border-slate-400/40 dark:hover:border-white/20 hover:bg-white/5 rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-200 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Export wallpaper for multiple Apple devices"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z" />
            <path fillRule="evenodd" d="M4 7a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm2 0h8v8H6V7z" clipRule="evenodd" />
          </svg>
          Export Apple Ecosystem Pack
        </button>

        {/* Export Static PNG */}
        <button
          onClick={handleExport}
          disabled={exporting || recordingVideo}
          className="flex items-center justify-center gap-2 bg-[var(--heading-color)] text-[var(--background)] rounded-xl py-2.5 px-4 text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Export wallpaper as PNG"
        >
          {exporting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Exporting static PNG…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
              Export Current Device PNG
            </>
          )}
        </button>

        {/* Export 4K Live Motion Video */}
        <button
          onClick={handleExportLiveVideo}
          disabled={exporting || recordingVideo}
          className="flex items-center justify-center gap-2 bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--heading-color)] hover:bg-[var(--heading-color)] hover:text-[var(--background)] rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Export live motion wallpaper video"
        >
          {recordingVideo ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Recording 5s Live Motion Video…
            </>
          ) : (
            <>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 00-18 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Export Live Motion Video (4K)
            </>
          )}
        </button>

        {device && (
          <div className="text-[10px] text-[var(--foreground-muted)] text-center font-mono">
            {device.resolution.width} × {device.resolution.height} px
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={handleToggleFavorite}
          className={`flex items-center justify-center gap-2 rounded-xl py-2 px-4 text-sm font-medium transition-all duration-200 cursor-pointer ${
            isFavorite
              ? 'bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-semibold shadow-xs'
              : 'bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--foreground)] hover:border-slate-400/40 dark:hover:border-white/20'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <svg
            className={`w-4 h-4 transition-transform ${isFavorite ? 'scale-110' : ''}`}
            viewBox="0 0 20 20"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavorite ? '0' : '1.5'}
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          {justSaved ? 'Saved to Favorites!' : isFavorite ? 'Saved in Favorites' : 'Save'}
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className={`flex items-center justify-center gap-2 rounded-xl py-2 px-4 text-sm font-medium transition-all duration-200 cursor-pointer ${
            copied
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs'
              : 'bg-[var(--pill-bg)] border border-[var(--card-border)] text-[var(--foreground)] hover:border-slate-400/40 dark:hover:border-white/20'
          }`}
          aria-label="Copy shareable link"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-emerald-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Link Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
              </svg>
              Copy Link
            </>
          )}
        </button>

        {favorites.length > 0 && (
          <Link
            href="/gallery?tab=favorites"
            className="flex items-center justify-between text-xs text-[var(--foreground-muted)] hover:text-[var(--heading-color)] pt-2 px-1 transition-colors"
          >
            <span>Saved Favorites</span>
            <span className="font-semibold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full text-[10px]">
              {favorites.length} saved →
            </span>
          </Link>
        )}
      </div>

      {/* Multi-Device Selection Modal */}
      <MultiDeviceModal
        isOpen={isMultiDeviceOpen}
        onClose={() => setIsMultiDeviceOpen(false)}
        patternId={patternId}
        paletteId={paletteId}
        seed={seed}
        inverted={inverted}
      />
    </div>
  );
}

/**
 * batchExporter — client-side batch wallpaper rendering engine for multiple devices.
 * Renders native resolution wallpapers for all selected devices and triggers downloads.
 */
import { getDeviceById, DeviceModel } from './devices';
import { drawPattern } from './engine/patterns';

export interface BatchExportOptions {
  deviceIds: string[];
  patternId: string;
  paletteId: string;
  seed: number;
  inverted: boolean;
  onProgress?: (progress: { completed: number; total: number; currentDevice: string }) => void;
}

export async function exportDeviceBatch({
  deviceIds,
  patternId,
  paletteId,
  seed,
  inverted,
  onProgress,
}: BatchExportOptions): Promise<void> {
  const devices = deviceIds
    .map((id) => getDeviceById(id))
    .filter((d): d is DeviceModel => Boolean(d));

  if (devices.length === 0) return;

  for (let i = 0; i < devices.length; i++) {
    const device = devices[i];
    onProgress?.({
      completed: i,
      total: devices.length,
      currentDevice: device.displayName,
    });

    const { width, height } = device.resolution;
    const sanitizedDeviceName = device.displayName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `Contour_${sanitizedDeviceName}_${patternId}.png`;

    await renderAndDownloadDevice(width, height, patternId, paletteId, seed, inverted, fileName);

    // Short pause between downloads to prevent browser throttling
    if (i < devices.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
  }

  onProgress?.({
    completed: devices.length,
    total: devices.length,
    currentDevice: 'Complete',
  });
}

async function renderAndDownloadDevice(
  w: number,
  h: number,
  patternId: string,
  paletteId: string,
  seed: number,
  inverted: boolean,
  fileName: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      if (typeof OffscreenCanvas !== 'undefined') {
        const canvas = new OffscreenCanvas(w, h);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawPattern(ctx, w, h, patternId, paletteId, seed, inverted);
          canvas.convertToBlob({ type: 'image/png' }).then((blob) => {
            triggerDownload(blob, fileName);
            resolve();
          });
          return;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get 2D canvas context');

      drawPattern(ctx, w, h, patternId, paletteId, seed, inverted);
      canvas.toBlob((blob) => {
        if (blob) triggerDownload(blob, fileName);
        resolve();
      }, 'image/png');
    } catch (err) {
      reject(err);
    }
  });
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

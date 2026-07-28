/**
 * Device model types for the Contour mockup system.
 *
 * This typed interface is the entire mechanism behind per-model bezel
 * rendering — every device is a row in the database, and the frame
 * component branches on `bezelStyle`.
 */

export type BezelStyle = 'notch' | 'dynamic-island' | 'plain-bezel' | 'home-button';

export type DeviceCategory = 'mac' | 'iphone' | 'ipad';

export interface DeviceCutout {
  /** Width as % of screen width. */
  widthPct: number;
  /** Height as % of screen height. */
  heightPct: number;
  /** Distance from screen top as % of screen height. */
  topOffsetPct: number;
}

export interface DeviceModel {
  /** Unique identifier, e.g. 'iphone-17-pro-max'. */
  id: string;
  /** Device category for grouping. */
  category: DeviceCategory;
  /** Human-readable name shown in the UI. */
  displayName: string;
  /** Which bezel treatment to render. */
  bezelStyle: BezelStyle;
  /** Native pixel resolution (for export). */
  resolution: { width: number; height: number };
  /** width / height — used for preview sizing. */
  aspectRatio: number;
  /** Outer screen corner radius as % of the shorter dimension. */
  cornerRadiusPct: number;
  /** Present only for notch or dynamic-island devices. */
  cutout?: DeviceCutout;
  /** Optional generation/year tag for display grouping. */
  generation?: string;
}

/** Get all devices for a category. */
export function getDevicesByCategory(
  devices: readonly DeviceModel[],
  category: DeviceCategory,
): DeviceModel[] {
  return devices.filter((d) => d.category === category);
}

/** Find a specific device by ID. */
export function getDeviceById(
  devices: readonly DeviceModel[],
  id: string,
): DeviceModel | undefined {
  return devices.find((d) => d.id === id);
}

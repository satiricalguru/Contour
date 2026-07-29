/**
 * Device database — unified export of all device models.
 */
import { DeviceModel, DeviceCategory } from './types';
import { MAC_DEVICES } from './mac';
import { IPHONE_DEVICES } from './iphone';
import { IPAD_DEVICES } from './ipad';
import { WATCH_DEVICES } from './watch';

export const ALL_DEVICES: readonly DeviceModel[] = [
  ...MAC_DEVICES,
  ...IPHONE_DEVICES,
  ...IPAD_DEVICES,
  ...WATCH_DEVICES,
];

export function getDevicesByCategory(category: DeviceCategory): DeviceModel[] {
  return ALL_DEVICES.filter((d) => d.category === category);
}

export function getDeviceById(id: string): DeviceModel | undefined {
  return ALL_DEVICES.find((d) => d.id === id);
}

export function getDefaultDevice(category: DeviceCategory): DeviceModel {
  const defaults: Record<DeviceCategory, string> = {
    mac: 'macbook-pro-14',
    iphone: 'iphone-17-pro',
    ipad: 'ipad-pro-11',
    watch: 'apple-watch-ultra-2',
  };
  return getDeviceById(defaults[category]) ?? ALL_DEVICES[0];
}

export { type DeviceModel, type DeviceCategory, type BezelStyle } from './types';

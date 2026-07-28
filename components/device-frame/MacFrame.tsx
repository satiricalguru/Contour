/**
 * MacFrame — renders a MacBook mockup with screen + keyboard deck.
 * Supports notch (current models) and plain-bezel (classic + Neo).
 * Uses cqi (container query inline-size) for scalable padding and borders.
 */
'use client';

import React from 'react';
import { DeviceModel } from '@/lib/devices/types';
import { Cutout } from './Cutout';

interface MacFrameProps {
  device: DeviceModel;
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}

export function MacFrame({
  device,
  children,
  className = '',
  inverted = false,
}: MacFrameProps) {
  const hasNotch = device.bezelStyle === 'notch';
  const textColor = inverted ? 'text-slate-900' : 'text-white';
  const menuBg = inverted ? 'bg-white/50 border-b border-black/5' : 'bg-black/20';

  return (
    <div
      className={`mac-frame-wrapper w-full flex flex-col items-center justify-center ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Screen lid */}
      <div
        className="relative w-full bg-[#18181b] border border-white/10 shadow-2xl overflow-hidden"
        style={{
          borderRadius: `calc(${device.cornerRadiusPct + 1.5}cqi) calc(${device.cornerRadiusPct + 1.5}cqi) 0 0`,
          padding: hasNotch ? 'calc(1.5cqi)' : 'calc(2cqi)',
        }}
      >
        {/* Camera dot for plain-bezel */}
        {!hasNotch && (
          <div
            className="absolute bg-[#333] z-20 rounded-full"
            style={{
              top: 'calc(1cqi)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(0.8cqi)',
              height: 'calc(0.8cqi)',
            }}
          />
        )}

        {/* Screen area */}
        <div
          className="relative w-full overflow-hidden bg-black"
          style={{
            aspectRatio: `${device.resolution.width} / ${device.resolution.height}`,
            borderRadius: `calc(${device.cornerRadiusPct}cqi) calc(${device.cornerRadiusPct}cqi) 0 0`,
          }}
        >
          {/* Wallpaper */}
          <div className="absolute inset-0 z-0">{children}</div>

          {/* Notch */}
          {hasNotch && device.cutout && (
            <Cutout style="notch" cutout={device.cutout} />
          )}

          {/* macOS menu bar */}
          <div className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-[3%] h-[6%] ${menuBg} backdrop-blur-sm pointer-events-none`}>
            <div className="flex items-center gap-[0.4em]">
              <svg className={`w-[0.55em] h-[0.55em] ${textColor} opacity-90`} viewBox="0 0 814 1000" fill="currentColor">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
              </svg>
              <span className={`${textColor} text-[0.45em] font-semibold opacity-90`}>Finder</span>
              <span className={`${textColor} text-[0.45em] opacity-80 font-medium`}>File</span>
              <span className={`${textColor} text-[0.45em] opacity-80 font-medium`}>Edit</span>
            </div>
            <div className="flex items-center gap-[0.5em]">
              <span className={`${textColor} text-[0.45em] opacity-80 font-medium`}>Sun Jul 27</span>
              <span className={`${textColor} text-[0.45em] font-semibold opacity-90`}>9:41 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hinge */}
      <div
        className="w-[94%] bg-[#27272a] rounded-b-sm border-t border-black/40"
        style={{ height: 'calc(0.8cqi)' }}
      />

      {/* Keyboard deck notch */}
      <div
        className="w-[104%] bg-gradient-to-b from-[#27272a] to-[#18181b] shadow-lg border border-white/10 flex justify-center items-start"
        style={{ height: 'calc(1.8cqi)', borderRadius: '0 0 calc(1.5cqi) calc(1.5cqi)' }}
      >
        <div className="w-[15%] bg-[#09090b] rounded-b-sm" style={{ height: 'calc(0.6cqi)' }} />
      </div>
    </div>
  );
}

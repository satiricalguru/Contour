/**
 * WatchFrame — renders an Apple Watch mockup with accurate squircle OLED display,
 * metallic chassis shell, Digital Crown, side button, watch band lugs, and watch face status overlay.
 */
'use client';

import React from 'react';
import { DeviceModel } from '@/lib/devices/types';

interface WatchFrameProps {
  device: DeviceModel;
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}

export function WatchFrame({
  device,
  children,
  className = '',
  inverted = false,
}: WatchFrameProps) {
  const isUltra = device.id.includes('ultra');
  const textColor = inverted ? 'text-slate-900' : 'text-white';
  const overlayBg = inverted ? 'bg-slate-900/10' : 'bg-black/30';

  return (
    <div
      className={`watch-frame-wrapper w-full flex flex-col items-center justify-center relative py-4 ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Top Watch Band Lug */}
      <div className="w-[58%] h-6 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-md shadow-md border-t border-x border-white/10 relative z-0 flex items-center justify-center">
        <div className="w-4/5 h-1 bg-black/40 rounded-full" />
      </div>

      {/* Main Watch Chassis */}
      <div
        className={`relative w-full shadow-2xl overflow-hidden flex flex-col items-center justify-center z-10 ${
          isUltra
            ? 'bg-gradient-to-b from-[#2e2d2b] via-[#242321] to-[#1c1b1a] border-2 border-[#57534e]/50'
            : 'bg-gradient-to-b from-[#18181b] via-[#09090b] to-[#040405] border border-white/15'
        }`}
        style={{
          borderRadius: `calc(${device.cornerRadiusPct + 3}cqi)`,
          padding: 'calc(4cqi)',
          aspectRatio: `${device.resolution.width} / ${device.resolution.height}`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Digital Crown (Top Right) */}
        <div
          className={`absolute rounded-r-md shadow-md z-20 ${
            isUltra
              ? 'bg-gradient-to-r from-[#d97706] to-[#78350f] border border-amber-500/40'
              : 'bg-gradient-to-r from-slate-400 to-slate-600 border border-white/20'
          }`}
          style={{
            right: '-6px',
            top: '22%',
            width: '6px',
            height: '18%',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)',
          }}
        />

        {/* Side Button (Below Digital Crown) */}
        <div
          className="absolute bg-[#27272a] border border-white/10 rounded-r-sm shadow-xs z-20"
          style={{
            right: '-4px',
            top: '46%',
            width: '4px',
            height: '24%',
          }}
        />

        {/* Left Speaker Grill (Ultra models) */}
        {isUltra && (
          <div
            className="absolute bg-[#1c1917] border border-stone-700/50 rounded-l-md z-20 flex flex-col justify-center gap-0.5 px-0.5"
            style={{
              left: '-4px',
              top: '36%',
              width: '4px',
              height: '20%',
            }}
          >
            <div className="w-full h-0.5 bg-black/60 rounded-full" />
            <div className="w-full h-0.5 bg-black/60 rounded-full" />
          </div>
        )}

        {/* OLED Screen Area */}
        <div
          className="relative w-full h-full overflow-hidden bg-black flex flex-col"
          style={{
            borderRadius: `calc(${device.cornerRadiusPct}cqi)`,
            boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Wallpaper Content */}
          <div className="w-full h-full relative z-0">{children}</div>

          {/* Watch Face Status Overlay (Digital Time & Date) */}
          <div
            className={`absolute top-0 left-0 right-0 p-[5%] flex items-start justify-between z-10 pointer-events-none ${overlayBg} backdrop-blur-[2px]`}
          >
            <div className={`text-[0.45em] font-medium tracking-tight opacity-90 ${textColor}`}>
              WED 29
            </div>
            <div className={`text-[0.8em] font-extrabold font-mono leading-none tracking-tighter ${textColor}`}>
              10:09
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Watch Band Lug */}
      <div className="w-[58%] h-6 bg-gradient-to-t from-slate-700 to-slate-800 rounded-b-md shadow-md border-b border-x border-white/10 relative z-0 flex items-center justify-center">
        <div className="w-4/5 h-1 bg-black/40 rounded-full" />
      </div>
    </div>
  );
}

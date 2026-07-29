/**
 * WatchFrame — renders an Apple Watch mockup with accurate squircle OLED display,
 * metallic chassis shell, Digital Crown, side button, watch band lugs, and authentic watchOS watch face overlay.
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
  const shadowStyle = inverted
    ? 'drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]'
    : 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]';

  return (
    <div
      className={`watch-frame-wrapper w-full flex flex-col items-center justify-center relative py-2 ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Top Watch Band Strap */}
      <div className="w-[52%] h-7 bg-gradient-to-b from-[#27272a] via-[#3f3f46] to-[#18181b] rounded-t-xl shadow-lg border-t border-x border-white/10 relative z-0 flex items-center justify-center">
        <div className="w-3/4 h-1 bg-black/50 rounded-full" />
      </div>

      {/* Main Watch Case Outer Shell */}
      <div
        className={`relative w-full shadow-2xl overflow-visible flex flex-col items-center justify-center z-10 ${
          isUltra
            ? 'bg-gradient-to-b from-[#3a3935] via-[#2a2926] to-[#1e1d1b] border-2 border-[#6b655f]/60'
            : 'bg-gradient-to-b from-[#27272a] via-[#18181b] to-[#09090b] border border-white/20'
        }`}
        style={{
          borderRadius: `calc(${device.cornerRadiusPct + 4}cqi)`,
          padding: 'calc(3.5cqi)',
          aspectRatio: `${device.resolution.width} / ${device.resolution.height}`,
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Digital Crown (Top Right) */}
        <div
          className={`absolute rounded-r-sm shadow-md z-20 ${
            isUltra
              ? 'bg-gradient-to-r from-[#ea580c] via-[#d97706] to-[#78350f] border border-orange-400/50'
              : 'bg-gradient-to-r from-slate-300 via-slate-500 to-slate-700 border border-white/30'
          }`}
          style={{
            right: '-7px',
            top: '20%',
            width: '7px',
            height: '20%',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)',
          }}
        >
          {/* Crown ridged texture lines */}
          <div className="w-full h-full flex flex-col justify-between py-0.5 opacity-60">
            <div className="w-full h-[1px] bg-black" />
            <div className="w-full h-[1px] bg-black" />
            <div className="w-full h-[1px] bg-black" />
            <div className="w-full h-[1px] bg-black" />
          </div>
        </div>

        {/* Side Button (Below Crown) */}
        <div
          className="absolute bg-[#18181b] border border-white/15 rounded-r-xs shadow-xs z-20"
          style={{
            right: '-4px',
            top: '48%',
            width: '4px',
            height: '22%',
          }}
        />

        {/* Action Button (Left side on Ultra) */}
        {isUltra && (
          <div
            className="absolute bg-[#ea580c] border border-orange-400/40 rounded-l-xs shadow-xs z-20"
            style={{
              left: '-5px',
              top: '32%',
              width: '5px',
              height: '24%',
            }}
          />
        )}

        {/* Inner OLED Glass Display */}
        <div
          className="relative w-full h-full overflow-hidden bg-black flex flex-col"
          style={{
            borderRadius: `calc(${device.cornerRadiusPct}cqi)`,
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9)',
          }}
        >
          {/* Wallpaper Content */}
          <div className="w-full h-full relative z-0">{children}</div>

          {/* Authentic watchOS Photos Watch Face Overlay (Safely Padded from Curved Glass Corners) */}
          <div
            className={`absolute top-0 right-0 pt-[10%] pr-[11%] flex flex-col items-end z-10 pointer-events-none ${shadowStyle}`}
          >
            <div
              className={`text-[0.42em] font-semibold tracking-wider uppercase opacity-90 leading-tight ${textColor}`}
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
            >
              WED 29
            </div>
            <div
              className={`text-[1.2em] font-extrabold tracking-tight leading-none ${textColor}`}
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
            >
              10:09
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Watch Band Strap */}
      <div className="w-[52%] h-7 bg-gradient-to-t from-[#27272a] via-[#3f3f46] to-[#18181b] rounded-b-xl shadow-lg border-b border-x border-white/10 relative z-0 flex items-center justify-center">
        <div className="w-3/4 h-1 bg-black/50 rounded-full" />
      </div>
    </div>
  );
}

/**
 * PadFrame — renders an iPad mockup with uniform thin bezels or classic home-button bezels.
 * Uses cqi (container query inline-size) for scalable perfect circle border radius.
 */
'use client';

import React from 'react';
import { DeviceModel } from '@/lib/devices/types';

interface PadFrameProps {
  device: DeviceModel;
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}

export function PadFrame({
  device,
  children,
  className = '',
  inverted = false,
}: PadFrameProps) {
  const isHomeButton = device.bezelStyle === 'home-button';
  const textColor = inverted ? 'text-slate-900' : 'text-white';
  const homeBarColor = inverted ? 'bg-slate-900/80' : 'bg-white/80';

  return (
    <div
      className={`pad-frame-wrapper w-full flex items-center justify-center ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      <div
        className="relative w-full bg-[#18181b] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
        style={{
          borderRadius: isHomeButton ? 'calc(5cqi)' : `calc(${device.cornerRadiusPct + 1}cqi)`,
          padding: isHomeButton ? '6% 3.5% 8% 3.5%' : 'calc(2.5cqi)',
          aspectRatio: `${device.resolution.width} / ${device.resolution.height}`,
        }}
      >
        {/* Camera dot */}
        {device.id.includes('pro') ? (
          // Landscape long edge camera
          <div
            className="absolute bg-[#333] rounded-full z-20"
            style={{
              right: '1.2%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '0.8cqi',
              height: '0.8cqi',
            }}
          />
        ) : (
          // Portrait short edge camera
          <div
            className="absolute bg-[#333] rounded-full z-20"
            style={{
              top: isHomeButton ? '2.5%' : '1.2%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0.8cqi',
              height: '0.8cqi',
            }}
          />
        )}

        {/* Screen area */}
        <div
          className="relative w-full h-full overflow-hidden bg-black flex-1"
          style={{
            borderRadius: isHomeButton ? 'calc(1cqi)' : `calc(${device.cornerRadiusPct}cqi)`,
          }}
        >
          {/* Wallpaper */}
          <div className="absolute inset-0 z-0">{children}</div>

          {/* Lock screen overlay */}
          <div className="absolute left-0 right-0 z-10 text-center pointer-events-none" style={{ top: '15%' }}>
            <div className={`${textColor} text-[2.4em] font-light tracking-tight leading-none opacity-90 drop-shadow-sm`}>
              9:41
            </div>
            <div className={`${textColor} text-[0.5em] font-medium opacity-75 mt-[0.4em] drop-shadow-xs`}>
              Sunday, July 27
            </div>
          </div>

          {/* iPad Home Bar (for all full-screen iPads) */}
          {!isHomeButton && (
            <div className={`absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[24%] h-[4px] ${homeBarColor} rounded-full z-20 pointer-events-none shadow-xs`} />
          )}
        </div>

        {/* Touch ID Home button for iPad 9th gen */}
        {isHomeButton && (
          <div className="absolute bottom-[2.2%] left-1/2 -translate-x-1/2 w-[5.5%] aspect-square rounded-full border-2 border-[#3f3f46] bg-[#121214] shadow-inner z-20 flex items-center justify-center">
            <div className="w-[85%] h-[85%] rounded-full border border-white/5" />
          </div>
        )}
      </div>
    </div>
  );
}

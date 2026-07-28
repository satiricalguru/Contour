/**
 * PhoneFrame — renders an iPhone mockup with accurate bezel treatment, Dynamic Island,
 * and iPhone SE home button layout.
 * Uses cqi (container query inline-size) for scalable, perfectly circular border radius.
 */
'use client';

import React from 'react';
import { DeviceModel } from '@/lib/devices/types';
import { Cutout } from './Cutout';

interface PhoneFrameProps {
  device: DeviceModel;
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}

export function PhoneFrame({
  device,
  children,
  className = '',
  inverted = false,
}: PhoneFrameProps) {
  const isHomeButton = device.bezelStyle === 'home-button';
  const textColor = inverted ? 'text-slate-900' : 'text-white';
  const homeBarColor = inverted ? 'bg-slate-900/80' : 'bg-white/80';

  return (
    <div
      className={`phone-frame-wrapper w-full flex items-center justify-center ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Outer phone shell */}
      <div
        className="relative w-full bg-[#18181b] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
        style={{
          borderRadius: isHomeButton ? 'calc(10cqi)' : `calc(${device.cornerRadiusPct + 1.5}cqi)`,
          padding: isHomeButton ? '14% 5% 18% 5%' : 'calc(2.5cqi)',
          aspectRatio: `${device.resolution.width} / ${device.resolution.height}`,
        }}
      >
        {/* Top ear speaker for SE-style */}
        {isHomeButton && (
          <div className="absolute top-[4.5%] left-1/2 -translate-x-1/2 w-[18%] h-[3px] bg-[#3f3f46] rounded-full z-20" />
        )}

        {/* Side Volume / Power buttons */}
        <div
          className="absolute bg-[#27272a]"
          style={{ right: '-3px', top: '18%', width: '3px', height: '9%', borderRadius: '0 2px 2px 0' }}
        />
        <div
          className="absolute bg-[#27272a]"
          style={{ left: '-3px', top: '14%', width: '3px', height: '5%', borderRadius: '2px 0 0 2px' }}
        />
        <div
          className="absolute bg-[#27272a]"
          style={{ left: '-3px', top: '22%', width: '3px', height: '8%', borderRadius: '2px 0 0 2px' }}
        />
        <div
          className="absolute bg-[#27272a]"
          style={{ left: '-3px', top: '32%', width: '3px', height: '8%', borderRadius: '2px 0 0 2px' }}
        />

        {/* Screen area */}
        <div
          className="relative w-full h-full overflow-hidden bg-black flex-1"
          style={{
            borderRadius: isHomeButton ? 'calc(1cqi)' : `calc(${device.cornerRadiusPct}cqi)`,
          }}
        >
          {/* Wallpaper content */}
          <div className="absolute inset-0 z-0">{children}</div>

          {/* Cutout (Dynamic Island or Notch) */}
          {device.cutout && (
            <Cutout style={device.bezelStyle} cutout={device.cutout} />
          )}

          {/* Status bar overlay (Time on Left, Icons on Right) */}
          {!isHomeButton && (
            <div className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between pl-[6%] pr-[4%] pt-[2.5%] pointer-events-none ${textColor}`}>
              <span className="text-[0.6em] font-semibold tracking-tight opacity-90 drop-shadow-xs">
                9:41
              </span>
              <div className="flex items-center gap-[0.15em] opacity-90 drop-shadow-xs">
                {/* Wifi icon */}
                <svg className="w-[0.65em] h-[0.65em]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 14a2 2 0 100 4 2 2 0 000-4z" />
                  <path d="M6.2 11.5a5.5 5.5 0 017.6 0 .8.8 0 101.1-1.1 7.1 7.1 0 00-9.8 0 .8.8 0 001.1 1.1z" />
                  <path d="M3.2 8.5a9.8 9.8 0 0113.6 0 .8.8 0 101.1-1.1 11.4 11.4 0 00-15.8 0 .8.8 0 001.1 1.1z" />
                </svg>
                {/* Battery icon */}
                <svg className="w-[0.9em] h-[0.55em]" viewBox="0 0 25 12" fill="currentColor">
                  <rect x="0" y="1" width="22" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <rect x="23" y="4" width="2" height="4" rx="0.5" />
                  <rect x="2" y="3" width="16" height="6" rx="1.5" />
                </svg>
              </div>
            </div>
          )}

          {/* Lock screen clock */}
          {!isHomeButton && (
            <div className="absolute left-0 right-0 z-10 text-center pointer-events-none" style={{ top: '12%' }}>
              <div className={`${textColor} text-[2.6em] font-light tracking-tight leading-none drop-shadow-sm`}>
                9:41
              </div>
              <div className={`${textColor} text-[0.52em] font-medium opacity-80 mt-[0.3em] tracking-wide drop-shadow-xs`}>
                Sunday, July 27
              </div>
            </div>
          )}

          {/* iOS Home Indicator Bar */}
          {!isHomeButton && (
            <div className={`absolute bottom-[2.5%] left-1/2 -translate-x-1/2 w-[34%] h-[4px] ${homeBarColor} rounded-full z-20 pointer-events-none shadow-xs`} />
          )}
        </div>

        {/* Touch ID Home button for SE-style centered in bottom chin */}
        {isHomeButton && (
          <div className="absolute bottom-[3.5%] left-1/2 -translate-x-1/2 w-[12%] aspect-square rounded-full border-2 border-[#3f3f46] bg-[#121214] shadow-inner z-20 flex items-center justify-center">
            <div className="w-[85%] h-[85%] rounded-full border border-white/5" />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Cutout — renders the notch or Dynamic Island shape.
 * Sized in percentages so it scales correctly at any mockup size.
 */
'use client';

import { BezelStyle, DeviceCutout } from '@/lib/devices/types';

interface CutoutProps {
  style: BezelStyle;
  cutout: DeviceCutout;
}

export function Cutout({ style, cutout }: CutoutProps) {
  if (style === 'plain-bezel' || style === 'home-button') return null;

  const isDynamicIsland = style === 'dynamic-island';

  return (
    <div
      className="absolute bg-black left-1/2 z-30 flex items-center justify-between px-[3%] overflow-hidden"
      style={{
        width: `${cutout.widthPct}%`,
        height: `${cutout.heightPct}%`,
        top: `${cutout.topOffsetPct}%`,
        transform: 'translateX(-50%)',
        borderRadius: isDynamicIsland ? '9999px' : '0 0 14px 14px',
        boxShadow: isDynamicIsland ? '0 1px 3px rgba(0,0,0,0.8), inset 0 0 2px rgba(255,255,255,0.08)' : 'none',
      }}
    >
      {isDynamicIsland && (
        <>
          {/* Front camera lens reflection */}
          <div className="w-[22%] aspect-square rounded-full bg-[#0a0a0f] border border-white/10 flex items-center justify-center">
            <div className="w-[40%] aspect-square rounded-full bg-[#161a29]" />
          </div>
          {/* FaceID sensor array */}
          <div className="w-[18%] aspect-square rounded-full bg-[#060608]" />
        </>
      )}
    </div>
  );
}

/**
 * DeviceFrame — unified component that delegates to the correct
 * category-specific frame (MacFrame, PhoneFrame, PadFrame).
 */
'use client';

import React from 'react';
import { DeviceModel } from '@/lib/devices/types';
import { MacFrame } from './MacFrame';
import { PhoneFrame } from './PhoneFrame';
import { PadFrame } from './PadFrame';

interface DeviceFrameProps {
  device: DeviceModel;
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}

export function DeviceFrame({
  device,
  children,
  className = '',
  inverted = false,
}: DeviceFrameProps) {
  switch (device.category) {
    case 'mac':
      return (
        <MacFrame device={device} className={className} inverted={inverted}>
          {children}
        </MacFrame>
      );
    case 'iphone':
      return (
        <PhoneFrame device={device} className={className} inverted={inverted}>
          {children}
        </PhoneFrame>
      );
    case 'ipad':
      return (
        <PadFrame device={device} className={className} inverted={inverted}>
          {children}
        </PadFrame>
      );
    default:
      return <div>{children}</div>;
  }
}

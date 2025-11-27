'use client';

import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface Dimensions {
  readonly width: number;
  readonly height: number;
}

export interface UseMediaQueryResult {
  readonly device: DeviceType | null;
  readonly width: number | null;
  readonly height: number | null;
  readonly isMobile: boolean;
  readonly isTablet: boolean;
  readonly isDesktop: boolean;
}

function readDevice(): DeviceType | null {
  if (typeof window === 'undefined') {
    return null;
  }
  if (window.matchMedia('(min-width: 1024px)').matches) {
    return 'desktop';
  }
  if (window.matchMedia('(min-width: 640px)').matches) {
    return 'tablet';
  }
  return 'mobile';
}

function readDimensions(): Dimensions | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * Report responsive metadata including device type and viewport size.
 */
export function useMediaQuery(): UseMediaQueryResult {
  const [device, setDevice] = useState<DeviceType | null>(readDevice());
  const [dimensions, setDimensions] = useState<Dimensions | null>(
    readDimensions()
  );
  useEffect(() => {
    const updateState = () => {
      setDevice(readDevice());
      setDimensions(readDimensions());
    };
    updateState();
    window.addEventListener('resize', updateState);
    return () => {
      window.removeEventListener('resize', updateState);
    };
  }, []);
  return {
    device,
    width: dimensions?.width ?? null,
    height: dimensions?.height ?? null,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  };
}

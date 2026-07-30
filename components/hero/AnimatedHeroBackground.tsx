'use client';

/**
 * AnimatedHeroBackground — Official Apple iOS hero video background.
 * Plays the continuous extracted Apple OS video animation (/apple-hero.mp4) seamlessly
 * in the background behind the homepage top hero section without disturbing text or controls.
 */
import { useEffect, useRef } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function AnimatedHeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = `${basePath}/apple-hero.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-80 scale-[1.15] -translate-y-16"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Top gradient for blending and text legibility */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      
      {/* Short bottom gradient to fade the video into solid black just below the buttons */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  );
}

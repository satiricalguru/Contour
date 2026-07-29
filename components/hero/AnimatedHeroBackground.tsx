/**
 * AnimatedHeroBackground — Official Apple OS continuous hero video background.
 * Embeds Apple's multi-device (Mac, iPhone, iPad, Watch) glowing Siri/Intelligence
 * video loop directly from /media/apple-hero.mp4 with fallback to Apple CDN.
 */
'use client';

import { useRef, useEffect, useState } from 'react';

export function AnimatedHeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays automatically & continuously
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked by browser policy, retry on user interaction
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      {/* Background Video — Apple Hero Video Animation */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="w-full h-full object-cover object-top opacity-85 scale-[1.01] transition-opacity duration-1000"
      >
        <source src="/media/apple-hero.mp4" type="video/mp4" />
        <source src="https://www.apple.com/105/media/ww/os/shared/2026/ddee26e5-ed05-4bf5-a59a-69f6cd265e29/anim/hero/xlarge.mp4" type="video/mp4" />
      </video>

      {/* Subtle top & bottom vignette gradient overlays for seamless blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[var(--background)] pointer-events-none" />

      {/* Play/Pause Control Button Pill */}
      <div className="absolute bottom-6 right-6 pointer-events-auto z-10">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-2xl border border-white/15 px-4 py-2 rounded-full shadow-2xl transition-all duration-300 group"
          title={isPlaying ? 'Pause background animation' : 'Play background animation'}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isPlaying ? 'Pause Animation' : 'Play Animation'}</span>
        </button>
      </div>
    </div>
  );
}

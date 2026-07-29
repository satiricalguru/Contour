/**
 * AnimatedHeroBackground — Official Apple iOS hero video background.
 * Plays the continuous extracted Apple OS video animation (/apple-hero.mp4) seamlessly
 * in the background behind the homepage top hero section without disturbing text or controls.
 */
'use client';

export function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-80"
      >
        <source src="/apple-hero.mp4" type="video/mp4" />
      </video>

      {/* Subtle top/bottom gradient overlay to blend into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[var(--background)] opacity-70" />
    </div>
  );
}

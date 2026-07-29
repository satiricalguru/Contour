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

      {/* Top gradient for blending and text legibility */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      
      {/* Strong bottom gradient to completely fade the video into solid black, preventing any hard edge */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
    </div>
  );
}

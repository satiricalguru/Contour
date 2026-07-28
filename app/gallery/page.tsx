/**
 * Gallery page — browsable grid of curated wallpapers with filtering.
 */
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export const metadata = {
  title: 'Gallery — Contour Generative Wallpapers',
  description: 'Browse curated minimalist generative wallpapers filterable by pattern family, color mood, and polarity mode.',
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12 pt-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          Wallpaper Gallery
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/40 max-w-2xl mx-auto">
          Minimalist, landscape-inspired patterns rendered in real time.
          Every wallpaper is unique — pick any preset to customize it in the Studio.
        </p>
      </div>

      <GalleryGrid />
    </div>
  );
}

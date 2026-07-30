<div align="center">
  <img src="./public/icon.svg" width="100" height="100" alt="Contour Logo" />
  <h1>Contour</h1>
  <p><strong> Generative 4K Wallpaper & Live Motion Studio Crafted for macOS, iOS, iPadOS & watchOS</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Live Motion](https://img.shields.io/badge/60_FPS-Live_Motion-emerald?style=for-the-badge)](https://github.com/satiricalguru/Contour)
  [![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](./LICENSE)
</div>

<br />

> **Contour** is an ultra-premium, 100% client-side generative wallpaper studio designed specifically for the Apple ecosystem. Powered by pure mathematical algorithms (1D/2D value noise, domain-warped fractal Brownian motion, PRNG, and interpolated color ramps), Contour renders bespoke static 4K wallpapers and 60 FPS live motion wallpapers directly inside your browser.

---

## 📷 Screenshots & Preview Gallery

<!-- Replace the placeholder paths below with your screenshot images -->

| Generative Studio Preview | Live Motion & Hardware Mockups |
| :---: | :---: |
| ![Generative Studio](./docs/screenshots/studio.png) | ![Device Mockup Preview](./docs/screenshots/mockup.png) |

| Curated Wallpaper Gallery | Saved Favorites & Live Export |
| :---: | :---: |
| ![Curated Catalog](./docs/screenshots/gallery.png) | ![Saved Favorites](./docs/screenshots/favorites.png) |

> 💡 *Note: You can drop your screenshot images into `./docs/screenshots/` to display them above.*

---

## ✨ Key Features

- 🎬 **60 FPS Live Wallpaper Motion**: Real-time procedural animation engine animating domain warping, undulating waves, and northern lights shimmers at 60 FPS.
- 📹 **4K Live Video Export (MP4 / WebM)**: Record 5-second seamless 4K looping video wallpapers directly in browser via client-side `MediaRecorder` + `Canvas.captureStream(60)`.
-  **Native Apple Hardware Mockups**: Preview custom wallpapers framed inside 38 pixel-accurate Apple device specs (MacBook Pro 16", MacBook Air, iPad Pro 13", iPhone 17 Pro, iPhone Air, Apple Watch Series 10, and more).
- 🎨 **13 Procedural Canvas Patterns**: *Flowing Hills*, *Topographic Contours*, *Aurora Bands*, *Marble Ink*, *Smooth Wave*, *Sand Dunes*, *Geometric Facets*, *Terrazzo*, *Grain Field*, *Halftone Gradient*, *Concentric Arcs*, *Mountains*, and *Scribble*.
- 🌈 **19 Handcrafted Mood Palettes**: Vibrant gradients tailored to Apple aesthetics (*Midnight Jade*, *Pacific Blue*, *Sunset Horizon*, *Aurora Borealis*, *Neon Cyberpunk*, *Minimal Mono*, and more).
- ⚡ **Real-Time OffscreenCanvas 4K PNG Export**: Instant pixel-perfect rendering up to native 3456 × 2234 resolution without DOM freezing.
- 🌓 **Apple Liquid Glass Tab Navigation**: Fluid, pixel-accurate sliding pill tab bar animation with spring easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- 🔒 **100% Client-Side & Private**: Zero server APIs, zero database calls, and zero external tracking. All rendering and video recording happen 100% locally.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables
- **State Management**: [Zustand](https://github.com/pmndrez/zustand) with persistent `localStorage`
- **Rendering Engine**: HTML5 Canvas 2D API + `OffscreenCanvas` + `MediaRecorder`
- **Testing**: [Vitest](https://vitest.dev/)

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- `npm`, `yarn`, or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/satiricalguru/Contour.git
   cd Contour
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⌨️ Studio Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Instantly randomize seed & generate a new variation |
| `D` or `L` | Toggle wallpaper polarity (Dark / Light mode) |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more details.

---

<div align="center">
  <sub>Crafted with precision for Apple displays. Powered by Next.js 16 & HTML5 Canvas 2D.</sub>
</div>

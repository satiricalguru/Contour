<div align="center">
  <img src="./public/icon.svg" width="112" height="112" alt="Contour Logo" />
  <h1>Contour</h1>
  <p><strong> Generative 4K Wallpaper & 60 FPS Live Motion Studio for Apple Devices</strong></p>

  [![Next.js 16](https://img.shields.io/badge/Next.js-16.2_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![60 FPS Live Motion](https://img.shields.io/badge/60_FPS-Live_Motion-emerald?style=for-the-badge)](https://github.com/satiricalguru/Contour)
  [![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](./LICENSE)
</div>

<br />

> **Contour** is an ultra-premium, 100% client-side generative wallpaper studio engineered specifically for the Apple ecosystem. Powered by pure mathematical algorithms (1D/2D value noise, domain-warped fractal Brownian motion, PRNG, and smooth RGB color interpolation), Contour generates bespoke 4K static wallpapers and 60 FPS live motion wallpapers directly inside your browser.

---

## 📷 Screenshots & Preview Gallery

| 🌟 Hero Showcase |  Native Apple Hardware Stage |
| :---: | :---: |
| ![Hero Showcase](./docs/screenshots/hero.png) | ![Apple Hardware Stage](./docs/screenshots/devices.png) |

| 💻 MacBook Studio | 📱 iPhone 17 Pro Studio |
| :---: | :---: |
| ![MacBook Studio](./docs/screenshots/studio.png) | ![iPhone Studio](./docs/screenshots/studio-iphone.png) |

| 📱 iPad Pro Studio & Live Motion | ⌚ Apple Watch Ultra 2 Studio |
| :---: | :---: |
| ![iPad Studio](./docs/screenshots/studio-ipad.png) | ![Apple Watch Studio](./docs/screenshots/studio-watch.png) |

| 🖼️ Curated Wallpaper Gallery | 📚 System Documentation |
| :---: | :---: |
| ![Wallpaper Gallery](./docs/screenshots/gallery.png) | ![System Documentation](./docs/screenshots/documentation.png) |

---

## ✨ Highlights & Features

- 🎬 **60 FPS Procedural Live Motion Engine**: Real-time canvas animation engine rendering smooth domain warping, northern lights shimmers, and undulating wave physics.
- 🍏 **Apple Ecosystem Pack Multi-Device Batch Export**: One-click batch wallpaper exporter generating native 4K wallpapers tailored to your exact Apple devices (Mac, iPhone, iPad, Watch).
- 📹 **4K Live Video Export (MP4 / WebM)**: Record 5-second seamless 4K video wallpapers directly in browser via client-side `MediaRecorder` + `Canvas.captureStream(60)`.
-  **38 Native Apple Hardware Mockup Profiles**: Pixel-accurate preview frames for MacBook Pro 16", MacBook Air, iPad Pro 13", iPhone 17 Pro, iPhone Air, Apple Watch Ultra 2, and more.
- 🎨 **13 Algorithmic Canvas Patterns**: *Flowing Hills*, *Topographic Contours*, *Aurora Bands*, *Marble Ink*, *Smooth Wave*, *Sand Dunes*, *Geometric Facets*, *Terrazzo*, *Grain Field*, *Halftone Gradient*, *Concentric Arcs*, *Mountains*, and *Scribble*.
- 🌈 **19 Handcrafted Mood Palettes**: Vibrant gradients inspired by Apple design language (*Midnight Jade*, *Pacific Blue*, *Sunset Horizon*, *Aurora Borealis*, *Neon Cyberpunk*, *Minimal Mono*, and more).
- ⚡ **Real-Time OffscreenCanvas 4K PNG Export**: Instant pixel-perfect rendering up to native 3456 × 2234 resolution without DOM freezing.
- 🔒 **100% Client-Side & Zero Backend Dependencies**: Zero database calls, zero external APIs, and zero tracking. All rendering and video exports happen locally in your browser.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables
- **State Management**: [Zustand](https://github.com/pmndrez/zustand) with persistent `localStorage`
- **Graphics Engine**: HTML5 Canvas 2D API + `OffscreenCanvas` + `MediaRecorder`
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

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⌨️ Studio Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Instantly randomize seed & generate a new variation |
| `D` or `L` | Toggle wallpaper polarity (Dark / Light mode) |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more details.

---

<div align="center">
  <sub>Crafted with precision for Apple displays. Powered by Next.js 16 & Canvas 2D.</sub>
</div>

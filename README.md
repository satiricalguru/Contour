<div align="center">
  <img src="./public/icon.svg" width="96" height="96" alt="Contour Logo" />
  <h1>Contour</h1>
  <p><strong> Generative 4K Wallpaper Studio Crafted for macOS, iOS & iPadOS</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](./LICENSE)
</div>

<br />

> **Contour** is a ultra-premium, zero-dependency generative wallpaper studio designed specifically for the Apple ecosystem. Powered by pure mathematical algorithms (1D/2D value noise, fractal Brownian motion, PRNG, and smooth RGB color ramps), Contour renders bespoke 4K native wallpapers in real-time right inside your browser.

---

## ✨ Features

-  **Native Apple Hardware Mockup Stage**: Preview your custom wallpapers framed inside pixel-accurate Apple hardware cutouts (MacBook Pro 16", MacBook Air 15", MacBook Neo, iPad Pro 13", iPad mini, iPhone 17 Pro, iPhone Air, and iPhone SE).
- 🎨 **13 Algorithmic Generative Patterns**: From *Flowing Hills*, *Topographic Contours*, and *Silk Waves* to *Cyber Grid*, *Glass Orbs*, and *Geometric Prism*.
- 🌈 **19 Handcrafted Mood Palettes**: Vibrant gradients inspired by Apple design language (*Midnight Jade*, *Pacific Blue*, *Sunset Horizon*, *Aurora Borealis*, *Neon Cyberpunk*, *Minimal Mono*, and more).
- ⚡ **Real-time OffscreenCanvas 4K PNG Export**: Instant pixel-perfect rendering up to native 3456 × 2234 resolution without DOM freezing.
- 🌓 **Dual-Mode System**: Seamless support for both Light Mode and Dark Mode UI alongside an independent Wallpaper Polarity Toggle.
- 📱 **33 Verified Hardware Specifications**: Screen resolutions, aspect ratios, and bezel treatments (Dynamic Island, Notch, Plain Bezel, Chin Home Button) mapped directly to official Apple specs.
- 🚀 **100% Client-Side & Zero Stock Assets**: No backend databases, external API calls, or stock JPEGs. Lightweight, instant, and private.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with persistent `localStorage` support
- **Rendering Engine**: HTML5 Canvas 2D API + `OffscreenCanvas`
- **Testing**: [Vitest](https://vitest.dev/)

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- `npm` or `yarn` or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jatinpandey/Contour.git
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

## ⌨️ Studio Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Instantly randomize seed & generate a new variation |
| `Dark / Light` | Toggle wallpaper polarity without altering the color palette |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more details.

---

<div align="center">
  <sub>Crafted with precision for Apple displays. Powered by Next.js & Canvas 2D.</sub>
</div>

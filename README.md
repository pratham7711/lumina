# 🌟 Lumina

> **Immersive SaaS landing page — animated 3D visuals and scroll-driven storytelling to showcase your product.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-6366f1?style=for-the-badge&logo=vercel)](https://lumina-beta-one.vercel.app)

---

## ✨ Features

- 🌌 **Interactive 3D hero** — Three.js scene rendered via React Three Fiber with real-time camera interaction and post-processing
- 📜 **Scroll-driven animations** — GSAP ScrollTrigger pins sections and animates elements as the user scrolls through the page
- ✨ **Framer Motion transitions** — smooth page-level and component-level animations with spring physics
- 🎨 **Polished design sections** — Hero, Features, Showcase, Pricing, and Footer — all production-ready
- 📸 **Screenshot gallery** — visual proof-of-concept sections with real product shots
- 📱 **Fully responsive** — layout adapts gracefully from mobile to widescreen
- 🚀 **Vite + TypeScript** — lightning-fast dev experience with full type safety

---

## 🖼️ Screenshots

| Hero | Features | Pricing |
|---|---|---|
| ![Hero](lumina-hero.png) | ![Features](lumina-features.png) | ![Pricing](lumina-pricing.png) |

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=fff)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-000000?style=flat-square)
![GSAP](https://img.shields.io/badge/GSAP%203-88CE02?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite%207-646CFF?style=flat-square&logo=vite&logoColor=fff)

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18+

### 1. Clone the repo

```bash
git clone https://github.com/pratham7711/lumina.git
cd lumina
npm install
```

> **Note:** This project references a local `@pratham/ui` package at `../pratham-ui`. If you don't have that sibling directory, remove or stub out the import — the rest of the page will work independently.

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Build for Production

```bash
npm run build     # TypeScript compile + Vite bundle → dist/
npm run preview   # Preview the production build locally
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero/          # Three.js 3D scene + hero copy
│   ├── Features/      # Animated feature cards
│   ├── Showcase/      # Screenshot / product visual section
│   ├── Pricing/       # Pricing table
│   └── Footer/        # Links, socials
├── hooks/             # useScrollAnimation, useThreeScene
├── utils/             # GSAP helpers, Three.js setup
└── App.tsx
```

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<p align="center">Built by <a href="https://github.com/pratham7711">Pratham</a> · Powered by Three.js + GSAP + Framer Motion</p>

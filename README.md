# SkillPilot AI — Landing Page

A cinematic, scroll-led landing page for SkillPilot AI. The visual direction is original and uses Cius Labs as high-level inspiration: editorial typography, layered motion, restrained color, and immersive sections.

## Stack
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Lucide icons

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Project structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    landing-page.tsx
  lib/
    motion.ts
```

## Notes
- The public landing page is the first milestone. The authenticated learning dashboard and FastAPI backend will be added as separate application areas.
- Scroll motion respects `prefers-reduced-motion`.
- The hero and feature previews are CSS-built visual elements; no external image assets are required.
- Replace the demo email CTA and preview content with real product routes when authentication and backend work begins.
- Keep all private keys server-side. Do not put service-role, LLM, or Judge0 secrets in `NEXT_PUBLIC_*` variables.

# DevOps Command Center Portfolio Setup Guide

## Project Summary

This project is a high-end personal portfolio for a DevOps Engineer built with:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- GSAP
- Three.js via React Three Fiber

The design is a futuristic neon command center with:

- Theme switching: blue, green, red
- Immersive hero section with animated 3D network visuals
- Animated About, Skills, Projects, Journey, and Contact sections
- Reusable component structure

## Important Install Note

`npm ci` only works when `package-lock.json` already exists and matches `package.json`.

That means the correct flow is:

1. Run `npm install` once
2. Then `npm ci` can be used later for clean installs

## Commands

### First-time setup

```bash
npm install
```

### Clean install after lockfile exists

```bash
npm ci
```

### Start development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx

components/
  canvas/
    hero-network-canvas.tsx
  providers/
    smooth-scroll-provider.tsx
    theme-provider.tsx
  sections/
    about-section.tsx
    contact-section.tsx
    hero-section.tsx
    journey-section.tsx
    projects-section.tsx
    skills-section.tsx
  ui/
    contact-form.tsx
    custom-cursor.tsx
    project-card.tsx
    section-heading.tsx
    system-topbar.tsx
    theme-switcher.tsx

lib/
  portfolio-data.ts
  theme.ts
  use-reveal-animation.ts
```

## Main Customization Files

- `lib/portfolio-data.ts`
  Update name, links, project entries, journey entries, and content text.

- `lib/theme.ts`
  Update theme palettes.

- `app/globals.css`
  Adjust global neon styling, glassmorphism, and background effects.

- `components/canvas/hero-network-canvas.tsx`
  Modify the hero animation and 3D background behavior.

## Notes

- `package-lock.json` is required for `npm ci`
- If `npm ci` reports that the lockfile is out of sync, run `npm install` again
- If npm fails because of permissions or cache access, run the install from a normal terminal with sufficient permissions

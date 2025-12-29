# Development

## Prerequisites
- Node.js 18+ (20+ recommended)
- npm 9+

## Install
```bash
npm install
```

## Run locally
```bash
npm run dev
```
Vite serves the app and prints the local URL.

## Build and preview
```bash
npm run build
npm run preview
```
`npm run preview` serves the production build output from `dist/`.

## Lint
```bash
npm run lint
```

## Docker (production image)
```bash
docker build -t empire-trail .
docker run --rm -p 4173:80 empire-trail
```
Nginx serves the built `dist/` assets inside the container.

## Local persistence
- The game uses browser `localStorage` for onboarding, achievements, and save slots.
- When debugging “fresh start” behavior, clear site data (or remove the keys documented in `docs/features/save-system.md`).


# Tech stack

## Core
- React 18
- TypeScript
- Vite

## UI and interaction
- Styling: global CSS and a tokenized design system in `src/styles/design-system.css`
- Animations: Framer Motion
- Lottie: `lottie-react` for lightweight full-screen overlays
- Notifications: `react-toastify`
- Dice UI: `react-dice-complete`

## Data and persistence
- Static gameplay data in `src/assets/*`
- Browser `localStorage` for onboarding, save slots, auto-save, and unlocked achievements

## Tooling
- ESLint for linting
- Docker + Nginx for production container hosting

## Architecture conventions
- Keep gameplay types centralized in `src/types.ts`.
- Keep cross-cutting logic in `src/services/*` and `src/utils/*`.
- Prefer small, focused modules with clear responsibilities and minimal duplication.


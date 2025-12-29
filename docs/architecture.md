# Architecture

## Overview
Empire Trail is a single-page React + TypeScript game with a screen-state flow controlled by `src/components/App.tsx`.

## Screen flow
- `GameState` is a string union in `src/types.ts` that drives which screen component is rendered.
- `src/components/App.tsx` owns core game state (player, month, city, portfolio, event) and passes state + callbacks to screens.
- `framer-motion` drives screen transitions and modal/overlay animations.

## Data sources
- `src/assets/gameData.ts` provides seeded cities, properties, and event definitions.
- `src/assets/achievements.ts` defines achievement content (criteria, rewards, rarity).

## Services (logic and persistence)
- `src/services/saveSystem.ts` persists game state to `localStorage` (slots + auto-save) and handles version checks.
- `src/services/achievementService.ts` tracks stats, computes progress, and unlocks achievements, persisting unlock state to `localStorage`.
- `src/services/logger.ts` centralizes logging and replaces direct console usage in most services.

## Utilities
- `src/utils/gameUtils.ts` contains common calculations (costs, formatting, readiness checks, event selection).
- `src/utils/keyboardUtils.ts` normalizes keyboard shortcuts and provides reusable handlers.
- `src/utils/accessibilityUtils.ts` provides focus trapping, SR announcements, and keyboard navigation helpers.
- `src/utils/cityImageUtils.ts` maps city names to background images.

## Styling
- `src/styles/design-system.css` defines CSS variables (tokens) plus shared primitives (buttons, cards, etc).
- Screen-specific styles live in `src/styles/*.css` and are imported by their corresponding components.

## Key types
- `src/types.ts` is the contract for gameplay entities (`Player`, `InvestmentProperty`, `Event`, `SaveGame`, `Achievement`).
- Keep type changes coordinated with `src/assets/*` data and the services that persist state.


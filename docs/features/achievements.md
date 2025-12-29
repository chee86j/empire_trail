# Achievements

## Overview
Achievements provide milestone tracking and rewards. Content is defined in `src/assets/achievements.ts` and evaluated by `src/services/achievementService.ts`.

## Data model
- Achievements use criteria types (e.g. purchase, sell, net worth thresholds) and store progress toward a target.
- `PlayerStats` is the primary input to progress calculations (see `src/types.ts`).

## Persistence
- Unlock state is persisted in browser `localStorage` by `AchievementService`.
- The storage key is currently hard-coded in `src/services/achievementService.ts` as `empire_trail_unlocked_achievements`.

## UI
- `src/components/AchievementScreen.tsx` presents achievements and progress.
- `src/components/AchievementNotification.tsx` handles unlock notifications.


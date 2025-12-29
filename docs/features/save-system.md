# Save system

## Overview
The save system persists game state to browser `localStorage` via `src/services/saveSystem.ts`.

## Storage keys
Defined in `src/constants/gameConstants.ts`:
- `empire_trail_save_slots` (manual slots)
- `empire_trail_auto_save` (auto-save)

Other persistence keys used by the app:
- `empire_trail_onboarding_completed` (onboarding completion flag)

## Slots
- Manual saves are stored in a slot map keyed by `slot_1` through `slot_5`.
- `SaveSystem.getNextAvailableSlot()` returns the next open slot ID (or `null` if full).

## Auto-save
- `src/components/App.tsx` triggers auto-save on major state changes once the game is past the initial screens.
- Auto-save is stored under the dedicated key and does not consume a manual slot.

## Versioning
- Each save includes `version` (see `SAVE_SYSTEM_VERSION` in `src/constants/gameConstants.ts`).
- Loading logs a warning if the saved version does not match the current version.

## Data contract
- The persisted shape matches `SaveGame` and related types in `src/types.ts`.

## Related docs
- Legacy/long-form notes: `SAVE_SYSTEM_README.md`


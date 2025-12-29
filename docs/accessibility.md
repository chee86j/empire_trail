# Accessibility

## Principles
- Maintain keyboard navigability for all interactive elements.
- Respect reduced motion preferences.
- Provide focus management for modals and overlays.

## Utilities
- `src/utils/accessibilityUtils.ts` provides:
  - `trapFocus(container)` for modal focus loops.
  - `announceToScreenReader(message, priority)` for non-visual feedback.
  - `handleListNavigation(...)` for arrow-key list navigation.

## Motion
- `framer-motion` transitions are configured to respect `prefers-reduced-motion` via `useReducedMotion()` in `src/components/App.tsx`.


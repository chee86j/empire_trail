# Keyboard shortcuts

Keyboard handling is centralized in `src/utils/keyboardUtils.ts`. Some screens add their own handlers, but global behavior is wired in `src/components/App.tsx`.

## Global
- `F1`: Toggle help overlay (when available).
- `F5`: Open save/load modal (during gameplay).
- `Escape`: Navigate back / close overlays depending on current screen.

## City screen
- `T`: Travel to the next city.
- `R`: Rest (advance time).
- `V`: View portfolio.
- `F`: Find deals.

## Notes
- The shortcut list shown to players should match `src/constants/gameConstants.ts` and the handlers wired in components.


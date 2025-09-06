/* Keyboard Utilities

Centralized keyboard shortcut handling for the Empire Trail game
*/

/* Check if keyboard shortcut should be ignored */
export const shouldIgnoreKeyboardShortcut = (event: KeyboardEvent): boolean => {
  return (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement
  );
};

/* Create keyboard handler with shortcuts and global shortcuts */
export const createKeyboardHandler = (
  shortcuts: Record<string, () => void>,
  globalShortcuts?: Record<string, () => void>
) => {
  return (event: KeyboardEvent) => {
    if (shouldIgnoreKeyboardShortcut(event)) return;

    const key = event.key;
    const allShortcuts = { ...shortcuts, ...globalShortcuts };

    if (allShortcuts[key]) {
      event.preventDefault();
      allShortcuts[key]();
    }
  };
};

/* Get city screen specific shortcuts */
export const getCityScreenShortcuts = (
  onTravel: () => void,
  onRest: () => void,
  onViewPortfolio: () => void,
  onFindDeals: () => void
) => ({
  t: onTravel,
  T: onTravel,
  r: onRest,
  R: onRest,
  v: onViewPortfolio,
  V: onViewPortfolio,
  f: onFindDeals,
  F: onFindDeals,
});

/* Get global shortcuts */
export const getGlobalShortcuts = (
  onShowHelp: () => void,
  onSaveLoad: () => void,
  onEscape: () => void,
  onQuickSave?: () => void,
  onShowTutorial?: () => void
) => ({
  F1: onShowHelp,
  F5: onSaveLoad,
  F6: onQuickSave || (() => {}),
  F2: onShowTutorial || (() => {}),
  Escape: onEscape,
});

/* Setup keyboard listener with cleanup */
export const setupKeyboardListener = (
  handler: (event: KeyboardEvent) => void
) => {
  window.addEventListener("keydown", handler);

  return () => {
    window.removeEventListener("keydown", handler);
  };
};

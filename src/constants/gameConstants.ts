/* Game Constants

Centralized configuration for the Empire Trail game
*/

/* Dice roll configuration */
export const DICE_ROLL_SUCCESS_VALUES = [3, 5, 7, 9, 11];
export const DICE_ROLL_FAILURE_VALUES = [1, 2, 4, 6, 8, 10, 12];
export const MAX_DICE_ROLLS = 3;

/* Game configuration */
export const SAVE_SYSTEM_VERSION = "1.0.0";
export const MAX_SAVE_SLOTS = 5;

/* Local storage keys */
export const STORAGE_KEYS = {
  SAVE_SLOTS: "empire_trail_save_slots",
  AUTO_SAVE: "empire_trail_auto_save",
} as const;

/* Month names for date formatting */
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* Profession statistics */
export const PROFESSION_STATS = {
  Carpenter: { bankBalance: 50000, salary: 4000 },
  Banker: { bankBalance: 80000, salary: 8000 },
  Realtor: { bankBalance: 30000, salary: 3000 },
  Plumber: { bankBalance: 70000, salary: 6000 },
  Electrician: { bankBalance: 80000, salary: 6000 },
  Accountant: { bankBalance: 40000, salary: 3000 },
} as const;

/* Keyboard shortcuts */
export const KEYBOARD_SHORTCUTS = {
  F1: "Show help",
  F5: "Save/load game",
  F6: "Quick save",
  ESCAPE: "Go back/close",
  T: "Travel to next city",
  R: "Rest (advance month)",
  V: "View portfolio",
  F: "Find deals",
  A: "View achievements",
  ARROW_UP: "Navigate up",
  ARROW_DOWN: "Navigate down",
  P: "Purchase property",
  SPACE: "Confirm/roll dice",
  ENTER: "Confirm/roll dice",
} as const;

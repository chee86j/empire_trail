// Framer Motion presets for modal overlays and panning screens in and out when they change from one game state to another

import type { Transition, Variants } from "framer-motion";

export const createOverlayFadeVariants = (
  reduceMotion: boolean | null | undefined
): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: reduceMotion ? 0 : 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { duration: reduceMotion ? 0 : 0.1 },
  },
});

export const createModalPopVariants = (
  reduceMotion: boolean | null | undefined
): Variants => ({
  initial: {
    opacity: 0,
    y: reduceMotion ? 0 : -16,
    scale: reduceMotion ? 1 : 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: reduceMotion ? 0 : 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: reduceMotion ? 0 : 16,
    scale: reduceMotion ? 1 : 0.98,
    transition: { duration: reduceMotion ? 0 : 0.15, ease: "easeIn" },
  },
});

export const createListItemVariants = (
  reduceMotion: boolean | null | undefined
): Variants => ({
  initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: reduceMotion ? 0 : 0.18, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: reduceMotion ? 0 : -8,
    transition: { duration: reduceMotion ? 0 : 0.12, ease: "easeIn" },
  },
});

export const createButtonTransition = (
  reduceMotion: boolean | null | undefined
): Transition => {
  if (reduceMotion) return { duration: 0 };
  return { type: "spring", stiffness: 500, damping: 30 };
};

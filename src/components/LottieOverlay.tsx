import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import { createOverlayFadeVariants } from "../animations/motionPresets";

type LottieAnimationData = Record<string, unknown>;

interface Props {
  isOpen: boolean;
  animationData: LottieAnimationData;
  onClose: () => void;
  loop?: boolean;
  sizePx?: number;
}

const LottieOverlay: React.FC<Props> = ({
  isOpen,
  animationData,
  onClose,
  loop = false,
  sizePx = 260,
}) => {
  const reduceMotion = useReducedMotion();
  const overlayVariants = createOverlayFadeVariants(reduceMotion);
  const hasClosedRef = useRef(false);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const fallbackCloseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) hasClosedRef.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && reduceMotion) onClose();
  }, [isOpen, reduceMotion, onClose]);

  const safeClose = () => {
    if (hasClosedRef.current) return;
    hasClosedRef.current = true;
    if (fallbackCloseTimeoutRef.current !== null) {
      window.clearTimeout(fallbackCloseTimeoutRef.current);
      fallbackCloseTimeoutRef.current = null;
    }
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    if (reduceMotion) return;

    return () => {
      if (fallbackCloseTimeoutRef.current !== null) {
        window.clearTimeout(fallbackCloseTimeoutRef.current);
        fallbackCloseTimeoutRef.current = null;
      }
    };
  }, [isOpen, reduceMotion]);

  const scheduleFallbackClose = () => {
    if (loop) return;
    if (!isOpen) return;
    if (fallbackCloseTimeoutRef.current !== null) return;

    const durationSeconds = lottieRef.current?.getDuration(false);
    const durationMs =
      typeof durationSeconds === "number" && durationSeconds > 0
        ? Math.round(durationSeconds * 1000)
        : 2500;

    fallbackCloseTimeoutRef.current = window.setTimeout(
      safeClose,
      durationMs + 150
    );
  };

  return (
    <AnimatePresence>
      {isOpen && !reduceMotion && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            background: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(1px)",
          }}
        >
          <div style={{ width: sizePx, height: sizePx }}>
            <Lottie
              animationData={animationData}
              loop={loop}
              autoplay
              onComplete={loop ? null : safeClose}
              onDOMLoaded={scheduleFallbackClose}
              lottieRef={lottieRef}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LottieOverlay;

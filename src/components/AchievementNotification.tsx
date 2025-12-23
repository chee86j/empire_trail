import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Achievement } from "../types";
import { rarityColors } from "../assets/achievements";
import "../styles/AchievementNotification.css";
import { createButtonTransition } from "../animations/motionPresets";

interface Props {
  achievement: Achievement;
  onClose: () => void;
  duration?: number;
}

const AchievementNotification: React.FC<Props> = ({
  achievement,
  onClose,
  duration = 5000,
}) => {
  const reduceMotion = useReducedMotion();
  const buttonTransition = createButtonTransition(reduceMotion);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Auto-close after duration
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match CSS transition duration
  };

  const getRarityGlow = (rarity: string): string => {
    switch (rarity) {
      case "legendary":
        return "0 0 20px rgba(255, 215, 0, 0.8)";
      case "epic":
        return "0 0 15px rgba(156, 39, 176, 0.6)";
      case "rare":
        return "0 0 12px rgba(33, 150, 243, 0.5)";
      case "uncommon":
        return "0 0 8px rgba(76, 175, 80, 0.4)";
      default:
        return "0 0 5px rgba(158, 158, 158, 0.3)";
    }
  };

  const getRarityParticles = (rarity: string): string[] => {
    switch (rarity) {
      case "legendary":
        return ["✨", "⭐", "💫", "🌟", "✨"];
      case "epic":
        return ["💜", "🟣", "💜", "🟣", "💜"];
      case "rare":
        return ["💙", "🔵", "💙", "🔵", "💙"];
      case "uncommon":
        return ["💚", "🟢", "💚", "🟢", "💚"];
      default:
        return ["⚪", "⚫", "⚪", "⚫", "⚪"];
    }
  };

  return (
    <div
      className={`achievement-notification ${isVisible ? "visible" : ""} ${
        isExiting ? "exiting" : ""
      }`}
    >
      <div className="notification-backdrop" onClick={handleClose}></div>

      <div
        className={`notification-card ${achievement.rarity}`}
        style={{
          boxShadow: getRarityGlow(achievement.rarity),
          borderColor: rarityColors[achievement.rarity],
        }}
      >
        {/* Particle Effects */}
        <div className="particles">
          {getRarityParticles(achievement.rarity).map((particle, index) => (
            <span
              key={index}
              className="particle"
              style={{
                animationDelay: `${index * 0.2}s`,
                left: `${20 + index * 15}%`,
                top: `${10 + (index % 2) * 20}%`,
              }}
            >
              {particle}
            </span>
          ))}
        </div>

        {/* Achievement Content */}
        <div className="notification-header">
          <div className="achievement-icon-large">{achievement.emoji}</div>
          <div className="achievement-text">
            <h3 className="achievement-title">Achievement Unlocked!</h3>
            <h4 className="achievement-name">{achievement.name}</h4>
          </div>
          <motion.button
            className="close-button"
            onClick={handleClose}
            aria-label="Close achievement notification"
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            transition={buttonTransition}
          >
            ✕
          </motion.button>
        </div>

        <div className="notification-body">
          <p className="achievement-description">{achievement.description}</p>

          {achievement.reward && (
            <div className="reward-section">
              <div className="reward-icon">🎁</div>
              <div className="reward-text">
                <span className="reward-label">Reward:</span>
                <span className="reward-value">
                  {achievement.reward.type === "cash" && "$"}
                  {achievement.reward.value.toLocaleString()}
                  {achievement.reward.type === "cash" && " bonus"}
                </span>
              </div>
            </div>
          )}

          <div className="rarity-badge-large">
            <span className="rarity-icon">
              {achievement.rarity === "legendary" && "👑"}
              {achievement.rarity === "epic" && "💜"}
              {achievement.rarity === "rare" && "💎"}
              {achievement.rarity === "uncommon" && "🟢"}
              {achievement.rarity === "common" && "⚪"}
            </span>
            <span className="rarity-text">
              {achievement.rarity.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="notification-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <span className="progress-text">COMPLETED!</span>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;

import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/EventScreen.css";
import { Event } from "../types";

interface Props {
  event: Event | null;
  playerBankBalance: number;
  onClose: (newBankBalance: number) => void;
}

const EventScreen: React.FC<Props> = ({
  event,
  playerBankBalance,
  onClose,
}) => {
  const bankBalanceChange = event?.bankBalanceChange ?? 0;

  const handleEventClose = useCallback(() => {
    if (!event) return;
    const newBankBalance = playerBankBalance + event.bankBalanceChange;
    onClose(newBankBalance);
  }, [event, onClose, playerBankBalance]);

  // Keyboard shortcuts handler
  useEffect(() => {
    if (!event) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle key presses when not typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'Escape':
          event.preventDefault();
          handleEventClose();
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [event, handleEventClose]);

  if (!event) {
    return null;
  }

  return (
    <div className="eventScreen">
      <h2>Event</h2>
             <p className="keyboard-help">
         Tip: Press Space, Enter, or ESC to continue
       </p>
      <p>
        {event.type}: {event.description}
      </p>
      <p>
        Bank Balance Change: ${bankBalanceChange.toLocaleString()}
      </p>
      <motion.button 
        onClick={handleEventClose}
        className="btn btn-primary"
        aria-label="Continue after event"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        OK (Space/Enter/ESC)
      </motion.button>
    </div>
  );
};

export default EventScreen;

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  if (!event) {
    return null;
  }

  // Calculate the change in bank balance based on the event's bankBalanceChange
  const calculateBankBalanceChange = (): number => {
    const bankBalanceChange = event.bankBalanceChange;
    return bankBalanceChange;
  };

  // Handle event close
  const handleEventClose = () => {
    const bankBalanceChange = calculateBankBalanceChange();
    const newBankBalance = playerBankBalance + bankBalanceChange;
    toast.info(`New bank balance: $${newBankBalance.toLocaleString()}`);
    onClose(newBankBalance);
  };

  // Keyboard shortcuts handler
  useEffect(() => {
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
  }, [handleEventClose]);

  return (
    <div className="eventScreen">
      <h2>Event</h2>
      <p className="keyboardHelp">
        💡 Press Space, Enter, or ESC to continue
      </p>
      <p>
        {event.type}: {event.description}
      </p>
      <p>
        Bank Balance Change: ${calculateBankBalanceChange().toLocaleString()}
      </p>
      <button onClick={handleEventClose}>OK (Space/Enter/ESC)</button>
    </div>
  );
};

export default EventScreen;

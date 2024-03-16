// EventScreen.tsx

import React from "react";
import { Event } from "../assets/gameData";
import "../styles/EventScreen.css";

interface Props {
  event: Event | null;
  playerProfession: string;
  playerBankBalance: number;
  onClose: (newBankBalance: number) => void; // Callback to update bank balance
}

const EventScreen: React.FC<Props> = ({
  event,
  playerProfession,
  playerBankBalance,
  onClose,
}) => {
  if (!event) {
    return null;
  }

  // Calculate the change in bank balance based on the event's bankBalanceChange
  const calculateBankBalanceChange = (): number => {
    return event.bankBalanceChange;
  };

  // Handle event close
  const handleEventClose = () => {
    const bankBalanceChange = calculateBankBalanceChange();
    const newBankBalance = playerBankBalance + bankBalanceChange;
    onClose(newBankBalance);
  };

  return (
    <div className="screen">
      <h2>Event</h2>
      <p>
        {event.type}: {event.description}
      </p>
      <p>Bank Balance Change: {calculateBankBalanceChange()}</p>
      <button onClick={handleEventClose}>OK</button>
    </div>
  );
};

export default EventScreen;

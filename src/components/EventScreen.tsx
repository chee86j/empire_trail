import React from "react";
import { Event } from "../assets/gameData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/EventScreen.css";

interface Props {
  event: Event | null;
  playerProfession: string;
  playerBankBalance: number;
  onClose: (newBankBalance: number) => void;
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

  return (
    <div className="Eventscreen">
      <ToastContainer />
      <h2>Event</h2>
      <p>
        {event.type}: {event.description}
      </p>
      <p>
        Bank Balance Change: ${calculateBankBalanceChange().toLocaleString()}
      </p>
      <button onClick={handleEventClose}>OK</button>
    </div>
  );
};

export default EventScreen;

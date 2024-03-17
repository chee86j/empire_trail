import React, { useState } from "react";
import { Event, events } from "../assets/gameData";
import EventScreen from "./EventScreen";
import "../styles/CityScreen.css";

interface Props {
  player: { profession: string; bankBalance: number; salary: number } | null;
  currentMonth: number;
  onViewPortfolio: () => void;
  onFindDeals: () => void;
}

const CityScreen: React.FC<Props> = ({
  player,
  currentMonth,
  onViewPortfolio,
  onFindDeals,
}) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [currentBankBalance, setCurrentBankBalance] = useState<number>(
    player?.bankBalance || 0
  );

  const months = [
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

  const handlePlayerAction = (action: string) => {
    switch (action) {
      case "rest":
        // Randomly select an event based on profession probabilities
        const chosenEvent = chooseEvent(player?.profession);

        if (chosenEvent) {
          // Update the bank balance based on the chosen event
          const newBankBalance =
            currentBankBalance + chosenEvent.bankBalanceChange + player?.salary;
          setCurrentBankBalance(newBankBalance);

          // Set the current event
          setCurrentEvent(chosenEvent);
        }
        break;
      default:
        break;
    }
  };

  // Function to choose an event based on profession probabilities
  const chooseEvent = (profession: string | undefined): Event | undefined => {
    if (!profession) return;

    // Filter events based on profession probabilities
    const professionEvents = events.filter((event) => {
      const probability = event.professionProbabilities?.[profession] || 0;
      return Math.random() * 100 < probability;
    });

    // Choose a random event from filtered events
    return professionEvents[
      Math.floor(Math.random() * professionEvents.length)
    ];
  };

  const closeEventScreen = () => {
    setCurrentEvent(null);
  };

  const currentMonthName = months[(currentMonth % 12) - 1];

  return (
    <div className="screen">
      <h2>City Name</h2>
      <p>Months Since Start: {currentMonth}</p>
      <p>{currentMonthName}</p>
      <p>
        Player Info: {player?.profession}, Bank Balance: ${currentBankBalance},
        Salary: ${player?.salary}
      </p>
      <h3>Actions</h3>
      <button onClick={() => handlePlayerAction("travel;")}>Travel</button>
      <button onClick={() => handlePlayerAction("rest")}>Rest</button>
      <button onClick={onViewPortfolio}>View Portfolio</button>
      <button onClick={onFindDeals}>Find Deals</button>
      {currentEvent && (
        <EventScreen event={currentEvent} onClose={closeEventScreen} />
      )}
    </div>
  );
};

export default CityScreen;

import React, { useState } from "react";
import { Event, events } from "../assets/gameData";
import EventScreen from "./EventScreen";
import "../styles/CityScreen.css";
import { InvestmentProperty } from "../assets/gameData";

interface Props {
  player: { profession: string; bankBalance: number; salary: number } | null;
  currentMonth: number;
  setCurrentMonth: (value: number) => void;
  onViewPortfolio: () => void;
  onFindDeals: () => void;
  currentBankBalance: number;
  setCurrentBankBalance: (value: number) => void;
  setInvestmentProperties: (properties: InvestmentProperty[]) => void;
}

const cities = [
  { name: "Los Angeles" },
  { name: "Phoenix" },
  { name: "Dallas" },
  { name: "St.Louis" },
  { name: "Chicago" },
  { name: "Cleveland" },
  { name: "Pittsburgh" },
  { name: "Philadelphia" },
  { name: "New York City" },
];

const CityScreen: React.FC<Props> = ({
  player,
  currentMonth,
  setCurrentMonth,
  onViewPortfolio,
  onFindDeals,
  currentBankBalance,
  setCurrentBankBalance,
}) => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const currentCity = cities[currentCityIndex];

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

  const handleTravel = () => {
    setCurrentMonth((prevMonth: number) => prevMonth + 1);
    setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };

  const handlePlayerAction = (action: string) => {
    switch (action) {
      case "rest":
        // Logic for rest action
        setCurrentMonth((prevMonth) => prevMonth + 1);
        // Randomly select an event based on profession probabilities
        const chosenEvent = chooseEvent(player?.profession);

        if (chosenEvent) {
          // Update the bank balance based on the chosen event
          const newBankBalance =
            currentBankBalance +
            chosenEvent.bankBalanceChange +
            (player?.salary || 0);
          setCurrentBankBalance(newBankBalance);

          // Set the current event
          setCurrentEvent(chosenEvent);
          console.log(`Current Month Since Start: ${currentMonth}`);
        }
        break;
      case "travel":
        // Handle travel action
        setCurrentMonth((prevMonth) => prevMonth + 1);
        setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
        console.log(`Current Month Since Start: ${currentMonth}`);
        handleTravel();
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

  const initialYear = 2008;
  const currentYear = initialYear + Math.floor((currentMonth - 1) / 12);
  const currentMonthName = months[(currentMonth % 12) - 1];

  return (
    <div className="cityScreen">
      {/* City Name */}
      <h2>{currentCity.name}</h2>
      <p className="cityDate">
        {currentMonthName} {currentYear}
      </p>
      <p className="playerStats">
        Profession: {player?.profession} <br /> Bank Balance: $
        {currentBankBalance.toLocaleString()} <br /> Monthly Salary: $
        {player?.salary.toLocaleString()}
      </p>
      <h3>Actions</h3>
      <div className="cityActions">
        <button onClick={() => handlePlayerAction("travel")}>Travel</button>
        <button onClick={() => handlePlayerAction("rest")}>Rest</button>
        <button onClick={onViewPortfolio}>View Portfolio</button>
        <button onClick={onFindDeals}>Find Deals</button>
      </div>
      {currentEvent && (
        <EventScreen
          event={currentEvent}
          onClose={closeEventScreen}
          playerProfession={player?.profession || ""}
          playerBankBalance={currentBankBalance}
        />
      )}
    </div>
  );
};

export default CityScreen;

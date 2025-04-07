import React, { useState } from "react";
import { events } from "../assets/gameData";
import EventScreen from "./EventScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CityScreen.css";
import {
  Player,
  InvestmentProperty,
  City,
  PlayerAction,
  Event,
} from "../types";

interface Props {
  player: Player | null;
  currentMonth: number;
  setCurrentMonth: (value: number) => void;
  onViewPortfolio: () => void;
  portfolio: InvestmentProperty[];
  onFindDeals: () => void;
  currentBankBalance: number;
  setCurrentBankBalance: (value: number) => void;
  currentCity: City;
  setCurrentCity: (city: City) => void;
  cities: City[];
}

const CityScreen: React.FC<Props> = ({
  player,
  currentMonth,
  setCurrentMonth,
  onViewPortfolio,
  portfolio,
  onFindDeals,
  currentBankBalance,
  setCurrentBankBalance,
  currentCity,
  setCurrentCity,
  cities,
}) => {
  const [currentCityIndex, setCurrentCityIndex] = useState(
    cities.findIndex((city) => city.name === currentCity.name)
  );
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

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

  const handlePlayerAction = (action: PlayerAction) => {
    switch (action) {
      case "rest":
      case "travel": {
        const initialBankBalance = currentBankBalance;

        // Increment month
        setCurrentMonth(currentMonth + 1);

        // Adding salary
        const salary = player?.salary || 0;

        // Adding rental income
        let totalRentalIncome = 0;
        portfolio.forEach((property) => {
          if (property.isRented) {
            totalRentalIncome +=
              property.arvRentalIncome - property.monthlyExpenses;
          }
        });

        // Randomly select an event based on profession probabilities
        const chosenEvent = chooseEvent(player?.profession);
        const eventImpact = chosenEvent ? chosenEvent.bankBalanceChange : 0;

        // Update bank balance
        const newBankBalance =
          initialBankBalance + salary + totalRentalIncome + eventImpact;
        setCurrentBankBalance(newBankBalance);

        // Show toast with details
        toast.info(
          `New Balance: $${newBankBalance.toLocaleString()} = $${initialBankBalance.toLocaleString()} + Salary: $${salary.toLocaleString()} + Rent: $${totalRentalIncome.toLocaleString()} + Event: $${eventImpact.toLocaleString()}`
        );
        console.log(
          `Bank($${newBankBalance.toLocaleString()}) = $${initialBankBalance.toLocaleString()} + Sal($${salary.toLocaleString()}) + Rent($${totalRentalIncome.toLocaleString()}) + Evt($${eventImpact.toLocaleString()})`
        );

        if (chosenEvent) {
          setCurrentEvent(chosenEvent);
        }

        if (action === "travel") {
          const newIndex = (currentCityIndex + 1) % cities.length;
          setCurrentCityIndex(newIndex);
          setCurrentCity(cities[newIndex]);
          toast.success(`Traveling to ${cities[newIndex].name}`);
        }
        break;
      }
      default:
        break;
    }
  };

  // Function to choose an event based on profession probabilities
  const chooseEvent = (profession: string | undefined): Event | undefined => {
    if (!profession) return undefined;

    // Filter events based on profession probabilities
    const professionEvents = events.filter((event) => {
      const probability = event.professionProbabilities?.[profession] || 0;
      return Math.random() * 100 < probability;
    });

    // Choose a random event from filtered events
    if (professionEvents.length === 0) return undefined;

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
          playerBankBalance={currentBankBalance}
        />
      )}
    </div>
  );
};

export default CityScreen;

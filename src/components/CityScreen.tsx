import React, { useState, useEffect, useCallback } from "react";
import { events } from "../assets/gameData";
import EventScreen from "./EventScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CityScreen.css";
import { calculateTotalRentalIncome, chooseRandomEvent, formatGameDate } from "../utils/gameUtils";
import { createKeyboardHandler, getCityScreenShortcuts, setupKeyboardListener } from "../utils/keyboardUtils";
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
  onSaveLoad: () => void;
  onViewAchievements: () => void;
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
  onSaveLoad,
  onViewAchievements,
}) => {
  const [currentCityIndex, setCurrentCityIndex] = useState(
    cities.findIndex((city) => city.name === currentCity.name)
  );
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const handleMonthAdvance = useCallback(() => {
    const initialBankBalance = currentBankBalance;
    setCurrentMonth(currentMonth + 1);

    const salary = player?.salary || 0;
    const totalRentalIncome = calculateTotalRentalIncome(portfolio);
    const chosenEvent = chooseRandomEvent(events, player?.profession);
    const eventImpact = chosenEvent ? chosenEvent.bankBalanceChange : 0;

    const newBankBalance = initialBankBalance + salary + totalRentalIncome + eventImpact;
    setCurrentBankBalance(newBankBalance);

    toast.info(
      `New Balance: $${newBankBalance.toLocaleString()} = $${initialBankBalance.toLocaleString()} + Salary: $${salary.toLocaleString()} + Rent: $${totalRentalIncome.toLocaleString()} + Event: $${eventImpact.toLocaleString()}`
    );

    if (chosenEvent) {
      setCurrentEvent(chosenEvent);
    }
  }, [currentBankBalance, currentMonth, player?.salary, portfolio, player?.profession, setCurrentMonth, setCurrentBankBalance]);

  const handleTravel = useCallback(() => {
    const newIndex = (currentCityIndex + 1) % cities.length;
    setCurrentCityIndex(newIndex);
    setCurrentCity(cities[newIndex]);
    toast.success(`Traveling to ${cities[newIndex].name}`);
  }, [currentCityIndex, cities, setCurrentCity]);

  const handlePlayerAction = useCallback((action: PlayerAction) => {
    switch (action) {
      case "rest":
      case "travel": {
        handleMonthAdvance();
        
        if (action === "travel") {
          handleTravel();
        }
        break;
      }
      default:
        break;
    }
  }, [handleMonthAdvance, handleTravel]);



  // Keyboard shortcuts handler
  useEffect(() => {
    const cityShortcuts = getCityScreenShortcuts(
      () => handlePlayerAction("travel"),
      () => handlePlayerAction("rest"),
      onViewPortfolio,
      onFindDeals
    );

    const keyboardHandler = createKeyboardHandler(cityShortcuts);
    const cleanup = setupKeyboardListener(keyboardHandler);

    return cleanup;
  }, [onViewPortfolio, onFindDeals, handlePlayerAction]);

  const closeEventScreen = () => {
    setCurrentEvent(null);
  };

  const { monthName, year } = formatGameDate(currentMonth);

  return (
    <div className="cityScreen">
      {/* City Name */}
      <h2>{currentCity.name}</h2>
      <p className="cityDate">
        {monthName} {year}
      </p>
      <p className="playerStats">
        Profession: {player?.profession} <br /> Bank Balance: $
        {currentBankBalance.toLocaleString()} <br /> Monthly Salary: $
        {player?.salary.toLocaleString()}
      </p>
      <h3>Actions</h3>
      <div className="cityActions">
        <button onClick={() => handlePlayerAction("travel")}>Travel (T)</button>
        <button onClick={() => handlePlayerAction("rest")}>Rest (R)</button>
        <button onClick={onViewPortfolio}>View Portfolio (V)</button>
        <button onClick={onFindDeals}>Find Deals (F)</button>
        <button onClick={onViewAchievements} className="achievement-button">🏆 Achievements (A)</button>
        <button onClick={onSaveLoad} className="save-load-button">Save/Load (F5)</button>
      </div>
      <p className="keyboardHelp">
        Tip: Use keyboard shortcuts: T, R, V, F, A for faster navigation
      </p>
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

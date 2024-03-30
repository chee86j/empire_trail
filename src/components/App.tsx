import React, { useState } from "react";
import GameInfoScreen from "./GameInfoScreen";
import PlayerSelectScreen from "./PlayerSelectScreen";
import CityScreen from "./CityScreen";
import PortfolioScreen from "./PortfolioScreen";
import DealsScreen from "./DealsScreen";
import EventScreen from "./EventScreen";
import { events, investmentProperties } from "../assets/gameData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<string>("gameInfo");
  const [player, setPlayer] = useState<{
    profession: string;
    bankBalance: number;
    salary: number;
  } | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(1);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [currentBankBalance, setCurrentBankBalance] = useState<number>(0); // New state for current bank balance

  const startGame = () => {
    setGameState("playerSelect");
  };

  const selectProfession = (profession: string) => {
    // Logic to determine bank balance and salary based on selected profession
    let bankBalance = 0;
    let salary = 0;
    switch (profession) {
      case "Carpenter":
        bankBalance = 50000;
        salary = 4000;
        break;
      case "Banker":
        bankBalance = 80000;
        salary = 8000;
        break;
      case "Realtor":
        bankBalance = 30000;
        salary = 3000;
        break;
      case "Plumber":
        bankBalance = 70000;
        salary = 6000;
        break;
      case "Electrician":
        bankBalance = 80000;
        salary = 6000;
        break;
      case "Accountant":
        bankBalance = 40000;
        salary = 3000;
        break;
      default:
        break;
    }
    setPlayer({ profession, bankBalance, salary });
    setCurrentBankBalance(bankBalance); // Update current bank balance to persist
    setGameState("city");
  };

  const handlePlayerAction = (action: string) => {
    switch (action) {
      case "travel":
        // Logic for travel action
        break;
      case "rest":
        // Logic for rest action
        // Randomly select an event
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setCurrentEvent(randomEvent);
        break;
      default:
        break;
    }
  };

  const handleViewPortfolio = () => {
    setGameState("portfolio");
  };

  const handleFindDeals = () => {
    setGameState("deals");
  };

  const handlePurchaseProperty = (property) => {
    // Check if the property can be purchased with the current bank balance
    if (
      property.purchaseCost + property.closingCost + property.renovationCost <=
      currentBankBalance
    ) {
      // Calculate the new bank balance after the purchase
      const newBankBalance =
        currentBankBalance -
        property.purchaseCost -
        property.closingCost -
        property.renovationCost;

      // Add purchase month to property object
      const propertyWithPurchaseMonth: InvestmentProperty = {
        ...property,
        purchaseMonth: currentMonth, // Do not change currentMonth
      };

      // Update the bank balance and portfolio
      setCurrentBankBalance(newBankBalance);
      setPortfolio([...portfolio, propertyWithPurchaseMonth]);

      // Do not update currentMonth here
      setGameState("city");
    } else {
      toast.error("Insufficient funds to purchase this property.");
    }
  };

  return (
    <div className="game-container">
      <ToastContainer position="top-left" autoClose={5000} />
      {gameState === "gameInfo" && <GameInfoScreen onStartGame={startGame} />}
      {gameState === "playerSelect" && (
        <PlayerSelectScreen onSelectProfession={selectProfession} />
      )}
      {gameState === "city" && (
        <CityScreen
          player={player}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          onViewPortfolio={handleViewPortfolio}
          portfolio={portfolio}
          onFindDeals={handleFindDeals}
          currentBankBalance={currentBankBalance}
          setCurrentBankBalance={setCurrentBankBalance}
        />
      )}

      {gameState === "portfolio" && (
        <PortfolioScreen
          portfolio={portfolio}
          currentMonth={currentMonth}
          onClose={() => setGameState("city")}
          setPortfolio={setPortfolio}
          currentBankBalance={currentBankBalance}
          setCurrentBankBalance={setCurrentBankBalance}
        />
      )}
      {gameState === "deals" && (
        <DealsScreen
          investmentProperties={investmentProperties}
          currentBankBalance={currentBankBalance}
          onPurchaseProperty={handlePurchaseProperty}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          currentMonth={currentMonth}
          onClose={() => setGameState("city")}
        />
      )}
      {currentEvent && (
        <EventScreen event={currentEvent} onClose={closeEventScreen} />
      )}
    </div>
  );
};

export default App;

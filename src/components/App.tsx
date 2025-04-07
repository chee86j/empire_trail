import React, { useState } from "react";
import GameInfoScreen from "./GameInfoScreen";
import PlayerSelectScreen from "./PlayerSelectScreen";
import CityScreen from "./CityScreen";
import PortfolioScreen from "./PortfolioScreen";
import DealsScreen from "./DealsScreen";
import EventScreen from "./EventScreen";
import { investmentProperties, cities } from "../assets/gameData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Player,
  Event,
  InvestmentProperty,
  GameState,
  Profession,
  City,
} from "../types";

const App: React.FC = () => {
  // State declarations using useState
  const [gameState, setGameState] = useState<GameState>("gameInfo");
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(1);
  const [portfolio, setPortfolio] = useState<InvestmentProperty[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [currentBankBalance, setCurrentBankBalance] = useState<number>(0);
  const [currentCity, setCurrentCity] = useState<City>(cities[0]);

  // Function to start the game
  const startGame = () => setGameState("playerSelect");

  // Function to select profession and initialize player state
  const selectProfession = (profession: Profession) => {
    // Logic to determine bank balance and salary based on selected profession
    const { bankBalance, salary } = getProfessionStats(profession);
    // Set player state and current bank balance
    setPlayer({ profession, bankBalance, salary, location: currentCity });
    setCurrentBankBalance(bankBalance);
    // Update game state
    setGameState("city");
  };

  // Function to get bank balance and salary based on selected profession
  const getProfessionStats = (
    profession: string
  ): { bankBalance: number; salary: number } => {
    switch (profession) {
      // Cases for different professions with associated bank balance and salary
      case "Carpenter":
        return { bankBalance: 50000, salary: 4000 };
      case "Banker":
        return { bankBalance: 80000, salary: 8000 };
      case "Realtor":
        return { bankBalance: 30000, salary: 3000 };
      case "Plumber":
        return { bankBalance: 70000, salary: 6000 };
      case "Electrician":
        return { bankBalance: 80000, salary: 6000 };
      case "Accountant":
        return { bankBalance: 40000, salary: 3000 };
      default:
        // Default case for unknown profession
        return { bankBalance: 0, salary: 0 };
    }
  };

  // Function to close event screen
  const closeEventScreen = (newBankBalance: number) => {
    setCurrentEvent(null);
    setCurrentBankBalance(newBankBalance);
  };

  // Function to handle viewing portfolio
  const handleViewPortfolio = () => setGameState("portfolio");

  // Function to handle finding deals
  const handleFindDeals = () => setGameState("deals");

  // Function to handle property purchase
  const handlePurchaseProperty = (property: InvestmentProperty) => {
    // Calculate total cost of purchasing property
    const totalCost =
      property.purchaseCost + property.closingCost + property.renovationCost;
    // Check if the player has sufficient funds
    if (totalCost <= currentBankBalance) {
      // Calculate new bank balance after purchase
      const newBankBalance = currentBankBalance - totalCost;
      // Add purchase month to property object
      const propertyWithPurchaseMonth = {
        ...property,
        purchaseMonth: currentMonth,
        location: currentCity,
      };
      // Update bank balance and portfolio state
      setCurrentBankBalance(newBankBalance);
      setPortfolio([...portfolio, propertyWithPurchaseMonth]);
      // Update game state
      setGameState("city");
    } else {
      // Display error message if funds are insufficient
      toast.error("Insufficient funds to purchase this property.");
    }
  };

  // Return JSX for the App component
  return (
    <div className="game-container">
      {/* Render ToastContainer for displaying notifications */}
      <ToastContainer position="top-left" autoClose={5000} />
      {/* Conditional rendering based on game state */}
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
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          cities={cities}
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
      {/* Conditional rendering for current event */}
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

export default App;

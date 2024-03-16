import React, { useState } from "react";
import GameInfoScreen from "./GameInfoScreen";
import PlayerSelectScreen from "./PlayerSelectScreen";
import CityScreen from "./CityScreen";
import PortfolioScreen from "./PortfolioScreen";
import DealsScreen from "./DealsScreen";
import EventScreen from "./EventScreen";
import { events } from "../assets/gameData";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<string>("gameInfo");
  const [player, setPlayer] = useState<{
    profession: string;
    bankBalance: number;
    salary: number;
  } | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(1);
  const [portfolio, setPortfolio] = useState<any[]>([]); // Placeholder for portfolio data
  const [currentEvent, setCurrentEvent] = useState<any>(null); // State to manage current event

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
        salary = 5000;
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
        salary = 7000;
        break;
      case "Electrician":
        bankBalance = 80000;
        salary = 8000;
        break;
      case "Accountant":
        bankBalance = 40000;
        salary = 4000;
        break;
      default:
        break;
    }
    setPlayer({ profession, bankBalance, salary });
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

  const closeEventScreen = () => {
    setCurrentEvent(null);
  };

  return (
    <div className="game-container">
      {gameState === "gameInfo" && <GameInfoScreen onStartGame={startGame} />}
      {gameState === "playerSelect" && (
        <PlayerSelectScreen onSelectProfession={selectProfession} />
      )}
      {gameState === "city" && (
        <CityScreen
          player={player}
          currentMonth={currentMonth}
          onPlayerAction={handlePlayerAction}
          onViewPortfolio={handleViewPortfolio}
          onFindDeals={handleFindDeals}
        />
      )}
      {gameState === "portfolio" && (
        <PortfolioScreen
          portfolio={portfolio}
          onClose={() => setGameState("city")}
        />
      )}
      {gameState === "deals" && (
        <DealsScreen onClose={() => setGameState("city")} />
      )}
      {currentEvent && (
        <EventScreen event={currentEvent} onClose={closeEventScreen} />
      )}
    </div>
  );
};

export default App;

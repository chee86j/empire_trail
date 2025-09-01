import React, { useState, useEffect, useRef } from "react";
import GameInfoScreen from "./GameInfoScreen";
import PlayerSelectScreen from "./PlayerSelectScreen";
import CityScreen from "./CityScreen";
import PortfolioScreen from "./PortfolioScreen";
import DealsScreen from "./DealsScreen";
import EventScreen from "./EventScreen";
import SaveLoadModal from "./SaveLoadModal";
import { investmentProperties, cities } from "../assets/gameData";
import { SaveSystem } from "../services/saveSystem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfessionStats } from "../utils/gameUtils";
import { createKeyboardHandler, getGlobalShortcuts, setupKeyboardListener } from "../utils/keyboardUtils";
import {
  Player,
  Event,
  InvestmentProperty,
  GameState,
  Profession,
  City,
  SaveGame,
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
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showSaveLoadModal, setShowSaveLoadModal] = useState<boolean>(false);
  const autoSavePromptShown = useRef<boolean>(false);

  // Load saved game on startup
  useEffect(() => {
    if (!autoSavePromptShown.current) {
      const autoSave = SaveSystem.loadAutoSave();
      if (autoSave && window.confirm('Auto-save found! Would you like to continue your last game?')) {
        loadGameFromSave(autoSave);
      }
      autoSavePromptShown.current = true;
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // Auto-save game state when important changes occur
  useEffect(() => {
    if (player && gameState !== "gameInfo" && gameState !== "playerSelect") {
      SaveSystem.autoSave({
        player,
        currentMonth,
        portfolio,
        currentEvent,
        currentBankBalance,
        currentCity,
        gameState,
      });
    }
  }, [player, currentMonth, portfolio, currentEvent, currentBankBalance, currentCity, gameState]);

  // Function to load game from save data
  const loadGameFromSave = (saveGame: SaveGame) => {
    setPlayer(saveGame.player);
    setCurrentMonth(saveGame.currentMonth);
    setPortfolio(saveGame.portfolio);
    setCurrentEvent(saveGame.currentEvent);
    setCurrentBankBalance(saveGame.currentBankBalance);
    setCurrentCity(saveGame.currentCity);
    setGameState(saveGame.gameState);
    
    toast.success(`Game loaded: ${saveGame.name}`);
  };

  // Global keyboard shortcuts handler
  useEffect(() => {
    const handleEscape = () => {
      if (gameState === "portfolio" || gameState === "deals") {
        setGameState("city");
      } else if (gameState === "city" && player) {
        setGameState("playerSelect");
      } else if (gameState === "playerSelect") {
        setGameState("gameInfo");
      }
    };

    const handleSaveLoad = () => {
      if (player && gameState !== "gameInfo" && gameState !== "playerSelect") {
        setShowSaveLoadModal(true);
      }
    };

    const globalShortcuts = getGlobalShortcuts(
      () => setShowHelp(prev => !prev),
      handleSaveLoad,
      handleEscape
    );

    const keyboardHandler = createKeyboardHandler({}, globalShortcuts);
    const cleanup = setupKeyboardListener(keyboardHandler);

    return cleanup;
  }, [gameState, player]);

  // Function to start the game
  const startGame = () => setGameState("playerSelect");

  // Function to select profession and initialize player state
  const selectProfession = (profession: Profession) => {
    const { bankBalance, salary } = getProfessionStats(profession);
    setPlayer({ profession, bankBalance, salary, location: currentCity });
    setCurrentBankBalance(bankBalance);
    setGameState("city");
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
    const totalCost = property.purchaseCost + property.closingCost + property.renovationCost;
    
    if (totalCost <= currentBankBalance) {
      const newBankBalance = currentBankBalance - totalCost;
      const propertyWithPurchaseMonth = {
        ...property,
        purchaseMonth: currentMonth,
        location: currentCity,
      };
      
      setCurrentBankBalance(newBankBalance);
      setPortfolio([...portfolio, propertyWithPurchaseMonth]);
      setGameState("city");
    } else {
      toast.error("Insufficient funds to purchase this property.");
    }
  };

  // Return JSX for the App component
  return (
    <div className="game-container">
      {/* Render ToastContainer for displaying notifications */}
      <ToastContainer position="top-left" autoClose={5000} />
      
      {/* Help Modal */}
      {showHelp && (
        <div className="help-modal">
          <div className="help-modal-content">
            <h2>Keyboard Shortcuts</h2>
            <div className="help-sections">
              <div className="help-section">
                <h3>City Screen</h3>
                <p><strong>T</strong> - Travel to next city</p>
                <p><strong>R</strong> - Rest (advance month)</p>
                <p><strong>V</strong> - View Portfolio</p>
                <p><strong>F</strong> - Find Deals</p>
              </div>
              <div className="help-section">
                <h3>Deals Screen</h3>
                <p><strong>↑/↓</strong> - Navigate properties</p>
                <p><strong>P</strong> - Purchase selected property</p>
                <p><strong>ESC</strong> - Close deals screen</p>
              </div>
              <div className="help-section">
                <h3>Portfolio Screen</h3>
                <p><strong>↑/↓</strong> - Navigate properties</p>
                <p><strong>R</strong> - Rent selected property</p>
                <p><strong>S</strong> - Sell selected property</p>
                <p><strong>ESC</strong> - Close portfolio</p>
              </div>
              <div className="help-section">
                <h3>Dice Rolling</h3>
                <p><strong>Space/Enter/R</strong> - Roll dice</p>
                <p><strong>ESC</strong> - Close modal</p>
              </div>
              <div className="help-section">
                <h3>Global Shortcuts</h3>
                <p><strong>F1</strong> - Show/hide this help</p>
                <p><strong>F5</strong> - Save/Load Game</p>
                <p><strong>ESC</strong> - Go back/close</p>
              </div>
            </div>
            <button onClick={() => setShowHelp(false)}>Close Help (ESC)</button>
          </div>
        </div>
      )}

      {/* Save/Load Modal */}
      <SaveLoadModal
        isOpen={showSaveLoadModal}
        onClose={() => setShowSaveLoadModal(false)}
        onLoadGame={loadGameFromSave}
        currentGameState={{
          player,
          currentMonth,
          portfolio,
          currentEvent,
          currentBankBalance,
          currentCity,
          gameState,
        }}
      />
      
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
          onSaveLoad={() => setShowSaveLoadModal(true)}
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

import React, { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { events } from "../assets/gameData";
import EventScreen from "./EventScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CityScreen.css";
import {
  createButtonTransition,
  createModalPopVariants,
  createOverlayFadeVariants,
} from "../animations/motionPresets";
import LottieOverlay from "./LottieOverlay";
import { Money, Plane } from "../assets/lottieAnimations";
import {
  calculateTotalRentalIncome,
  chooseRandomEvent,
  formatGameDate,
} from "../utils/gameUtils";
import {
  createKeyboardHandler,
  getCityScreenShortcuts,
  setupKeyboardListener,
} from "../utils/keyboardUtils";
import { getCityImagePath } from "../utils/cityImageUtils";
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
}) => {
  const [currentCityIndex, setCurrentCityIndex] = useState(
    cities.findIndex((city) => city.name === currentCity.name)
  );
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [travelLottieOpen, setTravelLottieOpen] = useState(false);
  const [moneyLottieOpen, setMoneyLottieOpen] = useState(false);
  const lastActionRef = useRef<PlayerAction | null>(null);
  const reduceMotion = useReducedMotion();
  const buttonTransition = createButtonTransition(reduceMotion);
  const eventOverlayVariants = createOverlayFadeVariants(reduceMotion);
  const eventModalVariants = createModalPopVariants(reduceMotion);

  const handleMonthAdvance = useCallback(() => {
    const initialBankBalance = currentBankBalance;
    setCurrentMonth(currentMonth + 1);

    const salary = player?.salary || 0;
    const totalRentalIncome = calculateTotalRentalIncome(portfolio);
    const chosenEvent = chooseRandomEvent(events, player?.profession);
    const eventImpact = chosenEvent ? chosenEvent.bankBalanceChange : 0;
    const monthDelta = salary + totalRentalIncome + eventImpact;

    const newBankBalance =
      initialBankBalance + salary + totalRentalIncome + eventImpact;
    setCurrentBankBalance(newBankBalance);

    toast.info(
      `New Balance: $${newBankBalance.toLocaleString()} = $${initialBankBalance.toLocaleString()} + Salary: $${salary.toLocaleString()} + Rent: $${totalRentalIncome.toLocaleString()} + Event: $${eventImpact.toLocaleString()}`
    );

    if (chosenEvent) {
      setCurrentEvent(chosenEvent);
    }

    if (lastActionRef.current === "rest" && monthDelta > 0) {
      setMoneyLottieOpen(true);
    }
  }, [
    currentBankBalance,
    currentMonth,
    portfolio,
    player?.salary,
    player?.profession,
    setCurrentMonth,
    setCurrentBankBalance,
  ]);

  const handleTravel = useCallback(() => {
    const newIndex = (currentCityIndex + 1) % cities.length;
    setCurrentCityIndex(newIndex);
    setCurrentCity(cities[newIndex]);
    toast.success(`Traveling to ${cities[newIndex].name}`);
  }, [currentCityIndex, cities, setCurrentCity]);

  const handlePlayerAction = useCallback(
    (action: PlayerAction) => {
      lastActionRef.current = action;

      switch (action) {
        case "rest":
        case "travel": {
          handleMonthAdvance();

          if (action === "travel") {
            setTravelLottieOpen(true);
            handleTravel();
          }
          break;
        }
        default:
          break;
      }
    },
    [handleMonthAdvance, handleTravel]
  );

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
  }, [handlePlayerAction, onViewPortfolio, onFindDeals]);

  const closeEventScreen = () => {
    setCurrentEvent(null);
  };

  const { monthName, year } = formatGameDate(currentMonth);

  return (
    <div
      className="cityScreen"
      style={{
        backgroundImage: `url(${getCityImagePath(currentCity.name)})`,
      }}
    >
      {/* City Name */}
      <h2>{currentCity.name}</h2>
      <p className="cityDate">
        {monthName} {year}
      </p>

      <LottieOverlay
        isOpen={travelLottieOpen}
        animationData={Plane}
        onClose={() => setTravelLottieOpen(false)}
        sizePx={260}
      />
      <LottieOverlay
        isOpen={moneyLottieOpen}
        animationData={Money}
        onClose={() => setMoneyLottieOpen(false)}
        sizePx={260}
      />
      <p className="playerStats">
        Profession: {player?.profession} <br /> Bank Balance: $
        {currentBankBalance.toLocaleString()} <br /> Monthly Salary: $
        {player?.salary.toLocaleString()}
      </p>
      <h3>Actions</h3>
      <div className="cityActions">
        <motion.button
          onClick={() => handlePlayerAction("travel")}
          className="btn btn-primary"
          aria-label="Travel to next city"
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={buttonTransition}
        >
          Travel (T)
        </motion.button>
        <motion.button
          onClick={() => handlePlayerAction("rest")}
          className="btn btn-primary"
          aria-label="Rest and advance to next month"
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={buttonTransition}
        >
          Rest (R)
        </motion.button>
        <motion.button
          onClick={onViewPortfolio}
          className="btn btn-primary"
          aria-label="View your property portfolio"
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={buttonTransition}
        >
          View Portfolio (V)
        </motion.button>
        <motion.button
          onClick={onFindDeals}
          className="btn btn-primary"
          aria-label="Find investment deals"
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={buttonTransition}
        >
          Find Deals (F)
        </motion.button>
        <motion.button
          onClick={onSaveLoad}
          className="btn btn-special"
          aria-label="Save or load game"
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={buttonTransition}
        >
          Save/Load (F5)
        </motion.button>
      </div>
      <p className="keyboard-help">
        Tip: Use keyboard shortcuts: T, R, V, F for faster navigation
      </p>
      <AnimatePresence>
        {currentEvent && (
          <motion.div
            key="city-event"
            variants={eventOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              variants={eventModalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EventScreen
                event={currentEvent}
                onClose={closeEventScreen}
                playerBankBalance={currentBankBalance}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CityScreen;

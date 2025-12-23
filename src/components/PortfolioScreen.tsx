import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import DiceRollModal from "./DiceRollModal";
import PropertySearchFilter from "./PropertySearchFilter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/PortfolioScreen.css";
import { InvestmentProperty } from "../types";
import LottieOverlay from "./LottieOverlay";
import { DiceRoll, Success, SuccessTick } from "../assets/lottieAnimations";
import {
  DICE_ROLL_SUCCESS_VALUES,
  DICE_ROLL_FAILURE_VALUES,
  MAX_DICE_ROLLS,
} from "../constants/gameConstants";
import { isPropertyReadyForAction } from "../utils/gameUtils";
import { logger } from "../services/logger";
import {
  createButtonTransition,
  createListItemVariants,
  createModalPopVariants,
  createOverlayFadeVariants,
} from "../animations/motionPresets";

interface Props {
  portfolio: InvestmentProperty[];
  currentBankBalance: number;
  currentMonth: number;
  onClose: () => void;
  setPortfolio: (portfolio: InvestmentProperty[]) => void;
  setCurrentBankBalance: React.Dispatch<React.SetStateAction<number>>;
}

const PortfolioScreen: React.FC<Props> = ({
  portfolio,
  currentBankBalance,
  currentMonth,
  onClose,
  setPortfolio,
  setCurrentBankBalance,
}) => {
  const [selectedProperty, setSelectedProperty] =
    useState<InvestmentProperty | null>(null);
  const [action, setAction] = useState<"Rent" | "Sale">("Rent");
  const [showDiceModal, setShowDiceModal] = useState<boolean>(false);
  const [rollCount, setRollCount] = useState(0);
  const [lastRoll, setLastRoll] = useState<number>(0);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [filteredPortfolio, setFilteredPortfolio] =
    useState<InvestmentProperty[]>(portfolio);
  const [showSearchFilter, setShowSearchFilter] = useState<boolean>(false);
  const reduceMotion = useReducedMotion();
  const buttonTransition = createButtonTransition(reduceMotion);
  const rowVariants = createListItemVariants(reduceMotion);
  const diceOverlayVariants = createOverlayFadeVariants(reduceMotion);
  const diceModalVariants = createModalPopVariants(reduceMotion);
  const [activeLottie, setActiveLottie] = useState<
    "dice" | "rent" | "sale" | null
  >(null);
  const [lottieQueue, setLottieQueue] = useState<Array<"dice" | "rent" | "sale">>(
    []
  );

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle key presses when not typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          setSelectedRowIndex((prev) =>
            prev > 0 ? prev - 1 : filteredPortfolio.length - 1
          );
          break;
        case "ArrowDown":
          event.preventDefault();
          setSelectedRowIndex((prev) =>
            prev < filteredPortfolio.length - 1 ? prev + 1 : 0
          );
          break;
        case "r":
        case "R":
          event.preventDefault();
          if (
            filteredPortfolio[selectedRowIndex] &&
            isPropertyReadyForAction(
              filteredPortfolio[selectedRowIndex],
              currentMonth
            )
          ) {
            handleActionClick(filteredPortfolio[selectedRowIndex], "Rent");
          }
          break;
        case "s":
        case "S":
          event.preventDefault();
          if (
            filteredPortfolio[selectedRowIndex] &&
            isPropertyReadyForAction(
              filteredPortfolio[selectedRowIndex],
              currentMonth
            )
          ) {
            handleActionClick(filteredPortfolio[selectedRowIndex], "Sale");
          }
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedRowIndex, filteredPortfolio, onClose, currentMonth]);

  const handlePropertyRent = useCallback(
    (property: InvestmentProperty) => {
      // Mark the property as rented
      const updatedProperty = { ...property, isRented: true };
      const updatedPortfolio = portfolio.map((p) =>
        p.id === property.id ? updatedProperty : p
      );
      setPortfolio(updatedPortfolio);
    },
    [portfolio, setPortfolio]
  );

  const handlePropertySale = useCallback(
    (property: InvestmentProperty) => {
      const updatedPortfolio = portfolio.filter((p) => p.id !== property.id);
      setPortfolio(updatedPortfolio);
      setCurrentBankBalance((prev) => prev + property.arvSalePrice);

      logger.gameAction(
        `Property sold: ${property.name}`,
        `for $${property.arvSalePrice.toLocaleString()}`
      );
    },
    [portfolio, setPortfolio, setCurrentBankBalance]
  );

  useEffect(() => {
    if (DICE_ROLL_FAILURE_VALUES.includes(lastRoll)) {
      toast.error("Roll Again!");
      // If it's an unsuccessful roll, just log and do nothing else
    } else if (
      DICE_ROLL_SUCCESS_VALUES.includes(lastRoll) &&
      selectedProperty
    ) {
      setLottieQueue((prev) => [
        ...prev,
        "dice",
        action === "Sale" ? "sale" : "rent",
      ]);

      // Successful roll
      if (action === "Sale") {
        const salePrice = selectedProperty.arvSalePrice;
        const newBankBalance = currentBankBalance + salePrice;
        toast.success(
          `${selectedProperty.name} sold for $${salePrice.toLocaleString()}. New bank balance: $${newBankBalance.toLocaleString()}.`
        );
        handlePropertySale(selectedProperty);
      } else if (action === "Rent") {
        toast.success(`${selectedProperty.name} rented out!`);
        handlePropertyRent(selectedProperty);
      }

      // Prevent duplicate runs of this effect (and duplicate toasts) by clearing
      // the selected property once the action resolves.
      setSelectedProperty(null);
      setShowDiceModal(false);
      setLastRoll(0);
      setRollCount(0);
    } else if (rollCount === MAX_DICE_ROLLS) {
      // Reached maximum rolls without success, just close the modal
      toast.info("Maximum rolls reached");
      setShowDiceModal(false);
    }
  }, [
    rollCount,
    lastRoll,
    selectedProperty,
    action,
    handlePropertyRent,
    handlePropertySale,
    currentBankBalance,
  ]);

  useEffect(() => {
    if (activeLottie) return;
    if (lottieQueue.length === 0) return;

    const [next, ...rest] = lottieQueue;
    setActiveLottie(next);
    setLottieQueue(rest);
  }, [activeLottie, lottieQueue]);

  const handleActionClick = (
    property: InvestmentProperty,
    selectedAction: "Rent" | "Sale"
  ) => {
    setSelectedProperty(property);
    setAction(selectedAction);
    setShowDiceModal(true);
    setRollCount(0);
    setLastRoll(0);
  };

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index);
  };

  const handleDiceRoll = (rollValue: number) => {
    setLastRoll(rollValue);
    setRollCount((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setShowDiceModal(false);
  };

  const handleFilteredPropertiesChange = useCallback(
    (properties: InvestmentProperty[]) => {
      setFilteredPortfolio(properties);
      setSelectedRowIndex(0); // Reset selection when filtered results change
    },
    []
  );

  // Update filtered portfolio when portfolio changes (only if search filter is not active)
  useEffect(() => {
    if (!showSearchFilter) {
      setFilteredPortfolio(portfolio);
    }
  }, [portfolio, showSearchFilter]);

  // Initialize filtered portfolio when search filter is first shown
  useEffect(() => {
    if (showSearchFilter) {
      setFilteredPortfolio(portfolio);
    }
  }, [showSearchFilter, portfolio]);

  return (
    <div className="screen">
      <LottieOverlay
        isOpen={activeLottie === "dice"}
        animationData={DiceRoll}
        onClose={() => setActiveLottie(null)}
        sizePx={260}
      />
      <LottieOverlay
        isOpen={activeLottie === "rent"}
        animationData={Success}
        onClose={() => setActiveLottie(null)}
        sizePx={280}
      />
      <LottieOverlay
        isOpen={activeLottie === "sale"}
        animationData={SuccessTick}
        onClose={() => setActiveLottie(null)}
        sizePx={280}
      />
      <h2>Portfolio</h2>

      <div className="portfolio-controls">
        <motion.button
          onClick={() => setShowSearchFilter(!showSearchFilter)}
          className={`btn ${showSearchFilter ? "btn-primary" : "btn-outline"}`}
          aria-label={
            showSearchFilter
              ? "Hide search and filters"
              : "Show search and filters"
          }
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={buttonTransition}
        >
          {showSearchFilter ? "Hide Search" : "Search & Filter"}
        </motion.button>
        <p className="keyboard-help">
          Tip: Use ↑↓ arrow keys to navigate, R to rent, S to sell, ESC to close
        </p>
      </div>

      {showSearchFilter && (
        <PropertySearchFilter
          properties={portfolio}
          onFilteredPropertiesChange={handleFilteredPropertiesChange}
          showRentalStatusFilter={true}
          showReadyForActionFilter={true}
          currentMonth={currentMonth}
        />
      )}

      {/* Debug Information */}
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        <strong>Debug Info:</strong>
        <br />
        Total Properties: {portfolio.length}
        <br />
        Filtered Properties: {filteredPortfolio.length}
        <br />
        Search Filter Active: {showSearchFilter ? "Yes" : "No"}
        <br />
        Rented Properties: {portfolio.filter((p) => p.isRented).length}
        <br />
        Expected Monthly Income: $
        {portfolio
          .filter((p) => p.isRented)
          .reduce((total, p) => total + p.arvRentalIncome, 0)
          .toLocaleString()}
        <br />
        Properties Ready for Action:{" "}
        {
          portfolio.filter((p) => isPropertyReadyForAction(p, currentMonth))
            .length
        }
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Purchase Date</th>
              <th>Purchase Cost</th>
              <th>Closing Cost</th>
              <th>Renovation Cost</th>
              <th>Rehab Time</th>
              <th>ARV Rental Income</th>
              <th>Monthly Expenses</th>
              <th>ARV Sale Price</th>
              <th>Rental Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredPortfolio.map((property, index) => (
                <motion.tr
                  key={property.id}
                  className={index === selectedRowIndex ? "selected-row" : ""}
                  onClick={() => handleRowClick(index)}
                  variants={rowVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  layout
                >
                  <td>{property.name}</td>
                  <td>{property.purchaseMonth || "N/A"}</td>
                  <td>${property.purchaseCost.toLocaleString()}</td>
                  <td>${property.closingCost.toLocaleString()}</td>
                  <td>${property.renovationCost.toLocaleString()}</td>
                  <td>{property.renovationTime} months</td>
                  <td>${property.arvRentalIncome.toLocaleString()}</td>
                  <td>${property.monthlyExpenses.toLocaleString()}</td>
                  <td>${property.arvSalePrice.toLocaleString()}</td>
                  <td>{property.isRented ? "Rented" : "Vacant"}</td>
                  <td>
                    <div className="button-container">
                      {isPropertyReadyForAction(property, currentMonth) &&
                        !property.isRented && (
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleActionClick(property, "Rent");
                            }}
                            className={`btn btn-primary ${
                              index === selectedRowIndex
                                ? "selected-button"
                                : ""
                            }`}
                            aria-label={`Rent out ${property.name}`}
                            whileHover={
                              reduceMotion ? undefined : { scale: 1.02 }
                            }
                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                            transition={buttonTransition}
                          >
                            Rent (R)
                          </motion.button>
                        )}
                      {isPropertyReadyForAction(property, currentMonth) && (
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(property, "Sale");
                          }}
                          className={`btn btn-danger ${
                            index === selectedRowIndex
                              ? "selected-button"
                              : ""
                          }`}
                          aria-label={`Sell ${
                            property.name
                          } for $${property.arvSalePrice.toLocaleString()}`}
                          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                          transition={buttonTransition}
                        >
                          Sale (S)
                        </motion.button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <motion.button
        onClick={onClose}
        className="btn btn-secondary"
        aria-label="Close portfolio screen"
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={buttonTransition}
      >
        Close (ESC)
      </motion.button>
      <AnimatePresence>
        {showDiceModal && selectedProperty && (
          <motion.div
            key="dice-modal"
            variants={diceOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              variants={diceModalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <DiceRollModal
                onClose={handleCloseModal}
                action={action}
                onRoll={handleDiceRoll}
                maxRolls={3}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioScreen;

import React, { useState, useEffect, useCallback } from "react";
import DiceRollModal from "./DiceRollModal";
import PropertySearchFilter from "./PropertySearchFilter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/PortfolioScreen.css";
import { InvestmentProperty } from "../types";
import {
  DICE_ROLL_SUCCESS_VALUES,
  DICE_ROLL_FAILURE_VALUES,
  MAX_DICE_ROLLS,
} from "../constants/gameConstants";
import { isPropertyReadyForAction } from "../utils/gameUtils";
import { logger } from "../services/logger";

interface Props {
  portfolio: InvestmentProperty[];
  currentBankBalance: number;
  currentMonth: number;
  onClose: () => void;
  setPortfolio: (portfolio: InvestmentProperty[]) => void;
  setCurrentBankBalance: (balance: number) => void;
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

      // No immediate bank balance change on renting
      toast.success(`${property.name} has been successfully rented out!`);
    },
    [portfolio, setPortfolio]
  );

  const handlePropertySale = useCallback(
    (property: InvestmentProperty) => {
      const updatedPortfolio = portfolio.filter((p) => p.id !== property.id);
      setPortfolio(updatedPortfolio);

      const newBankBalance = currentBankBalance + property.arvSalePrice;
      setCurrentBankBalance(newBankBalance);

      logger.gameAction(
        `Property sold: ${property.name}`,
        `for $${property.arvSalePrice.toLocaleString()}`
      );
      toast.success(
        `${
          property.name
        } was sold for $${property.arvSalePrice.toLocaleString()}!`
      );
      toast.success(`New bank balance: $${newBankBalance.toLocaleString()}`);
    },
    [portfolio, setPortfolio, currentBankBalance, setCurrentBankBalance]
  );

  useEffect(() => {
    if (DICE_ROLL_FAILURE_VALUES.includes(lastRoll)) {
      toast.error("Roll Again!");
      // If it's an unsuccessful roll, just log and do nothing else
    } else if (
      DICE_ROLL_SUCCESS_VALUES.includes(lastRoll) &&
      selectedProperty
    ) {
      // Successful roll
      if (action === "Sale") {
        toast.success("Property Sold Successfully!");
        handlePropertySale(selectedProperty);
        setShowDiceModal(false);
      } else if (action === "Rent") {
        toast.success("Property Rented Successfully!");
        handlePropertyRent(selectedProperty);
        setShowDiceModal(false);
      }
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
  ]);

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
      <h2>Portfolio</h2>

      <div className="portfolio-controls">
        <button
          onClick={() => setShowSearchFilter(!showSearchFilter)}
          className={`btn ${showSearchFilter ? "btn-primary" : "btn-outline"}`}
          aria-label={
            showSearchFilter
              ? "Hide search and filters"
              : "Show search and filters"
          }
        >
          {showSearchFilter ? "Hide Search" : "Search & Filter"}
        </button>
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
            {filteredPortfolio.map((property, index) => (
              <tr
                key={index}
                className={index === selectedRowIndex ? "selected-row" : ""}
                onClick={() => handleRowClick(index)}
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(property, "Rent");
                          }}
                          className={`btn btn-primary ${
                            index === selectedRowIndex ? "selected-button" : ""
                          }`}
                          aria-label={`Rent out ${property.name}`}
                        >
                          Rent (R)
                        </button>
                      )}
                    {isPropertyReadyForAction(property, currentMonth) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(property, "Sale");
                        }}
                        className={`btn btn-danger ${
                          index === selectedRowIndex ? "selected-button" : ""
                        }`}
                        aria-label={`Sell ${
                          property.name
                        } for $${property.arvSalePrice.toLocaleString()}`}
                      >
                        Sale (S)
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={onClose}
        className="btn btn-secondary"
        aria-label="Close portfolio screen"
      >
        Close (ESC)
      </button>
      {showDiceModal && selectedProperty && (
        <DiceRollModal
          onClose={handleCloseModal}
          action={action}
          onRoll={handleDiceRoll}
          maxRolls={3}
        />
      )}
    </div>
  );
};

export default PortfolioScreen;

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "../styles/DealsScreen.css";
import { InvestmentProperty } from "../types";
import PropertySearchFilter from "./PropertySearchFilter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createButtonTransition,
  createListItemVariants,
} from "../animations/motionPresets";

interface Props {
  investmentProperties: InvestmentProperty[];
  currentBankBalance: number;
  onPurchaseProperty: (property: InvestmentProperty) => void;
  onClose: () => void;
}

const DealsScreen: React.FC<Props> = ({
  investmentProperties,
  currentBankBalance,
  onPurchaseProperty,
  onClose,
}) => {
  const [filteredProperties, setFilteredProperties] = useState<
    InvestmentProperty[]
  >([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [showAllProperties, setShowAllProperties] = useState<boolean>(false);
  const reduceMotion = useReducedMotion();
  const buttonTransition = createButtonTransition(reduceMotion);
  const rowVariants = createListItemVariants(reduceMotion);

  const handlePurchase = useCallback(
    (property: InvestmentProperty) => {
      const totalCost =
        property.purchaseCost + property.closingCost + property.renovationCost;
      if (totalCost <= currentBankBalance) {
        onPurchaseProperty(property);
        onClose();
      } else {
        // Show helpful error message with cost breakdown using toast
        const shortfall = totalCost - currentBankBalance;
        toast.error(
          `Insufficient funds to purchase ${
            property.name
          }! You need $${shortfall.toLocaleString()} more.`,
          {
            autoClose: 8000,
            style: {
              background: "#dc3545",
              color: "white",
              fontSize: "14px",
              maxWidth: "400px",
            },
          }
        );

        // Show detailed breakdown in a second toast
        setTimeout(() => {
          toast.info(
            `Cost Breakdown for ${property.name}:\n` +
              `• Purchase: $${property.purchaseCost.toLocaleString()}\n` +
              `• Closing: $${property.closingCost.toLocaleString()}\n` +
              `• Renovation: $${property.renovationCost.toLocaleString()}\n` +
              `• Total: $${totalCost.toLocaleString()}\n` +
              `• Your Balance: $${currentBankBalance.toLocaleString()}\n` +
              `• Shortfall: $${shortfall.toLocaleString()}`,
            {
              autoClose: 10000,
              style: {
                background: "#17a2b8",
                color: "white",
                fontSize: "12px",
                maxWidth: "350px",
                whiteSpace: "pre-line",
              },
            }
          );
        }, 1000);
      }
    },
    [currentBankBalance, onPurchaseProperty, onClose]
  );

  useEffect(() => {
    if (!showAllProperties) {
      const generateRandomProperties = () => {
        const randomProps = investmentProperties
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);
        setFilteredProperties(randomProps);
        setSelectedRowIndex(0); // Reset selection when properties change
      };

      generateRandomProperties();
    }
  }, [investmentProperties, showAllProperties]);

  // Keyboard navigation handler
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
            prev > 0 ? prev - 1 : filteredProperties.length - 1
          );
          break;
        case "ArrowDown":
          event.preventDefault();
          setSelectedRowIndex((prev) =>
            prev < filteredProperties.length - 1 ? prev + 1 : 0
          );
          break;
        case "p":
        case "P":
          event.preventDefault();
          if (filteredProperties[selectedRowIndex]) {
            handlePurchase(filteredProperties[selectedRowIndex]);
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
  }, [selectedRowIndex, filteredProperties, onClose, handlePurchase]);

  const calculateROI = (property: InvestmentProperty): string => {
    const totalInvestment =
      property.purchaseCost + property.closingCost + property.renovationCost;
    const netProfit = property.arvSalePrice - totalInvestment;
    const roiPercentage = (netProfit / totalInvestment) * 100;
    return roiPercentage.toFixed(2) + "%";
  };

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index);
  };

  const handleFilteredPropertiesChange = (properties: InvestmentProperty[]) => {
    setFilteredProperties(properties);
    setSelectedRowIndex(0); // Reset selection when filtered results change
  };

  const toggleShowAllProperties = () => {
    setShowAllProperties(!showAllProperties);
    setSelectedRowIndex(0);
  };

  return (
    <div className="deals-screen">
      <p>Bank Balance: ${currentBankBalance.toLocaleString()}</p>
      <h2>Available Investment Properties</h2>

      <div className="deals-controls">
        <motion.button
          onClick={toggleShowAllProperties}
          className={`btn ${showAllProperties ? "btn-primary" : "btn-outline"}`}
          aria-label={
            showAllProperties
              ? "Show random properties"
              : "Show all properties with search"
          }
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={buttonTransition}
        >
          {showAllProperties ? "Show Random 5" : "Search All Properties"}
        </motion.button>
        <p className="keyboard-help">
          Tip: Use ↑↓ arrow keys to navigate, P to purchase, ESC to close
        </p>
      </div>

      {showAllProperties && (
        <PropertySearchFilter
          properties={investmentProperties}
          onFilteredPropertiesChange={handleFilteredPropertiesChange}
        />
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Purchase Cost</th>
              <th>Closing Cost</th>
              <th>Renovation Cost</th>
              <th>Reno Time</th>
              <th>ARV Rental Income</th>
              <th>Monthly Expenses</th>
              <th>ARV Sale Price</th>
              <th>ROI (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProperties.map((property, index) => (
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
                  <td>${property.purchaseCost.toLocaleString()}</td>
                  <td>${property.closingCost.toLocaleString()}</td>
                  <td>${property.renovationCost.toLocaleString()}</td>
                  <td>{property.renovationTime} mo</td>
                  <td>${property.arvRentalIncome.toLocaleString()}</td>
                  <td>${property.monthlyExpenses.toLocaleString()}</td>
                  <td>${property.arvSalePrice.toLocaleString()}</td>
                  <td>{calculateROI(property)}</td>
                  <td>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase(property);
                      }}
                      className={`btn btn-success ${
                        index === selectedRowIndex ? "selected-button" : ""
                      }`}
                      aria-label={`Purchase ${property.name} for $${(
                        property.purchaseCost +
                        property.closingCost +
                        property.renovationCost
                      ).toLocaleString()}`}
                      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      transition={buttonTransition}
                    >
                      Purchase (P)
                    </motion.button>
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
        aria-label="Close deals screen"
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={buttonTransition}
      >
        Close (ESC)
      </motion.button>
    </div>
  );
};

export default DealsScreen;

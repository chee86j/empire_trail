import React, { useState, useEffect } from "react";
import DiceRollModal from "./DiceRollModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/PortfolioScreen.css";
import { InvestmentProperty } from "../types";

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

  const handlePropertyRent = (property: InvestmentProperty) => {
    // Mark the property as rented
    const updatedProperty = { ...property, isRented: true };
    const updatedPortfolio = portfolio.map((p) =>
      p.id === property.id ? updatedProperty : p
    );
    setPortfolio(updatedPortfolio);

    // No immediate bank balance change on renting
    toast.success(`${property.name} has been successfully rented out!`);
  };

  const handlePropertySale = (property: InvestmentProperty) => {
    const updatedPortfolio = portfolio.filter((p) => p.id !== property.id);
    setPortfolio(updatedPortfolio);

    const newBankBalance = currentBankBalance + property.arvSalePrice;
    setCurrentBankBalance(newBankBalance);

    console.log(
      `${
        property.name
      } was sold for $${property.arvSalePrice.toLocaleString()}!`
    );
    toast.success(
      `${
        property.name
      } was sold for $${property.arvSalePrice.toLocaleString()}!`
    );
    toast.success(`New bank balance: $${newBankBalance.toLocaleString()}`);
    console.log(`New bank balance: $${newBankBalance.toLocaleString()}`);
  };

  useEffect(() => {
    if ([1, 2, 4, 6, 8, 10, 12].includes(lastRoll)) {
      toast.error("Roll Again!");
      console.log("Roll Again!");
      // If it's an unsuccessful roll, just log and do nothing else
    } else if ([3, 5, 7, 9, 11].includes(lastRoll) && selectedProperty) {
      // Successful roll
      if (action === "Sale") {
        toast.success("Property Sold Successfully!");
        console.log("Property Sold Successfully!");
        handlePropertySale(selectedProperty);
        setShowDiceModal(false);
      } else if (action === "Rent") {
        toast.success("Property Rented Successfully!");
        console.log("Property Rented Successfully!");
        handlePropertyRent(selectedProperty);
        setShowDiceModal(false);
      }
    } else if (rollCount === 3) {
      // Reached maximum rolls without success, just close the modal
      toast.info("Maximum rolls reached");
      console.log("Maximum Rolls Reached");
      setShowDiceModal(false);
    }
  }, [rollCount, lastRoll, selectedProperty, action]);

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

  const handleDiceRoll = (rollValue: number) => {
    setLastRoll(rollValue);
    setRollCount((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setShowDiceModal(false);
  };

  // Helper function to check if a property is ready for action
  const isPropertyReady = (property: InvestmentProperty): boolean => {
    return (
      typeof property.purchaseMonth === "number" &&
      currentMonth >= property.purchaseMonth + property.renovationTime
    );
  };

  return (
    <div className="screen">
      <h2>Portfolio</h2>
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
            {portfolio.map((property, index) => (
              <tr key={index}>
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
                    {isPropertyReady(property) && !property.isRented && (
                      <button
                        onClick={() => handleActionClick(property, "Rent")}
                      >
                        Rent
                      </button>
                    )}
                    {isPropertyReady(property) && (
                      <button
                        onClick={() => handleActionClick(property, "Sale")}
                      >
                        Sale
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onClose}>Close</button>
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

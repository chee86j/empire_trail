import React, { useState, useEffect } from "react";
import DiceRollModal from "./DiceRollModal";
import "../styles/PortfolioScreen.css";
import { InvestmentProperty } from "../assets/gameData";

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

  const handlePropertySale = (property: InvestmentProperty) => {
    const updatedPortfolio = portfolio.filter((p) => p.id !== property.id);
    setPortfolio(updatedPortfolio);

    const newBankBalance = currentBankBalance + property.arvSalePrice;
    setCurrentBankBalance(newBankBalance);

    console.log(`${property.name} was sold for ${property.arvSalePrice}!`);
  };

  useEffect(() => {
    if ([1, 2, 3, 4, 6, 8, 10, 12].includes(lastRoll)) {
      console.log("Try again");
      // If it's an unsuccessful roll, just log and do nothing else
    } else if ([5, 7, 9, 11].includes(lastRoll) && selectedProperty) {
      // Successful roll, handle property sale
      handlePropertySale(selectedProperty);
      setShowDiceModal(false);
    } else if (rollCount === 3) {
      // Reached maximum rolls without success, just close the modal
      setShowDiceModal(false);
    }
  }, [rollCount, lastRoll, selectedProperty]);

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

  return (
    <div className="screen">
      <h2>Portfolio</h2>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((property, index) => (
            <tr key={index}>
              <td>{property.name}</td>
              <td>{property.purchaseMonth}</td>
              <td>${property.purchaseCost.toLocaleString()}</td>
              <td>${property.closingCost.toLocaleString()}</td>
              <td>${property.renovationCost.toLocaleString()}</td>
              <td>{property.renovationTime} months</td>
              <td>${property.arvRentalIncome.toLocaleString()}</td>
              <td>${property.monthlyExpenses.toLocaleString()}</td>
              <td>${property.arvSalePrice.toLocaleString()}</td>
              <td>
                <div className="button-container">
                  {currentMonth >=
                    property.purchaseMonth + property.renovationTime && (
                    <button onClick={() => handleActionClick(property, "Rent")}>
                      Rent
                    </button>
                  )}
                  {currentMonth >=
                    property.purchaseMonth + property.renovationTime && (
                    <button onClick={() => handleActionClick(property, "Sale")}>
                      Sale
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
      {selectedProperty && (
        <DiceRollModal
          onClose={handleCloseModal}
          action={action}
          onRoll={handleDiceRoll}
          isOpen={showDiceModal}
          maxRolls={3}
        />
      )}
    </div>
  );
};

export default PortfolioScreen;

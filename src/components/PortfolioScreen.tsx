import React, { useState } from "react";
import DiceRollModal from "./DiceRollModal";
import "../styles//PortfolioScreen.css";
import { InvestmentProperty } from "../assets/gameData";

interface Props {
  portfolio: InvestmentProperty[];
  currentMonth: number;
  onClose: () => void;
}

const PortfolioScreen: React.FC<Props> = ({
  portfolio,
  currentMonth,
  onClose,
}) => {
  const [selectedProperty, setSelectedProperty] =
    useState<InvestmentProperty | null>(null);
  const [action, setAction] = useState<"Rent" | "Sale">("Rent");

  const handleActionClick = (
    property: InvestmentProperty,
    selectedAction: "Rent" | "Sale"
  ) => {
    setSelectedProperty(property);
    setAction(selectedAction);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
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
                  {/* Enable the "Rent" button if enough time has passed since purchase */}
                  {currentMonth >=
                    property.purchaseMonth + property.renovationTime && (
                    <button onClick={() => handleActionClick(property, "Rent")}>
                      Rent
                    </button>
                  )}

                  {/* Enable the "Sale" button if enough time has passed since purchase */}
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
        <DiceRollModal onClose={handleCloseModal} action={action} />
      )}
    </div>
  );
};

export default PortfolioScreen;

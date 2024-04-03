import React, { useState, useEffect } from "react";
import { InvestmentProperty } from "../assets/gameData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/DealsScreen.css";

interface Props {
  investmentProperties: InvestmentProperty[];
  currentBankBalance: number;
  onPurchaseProperty: (property: InvestmentProperty) => void;
  onClose: () => void;
  player: {
    bankBalance: number;
  };
}

const DealsScreen: React.FC<Props> = ({
  investmentProperties,
  currentBankBalance,
  onPurchaseProperty,
  onClose,
}) => {
  const [randomProperties, setRandomProperties] = useState<
    InvestmentProperty[]
  >([]);

  useEffect(() => {
    const generateRandomProperties = () => {
      const randomProps = investmentProperties
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      setRandomProperties(randomProps);
    };

    generateRandomProperties();

    return () => {
      // Cleanup logic if needed
    };
  }, [investmentProperties]);

  const handlePurchase = (property: InvestmentProperty) => {
    if (property.purchaseCost <= currentBankBalance) {
      onPurchaseProperty(property);
      onClose();
    } else {
      toast.error("Insufficient funds to purchase this property.");
    }
  };

  const calculateROI = (property: InvestmentProperty): string => {
    const totalInvestment =
      property.purchaseCost + property.closingCost + property.renovationCost;
    const netProfit = property.arvSalePrice - totalInvestment;
    const roiPercentage = (netProfit / totalInvestment) * 100;
    return roiPercentage.toFixed(2) + "%";
  };

  return (
    <div className="deals-screen">
      <p>Bank Balance: ${currentBankBalance.toLocaleString()}</p>
      <h2>Available Investment Properties</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purchase Cost</th>
            <th>Closing Cost</th>
            <th>Renovation Cost</th>
            <th>Renovation Time</th>
            <th>ARV Rental Income</th>
            <th>Monthly Expenses</th>
            <th>ARV Sale Price</th>
            <th>ROI (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {randomProperties.map((property) => (
            <tr key={property.id}>
              <td>{property.name}</td>
              <td>${property.purchaseCost.toLocaleString()}</td>
              <td>${property.closingCost.toLocaleString()}</td>
              <td>${property.renovationCost.toLocaleString()}</td>
              <td>{property.renovationTime} months</td>
              <td>${property.arvRentalIncome.toLocaleString()}</td>
              <td>${property.monthlyExpenses.toLocaleString()}</td>
              <td>${property.arvSalePrice.toLocaleString()}</td>
              <td>{calculateROI(property)}</td>
              <td>
                <button onClick={() => handlePurchase(property)}>
                  Purchase
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DealsScreen;

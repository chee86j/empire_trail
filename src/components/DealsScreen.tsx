import React from "react";
import { InvestmentProperty } from "../assets/gameData";
import "../styles/DealsScreen.css";

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
  // to select 5 random properties
  const randomProperties = investmentProperties
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const handlePurchase = (property: InvestmentProperty) => {
    if (property.purchaseCost <= currentBankBalance) {
      onPurchaseProperty(property);
      onClose();
    } else {
      alert("Insufficient funds to purchase this property.");
    }
  };

  // to calculate ROI (Return On Investment)
  const calculateROI = (property: InvestmentProperty): string => {
    const totalInvestment =
      property.purchaseCost + property.closingCost + property.renovationCost;
    const netProfit = property.arvSalePrice - totalInvestment;
    const roiPercentage = (netProfit / totalInvestment) * 100;
    return roiPercentage.toFixed(2) + "%";
  };

  /*
  Very Bad ROI: Typically, a negative ROI, indicating a loss. This could be any 
  negative percentage. 

  Bad ROI: Slightly negative to just breakeven, usually 0% to a few percent positive. 
  
  Average ROI: Generally aligns with market averages, around 6% to 10%. 
  
  Good ROI: Above-average returns, often seen as between 10% to 15%. 
  
  Great ROI: Exceptionally high returns, typically over 15%.
  */

  return (
    <div className="deals-screen">
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

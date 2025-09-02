import React, { useState, useEffect } from "react";
import "../styles/DealsScreen.css";
import { InvestmentProperty } from "../types";

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
  onClose
}) => {
  const [randomProperties, setRandomProperties] = useState<InvestmentProperty[]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);

  useEffect(() => {
    const generateRandomProperties = () => {
      const randomProps = investmentProperties
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      setRandomProperties(randomProps);
      setSelectedRowIndex(0); // Reset selection when properties change
    };

    generateRandomProperties();

    return () => {
      // Cleanup logic if needed
    };
  }, [investmentProperties]);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle key presses when not typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setSelectedRowIndex(prev => 
            prev > 0 ? prev - 1 : randomProperties.length - 1
          );
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedRowIndex(prev => 
            prev < randomProperties.length - 1 ? prev + 1 : 0
          );
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          if (randomProperties[selectedRowIndex]) {
            handlePurchase(randomProperties[selectedRowIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedRowIndex, randomProperties, onClose]);

  const handlePurchase = (property: InvestmentProperty) => {
    const totalCost =
      property.purchaseCost + property.closingCost + property.renovationCost;
    if (totalCost <= currentBankBalance) {
      onPurchaseProperty(property);
      onClose();
    } else {
      // Show helpful error message with cost breakdown
      const shortfall = totalCost - currentBankBalance;
      alert(`Insufficient funds to purchase ${property.name}!\n\n` +
            `Total Cost: $${totalCost.toLocaleString()}\n` +
            `- Purchase: $${property.purchaseCost.toLocaleString()}\n` +
            `- Closing: $${property.closingCost.toLocaleString()}\n` +
            `- Renovation: $${property.renovationCost.toLocaleString()}\n\n` +
            `Your Balance: $${currentBankBalance.toLocaleString()}\n` +
            `Shortfall: $${shortfall.toLocaleString()}\n\n` +
            `💡 Tip: You need to save up the combined amount of purchase price, closing costs, and renovation costs to buy this property.`);
    }
  };

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

  return (
    <div className="deals-screen">
      <p>Bank Balance: ${currentBankBalance.toLocaleString()}</p>
      <h2>Available Investment Properties</h2>
             <p className="keyboardHelp">
         Tip: Use ↑↓ arrow keys to navigate, P to purchase, ESC to close
       </p>
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
            {randomProperties.map((property, index) => (
              <tr 
                key={property.id}
                className={index === selectedRowIndex ? 'selected-row' : ''}
                onClick={() => handleRowClick(index)}
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
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(property);
                    }}
                    className={index === selectedRowIndex ? 'selected-button' : ''}
                  >
                    Purchase (P)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onClose}>Close (ESC)</button>
    </div>
  );
};

export default DealsScreen;

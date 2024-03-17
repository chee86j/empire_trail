import React from "react";
import { InvestmentProperty } from "../types"; // Assuming you have a type for InvestmentProperty
import "../styles/DealsScreen.css";

interface Props {
  investmentProperties: InvestmentProperty[]; // List of available investment properties
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
  const handlePurchase = (property: InvestmentProperty) => {
    if (property.cost <= currentBankBalance) {
      onPurchaseProperty(property);
      onClose();
    } else {
      alert("Insufficient funds to purchase this property.");
    }
  };

  return (
    <div className="deals-screen">
      <h2>Available Investment Properties</h2>
      <ul>
        {investmentProperties.map((property) => (
          <li key={property.id}>
            <div>
              <h3>{property.name}</h3>
              <p>Price: ${property.cost}</p>
              <button onClick={() => handlePurchase(property)}>Purchase</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DealsScreen;

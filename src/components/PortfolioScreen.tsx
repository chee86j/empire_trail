import React from "react";

interface InvestmentProperty {
  id: string;
  name: string;
  purchaseCost: number;
  closingCost: number;
  renovationCost: number;
  renovationTime: number;
  arvRentalIncome: number;
  arvSalePrice: number;
  purchaseMonth: number;
  purchaseYear: number;
}

interface Props {
  portfolio: InvestmentProperty[];
  onClose: () => void;
}

const PortfolioScreen: React.FC<Props> = ({ portfolio, onClose }) => {
  return (
    <div className="screen">
      <h2>Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purchase Month</th>
            <th>Purchase Year</th>
            <th>Purchase Cost</th>
            <th>Closing Cost</th>
            <th>Renovation Cost</th>
            <th>Rehab Time</th>
            <th>ARV Rental Income</th>
            <th>ARV Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((property, index) => (
            <tr key={index}>
              <td>{property.name}</td>
              <td>{property.purchaseMonth}</td>
              <td>{property.purchaseYear}</td>
              <td>${property.purchaseCost.toLocaleString()}</td>
              <td>${property.closingCost.toLocaleString()}</td>
              <td>${property.renovationCost.toLocaleString()}</td>
              <td>{property.renovationTime} months</td>
              <td>${property.arvRentalIncome.toLocaleString()}</td>
              <td>${property.arvSalePrice.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PortfolioScreen;

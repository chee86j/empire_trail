import React from "react";

interface Props {
  portfolio: any[]; // Placeholder for portfolio data
  onClose: () => void;
}

const PortfolioScreen: React.FC<Props> = ({ portfolio, onClose }) => {
  return (
    <div className="screen">
      <h2>Portfolio</h2>
      <table>{/* Render portfolio data in a table */}</table>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PortfolioScreen;

import React from "react";

interface Props {
  onClose: () => void;
}

const DealsScreen: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="screen">
      <h2>Available Deals</h2>
      <ul>{/* Render available property deals */}</ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DealsScreen;

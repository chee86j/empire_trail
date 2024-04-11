import React, { useState } from "react";
import "../styles/PlayerSelectScreen.css";

interface Props {
  onSelectProfession: (profession: string) => void;
}

const PlayerSelectScreen: React.FC<Props> = ({ onSelectProfession }) => {
  const [selectedProfession, setSelectedProfession] = useState("");

  const professionDetails = {
    Carpenter: { bankBalance: 50000, salary: 4000 },
    Banker: { bankBalance: 80000, salary: 8000 },
    Realtor: { bankBalance: 30000, salary: 3000 },
    Plumber: { bankBalance: 70000, salary: 6000 },
    Electrician: { bankBalance: 80000, salary: 6000 },
    Accountant: { bankBalance: 40000, salary: 3000 },
  };

  return (
    <div className="playerSelectScreen">
      <h2>Select Your Profession</h2>
      <ul className="professionList">
        {Object.keys(professionDetails).map((profession, index) => (
          <li
            key={index}
            onClick={() => onSelectProfession(profession)}
            onMouseEnter={() => setSelectedProfession(profession)}
            className="professionItem"
          >
            {profession}
          </li>
        ))}
      </ul>
      {selectedProfession && (
        <div className="professionDetails">
          <p>
            Bank Balance: $
            {professionDetails[selectedProfession as keyof typeof professionDetails].bankBalance.toLocaleString()}
          </p>
          <p>
            Salary: $
            {professionDetails[selectedProfession as keyof typeof professionDetails].salary.toLocaleString()} per
            month
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayerSelectScreen;

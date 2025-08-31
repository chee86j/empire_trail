import React, { useState, useEffect } from "react";
import "../styles/PlayerSelectScreen.css";
import { Profession } from "../types";

interface Props {
  onSelectProfession: (profession: Profession) => void;
}

const PlayerSelectScreen: React.FC<Props> = ({ onSelectProfession }) => {
  const [selectedProfession, setSelectedProfession] = useState<Profession | "">(
    ""
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const professionDetails: Record<
    Profession,
    { bankBalance: number; salary: number }
  > = {
    Carpenter: { bankBalance: 50000, salary: 4000 },
    Banker: { bankBalance: 80000, salary: 8000 },
    Realtor: { bankBalance: 30000, salary: 3000 },
    Plumber: { bankBalance: 70000, salary: 6000 },
    Electrician: { bankBalance: 80000, salary: 6000 },
    Accountant: { bankBalance: 40000, salary: 3000 },
  };

  const professions = Object.keys(professionDetails) as Profession[];

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle key presses when not typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : professions.length - 1
          );
          setSelectedProfession(professions[selectedIndex > 0 ? selectedIndex - 1 : professions.length - 1]);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < professions.length - 1 ? prev + 1 : 0
          );
          setSelectedProfession(professions[selectedIndex < professions.length - 1 ? selectedIndex + 1 : 0]);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          event.preventDefault();
          const index = parseInt(event.key) - 1;
          if (index < professions.length) {
            setSelectedIndex(index);
            setSelectedProfession(professions[index]);
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (selectedProfession) {
            onSelectProfession(selectedProfession);
          }
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
  }, [selectedIndex, selectedProfession, professions, onSelectProfession]);

  const handleProfessionClick = (profession: Profession, index: number) => {
    setSelectedProfession(profession);
    setSelectedIndex(index);
  };

  return (
    <div className="playerSelectScreen">
      <h2>Select Your Profession</h2>
      <p className="keyboardHelp">
        💡 Use ↑↓ arrow keys to navigate, 1-6 for quick selection, Enter/Space to confirm
      </p>
      <ul className="professionList">
        {professions.map((profession, index) => (
          <li
            key={index}
            onClick={() => handleProfessionClick(profession, index)}
            onMouseEnter={() => {
              setSelectedProfession(profession);
              setSelectedIndex(index);
            }}
            className={`professionItem ${index === selectedIndex ? 'selected-profession' : ''}`}
          >
            {index + 1}. {profession}
          </li>
        ))}
      </ul>
      {selectedProfession && (
        <div className="professionDetails">
          <p>
            Bank Balance: $
            {professionDetails[
              selectedProfession as Profession
            ].bankBalance.toLocaleString()}
          </p>
          <p>
            Salary: $
            {professionDetails[
              selectedProfession as Profession
            ].salary.toLocaleString()}{" "}
            per month
          </p>
          <button 
            onClick={() => onSelectProfession(selectedProfession)}
            className="confirmButton"
          >
            Confirm Selection (Enter/Space)
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerSelectScreen;

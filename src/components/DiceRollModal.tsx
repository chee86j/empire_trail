import React, { useRef, useState, useEffect } from "react";
import ReactDice, { ReactDiceRef } from "react-dice-complete";
import "../styles/DiceRollModal.css";

interface Props {
  onClose: () => void;
  action: "Rent" | "Sale";
  onRoll: (rollValue: number) => void;
  maxRolls: number;
}

const DiceRollModal: React.FC<Props> = ({
  onClose,
  action,
  onRoll,
  maxRolls,
}) => {
  const reactDice = useRef<ReactDiceRef>(null);
  const [currentRollCount, setCurrentRollCount] = useState(0);
  const [isFirstRoll, setIsFirstRoll] = useState(true); // state for ignoring the first roll

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle key presses when not typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case ' ':
        case 'Enter':
          event.preventDefault();
          if (currentRollCount < maxRolls) {
            rollAll();
          }
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          if (currentRollCount < maxRolls) {
            rollAll();
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
  }, [currentRollCount, maxRolls, onClose]);

  const rollDone = (totalValue: number, values: number[]) => {
    if (isFirstRoll) {
      setIsFirstRoll(false);
      return;
    }

    // Rest of the logic for subsequent rolls
    onRoll(totalValue);
    console.log(`Total value: ${totalValue}, Values: ${values}`);
    setCurrentRollCount((prev) => prev + 1);
  };

  const rollAll = () => {
    if (currentRollCount < maxRolls) {
      reactDice.current?.rollAll();
    }
  };

  return (
    <div className="dice-modal">
      <div className="dice-modal-content">
        <h2>Roll the Dice for {action}</h2>
        <p className="keyboardHelp">
          💡 Press Space/Enter or R to roll, ESC to close
        </p>
        <ReactDice
          numDice={2}
          ref={reactDice}
          rollDone={rollDone}
          faceColor="#F8F8F8"
          dotColor="#003366"
          dieSize={60}
          outline
          outlineColor="#000000"
          defaultRoll={6}
          rollTime={2}
        />
        <button onClick={rollAll}>Roll (Space/Enter/R)</button>
        <button onClick={onClose}>Close (ESC)</button>
      </div>
    </div>
  );
};

export default DiceRollModal;

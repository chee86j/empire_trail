import React, { useRef, useState } from "react";
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
        <button onClick={rollAll}>Roll</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DiceRollModal;

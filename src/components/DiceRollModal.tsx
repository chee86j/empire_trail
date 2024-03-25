import React, { useRef } from "react";
import ReactDice, { ReactDiceRef } from "react-dice-complete";
import "../styles/DiceRollModal.css";

interface Props {
  onClose: () => void;
  action: "Rent" | "Sale";
}

const DiceRollModal: React.FC<Props> = ({ onClose, action }) => {
  const reactDice = useRef<ReactDiceRef>(null);

  const rollDone = (totalValue: number, values: number[]) => {
    console.log("individual die values array:", values);
    console.log("total dice value:", totalValue);
  };

  const rollAll = () => {
    reactDice.current?.rollAll();
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

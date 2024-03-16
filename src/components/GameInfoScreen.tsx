import React from "react";
import "../styles/GameInfoScreen.css";

interface Props {
  onStartGame: () => void;
}

const GameInfoScreen: React.FC<Props> = ({ onStartGame }) => {
  return (
    <div className="gameInfoScreen">
      <h2>Welcome to Empire Trail</h2>
      <p>
        Embark on a journey across America, make strategic real estate
        investments, and build your wealth!
      </p>
      <button onClick={onStartGame} className="startGameButton">
        Start Game
      </button>
    </div>
  );
};

export default GameInfoScreen;

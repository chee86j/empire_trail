import React from "react";

interface Props {
  onStartGame: () => void;
}

const GameInfoScreen: React.FC<Props> = ({ onStartGame }) => {
  return (
    <div className="screen">
      <h2>Welcome to Empire Trail</h2>
      <p>
        Embark on a journey across America, make strategic real estate
        investments, and build your wealth!
      </p>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default GameInfoScreen;

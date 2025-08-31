import React, { useEffect } from "react";
import "../styles/GameInfoScreen.css";

interface Props {
  onStartGame: () => void;
}

const GameInfoScreen: React.FC<Props> = ({ onStartGame }) => {
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
          onStartGame();
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
  }, [onStartGame]);

  return (
    <div className="gameInfoScreen">
      <h2>Welcome to Empire Trail</h2>
      <p className="keyboardHelp">
        💡 Press Space or Enter to start the game
      </p>
      <p>
        Embark on a journey across America, make strategic real estate
        investments, and build your wealth!
      </p>
      <button onClick={onStartGame} className="startGameButton">
        Start Game (Space/Enter)
      </button>
    </div>
  );
};

export default GameInfoScreen;

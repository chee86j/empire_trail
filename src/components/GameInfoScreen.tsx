import React, { useEffect } from "react";
import "../styles/GameInfoScreen.css";

interface Props {
  onStartGame: () => void;
  onResetOnboarding?: () => void;
}

const GameInfoScreen: React.FC<Props> = ({ onStartGame, onResetOnboarding }) => {
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
        case 'F2':
          event.preventDefault();
          if (onResetOnboarding) {
            onResetOnboarding();
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
  }, [onStartGame, onResetOnboarding]);

  return (
    <div className="gameInfoScreen">
      <h2>Welcome to Empire Trail</h2>
             <p className="keyboard-help">
         Tip: Press Space or Enter to start the game, F2 for tutorial
       </p>
      <p>
        Embark on a journey across America, make strategic real estate
        investments, and build your wealth!
      </p>
      <button 
        onClick={onStartGame} 
        className="btn btn-primary btn-lg"
        aria-label="Start the Empire Trail game"
      >
        Start Game (Space/Enter)
      </button>
      
      {onResetOnboarding && (
        <button 
          onClick={onResetOnboarding} 
          className="btn btn-secondary"
          aria-label="Show game tutorial"
          style={{ marginTop: '10px' }}
        >
          Show Tutorial
        </button>
      )}
    </div>
  );
};

export default GameInfoScreen;

import React, { useState } from "react";
import HangmanGame from "./Components/HangmanGame";
import HintsGame from "./Components/HintsGame";

const App = () => {
  const [gameStarted, setGameStarted] = useState(true);

  const handleSwitchGame = () => {
    setGameStarted(!gameStarted);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <div>
          <HangmanGame />
          <button onClick={handleSwitchGame}>Switch to Another Game</button>
        </div>
      ) : (
        <div>
          <HintsGame />
          <button onClick={handleSwitchGame}>Switch to Hangman Game</button>
        </div>
      )}
    </div>
  );
};

export default App;
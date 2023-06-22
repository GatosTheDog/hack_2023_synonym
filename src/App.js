import React, { useState } from "react";
import HangmanGame from "./Components/HangmanGame";
import HintsGame from "./Components/HintsGame";
import "./App.css";
import Button from "./Components/Button";

const App = () => {
  const [gameStarted, setGameStarted] = useState(true);
  const [hangManGameStarted, setHangManGameStarted] = useState(false);
  const [hintsGameStarted, setHintsGameStarted] = useState(false);

  const handleBackToHome = () => {
    setGameStarted(true);
    setHintsGameStarted(false);
    setHangManGameStarted(false);
  };
  const goToHandMan=()=>{
    setHangManGameStarted(true);
    setGameStarted(false)
  }
  const goToHints=()=>{
    setHintsGameStarted(true);
    setGameStarted(false)
  }

  return (
    <div className="App" >
    {gameStarted &&
      <div>
        <h1>Choose a Game</h1>
          <Button onClick={goToHandMan} name="Synonym Game"/>
          <Button onClick={goToHints} name="Hints Game"/>
      </div>
    }
    {hintsGameStarted &&
    <div>

      <HintsGame />
      <button onClick={handleBackToHome}>Back to home screen</button>
    </div>
    }
    {hangManGameStarted && 
    <div>
      <HangmanGame />
      <button onClick={handleBackToHome}>Back to home screen</button>
    </div>
    }
    </div>
  );
};

export default App;
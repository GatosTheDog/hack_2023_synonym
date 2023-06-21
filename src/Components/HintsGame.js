import React, { useState, useEffect } from "react";
import definitions from '../data/definitions.json';
import './HangmanGame.css';
import LetterButton from "./LetterButton";

const HangmanGame = () => {
  const [word, setWord] = useState("");
  const [solution, setSolution] = useState("");
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  // const [guess, setGuess] = useState("");
  const [remainingGuesses, setRemainingGuesses] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [hintsCounter, setHintsCounter] = useState(1)

  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    setScrambledLetters(scrambleWord(solution));
  }, [solution]);

  let maskedWord = solution
  .split("")
  .map((letter, index) => ((guessedLetters[index] || "_")))
  .join(" ");


  const fetchRandomWord = () => {
    const randomGroup = definitions.words[Math.floor(Math.random() * 122)];
    const randomWordToFind = randomGroup.word;
    const randomDefinition = randomGroup.definition;

    console.log('aaaaaaaaaaaaaaaa',randomGroup, randomWordToFind, randomDefinition);
    setWord(randomDefinition);
    setSolution(randomWordToFind);

  };

  const scrambleWord = (solution) => {
    const extraLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const randomExtraLetters = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * extraLetters.length);
      randomExtraLetters.push(extraLetters[randomIndex]);
    }
    const scrambled = solution.split("").sort(() => Math.random() - 0.5);
    const combined = [...scrambled, ...randomExtraLetters];
    const shuffled = combined.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  // const handleGuessChange = (event) => {
  //   setGuess(event.target.value.toLowerCase());
  // };

  const handleHint = () => {
    console.log('AAAAAAAAAAAAAAAAAA', Math.random() < 0.5);
    maskedWord = solution
    .split("")
    .map((letter, index) => (Math.random() < 0.5 ? letter : "_"))
    .join(" ");
  }

  const handleGuessSubmit = (letterPress) => {
    // event.preventDefault();

    if (gameOver) {
      return;
    }

    const updatedGuessedLetters = [...guessedLetters, letterPress];
    setGuessedLetters(updatedGuessedLetters);

    if (!solution.includes(letterPress)) {
      setRemainingGuesses(remainingGuesses - 1);
    }

    if (remainingGuesses === 1) {
      setGameOver(true);
    }

    // setGuess("");
  };

  const submitGuess = () => {
    const guessedWord = guessedLetters.join("");
    if (guessedWord === solution) {
      alert('correct')
    } else {
      alert('fail')
    }
  };

  return (
    <div className="container">
      <h1>Synonym Game</h1>
      <p>Guess the word by the definition: {word}</p>
      <p>{maskedWord}</p>
      <p>Remaining Guesses: {remainingGuesses}</p>
      {!gameOver && remainingGuesses > 0 && (
        <div >
          <p>Scrambled Letters:</p>
          <div className="letterContainer">{scrambledLetters.map((letter,index)=>
              <LetterButton key={index} letter={letter} onClick={handleGuessSubmit}
          />)}
          </div>
          <div>
            <button onClick={submitGuess}>Submit Guess</button>
            <button onClick={handleHint}>Take a hint</button>
          </div>
        </div>
      )}
      {gameOver && <p>Game Over. The word was: {solution}</p>}
    </div>
  );
};

export default HangmanGame;
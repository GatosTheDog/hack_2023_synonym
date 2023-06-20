import React, { useState, useEffect } from "react";
import synonyms from '../data/synonyms.json'

const HangmanGame = () => {
  const [word, setWord] = useState("");
  const [solution, setSolution] = useState("");
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guess, setGuess] = useState("");
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    setScrambledLetters(scrambleWord(solution));
  }, [solution]);


  const fetchRandomWord = () => {
    const randomGroup = synonyms.group[Math.floor(Math.random() * 20)];
    const randomWordToFindSynonym = randomGroup[Math.floor(Math.random() * randomGroup.length)];
    let randomWordSolution;
    do {
      randomWordSolution = randomGroup[Math.floor(Math.random() * randomGroup.length)]
    } while (randomWordToFindSynonym === randomWordSolution);

    console.log('aaaaaaaaaaaaaaaa',randomGroup, randomWordToFindSynonym, randomWordSolution);
    setWord(randomWordToFindSynonym);
    setSolution(randomWordSolution);

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

  const handleGuessChange = (event) => {
    setGuess(event.target.value.toLowerCase());
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();

    if (guessedLetters.includes(guess) || gameOver) {
      return;
    }

    const updatedGuessedLetters = [...guessedLetters, guess];
    setGuessedLetters(updatedGuessedLetters);

    if (!solution.includes(guess)) {
      setRemainingGuesses(remainingGuesses - 1);
    }

    if (remainingGuesses === 1) {
      setGameOver(true);
    }

    setGuess("");
  };

  const maskedWord = solution
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <div>
      <h1>Hangman Game</h1>
      <p>Guess the synonym of word: {word}</p>
      <p>{maskedWord}</p>
      <p>Remaining Guesses: {remainingGuesses}</p>
      {!gameOver && remainingGuesses > 0 && (
        <div>
          <p>Scrambled Letters:</p>
          <p>{scrambledLetters.join(" ")}</p>
          <form onSubmit={handleGuessSubmit}>
            <input type="text" value={guess} onChange={handleGuessChange} />
            <button type="submit">Guess</button>
          </form>
        </div>
      )}
      {gameOver && <p>Game Over. The word was: {word}</p>}
    </div>
  );
};

export default HangmanGame;

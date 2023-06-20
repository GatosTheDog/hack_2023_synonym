import React, { useState, useEffect } from "react";
import synonyms from '../data/synonyms.json'

const HangmanGame = () => {
  const [word, setWord] = useState("");
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guess, setGuess] = useState("");
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    setScrambledLetters(scrambleWord(word));
  }, [word]);


  const fetchRandomWord = () => {
    const randomGroup = synonyms.group[Math.floor(Math.random() * 20)];
    const randomWord = randomGroup[Math.floor(Math.random() * randomGroup.length)];
    console.log('aaaaaaaaaaaaaaaa',randomGroup, randomWord);
    setWord(randomWord);
  };

  const scrambleWord = (word) => {
    const scrambled = word.split("").sort(() => Math.random() - 0.5);
    return scrambled;
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

    if (!word.includes(guess)) {
      setRemainingGuesses(remainingGuesses - 1);
    }

    if (remainingGuesses === 1) {
      setGameOver(true);
    }

    setGuess("");
  };

  const maskedWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <div>
      <h1>Hangman Game</h1>
      <p>Guess the word:</p>
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

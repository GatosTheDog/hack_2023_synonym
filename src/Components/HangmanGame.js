import React, { useState, useEffect } from "react";
import synonyms from '../data/synonyms.json';
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

  // const handleGuessChange = (event) => {
  //   setGuess(event.target.value.toLowerCase());
  // };

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

  const hearts=[];
  for(let i=1;i<=remainingGuesses;i++){hearts.push(<span>❤️</span>);}
  const maskedWord = solution
  .split("")
  .map((letter, index) => ((guessedLetters[index] || "_")))
  .join(" ");

  return (
    <div className="container">
      <h1>Synonym Game</h1>
      <div>{hearts}</div>
      <p>Guess the synonym of word: {word}</p>
      <p>{maskedWord}</p>
      {!gameOver && remainingGuesses > 0 && (
        <div >
          <p>Scrambled Letters:</p>
          <div className="letterContainer">{scrambledLetters.map((letter,index)=>
              <LetterButton key={index} letter={letter} onClick={handleGuessSubmit}
          />)}
          </div>
          <div>
            <button onClick={submitGuess}>Submit Guess</button>
          </div>
        </div>
      )}
      {gameOver && <p>Game Over. The word was: {solution}</p>}
    </div>
  );
};

export default HangmanGame;
import React, { useState, useEffect } from "react";
import definitions_hints from '../data/definitions_hints.json';
import './HangmanGame.css';
import Button from "./Button";
import LetterButton from "./LetterButton";
import Modal from "./Modal";

const rounds = [
  {
    number:1,
    timer:30
  },
  {
    number:2,
    timer:30
  },
  {
    number:3,
    timer:30
  },
  {
    number:4,
    timer:30
  },
  {
    number:5,
    timer:30
  },
]

const HangmanGame = ({backToHome}) => {
  const [word, setWord] = useState("");
  const [solution, setSolution] = useState("");
  const [example, setExample] = useState("");
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  // const [guess, setGuess] = useState("");
  const [remainingGuesses, setRemainingGuesses] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [hintsCounter, setHintsCounter] = useState(0);
  const [disableHint, setDisableHint] = useState(false);
  const [firstLetterId,setFirstLetterId]=useState();
  const [isOpen, setIsOpen] = useState(false);
  const [randomExtraLetters, setRandomExtraLetters] = useState([])

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
    const randomGroup = definitions_hints.words[Math.floor(Math.random() * 23)];
    const randomWordToFind = randomGroup.word;
    const randomDefinition = randomGroup.definition;
    const randomExample = randomGroup.example;

    console.log('aaaaaaaaaaaaaaaa',randomGroup, randomWordToFind, randomDefinition, randomExample);
    setWord(randomDefinition);
    setSolution(randomWordToFind);
    setExample(randomExample);

  };

  const scrambleWord = (solution) => {
    const extraLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const randomExtraLetters = [];
    while (randomExtraLetters.length < 4) {
      const randomIndex = Math.floor(Math.random() * extraLetters.length);
      const randomLetter = extraLetters[randomIndex];

      if (!solution.includes(randomLetter) && !randomExtraLetters.includes(randomLetter)) {
        randomExtraLetters.push(randomLetter);
      }
    }
    setRandomExtraLetters(randomExtraLetters);
    const scrambled = solution.split("").sort(() => Math.random() - 0.5);
    const combined = [...scrambled, ...randomExtraLetters];
    const result = combined.sort(() => Math.random() - 0.5);
    const letterObject = result.map((letter, index) => ({
      letter,
      isDisabled: false,
      id: index
    }))
    letterObject.find((item)=>{if(item.letter===solution[0]){setFirstLetterId(item.id)}});
    return letterObject;
  };

  // const handleGuessChange = (event) => {
  //   setGuess(event.target.value.toLowerCase());
  // };
  const updateValueById = (id, newValue) => {
    setScrambledLetters(prevData => {
      const updatedData = prevData.map(item => {
        if (item.id === id) {
          return { ...item, isDisabled: newValue };
        }
        return item;
      });
      return updatedData;
    });
  };
  const updateValueByLetter = (letter, newValue) => {
    console.log('132132131', letter);
    setScrambledLetters(prevData => {
      const updatedData = prevData.map(item => {
        if (item.letter === letter) {
          return { ...item, isDisabled: newValue };
        }
        return item;
      });
      return updatedData;
    });
  };

  const handleHint = () => {
    setHintsCounter((prev)=>prev+1);
  };

  useEffect(()=>{
    // setRemainingGuesses((currentGuesses)=>currentGuesses-1);
    if(hintsCounter === 1){
      setGuessedLetters([]);
      setGuessedLetters(solution[0]);
      setScrambledLetters(prevData => {
        const updatedData = prevData.map((item, index) => {
          return { ...item, isDisabled: false };
        });
        return updatedData;
      });
    
      updateValueById(firstLetterId,true);
    } else if (hintsCounter === 2){
      setIsOpen(true);
    }else if( hintsCounter === 3){
      console.log('00000000000000000000', hintsCounter);
      scrambledLetters.forEach((item)=>{
        if(randomExtraLetters.includes(item.letter)){
          updateValueByLetter(item.letter,true);
        }
        setDisableHint(true);
      })
    }

  },[hintsCounter])

  useEffect(()=>{
    if (remainingGuesses === 0) {
      setGameOver(true);
      setDisableHint(false);
    }
  },[remainingGuesses])

  const onLetterPress = (item) => {
    const letterPress = item.letter;
    // event.preventDefault();
    if (gameOver) {
      return;
    }

    const updatedGuessedLetters = [...guessedLetters, letterPress];
    setGuessedLetters(updatedGuessedLetters);
    updateValueById(item.id,true);

    // setGuess("");
  };

  const hearts=[];
  for(let i=1;i<=remainingGuesses;i++){
    hearts.push(<span>❤️</span>);
  }
  const submitGuess = () => {
    const guessedWord = guessedLetters.join("");
    setDisableHint(false);
    if (guessedWord === solution) {
      alert('correct')
    } else {
      setRemainingGuesses((currentGuess)=>currentGuess-1);
      backToHome();
    }
  };
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container">
      {/* go hearts to right side */}
      <div>{hearts}</div>
      <h2>{word}</h2>
      <p>{maskedWord}</p>
      {!gameOver && remainingGuesses > 0 && (
        <div >
          <div className="letterContainer">{scrambledLetters.map((item,index)=>
            <LetterButton
              key={index}
              letterObject={item}
              onClick={onLetterPress}
            />)}
          </div>
          <div style={{display:"flex"}}>
            {!disableHint && <Button onClick={handleHint} name="Hint"/>}
            <Button onClick={submitGuess} name="Go"/>
          </div>
        </div>
      )}
      
      {isOpen && 
      <Modal title={"Hint #2"} message={example} onClick={closeModal}/>}
      
      {gameOver && <p>Game Over. The word was: {solution}</p>}
      <button className="backButton" onClick={backToHome}>⇦</button>
    </div>
  );
};

export default HangmanGame;
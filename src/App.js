import './App.css';

import React, { useEffect, useState } from 'react';
import { RED, GREEN, BLUE, YELLOW, getSequence } from './scripts/sequenceGen';
import useSound from 'use-sound';
import green from './sounds/green.mp3';
import red from './sounds/red.mp3';
import blue from './sounds/blue.mp3';
import yellow from './sounds/yellow.mp3';


const TIME_LIT = 300, TIME_DIM = 30;
import { Directions } from './components/cards/TheGame';
import { Title } from './components/title/Title';
import { Scoreboard } from './components/scoreboard/Scoreboard';
// import { Success, Failure } from './components/alerts/Alerts';


/**
 * 
 * @returns 
 */
function App() {
  const [activeButton, setActiveButton] = useState('');
  const [currentLevel, setCurrentLevel] = useState([RED]);

  // const [playSound, setPlaySound] = useSound();
  const [playGreen] = useSound(green);
  const [playRed] = useSound(red);
  const [playBlue] = useSound(blue);
  const [playYellow] = useSound(yellow);
  // const [fullSet, setFullSet] = useState([RED]);  -- For implementation of custom sequences
  const [cursor, setCursor] = useState(0);
  const [playback, setPlayback] = useState(false);

  const increaseCursor = () => setCursor(previousState => previousState + 1);

  const handleClick = (code) => {
    if (!playback) {
      lightUp(code);
      setTimeout(() => dimAll(), TIME_LIT);

      if (code === currentLevel[cursor]) {
        // CORRECT
        increaseCursor();

        if (cursor === currentLevel.length - 1) {
          nextRound();
        }
      } else {
        // INCORRECT
        // Failure();

      }
    }
  };

  // Unless given a true value, gets one additional random value for the next level
  const nextRound = (firstRound = false) => {
    let sequence = [''];
    if (firstRound) {
      sequence = getSequence(1);
    } else {
      sequence = getSequence(currentLevel.length + 1, currentLevel);
    }
    setCursor(0);
    setCurrentLevel(sequence);
    setTimeout(() => handleRecite(sequence), 400);
  };

  // Sets one button as lit; only one can be lit at a time by this
  const lightUp = (code) => {
    console.log('decoded');
    playSound(code);
    setActiveButton(code);
  };

  function playSound(code) {
    switch(code) {
      case 'green': 
        console.log('green');
        playGreen();
        break;
      case 'red':
        console.log('red');
        playRed();
        break;
      case 'blue': 
        console.log('blue')
        playBlue();
        break;
      case 'yellow':
        console.log('yellow')
        playYellow();
        break;
      default: 
        console.log('something went wrong');
    }
  }

  // Dims all buttons
  const dimAll = () => {
    setActiveButton('');
  }

  
  // Lights all buttons in the current level in order and then sets playback to false
  const handleRecite = (sequence = currentLevel) => {
    let recCursor = 0;
    setPlayback(true);
    const interval = setInterval(() => {
      lightUp(sequence[recCursor]);
      recCursor++;
      if (recCursor > sequence.length) {
        clearInterval(interval);
        setPlayback(false);
      };
      setTimeout(() => dimAll(), TIME_LIT - TIME_DIM);
    }, TIME_LIT);
  }

  return (
    <div className='App'>
      {/* <Title /> */}
      <Directions />
      <main id='circle'>
        <section
          onClick={() => handleClick(GREEN)}
          className={activeButton === 'green' ? 'green-active' : null}
          id='green'
        ></section>
        <section
          onClick={() => handleClick(RED)}
          className={activeButton === 'red' ? 'red-active' : null}
          id='red'
          ></section>
        <section
          onClick={() => handleClick(YELLOW)}
          className={activeButton === 'yellow' ? 'yellow-active' : null}
          id='yellow'
        ></section>
        <section
          onClick={() => handleClick(BLUE)}
          className={activeButton === 'blue' ? 'blue-active' : null}
          id='blue'
        ></section>
        <section
          onClick={null}
          id='center'
        ></section>
      </main>
      <Scoreboard />
    </div>
  );
}

export default App;

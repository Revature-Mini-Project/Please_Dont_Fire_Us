import './App.css';

import React, { useState, useEffect } from 'react';
import { RED, GREEN, BLUE, YELLOW, getSequence } from './scripts/sequenceGen';
import useSound from 'use-sound';
import green from './sounds/greenShort.mp3';
import red from './sounds/redShort.mp3';
import blue from './sounds/blueShort.mp3';
import yellow from './sounds/yellowShort.mp3';

import { Directions } from './components/cards/TheGame';
import { Title } from './components/title/Title';
import { Scoreboard } from './components/scoreboard/Scoreboard';
// import { Success, Failure } from './components/alerts/Alerts';
import registerKeyInputListeners from "./input/KeyboardInput";
const TIME_LIT = 300,
  TIME_DIM = 30;

/**
 *
 * @returns
 */
function App() {
  const [activeButton, setActiveButton] = useState('');
  const [currentLevel, setCurrentLevel] = useState(['']);
  const [dimTimeout, setCurrentDimTimeout] = useState(0);
  const [playGreen, greenSound] = useSound(green, {interrupt: true, volume: 0.5});
  const [playRed, redSound] = useSound(red, {interrupt: true, volume: 0.5});
  const [playBlue, blueSound] = useSound(blue, {interrupt: true, volume: 0.5});
  const [playYellow, yellowSound] = useSound(yellow, {interrupt: true, volume: 0.5});
  const stopAll = () => {
    greenSound.stop();
    redSound.stop();
    blueSound.stop();
    yellowSound.stop();
  }
  const [fullSet, setFullSet] = useState(['']);
  const [recording, setRecording] = useState(false);
  const [playRecord, setPlayRecord] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [playback, setPlayback] = useState(false);

  const increaseCursor = () => setCursor((previousState) => previousState + 1);

  const toggleRecord = () => {
    if (recording) {
      fullSet[0] !== '' ? setPlayRecord(true) : setPlayRecord(false);
    } else {
      setFullSet('');
    }

    setRecording((previousState) => !previousState);
  }

  const handleClick = (code) => {
    if (!playback) {
      lightUp(code);
      if (dimTimeout) {
        clearTimeout(dimTimeout);
      }
      setCurrentDimTimeout(setTimeout(() => dimAll(), TIME_LIT));
      
      // If in normal gameplay...
      if (!recording) {
        if (code === currentLevel[cursor]) {
          // CORRECT
          increaseCursor();

          if (cursor === currentLevel.length - 1) {
            // LEVEL COMPLETE
            nextRound();
          }

        } else if (currentLevel[0] !== '') {
          // INCORRECT
          // Failure();
        }
      } else {
        // If currently recording...
        const newSet = [...fullSet];
        newSet[cursor] = code;
        setFullSet(newSet);
      }
    }
  };
  
  let keyControls;
  
  useEffect(() => {
    
    keyControls = registerKeyInputListeners(
      ["7", () => handleClick(GREEN)],
      ["9", () => handleClick(RED)],
      ["1", () => handleClick(YELLOW)],
      ["3", () => handleClick(BLUE)]
    );
    
  }, []);
  
  // Unless given a true value, gets one additional random value for the next level
  const nextRound = (firstRound = false) => {
    let sequence = [''];
    if (firstRound && !playRecord) {
      sequence = getSequence(1);
    } else if (!playRecord) {
      sequence = getSequence(currentLevel.length + 1, currentLevel);
    } else {
      // Only plays if currently playing back a custom sequence
      firstRound ? sequence = [fullSet[0]] :
          sequence = [...currentLevel, fullSet[currentLevel.length]]
    }
    setCursor(0);
    setCurrentLevel(sequence);
    setTimeout(() => handleRecite(sequence), 400);
  };

  // Sets one button as lit; only one can be lit at a time by this
  const lightUp = (code) => {
    console.log('decoded');
    stopAll();
    playSound(code);
    setActiveButton(code);
  };

  function playSound(code) {
    switch (code) {
      case 'green':
        console.log('green');
        playGreen();
        break;
      case 'red':
        console.log('red');
        playRed();
        break;
      case 'blue':
        console.log('blue');
        playBlue();
        break;
      case 'yellow':
        console.log('yellow');
        playYellow();
        break;
      default:
        console.log('something went wrong');
    }
  }

  // Dims all buttons
  const dimAll = () => {
    setActiveButton('');
    stopAll();
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
      }
      setTimeout(() => dimAll(), TIME_LIT - TIME_DIM);
    }, TIME_LIT);
  };

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
        <section onClick={null} id='center'>
          <button id='start' onClick={() => nextRound(true)}>
            START
          </button>
        </section>
      </main>
      <Scoreboard level={currentLevel.length} />
    </div>
  );
}

export default App;

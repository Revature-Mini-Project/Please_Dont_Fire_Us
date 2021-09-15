import './App.css';

import React, { useEffect, useState } from 'react';
import { RED, GREEN, BLUE, YELLOW, getSequence } from './scripts/sequenceGen';
import { Directions } from './components/cards/TheGame';
import { Title } from './components/title/Title';
// import { Success, Failure } from './components/alerts/Alerts';

const TIME_LIT = 300,
  TIME_DIM = 30;

/**
 *
 * @returns
 */
function App() {
  const [activeButton, setActiveButton] = useState('');
  const [currentLevel, setCurrentLevel] = useState([RED]);
  // const [fullSet, setFullSet] = useState([RED]);  -- For implementation of custom sequences
  const [cursor, setCursor] = useState(0);
  const [playback, setPlayback] = useState(false);

  const increaseCursor = () => setCursor((previousState) => previousState + 1);

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
      console.log(currentLevel);
    }
    setCursor(0);
    setCurrentLevel(sequence);
    setTimeout(() => handleRecite(sequence), 400);
  }

  // Sets one button as lit; only one can be lit at a time by this
  const lightUp = (code) => {
    // SOUNDS GO HERE
    setActiveButton(code);
  };

  // Dims all buttons
  const dimAll = () => {
    setActiveButton('');
  };

  // Lights all buttons in the current level in order and then sets playback to false
  const handleRecite = (sequence = currentLevel) => {
    let recCursor = 0;
    const interval = setInterval(() => {
      lightUp(sequence[recCursor])
      recCursor++;
      if (recCursor > sequence.length) {
        clearInterval(interval)
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
        <section id='center'>
          <button id='start' onClick={() => nextRound(true)}>
            START
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;

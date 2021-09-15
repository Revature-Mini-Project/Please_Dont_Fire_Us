import './App.css';

import React, { useState } from 'react';
import { RED, GREEN, BLUE, YELLOW, getSequence } from './scripts/sequenceGen';


/**
 * 
 * @returns 
 */
function App() {
  const [activeButton, setActiveButton] = useState('');
  const [currentLevel, setCurrentLevel] = useState([RED, RED, GREEN, YELLOW, BLUE, GREEN, RED, GREEN, YELLOW, YELLOW]);
  const [cursor, setCursor] = useState(-1);
  const [playback, setPlayback] = useState(false);

  const togglePlayback = () => setPlayback(previousState => !previousState);

  const handleClick = (code) => {
    if (!playback) {
      console.log(code);
      lightUp(code);
      setTimeout(() => dimAll(), 200);

      // Logic for comparison to go here, utilizing cursor to determine the correct button
    }
  }

  // Unless given a true value, gets one additional random value for the next level
  const nextRound = (firstRound = false) => {
    setCurrentLevel(getSequence(currentLevel.length + 1, firstRound ? [''] : currentLevel));
    setCursor(0);
  }

  // Sets one button as lit; only one can be lit at a time by this
  const lightUp = (code) => {
    setActiveButton(code);
  }

  // Dims all buttons
  const dimAll = () => {
    setActiveButton('');
  }

  
  // In theory, lights all buttons in the current level in order and then sets playback to false
  const handleRecite = async () => {
    if (playback) {
      await setTimeout(() => lightUp(currentLevel[cursor]), 200)
      await setTimeout(() => dimAll(), 170)
    }
  }

  return (
    <div className='App'>
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
          onClick={() => handleRecite()}
          id='center'
        ></section>
      </main>
    </div>
  );
}

export default App;

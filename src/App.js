import './App.css';

import React, { useState } from 'react';
import { ZERO, ONE, TWO, THREE, getSequence } from './scripts/sequenceGen';


/**
 * 
 * @returns 
 */
function App() {
  const [activeButton, setActiveButton] = useState('');
  const [currentLevel, setCurrentLevel] = useState([ZERO]);
  const [cursor, setCursor] = useState(-1);
  const [playback, setPlayback] = useState(false);

  const togglePlayback = () => setPlayback(previousState => !previousState);

  const handleClick = (code) => {
    console.log(code);
    lightUp(code);
    setTimeout(() => dimAll(), 200);

    // Logic for comparison to go here, utilizing cursor to determine the correct button
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
      for (let i of currentLevel) {
        await setTimeout(() => lightUp(i), 200)
      }
      togglePlayback();
    }
  }


  return (
    <div className='App'>
      <main id='circle'>
        <section
          onClick={() => console.log('clicked green')}
          id='green'
        ></section>
        <section onClick={() => console.log('clicked red')} id='red'></section>
        <section
          onClick={() => console.log('clicked yellow')}
          id='yellow'
        ></section>
        <section
          onClick={() => console.log('clicked blue')}
          id='blue'
        ></section>
        <section
          onClick={() => console.log('clicked center')}
          id='center'
        ></section>
      </main>
    </div>
  );
}

export default App;

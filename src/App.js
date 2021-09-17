import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { RED, GREEN, BLUE, YELLOW, getSequence } from './scripts/sequenceGen';
import useSound from 'use-sound';
import green from './sounds/greenShort.mp3';
import red from './sounds/redShort.mp3';
import blue from './sounds/blueShort.mp3';
import yellow from './sounds/yellowShort.mp3';
import Confetti from 'react-confetti';
import { Directions } from './components/cards/TheGame';
import { Scoreboard } from './components/scoreboard/Scoreboard';
import registerKeyInputListeners from './input/KeyboardInput';
const TIME_LIT = 300,
  TIME_DIM = 30,
  VICTORY = 10;

/**
 *
 * @returns
 */
function App() {
  const [activeButton, setActiveButton] = useState(['']);
  const [currentLevel, setCurrentLevel] = useState(['']);
  const [dimTimeout, setCurrentDimTimeout] = useState(0);
  const [playGreen, greenSound] = useSound(green, {
    interrupt: true,
    volume: 0.5
  });
  const [playRed, redSound] = useSound(red, { interrupt: true, volume: 0.5 });
  const [playBlue, blueSound] = useSound(blue, {
    interrupt: true,
    volume: 0.5
  });
  const [playYellow, yellowSound] = useSound(yellow, {
    interrupt: true,
    volume: 0.5
  });
  const stopAll = () => {
    greenSound.stop();
    redSound.stop();
    blueSound.stop();
    yellowSound.stop();
  };
  const [fullSet, setFullSet] = useState(['']);
  const [recording, setRecording] = useState(false);
  const [playRecord, setPlayRecord] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [playback, setPlayback] = useState(false);
  const [shouldConfetti, setShouldConfetti] = useState(false);
  const [keys, setKeys] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [playTime, setPlayTime] = useState(0); //keeps track of time for timer
  let timeInterval = useRef(null); //used to refer to interval for clearing
  let timeCounter = 0; //needs to be declared here for some reason?
  const timerIntervalFn = () => {
    setPlayTime(() => ++timeCounter);
  };

  const [handlePress, setHandlePress] = useState('');
  const increaseCursor = () => setCursor((previousState) => previousState + 1);
  const toggleRecord = () => {
    if (recording) {
      if (fullSet[0] !== '') {
        setCursor(0);
        setPlayRecord(true);
        nextRound(true);
      } else setPlayRecord(false);
    } else {
      setFullSet('');
      setCurrentLevel(['']);
    }
    setRecording((previousState) => !previousState);
  };

  const handleClick = (code) => {
    if (!playback) {
      lightUp([code]);
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

            if (
              (!playRecord && currentLevel.length >= VICTORY) ||
              (playRecord && currentLevel.length === fullSet.length)
            ) {
              // Game complete
              setCurrentLevel(['']);
              victoryFanfareLights();
              setShouldConfetti(true);
            } else {
              // Moving on to next level
              nextRound();
            }
          }
        } else if (currentLevel[0] !== '') {
          // INCORRECT
          defeatFanfareLights(currentLevel[cursor]);
          setCurrentLevel(['']);
        }
      } else {
        // If currently recording...
        const newSet = [...fullSet, code];
        setFullSet(newSet);
      }
    }
  };

  const victoryFanfareLights = () => {
    clearInterval(timeInterval.current);
    let toggle = false,
      iterations = 0;
    setPlayback(true);
    const interval = setInterval(() => {
      lightMult(toggle ? [RED, YELLOW] : [BLUE, GREEN]);
      toggle = !toggle;
      iterations++;
      if (iterations > 8) {
        clearInterval(interval);
        setPlayback(false);
        dimAll();
      }
    }, TIME_LIT);
  };

  const defeatFanfareLights = (code) => {
    clearInterval(timeInterval.current);
    let toggle = false,
      iterations = 0;
    setPlayback(true);
    const interval = setInterval(() => {
      lightMult(toggle ? [code] : ['']);
      toggle = !toggle;
      iterations++;
      if (iterations > 8) {
        clearInterval(interval);
        setPlayback(false);
        dimAll();
      }
    }, TIME_LIT);
  };

  useEffect(() => {
    const keyControls = registerKeyInputListeners(
      ['7', () => setHandlePress(GREEN)],
      ['9', () => setHandlePress(RED)],
      ['1', () => setHandlePress(YELLOW)],
      ['3', () => setHandlePress(BLUE)]
    );
    setKeys(keyControls);
  }, []);

  useEffect(() => {
    if (handlePress !== '') {
      handleClick(handlePress);
      setHandlePress('');
    }
  }, [handlePress]);

  // Unless given a true value, gets one additional random value for the next level
  const nextRound = (firstRound = false) => {
    let sequence = [''];
    if (firstRound && fullSet[0] === '') {
      sequence = getSequence(1);
    } else if (!playRecord) {
      sequence = getSequence(currentLevel.length + 1, currentLevel);
    } else {
      // Only plays if currently playing back a custom sequence
      firstRound
        ? (sequence = [fullSet[0]])
        : (sequence = [...currentLevel, fullSet[currentLevel.length]]);
    }
    setShouldConfetti(false);
    setCursor(0);
    setCurrentLevel(sequence);
    setTimeout(() => handleRecite(sequence), 400);
  };

  // Sets one button as lit; only one can be lit at a time by this
  /**
   * Lights up one or more lights, playing sound on the first.
   * Takes in an array.
   */
  const lightUp = (code) => {
    stopAll();
    playSound(code[0]);
    setActiveButton(code);
  };

  // Silently lights up one or more lights
  const lightMult = (code) => {
    setActiveButton(code);
  };

  function playSound(code) {
    switch (code) {
      case GREEN:
        playGreen();
        break;
      case RED:
        playRed();
        break;
      case BLUE:
        playBlue();
        break;
      case YELLOW:
        playYellow();
        break;
      default:
        break;
    }
  }

  // Dims all buttons
  const dimAll = () => {
    setActiveButton(['']);
    stopAll();
  };

  // Lights all buttons in the current level in order and then sets playback to false
  const handleRecite = (sequence = currentLevel) => {
    let recCursor = 0;
    setPlayback(true);
    const interval = setInterval(() => {
      lightUp([sequence[recCursor]]);
      recCursor++;
      if (recCursor > sequence.length) {
        clearInterval(interval);
        setPlayback(false);
      }
      setTimeout(() => dimAll(), TIME_LIT - TIME_DIM);
    }, TIME_LIT);
  };

  const MaybeConfetti = () => {
    if (shouldConfetti) {
      return <Confetti initialVelocityY={-30} />;
    } else {
      return null;
    }
  };

  return (
    <div className='App'>
      <MaybeConfetti />
      <Directions />
      <main id='circle'>
        <section
          onClick={() => handleClick(GREEN)}
          className={activeButton.includes(GREEN) ? 'green-active' : null}
          id='green'
        ></section>
        <section
          onClick={() => handleClick(RED)}
          className={activeButton.includes(RED) ? 'red-active' : null}
          id='red'
        ></section>
        <section
          onClick={() => handleClick(YELLOW)}
          className={activeButton.includes(YELLOW) ? 'yellow-active' : null}
          id='yellow'
        ></section>
        <section
          onClick={() => handleClick(BLUE)}
          className={activeButton.includes(BLUE) ? 'blue-active' : null}
          id='blue'
        ></section>
        <section onClick={null} id='center'>
          <button
            id='start'
            onClick={() => {
              clearInterval(timeInterval.current);
              nextRound(true);
              timeInterval.current = setInterval(timerIntervalFn, 1000);
            }}
          >
            START
          </button>
        </section>
      </main>
      <aside id='record-container'>
        <h5 className='card-title'>Record a Custom Pattern</h5>
        <p className='tiny'>Challenge a friend!</p>
        <button id='record' onClick={() => toggleRecord()}>
          {recording ? 'RECORDING...' : 'RECORD'}
        </button>
      </aside>
      <Scoreboard level={currentLevel.length} time={playTime} />
      <aside id='keybindings'>
        <h5 className='card-title'>Keybindings</h5>
        <p className='tiny'>After pressing button, press new key</p>
        <button
          id='greenkey'
          class='keybutton'
          onClick={() => {
            keys[0][1]().then(() => setReRender(!reRender));
          }}
        >
          Green: {keys[0] ? keys[0][0]() : null}
        </button>
        <button
          id='redkey'
          class='keybutton'
          onClick={() => {
            keys[1][1]().then(() => setReRender(!reRender));
          }}
        >
          Red: {keys[1] ? keys[1][0]() : null}
        </button>
        <br />
        <button
          id='yellowkey'
          class='keybutton'
          onClick={() => {
            keys[2][1]().then(() => setReRender(!reRender));
          }}
        >
          Yellow: {keys[2] ? keys[2][0]() : null}
        </button>
        <button
          id='bluekey'
          class='keybutton'
          onClick={() => {
            keys[3][1]().then(() => setReRender(!reRender));
          }}
        >
          Blue: {keys[3] ? keys[3][0]() : null}
        </button>
      </aside>
    </div>
  );
}

export default App;

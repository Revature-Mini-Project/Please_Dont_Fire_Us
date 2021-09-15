import useSound from 'use-sound';
import './buttons.css';

// Sounds
import success from './sounds/success.mp3';
import failure from './sounds/failure.mp3';
import green from './sounds/green.mp3';
import red from './sounds/red.mp3';
import blue from './sounds/blue.mp3';
import yellow from './sounds/yellow.mp3';

export function BoopButton() {
  const [playSuccess] = useSound(success);
  const [playFailure] = useSound(failure);
  const [playGreen] = useSound(green);
  const [playRed] = useSound(red);
  const [playBlue] = useSound(blue);
  const [playYellow] = useSound(yellow);

  return (
    <div>
      <div>
        <h3>Failure Leads to Success</h3>
        <button class="success" onClick={playSuccess}>Success</button>
        <button class="failure" onClick={playFailure}>Failure</button>
      </div>
      <div>
        <h3>Simon</h3>
        <button class="green" onClick={playGreen}>Green</button>
        <button class="red" onClick={playRed}>Red</button>
      </div>
      <div>
        <button class="yellow" onClick={playYellow}>Yellow</button>
        <button class="blue" onClick={playBlue}>Blue</button>
      </div>
    </div>
  );
};

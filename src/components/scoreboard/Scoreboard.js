import React from 'react';

export function Scoreboard(props) {
  return (
    <div>
      <div id='scoreboard' class='card'>
        <div className='card-body'>
          <dl>
            <dt>Level</dt>
            <dl id='score-level'>{props.level}</dl>
            <dt>Time</dt>
            <dl id='time-elapsed'>{props.time}</dl>
          </dl>
        </div>
      </div>
    </div>
  );
}

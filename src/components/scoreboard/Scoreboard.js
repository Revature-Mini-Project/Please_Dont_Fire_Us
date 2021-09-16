import React from 'react';

export function Scoreboard(props) {
  // let elapsed = parseInt((performance.now() - props.start) / 1000).toString();

  // React.useEffect(
  //   () =>
  //     setInterval(
  //       () =>
  //         (elapsed = parseInt(
  //           (performance.now() - props.start) / 1000
  //         ).toString()),
  //       500
  //     ),
  //   []
  // );

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

export function Scoreboard(props) {
  return (
    <div>
      <div id='scoreboard' class='card'>
        <div className='card-body'>
          <dl>
            <dt>Level</dt>
            <dl id='score-level'>{props.level}</dl>
          </dl>
        </div>
      </div>
    </div>
  );
}

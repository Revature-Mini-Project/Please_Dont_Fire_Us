import './App.css';

/**
 * 
 * @returns 
 */
function App() {
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

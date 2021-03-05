import logo from './logo.svg';
import './App.css';
import { generateRandomResult, getCompareResult } from './utils/kenoAlgo';
import { useEffect } from 'react';
import slice from 'lodash/slice'

function App() {
  useEffect(() => {
    const test = getCompareResult('TX')
    // console.log('test........', test)
    // if(test?.result?.isTrue) {
    //   console.log('result...reverse....', test.result.result)
    // }
    if(test?.result?.isFalse) {
      console.log('all result .....', test.result.result)
      console.log('final result .....', slice(test.result.result, 12, 15))
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

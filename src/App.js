import logo from './logo.svg';
import './App.css';
import { getCompareResult, reverseTrue, intergrateTimeline, TEST_INPUT } from './utils/kenoAlgo';
// import { getCompareResult, reverseTrue, TEST_INPUT } from './utils/kenoAlgo';
import { getPredictResult, justRandomResult, testLottery, testLotteryRandom, testMultiTimeline } from './utils/testKeno'
import { useEffect } from 'react';
import slice from 'lodash/slice'
import moment from 'moment'

function App() {
  useEffect(() => {
    // const test = testMultiTimeline()
    // console.log('test........', test)
    // if(test?.result?.isTrue) {
    //   console.log('result...reverse....', test.result.result)
    // }
    // if(test?.result?.isFalse) {
    //   console.log('all result .......', test.result.result)
    //   console.log('final result .....', reverseTrue(slice(test.result.result, 9, 16)))
    //   // console.log('final result .....', slice(test.result.result, 8, 13))
    //   console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
    // }
    const finalResult = intergrateTimeline({ compareNumber: 8, actualInput: TEST_INPUT })
    console.log('finalresult............', finalResult)
    console.log('hit the goal:........', slice(finalResult.finalResult, 0, finalResult.finalResult.length))
    console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
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

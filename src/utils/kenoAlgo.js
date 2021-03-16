import random from 'lodash/random'
import slice from 'lodash/slice'

export const TEST_INPUT = [
    91433, 73938, 83961, 39924, 17456, 77887, 92779, 93683, 53974, 58033, 83524, 35471, 39035, 42054, 41312, 50964, 97901, 50677, 92789, 23518,
    83961, 39924, 17456, 77887, 92779, 93683, 53974, 58033, 83524, 35471, 39035, 42054, 41312, 50964, 97901, 50677, 92789, 23518, 44438, 85118,
    93683, 53974, 58033, 83524, 35471, 39035, 42054, 41312, 50964, 97901, 50677, 92789, 23518, 44438, 85118, 30583, 11526, 68547, 77319, 84525,
    47417,
    50964, 97901, 50677, 92789, 23518, 44438, 85118, 30583, 11526, 68547, 77319, 84525, 47417, 58728, 39033, 87483, 37176, 82224, 39561, 84055,
    47914, 4171, 91388, 23263, 2851, 2338, 30380

]

export const generateRandomResult = ({randomNumberResult, compareNumber}) => {
    const randomInputs = Array.apply(null, {length: randomNumberResult})
        .map(Function.call, () => random(0, 99999))
    
    const result = convertArrayNumberToResult(randomInputs);
    return ({
        compare: {
            tx: slice(result, 0, compareNumber).map(val => val[0]),
        },
        result: {
            tx: slice(result, 0, randomNumberResult).map(val => val[0]),
        }
    })
}

const fromNumberToResult = (number) => {
    return number
        .toString()
        .split('')
        .reduce((acc, currentNumberStr) => acc + Number(currentNumberStr), 0)
}

const convertArrayNumberToResult = arrayNumber => arrayNumber
    .map(num => fromNumberToResult(num))
    .map(number => {
        if(number >= 23 && (number % 2) === 0) return 'TC'
        if(number >= 23 && (number % 2) !== 0) return 'TL'
        if(number < 23 && (number % 2) === 0) return 'XC'

        return 'XL'
    })

const isFalse = (result1, result2) => {
    return result1[0] !== result2[0]
        && result1[1] !== result2[1]
        && result1[2] !== result2[2]
        && result1[3] !== result2[3]
        && result1[4] !== result2[4]
        && result1[5] !== result2[5]
        && result1[6] !== result2[6]
        && result1[7] !== result2[7]
}

const isTrue = (result1, result2) => {
    return result1[0] === result2[0]
        && result1[1] === result2[1]
        && result1[2] === result2[2]
        && result1[3] === result2[3]
        && result1[4] === result2[4]
        && result1[5] === result2[5]
        && result1[6] === result2[6]
        && result1[7] === result2[7]
}

export const reverseTrue = trueCompareResult => trueCompareResult.map(res => res === 'T' ? 'X' : 'T');

// const getActualResult

// [...document.getElementById('tbRecentResult').querySelectorAll('tr')].map(item => item.childNodes[1].innerText).splice(1, 20)
// [...document.getElementById('tbRecentResult').querySelectorAll('tr')].map(item => item.childNodes[1].innerText).splice(1, 20).map(item => Number(item))

export const getCompareResult = ({compareNumber, actualCompareResult}) => {
    let count = 1;
    const randomNumber = 999999;
    let result;
    let randomCount;
    const actualResult = convertArrayNumberToResult(actualCompareResult).map(val => val[0])
    // console.log('actual result......', actualResult)

    for (let i = count; i < randomNumber; i ++) {
        const randomResult = generateRandomResult({ randomNumberResult: 15, compareNumber: 8 });

        // if (isFalse(randomResult.compare.tx, actualResult.lastFive.tx)) {
            //     result = {
            //         tx: true,
            //         isFalse: true,
            //         result: randomResult.result.tx,
            //     }
            //     randomCount = i;
            //     break;
            // }

            if (isTrue(randomResult.compare.tx, actualResult)) {
                result = randomResult.result.tx
                randomCount = i;
                break;
            }
    }
    // console.log('random number:.....', randomCount)
    return ({
        result,
        randomCount
    });
}

export const intergrateTimeline = ({compareNumber}) => {
    let finalResult = [];
    let finalCount = 0;
    const lastThreeTestInput = convertArrayNumberToResult(slice(TEST_INPUT, TEST_INPUT.length - 3, TEST_INPUT.length)).map(item => item[0])
    // console.log('lastThreeTestInput.......', lastThreeTestInput)

    for(let i = 0; i < 99999999; i ++) {
        const firstTimeline = getCompareResult({ compareNumber, actualCompareResult: slice(TEST_INPUT, TEST_INPUT.length - compareNumber, TEST_INPUT.length) })
    const secondTimeline = getCompareResult({ compareNumber, actualCompareResult: slice(TEST_INPUT, TEST_INPUT.length - compareNumber - 1, TEST_INPUT.length - 1) })
    const thirdTimeline = getCompareResult({ compareNumber, actualCompareResult: slice(TEST_INPUT, TEST_INPUT.length - compareNumber - 2, TEST_INPUT.length - 2) })

    // console.log('.........', firstTimeline, secondTimeline, thirdTimeline)

    const firstTimelineResult = slice(firstTimeline.result, compareNumber, firstTimeline.result.length)
    const secondTimelineResult = slice(secondTimeline.result, compareNumber, secondTimeline.result.length)
    const thirdTimelineResult = slice(thirdTimeline.result, compareNumber, thirdTimeline.result.length)
    // console.log('all result timeline', firstTimelineResult, secondTimelineResult, thirdTimelineResult)
    // const lastThreeTestInput = convertArrayNumberToResult(slice(TEST_INPUT, TEST_INPUT.length - 3, TEST_INPUT.length)).map(item => item[0])
    // console.log('lastThreeTestInput.......', lastThreeTestInput)

    if(
        thirdTimelineResult[0] !== lastThreeTestInput[lastThreeTestInput.length - 3]
        && thirdTimelineResult[1] !== lastThreeTestInput[lastThreeTestInput.length - 2]
        && thirdTimelineResult[2] !== lastThreeTestInput[lastThreeTestInput.length - 1]
        && thirdTimelineResult[3] === firstTimelineResult[0]
        && thirdTimelineResult[4] === firstTimelineResult[1]
        && secondTimelineResult[0] !== lastThreeTestInput[lastThreeTestInput.length - 2]
        && secondTimelineResult[1] !== lastThreeTestInput[lastThreeTestInput.length - 1]
        && secondTimelineResult[2] === firstTimelineResult[0]
        && secondTimelineResult[3] === firstTimelineResult[1]
        && firstTimelineResult[0] !== lastThreeTestInput[lastThreeTestInput.length - 1]
    ) {
        finalResult = firstTimelineResult;
        finalCount = i
        break;
    }
    }

    return {finalResult, finalCount}

}
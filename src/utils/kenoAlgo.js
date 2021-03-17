import random from 'lodash/random'
import slice from 'lodash/slice'
import { findRenderedComponentWithType } from 'react-dom/test-utils'

export const TEST_INPUT = [
    80006, 40512, 86274, 83285, 41957, 54816, 28041, 99230, 24864, 78157, 81765, 18444, 57345, 7162, 55776, 83765, 43208, 15913, 64069, 24589
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

export const fromNumberToResult = (number) => {
    return number
        .toString()
        .split('')
        .reduce((acc, currentNumberStr) => acc + Number(currentNumberStr), 0)
}

export const convertArrayNumberToResult = arrayNumber => arrayNumber
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
        // && result1[7] !== result2[7]
        // && result1[8] !== result2[8]
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

export const intergrateTimeline = ({compareNumber, actualInput}) => {
    let finalResult = [];
    let finalCount = 0;
    let first, second, third;
    const lastThreeTestInput = convertArrayNumberToResult(slice(actualInput, actualInput.length - 3, actualInput.length)).map(item => item[0])
    // console.log('lastThreeTestInput.......', lastThreeTestInput, slice(actualInput, actualInput.length - compareNumber, actualInput.length))

    for(let i = 0; i < 99999999; i ++) {
        const firstTimeline = getCompareResult({ compareNumber, actualCompareResult: slice(actualInput, actualInput.length - compareNumber, actualInput.length) })
        const secondTimeline = getCompareResult({ compareNumber, actualCompareResult: slice(actualInput, actualInput.length - compareNumber - 1, actualInput.length - 1) })
        const thirdTimeline = getCompareResult({ compareNumber, actualCompareResult: slice(actualInput, actualInput.length - compareNumber - 2, actualInput.length - 2) })
        const fourthTimeline = getCompareResult({ compareNumber, actualCompareResult: slice(actualInput, actualInput.length - compareNumber - 3, actualInput.length - 3) })

    // console.log('.........', firstTimeline, secondTimeline, thirdTimeline)

    const firstTimelineResult = reverseTrue(slice(firstTimeline.result, compareNumber, firstTimeline.result.length))
    const secondTimelineResult = reverseTrue(slice(secondTimeline.result, compareNumber, secondTimeline.result.length))
    const thirdTimelineResult = reverseTrue(slice(thirdTimeline.result, compareNumber, thirdTimeline.result.length))
    const fourthTimelineResult = reverseTrue(slice(fourthTimeline.result, compareNumber, fourthTimeline.result.length))
    // console.log('all result timeline', firstTimelineResult, secondTimelineResult, thirdTimelineResult)
    // const lastThreeTestInput = convertArrayNumberToResult(slice(TEST_INPUT, TEST_INPUT.length - 3, TEST_INPUT.length)).map(item => item[0])
    // console.log('lastThreeTestInput.......', lastThreeTestInput)

    if(
        // thirdTimelineResult[0] !== lastThreeTestInput[lastThreeTestInput.length - 3]
        // && thirdTimelineResult[1] !== lastThreeTestInput[lastThreeTestInput.length - 2]
        // && thirdTimelineResult[2] !== lastThreeTestInput[lastThreeTestInput.length - 1]
        // && thirdTimelineResult[3] === firstTimelineResult[0]
        // && thirdTimelineResult[4] === firstTimelineResult[1]
        // && secondTimelineResult[0] !== lastThreeTestInput[lastThreeTestInput.length - 2]
        // && secondTimelineResult[1] !== lastThreeTestInput[lastThreeTestInput.length - 1]
        // && secondTimelineResult[2] === firstTimelineResult[0]
        // && secondTimelineResult[3] === firstTimelineResult[1]
        // && firstTimelineResult[0] !== lastThreeTestInput[lastThreeTestInput.length - 1]
        fourthTimelineResult[0] !== lastThreeTestInput[0]
        && fourthTimelineResult[1] !== lastThreeTestInput[1]
        && fourthTimelineResult[2] !== lastThreeTestInput[2]
        && thirdTimelineResult[0] !== lastThreeTestInput[1]
        && thirdTimelineResult[1] !== lastThreeTestInput[2]
        && secondTimelineResult[0] !== lastThreeTestInput[2]

        && fourthTimelineResult[3] === thirdTimelineResult[2]
        && thirdTimelineResult[2] === secondTimelineResult[1]
        && secondTimelineResult[1] === firstTimelineResult[0]

    ) {
        finalResult = firstTimelineResult;
        finalCount = i;
        first = firstTimelineResult
        second = secondTimelineResult
        third = thirdTimelineResult
        break;
    }
    }

    return {finalResult, finalCount, first, second, third}

}
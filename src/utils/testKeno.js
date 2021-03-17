import { TEST_INPUT, getCompareResult, reverseTrue, convertArrayNumberToResult, intergrateTimeline } from './kenoAlgo'
import slice from 'lodash/slice'
import random from 'lodash/random'
import { data, something } from './xosomb'

export const getPredictResult = () => {
    const totalTestcases = TEST_INPUT.length - 8 + 1;
    let totalWinCases = 0;
    let winAtFirst = 0;
    let winAtSecond = 0;
    let winAtThird = 0;
    let winAtFourth = 0;
    let winAtFifth = 0;
    let winAtSixth = 0;
    let winAtSeven = 0;
    // console.log('totalTestcases', totalTestcases)

    for(let i = 0; i < totalTestcases; i++) {
        const testResult = getCompareResult('TX', slice([...TEST_INPUT], i, i + 7));
        // console.log('testresult....', testResult)
        const compareResult = reverseTrue(slice(testResult.result.result, 7, testResult.result.result.length))
        // console.log('compareResult...', compareResult)
        const actualResultToTest = slice(TEST_INPUT, i + 9, i + 9 + 3)
        const actualResultToTestString = convertArrayNumberToResult(actualResultToTest).map(item => item[0])

        if (actualResultToTestString[0] === compareResult[0]) {
            totalWinCases += 1;
            winAtFirst += 1;
            continue;
        }

        if (actualResultToTestString[1] === compareResult[1]) {
            totalWinCases += 1;
            winAtSecond += 1;
            continue;
        }

        if (actualResultToTestString[2] === compareResult[2]) {
            totalWinCases += 1;
            winAtThird += 1;
            continue;
        }

        // if (actualResultToTestString[3] === compareResult[3]) {
        //     totalWinCases += 1;
        //     winAtFourth += 1;
        //     continue;
        // }

        // if (actualResultToTestString[4] === compareResult[4]) {
        //     totalWinCases += 1;
        //     winAtFifth += 1;
        //     continue;
        // }

        // if (actualResultToTestString[5] === compareResult[5]) {
        //     totalWinCases += 1;
        //     winAtSixth += 1;
        //     continue;
        // }

        // if (actualResultToTestString[6] === compareResult[6]) {
        //     totalWinCases += 1;
        //     winAtSeven += 1;
        //     continue;
        // }

    }

    return ({
        totalWinCases,
        winAtFirst,
        winAtSecond,
        winAtThird,
        winAtFourth,
        winAtFifth,
        winAtSixth,
        winAtSeven,
        totalTestcases,
        percenWin: totalWinCases / totalTestcases * 100,
        percentFirtWin: winAtFirst / totalTestcases * 100,
        percentSecondWin: winAtSecond / totalTestcases * 100,
        percentThirdWin: winAtThird / totalTestcases * 100,
        percentFourWin: winAtFourth / totalTestcases * 100,
        percentFiveWin: winAtFifth / totalTestcases * 100,
    })
}

export const justRandomResult = () => {
    const totalTestcases = TEST_INPUT.length - 8 + 1;
    let totalWinCases = 0;
    let winAtFirst = 0;
    let winAtSecond = 0;
    let winAtThird = 0;
    let winAtFourth = 0;
    let winAtFifth = 0;
    let winAtSixth = 0;
    let winAtSeven = 0;
    let winAtEight = 0;

    for(let i = 0; i < totalTestcases; i++) {
        const randomResults = Array.apply(null, {length: 3})
            .map(Function.call, () => random(0, 99999))
        const compareResult = convertArrayNumberToResult(randomResults).map(item => item[0])
        const actualResultToTest = slice(TEST_INPUT, i + 9, i + 9 + 3)
        console.log('actualResultToTest, actualResultToTest', actualResultToTest)
        const actualResultToTestString = convertArrayNumberToResult(actualResultToTest).map(item => item[0])

        if (actualResultToTestString[0] === compareResult[0]) {
            totalWinCases += 1;
            winAtFirst += 1;
            continue;
        }

        if (actualResultToTestString[1] === compareResult[1]) {
            totalWinCases += 1;
            winAtSecond += 1;
            continue;
        }

        if (actualResultToTestString[2] === compareResult[2]) {
            totalWinCases += 1;
            winAtThird += 1;
            continue;
        }

        // if (actualResultToTestString[3] === compareResult[3]) {
        //     totalWinCases += 1;
        //     winAtFourth += 1;
        //     continue;
        // }

        // if (actualResultToTestString[4] === compareResult[4]) {
        //     totalWinCases += 1;
        //     winAtFifth += 1;
        //     continue;
        // }

        // if (actualResultToTestString[5] === compareResult[5]) {
        //     totalWinCases += 1;
        //     winAtSixth += 1;
        //     continue;
        // }

        // if (actualResultToTestString[6] === compareResult[6]) {
        //     totalWinCases += 1;
        //     winAtSeven += 1;
        //     continue;
        // }

        // if (actualResultToTestString[7] === compareResult[7]) {
        //     totalWinCases += 1;
        //     winAtEight += 1;
        //     continue;
        // }

    }

    return ({
        totalWinCases,
        winAtFirst,
        winAtSecond,
        winAtThird,
        winAtFourth,
        winAtFifth,
        winAtSixth,
        winAtSeven,
        winAtEight,
        totalTestcases,
        percentWin: totalWinCases / totalTestcases * 100,
        percentFirtWin: winAtFirst / totalTestcases * 100,
        percentSecondWin: winAtSecond / totalTestcases * 100,
        percentThirdWin: winAtThird / totalTestcases * 100,
        percentFourWin: winAtFourth / totalTestcases * 100,
        percentFiveWin: winAtFifth / totalTestcases * 100,
    })
}

export const testLottery = () => {
    const dataTest = [...data].reverse();
    const totalTestcases = dataTest.length - 250 + 1;
    let totalWinCases = 0;
    let firstWinAt

    const randomResults = something({ total: 300, totalCompare: 250 })
    console.log('randomResults', randomResults)
    const compareResult = randomResults.result.result
    const test = slice(dataTest, 250, 300)
    console.log('test........', test, compareResult)
    for ( let i = 0; i < 50; i++) {
        if (compareResult[i] === test[i]) {
            totalWinCases += 1;
            firstWinAt = i
            continue;
        }

    }

    return ({
        totalWinCases,
        totalTestcases,
        firstWinAt,
        percentWin: totalWinCases / totalTestcases * 100,
    })
}

export const testLotteryRandom = () => {
    const dataTest = [...data].reverse();
    const totalTestcases = dataTest.length - 250 + 1;
    let totalWinCases = 0;
    let firstWinAt

    const compareResult = Array.apply(null, {length: 50})
    .map(Function.call, () => random(0, 99))
    const test = slice(dataTest, 250, 300)
    console.log('test........', test, compareResult)
    for ( let i = 0; i < 50; i++) {
        if (compareResult[i] === test[i]) {
            totalWinCases += 1;
            firstWinAt = i
            continue;
        }

    }

    return ({
        totalWinCases,
        totalTestcases,
        firstWinAt,
        percentWin: totalWinCases / totalTestcases * 100,
    })
}

export const testMultiTimeline = () => {
    const totalTestcases = TEST_INPUT.length - 8 + 1 - 3;
    let totalWinCases = 0;
    let winAtFirst = 0;
    let winAtSecond = 0;

    for(let i = 0; i < totalTestcases; i++) {
        const testResult = intergrateTimeline({compareNumber: 8, actualInput: slice([...TEST_INPUT], i, i + 12)});
        // console.log('testresult....', testResult)
        const compareResult = slice(testResult.finalResult, 1, testResult.finalResult.length)
        // console.log('compareResult...', compareResult)
        const actualResultToTest = slice(TEST_INPUT, i + 8, i + 8 + 3)
        const actualResultToTestString = convertArrayNumberToResult(actualResultToTest).map(item => item[0])

        if (actualResultToTestString[0] === compareResult[0]) {
            totalWinCases += 1;
            winAtFirst += 1;
            continue;
        }

        // if (actualResultToTestString[1] === compareResult[1]) {
        //     totalWinCases += 1;
        //     winAtSecond += 1;
        //     continue;
        // }

    }

    return ({
        totalWinCases,
        winAtFirst,
        winAtSecond,
        totalTestcases,
        percenWin: totalWinCases / totalTestcases * 100,
        percentFirtWin: winAtFirst / totalTestcases * 100,
    })
}
import random from 'lodash/random'
import slice from 'lodash/slice'

const TEST_INPUT = [
    // 77887,
    // 19298,
    // 19298,
    // 72591,
    // 39945,
    // 58059,
    // 46957,
    // 440,
    // 20480,
    // 43119,
    // 29019,
    // 81634,
    // 53288,
    // 14015,
    // 94317,
    // 81332,
    // 39618,
    // 11594,
    // 46115,
    // 84879,
    // 67671,
    // 29988,
    // 85219,
    // 5141,
    // 82555,
    // 40733,
    // 30992,
    // 37815,
    // 75441,
    // 49056,
    // 26026,
    // 24931,
    // 97111,
    // 5916,
    // 33730,
    // 52673,
    // 47345,
    // 4700,
    // 1854,
    // 80734,
    // 9502,
    // 49392,
    // 30851,
    // 52440,
    // 23810,
    // 81754,
    // 55804,
    // 6808,
    // 14562,
    // 31751,
    // 29565,
    // 37453,
    // 33564,
    // 69162,
    // 41276,
    // 14796,
    9874,
    97716,
    71615,
    78288,
    67278,
    6608,
    64824,
    49729,
    24434,
    55946,
    39468,
    55979
]

export const generateRandomResult = () => {
    const randomInputs = Array.apply(null, {length: 15})
        .map(Function.call, () => random(0, 99999))

    // console.log('randomInputs...........', randomInputs)
    
    const xxx = convertArrayNumberToResult(randomInputs);
    // console.log('convert to text......', xxx)
    return ({
        compare: {
            tx: slice([...xxx], 0, 15).map(val => val[0]),
            cl: slice([...xxx], 0, 5).map(val => val[1]),
        },
        result: {
            tx: slice([...xxx], 0, 15).map(val => val[0]),
            cl: slice([...xxx], 5, 10).map(val => val[1]),
        },
        origin: {

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
        && result1[8] !== result2[8]
        && result1[9] !== result2[9]
        && result1[10] !== result2[10]
        && result1[11] !== result2[11]
}

const isTrue = (result1, result2) => {
    return result1[0] === result2[0]
        && result1[1] === result2[1]
        && result1[2] === result2[2]
        && result1[3] === result2[3]
        && result1[4] === result2[4]
}

// const getActualResult

export const getCompareResult = (randomType) => {
    let count = 1;
    const randomNumber = 999999;
    let result;
    let randomCount;
    const actualResultArray = convertArrayNumberToResult(TEST_INPUT);
        // console.log('.....................actualResultArray.............', actualResultArray)
    const actualResult = {
        firtFive: {
            tx: slice([...actualResultArray], 0, 5).map(val => val[0]),
            cl: slice([...actualResultArray], 0, 5).map(val => val[1]),
        },
        lastFive: {
            tx: slice([...actualResultArray], 0, 12).map(val => val[0]),
            cl: slice([...actualResultArray], 5, 10).map(val => val[1]),
        }
    }
    console.log('actual result......', actualResult.lastFive.tx)

    for (let i = count; i < randomNumber; i ++) {
        const randomResult = generateRandomResult();

        if (randomType === 'TX') {
            if (isFalse(randomResult.compare.tx, actualResult.lastFive.tx)) {
                result = {
                    tx: true,
                    isFalse: true,
                    result: randomResult.result.tx,
                }
                randomCount = i;
                break;
            }
    
            // if (isTrue(randomResult.compare.tx, actualResult.lastFive.tx)) {
            //     result = {
            //         tx: true,
            //         isTrue: true,
            //         result: randomResult.result.tx,
            //     }
            //     randomCount = i;
            //     break;
            // }
        }

        if (randomType === 'CL') {
            // if (isFalse(randomResult.compare.cl, actualResult.firtFive.cl)) {
            //     result = {
            //         cl: true,
            //         isFalse: true,
            //         result: randomResult.result.cl,
            //     }
            //     randomCount = i;
            //     break;
            // }

            if (isFalse(randomResult.compare.cl, actualResult.firtFive.cl)) {
                result = {
                    cl: true,
                    isFalse: true,
                    result: randomResult.result.cl,
                }
                randomCount = i;
                break;
            }
        }
        
    }
    console.log('random number:.....', randomCount)
    return ({
        result,
        randomCount
    });
}
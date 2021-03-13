import random from 'lodash/random'
import slice from 'lodash/slice'

export const TEST_INPUT = [
    33018, 52815, 82395, 96450, 81859, 13444, 81899, 4615, 89412, 2544, 36737, 34766, 31973, 84278, 92932, 63796, 52276, 29168, 32246, 58140,
    15906, 41685, 29034, 20490, 72957, 66532, 55543, 80994, 86018, 90219, 58002, 4254, 55711, 97796, 79694,79509, 17135, 7708, 18712, 93907, 13592,
    1960, 62468, 64820, 47209, 82297, 5709, 43692, 93057, 3917,
    97796, 79694, 79509, 17135, 7708, 18712, 93907, 13592, 1960, 62468, 64820, 47209, 82297, 5709, 43692, 93057, 3917, 34163, 25220, 6803,

]

export const generateRandomResult = () => {
    const randomInputs = Array.apply(null, {length: 16})
        .map(Function.call, () => random(0, 99999))
    
    const xxx = convertArrayNumberToResult(randomInputs);
    // console.log('convert to text......', xxx)
    return ({
        compare: {
            tx: slice([...xxx], 0, 9).map(val => val[0]),
            cl: slice([...xxx], 0, 5).map(val => val[1]),
        },
        result: {
            tx: slice([...xxx], 0, 16).map(val => val[0]),
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
        && result1[8] === result2[8]
}

export const reverseTrue = trueCompareResult => trueCompareResult.map(res => res === 'T' ? 'X' : 'T');

// const getActualResult

// [...document.getElementById('tbRecentResult').querySelectorAll('tr')].map(item => item.childNodes[1].innerText).splice(1, 20)
// [...document.getElementById('tbRecentResult').querySelectorAll('tr')].map(item => item.childNodes[1].innerText).splice(1, 20).map(item => Number(item))

export const getCompareResult = (randomType) => {
    let count = 1;
    const randomNumber = 999999;
    let result;
    let randomCount;
    const actualResultArray = convertArrayNumberToResult(TEST_INPUT);
    const actualResult = {
        firtFive: {
            tx: slice([...actualResultArray], 0, 5).map(val => val[0]),
            cl: slice([...actualResultArray], 0, 5).map(val => val[1]),
        },
        lastFive: {
            tx: slice([...actualResultArray], TEST_INPUT.length - 9, TEST_INPUT.length).map(val => val[0]),
            cl: slice([...actualResultArray], 5, 10).map(val => val[1]),
        }
    }
    console.log('actual result......', actualResult.lastFive.tx)

    for (let i = count; i < randomNumber; i ++) {
        const randomResult = generateRandomResult();

        if (randomType === 'TX') {
            // if (isFalse(randomResult.compare.tx, actualResult.lastFive.tx)) {
            //     result = {
            //         tx: true,
            //         isFalse: true,
            //         result: randomResult.result.tx,
            //     }
            //     randomCount = i;
            //     break;
            // }

            if (isTrue(randomResult.compare.tx, actualResult.lastFive.tx)) {
                result = {
                    tx: true,
                    isFalse: true,
                    result: randomResult.result.tx,
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
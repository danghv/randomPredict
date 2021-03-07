import random from 'lodash/random'
import slice from 'lodash/slice'

const TEST_INPUT = [
    317,
    18953,
    25210,
    5458,
    8568,
    83979, 77728, 88123, 2022, 78195, 72682, 5883, 64541, 46458, 8933, 46574, 39677, 80553, 39553, 66919
]

export const generateRandomResult = () => {
    const randomInputs = Array.apply(null, {length: 12})
        .map(Function.call, () => random(0, 99999))
    
    const xxx = convertArrayNumberToResult(randomInputs);
    // console.log('convert to text......', xxx)
    return ({
        compare: {
            tx: slice([...xxx], 0, 7).map(val => val[0]),
            cl: slice([...xxx], 0, 5).map(val => val[1]),
        },
        result: {
            tx: slice([...xxx], 0, 12).map(val => val[0]),
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
}

const isTrue = (result1, result2) => {
    return result1[0] === result2[0]
        && result1[1] === result2[1]
        && result1[2] === result2[2]
        && result1[3] === result2[3]
        && result1[4] === result2[4]
}

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
            tx: slice([...actualResultArray], 5, 12).map(val => val[0]),
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
        }
    }
    console.log('random number:.....', randomCount)
    return ({
        result,
        randomCount
    });
}
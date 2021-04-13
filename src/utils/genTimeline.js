import {isNotNgauHam, whatNgauHam, isFiveOfAKind, isFourOfAKind, isThreeOfAKind, isStraight, isFullHouse, isOnePair, isTwoPair} from '../utils/convertToKeo';
import { breaks } from '../stores/break'

const checkTypeOfTimeline = (type, number) => {
    const numberFormat = number.split('').map(item => Number(item))
    if(type === 'TX') {
        return numberFormat.reduce((acc, curr) => acc + curr, 0) >= 23
            ? 'T'
            : 'X'
    }

    if(type === 'CL') {
        return numberFormat.reduce((acc, curr) => acc + curr, 0) % 2 === 0
            ? 'C'
            : 'L'
    }

    if(type === 'RH') {
        const tenThousand = number.split('')[0]
        const one = number.split('')[4]
        return tenThousand === one
            ? 'HOA'
            : (tenThousand > one ? 'R' : 'H')
    }

    if(type === 'NH') {
        const isNotNH = isNotNgauHam(number)
        if (isNotNH) {
            return 'Khong - Ngau'
        }
        
        return whatNgauHam(number)
    }

    if(type === 'Poker') {
        if(isFiveOfAKind(number)) {
            return '5 Con'
        }

        if(isFourOfAKind(number)) {
            return 'Tứ Quý'
        }

        if(isFullHouse(number)) {
            return 'Cù Lũ'
        }

        if(isStraight(number)) {
            return 'Sảnh'
        }

        if(isThreeOfAKind(number)) {
            return 'Sám Cô'
        }

        if(isTwoPair(number)) {
            return '2 Đôi'
        }

        if(isOnePair(number)) {
            return '1 Đôi'
        }
        
        return 'Số Rời'
    }

    if(type === 'ONE_TX') {
        return numberFormat[4] >= 5
            ? 'T'
            : 'X'
    }

    if(type === 'ONE_CL') {
        return numberFormat[4] % 2 === 0
            ? 'C'
            : 'L'
    }

    if(type === 'TEN_TX') {
        return numberFormat[3] >= 5
            ? 'T'
            : 'X'
    }

    if(type === 'TEN_CL') {
        return numberFormat[3] % 2 === 0
            ? 'C'
            : 'L'
    }

    if(type === 'HUNDRED_TX') {
        return numberFormat[2] >= 5
            ? 'T'
            : 'X'
    }

    if(type === 'HUNDRED_CL') {
        return numberFormat[2] % 2 === 0
            ? 'C'
            : 'L'
    }

    if(type === 'THOUSAND_TX') {
        return numberFormat[1] >= 5
            ? 'T'
            : 'X'
    }

    if(type === 'THOUSAND_CL') {
        return numberFormat[1] % 2 === 0
            ? 'C'
            : 'L'
    }

    if(type === 'TEN_THOUSAND_TX') {
        return numberFormat[0] >= 5
            ? 'T'
            : 'X'
    }

    if(type === 'TEN_THOUSAND_CL') {
        return numberFormat[0] % 2 === 0
            ? 'C'
            : 'L'
    }

}

export const convertResultToText = ({ type, data }) => {
    return data.map(number => checkTypeOfTimeline(type, number))
}

export const genTimeline = values => {
    const xxx = []
    let temp = {}
    let count = 0;

    values.forEach((value, index) => {
        if (index === 0) {
            temp['value1'] = value
        } else {
            if(value !== values[index - 1]) {
                if (count === 3) {
                    breaks.breakAtThree += 1;
                    // console.log(temp, count)
                }
                if (count === 4) {
                    breaks.breakAtFour += 1;
                    // console.log(temp, count)
                }
                if (count === 5) {
                    breaks.breakAtFive += 1;
                    // console.log(temp, count)
                }
                if (count === 6) {
                    breaks.breakAtSix += 1;
                    // console.log(temp, count)
                }
                if (count === 7) {
                    breaks.breakAtSeven += 1;
                    // console.log(temp, count)
                }
                if (count === 8) {
                    breaks.breakAtEight += 1;
                    // console.log(temp, count)
                }
                if (count === 9) {
                    breaks.breakAtNine += 1;
                    // console.log(temp, count)
                }
                if (count === 10) {
                    breaks.breakAtTen += 1;
                    // console.log(temp, count)
                }
                count = 0;
                xxx.push(temp)
                temp = {value1: value}
            } else if(value === values[index - 1] && Object.keys(temp).length === 6) {
                count += 1
                xxx.push(temp)
                temp = {value1: value}
            } else {
                count += 1
                const nextKey = `value${Object.keys(temp).length + 1}`
                temp[nextKey] = value
            }

            if(index === values.length - 1) {
                // console.log('i am here')
                xxx.push(temp)
                // temp = {value1: value}
            }
        }
    })

    return xxx;
}
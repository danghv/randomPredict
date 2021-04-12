import {isNotNgauHam, whatNgauHam, isFiveOfAKind, isFourOfAKind, isThreeOfAKind, isStraight, isFullHouse, isOnePair, isTwoPair} from '../utils/convertToKeo';

const data = [
    {
      value1: "R",
      value2: "R",
      value3: "R",
      value4: "R",
      value5: "R",
      value6: "R",
    },
    {
      value1: "R",
      value2: "R",
      value3: "R",
      value4: "R",
    },
    {
      value1: "R",
      value2: "R",
      value3: "R",
      value4: "R",
      value5: "R",
      value6: "R",
    },
  ];

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

}

export const convertResultToText = ({ type, data }) => {
    return data.map(number => checkTypeOfTimeline(type, number))
}

export const genTimeline = values => {
    const xxx = []
    let temp = {}

    values.forEach((value, index) => {
        if (index === 0) {
            temp['value1'] = value
        } else {
            if(value !== values[index - 1]) {
                xxx.push(temp)
                temp = {value1: value}
            } else if(value === values[index - 1] && Object.keys(temp).length === 6) {
                xxx.push(temp)
                temp = {value1: value}
            } else {
                const nextKey = `value${Object.keys(temp).length + 1}`
                temp[nextKey] = value
            }

            if(index === values.length - 1) {
                console.log('i am here')
                xxx.push(temp)
                // temp = {value1: value}
            }
        }
    })

    return xxx;
}
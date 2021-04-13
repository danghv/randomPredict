import uniq from 'lodash/uniq'

export const checkArrayConsecutive = (arr) => {
    return arr.every((item, index) => index === 0 || (item - 1) === arr[index -1])
  }

export const isOnePair = input => uniq(input.split('')).length === 4

export const isTwoPair = input => {
  const inputToArr = input.split('')

  return uniq(inputToArr).length === 3 && inputToArr.every(item => inputToArr.filter(num => num === item).length < 3)
}

export const isThreeOfAKind = input => {
  const inputToArr = input.split('')

  return uniq(inputToArr).length === 3 && inputToArr.some(item => inputToArr.filter(num => num === item).length === 3)
}

export const isDiscrete = input => {
  const inputToArr = input.split('').map(item => Number(item)).sort()

  return uniq(inputToArr).length === 5 && !checkArrayConsecutive(inputToArr)
}

export const isStraight = input => {
  const inputToArr = input.split('').map(item => Number(item)).sort()

  return uniq(inputToArr).length === 5 && checkArrayConsecutive(inputToArr)
}

export const isFiveOfAKind = input => uniq(input.split('')).length === 1

export const isFourOfAKind = input => {
  const inputToArr = input.split('')

  return uniq(inputToArr).length === 2 && inputToArr.some(item => inputToArr.filter(num => num === item).length === 4)
}

export const isFullHouse = input => {
  const inputToArr = input.split('')

  return uniq(inputToArr).length === 2 && !isFourOfAKind(input)
}

export const isNotNgauHam = input => {
  const arr = input.split('').map(item => Number(item))

  return (arr[0] + arr[1] + arr[2]) % 10 !== 0
        && (arr[0] + arr[1] + arr[3]) % 10 !== 0
        && (arr[0] + arr[1] + arr[4]) % 10 !== 0
        && (arr[0] + arr[2] + arr[3]) % 10 !== 0
        && (arr[0] + arr[2] + arr[4]) % 10 !== 0
        && (arr[0] + arr[3] + arr[4]) % 10 !== 0
        && (arr[1] + arr[2] + arr[3]) % 10 !== 0
        && (arr[1] + arr[2] + arr[4]) % 10 !== 0
        && (arr[1] + arr[3] + arr[4]) % 10 !== 0
        && (arr[2] + arr[3] + arr[4]) % 10 !== 0
}

export const whatNgauHam = input => {
    const arr = input.split('').map(item => Number(item))

    if ((arr[0] + arr[1] + arr[2]) % 10 === 0) {
        if(Math.abs(arr[3] + arr[4] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[3] + arr[4] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[3] + arr[4] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[3] + arr[4] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if ((arr[0] + arr[1] + arr[3]) % 10 === 0) {
        if(Math.abs(arr[2] + arr[4] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[2] + arr[4] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[2] + arr[4] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[2] + arr[4] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if ((arr[0] + arr[1] + arr[4]) % 10 !== 0) {
        if(Math.abs(arr[2] + arr[3] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[2] + arr[3] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[2] + arr[3] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[2] + arr[3] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if((arr[0] + arr[2] + arr[3]) % 10 === 0) {
        if(Math.abs(arr[1] + arr[4] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[1] + arr[4] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[1] + arr[4] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[1] + arr[4] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if((arr[0] + arr[2] + arr[4]) % 10 === 0) {
        if(Math.abs(arr[1] + arr[3] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[1] + arr[3] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[1] + arr[3] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[1] + arr[3] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if((arr[0] + arr[3] + arr[4]) % 10 === 0) {
        if(Math.abs(arr[1] + arr[2] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[1] + arr[2] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[1] + arr[2] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[1] + arr[2] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if((arr[1] + arr[2] + arr[3]) % 10 === 0) {
        if(Math.abs(arr[0] + arr[4] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[0] + arr[4] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[0] + arr[4] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[0] + arr[4] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if((arr[1] + arr[2] + arr[4]) % 10 === 0) {
        if(Math.abs(arr[0] + arr[3] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[0] + arr[3] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[0] + arr[3] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[0] + arr[3] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if((arr[1] + arr[3] + arr[4]) % 10 === 0) {
        if(Math.abs(arr[0] + arr[2] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[0] + arr[2] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[0] + arr[2] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[0] + arr[2] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }

    if((arr[2] + arr[3] + arr[4]) % 10 !== 0) {
        if(Math.abs(arr[0] + arr[1] - 10) > 4) {
            return 'Ngau - Tai'
        }

        if(Math.abs(arr[0] + arr[1] - 10) <= 4) {
            return 'Ngau - Xiu'
        }

        if((arr[0] + arr[1] - 10) % 2 === 0) {
            return 'Ngau - Chan'
        }

        if((arr[0] + arr[1] - 10) % 2 !== 0) {
            return 'Ngau - Le'
        }
    }
}
const initResult = {
    ones: {
        tx: 0,
        cl: 0,
        ht: 0,
    },
    tens: {
        tx: 0,
        cl: 0,
        ht: 0,
    },
    hundreds: {
        tx: 0,
        cl: 0,
        ht: 0,
    },
    thousands: {
        tx: 0,
        cl: 0,
        ht: 0,
    },
    tenThousands: {
        tx: 0,
        cl: 0,
        ht: 0,
    },
    squad: {
        tx: 0,
        cl: 0,
        rh: 0,
    },
    tientam: {
        tx: 0,
        cl: 0,
    },
    trungtam: {
        tx: 0,
        cl: 0,
    },
    hautam: {
        tx: 0,
        cl: 0,
    },
    con: {
        cl: 0,
    },
    cai: {
        cl: 0,
    }
}

export const randomPara = (actual, random) => {
    let result = initResult

    for(let i = 0; i < actual.length; i++) {
        const actualOnes = (actual[i] + '').split('')[4]
        const actualTens = (actual[i] + '').split('')[3]
        const actualHundreds = (actual[i] + '').split('')[2]
        const actualThousands = (actual[i] + '').split('')[1]
        const actualTenThousands = (actual[i] + '').split('')[0]
        const actualNumber = actual[i] + ''
        const actualNumberTotal = actualNumber.split('').reduce((acc, curr) => acc + Number(curr), 0)
        const actualTTTotal = (actual[i] + '').split('').slice(0, 3).reduce((acc, curr) => acc + Number(curr), 0)
        const actualTrTotal = (actual[i] + '').split('').slice(1, 4).reduce((acc, curr) => acc + Number(curr), 0)
        const actualHTTotal = (actual[i] + '').split('').slice(2, 5).reduce((acc, curr) => acc + Number(curr), 0)
        const actualConTotal = (actual[i] + '').split('')[2] + (actual[i] + '').split('')[4]
        const actualCaiTotal = (actual[i] + '').split('')[1] + (actual[i] + '').split('')[3]

        const randomOnes = (random[i] + '').split('')[4]
        const randomTens = (random[i] + '').split('')[3]
        const randomHundreds = (random[i] + '').split('')[2]
        const randomThousands = (random[i] + '').split('')[1]
        const randomTenThousands = (random[i] + '').split('')[0]
        const randomNumber = random[i] + ''
        const randomNumberTotal = randomNumber.split('').reduce((acc, curr) => acc + Number(curr), 0)
        const randomTTTotal = randomNumber.split('').slice(0, 3).reduce((acc, curr) => acc + Number(curr), 0)
        const randomTrTotal = randomNumber.split('').slice(1, 4).reduce((acc, curr) => acc + Number(curr), 0)
        const randomHTTotal = randomNumber.split('').slice(2, 5).reduce((acc, curr) => acc + Number(curr), 0)
        const randomConTotal = randomNumber.split('')[2] + randomNumber.split('')[4]
        const randomCaiTotal = randomNumber.split('')[1] + randomNumber.split('')[3]

        // console.log(actualNumberTotal, randomNumberTotal)

        // ones
        if (actualOnes % 2 !== randomOnes % 2) {
            result = {
                ...result,
                ones: {
                    ...result.ones,
                    cl: result.ones.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                ones: {
                    ...result.ones,
                    cl: 0,
                }
            }
        }

        if ((actualOnes > 4 && randomOnes <= 4) || (actualOnes <= 4 && randomOnes > 4)) {
            result = {
                ...result,
                ones: {
                    ...result.ones,
                    tx: result.ones.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                ones: {
                    ...result.ones,
                    tx: 0,
                }
            }
        }

        if ((['1', '2', '3', '5', '7'].includes(actualOnes) && ['0', '4', '6', '8', '9'].includes(randomOnes))
            || (['1', '2', '3', '5', '7'].includes(randomOnes) && ['0', '4', '6', '8', '9'].includes(actualOnes))) {
            result = {
                ...result,
                ones: {
                    ...result.ones,
                    ht: result.ones.ht + 1
                }
            }
        } else {
            result = {
                ...result,
                ones: {
                    ...result.ones,
                    ht: 0,
                }
            }
        }

        // tens
        if (actualTens % 2 !== randomTens % 2) {
            result = {
                ...result,
                tens: {
                    ...result.tens,
                    cl: result.tens.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                tens: {
                    ...result.tens,
                    cl: 0,
                }
            }
        }

        if ((actualTens > 4 && randomTens <= 4) || (actualTens <= 4 && randomTens > 4)) {
            result = {
                ...result,
                tens: {
                    ...result.tens,
                    tx: result.tens.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                tens: {
                    ...result.tens,
                    tx: 0,
                }
            }
        }

        if ((['1', '2', '3', '5', '7'].includes(actualTens) && ['0', '4', '6', '8', '9'].includes(randomTens))
            || (['1', '2', '3', '5', '7'].includes(randomTens) && ['0', '4', '6', '8', '9'].includes(actualTens))) {
            result = {
                ...result,
                tens: {
                    ...result.tens,
                    ht: result.tens.ht + 1
                }
            }
        } else {
            result = {
                ...result,
                tens: {
                    ...result.tens,
                    ht: 0,
                }
            }
        }

        // hundreds
        if (actualHundreds % 2 !== randomHundreds % 2) {
            result = {
                ...result,
                hundreds: {
                    ...result.hundreds,
                    cl: result.hundreds.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                hundreds: {
                    ...result.hundreds,
                    cl: 0,
                }
            }
        }

        if ((actualHundreds > 4 && randomHundreds <= 4) || (actualHundreds <= 4 && randomHundreds > 4)) {
            result = {
                ...result,
                hundreds: {
                    ...result.hundreds,
                    tx: result.hundreds.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                hundreds: {
                    ...result.hundreds,
                    tx: 0,
                }
            }
        }

        if ((['1', '2', '3', '5', '7'].includes(actualHundreds) && ['0', '4', '6', '8', '9'].includes(randomHundreds))
            || (['1', '2', '3', '5', '7'].includes(randomHundreds) && ['0', '4', '6', '8', '9'].includes(actualHundreds))) {
            result = {
                ...result,
                hundreds: {
                    ...result.hundreds,
                    ht: result.hundreds.ht + 1
                }
            }
        } else {
            result = {
                ...result,
                hundreds: {
                    ...result.hundreds,
                    ht: 0,
                }
            }
        }

        // thousands
        if (actualThousands % 2 !== randomThousands % 2) {
            result = {
                ...result,
                thousands: {
                    ...result.thousands,
                    cl: result.thousands.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                thousands: {
                    ...result.thousands,
                    cl: 0,
                }
            }
        }

        if ((actualThousands > 4 && randomThousands <= 4) || (actualThousands <= 4 && randomThousands > 4)) {
            result = {
                ...result,
                thousands: {
                    ...result.thousands,
                    tx: result.thousands.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                thousands: {
                    ...result.thousands,
                    tx: 0,
                }
            }
        }

        if ((['1', '2', '3', '5', '7'].includes(actualThousands) && ['0', '4', '6', '8', '9'].includes(randomThousands))
            || (['1', '2', '3', '5', '7'].includes(randomThousands) && ['0', '4', '6', '8', '9'].includes(actualThousands))) {
            result = {
                ...result,
                thousands: {
                    ...result.thousands,
                    ht: result.thousands.ht + 1
                }
            }
        } else {
            result = {
                ...result,
                thousands: {
                    ...result.thousands,
                    ht: 0,
                }
            }
        }

        // ten thousands
        if (actualTenThousands % 2 !== randomTenThousands % 2) {
            result = {
                ...result,
                tenThousands: {
                    ...result.tenThousands,
                    cl: result.tenThousands.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                tenThousands: {
                    ...result.tenThousands,
                    cl: 0,
                }
            }
        }

        if ((actualTenThousands > 4 && randomTenThousands <= 4) || (actualTenThousands <= 4 && randomTenThousands > 4)) {
            result = {
                ...result,
                tenThousands: {
                    ...result.tenThousands,
                    tx: result.tenThousands.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                tenThousands: {
                    ...result.tenThousands,
                    tx: 0,
                }
            }
        }

        if ((['1', '2', '3', '5', '7'].includes(actualTenThousands) && ['0', '4', '6', '8', '9'].includes(randomTenThousands))
            || (['1', '2', '3', '5', '7'].includes(randomTenThousands) && ['0', '4', '6', '8', '9'].includes(actualTenThousands))) {
            result = {
                ...result,
                tenThousands: {
                    ...result.tenThousands,
                    ht: result.tenThousands.ht + 1
                }
            }
        } else {
            result = {
                ...result,
                tenThousands: {
                    ...result.tenThousands,
                    ht: 0,
                }
            }
        }

        // squad
        if (actualNumberTotal % 2 !== randomNumberTotal % 2) {
            result = {
                ...result,
                squad: {
                    ...result.squad,
                    cl: result.squad.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                squad: {
                    ...result.squad,
                    cl: 0,
                }
            }
        }

        if ((actualNumberTotal > 22 && randomNumberTotal <= 22) || (actualNumberTotal <= 22 && randomNumberTotal > 22)) {
            result = {
                ...result,
                squad: {
                    ...result.squad,
                    tx: result.squad.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                squad: {
                    ...result.squad,
                    tx: 0,
                }
            }
        }

        if ((actualNumber[0] >= actualNumber[4] && randomNumber[0] < randomNumber[4])
            || (actualNumber[0] < actualNumber[4] && randomNumber[0] >= randomNumber[4])
        ) {
            result = {
                ...result,
                squad: {
                    ...result.squad,
                    rh: result.squad.rh + 1
                }
            }
        } else {
            result = {
                ...result,
                squad: {
                    ...result.squad,
                    rh: 0,
                }
            }
        }

        // tien tam
        if (actualTTTotal % 2 !== randomTTTotal % 2) {
            result = {
                ...result,
                tientam: {
                    ...result.tientam,
                    cl: result.tientam.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                tientam: {
                    ...result.tientam,
                    cl: 0,
                }
            }
        }

        if ((actualTTTotal >= 14 && randomTTTotal < 14) || (actualTTTotal < 14 && randomTTTotal >= 14)) {
            result = {
                ...result,
                tientam: {
                    ...result.tientam,
                    tx: result.tientam.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                tientam: {
                    ...result.tientam,
                    tx: 0,
                }
            }
        }

        // trung tam
        if (actualTrTotal % 2 !== randomTrTotal % 2) {
            result = {
                ...result,
                trungtam: {
                    ...result.trungtam,
                    cl: result.trungtam.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                trungtam: {
                    ...result.trungtam,
                    cl: 0,
                }
            }
        }

        if ((actualTrTotal >= 14 && randomTrTotal < 14) || (actualTrTotal < 14 && randomTrTotal >= 14)) {
            result = {
                ...result,
                trungtam: {
                    ...result.trungtam,
                    tx: result.trungtam.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                trungtam: {
                    ...result.trungtam,
                    tx: 0,
                }
            }
        }

        // hau tam
        if (actualHTTotal % 2 !== randomHTTotal % 2) {
            result = {
                ...result,
                hautam: {
                    ...result.hautam,
                    cl: result.hautam.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                hautam: {
                    ...result.hautam,
                    cl: 0,
                }
            }
        }

        if ((actualHTTotal >= 14 && randomHTTotal < 14) || (actualHTTotal < 14 && randomHTTotal >= 14)) {
            result = {
                ...result,
                hautam: {
                    ...result.hautam,
                    tx: result.hautam.tx + 1
                }
            }
        } else {
            result = {
                ...result,
                hautam: {
                    ...result.hautam,
                    tx: 0,
                }
            }
        }

        // con
        if (actualConTotal % 2 !== randomConTotal % 2) {
            result = {
                ...result,
                con: {
                    cl: result.con.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                con: {
                    cl: 0,
                }
            }
        }

        // cai
        if (actualCaiTotal % 2 !== randomCaiTotal % 2) {
            result = {
                ...result,
                cai: {
                    cl: result.cai.cl + 1
                }
            }
        } else {
            result = {
                ...result,
                cai: {
                    cl: 0,
                }
            }
        }

    }

    return result
}
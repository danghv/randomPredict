const random = require('lodash/random')
const slice = require('lodash/slice')

const DATA = [
    45587,
    95112,
    85439,
    47526,
    61639,
    97736,
    20859,
    38433,
    61918,
    66992,
    96100,
    63410,
    87462,
    91577,
    30398,
    26313,
    55600,
    35855,
    93315,
    17110,
    77708,
    57607,
    70030,
    11103,
    81910,
    5177,
    11503,
    56286,
    4629,
    38792,
    42991,
    25119,
    37427,
    48520,
    48218,
    76349,
    15759,
    54782,
    17386,
    71209,
    40169,
    92020,
    45756,
    33079,
    157,
    45883,
    57860,
    9264,
    21331,
    60545,
    23677,
    92549,
    55095,
    12046,
    68285,
    51338,
    2769,
    16592,
    5507,
    48146,
    82064,
    726,
    9854,
    90402,
    19376,
    42988,
    43132,
    20681,
    78885,
    42050,
    57905,
    63111,
    7690,
    85971,
    80287,
    36287,
    79993,
    80188,
    81613,
    27693,
    45188,
    20370,
    27054,
    12950,
    16363,
    61681,
    45776,
    8528,
    9945,
    46551,
    24835,
    92041,
    6320,
    9929,
    50553,
    59405,
    95549,
    29911,
    52117,
    74507,
    5104,
    83669,
    10764,
    23126,
    23071,
    72036,
    52664,
    843,
    61596,
    20561,
    92780,
    17017,
    88630,
    82093,
    41130,
    76818,
    28106,
    88287,
    44516,
    56842,
    37874,
    20047,
    46411,
    356,
    44571,
    96225,
    16921,
    53818,
    32461,
    97059,
    92610,
    57483,
    33136,
    7707,
    45538,
    77946,
    32436,
    43128,
    6125,
    48879,
    7043,
    90157,
    18225,
    62319,
    99469,
    14408,
    62428,
    77616,
    46266,
    25618,
    82094,
    52248,
    60541,
    9726,
    19665,
    34965,
    20823,
    80489,
    49797,
    99600,
    3418,
    64268,
    59323,
    96331,
    37546,
    17069,
    98018,
    87082,
    97711,
    87486,
    68757,
    5042,
    54004,
    20290,
    4170,
    89582,
    23030,
    32489,
    28463,
    51880,
    16129,
    81320,
    88000,
    22022,
    13853,
    1993,
    52085,
    15580,
    80180,
    45148,
    62557,
    56358,
    73783,
    78305,
    17448,
    76496,
    77882,
    67659,
    49316,
    47441,
    81535,
    57454,
    30880,
    95501,
    72437,
    30548,
    82147,
    57980,
    59514,
    42857,
    36852,
    40128,
    98628,
    83138,
    12958,
    43614,
    25375,
    18296,
    11617,
    2836,
    57611,
    86012,
    14362,
    45563,
    63717,
    91382,
    38931,
    71154,
    22508,
    57597,
    9592,
    20942,
    51088,
    30629,
    8834,
    6586,
    60814,
    24511,
    70102,
    44789,
    20508,
    28890,
    3116,
    77969,
    78091,
    83783,
    73860,
    25470,
    11070,
    77775,
    58827,
    61129,
    44435,
    67229,
    66720,
    36351,
    74236,
    1316,
    46982,
    80610,
    34062,
    67617,
    25127,
    18969,
    4630,
    38289,
    2517,
    94962,
    75952,
    36374,
    93761,
    51903,
    76634,
    63530,
    27570,
    56860,
    88039,
    18932,
    79913,
    76278,
    62500,
    79222,
    62323,
    83834,
    59964,
    97954,
    9913,
    6561,
    29154,
    67211,
    81779,
    98991,
    27298,
    58738,
    51265,
    96600,
    44554,
    76380,
    75146,
    41795
]

export const data = [
    87,
    12,
    39,
    26,
    39,
    36,
    59,
    33,
    18,
    92,
    0,
    10,
    62,
    77,
    98,
    13,
    0,
    55,
    15,
    10,
    8,
    7,
    30,
    3,
    10,
    77,
    3,
    86,
    29,
    92,
    91,
    19,
    27,
    20,
    18,
    49,
    59,
    82,
    86,
    9,
    69,
    20,
    56,
    79,
    57,
    83,
    60,
    64,
    31,
    45,
    77,
    49,
    95,
    46,
    85,
    38,
    69,
    92,
    7,
    46,
    64,
    26,
    54,
    2,
    76,
    88,
    32,
    81,
    85,
    50,
    5,
    11,
    90,
    71,
    87,
    87,
    93,
    88,
    13,
    93,
    88,
    70,
    54,
    50,
    63,
    81,
    76,
    28,
    45,
    51,
    35,
    41,
    20,
    29,
    53,
    5,
    49,
    11,
    17,
    7,
    4,
    69,
    64,
    26,
    71,
    36,
    64,
    43,
    96,
    61,
    80,
    17,
    30,
    93,
    30,
    18,
    6,
    87,
    16,
    42,
    74,
    47,
    11,
    56,
    71,
    25,
    21,
    18,
    61,
    59,
    10,
    83,
    36,
    7,
    38,
    46,
    36,
    28,
    25,
    79,
    43,
    57,
    25,
    19,
    69,
    8,
    28,
    16,
    66,
    18,
    94,
    48,
    41,
    26,
    65,
    65,
    23,
    89,
    97,
    0,
    18,
    68,
    23,
    31,
    46,
    69,
    18,
    82,
    11,
    86,
    57,
    42,
    4,
    90,
    70,
    82,
    30,
    89,
    63,
    80,
    29,
    20,
    0,
    22,
    53,
    93,
    85,
    80,
    80,
    48,
    57,
    58,
    83,
    5,
    48,
    96,
    82,
    59,
    16,
    41,
    35,
    54,
    80,
    1,
    37,
    48,
    47,
    80,
    14,
    57,
    52,
    28,
    28,
    38,
    58,
    14,
    75,
    96,
    17,
    36,
    11,
    12,
    62,
    63,
    17,
    82,
    31,
    54,
    8,
    97,
    92,
    42,
    88,
    29,
    34,
    86,
    14,
    11,
    2,
    89,
    8,
    90,
    16,
    69,
    91,
    83,
    60,
    70,
    70,
    75,
    27,
    29,
    35,
    29,
    20,
    51,
    36,
    16,
    82,
    10,
    62,
    17,
    27,
    69,
    30,
    89,
    17,
    62,
    52,
    74,
    61,
    3,
    34,
    30,
    70,
    60,
    39,
    32,
    13,
    78,
    0,
    22,
    23,
    34,
    64,
    54,
    13,
    61,
    54,
    11,
    79,
    91,
    98,
    38,
    65,
    0,
    54,
    80,
    46,
    95
]

// [...document.getElementsByClassName('kqbackground vien tb-phoi')].map(item => item.childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[3].childNodes[2].childNodes[1].innerText).map(item => Number(item.slice(3, 5)))
// [...document.getElementsByClassName('kqbackground vien tb-phoi')]
//     .map(item => item.childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[3])
//     .map(item => {
//     return ({
//         db: item.childNodes[2],
//         nhat: item.childNodes[3],
//         nhi: item.childNodes[4].innerText,
//     })
// })
const data1 = data.reverse();

const compareTwoArray = (arr1, arr2) => {
    // console.log('arr1....', arr1)
    const loop = arr1.length
    for(let i = 0; i < loop; i++) {
        if (arr1[i] === arr2[i]) {
            return false;
        }
    }

    return true;
}

export const something = ({
    total,
    totalCompare,

}) => {
    const randomNumber = 9999
    let randomCount = 0;
    let result;
    let count = 1;

    for (let i = count; i < randomNumber; i ++) {
        const randomInputs = Array.apply(null, {length: total})
            .map(Function.call, () => random(0, 99))
        const compareResult = compareTwoArray(slice(data1, data1.length - totalCompare, data1.length), randomInputs)
        // console.log('compareTwoArray(data, randomInputs)', compareResult, randomInputs)
        if (compareResult) {
            result = {
                result: slice(randomInputs, totalCompare, total),
            }
            randomCount = i;
            break;
        }
    }

    return {result, randomCount};
}

// const xxx = something({total: 300, totalCompare: 250 });
// console.log('xxx', xxx)
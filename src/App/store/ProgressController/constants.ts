export const letterScoreDistributions = {
  rus: [
    {
      letter: "а",
      score: 1,
      frequency: 12.4843945,
    },
    {
      letter: "б",
      score: 3,
      frequency: 62.8930818,
    },
    {
      letter: "в",
      score: 1,
      frequency: 22.0264317,
    },
    {
      letter: "г",
      score: 3,
      frequency: 58.8235294,
    },
    {
      letter: "д",
      score: 2,
      frequency: 33.557047,
    },
    {
      letter: "е",
      score: 1,
      frequency: 11.8343195,
    },
    {
      letter: "ё",
      score: 3,
      frequency: 2500,
    },
    {
      letter: "ж",
      score: 5,
      frequency: 106.382979,
    },
    {
      letter: "з",
      score: 5,
      frequency: 60.6060606,
    },
    {
      letter: "и",
      score: 1,
      frequency: 13.6054422,
    },
    {
      letter: "й",
      score: 4,
      frequency: 82.6446281,
    },
    {
      letter: "к",
      score: 2,
      frequency: 28.6532951,
    },
    {
      letter: "л",
      score: 2,
      frequency: 22.7272727,
    },
    {
      letter: "м",
      score: 2,
      frequency: 31.152648,
    },
    {
      letter: "н",
      score: 1,
      frequency: 14.9253731,
    },
    {
      letter: "о",
      score: 1,
      frequency: 9.11577028,
    },
    {
      letter: "п",
      score: 2,
      frequency: 35.5871886,
    },
    {
      letter: "р",
      score: 1,
      frequency: 21.141649,
    },
    {
      letter: "с",
      score: 1,
      frequency: 18.2815356,
    },
    {
      letter: "т",
      score: 1,
      frequency: 15.9744409,
    },
    {
      letter: "у",
      score: 2,
      frequency: 38.1679389,
    },
    {
      letter: "ф",
      score: 10,
      frequency: 384.615385,
    },
    {
      letter: "х",
      score: 5,
      frequency: 103.092784,
    },
    {
      letter: "ц",
      score: 5,
      frequency: 208.333333,
    },
    {
      letter: "ч",
      score: 5,
      frequency: 69.4444444,
    },
    {
      letter: "ш",
      score: 8,
      frequency: 136.986301,
    },
    {
      letter: "щ",
      score: 10,
      frequency: 277.777778,
    },
    {
      letter: "ъ",
      score: 10,
      frequency: 2500,
    },
    {
      letter: "ы",
      score: 4,
      frequency: 52.6315789,
    },
    {
      letter: "ь",
      score: 3,
      frequency: 57.4712644,
    },
    {
      letter: "э",
      score: 8,
      frequency: 312.5,
    },
    {
      letter: "ю",
      score: 8,
      frequency: 156.25,
    },
    {
      letter: "я",
      score: 3,
      frequency: 49.7512438,
    },
  ],
};

export const russianAlphabet = letterScoreDistributions.rus.map((item) => item.letter);

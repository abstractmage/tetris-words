export const letterScoreDistributions = {
  rus: [
    {
      letter: "а",
      score: 1,
    },
    {
      letter: "б",
      score: 3,
    },
    {
      letter: "в",
      score: 1,
    },
    {
      letter: "г",
      score: 3,
    },
    {
      letter: "д",
      score: 2,
    },
    {
      letter: "е",
      score: 1,
    },
    {
      letter: "ё",
      score: 3,
    },
    {
      letter: "ж",
      score: 5,
    },
    {
      letter: "з",
      score: 5,
    },
    {
      letter: "и",
      score: 1,
    },
    {
      letter: "й",
      score: 4,
    },
    {
      letter: "к",
      score: 2,
    },
    {
      letter: "л",
      score: 2,
    },
    {
      letter: "м",
      score: 2,
    },
    {
      letter: "н",
      score: 1,
    },
    {
      letter: "о",
      score: 1,
    },
    {
      letter: "п",
      score: 2,
    },
    {
      letter: "р",
      score: 1,
    },
    {
      letter: "с",
      score: 1,
    },
    {
      letter: "т",
      score: 1,
    },
    {
      letter: "у",
      score: 2,
    },
    {
      letter: "ф",
      score: 10,
    },
    {
      letter: "х",
      score: 5,
    },
    {
      letter: "ц",
      score: 5,
    },
    {
      letter: "ч",
      score: 5,
    },
    {
      letter: "ш",
      score: 8,
    },
    {
      letter: "щ",
      score: 10,
    },
    {
      letter: "ъ",
      score: 10,
    },
    {
      letter: "ы",
      score: 4,
    },
    {
      letter: "ь",
      score: 3,
    },
    {
      letter: "э",
      score: 8,
    },
    {
      letter: "ю",
      score: 8,
    },
    {
      letter: "я",
      score: 3,
    },
  ],
};

export const russianAlphabet = letterScoreDistributions.rus.map((item) => item.letter);

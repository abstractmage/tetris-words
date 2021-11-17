import russianWordsBase from 'russian-words';

export const russianWords = russianWordsBase.map((w) => w.trim()).sort();

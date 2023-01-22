import { typeOf } from './utils/core';

/**
 * Stopwords stripped away from queries and the index.
 */
const STOPWORDS_MAP = [
  'a',
  'able',
  'about',
  'above',
  'across',
  'after',
  'again',
  'against',
  'ain',
  'all',
  'am',
  'an',
  'and',
  'any',
  'are',
  'aren',
  "aren't",
  'as',
  'at',
  'be',
  'because',
  'been',
  'before',
  'being',
  'below',
  'between',
  'both',
  'but',
  'by',
  'can',
  'couldn',
  "couldn't",
  'd',
  'did',
  'didn',
  "didn't",
  'do',
  'does',
  'doesn',
  "doesn't",
  'doing',
  'don',
  "don't",
  'down',
  'during',
  'each',
  'few',
  'for',
  'from',
  'further',
  'had',
  'hadn',
  "hadn't",
  'has',
  'hasn',
  "hasn't",
  'have',
  'haven',
  "haven't",
  'having',
  'he',
  'her',
  'here',
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'how',
  'i',
  'if',
  'in',
  'into',
  'is',
  'isn',
  "isn't",
  'it',
  "it's",
  'its',
  'itself',
  'just',
  'll',
  'm',
  'ma',
  'me',
  'mightn',
  "mightn't",
  'more',
  'most',
  'mustn',
  "mustn't",
  'my',
  'myself',
  'needn',
  "needn't",
  'no',
  'nor',
  'not',
  'now',
  'o',
  'of',
  'off',
  'on',
  'once',
  'only',
  'or',
  'other',
  'our',
  'ours',
  'ourselves',
  'out',
  'over',
  'own',
  're',
  's',
  'same',
  'shan',
  "shan't",
  'she',
  "she's",
  'should',
  "should've",
  'shouldn',
  "shouldn't",
  'so',
  'some',
  'such',
  't',
  'than',
  'that',
  "that'll",
  'the',
  'their',
  'theirs',
  'them',
  'themselves',
  'then',
  'there',
  'these',
  'they',
  'this',
  'those',
  'through',
  'to',
  'too',
  'under',
  'until',
  'up',
  've',
  'very',
  'was',
  'wasn',
  "wasn't",
  'we',
  'were',
  'weren',
  "weren't",
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'won',
  "won't",
  'wouldn',
  "wouldn't",
  'y',
  'you',
  "you'd",
  "you'll",
  "you're",
  "you've",
  'your',
  'yours',
  'yourself',
  'yourselves',
].reduce((acc: Record<string, string>, word: string) => {
  acc[word] = word;
  return acc;
}, {});

/**
 * Returns all stopwords.
 */
export function getStopwords(): string[] {
  return Object.values(STOPWORDS_MAP);
}

/**
 * True if word is in the internal stopword map.
 */
export function hasStopword(word: string): boolean {
  return Boolean(STOPWORDS_MAP[word]);
}

/**
 * Adds additional stopwords to the internal map.
 */
export function addStopwords(words: string[] = []): void {
  if (!Array.isArray(words)) {
    throw new Error(
      `Expected array of stopwords but received ${typeOf(words)}`
    );
  }

  if (!words.length) return;

  for (const word of words) {
    if (!hasStopword(word)) {
      STOPWORDS_MAP[word] = word;
    }
  }
}

/**
 * True if word is a stopword or it's made up of only non-word chars
 */
export function isStopword(word: string): boolean {
  return hasStopword(word) || !word.match(/(\w+)/g);
}

/**
 * Removes all stopwords the provided text.
 */
export function stripStopwords(text: string): string {
  const result = [];

  for (const word of text.split(/\s+/g)) {
    if (isStopword(word)) continue;
    result.push(word);
  }

  return result.join(' ');
}

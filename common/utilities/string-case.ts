import flow from 'lodash/flow';
import kebabCase from 'lodash/kebabCase';
import replace from 'lodash/replace';
import toLower from 'lodash/toLower';
import upperFirst from 'lodash/upperFirst';

/** Branded type to distinguish a string in kamel-case capitalization */
export type KebabCaseString = string & { __brand: '@brand/kebab-case-string' };

/**
 * Converts the provided string to kebab-case
 *
 * @param s the string to convert
 * @example toKebabCase('Hello'); // 'hello'
 * toKebabCase('iAmInCamelCase'); // 'i-am-in-camel-case'
 * toKebabCase('am I a sentence?'); // 'am-i-a-sentence'
 */
export const toKebabCase = (s: string): KebabCaseString =>
  kebabCase(s) as KebabCaseString;

/**
 * Type guard for KebabCaseStrings; returns true if the provided string is
 * capitalized in kebab-case style
 *
 * @param s the string to check
 * @example isKebabCase('kebab'); // true
 * isKebabCase('kebab-string'); // true
 * isKebabCase('camelCaseString'); // false
 * isKebabCase('Title-Kebab'); // false
 */
export const isKebabCase = (s: string): s is KebabCaseString => {
  return toKebabCase(s) === s;
};

/** Branded type to distinguish a string in Sentence case capitalization */
export type SentenceCaseString = string & { __brand: '@brand/sentence-case-string' };

/**
 * Converts the provided string to Sentence case, preserving punctuation
 *
 * @param s the string to convert
 * @example toSentenceCase('hello'); // 'Hello'
 * toSentenceCase('iAmInCamelCase'); // 'I am in camel case'
 * toSentenceCase('am i kebab-case?'); // 'Am I kebab-case'
 */
export const toSentenceCase = (s: string): SentenceCaseString =>
  flow(
    toLower,
    upperFirst,
    // Re-capitalize "i" if it's standalone (e.g. "I am") or followed by an
    // apostrophe (e.g. "I'm going")
    (s1: string): string => replace(s1, / i(?=[ '])/g, ' I'),
  )(s) as SentenceCaseString;

/**
 * Type guard for SentenceCaseStrings; returns true if the provided string is
 * capitalized in Sentence case style
 *
 * @param s the string to check
 * @example isSentenceCase('Sentence'); // true
 * isSentenceCase('Full-on sentence case string'); // true
 * isSentenceCase('String that I wrote'); // true
 * isSentenceCase('camelCaseString'); // false
 * isSentenceCase('kebab-case-string'); // false
 */
export const isSentenceCase = (s: string): s is SentenceCaseString =>
  toSentenceCase(s) === s;

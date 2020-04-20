import kebabCase from 'lodash/kebabCase';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';

/** Branded type to distinguish a string in kamel-case capitalization */
export type KebabCaseString = string & { __brand: '@brand/kebab-case-string' };

/** Branded type to distinguish a string in Sentence case capitalization */
export type SentenceCaseString = string & { __brand: '@brand/sentence-case-string' };

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
  return kebabCase(s) === s;
};

/**
 * Type guard for SentenceCaseStrings; returns true if the provided string is
 * capitalized in Stence case style
 *
 * @param s the string to check
 * @example isSentenceCase('Sentence'); // true
 * isSentenceCase('Full-on sentence case string'); // true
 * isSentenceCase('camelCaseString'); // false
 * isSentenceCase('kebab-case-string'); // false
 */
export const isSentenceCase = (s: string): s is SentenceCaseString => {
  return upperFirst(lowerCase(s)) === s;
};

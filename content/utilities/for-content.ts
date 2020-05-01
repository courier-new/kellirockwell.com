import {
  KebabCaseString,
  SentenceCaseString,
  toKebabCase,
  toSentenceCase,
} from '../../common/utilities/string-case';

/**
 * Generates an object from the provided name containing the name, the name as
 * an anchor (kebab-case form of the name), and the name as a title (Sentence
 * case form of the name)
 *
 * @param name the identifying name to form the other title-related props from
 */
const generateTitleProps = <Name extends string>(
  name: Name,
): { anchor: KebabCaseString; name: Name; title: SentenceCaseString } => {
  /* eslint-disable jsdoc/require-jsdoc */
  return {
    anchor: toKebabCase(name),
    name,
    title: toSentenceCase(name),
  };
  /* eslint-enable jsdoc/require-jsdoc */
};

export default generateTitleProps;

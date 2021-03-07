import flatMap from 'lodash/flatMap';

import { KebabCaseString } from '../../common/utilities/string-case';
import { ContentSection } from './types';

/**
 * Traverses a list of potentially deeply nested section trees and returns a
 * flattened array of every section's anchor, using preorder traversal
 * (root, then left-to-right children), which should correspond to the order
 * that the sections appear in the DOM
 *
 * @param sections the list of sections to get the anchors for
 */
const flattenAllAnchors = (sections: ContentSection<string>[]): KebabCaseString[] =>
  flatMap(sections, (section) => {
    if (!section.subsections) {
      return [section.anchor];
    }
    return [section.anchor, ...flattenAllAnchors(section.subsections)];
  });

export default flattenAllAnchors;

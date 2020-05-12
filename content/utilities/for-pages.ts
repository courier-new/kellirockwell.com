import flatMap from 'lodash/flatMap';
import { ReactNode } from 'react';

import { Slug } from '../../common/constants/slugs';
import { KebabCaseString } from '../../common/utilities/string-case';
import ABOUT_ME_SECTIONS from '../about-me';
import CONFERENCES_SECTIONS from '../conferences';
import PROJECTS_SECTIONS from '../projects';
import { ContentSection } from './types';

/**
 * Traverses a list of potentially deeply nested section trees and returns a
 * flattened array of every section's anchor, using preorder traversal
 * (root, then left-to-right children), which should correspond to the order
 * that the sections appear in the DOM
 *
 * @param sections the list of sections to get the anchors for
 */
export const flattenAllAnchors = (
  sections: ContentSection<string>[],
): KebabCaseString[] =>
  flatMap(sections, (section) => {
    if (!section.subsections) {
      return [section.anchor];
    }
    return [section.anchor, ...flattenAllAnchors(section.subsections)];
  });

/**
 * Returns the appropriate array of `ContentSection`s for the given page slug,
 * or else an empty array if it's not for a known slug
 *
 * @param slug the `Slug` to get the page content for
 */
export const getSectionsForPage = (
  slug?: Slug | string,
): ContentSection<string, ReactNode>[] => {
  switch (slug) {
    case 'about-me':
      return ABOUT_ME_SECTIONS;
    case 'conferences':
      return CONFERENCES_SECTIONS;
    case 'projects':
      return PROJECTS_SECTIONS;
    default:
      return [];
  }
};

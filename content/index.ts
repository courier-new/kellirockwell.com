import { ReactNode } from 'react';

import { Slug } from '../constants/slugs';
import { ContentSection } from '../utilities/content-helpers';
import ABOUT_ME_SECTIONS from './about-me';
import CONFERENCES_SECTIONS from './conferences/index';
import PROJECTS_SECTIONS from './projects';

/**
 * Returns the appropriate array of `ContentSection`s for the given page slug,
 * or else an empty array
 *
 * @param slug the `Slug` to get the page content for
 */
const getSectionsForPage = (slug?: Slug): ContentSection<string, ReactNode>[] => {
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

export default getSectionsForPage;

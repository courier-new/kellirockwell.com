import { ReactNode } from 'react';
import { Slug } from '../constants/slugs';
import ABOUT_ME_SECTIONS from './about-me';
import CONFERENCES_SECTIONS from './conferences/index';
import PROJECTS_SECTIONS from './projects';
import { ContentSection } from '../utilities/content-helpers';

/**
 * Returns the appropriate array of `ContentSection`s for the given page slug
 *
 * @param slug the `Slug` to get the page content for
 */
const getSectionsForPage = (slug: Slug): ContentSection<string, ReactNode>[] => {
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

import filter from 'lodash/filter';
import flow from 'lodash/flow';
import reject from 'lodash/reject';

import {
  addNextUpLabels,
  Conference,
  groupByYears,
  hasPassed,
  sortByDate,
} from '../../api/conferences';
import generateTitleProps from '../utilities/for-content';
import { ContentSection } from '../utilities/types';

/**
 * Builder for roadmap content
 *
 * @param conferences array of `Conference`s to use to render the section content
 */
const buildInsideMyToolbox = (
  conferences: Conference[],
): ContentSection<
  'Roadmap' | 'Past',
  | JSX.Element
  | {
      conferences: Conference[];
    }
  | {
      pastConferences: {
        conferences: Conference[];
        year: string;
      }[];
    }
> => ({
  ...generateTitleProps('Roadmap'),
  content: {
    conferences: flow(
      (c: Conference[]): Conference[] => reject(c, hasPassed),
      (c: Conference[]): Conference[] => sortByDate(c),
      (c: Conference[]): Conference[] => addNextUpLabels(c),
    )(conferences),
  },
  subsections: [
    {
      ...generateTitleProps('Past'),
      content: {
        pastConferences: flow(
          (c: Conference[]): Conference[] => filter(c, hasPassed),
          (c: Conference[]): Conference[] => sortByDate(c, true),
          groupByYears,
        )(conferences),
      },
    },
  ],
});

export default buildInsideMyToolbox;

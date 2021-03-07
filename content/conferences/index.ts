import { Conference } from '../../api/conferences';
import { ContentSection } from '../utilities/types';
import buildJourneyToTheCenter from './journey-to-the-center';
import buildRoadmap from './roadmap';

type ConferencesSectionName =
  | 'Journey to the center of the community'
  | 'Resources'
  | 'Roadmap'
  | 'Past';

type ConferencesContentSection = ContentSection<
  ConferencesSectionName,
  | JSX.Element
  | { conferences: Conference[] }
  | { pastConferences: { conferences: Conference[]; year: string }[] }
>;

/**
 * Builder for conferences content
 *
 * @param conferences array of `Conference`s to use to build the "Roadmap" section
 */
const buildConferencesSections = (
  conferences: Conference[],
): ConferencesContentSection[] => [
  buildJourneyToTheCenter(conferences),
  buildRoadmap(conferences),
];

export default buildConferencesSections;

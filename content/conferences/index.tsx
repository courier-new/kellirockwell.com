import React from 'react';
import ROADMAP from './roadmap';
import JOURNEY_TO_THE_CENTER from './journey-to-the-center';
import { ContentSection, generateTitleProps } from '../../utilities/content-helpers';

type ConferencesSectionName =
  | 'Journey to the center of the community'
  | 'Resources'
  | 'Roadmap'
  | 'Current (2020)'
  | '2019';

type ConferencesContentSection = ContentSection<ConferencesSectionName, JSX.Element>;

const CONFERENCES_SECTIONS: ConferencesContentSection[] = [
  JOURNEY_TO_THE_CENTER,
  {
    ...generateTitleProps('Resources'),
    content: <p key="resources">Coming soon!</p>,
  },
  ROADMAP,
];

export default CONFERENCES_SECTIONS;

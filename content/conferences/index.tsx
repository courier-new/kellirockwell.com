import React from 'react';

import { ContentSection } from '../utilities/types';
import { Conference } from './Conference';
import JOURNEY_TO_THE_CENTER from './journey-to-the-center';
import ROADMAP from './roadmap';

type ConferencesSectionName =
  | 'Journey to the center of the community'
  | 'Resources'
  | 'Roadmap'
  | '2020'
  | '2019';

type ConferencesContentSection = ContentSection<
  ConferencesSectionName,
  JSX.Element | { conferences: Conference[] }
>;

const CONFERENCES_SECTIONS: ConferencesContentSection[] = [
  JOURNEY_TO_THE_CENTER,
  ROADMAP,
];

export default CONFERENCES_SECTIONS;

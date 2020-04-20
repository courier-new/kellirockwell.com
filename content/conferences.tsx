import { ContentSection } from '.';

type ConferencesAnchor =
  | 'journey-to-the-center-of-the-community'
  | 'resources'
  | 'roadmap'
  | 'current-(2020)'
  | '2019';

type ConferencesContentSection = ContentSection<ConferencesAnchor>;

const CONFERENCES_SECTIONS: ConferencesContentSection[] = [
  {
    anchor: 'journey-to-the-center-of-the-community',
    title: 'Journey to the center of the community',
  },
  { anchor: 'resources', title: 'Resources' },
  {
    anchor: 'roadmap',
    subsections: [
      { anchor: 'current-(2020)', title: 'Current (2020)' },
      { anchor: '2019', title: '2019' },
    ],
    title: 'Roadmap',
  },
];

export default CONFERENCES_SECTIONS;

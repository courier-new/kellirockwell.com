import { ContentSection } from '.';

type AboutMeAnchor =
  | 'by-the-numbers'
  | 'inside-my-toolbox'
  | 'the-roles-i-serve'
  | 'as-an-asynchronous-communicator'
  | 'as-a-developer-experience-hero'
  | 'as-a-state-management-manager'
  | 'as-an-equity-and-inclusion-advocate';

type AboutMeContentSection = ContentSection<AboutMeAnchor>;

const ABOUT_ME_SECTIONS: AboutMeContentSection[] = [
  { anchor: 'by-the-numbers', title: 'By the numbers' },
  { anchor: 'inside-my-toolbox', title: 'Inside my toolbox' },
  {
    anchor: 'the-roles-i-serve',
    subsections: [
      {
        anchor: 'as-an-asynchronous-communicator',
        title: 'As an asynchronous communicator',
      },
      {
        anchor: 'as-a-developer-experience-hero',
        title: 'As a developer experience hero',
      },
      { anchor: 'as-a-state-management-manager', title: 'As a state management manager' },
      {
        anchor: 'as-an-equity-and-inclusion-advocate',
        title: 'As an equity and inclusion advocate',
      },
    ],
    title: 'The roles I serve',
  },
];

export default ABOUT_ME_SECTIONS;

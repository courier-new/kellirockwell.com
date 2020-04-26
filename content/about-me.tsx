import { ContentSection, generateTitleProps } from '../utilities/content-helpers';

type AboutMeSectionName =
  | 'By the numbers'
  | 'Inside my toolbox'
  | 'The roles I serve'
  | 'As an asynchronous communicator'
  | 'As a developer experience hero'
  | 'As a state management manager'
  | 'As an equity and inclusion advocate';

type AboutMeContentSection = ContentSection<AboutMeSectionName>;

const ABOUT_ME_SECTIONS: AboutMeContentSection[] = [
  { ...generateTitleProps('By the numbers') },
  { ...generateTitleProps('Inside my toolbox') },
  {
    ...generateTitleProps('The roles I serve'),
    subsections: [
      { ...generateTitleProps('As an asynchronous communicator') },
      { ...generateTitleProps('As a developer experience hero') },
      { ...generateTitleProps('As a state management manager') },
      { ...generateTitleProps('As an equity and inclusion advocate') },
    ],
  },
];

export default ABOUT_ME_SECTIONS;

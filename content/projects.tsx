import { generateTitleProps, ContentSection } from '../utilities/content-helpers';

type ProjectSectionName =
  | 'Sutro'
  | 'Rivals'
  | 'Pilon'
  | 'Moment'
  | 'Kleiner-Perkins'
  | 'Cuwip 2018'
  | 'Ebay'
  | 'Duit';

type ProjectsContentSection = ContentSection<ProjectSectionName>;

const PROJECTS_SECTIONS: ProjectsContentSection[] = [
  { ...generateTitleProps('Sutro') },
  { ...generateTitleProps('Rivals') },
  { ...generateTitleProps('Pilon') },
  { ...generateTitleProps('Moment') },
  { ...generateTitleProps('Kleiner-Perkins') },
  { ...generateTitleProps('Cuwip 2018') },
  { ...generateTitleProps('Ebay') },
  { ...generateTitleProps('Duit') },
];

export default PROJECTS_SECTIONS;

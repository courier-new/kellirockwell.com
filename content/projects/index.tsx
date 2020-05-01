import generateTitleProps from '../utilities/for-content';
import { ContentSection } from '../utilities/types';

type ProjectSectionName =
  | 'Sutro'
  | 'Rivals'
  | 'Pilon'
  | 'Moment'
  | 'Kleiner-Perkins'
  | 'CUWiP 2018'
  | 'eBay'
  | 'Duit';

type ProjectsContentSection = ContentSection<ProjectSectionName>;

const PROJECTS_SECTIONS: ProjectsContentSection[] = [
  { ...generateTitleProps('Sutro') },
  { ...generateTitleProps('Rivals') },
  { ...generateTitleProps('Pilon') },
  { ...generateTitleProps('Moment') },
  { ...generateTitleProps('Kleiner-Perkins') },
  { ...generateTitleProps('CUWiP 2018') },
  { ...generateTitleProps('eBay') },
  { ...generateTitleProps('Duit') },
];

export default PROJECTS_SECTIONS;

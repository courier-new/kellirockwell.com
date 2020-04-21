import { ContentSection } from '.';

type ProjectsAnchor =
  | 'sutro'
  | 'rivals'
  | 'pilon'
  | 'moment'
  | 'kleiner-perkins'
  | 'cuwip-2018'
  | 'ebay'
  | 'duit';

type ProjectsContentSection = ContentSection<ProjectsAnchor>;

const PROJECTS_SECTIONS: ProjectsContentSection[] = [
  {
    anchor: 'sutro',
    title: 'Sutro',
  },
  {
    anchor: 'rivals',
    title: 'Rivals',
  },
  {
    anchor: 'pilon',
    title: 'Pilon',
  },
];

export default PROJECTS_SECTIONS;

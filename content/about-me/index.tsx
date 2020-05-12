import { ContentSection } from '../utilities/types';
import BY_THE_NUMBERS from './by-the-numbers';
import INSIDE_MY_TOOLBOX from './inside-my-toolbox';
import ROLES_I_SERVE from './roles-I-serve';

type AboutMeSectionName =
  | 'By the numbers'
  | 'Inside my toolbox'
  | 'The roles I serve'
  | 'As an asynchronous communicator'
  | 'As a developer experience hero'
  | 'As a state management manager'
  | 'As an equity and inclusion advocate';

type AboutMeContentSection = ContentSection<AboutMeSectionName, JSX.Element>;

const ABOUT_ME_SECTIONS: AboutMeContentSection[] = [
  BY_THE_NUMBERS,
  INSIDE_MY_TOOLBOX,
  ROLES_I_SERVE,
];

export default ABOUT_ME_SECTIONS;

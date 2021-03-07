import { Tool } from '../../api/tools';
import { ContentSection } from '../utilities/types';
import GET_TO_KNOW_ME from './get-to-know-me';
import buildInsideMyToolbox from './inside-my-toolbox';
import ROLES_I_SERVE from './roles-I-serve';

type AboutMeSectionName =
  | 'Get to know me'
  | 'Inside my toolbox'
  | 'The roles I serve'
  | 'As an asynchronous communicator'
  | 'As a developer experience hero'
  | 'As a state management manager'
  | 'As an equity and inclusion advocate';

type AboutMeContentSection = ContentSection<AboutMeSectionName, JSX.Element>;

/**
 * Builder for toolbox content
 *
 * @param tools array of `Tool`s to use to build the "Inside My Toolbox" section
 */
const buildAboutMeSections = (tools: Tool[]): AboutMeContentSection[] => [
  GET_TO_KNOW_ME,
  buildInsideMyToolbox(tools),
  ROLES_I_SERVE,
];

export default buildAboutMeSections;

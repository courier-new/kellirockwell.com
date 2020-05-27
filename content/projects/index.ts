import { DateTime, Interval } from 'luxon';

/** Union of team size strings */
export type TeamSize = '1' | '2-5' | '5-10' | '10-15' | '15-20';

/** Type representing a project's details */
export type Project = {
  /** List of string sentences of accomplishments on the project */
  accomplishments: string[];
  /** Dates the project ran, as a form of Interval or single DateTime */
  dates:
    | Interval
    | DateTime
    | {
        /** If the project is ongoing */
        end: 'current';
        /** The start DateTime for an ongoing project */
        start: DateTime;
      };
  /** Image path for the project's logo */
  logo: string;
  /** Name of the project */
  name: string;
  /** Accent color for this project */
  primaryColor: string;
  /** A sentence-length description of the project */
  shortDescription: string;
  /** List of single string tools used in the project */
  stack: string[];
  /** List of single string subject areas, high level tools, etc. as tags for
   * the project */
  tags: string[];
  /** Size of the project team */
  teamSize: TeamSize;
};

const PROJECTS: Project[] = [
  {
    accomplishments: [
      'Audited, overhauled, and maintained comprehensive technical documentation',
      'Architected new chemical recommendations engine and reading processor',
      'Reduced TypeScript compiler errors by 95% in large React Native codebase',
      'Automated collection of open source package licenses, presentation of GraphQL API consumer doc',
    ],
    dates: {
      end: 'current',
      start: DateTime.fromObject({ month: 7, year: 2019 }),
    },
    logo: 'none',
    name: 'Sutro',
    primaryColor: '#1E7F8E',
    shortDescription: 'A smart monitoring system for your pool or spa',
    stack: ['TypeScript', 'Elixir', 'GraphQL', 'React Native', 'PostgreSQL', 'AWS'],
    tags: ['IoT', 'Fullstack', 'API', 'Mobile', 'Data'],
    teamSize: '10-15',
  },
  {
    accomplishments: [
      'Scaled monolithic forums integration to support infinite scrolling, inline emojis, embedded media, and premium content upsells',
      'Defined high level API for switching sport team to handle deep links, UI skin, and data source',
      'Delivered proof of concept system for dynamically categorized push notifications',
      'Onboarded and mentored other developers to grow team to 3x',
    ],
    dates: {
      end: 'current',
      start: DateTime.fromObject({ month: 6, year: 2018 }),
    },
    logo: 'none',
    name: 'Rivals',
    primaryColor: '#093BBC',
    shortDescription: 'A network for pre-professional sports news',
    stack: ['TypeScript', 'React Native', 'Redux', 'Firebase', 'Ruby on Rails'],
    tags: ['Mobile', 'Fullstack', 'Subscription'],
    teamSize: '15-20',
  },
  {
    accomplishments: [
      'Leveraged system of branded types to distinguish types of string data in app',
      'Supplied comprehensive JSDoc comments for all exported entities',
    ],
    dates: DateTime.fromObject({ month: 3, year: 2020 }),
    logo: 'none',
    name: 'Pilon',
    primaryColor: '#ADADAD',
    shortDescription: 'A game for learning pi built for Pi Day 2020',
    stack: ['TypeScript', 'React', 'React Context', 'CSS-in-JS', 'Netlify'],
    tags: ['Personal', 'OSS'],
    teamSize: '1',
  },
];

export default PROJECTS;

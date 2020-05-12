import filter from 'lodash/filter';
import flow from 'lodash/flow';
import reject from 'lodash/reject';
import { DateTime, Interval } from 'luxon';

import generateTitleProps from '../utilities/for-content';
import {
  addDateLabels,
  CANCELLED,
  Conference,
  groupByYears,
  hasPassed,
  sortByDate,
  VIRTUAL,
} from './Conference';

/* eslint-disable jsdoc/require-jsdoc */
export const CONFERENCES: Conference[] = addDateLabels([
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 18, month: 6, year: 2020 }),
      DateTime.fromObject({ day: 19, month: 6, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'JSNation',
    website: 'https://live.jsnation.com/',
  },
  {
    date: DateTime.fromObject({ day: 26, month: 6, year: 2020 }),
    location: VIRTUAL,
    name: 'Prisma Day 2020',
    website: 'https://www.prisma.io/day/',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 1, month: 9, year: 2020 }),
      DateTime.fromObject({ day: 2, month: 9, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'CascadiaJS 2020',
    website: 'https://2020.cascadiajs.com',
  },
  {
    date: DateTime.fromObject({ day: 22, month: 2, year: 2020 }),
    label: CANCELLED,
    location: 'Tokyo, Japan',
    name: 'TSConf Japan 2020',
    website: 'https://tsconf.jp/2020',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 14, month: 4, year: 2020 }),
      DateTime.fromObject({ day: 16, month: 4, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'Remote Work Summit 2020',
    website: 'https://theremoteworksummit.com',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 16, month: 4, year: 2020 }),
      DateTime.fromObject({ day: 17, month: 4, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'MagnoliaJS 2020',
    website: 'https://magnoliajs.com',
  },
  {
    date: DateTime.fromObject({ day: 25, month: 4, year: 2020 }),
    location: VIRTUAL,
    name: 'Women of React',
    website: 'https://womenofreact.com',
  },
  {
    date: DateTime.fromObject({ day: 26, month: 4, year: 2020 }),
    location: VIRTUAL,
    name: 'Svelte Society Day',
    website: 'https://sveltesociety.dev/',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 1, month: 5, year: 2020 }),
      DateTime.fromObject({ day: 2, month: 5, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'Byteconf React 2020',
    website: 'https://bytesized.xyz/react-2020',
  },
  {
    date: DateTime.fromObject({ day: 6, month: 5, year: 2020 }),
    location: VIRTUAL,
    name: 'Github Satellite',
    website: 'https://githubsatellite.com',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 18, month: 5, year: 2020 }),
      DateTime.fromObject({ day: 22, month: 5, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'ESNext Conf 2020',
    website: 'https://esnextconf.com',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 27, month: 5, year: 2020 }),
      DateTime.fromObject({ day: 28, month: 5, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'Jamstack Conf 2020',
    website: 'https://jamstackconf.com',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 26, month: 5, year: 2020 }),
      DateTime.fromObject({ day: 29, month: 5, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'ForwardJS Ottawa',
    website: 'https://forwardjs.com',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 15, month: 7, year: 2020 }),
      DateTime.fromObject({ day: 17, month: 7, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'elm-conf',
    website: 'https://2020.elm-conf.com',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 20, month: 7, year: 2020 }),
      DateTime.fromObject({ day: 24, month: 7, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'ForwardJS SF',
    website: 'https://forwardjs.com',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 13, month: 8, year: 2020 }),
      DateTime.fromObject({ day: 14, month: 8, year: 2020 }),
    ),
    location: 'Salt Lake City, Utah, US',
    name: 'React Rally 2020',
    website: 'https://reactrally.com',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 27, month: 8, year: 2019 }),
      DateTime.fromObject({ day: 30, month: 8, year: 2019 }),
    ),
    location: 'Denver, Colorado, US',
    name: 'ElixirConf 2019',
    website: 'https://elixirconf.com/2019',
  },
  {
    date: DateTime.fromObject({ day: 11, month: 10, year: 2019 }),
    location: 'Seattle, Washington, US',
    name: 'TSConf 2019',
    website: 'https://tsconf.io',
  },
  {
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 7, month: 9, year: 2019 }),
      DateTime.fromObject({ day: 8, month: 9, year: 2019 }),
    ),
    location: 'Seattle, Washington, US',
    name: 'CascadiaJS 2019',
    website: 'https://2019.cascadiajs.com',
  },
]);
/* eslint-enable jsdoc/require-jsdoc */

export default {
  ...generateTitleProps('Roadmap'),
  content: {
    conferences: flow(
      (c: Conference[]): Conference[] => reject(c, hasPassed),
      (c: Conference[]): Conference[] => sortByDate(c),
    )(CONFERENCES),
  },
  subsections: [
    {
      ...generateTitleProps('Past'),
      content: {
        pastConferences: flow(
          (c: Conference[]): Conference[] => filter(c, hasPassed),
          (c: Conference[]): Conference[] => sortByDate(c, true),
          groupByYears,
        )(CONFERENCES),
      },
    },
  ],
};

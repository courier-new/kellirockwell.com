import React from 'react';
import { DateTime, Interval } from 'luxon';
import map from 'lodash/map';
import ConferenceCard from '../../common/components/ConferenceCard';
import { Conference, CANCELLED, VIRTUAL, addDateLabels } from './Conference';
import { generateTitleProps } from '../../utilities/content-helpers';

/**
 * Builds a <ul> of ConferenceCards for a list of conferences
 *
 * @param conferences the list of conferences to render to JSX
 * @param key a unique key for the <ul> item
 */
export const renderConferences = (
  conferences: Conference[],
  key: string,
): JSX.Element => {
  const conferenceListStyle = {
    gridGap: '20px',
    gridTemplateColumns:
      'calc(33% - 10px) minmax(30%, calc(33% - 10px)) calc(33% - 10px)',
  };
  return (
    <ul key={key} className="grid border-box padding-0" style={conferenceListStyle}>
      {map(conferences, (conference, index) => (
        <ConferenceCard key={`conference-${index}`} {...conference} />
      ))}
    </ul>
  );
};

/* eslint-disable jsdoc/require-jsdoc */
export const CONFERENCES_2020: Conference[] = addDateLabels([
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
    date: Interval.fromDateTimes(
      DateTime.fromObject({ day: 1, month: 5, year: 2020 }),
      DateTime.fromObject({ day: 2, month: 5, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'Byteconf React 2020',
    website: 'https://bytesized.xyz/react-2020',
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
      DateTime.fromObject({ day: 1, month: 9, year: 2020 }),
      DateTime.fromObject({ day: 2, month: 9, year: 2020 }),
    ),
    location: VIRTUAL,
    name: 'CascadiaJS 2020',
    website: 'https://2020.cascadiajs.com',
  },
]);

export const CONFERENCES_2019: Conference[] = addDateLabels([
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
      DateTime.fromObject({ day: 16, month: 4, year: 2019 }),
      DateTime.fromObject({ day: 17, month: 4, year: 2019 }),
    ),
    location: 'Seattle, Washington, US',
    name: 'CascadiaJS 2019',
    website: 'https://2019.cascadiajs.com',
  },
]);
/* eslint-enable jsdoc/require-jsdoc */

export default {
  ...generateTitleProps('Roadmap'),
  subsections: [
    {
      ...generateTitleProps('Current (2020)'),
      content: renderConferences(CONFERENCES_2020, 'conferences-2020'),
    },
    {
      ...generateTitleProps('2019'),
      content: renderConferences(CONFERENCES_2019, 'conferences-2019'),
    },
  ],
};

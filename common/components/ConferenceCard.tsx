import React, { FC } from 'react';
import { DateTime, Interval } from 'luxon';
import replace from 'lodash/replace';
import { Conference } from '../../content/conferences/Conference';

/**
 * Formats the conference date for display using the following rules:
 * 1) If the date is an Interval and the start and end date are from the same
 *    month and year, formats the Interval as "Month StartDay - EndDay, Year"
 * 2) If the date is an Interval and the start and end date are from the same
 *    year, formats the Interval as "StartMonth StartDay - EndMonth EndDay,
 *    Year"
 * 3) If the date is an Interval and neither of the above conditions are met, or
 *    if the date is just a single DateTime, formats the date as "(Start)Month
 *    (Start)Day, (Start)Year (- EndMonth EndDay, EndYear)"
 *
 * @param date the DateTime or Interval to format
 */
const formatDate = (date: DateTime | Interval): string => {
  if (Interval.isInterval(date)) {
    if (date.hasSame('year') && date.hasSame('month')) {
      return `${date.start.toFormat('LLLL')} ${date.toFormat('d')}, ${date.start.year}`;
    }
    if (date.hasSame('year')) {
      return `${date.toFormat('LLLL d')}, ${date.start.year}`;
    }
  }
  return date.toFormat('LLLL d, y');
};

/**
 * Strips out the protocol prefix from a website URL
 *
 * @param url the website URL to format
 */
// TODO: Use URL branded type
const formatURL = (url: string): string => replace(url, /https?:\/\//i, '');

/**
 * A component card block detailing info about a Conference
 */
const ConferenceCard: FC<Conference> = ({ date, name, location, website }) => {
  const formattedURL = formatURL(website);
  return (
    <>
      <li>{name}</li>
      <ul>
        <li>{formatDate(date)}</li>
        <li>{location}</li>
        <li>
          <a href={website} title={formattedURL}>
            {formattedURL}
          </a>
        </li>
      </ul>
    </>
  );
};

export default ConferenceCard;

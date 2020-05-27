import replace from 'lodash/replace';
import { DateTime, Interval } from 'luxon';
import React, { FC } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { FiLink } from 'react-icons/fi';
import { IoIosPin } from 'react-icons/io';

import {
  CANCELLED,
  Conference,
  hasPassed,
  NEXT,
  NOW,
} from '../../content/conferences/Conference';
import Tag from './Tag';

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
 *
 * @param conference the Conference to render
 */
const ConferenceCard: FC<Conference> = (conference) => {
  const { date, dateLabel, label, location, name, website } = conference;

  const opacityClass = hasPassed(conference) ? 'minimum-opacity' : '';

  // Regular label takes precedence over dateLabel in the UI
  const labelText = label || dateLabel;

  // Set the label style based on what sort of label text it is
  let labelClass = '';
  switch (labelText) {
    case CANCELLED:
      labelClass = 'background-raspberry';
      break;
    case NOW:
      labelClass = 'background-mauve';
      break;
    case NEXT:
      labelClass = 'background-turquoise';
      break;
    default:
      break;
  }

  return (
    <div className={`background-magnolia border-box flex-column ${opacityClass}`}>
      {labelText ? (
        <ConferenceCardLabel backgroundColorClass={labelClass} labelText={labelText} />
      ) : null}
      <div
        className={`${
          labelText ? 'padding-sm-top' : 'padding-med-top'
        } padding-med-h padding-med-bottom`}
      >
        <h3
          className="margin-0 padding-sm-bottom flex-row flex-align-center"
          style={{ height: 50 }}
        >
          {name}
        </h3>
        <ul className="no-default-bullets padding-0">
          <ConferenceCardDate formattedDate={formatDate(date)} />
          <ConferenceCardLocation location={location} />
          <ConferenceCardWebsite website={website} />
        </ul>
      </div>
    </div>
  );
};

const iconProps = {
  className: 'text-black',
};

/** A small tag-like label for a Conference */
const ConferenceCardLabel: FC<{ backgroundColorClass: string; labelText: string }> = ({
  backgroundColorClass,
  labelText,
}) => {
  return (
    <div style={{ alignSelf: 'center', marginTop: '-0.8em' }}>
      <Tag backgroundColorClass={backgroundColorClass} size="medium">
        {labelText}
      </Tag>
    </div>
  );
};

const TEXT_BREAK_LENGTH = 22;

/** Line of a ConferenceCard for the date */
const ConferenceCardDate: FC<{ formattedDate: string }> = ({ formattedDate }) => {
  const label = (
    <span className={formattedDate.length > TEXT_BREAK_LENGTH ? 'small' : ''}>
      {formattedDate}
    </span>
  );
  return <ConferenceCardLine icon={<AiFillCalendar {...iconProps} />} label={label} />;
};

/** Line of a ConferenceCard for the location */
const ConferenceCardLocation: FC<{ location: string }> = ({ location }) => {
  const label = (
    <span className={location.length > TEXT_BREAK_LENGTH ? 'small' : ''}>{location}</span>
  );
  return (
    <ConferenceCardLine icon={<IoIosPin {...iconProps} size="1.2em" />} label={label} />
  );
};

/** Line of a ConferenceCard for the website */
const ConferenceCardWebsite: FC<{ website: string }> = ({ website }) => {
  const formattedURL = formatURL(website);
  const linkAnchor = (
    <a
      className={formattedURL.length > TEXT_BREAK_LENGTH ? 'small' : ''}
      href={website}
      style={{ wordWrap: 'break-word' }}
      title={formattedURL}
    >
      {formattedURL}
    </a>
  );
  return (
    <ConferenceCardLine
      icon={<FiLink {...iconProps} size="1.2em" />}
      label={linkAnchor}
    />
  );
};

/** Line of a ConferenceCard, as an <li>, composed of an icon and label */
const ConferenceCardLine: FC<{ icon: JSX.Element; label: JSX.Element }> = ({
  icon,
  label,
}) => {
  return (
    <li className="flex-row padding-0 flex-align-center">
      <span
        className="flex-row flex-align-center flex-justify-center"
        style={{ marginRight: '5px', width: '1.4em' }}
      >
        {icon}
      </span>
      {label}
    </li>
  );
};

export default ConferenceCard;

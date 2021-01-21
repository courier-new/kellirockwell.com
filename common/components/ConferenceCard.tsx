import replace from 'lodash/replace';
import React, { FC } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { FiLink } from 'react-icons/fi';
import { IoIosPin } from 'react-icons/io';

import { CANCELLED, Conference, hasPassed, NEXT, NOW } from '../../api/conferences';
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
 * @param conference the `Conference` whose date to format
 */
const formatDate = (conference: Conference): string => {
  const { endDate, startDate } = conference;

  if (endDate) {
    if (startDate.year === endDate.year && startDate.month === endDate.month) {
      return `${startDate.toFormat('LLLL')} ${startDate.toFormat(
        'd',
      )} – ${endDate.toFormat('d')}, ${startDate.year}`;
    }
    if (startDate.year === endDate.year) {
      return `${startDate.toFormat('LLLL d')} – ${endDate.toFormat('LLLL d')}, ${
        startDate.year
      }`;
    }
  }
  return startDate.toFormat('LLLL d, y');
};

/**
 * Strips out the protocol prefix and any trailing slash from a website URL
 *
 * @param url the website URL to format
 */
// TODO: Use URL branded type
const formatURL = (url: string): string =>
  replace(replace(url, /https?:\/\/(www\.)?/i, ''), /\/$/, '');

/**
 * A component card block detailing info about a Conference
 *
 * @param conference the Conference to render
 */
const ConferenceCard: FC<Conference> = (conference) => {
  const { dateLabel, label, location, name, website } = conference;

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
    <div className="background-magnolia border-box flex-column">
      {labelText ? (
        <ConferenceCardLabel backgroundColorClass={labelClass} labelText={labelText} />
      ) : null}
      <div
        className={`${opacityClass} ${
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
          <ConferenceCardDate formattedDate={formatDate(conference)} />
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

/**
 * A small tag-like label for a Conference
 *
 * @param props the functional component props
 * @param props.backgroundColorClass the classname to set the background color
 * of the tag
 * @param props.labelText the text to display in this label
 */
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

/**
 * Line of a ConferenceCard for the date
 *
 * @param props the functional component props
 * @param props.formattedDate the date to display on this line
 */
const ConferenceCardDate: FC<{ formattedDate: string }> = ({ formattedDate }) => {
  const label = (
    <span className={formattedDate.length > TEXT_BREAK_LENGTH ? 'small' : ''}>
      {formattedDate}
    </span>
  );
  return <ConferenceCardLine icon={<AiFillCalendar {...iconProps} />} label={label} />;
};

/**
 * Line of a ConferenceCard for the location
 *
 * @param props the functional component props
 * @param props.location the location to display
 */
const ConferenceCardLocation: FC<{ location: string }> = ({ location }) => {
  const label = (
    <span className={location.length > TEXT_BREAK_LENGTH ? 'small' : ''}>{location}</span>
  );
  return (
    <ConferenceCardLine icon={<IoIosPin {...iconProps} size="1.2em" />} label={label} />
  );
};

/**
 * Line of a ConferenceCard for the website
 *
 * @param props the functional component props
 * @param props.website the website URL to display
 */
const ConferenceCardWebsite: FC<{ website: string }> = ({ website }) => {
  const formattedURL = formatURL(website);
  const linkAnchor = (
    <a
      className={formattedURL.length > TEXT_BREAK_LENGTH ? 'small' : ''}
      href={website}
      style={{ wordWrap: 'break-word' }}
      target="blank"
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

/**
 * Line of a ConferenceCard, as an <li>, composed of an icon and label
 *
 * @param props the functional component props
 * @param props.icon the `JSX.Element` to use for the icon of this line
 * @param props.label the `JSX.Element` to use for the label of this line
 */
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

import map from 'lodash/map';
import { DateTime, Interval } from 'luxon';
import React, { FC } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';

import { Project } from '../../content/projects';
import Tag from './Tag';

type ProjectCardProps = {
  /** The project to feature in this card */
  project: Project;
  /** String specification for spacing between tags featured in this card */
  tagSpacing: string;
};

/**
 * Formats a project date by its month and year.
 *
 * @param date the DateTime or Interval to format
 */
const formatDate = (
  date: Interval | DateTime | { end: 'current'; start: DateTime },
): string => {
  if (Interval.isInterval(date)) {
    return `${date.start.toFormat('LLL y')} - ${date.end.toFormat('LLL y')}`;
  }
  if (DateTime.isDateTime(date)) {
    return date.toFormat('LLL y');
  }
  return `${date.start.toFormat('LLL y')} - Current`;
};

/**
 * A mobile-oriented (vertical) project card block detailing info about a Project
 */
const VerticalProjectCard: FC<ProjectCardProps> = ({
  project: {
    accomplishments,
    dates,
    logo,
    name,
    primaryColor,
    shortDescription,
    stack,
    tags,
    teamSize,
  },
  tagSpacing,
}) => {
  return (
    <div className="full-width flex-column" key={`project-${name}`}>
      <div className="flex-1 padding-med" style={{ backgroundColor: primaryColor }}>
        {/* Row of logo, name, and description */}
        <div className="flex-row padding-sm-bottom flex-justify-start">
          <div
            className="flex-row flex-align-center flex-justify-center background-white circular"
            style={{ color: primaryColor, height: 70, width: 70 }}
          >
            {logo}
          </div>
          {/* Column of name and description */}
          <div className="flex-column padding-sm-left flex-1">
            <h2 className="margin-0 text-white" style={{ lineHeight: 1.5 }}>
              {name}
            </h2>
            <p className="margin-0 small text-white">{shortDescription}</p>
          </div>
        </div>
        {/* Rows of team and dates */}
        <div className="flex-row flex-align-center">
          <BsFillPeopleFill className="text-white padding-xs-right" size="1.2em" />
          <span className="text-white">{teamSize}</span>
        </div>
        <div className="flex-row flex-align-center padding-sm-bottom">
          <AiFillCalendar className="text-white padding-xs-right" size="1.2em" />
          <span className="text-white">{formatDate(dates)}</span>
        </div>
        {/* Row of tags */}
        <div className="flex-row flex-align-center flex-wrap">
          {map(tags, (tag) => (
            <Tag
              backgroundColorClass="background-high-opacity"
              key={tag}
              spacing={tagSpacing}
            >
              <span className="karla" style={{ color: primaryColor }}>
                #{tag}
              </span>
            </Tag>
          ))}
        </div>
      </div>
      <div className="background-white padding-med">
        <h5 className="margin-0 padding-sm-bottom">Stack</h5>
        <div className="flex-row flex-align-center flex-wrap padding-sm-bottom">
          {map(stack, (tool) => (
            <Tag key={tool} spacing={tagSpacing}>
              {tool}
            </Tag>
          ))}
        </div>
        <h5 className="margin-0 padding-sm-bottom">Accomplishments</h5>
        {map(accomplishments, (accomplishment) => (
          <p
            className="small margin-0-top margin-sm-bottom"
            key={accomplishment.substr(0, 15)}
          >
            {accomplishment}
          </p>
        ))}
      </div>
    </div>
  );
};

/** A project card block */
const ProjectCard: FC<ProjectCardProps & { orientation: 'vertical' | 'horizontal' }> = ({
  orientation,
  ...props
}) => (orientation === 'horizontal' ? null : <VerticalProjectCard {...props} />);

export default ProjectCard;

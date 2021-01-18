import Color from 'color';
import map from 'lodash/map';
import toUpper from 'lodash/toUpper';
import { DateTime, Interval } from 'luxon';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';

import { Project } from '../../content/projects';
import { useThemeState } from '../context/themeState';
import Tag from './Tag';

const LOGO_SIZE = 70;

/**
 * Custom hook to listen for changes in the site theme and return a darker
 * version of the provided color if the theme is set to "dark", otherwise
 * returns just the initial color
 *
 * @param initialColor the starting color, to be darkened
 */
const useDarkerColor = (initialColor: string): string => {
  const themeState = useThemeState();
  const [color, setColor] = useState<string>(initialColor);

  useEffect(() => {
    if (themeState?.theme === 'dark') {
      setColor(Color(initialColor).darken(0.4).hex());
    } else {
      setColor(initialColor);
    }
  }, [themeState, initialColor]);

  return color;
};

type ProjectCardProps = Project & {
  /** Overall size of the tags featured in this card */
  tagSize: 'small' | 'medium';
  /** String specification for spacing between tags featured in this card */
  tagSpacing: string;
};

type VerticalProjectCardProps = ProjectCardProps & {
  /** JSX that renders a logo icon for this project */
  logoComponent: JSX.Element;
};
type HorizontalProjectCardProps = VerticalProjectCardProps;

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
const VerticalProjectCard: FC<VerticalProjectCardProps> = ({
  accomplishments,
  dates,
  logoComponent,
  name,
  primaryColor,
  shortDescription,
  stack,
  tagSize,
  tagSpacing,
  tags,
  teamSize,
}) => (
  <div className="full-height full-width flex-column" key={`project-${name}`}>
    <div
      className="padding-med"
      id="project-card-heading"
      style={{ backgroundColor: primaryColor }}
    >
      {/* Row of logo, name, and description */}
      <div className="flex-row padding-sm-bottom flex-justify-start flex-align-start">
        <div
          className="flex-row flex-align-center flex-justify-center background-white circular margin-sm-top"
          style={{ color: primaryColor, height: LOGO_SIZE, width: LOGO_SIZE }}
        >
          {logoComponent}
        </div>
        {/* Column of name and description */}
        <div className="flex-column padding-sm-left flex-1">
          <h1
            className="karla font-bold text-white"
            style={{ lineHeight: 1, margin: '0.2em 0' }}
          >
            {name}
          </h1>
          <p className="margin-0 text-white">{shortDescription}</p>
        </div>
      </div>
      {/* Rows of team and dates */}
      <div className="flex-row flex-align-center padding-xs-bottom">
        <BsFillPeopleFill className="text-white padding-xs-right" size="1.8em" />
        <span className="text-white large">{teamSize}</span>
      </div>
      <div className="flex-row flex-align-center padding-med-bottom">
        <AiFillCalendar className="text-white padding-xs-right" size="1.8em" />
        <span className="text-white large">{formatDate(dates)}</span>
      </div>
      {/* Row of tags */}
      <div className="flex-row flex-align-center flex-wrap">
        {map(tags, (tag) => (
          <Tag
            backgroundColorClass="background-high-opacity"
            key={tag}
            size={tagSize}
            spacing={tagSpacing}
          >
            <span className="karla" style={{ color: primaryColor }}>
              #{tag}
            </span>
          </Tag>
        ))}
      </div>
    </div>
    <div className="background-white padding-med flex-1">
      <h3 className="text-black margin-0 padding-sm-bottom">Stack</h3>
      <div className="flex-row flex-align-center flex-wrap padding-sm-bottom">
        {map(stack, (tool) => (
          <Tag key={tool} size={tagSize} spacing={tagSpacing}>
            {tool}
          </Tag>
        ))}
      </div>
      <h3 className="text-black margin-0 padding-sm-bottom">Accomplishments</h3>
      {map(accomplishments, (accomplishment) => (
        <p className="margin-0-top margin-sm-bottom" key={accomplishment.substr(0, 15)}>
          {accomplishment}
        </p>
      ))}
    </div>
  </div>
);

/**
 * A desktop-oriented (horizontal) project card block detailing info about a Project
 */
const HorizontalProjectCard: FC<HorizontalProjectCardProps> = ({
  accomplishments,
  dates,
  logoComponent,
  name,
  primaryColor,
  shortDescription,
  stack,
  tagSize,
  tagSpacing,
  tags,
  teamSize,
}) => (
  <div className="full-width flex-row" key={`project-${name}`}>
    <div
      className="padding-med"
      id="project-card-heading"
      style={{ backgroundColor: primaryColor, width: 255 }}
    >
      {/* Row of logo, name, and description */}
      <div className="relative flex-row padding-sm-bottom flex-justify-start flex-align-start">
        <div
          className="flex-row flex-align-center flex-justify-center background-white circular margin-sm-top"
          style={{ color: primaryColor, height: LOGO_SIZE, width: LOGO_SIZE }}
        >
          {logoComponent}
        </div>
        {/* Column of name and description */}
        <div className="flex-column padding-sm-left flex-1">
          <h1
            className="karla font-bold text-white"
            style={{ lineHeight: 1, margin: '0.2em 0' }}
          >
            {name}
          </h1>
          <p className="margin-0 text-white">{shortDescription}</p>
        </div>
      </div>
      {/* Rows of team and dates */}
      <div className="flex-row flex-align-center padding-xs-bottom">
        <BsFillPeopleFill className="text-white padding-xs-right" size="1.8em" />
        <span className="text-white large">{teamSize}</span>
      </div>
      <div className="flex-row flex-align-center padding-med-bottom">
        <AiFillCalendar className="text-white padding-xs-right" size="1.8em" />
        <span className="text-white large">{formatDate(dates)}</span>
      </div>
      {/* Row of tags */}
      <div className="flex-row flex-align-center flex-wrap">
        {map(tags, (tag) => (
          <Tag
            backgroundColorClass="background-high-opacity"
            key={tag}
            size={tagSize}
            spacing={tagSpacing}
          >
            <span className="karla" style={{ color: primaryColor }}>
              #{tag}
            </span>
          </Tag>
        ))}
      </div>
    </div>
    <div className="background-white padding-med flex-1">
      <h3 className="text-black margin-0 padding-sm-bottom">Stack</h3>
      <div className="flex-row flex-align-center flex-wrap padding-sm-bottom">
        {map(stack, (tool) => (
          <Tag key={tool} size={tagSize} spacing={tagSpacing}>
            {tool}
          </Tag>
        ))}
      </div>
      <h3 className="text-black margin-0 padding-sm-bottom">Accomplishments</h3>
      {map(accomplishments, (accomplishment) => (
        <p className="margin-0-top margin-sm-bottom" key={accomplishment.substr(0, 15)}>
          {accomplishment}
        </p>
      ))}
    </div>
  </div>
);

type PlaceholderLogoProps = {
  /** The color of placeholder logo to show */
  color: string;
  /** The letter to display as the placeholder */
  letter: string;
};

/** A component to render for a project with no logo */
const PlaceholderLogo: FC<PlaceholderLogoProps> = ({ color, letter }) => (
  <span style={{ color, fontSize: 55, lineHeight: `${LOGO_SIZE}px` }}>
    {toUpper(letter)}
  </span>
);

/** A project card block */
const ProjectCard: FC<ProjectCardProps & { orientation: 'vertical' | 'horizontal' }> = ({
  logo,
  logoSizeFactor,
  orientation,
  ...props
}) => {
  const { name, primaryColor } = props;
  const logoComponent = logo ? (
    <div
      className="absolute width-0 height-0"
      style={{
        height: (logoSizeFactor || 1) * LOGO_SIZE,
        width: (logoSizeFactor || 1) * LOGO_SIZE,
      }}
    >
      <Image alt={`${name} logo`} className="absolute" layout="fill" src={logo} />
    </div>
  ) : (
    <PlaceholderLogo color={primaryColor} letter={name.charAt(0)} />
  );

  const themeModifiedPrimaryColor = useDarkerColor(primaryColor);

  const cardProps = {
    ...props,
    logoComponent,
    primaryColor: themeModifiedPrimaryColor,
  };

  return orientation === 'horizontal' ? (
    <HorizontalProjectCard {...cardProps} />
  ) : (
    <VerticalProjectCard {...cardProps} />
  );
};

export default ProjectCard;

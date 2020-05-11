import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import Link from 'next/link';
import React, { FC } from 'react';
import { MdNavigateNext } from 'react-icons/md';

import useDisplaySize from '../../common/hooks/useDisplaySize';
import generateTitleProps from '../utilities/for-content';
import { CANCELLED, Conference, hasPassed } from './Conference';
import { CONFERENCES_2019, CONFERENCES_2020 } from './roadmap';

/**
 * Tallies how many conferences I have attended based on the following criteria:
 * 1) The conference was not cancelled
 * 2) The conference finished happening
 * Plus 4 for past CUWiPS.
 *
 * @param conferences the list or list of lists of Conferences to count
 */
const countConferencesAttended = (conferences: Conference[] | Conference[][]): number =>
  filter(flatten(conferences), (conference) => {
    if (conference.label === CANCELLED) return false;
    return hasPassed(conference);
  }).length + 4; // Add 4 for CUWiPs

/** The content for the Journey-to-the-center section of the Conferences page */
const JourneyContent: FC<{}> = () => {
  const [displaySize] = useDisplaySize();

  let twoColumns = true;
  let statWidth: 'small' | 'large' = 'small';
  if (displaySize === 'MOBILE' || displaySize === 'SMALL') {
    twoColumns = false;
    statWidth = 'large';
  }

  let paddingClass = '';
  switch (displaySize) {
    case 'MEDIUM':
      paddingClass = 'padding-med-left';
      break;
    case 'LARGE':
      paddingClass = 'padding-lg-left';
      break;
    case 'XLARGE':
      paddingClass = 'padding-xl-left';
      break;
    default:
      break;
  }

  return (
    <React.Fragment key="journey">
      <div className={twoColumns ? 'flex-row' : 'flex-column'}>
        <div className="flex-column" style={{ flexShrink: 2 }}>
          {/* Margin behaves differently in flex-box and margins below h3 and above
          paragraphs are not merged */}
          <h3 className="margin-0-bottom">My personal roadmap</h3>
          {/* Maintain padding between this column and the section beneath it, which
          is raised up with negative margin */}
          <p className={twoColumns ? 'padding-lg-bottom' : ''}>
            I attended my first tech conference in August of 2019. Since then, I’ve been
            documenting my personal conferences roadmap, cataloguing the conferences I
            attend, the resources I enjoy, and the challenges of navigating this space as
            a diffident introvert.
          </p>
        </div>
        <div
          className={`flex-column ${paddingClass}`}
          // Enforce minimum width but allow expansion on larger screens
          style={{ flexBasis: '50%', minWidth: 220 }}
        >
          {/* Margin behaves differently in flex-box and margins below h3 and above
          paragraphs are not merged */}
          <h3 className="margin-0-bottom">Conference stats</h3>
          <ul className="padding-0-h no-default-bullets">
            <ConferenceStat
              stat={countConferencesAttended([CONFERENCES_2020, CONFERENCES_2019])}
              statClass="text-raspberry"
              statLabel="attended"
              statWidth={statWidth}
            />
            <ConferenceStat
              stat={1}
              statClass="text-cheddar"
              statLabel="organized for"
              statWidth={statWidth}
            />
            <ConferenceStat
              stat={1}
              statClass="text-turquoise"
              statLabel="volunteered at"
              statWidth={statWidth}
            />
            <ConferenceStat
              stat={0}
              statClass="text-space"
              statLabel="spoken at"
              statWidth={statWidth}
            />
          </ul>
        </div>
      </div>
      {/* Raise up this section in two column orientation to cut down on whitespace */}
      <div style={{ marginTop: twoColumns ? '-2em' : undefined }}>
        <Link href="/conferences/why-I-love-conferences">
          <a
            className="large flex-row flex-align-center"
            title="Why do I love conferences?"
          >
            Why do I love conferences?
            <MdNavigateNext className="text-space" />
          </a>
        </Link>
        <style jsx>
          {`
            .unavailable {
              cursor: not-allowed;
            }
          `}
        </style>
        <span className="unavailable minimum-opacity flex-wrap flex-row flex-align-center">
          <a className="large">Resources for conference-goers</a>
          <MdNavigateNext className="large text-space" />
          <span className="xsmall text-space">(Coming soon!)</span>
        </span>
      </div>
    </React.Fragment>
  );
};

type ConferenceStatProps = {
  /** The actual stat number */
  stat: number;
  /** The class (for color) to apply to the stat number */
  statClass: string;
  /** The label for the stat */
  statLabel: string;
  /** The size for the box containing the stat number, to change spacing */
  statWidth: 'small' | 'large';
};

/** A component that builds an <li> for a given stat about conference participation */
const ConferenceStat: FC<ConferenceStatProps> = ({
  stat,
  statClass,
  statLabel,
  statWidth,
}) => (
  <li className="flex-row flex-align-center">
    <h2
      className={`${statClass} margin-0 padding-0 text-align-center yeseva-one`}
      style={{ lineHeight: '1.4em', width: statWidth === 'small' ? 40 : 80 }}
    >
      {stat}
    </h2>
    <span className="large">{statLabel}</span>
  </li>
);

export default {
  ...generateTitleProps('Journey to the center of the community'),
  content: <JourneyContent key="journey" />,
};

import capitalize from 'lodash/capitalize';
import flow from 'lodash/flow';
import join from 'lodash/join';
import map from 'lodash/map';
import split from 'lodash/split';
import Link from 'next/link';
import React, { FC } from 'react';

import { Slug, SLUGS } from '../constants/slugs';

type MainNavigationProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
};

/**
 * Renders an <li> element with link for a provided slug, applying additional
 * formatting to the link to the screen that is currently open
 *
 * @param slug the url slug to render a link for
 * @param index the index of the current link
 * @param active 'active' if the screen that is currently open corresponds to
 * the current slug, otherwise undefined
 */
const renderLink = (slug: Slug, index: number, active?: 'active'): JSX.Element => {
  const linkText = flow([
    (s: Slug): string[] => split(s, '-'), // Split into words along dashes
    (w: string[]): string[] => map(w, capitalize), // Capitalize each word
    (w: string[]): string => join(w, ' '), // Rejoin words
  ])(slug);
  return (
    <li className="text-magnolia" key={index}>
      <style jsx>
        {`
          h4 {
            line-height: 23px;
            margin: 0;
            margin-bottom: 23px;
            transition: all 0.3s;
          }

          h4.active {
            font-size: 1.6em;
            font-weight: bold;
          }
        `}
      </style>
      <Link href={`/${slug}`}>
        <a className="text-magnolia no-decoration" title={linkText}>
          <h4 className={active}>{linkText}</h4>
        </a>
      </Link>
    </li>
  );
};

/**
 * Renders a <ul> element of links for the list of provided slugs
 *
 * @param slugs the list of url slugs to render links for
 * @param activePage the slug corresponding to the screen that is currently open
 */
const renderLinks = (slugs: readonly Slug[], activePage: Slug): JSX.Element => (
  <ul className="no-default-bullets padding-0 margin-0">
    {map(slugs, (slug, index) =>
      slug === activePage ? renderLink(slug, index, 'active') : renderLink(slug, index),
    )}
  </ul>
);

/**
 * Component for primary navigation links.
 */
const MainNavigation: FC<MainNavigationProps> = ({ activePage }) => (
  <>
    <nav>{renderLinks(SLUGS, activePage)}</nav>
  </>
);

export default MainNavigation;

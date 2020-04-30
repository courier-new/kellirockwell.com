import capitalize from 'lodash/capitalize';
import flow from 'lodash/flow';
import join from 'lodash/join';
import map from 'lodash/map';
import split from 'lodash/split';
import Link from 'next/link';
import React, { FC } from 'react';

import { Slug, SLUGS } from '../../constants/slugs';

type MainNavMenuProps = {
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
  const linkClass = active ? 'font-bold' : '';
  const linkText = flow([
    (s: Slug): string[] => split(s, '-'), // Split into words along dashes
    (w: string[]): string[] => map(w, capitalize), // Capitalize each word
    (w: string[]): string => join(w, ' '), // Rejoin words
  ])(slug);
  return (
    <li className="text-magnolia" key={index}>
      <Link href={`/${slug}`}>
        <a title={linkText} className={`${linkClass} text-magnolia`}>
          {linkText}
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
  <ul>
    {map(slugs, (slug, index) =>
      slug === activePage ? renderLink(slug, index, 'active') : renderLink(slug, index),
    )}
  </ul>
);

/**
 * Component for primary navigation bar with nav links on left side of screen.
 */
const MainNavMenu: FC<MainNavMenuProps> = ({ activePage }) => {
  return (
    <nav className="flex-align-center flex-justify-center sidebar-width padding-med background-maastricht text-magnolia">
      [IMAGE]
      <h6 className="text-turquoise">Kelli Rockwell</h6>
      {renderLinks(SLUGS, activePage)}
    </nav>
  );
};

export default MainNavMenu;

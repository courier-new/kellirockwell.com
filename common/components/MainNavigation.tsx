import map from 'lodash/map';
import Link from 'next/link';
import React, { FC } from 'react';

import { Slug, SLUGS } from '../constants/slugs';
import { toTitleCase } from '../utilities/string-case';

type MainNavigationProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
};

/**
 * Renders an <li> element with link for a provided slug, applying additional
 * formatting to the link to the screen that is currently open
 *
 * @param slug the url slug to render a link for
 * @param active 'active' if the screen that is currently open corresponds to
 * the current slug, otherwise undefined
 */
const renderLink = (slug: Slug, active?: 'active'): JSX.Element => {
  const linkText = toTitleCase(slug);
  return (
    <li key={slug}>
      <style jsx>
        {`
          h4 {
            line-height: 23px;
            margin: 0;
            margin-bottom: 23px;
            transition: color 300ms ease 0s;
          }

          h4:hover {
            transition: color 100ms ease 0s;
          }

          h4.active {
            font-size: 1.6em;
            font-weight: bold;
          }
        `}
      </style>
      <Link href={`/${slug}`}>
        <a title={linkText}>
          <h4 className={`${active} text-magnolia`}>{linkText}</h4>
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
    {map(slugs, (slug) =>
      slug === activePage ? renderLink(slug, 'active') : renderLink(slug),
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

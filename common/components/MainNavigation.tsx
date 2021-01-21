import map from 'lodash/map';
import Link from 'next/link';
import React, { FC } from 'react';

import { Slug } from '../constants/slugs';
import { toTitleCase } from '../utilities/string-case';

type MainNavigationProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
};

type NavLink = { route?: string; slug: Slug | string };

/**
 * Renders an <li> element with link for a provided slug, applying additional
 * formatting to the link to the screen that is currently open
 *
 * @param link the `NavLink` to render a link for
 * @param active true if the screen that is currently open corresponds to
 * the current slug, otherwise undefined
 */
const renderLink = (link: NavLink, active = false): JSX.Element => {
  const linkText = toTitleCase(link.slug);
  return (
    <li key={link.slug}>
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
      <Link href={link.route || `/${link.slug}`}>
        <a target={link.route ? 'blank' : undefined} title={linkText}>
          <h4 className={`${active ? 'active' : ''} text-magnolia`}>{linkText}</h4>
        </a>
      </Link>
    </li>
  );
};

/**
 * Renders a <ul> element of links for the list of provided slugs
 *
 * @param links the list of page `NavLink`s to render links for
 * @param activePage the slug corresponding to the screen that is currently open
 */
const renderLinks = (links: readonly NavLink[], activePage: Slug): JSX.Element => (
  <ul className="no-default-bullets padding-0 margin-0">
    {map(links, (link) => renderLink(link, link.slug === activePage))}
  </ul>
);

/**
 * Component for primary navigation links.
 *
 * @param props the functional component props
 * @param props.activePage the url slug corresponding to the screen that is
 * currently open
 */
const MainNavigation: FC<MainNavigationProps> = ({ activePage }) => (
  <>
    <nav>
      {renderLinks(
        [
          { slug: 'about-me' },
          { slug: 'projects' },
          { route: '/files/kelli-rockwell-resume-2021.pdf', slug: 'resume' },
          { slug: 'conferences' },
        ],
        activePage,
      )}
    </nav>
  </>
);

export default MainNavigation;

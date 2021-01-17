import map from 'lodash/map';
import Link from 'next/link';
import React, { FC } from 'react';

import { flattenAllAnchors } from '../../content/utilities/for-pages';
import { ContentSection } from '../../content/utilities/types';

type SideNavMenuProps = {
  /** The index corresponding to section of the screen containing the current
   * scroll position */
  activeSectionIndex: number;
  /** The sections of content on the screen to represent in the nav menu */
  contentSections: ContentSection<string>[];
};

/**
 * Renders an <li> element with link for a provided section anchor, applying
 * conditional formatting to the link that corresponds to the section of the
 * screen containing the current scroll position, and nested navigation for any
 * sections nested within it
 *
 * @param contentSection the screen section to render a link for
 * @param activeSection the section corresponding to the current scroll position
 * @param level the level that this link is nested at, used to compute padding
 */
const renderLink = (
  { anchor, subsections, title }: ContentSection<string>,
  activeSection: string,
  level = 1,
): JSX.Element | null => {
  const isActiveSection = anchor === activeSection;
  const paddingAmount = 1.5 * level;

  const subsectionNavigation = subsections
    ? renderNavigation(subsections, activeSection, level + 1)
    : null;

  return (
    <li key={anchor}>
      <style jsx>
        {`
          .side-nav-link {
            border-bottom-color: transparent;
            border-left-color: ${isActiveSection ? undefined : 'transparent'};
            border-left-style: solid;
            border-right-color: transparent;
            border-top-color: transparent;
            padding-left: ${paddingAmount}em;
            transition: color 300ms ease 0s;
          }

          .side-nav-link:hover {
            transition: color 100ms ease 0s;
          }
        `}
      </style>
      <Link href={`#${anchor}`}>
        <a
          className="border-color-sapphire no-box-shadow flex-row padding-xs-v side-nav-link"
          title={title}
        >
          {title}
        </a>
      </Link>
      {subsectionNavigation}
    </li>
  );
};

/**
 * Renders a <ul> element of links for the current screen's sections
 *
 * @param sections the list of sections to render navigation for
 * @param activeSection the section corresponding to the current scroll position
 * @param level the level that this link is nested at, used to compute padding
 * at the individual link level
 */
const renderNavigation = (
  sections: ContentSection<string>[],
  activeSection: string,
  level = 1,
): JSX.Element => (
  <ul className="no-default-bullets padding-0 margin-0">
    {map(sections, (section) => renderLink(section, activeSection, level))}
  </ul>
);

/**
 * Component for secondary (same-page) navigation bar with nav links on right
 * side of screen.
 */
const SideNavMenu: FC<SideNavMenuProps> = ({ activeSectionIndex, contentSections }) => {
  const flattenedSectionAnchors = flattenAllAnchors(contentSections);
  const activeSectionAnchor = flattenedSectionAnchors[activeSectionIndex];

  return (
    <nav className="flex-align-center flex-justify-center full-width background-magnolia padding-sm-right padding-med-left padding-lg-v border-box main-column-size">
      {renderNavigation(contentSections, activeSectionAnchor)}
    </nav>
  );
};

export default SideNavMenu;

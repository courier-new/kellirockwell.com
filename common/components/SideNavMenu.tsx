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
 * @param index the index of the current section
 * @param activeSection the section corresponding to the current scroll position
 * @param level the level that this link is nested at, used to compute padding
 */
const renderLink = (
  { anchor, subsections, title }: ContentSection<string>,
  index: number,
  activeSection: string,
  level = 1,
): JSX.Element | null => {
  const isActiveSection = anchor === activeSection;
  const paddingAmount = 1.5 * level;
  const linkStyle: React.CSSProperties = {
    // TODO: replace hardcoded color
    borderLeft: `2px solid ${isActiveSection ? '#17179f' : 'transparent'}`,
    paddingLeft: `${paddingAmount}em`,
    transition: 'all 0.2s',
  };

  const subsectionNavigation = subsections
    ? renderNavigation(subsections, activeSection, level + 1)
    : null;

  return (
    <li key={index}>
      <Link href={`#${anchor}`}>
        <a
          className="no-decoration flex-row padding-xs-v"
          style={linkStyle}
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
    {map(sections, (section, index) => renderLink(section, index, activeSection, level))}
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

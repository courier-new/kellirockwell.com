import React, { FC } from 'react';
import map from 'lodash/map';
import flatMap from 'lodash/flatMap';
import Link from 'next/link';
import { ContentSection } from '../../content';

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
 * @param param0 the screen section to render a link for
 * @param index the index of the current section
 * @param activeSection the section corresponding to the current scroll position
 */
const renderLink = (
  { anchor, subsections, title }: ContentSection<string>,
  index: number,
  activeSection: string,
): JSX.Element => {
  const linkClass = anchor === activeSection ? 'font-bold' : 'font-normal';
  const subsectionNavigation = subsections
    ? renderNavigation(subsections, activeSection)
    : null;
  return (
    <li key={index} className={linkClass}>
      <Link href={`#${anchor}`}>
        <a title={title}>{title}</a>
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
 */
const renderNavigation = (
  sections: ContentSection<string>[],
  activeSection: string,
): JSX.Element => (
  <ul className="no-default-bullets">
    {map(sections, (section, index) => renderLink(section, index, activeSection))}
  </ul>
);

/**
 * Traverses a list of potentially deeply nested section trees and returns a
 * flattened array of every section's anchor, using preorder traversal
 * (root, then left-to-right children), which should correspond to the order
 * that the sections appear in the DOM
 *
 * @param sections the list of sections to get the anchors for
 */
const flattenAllAnchors = (sections: ContentSection<string>[]): string[] =>
  flatMap(sections, (section) => {
    if (!section.subsections) {
      return [section.anchor];
    }
    return [section.anchor, ...flattenAllAnchors(section.subsections)];
  });

/**
 * Component for secondary (same-page) navigation bar with nav links on right
 * side of screen.
 */
const SideNavMenu: FC<SideNavMenuProps> = ({ activeSectionIndex, contentSections }) => {
  const flattenedSectionAnchors = flattenAllAnchors(contentSections);
  const activeSectionAnchor = flattenedSectionAnchors[activeSectionIndex];
  return (
    <nav className="flex-align-center flex-justify-center background-light sidebar-width padding-med">
      {renderNavigation(contentSections, activeSectionAnchor)}
    </nav>
  );
};

export default SideNavMenu;

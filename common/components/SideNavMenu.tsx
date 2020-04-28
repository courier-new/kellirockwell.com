import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import map from 'lodash/map';
import Link from 'next/link';
import { ContentSection, flattenAllAnchors } from '../../utilities/content-helpers';

type SideNavMenuProps = {
  /** The index corresponding to section of the screen containing the current
   * scroll position */
  activeSectionIndex: number;
  /** The sections of content on the screen to represent in the nav menu */
  contentSections: ContentSection<string>[];
  /** Handler to fire on route hash change to recalculate the section index.
   * "onScroll" event does not consistently fire when following a hash link to
   * a same-page anchor, so we hook into the Next router's event instead to
   * manually recalculate the section index */
  recalculateSectionIndex?: () => void;
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
): JSX.Element | null => {
  const linkClass = anchor === activeSection ? 'font-bold' : 'font-normal';
  const subsectionNavigation = subsections
    ? renderNavigation(subsections, activeSection)
    : null;
  return (
    <li key={index}>
      <Link href={`#${anchor}`}>
        <a title={title} className={linkClass}>
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
 */
const renderNavigation = (
  sections: ContentSection<string>[],
  activeSection: string,
): JSX.Element => (
  <ul>{map(sections, (section, index) => renderLink(section, index, activeSection))}</ul>
);

/**
 * Component for secondary (same-page) navigation bar with nav links on right
 * side of screen.
 */
const SideNavMenu: FC<SideNavMenuProps> = ({
  activeSectionIndex,
  contentSections,
  recalculateSectionIndex,
}) => {
  const flattenedSectionAnchors = flattenAllAnchors(contentSections);
  const activeSectionAnchor = flattenedSectionAnchors[activeSectionIndex];

  const router = useRouter();

  useEffect(() => {
    if (recalculateSectionIndex) {
      router.events.on('hashChangeStart', recalculateSectionIndex);

      return (): void => router.events.off('hashChangeStart', recalculateSectionIndex);
    }
    return undefined;
  });

  return (
    <nav className="flex-align-center flex-justify-center background-magnolia sidebar-width padding-med">
      {renderNavigation(contentSections, activeSectionAnchor)}
    </nav>
  );
};

export default SideNavMenu;

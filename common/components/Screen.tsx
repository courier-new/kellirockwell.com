import React, { PropsWithChildren } from 'react';
import MainNavMenu from './MainNavMenu';
import { Slug } from '../../constants/slugs';
import SideNavMenu from './SideNavMenu';
import { ContentSection } from '../../content';

type ScreenProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
  /** Represents the sections of content on the screen and the index of the
   * current section */
  contentSections?: {
    /** The index of the section corresponding to the current scroll position */
    currentSectionIndex: number;
    /** The sections of the screen */
    sections: ContentSection<string>[];
    /** Handler to fire on route hash change to recalculate the section index.
     * "onScroll" event does not consistently fire when following a hash link to
     * a same-page anchor, so we hook into the Next router's event instead to
     * manually recalculate the section index */
    recalculateSectionIndex?: () => void;
  };
};

/**
 * Outermost wrapper component for screens. Presents main and side menu
 * navigation and adjusts layout to display size.
 */
const Screen = React.forwardRef<HTMLDivElement, PropsWithChildren<ScreenProps>>(
  ({ activePage, children, contentSections }, ref) => (
    <div className="full-width full-height flex-row non-scrollable">
      <MainNavMenu activePage={activePage} />
      <main className="flex-1 flex-column scrollable-y" ref={ref}>
        {children}
      </main>
      {contentSections ? (
        <SideNavMenu
          activeSectionIndex={contentSections.currentSectionIndex}
          contentSections={contentSections.sections}
          recalculateSectionIndex={contentSections.recalculateSectionIndex}
        />
      ) : null}
    </div>
  ),
);

export default Screen;

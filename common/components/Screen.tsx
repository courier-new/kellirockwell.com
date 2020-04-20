import React, { PropsWithChildren } from 'react';
import MainNavMenu from './MainNavMenu';
import { Slug } from '../../constants/slugs';
import SideNavMenu, { ScreenSection } from './SideNavMenu';

type ScreenProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
  /** Represents the sections of the screen and the current section */
  screenSections?: {
    /** The index of the section corresponding to the current scroll position */
    currentSectionIndex: number;
    /** The sections of the screen */
    sections: ScreenSection[];
  };
};

/**
 * Outermost wrapper component for screens. Presents main and side menu
 * navigation and adjusts layout to display size.
 */
const Screen = React.forwardRef<HTMLDivElement, PropsWithChildren<ScreenProps>>(
  ({ activePage, children, screenSections }, ref) => (
    <div className="full-width full-height flex-row non-scrollable">
      <MainNavMenu activePage={activePage} />
      <main className="flex-1 flex-column scrollable-y" ref={ref}>
        {children}
      </main>
      {screenSections ? (
        <SideNavMenu
          activeSectionIndex={screenSections.currentSectionIndex}
          screenSections={screenSections.sections}
        />
      ) : null}
    </div>
  ),
);

export default Screen;

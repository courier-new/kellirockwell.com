import React, { PropsWithChildren, useMemo } from 'react';
import includes from 'lodash/includes';
import MainNavMenu from './MainNavMenu';
import { Slug } from '../../constants/slugs';
import SideNavMenu from './SideNavMenu';
import { ContentSection } from '../../content';
import useDisplaySize from '../hooks/useDisplaySize';
import { DisplaySize } from '../../constants/breakpoint-sizes';
import DrawerMainNavMenu from './DrawerMainNavMenu';

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

const MAIN_NAV_MENU_DISPLAY_SIZES: DisplaySize[] = ['LARGE', 'MEDIUM', 'SMALL'];
const SIDE_NAV_MENU_DISPLAY_SIZES: DisplaySize[] = ['LARGE', 'MEDIUM'];

/**
 * Returns true if the current display size is included in the list of allowed
 * display sizes for the main nav menu
 *
 * @param displaySize the current display size to check
 */
const shouldShowMainNavMenu = (displaySize: DisplaySize): boolean =>
  includes(MAIN_NAV_MENU_DISPLAY_SIZES, displaySize);

/**
 * Returns true if the current display size is included in the list of allowed
 * display sizes for the main nav menu
 *
 * @param displaySize the current display size to check
 */
const shouldShowSideNavMenu = (displaySize: DisplaySize): boolean =>
  includes(SIDE_NAV_MENU_DISPLAY_SIZES, displaySize);

/**
 * Outermost wrapper component for screens. Presents main and side menu
 * navigation and adjusts layout to display size.
 */
const Screen = React.forwardRef<HTMLDivElement, PropsWithChildren<ScreenProps>>(
  ({ activePage, children, contentSections }, ref) => {
    const [displaySize] = useDisplaySize();

    /** If true, will always show the main left-hand navigation menu; otherwise,
    will show collapsible navigation menu drawer */
    const shouldShowMainNav = useMemo(() => shouldShowMainNavMenu(displaySize), [
      displaySize,
    ]);
    /** If true, will show the secondary right-hand navigation menu */
    const shouldShowSideNav = useMemo(() => shouldShowSideNavMenu(displaySize), [
      displaySize,
    ]);

    return (
      <div className="full-width full-height flex-row non-scrollable">
        {shouldShowMainNav ? (
          <MainNavMenu activePage={activePage} />
        ) : (
          <DrawerMainNavMenu activePage={activePage} />
        )}
        <main className="flex-1 flex-column scrollable-y" ref={ref}>
          {children}
        </main>
        {contentSections && shouldShowSideNav ? (
          <SideNavMenu
            activeSectionIndex={contentSections.currentSectionIndex}
            contentSections={contentSections.sections}
            recalculateSectionIndex={contentSections.recalculateSectionIndex}
          />
        ) : null}
      </div>
    );
  },
);

export default Screen;

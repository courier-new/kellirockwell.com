import isUndefined from 'lodash/isUndefined';
import replace from 'lodash/replace';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';

import { ContentSection } from '../../content/utilities/types';
import {
  shouldShowMainNavMenu,
  shouldShowSideNavMenu,
} from '../constants/breakpoint-sizes';
import { MAIN_CONTENT_MAX_WIDTH, SIDEBAR_WIDTH } from '../constants/content-sizes';
import { Slug } from '../constants/slugs';
import { useThemeDispatch, useThemeState } from '../context/themeState';
import useDisplaySize from '../hooks/useDisplaySize';
import { usePrefersDarkMode } from '../hooks/useMediaQuery';
import { Percent } from '../utilities/percent';
import DarkModeToggle from './DarkModeToggle';
import DrawerMainNavMenu from './DrawerMainNavMenu';
import LoadingOverlay from './LoadingOverlay';
import MainNavMenu from './MainNavMenu';
import ProgressBar from './ProgressBar';
import SideNavMenu from './SideNavMenu';
import UnsupportedBrowserBanner from './UnsupportedBrowserBanner';

type ScreenProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePageSlug: string;
  /** Represents the sections of content on the screen and the index of the
   * current section */
  contentSections?: {
    /** The index of the section corresponding to the current scroll position */
    currentSectionIndex: number;
    /** Handler to fire on route hash change to recalculate the section index.
     * "onScroll" event does not consistently fire when following a hash link to
     * a same-page anchor, so we hook into the Next router's event instead to
     * manually recalculate the section index */
    recalculateSectionIndex?: () => void;
    /** The sections of the screen */
    sections: ContentSection<string>[];
  };
  /** Whether or not the current screen is undergoing a server render */
  rendering: boolean;
};

/**
 * Outermost wrapper component for screens. Presents main and side menu
 * navigation and adjusts layout to display size.
 */
const Screen = React.forwardRef<HTMLDivElement, PropsWithChildren<ScreenProps>>(
  ({ activePageSlug, children, contentSections, rendering }, ref) => {
    const [displaySize] = useDisplaySize();

    /** True if the user system preference is for a dark color scheme */
    const prefersDarkMode = usePrefersDarkMode();
    const themeState = useThemeState();
    const themeDispatch = useThemeDispatch();
    const theme = themeState?.theme || 'light';

    useEffect(() => {
      const preferredTheme = prefersDarkMode ? 'dark' : 'light';
      if (preferredTheme !== theme) {
        themeDispatch?.({ type: '@theme-state/toggle-theme' });
      }
      // Only rerun the effect on mount or if the user preference changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefersDarkMode]);

    /** If true, will always show the main left-hand navigation menu; otherwise,
    will show collapsible navigation menu drawer */
    const shouldShowMainNav = useMemo(() => shouldShowMainNavMenu(displaySize), [
      displaySize,
    ]);
    /** If true, will show the secondary right-hand navigation menu */
    const shouldShowSideNav = useMemo(() => shouldShowSideNavMenu(displaySize), [
      displaySize,
    ]);

    const activeParentPage = replace(activePageSlug, /\/.*/, '') as Slug;
    const hasStickyContent = activeParentPage === 'projects';

    /** Match the width/alignment of the main content when it does or does not
     * have a side nav menu based on the side nav menu's width */
    const contentMaxWidth =
      shouldShowSideNav && contentSections
        ? MAIN_CONTENT_MAX_WIDTH
        : MAIN_CONTENT_MAX_WIDTH + SIDEBAR_WIDTH;
    return (
      <div
        className="full-width full-height flex-column non-scrollable"
        data-theme={theme}
      >
        <UnsupportedBrowserBanner />
        <div
          className="absolute z-index-top"
          style={{ bottom: '0.75em', right: '0.75em' }}
        >
          <DarkModeToggle
            current={theme}
            onToggle={(): void => themeDispatch?.({ type: '@theme-state/toggle-theme' })}
          />
        </div>
        <ProgressBar />
        <div className="full-width flex-1 flex-row non-scrollable border-box">
          <div className="flex-row" id="nav">
            {shouldShowMainNav ? (
              <MainNavMenu activePage={activeParentPage} />
            ) : (
              <DrawerMainNavMenu activePage={activeParentPage} />
            )}
          </div>
          {/* Lock scroll when screen is rendering */}
          <main
            className={`main-gradient-background relative flex-align-center
            flex-1 flex-column ${rendering ? 'non-scrollable' : 'scrollable-y'}`}
            ref={ref}
          >
            {rendering ? <LoadingOverlay /> : null}
            {/*
            If the screen has sticky content, we make this container non-scrollable
            and let the children control scrolling.

            We by default cap the width of content and center it within <main>,
            preserving any internal alignment decisions of the children, but for pages
            with sticky content this must again be controlled at the child level or
            else the scrollbar appears inset on very wide desktop screens since it is
            only applied to the capped width area
            */}
            <div
              className={hasStickyContent ? 'flex-row full-height non-scrollable' : ''}
              style={{
                maxWidth: hasStickyContent ? undefined : contentMaxWidth,
                width: '100%',
              }}
            >
              {children}
            </div>
          </main>
          {shouldShowSideNav && contentSections ? (
            <SideNavMenu
              activeSectionIndex={contentSections.currentSectionIndex}
              contentSections={contentSections.sections}
            />
          ) : null}
        </div>
      </div>
    );
  },
);

export default Screen;

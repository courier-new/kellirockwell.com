import noop from 'lodash/noop';
import replace from 'lodash/replace';
import { useRouter } from 'next/router';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  shouldShowMainNavMenu,
  shouldShowSideNavMenu,
} from '../constants/breakpoint-sizes';
import { MAIN_CONTENT_MAX_WIDTH, SIDEBAR_WIDTH } from '../constants/content-sizes';
import { Slug } from '../constants/slugs';
import { useThemeDispatch, useThemeState } from '../context/themeState';
import useDisplaySize from '../hooks/useDisplaySize';
import { usePrefersDarkMode } from '../hooks/useMediaQuery';
import useOnRouteChange from '../hooks/useOnRouteChange';
import DarkModeToggle from './DarkModeToggle';
import DrawerMainNavMenu from './DrawerMainNavMenu';
import LoadingOverlay from './LoadingOverlay';
import MainNavMenu from './MainNavMenu';
import ProgressBar from './ProgressBar';
import UnsupportedBrowserBanner from './UnsupportedBrowserBanner';

type ScreenProps = {
  /**
   * Instructs the screen to make the main content container non-scrollable and
   * delegate scroll controls to the children. Using this option means the
   * parent of `Screen` will also be responsible for assigning the `ref` for the
   * scroll position and current section index controls to the appropriate
   * scrollable component, if such features are desired.
   */
  hasStickyContent?: boolean;
  /** If provided, will be called on route change to reset the page to the top */
  resetScroll?: () => void;
  /** The optional side navigation menu to display alongside the page content */
  sideNav?: JSX.Element;
};

/**
 * Outermost wrapper component for screens. Presents main and side menu
 * navigation and adjusts layout to display size.
 */
const Screen = React.forwardRef<HTMLDivElement, PropsWithChildren<ScreenProps>>(
  ({ children, hasStickyContent, resetScroll = noop, sideNav }, ref) => {
    /** Compute the parent slug from the current raw page slug to show the active
     * parent page in the main navigation menu */
    const router = useRouter();
    // Strip starting "/" in path to get the slug
    // router.asPath contains any hash in link, too
    const slug = replace(router.pathname, /^\//, '');
    const activeParentSlug = replace(slug, /\/.*/, '') as Slug;

    const [rendering, setRendering] = useState(false);

    /** Handler to set rendering state and reset scroll position on route change */
    const onRouteChangeStart = useCallback((): void => setRendering(true), []);

    /** Handler to scroll to top of outermost scrollable component (does not fire
     * on hash link changes like "#section2") */
    const onRouteChangeComplete = useCallback((): void => {
      resetScroll();
      setRendering(false);
    }, [resetScroll]);

    /** Attach handlers to route change event */
    useOnRouteChange({ onRouteChangeComplete, onRouteChangeStart });

    const [displaySize] = useDisplaySize();

    /** True if the user system preference is for a dark color scheme */
    const prefersDarkMode = usePrefersDarkMode();
    const themeState = useThemeState();
    const themeDispatch = useThemeDispatch();
    const setting = themeState?.setting || 'auto';
    const theme = themeState?.theme || 'light';

    useEffect(() => {
      if (setting === 'auto') {
        const preferredTheme = prefersDarkMode ? 'dark' : 'light';
        if (preferredTheme !== theme) {
          themeDispatch?.({ type: '@theme-state/toggle-theme' });
        }
      }
      // Only rerun the effect on mount or if the user preference changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefersDarkMode, setting, themeDispatch]);

    /** Handler to toggle the theme and change the setting to manual */
    const onToggleTheme = useCallback(() => {
      if (setting === 'auto') {
        themeDispatch?.({ type: '@theme-state/toggle-setting' });
      }
      themeDispatch?.({ type: '@theme-state/toggle-theme' });
    }, [themeDispatch, setting]);

    /** If true, will always show the main left-hand navigation menu; otherwise
     * will show collapsible navigation menu drawer */
    const shouldShowMainNav = useMemo(() => shouldShowMainNavMenu(displaySize), [
      displaySize,
    ]);
    /** If true, will show the secondary right-hand navigation menu */
    const shouldShowSideNav = useMemo(() => shouldShowSideNavMenu(displaySize), [
      displaySize,
    ]);

    /** Match the width/alignment of the main content when it does or does not
     * have a side nav menu based on the side nav menu's width */
    const contentMaxWidth =
      shouldShowSideNav && sideNav
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
          <DarkModeToggle current={theme} onToggle={onToggleTheme} />
        </div>
        <ProgressBar />
        <div className="full-width flex-1 flex-row non-scrollable border-box">
          <div className="flex-row" id="nav">
            {shouldShowMainNav ? (
              <MainNavMenu activePage={activeParentSlug} />
            ) : (
              <DrawerMainNavMenu activePage={activeParentSlug} />
            )}
          </div>
          {rendering ? <LoadingOverlay /> : null}
          {/* Lock scroll when screen is rendering */}
          <main
            className={`main-gradient-background relative flex-align-center
            flex-1 flex-column ${rendering ? 'non-scrollable' : 'scrollable-y'}`}
            ref={ref}
          >
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
          {shouldShowSideNav ? sideNav : null}
        </div>
      </div>
    );
  },
);

export default Screen;

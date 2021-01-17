import '../common/scss/main.scss';

import forEach from 'lodash/forEach';
import get from 'lodash/get';
import replace from 'lodash/replace';
import { NextComponentType } from 'next';
import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import Screen from '../common/components/Screen';
import { Slug } from '../common/constants/slugs';
import CombinedProvider from '../common/context';
import { useSectionHeightsState } from '../common/context/sectionHeightsState';
import useCurrentSectionIndex from '../common/hooks/useCurrentSectionIndex';
import useScrollInfo from '../common/hooks/useScrollInfo';
import { toTitleCase } from '../common/utilities/string-case';
import { getSectionsForPage } from '../content/utilities/for-pages';

/**
 * Custom `App` container for all pages:
 * https://nextjs.org/docs/advanced-features/custom-app
 *
 * Used to persist layout and context between pages as well as apply css
 * globally
 */
const App: NextComponentType<AppContext, never, AppProps> = ({
  Component,
  pageProps,
}) => (
  <CombinedProvider>
    <InContext>
      <Component {...pageProps} />
    </InContext>
  </CombinedProvider>
);

/**
 * Parent container component one level deeper in order to access context
 */
const InContext: FC = ({ children }) => {
  // React `RefObject` to attach to the outermost `Screen` component
  const outerRef = useRef<HTMLDivElement>(null);
  const [rendering, setRendering] = useState(false);

  const router = useRouter();
  // TODO: Remove me when site goes live and home -> index
  const isIndex = router.route === '/' || router.route === '/home';
  // Strip starting "/" in path to get the slug
  // router.asPath contains any hash in link, too
  const slug = replace(router.pathname, /^\//, '');
  const activeParentPage = replace(slug, /\/.*/, '') as Slug;
  // Dictionary of section starting heights for each page in the app,
  // retrievable by the page's slug
  const state = useSectionHeightsState();
  // Get the section starting heights for this page
  const sectionHeights: number[] = get(state, slug, []);

  // The index of the current section the user has scrolled to on the page, and
  // a method to manually recalculate that index
  const [sectionIndex, recalculateSectionIndex] = useCurrentSectionIndex(
    outerRef,
    sectionHeights,
  );

  // The `ContentSection`s for this page, if it has any
  const sections = getSectionsForPage(slug);

  // The percent of the page the user has scrolled
  const { percent: scrollPercent, reset: resetScroll } = useScrollInfo(outerRef);

  /** Handler to set rendering state and reset scroll position */
  const onRouteStart = useCallback((): void => {
    resetScroll();
    setRendering(true);
  }, [resetScroll]);

  /** Scroll handler to scroll to top of outer `Screen` component */
  const onRouteCompleteScroll = useCallback((): void => {
    outerRef.current?.scrollTo({ top: 0 });
    setRendering(false);
  }, []);

  useEffect(() => {
    /** Array to hold event listener clean up functions */
    let removeEventListenerFns: (() => void)[] = [];

    // Attach handler to router route change events (does not fire on hash link
    // changes like "#section2")
    router.events.on('routeChangeStart', onRouteStart);
    router.events.on('routeChangeComplete', onRouteCompleteScroll);

    if (recalculateSectionIndex) {
      // Attach handler to recalculate the section index on following a hash
      // link to a same-page anchor like "#section2" since `onScroll` event does
      // not consistently fire when following hash links
      router.events.on('hashChangeStart', recalculateSectionIndex);

      // Remove event handler to clean up
      removeEventListenerFns = [
        ...removeEventListenerFns,
        (): void => router.events.off('hashChangeStart', recalculateSectionIndex),
      ];
    }

    // Remove handler to clean up
    removeEventListenerFns = [
      ...removeEventListenerFns,
      (): void => router.events.off('routeChangeStart', onRouteStart),
      (): void => router.events.off('routeChangeComplete', onRouteCompleteScroll),
    ];

    // Call methods to remove all handlers
    return (): void => {
      forEach(removeEventListenerFns, (fn) => fn());
    };
  }, [recalculateSectionIndex, router.events]);

  const head = (
    <Head>
      <title>KELLI ROCKWELL | {toTitleCase(activeParentPage)}</title>
      <link href="/favicon.ico" rel="icon" />
    </Head>
  );

  // Index screen is not rendered in standard Screen container
  return isIndex ? (
    <>
      {head}
      {children}
    </>
  ) : (
    <Screen
      activePageSlug={slug}
      contentSections={
        sections.length
          ? {
              currentSectionIndex: sectionIndex,
              sections,
            }
          : undefined
      }
      ref={outerRef}
      rendering={rendering}
      scrollPercent={scrollPercent}
    >
      {head}
      {children}
    </Screen>
  );
};

export default App;

import React, { FC, useRef, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import replace from 'lodash/replace';
import forEach from 'lodash/forEach';
import Screen from '../common/components/Screen';
import CombinedProvider from '../common/context';
import useCurrentSectionIndex from '../common/hooks/useCurrentSectionIndex';
import { useSectionHeightsState } from '../common/context/sectionHeightsState';
import useScrollInfo from '../common/hooks/useScrollInfo';
import { Slug } from '../constants/slugs';
import getSectionsForPage from '../content/index';
import '../common/scss/main.scss';

/**
 * Custom `App` container for all pages:
 * https://nextjs.org/docs/advanced-features/custom-app
 *
 * Used to persist layout and context between pages as well as apply css
 * globally
 */
const App: FC<AppProps> = ({ Component }) => {
  return (
    <CombinedProvider>
      <InContext>
        <Component />
      </InContext>
    </CombinedProvider>
  );
};

/**
 * Parent container component one level deeper in order to access context
 */
const InContext: FC<{}> = ({ children }) => {
  // React `RefObject` to attach to the outermost `Screen` component
  const outerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  // Strip starting "/" in path to get the `Slug`
  const slug = replace(router.route, /^\//, '') as Slug;
  // Dictionary of section starting heights for each page in the app,
  // retrievable by the page's slug
  const state = useSectionHeightsState();
  // Get the section starting heights for this page
  const sectionHeights = state?.[slug] || [];

  // The index of the current section the user has scrolled to on the page, and
  // a method to manually recalculate that index
  const [sectionIndex, recalculateSectionIndex] = useCurrentSectionIndex(
    outerRef,
    sectionHeights,
  );

  // The `ContentSection`s for this page
  const sections = getSectionsForPage(slug);

  // The percent of the page the user has scrolled
  const scrollPercent = useScrollInfo(outerRef)[1];

  useEffect(() => {
    /** Array to hold event listener clean up functions */
    let removeEventListenerFns: (() => void)[] = [];

    /** Scroll handler to scroll to top of outer `Screen` component */
    const onRouteChangeScroll = (): void => outerRef.current?.scrollTo({ top: 0 });

    // Attach handler to router route change event (does not fire on hash link
    // changes like "#section2")
    router.events.on('routeChangeComplete', onRouteChangeScroll);

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
      (): void => router.events.off('routeChangeComplete', onRouteChangeScroll),
    ];

    // Call methods to remove all handlers
    return (): void => {
      forEach(removeEventListenerFns, (fn) => fn());
    };
    // Router is not expected to change over app lifetime
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <Screen
      activePage={slug}
      contentSections={{
        currentSectionIndex: sectionIndex,
        sections,
      }}
      ref={outerRef}
      scrollPercent={scrollPercent}
    >
      {children}
    </Screen>
  );
};

export default App;

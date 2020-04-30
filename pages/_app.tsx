import React, { FC, useRef } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import replace from 'lodash/replace';
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
  const { route } = useRouter();
  // Strip starting "/" in path to get the `Slug`
  const slug = replace(route, /^\//, '') as Slug;

  return (
    <CombinedProvider>
      <InContext slug={slug}>
        <Component />
      </InContext>
    </CombinedProvider>
  );
};

/**
 * Parent container component one level deeper in order to access context
 */
const InContext: FC<{ slug: Slug }> = ({ children, slug }) => {
  // React `RefObject` to attach to the outermost `Screen` component
  const outerRef = useRef<HTMLDivElement>(null);

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

  return (
    <Screen
      activePage={slug}
      contentSections={{
        currentSectionIndex: sectionIndex,
        recalculateSectionIndex,
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

import '../common/scss/main.scss';

import replace from 'lodash/replace';
import { NextComponentType } from 'next';
import { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Slug } from '../common/constants/slugs';
import CombinedProvider from '../common/context';
import { toTitleCase } from '../common/utilities/string-case';

const queryClient = new QueryClient();

// eslint-disable-next-line jsdoc/require-param
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
    <QueryClientProvider client={queryClient}>
      <InContext>
        <Component {...pageProps} />
      </InContext>
    </QueryClientProvider>
  </CombinedProvider>
);

/**
 * Parent container component one level deeper in order to access context
 *
 * @param props the functional component props
 * @param props.children children to render within `InContext`
 */
const InContext: FC = ({ children }) => {
  const router = useRouter();
  // Strip starting "/" in path to get the slug
  // router.asPath contains any hash in link, too
  const slug = replace(router.pathname, /^\//, '');
  const activeParentSlug = replace(slug, /\/.*/, '') as Slug;

  // TODO: Test if still necessary and remove if not
  // // The index of the current section the user has scrolled to on the page, and
  // // a method to manually recalculate that index
  // const [sectionIndex, recalculateSectionIndex] = useCurrentSectionIndex(
  //   outerRef,
  //   activeParentPage,
  // );

  // useEffect(() => {

  //   if (recalculateSectionIndex) {
  //     // Attach handler to recalculate the section index on following a hash
  //     // link to a same-page anchor like "#section2" since `onScroll` event does
  //     // not consistently fire when following hash links
  //     router.events.on('hashChangeStart', recalculateSectionIndex);

  //     // Remove event handler to clean up
  //     removeEventListenerFns = [
  //       ...removeEventListenerFns,
  //       (): void => router.events.off('hashChangeStart', recalculateSectionIndex),
  //     ];
  //   }

  //   // Call methods to remove all handlers
  //   return (): void => {
  //     forEach(removeEventListenerFns, (fn) => fn());
  //   };
  // }, [recalculateSectionIndex, router.events]);

  return (
    <>
      <Head>
        <title>KELLI ROCKWELL | {toTitleCase(activeParentSlug)}</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {children}
    </>
  );
};

export default App;

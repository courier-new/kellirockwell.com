import React, { FC, PropsWithChildren } from 'react';

import { SectionHeightsProvider } from './sectionHeightsState';
import { ThemeProvider } from './themeState';

/**
 * Wrapper component that composes all individual providers in the app and
 * wraps children in them to make context available; should be applied to the
 * root component
 */
const CombinedProvider: FC<PropsWithChildren<{}>> = ({ children }) => (
  <ThemeProvider>
    <SectionHeightsProvider>{children}</SectionHeightsProvider>
  </ThemeProvider>
);

export default CombinedProvider;

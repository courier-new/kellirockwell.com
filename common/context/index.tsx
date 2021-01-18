import React, { FC } from 'react';

import { ScrollPositionProvider } from './scrollPositionState';
import { SectionHeightsProvider } from './sectionHeightsState';
import { ThemeProvider } from './themeState';

/**
 * Wrapper component that composes all individual providers in the app and
 * wraps children in them to make context available; should be applied to the
 * root component
 */
const CombinedProvider: FC = ({ children }) => (
  <ThemeProvider>
    <ScrollPositionProvider>
      <SectionHeightsProvider>{children}</SectionHeightsProvider>
    </ScrollPositionProvider>
  </ThemeProvider>
);

export default CombinedProvider;

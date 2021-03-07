import React, { FC } from 'react';

import { ScrollPositionProvider } from './scrollPositionState';
import { ThemeProvider } from './themeState';

/**
 * Wrapper component that composes all individual providers in the app and
 * wraps children in them to make context available; should be applied to the
 * root component
 *
 * @param props the functional component props
 * @param props.children children to the provider will have access to its context
 */
const CombinedProvider: FC = ({ children }) => (
  <ThemeProvider>
    <ScrollPositionProvider>{children}</ScrollPositionProvider>
  </ThemeProvider>
);

export default CombinedProvider;

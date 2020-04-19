import React, { FC } from 'react';
import MainNavMenu from './MainNavMenu';
import { Slug } from '../../constants/slugs';
import SideNavMenu, { ScreenSection } from './SideNavMenu';
// import useDimensions from '../hooks/useDimensions';

type ScreenProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
  /** The sections of the screen to represent in the side nav menu */
  screenSections?: ScreenSection[];
};

/**
 * Outermost wrapper component for screens. Presents main and side menu
 * navigation and adjusts layout to display size.
 */
const Screen: FC<ScreenProps> = ({ activePage, children, screenSections }) => {
  // const [setNode, dimensions, node] = useDimensions();

  // console.log(dimensions);

  return (
    <div className="full-width full-height flex-row non-scrollable">
      <MainNavMenu activePage={activePage} />
      <main className="flex-1 flex-column scrollable-y">{children}</main>
      {screenSections ? (
        <SideNavMenu activeSection="the-roles-i-serve" screenSections={screenSections} />
      ) : null}
    </div>
  );
};

export default Screen;

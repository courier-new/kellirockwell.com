import React, { FC } from 'react';

import { Slug } from '../constants/slugs';
import MainNavigation from './MainNavigation';
import ProfileImage from './ProfileImage';

type MainNavMenuProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
};

/**
 * Component for primary navigation bar with nav links on left side of screen.
 */
const MainNavMenu: FC<MainNavMenuProps> = ({ activePage }) => {
  return (
    <nav className="full-height padding-lg background-maastricht text-magnolia main-column-size">
      <div className="flex-column flex-1 flex-align-center">
        <ProfileImage shape="round" size="100%" />
        <h5 className="text-turquoise">Kelli Rockwell</h5>
      </div>
      <MainNavigation activePage={activePage} />
    </nav>
  );
};

export default MainNavMenu;

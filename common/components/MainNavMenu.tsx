import React, { FC } from 'react';

import { Slug } from '../constants/slugs';
import MadeByMe from './MadeByMe';
import MainNavigation from './MainNavigation';
import ProfileImage from './ProfileImage';
import SocialLinks from './SocialLinks';

type MainNavMenuProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
};

/**
 * Component for primary navigation bar with nav links on left side of screen.
 */
const MainNavMenu: FC<MainNavMenuProps> = ({ activePage }) => {
  return (
    <nav className="flex-column flex-space-between padding-lg background-maastricht text-magnolia main-column-size">
      {/* Use space-between to split flex column to top and bottom part */}
      {/* The top-aligned part */}
      <div>
        <div className="flex-column flex-1 flex-align-center">
          <ProfileImage shape="round" size="100%" />
          <h5 className="text-turquoise">Kelli Rockwell</h5>
        </div>
        <MainNavigation activePage={activePage} />
      </div>
      <div>
        <SocialLinks className="text-magnolia" size={30} />
        <MadeByMe className="text-magnolia xsmall" />
      </div>
    </nav>
  );
};

export default MainNavMenu;

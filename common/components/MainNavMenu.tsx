import Link from 'next/link';
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
    <nav className="flex-column flex-space-between padding-lg background-maastricht text-magnolia main-column-size border-box">
      {/* Use space-between to split flex column to top and bottom part */}
      {/* The top-aligned part */}
      <div>
        <Link href="/home">
          <a
            className="flex-column flex-1 flex-align-center margin-med-bottom"
            title="Home"
          >
            <ProfileImage shape="round" />
            <h5 className="text-turquoise margin-0-bottom">Kelli Rockwell</h5>
          </a>
        </Link>
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

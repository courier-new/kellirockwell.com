import React, { FC, useCallback, useState } from 'react';

import { Slug } from '../constants/slugs';
import MainNavMenu from './MainNavMenu';

type DrawerMainNavMenuProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
};

/**
 * Component for primary navigation bar wrapped in a collapsible drawer for
 * mobile support.
 */
const DrawerMainNavMenu: FC<DrawerMainNavMenuProps> = ({ activePage }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const toggleDrawerIsOpen = useCallback(() => setDrawerIsOpen(!drawerIsOpen), [
    drawerIsOpen,
  ]);

  return (
    <div
      className={`absolute ${
        drawerIsOpen ? 'background-maastricht text-magnolia full-height' : ''
      }`}
    >
      <button onClick={toggleDrawerIsOpen} type="button">
        Toggle
      </button>
      {drawerIsOpen ? <MainNavMenu activePage={activePage} /> : null}
    </div>
  );
};

export default DrawerMainNavMenu;

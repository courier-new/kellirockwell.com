import { useRouter } from 'next/router';
import React, { FC, useCallback, useRef, useState } from 'react';

import { Slug } from '../constants/slugs';
import useOnClickOutside from '../hooks/useOnClickOutside';
import MainNavMenu from './MainNavMenu';
import MenuIcon from './MenuIcon';

type DrawerMainNavMenuProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
};

/**
 * Component for primary navigation bar wrapped in a collapsible drawer for
 * mobile support.
 */
const DrawerMainNavMenu: FC<DrawerMainNavMenuProps> = ({ activePage }) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawerIsOpen = useCallback(() => setDrawerIsOpen(!drawerIsOpen), [
    drawerIsOpen,
  ]);

  // Toggle drawer closed on click outside when drawer is open
  const onClickOutside = useCallback(() => {
    if (drawerIsOpen) toggleDrawerIsOpen();
  }, [drawerIsOpen, toggleDrawerIsOpen]);
  useOnClickOutside(drawerRef, onClickOutside);

  // Toggle drawer closed on route change
  const router = useRouter();
  router.events?.on('routeChangeStart', toggleDrawerIsOpen);

  return (
    <>
      <style jsx>
        {`
          .outer-container {
            transition: all 0.3s ease-out;
          }

          .outer-container.open {
            width: 80%;
          }

          button:focus {
            outline: none;
          }
        `}
      </style>
      <div
        className={`outer-container absolute flex-row flex-align-start full-height z-index-top ${
          drawerIsOpen ? 'open' : 'width-0'
        }`}
        ref={drawerRef}
      >
        <div className="background-maastricht full-height full-width text-magnolia non-scrollable">
          <MainNavMenu activePage={activePage} />
        </div>
        <button
          className="z-index-top margin-0 padding-med-v padding-0-h border-0 background-none width-0"
          onClick={toggleDrawerIsOpen}
          type="button"
        >
          {/* TOOD: remove hardcoded colors */}
          <MenuIcon color={drawerIsOpen ? '#fdf4fc' : '#061826'} isOpen={drawerIsOpen} />
        </button>
      </div>
    </>
  );
};

export default DrawerMainNavMenu;

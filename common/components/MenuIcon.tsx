import React, { FC } from 'react';

/** A component for the animated icon that opens the `DrawerMainNavMenu` */
const MenuIcon: FC<{ color: string; isOpen: boolean }> = ({ color, isOpen }) => (
  <>
    <style jsx>
      {`
        .menu-icon {
          width: 1.8em;
        }

        .menu-icon:after,
        .menu-icon:before,
        .menu-icon div {
          background-color: ${color};
          content: '';
          display: block;
          height: 0.15em;
          margin: 0.3em 0;
          transition: all 600ms ease-in-out;
        }

        .menu-icon.open {
          position: relative;
          left: -3em;
        }

        .menu-icon.open:before {
          transform: translateY(0.45em) rotate(135deg);
        }

        .menu-icon.open:after {
          transform: translateY(-0.45em) rotate(-135deg);
        }

        .menu-icon.open div {
          transform: scaleX(0);
        }
      `}
    </style>
    <div className={`menu-icon ${isOpen ? 'open' : ''}`}>
      <div />
    </div>
  </>
);

export default MenuIcon;

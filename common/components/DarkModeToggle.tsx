import React, { FC } from 'react';
import { IoIosMoon, IoMdSunny } from 'react-icons/io';

type DarkModeToggleProps = {
  /** Current theme */
  current: 'light' | 'dark';
  /** Callback to toggle dark mode */
  onToggle: () => void;
};

/** A simple toggle switch to flip dark mode on or off */
const DarkModeToggle: FC<DarkModeToggleProps> = ({ current, onToggle }) => {
  const iconProps = { className: 'block padding-sm text-magnolia', size: '24px' };
  return (
    <button
      aria-label="Toggle dark mode"
      className="cursor-pointer drop-shadow margin-0 padding-0 border-0 background-maastricht"
      onClick={onToggle}
      style={{ borderRadius: '50%' }}
      type="button"
    >
      {current === 'light' ? <IoIosMoon {...iconProps} /> : <IoMdSunny {...iconProps} />}
    </button>
  );
};

export default DarkModeToggle;

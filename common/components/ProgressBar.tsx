import React, { FC } from 'react';

import { Percent } from '../utilities/percent';

type ProgressBarProps = {
  /** The current scroll position down the Screen */
  scrollPercent: Percent;
};

/**
 * A full-width gradient progress bar based on the current percentage of the
 * screen scrolled
 */
const ProgressBar: FC<ProgressBarProps> = ({ scrollPercent }) => {
  // TODO: convert me to styled-jsx or something
  const barCoverStyle = {
    height: 7,
    transition: 'width 200ms',
    width: `${scrollPercent * 100}%`,
  };

  return (
    <div
      className="gradient-background full-width absolute z-index-top"
      style={barCoverStyle}
    />
  );
};

export default ProgressBar;

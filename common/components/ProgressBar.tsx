import React, { FC } from 'react';

import { useScrollPositionState } from '../context/scrollPositionState';

/**
 * A full-width gradient progress bar based on the current percentage of the
 * screen scrolled
 */
const ProgressBar: FC = () => {
  const state = useScrollPositionState();

  // TODO: convert me to styled-jsx or something
  const barCoverStyle = {
    height: 7,
    transition: 'width 200ms',
    width: `${(state?.percent || 0) * 100}%`,
  };

  return (
    <div
      className="gradient-background full-width absolute z-index-top"
      style={barCoverStyle}
    />
  );
};

export default ProgressBar;

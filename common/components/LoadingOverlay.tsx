import React, { FC } from 'react';

import LoadingSpinner from './LoadingSpinner';

/** Low-opacity full size overlay component with loading spinner */
const LoadingOverlay: FC<{}> = () => {
  return (
    <div
      className="absolute flex-column flex-justify-center flex-align-center z-index-middle margin-neg-med"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        height: '100%',
        width: '100%',
      }}
    >
      <LoadingSpinner
        colors={{
          // TODO: replace hardcoded colors
          mask: '#fff',
          primary: '#ef2860',
        }}
        size="large"
      />
    </div>
  );
};

export default LoadingOverlay;

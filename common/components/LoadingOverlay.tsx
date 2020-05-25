import React, { FC } from 'react';

import LoadingSpinner from './LoadingSpinner';

/** Low-opacity full size overlay component with loading spinner */
const LoadingOverlay: FC<{}> = () => {
  return (
    <div className="absolute background-low-opacity flex-column flex-justify-center flex-align-center full-width full-height z-index-middle">
      <LoadingSpinner primaryColor="#e80645" size="large" />
    </div>
  );
};

export default LoadingOverlay;

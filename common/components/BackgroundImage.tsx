import split from 'lodash/split';
import React, { FC } from 'react';

type BackgroundImageProps = {
  /** The absolute path to the image from within 'images' */
  path: string;
  /** If provided, gets resized image */
  resizeWidth?: number;
};

/** A wrapper for an optimized covering background image that conforms to the
 * size of its container */
const BackgroundImage: FC<BackgroundImageProps> = ({ path, resizeWidth }) => {
  const [imageName, extension] = split(path, '.');
  const lqBackgroundImageClassName = `low-quality-background-image-${imageName}`;
  const backgroundImageClassName = `background-image-${imageName}`;
  const sizedPath = `${imageName}@${resizeWidth || 'original'}.${extension}`;

  return (
    <div className="full-height full-width">
      {/* eslint-disable import/no-dynamic-require */}
      {/* NOTE: We must hardcode the relative path to '../../images' every time in order
      for the dynamic requires to work */}
      <style jsx>
        {`
          .${lqBackgroundImageClassName},
          .${backgroundImageClassName} {
            background-image: url('${require(`../../images/${sizedPath}?lqip`)}');
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
          }
          .blur-filter {
            backdrop-filter: blur(15px);
          }
          .${backgroundImageClassName} {
            background-image: url('${require(`../../images/${sizedPath}`)}');
          }
        `}
      </style>
      {/* The low quality placeholder is rendered as a background image */}
      <div className={`full-width full-height ${lqBackgroundImageClassName}`}>
        {/* Apply an extra blur to the image */}
        <div className="z-index-top full-width full-height blur-filter">
          <div className={`full-width full-height ${backgroundImageClassName}`} />
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;

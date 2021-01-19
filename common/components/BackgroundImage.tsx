import Image from 'next/image';
import React, { FC } from 'react';

type BackgroundImageProps = {
  /** The absolute path to the image from within 'images' */
  path: string;
};

/**
 * A wrapper for an optimized covering background image that conforms to the
 * size of its container
 *
 * @param props the functional component props
 * @param props.path the path to the image to serve as the background, ex.
 * "/images/my-cool-image.jpg"
 */
const BackgroundImage: FC<BackgroundImageProps> = ({ path }) => {
  return (
    <div className="full-width full-height relative">
      <style jsx>
        {`
          .background-image {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            object-fit: cover;
            object-position: center;
            pointer-events: none;
          }
        `}
      </style>
      <Image
        className="absolute full-width full-height background-image"
        layout="fill"
        src={path}
      />
      <div className="relative z-index-top">my content</div>
    </div>
  );
};

export default BackgroundImage;

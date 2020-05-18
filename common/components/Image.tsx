import split from 'lodash/split';
import React, { FC } from 'react';

type ImageProps = {
  /** Alt text for the image */
  alt: string;
  /** The absolute path to the image from within 'images' */
  path: string;
  /** If provided, gets resized image */
  resizeWidth?: number;
};

/**
 * A wrapper for a lazy-loaded, optimized image loosely based on the
 * recommendations from
 * https://codeconqueror.com/blog/image-optimization-with-next-js
 */
const Image: FC<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> &
    ImageProps
> = ({ alt, path, resizeWidth, style, ...props }) => {
  const [imageName, extension] = split(path, '.');
  const backgroundImageClassName = `background-image-${imageName}`;
  const sizedPath = `${imageName}@${resizeWidth || 'original'}.${extension}`;

  return (
    <>
      {/* eslint-disable import/no-dynamic-require */}
      {/* NOTE: We must hardcode the relative path to '../../images' every time in order
      for the dynamic requires to work */}
      <style jsx>
        {`
          .${backgroundImageClassName} {
            background-image: url('${require(`../../images/${sizedPath}?lqip`)}');
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
          }
          .${backgroundImageClassName} img {
            display: block;
          }
        `}
      </style>
      {/* The low quality placeholder is rendered as a background image */}
      <div className={`full-width ${backgroundImageClassName}`} style={style}>
        {/* Apply an extra blur to the image */}
        <div style={{ backdropFilter: 'blur(15px)' }}>
          <picture className="full-width z-index-top">
            <source
              srcSet={require(`../../images/${sizedPath}?webp`)}
              type="image/webp"
            />
            <source srcSet={require(`../../images/${sizedPath}`)} type="image/jpeg" />
            <img
              {...props}
              alt={alt}
              src={require(`../../images/${sizedPath}`)}
              style={style}
            />
            {/* eslint-enable import/no-dynamic-require */}
          </picture>
        </div>
      </div>
    </>
  );
};

export default Image;

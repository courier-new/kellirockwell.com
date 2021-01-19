import Image from 'next/image';
import React, { FC } from 'react';

/**
 * Component for my profile image
 *
 * @param props the functional component props
 * @param props.maxSize the maximum expected width or height of the component
 * @param props.shape whether the image should be displayed with rounded corners
 * or as a plain square, defaults to square
 */
const ProfileImage: FC<{
  maxSize?: number;
  shape?: 'round' | 'square';
}> = ({ maxSize = 1000, shape = 'square' }) => {
  return (
    <>
      <style global jsx>
        {`
          .profile-image {
            border-radius: ${shape === 'round' ? '50%' : '0'};
          }
        `}
      </style>
      <Image
        alt="Closeup of the site author, smiling. Welcome to my site!"
        className="profile-image"
        height={maxSize}
        src="/images/me@original.jpg"
        width={maxSize}
      />
    </>
  );
};

export default ProfileImage;

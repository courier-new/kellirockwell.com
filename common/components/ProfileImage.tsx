import Image from 'next/image';
import React, { FC } from 'react';

/**
 * Component for my profile image
 *
 * @param props the functional component props
 * @param props.maxSize the maximum expected width or height of the component
 */
const ProfileImage: FC<{
  maxSize?: number;
}> = ({ maxSize = 1000 }) => (
  <Image
    alt="Closeup of the site author, smiling. Welcome to my site!"
    className="profile-image"
    height={maxSize}
    src="/images/me-sketchy.png"
    width={maxSize}
  />
);

export default ProfileImage;

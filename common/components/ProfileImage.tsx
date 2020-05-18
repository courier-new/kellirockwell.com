import React, { FC } from 'react';

import Image from './Image';

/** Component for my profile image */
const ProfileImage: FC<{
  resizeWidth?: number;
  shape: 'round' | 'square';
  size?: number | string;
}> = ({ resizeWidth, shape, size }) => {
  return (
    <Image
      alt="Closeup of the site author, smiling. Welcome to my site!"
      path="me.jpg"
      resizeWidth={resizeWidth}
      style={{ clipPath: shape === 'round' ? 'circle(50% at 50% 50%)' : '' }}
      width={size}
    />
  );
};

export default ProfileImage;

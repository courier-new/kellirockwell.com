import React, { FC } from 'react';

/** Component for my profile image */
const ProfileImage: FC<{ shape: 'round' | 'square'; size?: number | string }> = ({
  shape,
  size,
}) => (
  <img
    alt="Hey, my name is Kelli! Welcome to my site!"
    className={shape === 'round' ? 'circular' : ''}
    src="/images/me.jpg"
    width={size}
  />
);

export default ProfileImage;

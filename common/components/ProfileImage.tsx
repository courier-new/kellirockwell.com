import React, { FC } from 'react';
import Image from 'next/image';

/** Component for my profile image */
const ProfileImage: FC<{
  maxSize?: number;
  shape: 'round' | 'square';
}> = ({ maxSize = 1000, shape }) => {
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

import React, { FC } from 'react';
import Image from 'next/image';

/** Component for my profile image */
const ProfileImage: FC<{
  shape: 'round' | 'square';
}> = ({ shape }) => {
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
        height="1200"
        src="/images/me@original.jpg"
        width="1200"
      />
    </>
  );
};

export default ProfileImage;

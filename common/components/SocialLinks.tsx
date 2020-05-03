import React, { FC } from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';
import { IconBaseProps } from 'react-icons/lib/cjs';

type SocialLinksProps = {
  /** The className to apply to each icon */
  className: string;
  /** The size to use for each icon */
  size?: string | number;
};

/** A row of icon links to various social platforms. */
const SocialLinks: FC<SocialLinksProps> = ({ className, size }) => {
  const iconProps: IconBaseProps = {
    className,
    size,
  };
  return (
    <div className="flex-align-center flex-row">
      <style jsx>
        {`
          a {
            margin-right: 5px;
          }
        `}
      </style>
      <a href="https://www.linkedin.com/in/kellirockwell/">
        <AiFillLinkedin {...iconProps} />
      </a>
      <a href="https://twitter.com/courierneue">
        <AiOutlineTwitter {...iconProps} />
      </a>
      <a href="https://github.com/courier-new">
        <AiFillGithub {...iconProps} />
      </a>
    </div>
  );
};

export default SocialLinks;

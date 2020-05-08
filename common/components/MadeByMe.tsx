import React, { FC } from 'react';
import { FaHeart } from 'react-icons/fa';

type MadeByMeProps = {
  /** The className to apply to each icon */
  className: string;
};

/** A label for the site creation */
const MadeByMe: FC<MadeByMeProps> = ({ className }) => {
  return (
    <span className={className}>
      Made with <FaHeart className="relative text-mauve" style={{ top: '.2em' }} /> by
      Kelli.
    </span>
  );
};

export default MadeByMe;

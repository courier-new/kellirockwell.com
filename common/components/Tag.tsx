import isUndefined from 'lodash/isUndefined';
import React, { FC } from 'react';

type TagProps = {
  /** Optional handler on interacting with the tag */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** String specification for spacing between this tag and those adjacent to it */
  spacing: string;
};

/** A decorative tag component */
const Tag: FC<TagProps> = ({ children, onClick, spacing }) => {
  const contents = (
    <>
      <style jsx>
        {`
          span {
            border-radius: 1em;
            line-height: 1.8em;
            padding: 0 0.6em;
            margin: 0 ${spacing} ${spacing} 0;
          }
        `}
      </style>
      <span className="background-space flex-align-center flex-row small text-white karla">
        {children}
      </span>
    </>
  );

  return isUndefined(onClick) ? (
    contents
  ) : (
    <button onClick={onClick} type="button">
      {contents}
    </button>
  );
};

export default Tag;

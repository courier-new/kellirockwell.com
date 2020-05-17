import isUndefined from 'lodash/isUndefined';
import React, { FC } from 'react';

type TagProps = {
  backgroundColorClass?: string;
  /** Optional handler on interacting with the tag */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Size of the text, scales the rest of the tag */
  size?: 'small' | 'medium';
  /** String specification for spacing between this tag and those adjacent to it */
  spacing?: string;
};

/** A decorative tag component */
const Tag: FC<TagProps> = ({
  backgroundColorClass = 'background-space',
  children,
  onClick,
  size = 'small',
  spacing = '0',
}) => {
  const contents = (
    <>
      <style jsx>
        {`
          span {
            border-radius: 1em;
            line-height: 1.8em;
            padding: 0 ${size === 'small' ? '0.6em' : '0.8em'};
            margin: 0 ${spacing} ${spacing} 0;
          }
        `}
      </style>
      <span
        className={`${size} ${backgroundColorClass} flex-align-center flex-row text-white karla`}
      >
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

import isUndefined from 'lodash/isUndefined';
import React, { FC } from 'react';

type TagProps = {
  /** Optional class to apply for the tag background color, defaults to space */
  backgroundColorClass?: string;
  /** Optional handler on interacting with the tag */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Optional size of the text, scales the rest of the tag, defaults to small */
  size?: 'small' | 'medium';
  /** Optional string specification for spacing between this tag and anything
   * adjacent to it, defaults to 0 */
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
        className={`${size} ${backgroundColorClass} flex-align-center flex-row
        text-white karla`}
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

import React, { FC, useRef } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { IoIosPin, IoMdSchool } from 'react-icons/io';

import useDimensions from '../../common/hooks/useDimensions';
import useDisplaySize from '../../common/hooks/useDisplaySize';
import generateTitleProps from '../utilities/for-content';

/** The content for the Get-to-know-me section of the About Me page */
const GetToKnowMeContent: FC = () => {
  const [displaySize] = useDisplaySize();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(containerRef);
  const containerWidth = dimensions?.width || 0;

  /**
   * The subsections of "Get to know me" are laid out in columns based on the
   * width of the parent container. The layout takes one of the following forms:
   *
   * three:
   * | 1 | 2 | 3 |
   *
   * one/two:
   * |   1   |
   * | 2 | 3 |
   *
   * one/two-staggered:
   * |   1   |
   * | 2 |
   *     | 3 |
   *
   * one:
   * | 1 |
   * | 2 |
   * | 3 |
   */
  let columns: 'three' | 'one/two' | 'one/two-staggered' | 'one' = 'one';
  let likesFontSize: 'medium' | 'small' = 'medium';
  if (containerWidth > 620) {
    columns = 'three';
    likesFontSize = 'small';
  } else if (containerWidth > 390) {
    columns = 'one/two';
    if (containerWidth < 500) {
      likesFontSize = 'small';
    }
  } else if (containerWidth > 300) {
    columns = 'one/two-staggered';
    if (containerWidth < 324) {
      likesFontSize = 'small';
    }
  }

  /** If the layout is one/two or one/two-staggered, the dislikes section will
   * be aligned to the end of the container */
  const dislikesAlignEnd = columns === 'one/two-staggered' || columns === 'one/two';
  /** If the layout is three columns, the likes and dislikes sections have a
   * smaller portion flex basis to focus the background section */
  const likesFlexBasis = columns === 'three' ? '25%' : '100%';
  const dislikesFlexBasis = columns === 'three' ? '30%' : '100%';

  /** The padding class sets the spacing "between columns" and is thus dependent
   * on both the columns lay out (which sections have need column gaps?) and the
   * display size (how large should the column gap be?) */
  let likesPaddingClass = '';
  let dislikesPaddingClass = '';
  switch (displaySize) {
    case 'MOBILE':
    case 'SMALL':
      likesPaddingClass = columns === 'three' ? 'padding-med-left' : '';
      dislikesPaddingClass = columns === 'one' ? '' : 'padding-med-left';
      break;
    case 'MEDIUM':
    case 'LARGE':
      likesPaddingClass = columns === 'three' ? 'padding-lg-left' : '';
      dislikesPaddingClass = columns === 'one' ? '' : 'padding-lg-left';
      break;
    case 'XLARGE':
      likesPaddingClass = columns === 'three' ? 'padding-xl-left' : '';
      dislikesPaddingClass = columns === 'one' ? '' : 'padding-xl-left';
      break;
    default:
      break;
  }

  /** The one/two column layout has some additional icon flare between the likes
   * and dislikes sections */
  const fillerIcons =
    columns === 'one/two' ? (
      <div className={dislikesPaddingClass} style={{ opacity: 0.3 }}>
        <AiFillLike className="text-space" size={36} />
        <AiFillDislike className="text-space" size={36} style={{ marginLeft: '5vw' }} />
      </div>
    ) : null;

  return (
    <div className={columns === 'three' ? 'flex-row' : 'flex-column'} ref={containerRef}>
      <div className="flex-column" style={{ flexShrink: 2 }}>
        {/* Margin behaves differently in flex-box and margins below h3 and above
          paragraphs are not merged */}
        <h3 className="margin-0-bottom">Background</h3>
        <p className="large">
          Remote full-stack web developer with a penchant for type systems, state
          management, and effective documentation.
        </p>
        <div className="flex-row flex-align-center padding-sm-bottom">
          <IoMdSchool className="text-black" size={24} />
          <span className="small padding-sm-left">
            Pomona College ‘17, Physics + Computer Science
          </span>
        </div>
        <div className="flex-row flex-align-center">
          <IoIosPin className="text-black" size={24} />
          <span className="small padding-sm-left">
            Phoenix &rsaquo; Los Angeles &rsaquo; San Francisco &rsaquo; Seattle
          </span>
        </div>
      </div>
      <div
        className={`${
          columns === 'one' || columns === 'one/two-staggered'
            ? 'flex-column'
            : 'flex-row'
        } ${columns === 'one/two' ? 'flex-align-center' : ''}`}
      >
        <div
          className={`flex-column ${likesPaddingClass}`}
          // Enforce minimum width but allow expansion on larger screens
          style={{ flexBasis: likesFlexBasis, minWidth: 150 }}
        >
          {/* Margin behaves differently in flex-box and margins below h3 and above
          paragraphs are not merged */}
          <h3 className="margin-0-bottom">Likes</h3>
          <ul className={`padding-0-h no-default-bullets ${likesFontSize}`}>
            <li>Strongly-typed languages</li>
            <li>Boba (bubble tea)</li>
            <li>Cats</li>
            <li>Finite state machines</li>
            <li>Typography</li>
            <li>Intersectional feminism</li>
            <li>Effective documentation</li>
          </ul>
        </div>
        {fillerIcons}
        <div
          className={`flex-column ${dislikesPaddingClass}`}
          // Enforce minimum width but allow expansion on larger screens
          style={{
            alignSelf: dislikesAlignEnd ? 'flex-end' : undefined,
            flexBasis: dislikesFlexBasis,
            // Create a staggered effect for the one/two-staggered layout
            marginBottom: columns === 'one/two-staggered' ? '-2em' : undefined,
            marginTop: columns === 'one/two-staggered' ? '-7em' : undefined,
            minWidth: 150,
          }}
        >
          {/* Margin behaves differently in flex-box and margins below h3 and above
          paragraphs are not merged */}
          <h3 className={`margin-0-bottom ${dislikesAlignEnd ? 'text-align-right' : ''}`}>
            Dislikes
          </h3>
          <ul
            className={`padding-0-h no-default-bullets small ${likesFontSize} ${
              dislikesAlignEnd ? 'text-align-right' : ''
            }`}
          >
            <li>Manual formatting</li>
            <li>Carbonated beverages</li>
            <li>Unintelligible errors</li>
            <li>Clickbait</li>
            <li>Spicy food</li>
            <li>Comic Sans</li>
            <li>Egotism</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default {
  ...generateTitleProps('Get to know me'),
  content: <GetToKnowMeContent key="get-to-know-me" />,
};

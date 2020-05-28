import map from 'lodash/map';
import range from 'lodash/range';
import React, { FC } from 'react';

type CarouselIndicatorProps = {
  /** The currently visible item index of the carousel */
  currentIndex: number;
  /** The number of items displayed in the carousel */
  numberOfItems: number;
};

/** A series of dot indicators of the current index and number of items in an
 * accompanying Carousel component */
const CarouselIndicator: FC<CarouselIndicatorProps> = ({
  currentIndex,
  numberOfItems,
}) => {
  return (
    <>
      <style jsx>
        {`
          .indicator {
            border-style: solid;
            border-width: 2px;
            box-sizing: border-box;
            height: 0.8em;
            margin: 0.8em 0.3em;
            width: 0.8em;
          }
        `}
      </style>
      {map(range(numberOfItems), (index) => (
        <span
          className={`border-color-space circular indicator ${
            currentIndex === index ? 'background-space' : ''
          }`}
          key={index}
        />
      ))}
    </>
  );
};

export default CarouselIndicator;

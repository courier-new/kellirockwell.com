import map from 'lodash/map';
import React, { FC, Reducer, useReducer } from 'react';
import { useSwipeable } from 'react-swipeable';

const NEXT = 'NEXT';
const PREV = 'PREV';
const RESET = 'RESET';
const STOP = 'STOP';

type CarouselState = {
  direction: typeof NEXT | typeof PREV;
  position: number;
  sliding: boolean;
};
type CarouselAction = typeof RESET | typeof NEXT | typeof PREV | typeof STOP;
export const CAROUSEL_ACTIONS = {
  NEXT,
  PREV,
  RESET,
  STOP,
} as const;

const INITIAL_CAROUSEL_STATE: CarouselState = {
  direction: NEXT,
  position: 0,
  sliding: false,
};

/**
 * Reducer for carousel state and navigating through it
 *
 * @param numberOfItems the total number of items in the carousel
 */
export const carouselReducer =
  (numberOfItems: number): Reducer<CarouselState, CarouselAction> =>
  (state, action): CarouselState => {
    switch (action) {
      case RESET:
        return INITIAL_CAROUSEL_STATE;
      case PREV:
        return {
          ...state,
          direction: PREV,
          position: state.position === 0 ? numberOfItems - 1 : state.position - 1,
          sliding: true,
        };
      case NEXT:
        return {
          ...state,
          direction: NEXT,
          position: state.position === numberOfItems - 1 ? 0 : state.position + 1,
          sliding: true,
        };
      case STOP:
        return { ...state, sliding: false };
      default:
        return state;
    }
  };

/**
 * Shorthand to instantiate and use a new carousel reducer
 *
 * @param numberOfItems the number of items in the carousel
 */
export const useCarouselReducer = (
  numberOfItems: number,
): [CarouselState, React.Dispatch<CarouselAction>] =>
  useReducer(carouselReducer(numberOfItems), INITIAL_CAROUSEL_STATE);

/**
 * Gets the (flex-box) ordered position for an item based on its index in the
 * items array and the current visible item position in the carousel, shifting
 * based on the total number of items to achieve a virtual ordering
 *
 * @param itemIndex the item's actual index in the items array
 * @param currentPosition the current visible item position in the carousel
 * @param numberOfItems the total number of items in the carousel
 */
const getOrderPosition = (
  itemIndex: number,
  currentPosition: number,
  numberOfItems: number,
): number => {
  // To preserve the order as well as the apparent start and end items provided
  // to the carousel, we shift each item's index because the current visible
  // position is actually the current position + 1
  const virtualIndex = (itemIndex + 1) % numberOfItems;
  return virtualIndex - currentPosition < 0
    ? numberOfItems - Math.abs(virtualIndex - currentPosition)
    : virtualIndex - currentPosition;
};

type CarouselProps = {
  /** State of the carousel from a reducer; lifted to the parent component so
   * that siblings can listen in on properties of the carousel */
  carouselState: CarouselState;
  /** Ordered array of items to display in slots on the carousel */
  items: {
    /** The JSX element to render in a slot of the carousel */
    element: JSX.Element;
    /** The key to provide to this item's slot */
    key: string;
  }[];
  /** Handler called on slide event of the carousel */
  onSlide: (slideDirection: typeof NEXT | typeof PREV) => void;
};

/* eslint-disable jsdoc/require-param */
/**
 * A horizontal swipeable carousel component where each element is placed on
 * display in a carousel "slot" and only one slot is visible at a time. The
 * carousel slots can be browsed by swiping through them, in the order that the
 * items are provided
 */
const Carousel: FC<CarouselProps> = ({
  carouselState: { direction, position, sliding },
  items,
  onSlide,
}) => {
  /**
   * Returns the container's CSS transform property based on qualities of the
   * carousel state
   */
  const containerTransform = (): string => {
    // All items are shifted 100% to the "left" (negative x direction)
    if (!sliding) return 'translateX(-100%)';
    if (direction === PREV) return 'translateX(calc(2 * -100%))';
    return 'translateX(0%)';
  };

  /**
   * Hook returns handlers to attach to the outermost container of the carousel
   */
  const swipeHandlers = useSwipeable({
    /** Handler to swipe the carousel to the left */
    onSwipedLeft: (): void => onSlide(NEXT),
    /** Handler to swipe the carousel to the right */
    onSwipedRight: (): void => onSlide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="full-height full-width non-scrollable" {...swipeHandlers}>
      <style jsx>
        {`
          .container {
            transition: ${sliding ? 'none' : 'transform 0.4s ease'};
            transform: ${containerTransform()};
          }
          .slot {
            flex: 1 0 100%;
            flex-basis: 100%;
          }
        `}
      </style>
      <div className="full-height flex-row container">
        {map(items, ({ element, key }, index) => (
          <div
            className="full-height slot scrollable-y"
            key={key}
            style={{ order: getOrderPosition(index, position, items.length) }}
          >
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};
/* eslint-enable jsdoc/require-param */

export default Carousel;

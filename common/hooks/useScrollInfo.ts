import { useState } from 'react';

import { asPercent, Percent } from '../utilities/percent';
import useDeepCompareEffect from './useDeepCompareEffect';

type ScrollPosition = {
  x: number;
  y: number;
};

/**
 * Gets the x and y scroll position of a given element
 *
 * @param el the element to get the scroll position for
 */
const getElementScrollPosition = (el: HTMLElement | null): ScrollPosition => ({
  x: el?.scrollLeft || 0,
  y: el?.scrollTop || 0,
});

/**
 * Gets the percentage down the provided element that the provided scroll
 * position reaches
 *
 * @param el the element to get the scroll position for
 * @param scrollPosition the current y scroll position within the element
 */
const getElementScrollPercent = (
  el: HTMLElement | null,
  scrollPosition: number,
): Percent => {
  // Total scrollable height of the outer container
  const scrollHeight = el?.scrollHeight || 0;
  // Bounding height of the outer container
  const height = el?.getBoundingClientRect().height || 0;

  return asPercent(scrollPosition / (scrollHeight - height));
};

/**
 * Provides the current scroll position in an element as well as the percentage
 * amount of the scroll position down the element
 *
 * @param ref React `RefObject` for the element to get the scroll info for
 */
const useScrollInfo = (
  ref: React.RefObject<HTMLElement>,
): { percent: Percent; position: ScrollPosition; reset: () => void } => {
  const [position, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [percent, setScrollPercent] = useState<Percent>(asPercent(0));

  const reset = () => {
    setScrollPercent(asPercent(0));
    setScrollPosition({ x: 0, y: 0 });
  };

  useDeepCompareEffect(() => {
    const { current: currentEl } = ref;
    if (currentEl) {
      // Throttle request to not overload with repaints
      let requestRunning: number | null = null;
      // We start a timer when handling a scroll to check the scroll position
      // again once the user finishes scrolling. This way, even with the
      // throttling, we can be sure our position and percent are accurate at the
      // end of the scroll. We assign the timer to a variable so that we can
      // clear it every time the handler is re-run. That way, only the last
      // timer (when the user actually stops scrolling) will fire
      let lastResizeTimeout: NodeJS.Timeout | undefined;

      /**
       * Helper that sets the scroll position and percent
       *
       * @param el the current element we check the scroll position of
       */
      const setScrollInfo = (el: HTMLElement): void => {
        const currentScrollPosition = getElementScrollPosition(el);
        setScrollPosition(currentScrollPosition);
        setScrollPercent(getElementScrollPercent(el, currentScrollPosition.y));
      };

      /** Handler to set scroll position */
      const handleScroll = (): void => {
        if (requestRunning === null) {
          // Clear the previous resize timeout -- this way only the very last
          // timer will fire
          if (lastResizeTimeout) {
            clearTimeout(lastResizeTimeout);
          }
          requestRunning = 1;
          requestRunning = window.requestAnimationFrame(() => {
            setScrollInfo(currentEl);

            setTimeout(() => {
              requestRunning = null;
            }, 50);

            // Set a timer to check the scroll position/percentage again later
            lastResizeTimeout = setTimeout(() => {
              setScrollInfo(currentEl);
            }, 200);
          });
        }
      };

      handleScroll();

      // See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
      currentEl.addEventListener('scroll', handleScroll, { passive: true });

      // Clean up by removing the scroll listener
      return (): void => {
        currentEl.removeEventListener('scroll', handleScroll);
      };
    }
    return undefined;
  }, [ref.current]);

  return { percent, position, reset };
};

export default useScrollInfo;

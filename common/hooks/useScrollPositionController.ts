import { useCallback } from 'react';
import {
  ScrollPosition,
  useScrollPositionDispatch,
} from '../context/scrollPositionState';

import { asPercent, Percent } from '../utilities/percent';
import useDeepCompareEffect from './useDeepCompareEffect';

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
 * Sets up an event listener on scroll of the provided `ref` to compute the
 * position and percentage the user has scrolled.
 *
 * @notes
 * - Only one controller should be active at a time or else multiple,
 *   conflicting scroll positions will be reported at the same time
 * @param ref React `RefObject` for the element to watch for computing the
 * scroll position
 */
const useScrollPositionController = (
  ref: React.RefObject<HTMLElement>,
): { reset: () => void } => {
  const scrollPositionDispatch = useScrollPositionDispatch();

  /**
   * Shorthand to dispatch a new scroll position and percent
   *
   * @param position the new `ScrollPosition` to set
   * @param percent the equivalent new `Percent` the page has been scrolled to set
   */
  const setScrollPosition = useCallback(
    (position: ScrollPosition, percent: Percent) =>
      scrollPositionDispatch?.({
        payload: {
          percent,
          position,
        },
        type: '@scroll-position-state/set-position',
      }),
    [scrollPositionDispatch],
  );

  /** Method to reset scroll position on-demand */
  const reset = useCallback(() => setScrollPosition({ x: 0, y: 0 }, asPercent(0)), [
    setScrollPosition,
  ]);

  useDeepCompareEffect(() => {
    if (ref.current) {
      const { current: currentEl } = ref;

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

        setScrollPosition(
          currentScrollPosition,
          getElementScrollPercent(el, currentScrollPosition.y),
        );
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

  return { reset };
};

export default useScrollPositionController;

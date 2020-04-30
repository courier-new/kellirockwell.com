/* eslint-disable no-console */
import { useState } from 'react';
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
const getElementScrollPosition = (el: Element | null): ScrollPosition => ({
  x: el?.scrollLeft || 0,
  y: el?.scrollTop || 0,
});

/**
 * Returns `true` if the `ref` is null and logs a message to the console if so.
 *
 * @param parentRef React `RefObject` for the parent element containing all of
 * the sections
 */
const hasNullRef = (parentRef: React.RefObject<Element>): boolean => {
  const parentRefNull = !parentRef.current;
  if (parentRefNull) {
    console.warn(
      'Could not get current section index: non-null outer ref is necessary to trace scroll position.',
    );
    return true;
  }
  return false;
};

/**
 * Calculates the index of the section the user has scrolled to based on the
 * known starting positions of each section and the current y scroll position
 * within the parent element, given a React `RefObject` to a parent element.
 * Used to mark the current section in the `SideNavMenu` table of contents
 *
 * Returns a tuple of the index of the current section (based on the ordering of
 * the section starting positions) and a function to manually recalculate it
 *
 * @notes "onScroll" event does not consistently fire when following a hash link
 *   to a same-page anchor (e.g. "#section2"), so we hook into the Next router's
 *   even to manually recalculate the section index when we follow one of these
 *   links using the function returned as the second element of the tuple
 *
 * @param parentRef React `RefObject` for the parent element containing all of
 * the sections, for tracking the appropriate relative scroll position
 * @param sectionStartingPositions flattened list of starting positions, as
 * y-coordinate numbers, for all sections and subsections within the parent
 * element, in the same order as the sections appear on the page
 */
const useCurrentSectionIndex = (
  parentRef: React.RefObject<Element>,
  sectionStartingPositions: number[],
): [number, (() => void) | undefined] => {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  // State to hold main calculating function (second item returned in tuple)
  const [calculateSectionIndexFn, setCalculateSectionIndexFn] = useState<
    () => void | undefined
  >();

  // We use a deep compare effect here because otherwise, the effect will run
  // any time any of the refs re-renders, even though the refs are not changing
  // in these cases. Since the refs re-render every time the sectionIndex
  // changes (and even worse, every time the scroll percentage changes, since
  // the two hooks are often used from the same component), this was causing
  // massive amounts of re-running
  useDeepCompareEffect(() => {
    // If any of the refs is null or the section heights are unavailable, break
    if (hasNullRef(parentRef) || sectionStartingPositions.length === 0) return undefined;

    // Get current values for the parent ref
    // We know this is not null due to the previous check
    const parentRefCurrentValue = parentRef.current as Element;

    // Throttle request to not overload with repaints
    let requestRunning: number | null = null;
    // We start a timer when handling a scroll to recheck the section index
    // again once the user finishes scrolling. This way, even with the
    // throttling, we can be sure our section index is accurate at the end of
    // the scroll. We assign the timer to a variable so that we can clear it
    // every time the handler is re-run. That way, only the last timer (when the
    // user actually stops scrolling) will fire
    let lastOnScrollTimeout: NodeJS.Timeout | undefined;

    /** Handler to calculate the section starting positions and find the current
     * section, to attach to parent element scroll and resize listeners */
    const calculateSectionIndex = (): void => {
      // Lock computation-heavy calculations in throttled block
      if (requestRunning === null) {
        // Clear the previous resize timeout -- this way only the very last
        // timer will fire
        if (lastOnScrollTimeout) {
          clearTimeout(lastOnScrollTimeout);
        }

        /** Callback to attach to animation frame request that contains the
         * actual logic for calculating the section index */
        const requestAnimationFrameCallback = (): void => {
          // Get the current scroll position of the outer container
          const { y: yScrollPos } = getElementScrollPosition(parentRefCurrentValue);

          // Remember the total scrollable height of the outer container
          const scrollHeight = parentRefCurrentValue.scrollHeight || 0;
          // Remember the bounding (visible) height of the outer container
          const height = parentRefCurrentValue.getBoundingClientRect()?.height || 0;

          // For tracking the section index to set at the end
          let newSectionIndex = -1;

          // Before we go into checking the starting positions of all the
          // individual sections, we can first check for some easy wins if the
          // current scroll position is all the way at the top or all the way at
          // the bottom

          // Check if the current scroll position + the bounded height of the
          // outer container is greater than or equal to the total scrollable
          // height of the outer container (minus a buffer of 2). If it is,
          // we've hit the bottom of the page and can just return the last
          // section index
          if (yScrollPos + height >= scrollHeight - 2) {
            newSectionIndex = sectionStartingPositions.length - 1;
          }

          // Check if the current scroll position is 0 or negative. If it is, we're
          // at the top of the page and can just return the first section index
          if (yScrollPos <= 0) {
            newSectionIndex = 0;
          }

          // Only proceed with heavier calculations if we couldn't set the index
          // with one of these ways
          if (newSectionIndex === -1) {
            newSectionIndex = 0; // Default

            let i = 0;
            // Check section starting positions against current scroll position to
            // determine the current section; the current section is the last
            // section whose y position our scroll position is greater than
            while (sectionStartingPositions.length > i) {
              const currentSectionStartingPos = sectionStartingPositions[i];
              // If the current y scroll position is still equal to or greater
              // than the current section's starting position
              if (yScrollPos >= currentSectionStartingPos) {
                // If it's the last section, set that section as the index
                if (i === sectionStartingPositions.length - 1) {
                  newSectionIndex = i;
                  break;
                } else {
                  // Otherwise, check the next section
                  i += 1;
                }
              } else {
                // Otherwise, we've gone too far; set the section to the
                // previous index (or else the current section, if it's the
                // first one)
                newSectionIndex = i > 0 ? i - 1 : 0;
                break;
              }
            }
          }

          setSectionIndex(newSectionIndex);
        };

        requestRunning = 1;
        requestRunning = window.requestAnimationFrame(requestAnimationFrameCallback);

        setTimeout(() => {
          requestRunning = null;
        }, 100);

        // Set a timer to check the scroll position again later
        lastOnScrollTimeout = setTimeout(
          () => window.requestAnimationFrame(requestAnimationFrameCallback),
          200,
        );
      }
    };

    setCalculateSectionIndexFn(calculateSectionIndex);

    calculateSectionIndex();

    // Attach event listener to parent element scroll and window resize events
    if (parentRefCurrentValue) {
      parentRefCurrentValue.addEventListener('scroll', calculateSectionIndex, {
        // See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
        passive: true,
      });
    }
    if (window) {
      window.addEventListener('resize', calculateSectionIndex);
    }

    // Detach event listeners to clean up
    return (): void => {
      if (parentRefCurrentValue) {
        parentRefCurrentValue.removeEventListener('scroll', calculateSectionIndex);
      }
      if (window) {
        window.removeEventListener('resize', calculateSectionIndex);
      }
    };
  }, [parentRef, sectionStartingPositions]);

  return [sectionIndex, calculateSectionIndexFn];
};

export default useCurrentSectionIndex;

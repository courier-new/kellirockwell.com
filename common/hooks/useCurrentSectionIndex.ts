/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

type ScrollPosition = {
  x: number;
  y: number;
};

/**
 * Gets the x and y scroll position of a given element
 *
 * @param el the element to get the scroll position for
 */
const getElementScrollPosition = (el: Element | null): ScrollPosition => {
  return { x: el?.scrollLeft || 0, y: el?.scrollTop || 0 };
};

/**
 * Calculates which section within an element corresponds to the current scroll
 * position, given a ref to a parent element as well as refs to all of the
 * sections within it. Returns a tuple of the index relative to the section refs
 * and a function to manually recalculate the index.
 *
 * Ex: if sectionRefs contains refs to sections "About", "More Info", "Contact",
 * and scroll position falls within the bounds of "More Info", hook returns the
 * index 1
 *
 * @notes
 * - Scroll position is compared to the start of a section, and start is based
 *   on the top of the bounding box relative to the parent element
 * - "onScroll" event does not consistently fire when following a hash link to a
 *   same-page anchor, so using the function returned as the second element of
 *   the tuple, we can hook into the Next router's event instead to manually
 *   recalculate the section index
 *
 * @param sectionRefs list of refs for all of the different sections on the page
 * @param parentRef ref for the parent element containing all of the sections,
 * for tracking the appropriate relative scroll position
 */
const useCurrentSectionIndex = (
  sectionRefs: React.RefObject<Element>[],
  parentRef: React.RefObject<Element>,
): [number, (() => void) | undefined] => {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  // State to hold main calculating function, second item returned in tuple
  const [calculateSectionIndexFn, setCalculateSectionIndexFn] = useState<
    () => void | undefined
  >();

  useEffect(() => {
    // Get current values for all section refs
    const sectionRefCurrentValues = map(sectionRefs, 'current');

    // If any of the refs is null, break and print warning
    const parentRefNull = !parentRef.current;
    if (parentRefNull) {
      console.warn(
        'Could not get current section index: non-null outer ref is necessary to trace scroll position.',
      );
      return undefined;
    }
    const sectionRefIsNull = reduce(
      sectionRefCurrentValues,
      (oneOfRestIsNull, current) => oneOfRestIsNull || !current,
      false,
    );
    if (sectionRefIsNull) {
      console.warn(
        'Could not get current section index: one or more of section refs is null.',
      );
      return undefined;
    }

    // Throttle request to not overload with repaints
    let requestRunning: number | null = null;
    /** Handler to calculate the section starting positions and find the current
     * section to attach to parent element scroll and resize listeners */
    const calculateSectionIndex = (): void => {
      if (requestRunning === null) {
        requestRunning = 1;
        requestRunning = window.requestAnimationFrame(() => {
          // Set the current scroll position of the outer container
          const { y: yScrollPos } = getElementScrollPosition(parentRef.current);
          // Reduce over section refs to determine the y-position that each
          // section starts at
          const sectionStartingPositions = reduce(
            sectionRefCurrentValues,
            (positionsSoFar, current, index) => {
              // The y positional height of the current section is equal to the
              // top of the curernt section's bounding box plus an offset of the
              // current y scroll position; Offset by an additional 2px for
              // better UX
              const currentSectionStartingPos =
                (current?.getBoundingClientRect().top || 0) + yScrollPos - 2;
              if (index === 0) {
                return [currentSectionStartingPos];
              }
              return [...positionsSoFar, currentSectionStartingPos];
            },
            [] as number[],
          );

          // Check section starting positions against current scroll position to
          // determine the current section; the current section is the last
          // section whose y position our scroll position is greater than
          let i = 0;
          while (sectionStartingPositions.length > i) {
            const currentSectionStartingPos = sectionStartingPositions[i];
            // If the current y scroll position is still equal to or greater
            // than the current section's starting position
            if (yScrollPos >= currentSectionStartingPos) {
              // If it's the last section, set that section as the index
              if (i === sectionStartingPositions.length - 1) {
                setSectionIndex(i);
                break;
              } else {
                // Otherwise, check the next section
                i += 1;
              }
            } else {
              // Otherwise, we've gone too far; set the section as the previous index
              setSectionIndex(i - 1);
              break;
            }
          }

          setTimeout(() => {
            requestRunning = null;
          }, 100);
        });
      }
    };

    setCalculateSectionIndexFn(calculateSectionIndex);

    calculateSectionIndex();

    // Attach event listener to parent element scroll and window resize
    const { current: parentRefCurrentValue } = parentRef;
    if (parentRefCurrentValue) {
      parentRefCurrentValue.addEventListener('scroll', calculateSectionIndex);
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
  }, [sectionRefs, parentRef]);

  return [sectionIndex, calculateSectionIndexFn];
};

export default useCurrentSectionIndex;

/* eslint-disable no-console */
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { useState } from 'react';

import { Slug } from '../constants/slugs';
import { useSectionHeightsDispatch } from '../context/sectionHeightsState';
import useDeepCompareEffect from './useDeepCompareEffect';

/**
 * Returns `true` if any of the `ref`s are null. Logs a message to the console
 * in case of finding at least one non-null `ref`.
 *
 * @param sectionRefs list of React `RefObject`s for all of the different
 * sections on the page
 */
const hasNullRefs = (sectionRefs: React.RefObject<HTMLElement>[]): boolean => {
  // Get current values for all section refs
  const sectionRefCurrentValues = map(sectionRefs, 'current');
  const sectionRefIsNull = reduce(
    sectionRefCurrentValues,
    (oneOfRestIsNull, current) => oneOfRestIsNull || !current,
    false,
  );
  if (sectionRefIsNull) {
    console.warn(
      'Could not get current section index: one or more of section refs is null.',
    );
    return true;
  }
  return false;
};

/**
 * Maps each section `ref` to its top offset relative to its parent to determine
 * the y-position that each section starts at
 *
 * @param sectionRefCurrentValues the current values for a list of non-null
 * section `ref`s
 */
const getSectionStartingPositions = (sectionRefCurrentValues: HTMLElement[]): number[] =>
  map(
    sectionRefCurrentValues,
    (currentSection): number =>
      // We offset by an additional 2px for better UX
      (currentSection.offsetTop || 0) - 2,
  );

/**
 * Measures the starting positions of the sections on a page using their
 * `RefObject` offset positions, dispatches actions to update them in context by
 * the page's slug, and sets up a listener to recalculate them on window resize
 *
 * Returns the array of section y positions in the same order as the section
 * `ref`s were supplied
 *
 * @param sectionRefs list of refs for all of the different sections on the page
 * @param slug slug for the parent page of the sections, for mapping it to the
 * right key in SectionHeightsContext
 */
const useMeasureSectionHeights = <Element extends HTMLElement = HTMLElement>(
  sectionRefs: React.RefObject<Element>[],
  slug: Slug,
): [number[]] => {
  const [sectionHeights, setSectionHeights] = useState<number[]>([]);
  const dispatch = useSectionHeightsDispatch();
  /**
   * Dispatch an action to set the section starting positions
   *
   * @param heights the heights to set
   */
  const dispatchSectionHeights = (heights: number[]): void =>
    dispatch?.({
      payload: {
        heights,
        slug,
      },
      type: '@section-heights-state/set-heights',
    });

  // We use a deep compare effect here because otherwise, the effect will run
  // any time any of the refs re-renders, even though the refs are not changing
  // in these cases
  useDeepCompareEffect(() => {
    // If any of the refs is null, break
    if (hasNullRefs(sectionRefs)) return undefined;

    // Get current values for all section refs
    // We know these are not null due to the previous check
    const sectionRefCurrentValues = map(sectionRefs, 'current') as Element[];

    // Throttle request to not overload with repaints
    let requestRunning: number | null = null;
    // We start a timer when handling a resize to check the starting positions
    // again once the user finishes resizing. This way, even with the
    // throttling, we can be sure our starting positions are accurate at the end
    // of the resize. We assign the timer to a variable so that we can clear it
    // every time the handler is re-run. That way, only the last timer (when the
    // user actually stops resizing) will fire
    let lastOnResizeTimeout: NodeJS.Timeout | undefined;

    /** Handler to calculate the section starting positions, to attach to parent
     * element scroll and resize listeners */
    const measureSectionHeights = (): void => {
      if (requestRunning === null) {
        // Clear the previous resize timeout -- this way only the very last
        // timer will fire
        if (lastOnResizeTimeout) {
          clearTimeout(lastOnResizeTimeout);
        }

        /** Callback to attach to animation frame request that makes the actual
         * call for getting the section starting positions */
        const requestAnimationFrameCallback = (): void => {
          const sectionStartingPositions = getSectionStartingPositions(
            sectionRefCurrentValues,
          );

          if (sectionStartingPositions.length > 0) {
            setSectionHeights(sectionStartingPositions);
            dispatchSectionHeights(sectionStartingPositions);
          }
        };

        requestRunning = 1;
        requestRunning = window.requestAnimationFrame(requestAnimationFrameCallback);

        setTimeout(() => {
          requestRunning = null;
        }, 100);

        // Set a timer to check the starting positions again later
        lastOnResizeTimeout = setTimeout(
          () => window.requestAnimationFrame(requestAnimationFrameCallback),
          200,
        );
      }
    };

    measureSectionHeights();

    // Attach the resize listener to remeasure the section heights
    window.addEventListener('resize', measureSectionHeights);
    // Clean up by removing the listener
    return (): void => window.removeEventListener('resize', measureSectionHeights);
  }, [sectionRefs]);

  return [sectionHeights];
};

export default useMeasureSectionHeights;

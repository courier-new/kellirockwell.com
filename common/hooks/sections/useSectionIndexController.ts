/* eslint-disable no-console */
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { useCallback, useMemo } from 'react';

import { SectionRefsMap } from '../../../content/utilities/types';
import { shouldShowSideNavMenu } from '../../constants/breakpoint-sizes';
import { useScrollPositionDispatch } from '../../context/scrollPositionState';
import useDeepCompareEffect from '../useDeepCompareEffect';
import useDisplaySize from '../useDisplaySize';

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
 * Returns `true` if any of the `ref`s are null. Logs a message to the console
 * in case of finding at least one non-null `ref`.
 *
 * @param sectionRefs list of React `RefObject`s for all of the different
 * sections on the page
 */
const hasNullRefs = (sectionRefs: React.RefObject<HTMLElement>[]): boolean => {
  if (!sectionRefs.length) {
    return true;
  }

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
 * Returns `true` if the `ref` is null and logs a message to the console if so.
 *
 * @param ref React `RefObject` for the parent element containing all of
 * the sections
 */
const hasNullRef = (ref: React.RefObject<Element>): boolean => {
  const refNull = !ref.current;
  if (refNull) {
    console.warn(
      'Could not get current section index: non-null outer ref is necessary to trace scroll position.',
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
 * Computes the index corresponding to section of the screen containing the
 * current scroll position by measuring the starting heights of each section on
 * the page by their `sectionRefs` using offset positions. Dispatches action to
 * update the index in context, and sets up listeners to recalculate on scroll
 * and window resize
 *
 * @param parentRef React `RefObject` for the parent element containing all of
 * the sections, for tracking the appropriate relative scroll position
 * @param sectionRefsMap `SectionRefsMap` of the React `RefObject`s for each of
 * the different sections on the page in the order that they appear
 */
const useSectionIndexController = <Element extends HTMLElement = HTMLElement>(
  parentRef: React.RefObject<Element>,
  sectionRefsMap: SectionRefsMap,
): void => {
  // Extract each section ref from the section map
  const sectionRefs = useMemo(() => map(sectionRefsMap, 'ref') || [], [sectionRefsMap]);

  const scrollPositionDispatch = useScrollPositionDispatch();

  /**
   * Shorthand to dispatch a new section index
   *
   * @param position the new `ScrollPosition` to set
   * @param percent the equivalent new `Percent` the page has been scrolled to set
   */
  const setSectionIndex = useCallback(
    (index: number) =>
      scrollPositionDispatch?.({
        payload: { index },
        type: '@scroll-position-state/set-section-index',
      }),
    [scrollPositionDispatch],
  );

  const [displaySize] = useDisplaySize();

  // We use a deep compare effect here because otherwise, the effect will run
  // any time any of the refs re-renders, even though the refs are not changing
  // in these cases
  useDeepCompareEffect(() => {
    // If we aren't at a display size that even uses the current section index,
    // break
    if (!shouldShowSideNavMenu(displaySize)) return undefined;

    // If any of the refs is null, break
    if (hasNullRefs(sectionRefs) || hasNullRef(parentRef)) return undefined;

    // Get current values for all section refs and parent ref
    // We know these are not null due to the previous check
    const sectionRefCurrentValues = map(sectionRefs, 'current') as Element[];
    const parentRefCurrentValue = parentRef.current as Element;

    // Throttle request to not overload with repaints
    let requestRunning: number | null = null;
    // We start a timer when handling a scroll/resize to check the starting
    // positions and index again once the user finishes scrolling/resizing. This
    // way, even with the throttling, we can be sure our starting positions and
    // index are accurate at the end of the scroll/resize. We assign the timer
    // to a variable so that we can clear it every time the handler is re-run.
    // That way, only the last timer (when the user actually stops
    // scrolling/resizing) will fire
    let lastTimeout: NodeJS.Timeout | undefined;

    /** Handler to calculate the section starting positions and calculate the
current section index based on the scroll position, to attach to parent *
element scroll and resize listeners */
    const recalculate = (): void => {
      if (requestRunning === null) {
        // Clear the previous timeout so only the very last timer will fire
        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }

        /** Callback to attach to animation frame request that makes the actual
         * call for calculating the section index */
        const requestAnimationFrameCallback = (): void => {
          const sectionStartingPositions = getSectionStartingPositions(
            sectionRefCurrentValues,
          );

          if (sectionStartingPositions.length > 0) {
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
          }
        };

        requestRunning = 1;
        requestRunning = window.requestAnimationFrame(requestAnimationFrameCallback);

        setTimeout(() => {
          requestRunning = null;
        }, 100);

        // Set a timer to run the callback again later
        lastTimeout = setTimeout(
          () => window.requestAnimationFrame(requestAnimationFrameCallback),
          200,
        );
      }
    };

    recalculate();

    // Attach listeners to recalculate on window resize or scroll
    if (window) {
      window.addEventListener('resize', recalculate);
    }
    if (parentRefCurrentValue) {
      parentRefCurrentValue.addEventListener('scroll', recalculate, {
        // See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
        passive: true,
      });
    }

    // Detach all event listeners to clean up
    return (): void => {
      if (parentRefCurrentValue) {
        parentRefCurrentValue.removeEventListener('scroll', recalculate);
      }
      if (window) {
        window.removeEventListener('resize', recalculate);
      }
    };
  }, [sectionRefs]);
};

export default useSectionIndexController;

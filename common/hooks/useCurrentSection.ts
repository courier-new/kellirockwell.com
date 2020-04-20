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
 * sections within it, and returns its index within the section refs
 *
 * Ex: if sectionRefs contains refs to sections "About", "More Info", "Contact",
 * and scroll position falls within the bounds of "More Info", hook returns the
 * index 1
 *
 * @param sectionRefs list of refs for all of the different sections on the page
 * @param parentRef ref for the parent element containing all of the sections,
 * for tracking the appropriate relative scroll position
 */
const useCurrentSectionIndex = (
  sectionRefs: React.RefObject<Element>[],
  parentRef: React.RefObject<Element>,
): number => {
  const [sectionIndex, setSectionIndex] = useState<number>(0);

  useEffect(() => {
    // Get current values for all section refs
    const sectionRefCurrentValues = map(sectionRefs, 'current');

    // If any of the refs is null, break
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
    /** Handler to calculate the section sizes and find the current section */
    const handleScroll = (): void => {
      if (requestRunning === null) {
        requestRunning = 100;
        requestRunning = window.requestAnimationFrame(() => {
          // Set the current scroll position of the outer container
          const { y: yScrollPos } = getElementScrollPosition(parentRef.current);
          // Reduce over section refs to determine the y-position that each
          // section starts at
          const sectionHeights = reduce(
            sectionRefCurrentValues,
            (heightsSoFar, current, index) => {
              if (index === 0) {
                // TODO: consider using relative y pos of item instead of
                // scrollHeight for greater flexibility over which elements we
                // apply the refs to
                return [current?.scrollHeight || 0];
              }
              const prevHeight = heightsSoFar[index - 1];
              return [...heightsSoFar, prevHeight + (current?.scrollHeight || 0)];
            },
            [] as number[],
          );

          // Check section heights against current scroll position to
          // determine the current section
          let i = 0;
          while (sectionHeights.length > i) {
            const currentSectionHeight = sectionHeights[i];
            if (yScrollPos > currentSectionHeight) {
              if (i === sectionHeights.length - 1) {
                setSectionIndex(i);
                break;
              } else {
                i += 1;
              }
            } else {
              setSectionIndex(i);
              break;
            }
          }

          setTimeout(() => {
            requestRunning = null;
          }, 100);
        });
      }
    };

    handleScroll();

    const { current: parentRefCurrentValue } = parentRef;

    if (parentRefCurrentValue) {
      parentRefCurrentValue.addEventListener('scroll', handleScroll);
      return (): void => {
        if (parentRefCurrentValue) {
          parentRefCurrentValue.removeEventListener('scroll', handleScroll);
        }
      };
    }
    return undefined;
  }, [sectionRefs, parentRef]);

  return sectionIndex;
};

export default useCurrentSectionIndex;

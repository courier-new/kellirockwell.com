import flow from 'lodash/flow';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import filter from 'lodash/filter';
import head from 'lodash/head';
import { useState, useMemo, useEffect } from 'react';
import {
  BREAKPOINT_SIZES,
  DisplaySize,
  DisplaySizeWidth,
} from '../../constants/breakpoint-sizes';

type BreakpointObj = { name: DisplaySize; size: DisplaySizeWidth };

/**
 * Compares the window width to the known collection of breakpoints and returns
 * the DisplaySize corresponding to the width
 *
 * @param windowWidth the current width of the window
 */
const getDisplaySizeFromWindowWidth = (windowWidth: number): DisplaySize => {
  return flow([
    // Map breakpoints to an array of objects for more explicit key-based access
    // on each entity
    (bs: typeof BREAKPOINT_SIZES): BreakpointObj[] =>
      map(bs, (s, b) => ({ name: b as DisplaySize, size: s })),
    // Sort breakpoints by size from smallest to largest
    (bs: BreakpointObj[]): BreakpointObj[] => sortBy(bs, 'size'),
    // Reverse list so that largest is first
    reverse,
    // Filter list to breakpoints whose minimum width is less than or equal to
    // the screen width
    (bs: BreakpointObj[]): BreakpointObj[] =>
      filter(bs, ({ size }) => size <= windowWidth),
    // The name of the head one is our display size, default is mobile
    (bs: BreakpointObj[]): DisplaySize => head(bs)?.name || 'MOBILE',
  ])(BREAKPOINT_SIZES);
};

/**
 * Determines the DisplaySize of the current window based on the window width
 * and returns a tuple of the DisplaySize with the window width itself
 */
const useDisplaySize = (): [DisplaySize, number] => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Throttle request to not overload with repaints
    let requestRunning: number | null = null;
    // We start a timer when handling a resize to check the size again once the
    // user finishes resizing. This way, even with the throttling, we can be
    // sure our windowWidth is accurate at the end of the resize. We assign the
    // timer to a variable so that we can clear it every time the handler is
    // re-run. That way, only the last timer (when the user actually stops
    // resizing) will fire
    let lastResizeTimeout: NodeJS.Timeout | undefined;
    /** Remeasures and sets the window width */
    const handleResize = (): void => {
      if (requestRunning === null) {
        // Clear the previous resize timeout -- this way only the very last
        // timer will fire
        if (lastResizeTimeout) {
          clearTimeout(lastResizeTimeout);
        }
        requestRunning = 1;
        setWindowWidth(window.innerWidth);

        setTimeout(() => {
          requestRunning = null;
        }, 200);

        // Set a timer to check the size again later
        lastResizeTimeout = setTimeout(() => setWindowWidth(window.innerWidth), 500);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  const memoizedDisplaySize = useMemo(() => getDisplaySizeFromWindowWidth(windowWidth), [
    windowWidth,
  ]);

  return [memoizedDisplaySize, windowWidth];
};

export default useDisplaySize;

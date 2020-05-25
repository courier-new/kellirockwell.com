import { useEffect, useState } from 'react';

/**
 * Tracks if the current device environment matches the provided media query.
 *
 * @param query the media query to watch, e.g. '(prefers-color-scheme: dark)'
 */
const useMediaQuery = (query: string): boolean => {
  const [doesMatch, setDoesMatch] = useState(false);

  useEffect(() => {
    /** Handler for media query state change */
    const handleChange = ({ matches }: MediaQueryList | MediaQueryListEvent): void =>
      setDoesMatch(matches);

    /** MediaQueryList object representing the parsed results of the specified
     * media query string, on which we can also attach listeners for changes in
     * the query */
    const matcher = window.matchMedia(query);

    // Attach listener depending on the method available
    const isModern = 'addEventListener' in matcher;
    if (isModern) {
      matcher.addEventListener('change', handleChange);
    } else {
      matcher.addListener(handleChange);
    }

    handleChange(matcher);

    // Remove listeners on clean up
    return (): void => {
      if (isModern) {
        matcher.removeEventListener('change', handleChange);
      } else {
        matcher.removeListener(handleChange);
      }
    };
  }, [query]);

  return doesMatch;
};

/** Tracks if the current device environment matches the media query to prefer a
 * dark color scheme */
export const usePrefersDarkMode = (): boolean =>
  useMediaQuery('(prefers-color-scheme: dark)');

export default useMediaQuery;

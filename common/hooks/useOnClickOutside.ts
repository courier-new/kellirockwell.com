import useDeepCompareEffect from './useDeepCompareEffect';

/**
 * Detects clicks outside of the provided element and handles them with the
 * provided callback
 *
 * Based on https://usehooks.com/useOnClickOutside/ and
 * https://github.com/Andarist/use-onclickoutside/blob/master/src/index.ts
 *
 * @param ref the React `RefObject` to consider clicks inside or outside of
 * @param callback the function to call to handle a click outside
 */
const useOnClickOutside = <Element extends HTMLElement = HTMLElement>(
  ref: React.RefObject<Element>,
  callback: (event: MouseEvent | TouchEvent) => void,
): void => {
  useDeepCompareEffect(() => {
    /**
     * The listener callback to attach to mouse/touch events
     *
     * @param event the event that triggers the callback
     */
    const listener = (event: MouseEvent | TouchEvent): void => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback(event);
    };

    document.addEventListener('mousedown', listener, { passive: true });
    document.addEventListener('touchstart', listener, { passive: true });

    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};

export default useOnClickOutside;

import { useCallback, useRef } from 'react';

import useScrollPositionController from './useScrollPositionController';

/**
 * Hook for configuring common controls for a regular page using a `Screen`
 * component. For a `Screen` with dedicated sections and a sidebar, use
 * `useScreenSections` instead
 *
 * Returns a ref to attach to the outermost scrollable container of the main
 * screen content and a method to reset the scroll position to the top of the
 * screen on route change
 */
const useScreen = (): {
  ref: React.RefObject<HTMLDivElement>;
  resetScroll: () => void;
} => {
  /**
   * Attach controllers for section index and scroll position to the ref of the
   * outermost scrollable container of the main screen content
   *
   * @notes Occasionally throws error "Can't perform a React state update on an
   * unmounted component" when screen unmounts.
   */
  const ref = useRef<HTMLDivElement>(null);

  const { reset } = useScrollPositionController(ref);

  const resetScroll = useCallback(() => {
    reset();
    ref.current?.scrollTo({ top: 0 });
  }, [reset]);

  return {
    ref,
    resetScroll,
  };
};

export default useScreen;

import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Attaches event listeners to various router events
 *
 * @param config configuration object of callbacks for the route change handlers
 * to support
 */
const useOnRouteChange = (
  config: Partial<{
    onHashChangeStart: () => void;
    onRouteChangeComplete: () => void;
    onRouteChangeStart: () => void;
  }>,
): void => {
  const router = useRouter();

  useEffect(() => {
    if (config.onRouteChangeStart) {
      router.events.on('routeChangeStart', config.onRouteChangeStart);
    }

    if (config.onRouteChangeComplete) {
      router.events.on('routeChangeComplete', config.onRouteChangeComplete);
    }

    if (config.onHashChangeStart) {
      router.events.on('hashChangeStart', config.onHashChangeStart);
    }

    // Call methods to remove all handlers
    return (): void => {
      if (config.onHashChangeStart) {
        router.events.off('hashChangeStart', config.onHashChangeStart);
      }

      if (config.onRouteChangeComplete) {
        router.events.off('hashChangeStart', config.onRouteChangeComplete);
      }

      if (config.onRouteChangeStart) {
        router.events.off('hashChangeStart', config.onRouteChangeStart);
      }
    };
  }, [config, router.events]);
};

export default useOnRouteChange;

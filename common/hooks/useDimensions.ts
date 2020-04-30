import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/member-ordering */
type DimensionObject = {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
};
/* eslint-enable @typescript-eslint/member-ordering */

interface ResizeObserver {
  /** Clears both the observationTargets and activeTargets lists. */
  disconnect: () => void;
  new (callback: ResizeObserverCallback): this;
  /** Adds target to the list of observed elements. */
  observe: (target: Element) => void;
  /** Removes target from the list of observed elements. */
  unobserve: (target: Element) => void;
}

/** This callback delivers ResizeObserver's notifications. It is invoked by a
 * broadcast active observations algorithm. */
type ResizeObserverCallback = (
  entries: readonly ResizeObserverEntry[],
  observer: ResizeObserver,
) => void;

interface ResizeObserverEntry {
  /** Element's content rect when ResizeObserverCallback is invoked. */
  readonly contentRect: DOMRectReadOnly;
  /** @param target The Element whose size has changed. */
  new (target: Element): this;
  /** The Element whose size has changed. */
  readonly target: Element;
}

// See https://github.com/Microsoft/TypeScript/issues/28502
declare global {
  const ResizeObserver: ResizeObserver;
}

/**
 * Returns the bounds of an HTML element as a DimensionObject
 *
 * @param node the HTML element for which to extract the dimensions
 */
const getDimensionObject = <Element extends HTMLElement = HTMLElement>(
  node: Element,
): DimensionObject => {
  const rect = node.getBoundingClientRect();

  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
    x: rect.x ?? rect.left,
    y: rect.y ?? rect.top,
  };
};

/**
 * A react hook to measure the dimensions of a DOM node, provided as a ref
 *
 * @param ref the React ref object to measure
 */
const useDimensions = <Element extends HTMLElement = HTMLElement>(
  ref: React.RefObject<Element | null>,
): undefined | DimensionObject => {
  const [dimensions, setDimensions] = useState<DimensionObject | undefined>();

  useEffect((): (() => void) | undefined => {
    const { current } = ref;
    if (current) {
      // Throttle request to not overload with repaints
      let requestRunning: number | null = null;
      /** Measure and re-set the dimensions for the node */
      const measure = (): void => {
        if (requestRunning === null) {
          requestRunning = window.requestAnimationFrame(() => {
            setDimensions(getDimensionObject(current));
            setTimeout(() => {
              requestRunning = null;
            }, 200);
          });
        }
      };

      measure();

      window.addEventListener('resize', measure);
      window.addEventListener('scroll', measure);

      return (): void => {
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure);
      };
    }
    return undefined;
  }, [ref]);

  return dimensions;
};

export default useDimensions;

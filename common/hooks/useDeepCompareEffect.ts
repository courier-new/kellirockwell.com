/**
 * Based on this: https://stackoverflow.com/a/54096391
 * Relevant for checking deep object equality when the object reference keeps
 * changing.
 * See also: https://github.com/kentcdodds/use-deep-compare-effect
 */
import isEqual from 'lodash/isEqual';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * Sets up a reference for a given value and performs a deep comparison (using
 * lodash `isEqual`) between any new provided value and the last value, only
 * updating the reference if the values are not, in fact, equal
 *
 * Returns the current value of the reference
 *
 * @param newValue the new value of the dependency to check
 */
const useDeepCompareMemoize = <T extends AnyJson>(newValue: T): T | undefined => {
  const lastValue = useRef<T>();

  if (!isEqual(newValue, lastValue.current)) {
    lastValue.current = newValue;
  }

  return lastValue.current;
};

/**
 * A drop-in replacement for `useEffect` when using React `RefObject`s or other
 * objects as dependencies that are recreated every render (the reference to the
 * dependency changes even if the properties of the dependency does not)
 *
 * @param callback the `EffectCallback` to run on dependency changes
 * @param dependencies the `DependencyList` for the effect
 */
const useDeepCompareEffect = (
  callback: EffectCallback,
  dependencies: DependencyList,
): void => {
  const newDependencies = useDeepCompareMemoize(dependencies) || [];
  useEffect(callback, [...newDependencies, callback]);
};

export default useDeepCompareEffect;

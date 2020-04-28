import isEqual from 'lodash/isEqual';
import { useRef, useEffect, EffectCallback, DependencyList } from 'react';

const useDeepCompareMemoize = <T extends AnyJson>(value: T) => {
  const ref = useRef<T>();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

const useDeepCompareEffect = (
  callback: EffectCallback,
  dependencies: DependencyList,
): void => {
  useEffect(callback, useDeepCompareMemoize(dependencies));
};

export default useDeepCompareEffect;

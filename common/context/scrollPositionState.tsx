import React, { createContext, FC, useContext, useReducer } from 'react';

import { asPercent, Percent } from '../utilities/percent';

/** Represents the absolute coordinates the user has scrolled to on the page */
export type ScrollPosition = {
  /** The x-coordinate the user has scrolled to */
  x: number;
  /** The y-coordinate the user has scrolled to */
  y: number;
};

type ScrollPositionAction =
  /** Set the current scroll position */
  Action<
    '@scroll-position-state/set-position',
    { percent: Percent; position: ScrollPosition }
  >;

type ScrollPositionDispatch = Dispatch<ScrollPositionAction>;

type ScrollPositionState = {
  percent: Percent;
  position: ScrollPosition;
};

const ScrollPositionStateContext = createContext<ScrollPositionState | undefined>(
  undefined,
);
const ScrollPositionDispatchContext = createContext<ScrollPositionDispatch | undefined>(
  undefined,
);

/**
 * Named export shorthand to use `ScrollPositionStateContext` as a hook
 *
 * `ScrollPositionState` tracks the current scroll position coordinates and as a
 * percent using an element ref to recalculate on scroll.
 *
 * @notes
 * - Context will not be defined outside of provider
 * @example const Comp: FC = () => {const state = useScrollPositionState();
 *   const scrollPercent = state?.percent; // 50
 *   const scrollX = state?.position.x; // 0
 *   const scrollY = state?.position.y; // 1000
 * };
 */
export const useScrollPositionState = (): ScrollPositionState | undefined =>
  useContext(ScrollPositionStateContext);
/**
 * Named export shorthand to use `ScrollPositionDispatchContext` as a hook
 *
 * @notes it appears to be possible to use dispatch outside of provider
 * @example const Comp: FC = () => {
 *   const dispatch = useScrollPositionDispatch();
 *   dispatch({
 *    payload: {
 *      percent: asPercent(50),
 *      position: { x: 0, y: 1000 }
 *    },
 *    type: '@scroll-position-state/set-position',
 *  });
 * };
 */
export const useScrollPositionDispatch = (): ScrollPositionDispatch | undefined =>
  useContext(ScrollPositionDispatchContext);

/**
 * Reducer for `ScrollPositionState`
 *
 * @param state the `ScrollPositionState`: tracks the current scroll position
 * @param action a `ScrollPositionAction` to apply to the state
 */
const scrollPositionReducer = (
  state: ScrollPositionState,
  action: ScrollPositionAction,
): ScrollPositionState => {
  switch (action.type) {
    case '@scroll-position-state/set-position':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

/**
 * Wrapper component that composes the `ScrollPositionState` and `Dispatch`
 * `Context` providers to make the context available to its children
 *
 * `ScrollPositionState` provides a dictionary of section heights for pages in
 * the app, retrievable by their slugs, and its `Dispatch` enables setting the
 * heights
 */
export const ScrollPositionProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(scrollPositionReducer, {
    percent: asPercent(0),
    position: { x: 0, y: 0 },
  });
  return (
    <ScrollPositionStateContext.Provider value={state}>
      <ScrollPositionDispatchContext.Provider value={dispatch}>
        {children}
      </ScrollPositionDispatchContext.Provider>
    </ScrollPositionStateContext.Provider>
  );
};

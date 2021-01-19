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
  | Action<
      '@scroll-position-state/set-position',
      { percent: Percent; position: ScrollPosition }
    >
  | Action<'@scroll-position-state/set-section-index', { index: number }>;

type ScrollPositionDispatch = Dispatch<ScrollPositionAction>;

type ScrollPositionState = {
  percent: Percent;
  position: ScrollPosition;
  sectionIndex: number;
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
 * percent using an element ref to recalculate on scroll. It also stores the
 * index corresponding to section of the screen containing the current scroll
 * position
 *
 * @notes
 * - Context will not be defined outside of provider
 * @example const Comp: FC = () => {const state = useScrollPositionState();
 *   const scrollPercent = state?.percent; // 50
 *   const scrollX = state?.position.x; // 0
 *   const scrollY = state?.position.y; // 1000
 *   const sectionIndex = state?.sectionIndex; // 2
 * };
 */
export const useScrollPositionState = (): ScrollPositionState | undefined =>
  useContext(ScrollPositionStateContext);
/**
 * Named export shorthand to use `ScrollPositionDispatchContext` as a hook
 *
 * `ScrollPositionDispatch` is intended to be used in conjunction with the
 * `useScrollPositionController()` and `useSectionIndexController()` hooks,
 * which compute the scroll position, percent, and current section based on the
 * scroll position
 *
 * @notes it appears to be possible to use dispatch outside of provider
 * @example const Comp: FC = () => {const dispatch =
 *   useScrollPositionDispatch(); dispatch({payload: {percent: asPercent(50),
 *   position: { x: 0, y: 1000 }
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
    case '@scroll-position-state/set-section-index':
      return {
        ...state,
        sectionIndex: action.payload.index,
      };
    case '@scroll-position-state/set-position':
      return {
        ...state,
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
 * `ScrollPositionState` tracks the user's current scroll position on the page
 * as absolute coordinates and as a percent as well as the index corresponding
 * to section of the screen containing the current scroll position, and its
 * `Dispatch` enables setting the positions or index
 *
 * @param props the functional component props
 * @param props.children children to the provider will have access to its context
 */
export const ScrollPositionProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(scrollPositionReducer, {
    percent: asPercent(0),
    position: { x: 0, y: 0 },
    sectionIndex: 0,
  });
  return (
    <ScrollPositionStateContext.Provider value={state}>
      <ScrollPositionDispatchContext.Provider value={dispatch}>
        {children}
      </ScrollPositionDispatchContext.Provider>
    </ScrollPositionStateContext.Provider>
  );
};

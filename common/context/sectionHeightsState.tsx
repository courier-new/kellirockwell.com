import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

import { Slug } from '../constants/slugs';

type SectionHeightsAction =
  /** Set the section heights for a page by its slug */
  Action<'@section-heights-state/set-heights', { heights: number[]; slug: Slug }>;

type SectionHeightsDispatch = Dispatch<SectionHeightsAction>;

/** Keeps a dictionary of section heights for pages in the app, retrievable by
 * their slugs */
type SectionHeightsState = Partial<
  {
    [key in Slug]: number[];
  }
>;

const SectionHeightsStateContext = createContext<SectionHeightsState | undefined>(
  undefined,
);
const SectionHeightsDispatchContext = createContext<SectionHeightsDispatch | undefined>(
  undefined,
);

/**
 * Named export shorthand to use `SectionHeightsStateContext` as a hook
 *
 * `SectionHeightsState` is a dictionary of section heights for pages in the app,
 * retrievable by their slugs. The heights represent the starting y-positions of
 * each section or subsection relative to the main scrollable area of the screen
 * in the order that the sections appear on the page. The index of a height on
 * the list corresponds to the index of the *flattened* section or subsection on
 * a page.
 *
 * `SectionHeightsState` is intended to be used in conjunction with the
 * `useCurrentSectionIndex()` hook by comparing the current scroll position with
 * the starting y-positions of each section
 *
 * @notes
 * - Context will not be defined outside of provider
 * - The length of the list of heights should match the combined length of all
 *   sections plus nested subsections, when flattened
 * @example const Comp: FC<{}> = () => {const state = useSectionHeightsState();
 *   const sectionHeights = state?.["about-me"]; // [0, 867.22, 1411.03, etc.]
 * };
 */
export const useSectionHeightsState = (): SectionHeightsState | undefined =>
  useContext(SectionHeightsStateContext);
/**
 * Named export shorthand to use `SectionHeightsDispatchContext` as a hook
 *
 * `SectionHeightsState` is intended to be used in conjunction with the
 * `useMeasureSectionHeights()` hook, which computes the section heights
 *
 * @notes it appears to be possible to use dispatch outside of provider
 * @example const Comp: FC<{}> = () => {
 *   const state = useSectionHeightsDispatch();
 * @example const Comp: FC<{}> = () => {
 *   const dispatch = useThemeDispatch();
 *   dispatch({
 *    payload: {
 *      [120, 464.3, 889.1],
 *      'about-me',
 *    },
 *    type: '@section-heights-state/set-heights',
 *  });
 * };
 */
export const useSectionHeightsDispatch = (): SectionHeightsDispatch | undefined =>
  useContext(SectionHeightsDispatchContext);

/**
 * Reducer for `SectionHeightsState`
 *
 * @param state the `SectionHeightsState`: keeps a dictionary of section heights
 * for pages in the app, retrievable by their slugs
 * @param action a `SectionHeightsAction` to apply to the state
 */
const sectionHeightsReducer = (
  state: SectionHeightsState,
  action: SectionHeightsAction,
): SectionHeightsState => {
  switch (action.type) {
    case '@section-heights-state/set-heights':
      return {
        ...state,
        [action.payload.slug]: action.payload.heights,
      };
    default:
      return state;
  }
};

/**
 * Wrapper component that composes the `SectionHeightsState` and `Dispatch`
 * `Context` providers to make the context available to its children
 *
 * `SectionHeightsState` provides a dictionary of section heights for pages in
 * the app, retrievable by their slugs, and its `Dispatch` enables setting the
 * heights
 */
export const SectionHeightsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(sectionHeightsReducer, {});
  return (
    <SectionHeightsStateContext.Provider value={state}>
      <SectionHeightsDispatchContext.Provider value={dispatch}>
        {children}
      </SectionHeightsDispatchContext.Provider>
    </SectionHeightsStateContext.Provider>
  );
};

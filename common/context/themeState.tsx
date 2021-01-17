import React, { createContext, FC, useContext, useReducer } from 'react';

type ThemeAction =
  /** Toggle the theme for the site */
  Action<'@theme-state/toggle-theme'>;

type ThemeDispatch = Dispatch<ThemeAction>;

/** Tracks whether the site is currently using the dark or light theme */
type ThemeState = { theme: 'dark' | 'light' };

const ThemeStateContext = createContext<ThemeState | undefined>(undefined);
const ThemeDispatchContext = createContext<ThemeDispatch | undefined>(undefined);

/**
 * Named export shorthand to use `ThemeStateContext` as a hook
 *
 * `ThemeState` tracks the site-wide theme that is also applied as a data-theme
 * property at the root of the Screen component
 *
 * @notes
 * - Context will not be defined outside of provider
 * - Most components are styled based on the data-theme property applied at the
 *   root of the Screen component; this context should only be used for JS that
 *   relies on knowing the theme
 * @example const Comp: FC = () => {
 *   const state = useThemeState();
 *   console.log(state === 'dark' ? 'night time!' : 'day time!');
 * };
 */
export const useThemeState = (): ThemeState | undefined => useContext(ThemeStateContext);
/**
 * Named export shorthand to use `ThemeDispatchContext` as a hook
 *
 * @notes it appears to be possible to use dispatch outside of provider
 * @example const Comp: FC = () => {
 *   const dispatch = useThemeDispatch();
 *   dispatch({
 *    type: '@theme-state/toggle-theme',
 *  });
 * };
 */
export const useThemeDispatch = (): ThemeDispatch | undefined =>
  useContext(ThemeDispatchContext);

/**
 * Reducer for `ThemeState`
 *
 * @param state the `ThemeState`: tracks the theme currently set for the site
 * @param action a `ThemeAction` to apply to the state
 */
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case '@theme-state/toggle-theme':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    default:
      return state;
  }
};

/**
 * Wrapper component that composes the `ThemeState` and `Dispatch` `Context`
 * providers to make the context available to its children
 *
 * `ThemeState` tracks the theme currently set for the site, and its `Dispatch`
 * enables toggling the theme
 */
export const ThemeProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { theme: 'light' });
  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

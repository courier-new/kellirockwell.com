import includes from 'lodash/includes';
import values from 'lodash/values';

/* eslint-disable sort-keys */
/** Dictionary of minimum-width based breakpoints for displays */
export const BREAKPOINT_SIZES = {
  /** Mobile display size is default */
  MOBILE: 0,
  /** Small display size minimum width captures most tablet devices */
  SMALL: 768,
  /** Medium display size minimum width captures the narrowest laptop/desktop devices */
  MEDIUM: 1024,
  /** Large display size minimum width captures most laptop/desktop devices */
  LARGE: 1200,
  /** X-Large display size minimum width captures extra-wide laptop/desktop
   * devices */
  XLARGE: 1600,
} as const;
/* eslint-enable sort-keys */

/** Literal string union type of defined display sizes */
export type DisplaySize = keyof typeof BREAKPOINT_SIZES;

const displaySizeWidths = values(BREAKPOINT_SIZES);
/** Literal union type of defined display size widths (numbers) */
export type DisplaySizeWidth = UnionLiteralFromArray<typeof displaySizeWidths>;

const MAIN_NAV_MENU_DISPLAY_SIZES: DisplaySize[] = ['XLARGE', 'LARGE', 'MEDIUM', 'SMALL'];
const SIDE_NAV_MENU_DISPLAY_SIZES: DisplaySize[] = ['XLARGE', 'LARGE', 'MEDIUM'];

/**
 * Returns true if the current display size is included in the list of allowed
 * display sizes for the main nav menu
 *
 * @param displaySize the current display size to check
 */
export const shouldShowMainNavMenu = (displaySize: DisplaySize): boolean =>
  includes(MAIN_NAV_MENU_DISPLAY_SIZES, displaySize);

/**
 * Returns true if the current display size is included in the list of allowed
 * display sizes for the main nav menu
 *
 * @param displaySize the current display size to check
 */
export const shouldShowSideNavMenu = (displaySize: DisplaySize): boolean =>
  includes(SIDE_NAV_MENU_DISPLAY_SIZES, displaySize);

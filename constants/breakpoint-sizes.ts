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
  /** Large display size minimum width captures all larger laptop/desktop devices */
  LARGE: 1200,
} as const;
/* eslint-enable sort-keys */

/** Literal string union type of defined display sizes */
export type DisplaySize = keyof typeof BREAKPOINT_SIZES;

const displaySizeWidths = values(BREAKPOINT_SIZES);
/** Literal union type of defined display size widths (numbers) */
export type DisplaySizeWidth = UnionLiteralFromArray<typeof displaySizeWidths>;

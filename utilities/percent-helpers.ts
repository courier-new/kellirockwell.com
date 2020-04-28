/** Branded type to distinguish a number that represents a percent */
export type Percent = number & { __brand: '@brand/percent' };

/**
 * Casts a number into a percent
 *
 * @param percent the number to mark as a Percent
 */
export const asPercent = (percent: number): Percent => percent as Percent;

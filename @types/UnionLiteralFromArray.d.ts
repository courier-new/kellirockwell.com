/**
 * Extracts a union literal type given an array type
 *
 * @example
 * const arr = [1, 2, "3", {number: 4}] as const;
 * type arrType = UnionLiteralFromArray<typeof arr>
 * // type arrType = 1 | 2 | "3" | { readonly number: 4 }
 *
 * const arr = [] as const;
 * type arrType = UnionLiteralFromArray<typeof arr>
 * // type arrType = never
 */
type UnionLiteralFromArray<ArrayType extends any[] | readonly any[]> = ArrayType[number];

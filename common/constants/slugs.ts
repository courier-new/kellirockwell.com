export const SLUGS = ['about-me', 'projects', 'conferences'] as const;

/** Literal string union type of primary static page slugs */
export type Slug = UnionLiteralFromArray<typeof SLUGS> | 'default';

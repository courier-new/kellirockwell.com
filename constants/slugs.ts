export const SLUGS = [
  'about-me',
  'conferences',
  'contact',
  'projects',
  'resume',
] as const;

/** Literal string union type of primary static page slugs */
export type Slug = typeof SLUGS[number] | 'default';

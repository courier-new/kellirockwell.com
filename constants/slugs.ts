/**
 * @file Static page slugs and Slug type.
 */

export const SLUGS = ['about-me', 'conferences', 'contact', 'projects', 'resume'] as const;
export type Slug = typeof SLUGS[number] | 'default';

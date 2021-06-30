import { ReactNode } from 'react';

import { KebabCaseString, SentenceCaseString } from '../../common/utilities/string-case';

/**
 * Type to hold a list of React `RefObject`s for flattened sections and
 * subsections in the order that appear on the screen, as objects
 * distinguishable by anchors
 *
 * We must keep these as an array to preserve section order when referencing
 *
 */
export type SectionRefsMap = {
  /** kebab-case anchor for the section */
  anchor: KebabCaseString;
  /** React `RefObject` for the section */
  ref: React.RefObject<HTMLElement>;
}[];

/**
 * Type for function that maps each section to a `<section>` of JSX to render,
 * providing the section with the appropriate `ref` prop and page anchor id
 */
export type ContentRenderer<
  SectionsType extends ContentSection<string>[] = ContentSection<string>[],
> = (
  sections: SectionsType,
  sectionRefs: SectionRefsMap,
  headingLevel?: number,
) => JSX.Element[];

/** Represents a distinct section of screen content */
export type ContentSection<
  Name extends string,
  ContentType extends ReactNode = ReactNode,
> = {
  /** The url anchor without "#" for the section; should use kebab-case */
  readonly anchor: KebabCaseString;
  /**
   * The actual content of the section constructed into a form of ReactNode;
   * generated from a raw content JS object with a content builder
   */
  // TODO: Make this required when all the pages have a builder
  readonly content?: ContentType;
  /** The name for the section, just used to identify it and not for display */
  readonly name: Name;
  /**
   * Any nested sections within this section; all subsections appear in the
   * side navigation bar, so "subsections" that should not appear should just be
   * provided as content instead
   */
  readonly subsections?: ContentSection<Name, ContentType>[];
  /** The title for the section; should use Sentence case */
  readonly title: SentenceCaseString;
};

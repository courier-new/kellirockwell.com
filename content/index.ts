/** Represents a distinct section of screen content */
export type ContentSection<Anchor extends string> = {
  /** The url anchor without "#" for the section; should use
   * kebab-case */
  // TODO: enforce kebab case with branded type
  anchor: Anchor;
  /** Any nested sections within this section */
  subsections?: ContentSection<Anchor>[];
  /** The title for the section; should use Sentence case */
  // TODO: enforce sentence case with branded type
  title: string;
};

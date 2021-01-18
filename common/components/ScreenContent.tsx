import map from 'lodash/map';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { flattenAllAnchors } from '../../content/utilities/for-pages';
import {
  ContentRenderer,
  ContentSection,
  SectionRefsMap,
} from '../../content/utilities/types';
import { Slug } from '../constants/slugs';
import useMeasureSectionHeights from '../hooks/useMeasureSectionHeights';

type ScreenContentProps = {
  /** The url slug corresponding to the screen that is currently open */
  activePage: Slug;
  /** Optional class to apply to outer container for padding */
  containerClassName?: string;
  /** The method to use to render the sections content for the current screen */
  renderSections: ContentRenderer;
  /** The sections of the current screen, used to determine the section anchors */
  sections: ContentSection<string, React.ReactNode>[];
};

/**
 * A component encapsulating logic related to building, rendering, and measuring
 * the sections of content within a `Screen`
 */
const ScreenContent: FC<ScreenContentProps> = ({
  activePage,
  containerClassName,
  renderSections,
  sections,
}) => {
  const [sectionRefs, setSectionRefs] = useState<SectionRefsMap>([]);

  // Map each section and nested subsection's anchor to a single flattened list
  // of anchors, then memoize it because the content is static
  const flattenedSectionAnchors = useMemo(() => flattenAllAnchors(sections), [sections]);

  useEffect(() => {
    // Create a React `RefObject` for each section anchor to assign when
    // rendering the sections and store it in local state
    setSectionRefs(
      map(flattenedSectionAnchors, (anchor) => ({
        anchor,
        ref: React.createRef<HTMLElement>(),
      })),
    );
    // We should only need to recreate the `ref`s if the sections change
  }, [flattenedSectionAnchors]);

  // Measure the section starting positions for each section on this screen
  useMeasureSectionHeights(map(sectionRefs, 'ref') || [], activePage);

  // Memoize the rendered sections of content
  const renderedSections = useMemo(() => renderSections(sections, sectionRefs), [
    // sectionRefs,
    sections,
    renderSections,
  ]);

  return <div className={containerClassName}>{renderedSections}</div>;
};

export default ScreenContent;

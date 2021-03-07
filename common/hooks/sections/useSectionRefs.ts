import map from 'lodash/map';
import React, { useEffect, useMemo, useState } from 'react';

import flattenAllAnchors from '../../../content/utilities/for-pages';
import { ContentSection, SectionRefsMap } from '../../../content/utilities/types';

/**
 * Maps `sections` to a flattened array of objects composed of each section's anchor
 * and a new `React.RefObject` ref for that section, known as a `SectionRefsMap`
 *
 * @param sections the `ContentSection`s to provide refs for, in order
 */
const useSectionRefs = (
  sections: ContentSection<string, React.ReactNode>[],
): SectionRefsMap => {
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

  return sectionRefs;
};

export default useSectionRefs;

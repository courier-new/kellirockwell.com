import React, { FC, useEffect, useState, useMemo } from 'react';
import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import CONFERENCES_SECTIONS from '../content/conferences';
import { flattenAllAnchors } from '../utilities/content-helpers';
import { KebabCaseString } from '../utilities/string-case-helpers';
import ConferenceCardGrid from '../common/components/ConferenceCardGrid';
import useMeasureSectionHeights from '../common/hooks/useMeasureSectionHeights';

/**
 * List of React `RefObject`s for flattened sections and subsections in the
 * order that appear on the screen, as objects distinguishable by anchors
 *
 * We must keep these as an array to preserve section order when referencing
 *
 */
type SectionRefsMap = { anchor: KebabCaseString; ref: React.RefObject<HTMLElement> }[];

/**
 * Maps each section to a `<section>` of JSX to render, providing the section
 * with the appropriate `ref` prop and page anchor id
 *
 * @param sections the `ContentSection`s of the Conferences screen
 * @param sectionRefs the list of React `RefObject`s for each of these sections
 * and their subsections, in order and flattened
 * @param headingLevel the level of heading to render for this section (e.g.
 * `headingLevel: 1` => `h1`, `headingLevel: 2` => `h2`)
 */
const renderSections = (
  sections: typeof CONFERENCES_SECTIONS,
  sectionRefs: SectionRefsMap,
  headingLevel = 1,
): JSX.Element[] => {
  let headingTag = `h${headingLevel}`;
  if (headingLevel < 1 || headingLevel > 6) {
    /* eslint-disable-next-line no-console */
    console.warn('Invalid heading level provided to section renderer. Defaulting to h3.');
    headingTag = 'h3';
  }

  return flatMap(sections, (section, index) => {
    // Array with which to build up section children elements
    let sectionElements: JSX.Element[] = [];

    sectionElements = [
      ...sectionElements,
      // Section heading
      React.createElement(headingTag, { key: `heading-${index}` }, section.name),
    ];

    // Section content
    if (section.content) {
      if ('conferences' in section.content) {
        const conferencesBlock = (
          <ConferenceCardGrid
            key={`conferences-${index}`}
            conferences={section.content.conferences}
          />
        );
        sectionElements = [...sectionElements, conferencesBlock];
      } else {
        sectionElements = [...sectionElements, section.content];
      }
    }

    // Subsections
    if (section.subsections) {
      sectionElements = [
        ...sectionElements,
        ...renderSections(section.subsections, sectionRefs, headingLevel + 1),
      ];
    }

    // Wrap section elements in `<section>`
    const sectionRef = find(sectionRefs, ['anchor', section.anchor])?.ref;
    return (
      <section key={section.anchor} ref={sectionRef} id={section.anchor}>
        {sectionElements}
      </section>
    );
  });
};

/**
 * Screen component for primary screen "Conferences"
 */
const ConferencesScreen: FC<{}> = () => {
  const [sectionRefs, setSectionRefs] = useState<SectionRefsMap>([]);

  // Map each section and nested subsection's anchor to a single flattened list
  // of anchors, then memoize it because the content is static
  const flattenedSectionAnchors = useMemo(
    () => flattenAllAnchors(CONFERENCES_SECTIONS),
    [],
  );

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
  useMeasureSectionHeights(map(sectionRefs, 'ref') || [], 'conferences');

  // Memoize the rendered sections of content
  const sections = useMemo(() => renderSections(CONFERENCES_SECTIONS, sectionRefs), [
    sectionRefs,
  ]);

  return <>{sections}</>;
};

export default ConferencesScreen;

import React, { FC, useRef, useEffect, useState, useMemo } from 'react';
import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import Screen from '../common/components/Screen';
import '../common/scss/main.scss';
import CONFERENCES_SECTIONS from '../content/conferences';
import useCurrentSectionIndex from '../common/hooks/useCurrentSectionIndex';
import useScrollInfo from '../common/hooks/useScrollInfo';
import { flattenAllAnchors } from '../utilities/content-helpers';
import { KebabCaseString } from '../utilities/string-case-helpers';
import ConferenceCardGrid from '../common/components/ConferenceCardGrid';

/** List of refs for sections in order, as objects distinguishable by their
 * anchor */
type SectionRefsMap = { anchor: KebabCaseString; ref: React.RefObject<HTMLElement> }[];

/**
 * Maps each section to a <section> of JSX to render, providing the section with
 * the appropriate ref and page anchor
 *
 * @param sections the sections of the Conferences screen
 * @param sectionRefs the list of refs for each of these sections, in order
 * @param headingLevel the level of heading to render for this section (e.g. for
 * h1, h2, h3, etc.)
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
    // Section heading
    let sectionElements: JSX.Element[] = [
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
        ...renderSections(section.subsections, sectionRefs, 2),
      ];
    }
    // Wrap section elements in <Section>
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
  const outerRef = useRef<HTMLDivElement>(null);

  const flattenedSectionAnchors = useMemo(
    () => flattenAllAnchors(CONFERENCES_SECTIONS),
    [],
  );

  useEffect(() => {
    // We must keep these as an array to preserve section order when referencing
    setSectionRefs(
      map(flattenedSectionAnchors, (anchor) => ({
        anchor,
        ref: React.createRef<HTMLElement>(),
      })),
    );
  }, [flattenedSectionAnchors]);

  const [sectionIndex, recalculateSectionIndex] = useCurrentSectionIndex(
    map(sectionRefs, 'ref') || [],
    outerRef,
  );

  const scrollPercent = useScrollInfo(outerRef)[1];

  // Memoize the rendered sections of content
  const sections = useMemo(() => renderSections(CONFERENCES_SECTIONS, sectionRefs), [
    sectionRefs,
  ]);

  return (
    <Screen
      activePage="conferences"
      contentSections={{
        currentSectionIndex: sectionIndex,
        recalculateSectionIndex,
        sections: CONFERENCES_SECTIONS,
      }}
      ref={outerRef}
      scrollPercent={scrollPercent}
    >
      {sections}
    </Screen>
  );
};

export default ConferencesScreen;

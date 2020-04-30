import React, { FC, ReactNode } from 'react';
import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import CONFERENCES_SECTIONS from '../content/conferences';
import { ContentRenderer, ContentSection } from '../utilities/content-helpers';
import ConferenceCardGrid from '../common/components/ConferenceCardGrid';
import ScreenContent from '../common/components/ScreenContent';

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
export const renderConferencesSections: ContentRenderer<typeof CONFERENCES_SECTIONS> = (
  sections,
  sectionRefs,
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
        ...renderConferencesSections(section.subsections, sectionRefs, headingLevel + 1),
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
const ConferencesScreen: FC<{}> = () => (
  <ScreenContent
    activePage="conferences"
    sections={CONFERENCES_SECTIONS}
    renderSections={
      renderConferencesSections as ContentRenderer<ContentSection<string, ReactNode>[]>
    }
  />
);

export default ConferencesScreen;

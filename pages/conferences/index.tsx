import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import React, { FC } from 'react';

import ConferenceCardGrid from '../../common/components/ConferenceCardGrid';
import Screen from '../../common/components/Screen';
import SideNavMenu from '../../common/components/SideNavMenu';
import useScreenSections from '../../common/hooks/sections/useScreenSections';
import CONFERENCES_SECTIONS from '../../content/conferences';
import { ContentRenderer } from '../../content/utilities/types';

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

  return flatMap(sections, (section) => {
    // Array with which to build up section children elements
    let sectionElements: JSX.Element[] = [];

    sectionElements = [
      ...sectionElements,
      // Section heading
      React.createElement(headingTag, { key: `heading-${section.name}` }, section.name),
    ];

    // Section content
    if (section.content) {
      if ('conferences' in section.content) {
        const conferencesBlock = (
          <React.Fragment key="conferences-current">
            {/* <QuickNav sections={['current', 'past-2020', 'past-2019']} /> */}
            <span id="current" />
            <ConferenceCardGrid conferences={section.content.conferences} />
          </React.Fragment>
        );
        sectionElements = [...sectionElements, conferencesBlock];
      } else if ('pastConferences' in section.content) {
        const conferencesBlocks = map(
          section.content.pastConferences,
          ({ conferences, year }) => (
            <React.Fragment key={`conferences-${year}`}>
              <span id={`past-${year}`} />
              <h4 className="text-mauve">{year}</h4>
              <ConferenceCardGrid conferences={conferences} />
            </React.Fragment>
          ),
        );
        sectionElements = [...sectionElements, ...conferencesBlocks];
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
      <section id={section.anchor} key={section.anchor} ref={sectionRef}>
        {sectionElements}
      </section>
    );
  });
};

/**
 * Screen component for primary screen "Conferences"
 */
const ConferencesScreen: FC = () => {
  const { ref, resetScroll, sectionRefsMap } = useScreenSections(CONFERENCES_SECTIONS);

  return (
    <Screen
      ref={ref}
      resetScroll={resetScroll}
      sideNav={<SideNavMenu contentSections={CONFERENCES_SECTIONS} />}
    >
      <div className="padding-med">
        {renderConferencesSections(CONFERENCES_SECTIONS, sectionRefsMap)}
      </div>
    </Screen>
  );
};

export default ConferencesScreen;

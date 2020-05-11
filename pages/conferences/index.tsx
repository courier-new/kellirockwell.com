import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import React, { FC, ReactNode } from 'react';

import ConferenceCardGrid from '../../common/components/ConferenceCardGrid';
import ScreenContent from '../../common/components/ScreenContent';
import CONFERENCES_SECTIONS from '../../content/conferences';
import { ContentRenderer, ContentSection } from '../../content/utilities/types';

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
          <ConferenceCardGrid
            conferences={section.content.conferences}
            key="conferences"
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
      <section id={section.anchor} key={section.anchor} ref={sectionRef}>
        {sectionElements}
      </section>
    );
  });
};

/**
 * Screen component for primary screen "Conferences"
 */
const ConferencesScreen: FC<{}> = () => {
  return (
    <ScreenContent
      activePage="conferences"
      renderSections={
        renderConferencesSections as ContentRenderer<ContentSection<string, ReactNode>[]>
      }
      sections={CONFERENCES_SECTIONS}
    />
  );
};

/** Get conferences for static screen props */
// export const getStaticProps: GetStaticProps<ConferencesScreenProps> = async () => {
//   const conferences: any[] = await new Promise(() => {
//     setTimeout(() => {
//       return map(CONFERENCES_2020, (conference) => ({
//         ...conference,
//         date: conference.date.toString(),
//       }));
//     }, 100);
//   });

//   return {
//     props: { conferences },
//   };
// };

export default ConferencesScreen;

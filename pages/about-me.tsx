import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import React, { FC, useCallback, useMemo, useRef } from 'react';

import Screen from '../common/components/Screen';
import SideNavMenu from '../common/components/SideNavMenu';
import useSectionIndexController from '../common/hooks/sections/useSectionIndexController';
import useSectionRefs from '../common/hooks/sections/useSectionRefs';
import useScrollPositionController from '../common/hooks/useScrollPositionController';
import buildAboutMeSections from '../content/about-me';
import { Tool } from '../content/about-me/inside-my-toolbox';
import { ContentSection, SectionRefsMap } from '../content/utilities/types';

/* eslint-disable-next-line jsdoc/require-jsdoc */
const FAKE_CONTENT = (key: string): JSX.Element => (
  <React.Fragment key={key}>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam inventore
      rerum laboriosam dolorem impedit minima maxime debitis iusto fuga quae! Veritatis id
      nobis laboriosam consequuntur quaerat temporibus repudiandae placeat? Lorem ipsum
      dolor sit amet, consectetur adipisicing elit. Officia tempore sed eveniet reiciendis
      corporis similique ipsa ea. Aperiam possimus amet placeat repellendus molestias
      laudantium, provident dolores ex inventore, vitae repellat? Lorem ipsum dolor sit
      amet consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
      voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
      deserunt porro necessitatibus optio.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
      assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic quos
      ut! Architecto vel deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
      voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
      deserunt porro necessitatibus optio.
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam
      asperiores odio suscipit quam aspernatur illum, quis quidem sapiente quisquam.
      Obcaecati, blanditiis similique optio accusantium ut quia quaerat officia voluptas.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam inventore
      rerum laboriosam dolorem impedit minima maxime debitis iusto fuga quae! Veritatis id
      nobis laboriosam consequuntur quaerat temporibus repudiandae placeat? Lorem ipsum
      dolor sit amet, consectetur adipisicing elit. Officia tempore sed eveniet reiciendis
      corporis similique ipsa ea. Aperiam possimus amet placeat repellendus molestias
      laudantium, provident dolores ex inventore, vitae repellat? Lorem ipsum dolor sit
      amet consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
      voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
      deserunt porro necessitatibus optio.
    </p>
  </React.Fragment>
);

/**
 * Maps each section to a `<section>` of JSX to render, providing the section
 * with the appropriate `ref` prop and page anchor id
 *
 * @param sections the `ContentSection`s of the About Me screen
 * @param sectionRefs the list of React `RefObject`s for each of these sections
 * and their subsections, in order and flattened
 * @param headingLevel the level of heading to render for this section (e.g.
 * `headingLevel: 1` => `h1`, `headingLevel: 2` => `h2`)
 */
export const renderAboutMeSections = (
  sections: ContentSection<string, JSX.Element>[],
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
      sectionElements = [...sectionElements, section.content];
    } else {
      sectionElements = [...sectionElements, FAKE_CONTENT(`fake-${index}`)];
    }

    // Subsections
    if (section.subsections) {
      sectionElements = [
        ...sectionElements,
        ...renderAboutMeSections(section.subsections, sectionRefs, headingLevel + 1),
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
 * Screen component for primary screen "About Me"
 *
 * @param props the functional component props
 * @param props.tools array of `Tool`s I use, fetched from the server
 */
const AboutMeScreen: FC<{ tools: Tool[] }> = ({ tools }) => {
  const sections = useMemo(() => buildAboutMeSections(tools), [tools]);

  /** Attach a section index and scroll position controller to the ref of the
   * outermost scrollable container of the main screen content */
  const ref = useRef<HTMLDivElement>(null);

  const sectionRefsMap = useSectionRefs(sections);

  // Measure the section starting positions for each section on this screen
  useSectionIndexController(ref, sectionRefsMap);
  const { reset } = useScrollPositionController(ref);

  const resetScroll = useCallback(() => {
    reset();
    ref.current?.scrollTo({ top: 0 });
  }, [reset]);

  return (
    <Screen
      ref={ref}
      resetScroll={resetScroll}
      sideNav={<SideNavMenu contentSections={sections} />}
    >
      <div className="padding-med">{renderAboutMeSections(sections, sectionRefsMap)}</div>
    </Screen>
  );
};

export default AboutMeScreen;

type ToolsResponse = {
  tools: {
    data: Tool[];
  };
};

/** Fetch tools from API */
export const getServerSideProps = async (): Promise<{
  props: { tools: Tool[] };
}> => {
  let tools: Tool[] = [];

  const query = `query {
    tools {
      data {
        _id
        name
        marks
      }
    }
  }`;

  if (process.env.FAUNADB_GRAPHQL_ENDPOINT) {
    const res = await fetch(process.env.FAUNADB_GRAPHQL_ENDPOINT, {
      body: JSON.stringify({
        query,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
        'Content-type': 'application/json',
      },
      method: 'POST',
    });
    const { data: responseData } = (await res.json()) as { data: ToolsResponse };

    tools = responseData.tools.data;
  }

  return {
    props: { tools },
  };
};

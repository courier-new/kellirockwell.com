import React, { FC } from 'react';
import Screen from '../common/components/Screen';
import { ScreenSection } from '../common/components/SideNavMenu';

import '../common/scss/main.scss';
import '../common/scss/theme.scss';

type ConferencesScreenProps = {};

const CONFERENCES_SECTIONS: ScreenSection[] = [
  {
    anchor: 'journey-to-the-center-of-the-community',
    title: 'Journey to the center of the community',
  },
  { anchor: 'resources', title: 'Resources' },
  {
    anchor: 'roadmap',
    subsections: [
      { anchor: 'current-(2020)', title: 'Current (2020)' },
      { anchor: '2019', title: '2019' },
    ],
    title: 'Roadmap',
  },
];

/**
 * Screen component for primary screen "Conferences"
 */
const ConferencesScreen: FC<ConferencesScreenProps> = () => {
  return (
    <Screen activePage="conferences" screenSections={CONFERENCES_SECTIONS}>
      <h1>Conferences</h1>
      <section>Stuff 1</section>
      <section>Stuff 2</section>
      <section>Stuff 3</section>
      <section>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam molestiae
        quas quisquam nisi sunt similique obcaecati quia quidem iusto deserunt, recusandae
        dolor molestias, culpa neque in, laudantium assumenda temporibus sequi! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Veniam tempore minus provident
        repellendus accusamus itaque quam doloribus facere, accusantium, quas praesentium
        omnis veritatis. Voluptatum quo ducimus commodi, incidunt quasi quae! Lorem ipsum,
        dolor sit amet consectetur adipisicing elit. Cupiditate eum cumque necessitatibus
        nobis veniam reprehenderit, sequi facilis, dolorem iste expedita, voluptate
        tenetur unde tempore numquam dicta perspiciatis id recusandae quisquam! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Rerum iusto eius sint.
        Accusamus vel assumenda, corporis maxime molestias atque animi quas cum quis
        maiores amet voluptatibus magni error ratione officiis? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Laboriosam qui reprehenderit illum quaerat
        architecto commodi exercitationem velit. Eius ipsam, quod asperiores perspiciatis,
        nihil omnis tenetur saepe deserunt sed, cumque magnam?
      </section>
    </Screen>
  );
};

export default ConferencesScreen;

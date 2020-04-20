import React, { FC, useRef } from 'react';
import Screen from '../common/components/Screen';
import { ScreenSection } from '../common/components/SideNavMenu';

import '../common/scss/main.scss';
import '../common/scss/theme.scss';
import useCurrentSectionIndex from '../common/hooks/useCurrentSection';

type ProjectsScreenProps = {};

const PROJECTS_SECTIONS: ScreenSection[] = [
  {
    anchor: 'by-the-numbers',
    subsections: [
      { anchor: 'inside-my-toolbox', title: 'Inside my toolbox' },
      { anchor: 'the-roles-i-serve', title: 'The roles I serve' },
    ],
    title: 'By the numbers',
  },
];

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC<ProjectsScreenProps> = () => {
  const s1Ref = useRef<HTMLElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const s3Ref = useRef<HTMLElement>(null);

  const outerRef = useRef<HTMLDivElement>(null);

  const sectionIndex = useCurrentSectionIndex([s1Ref, s2Ref, s3Ref], outerRef);

  return (
    <Screen
      activePage="projects"
      screenSections={{ currentSectionIndex: sectionIndex, sections: PROJECTS_SECTIONS }}
      ref={outerRef}
    >
      <h1>Projects</h1>
      <section ref={s1Ref}>
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
        nihil omnis tenetur saepe deserunt sed, cumque magnam? Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Laboriosam molestiae quas quisquam nisi sunt
        similique obcaecati quia quidem iusto deserunt, recusandae dolor molestias, culpa
        neque in, laudantium assumenda temporibus sequi! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Veniam tempore minus provident repellendus accusamus
        itaque quam doloribus facere, accusantium, quas praesentium omnis veritatis.
        Voluptatum quo ducimus commodi, incidunt quasi quae! Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Cupiditate eum cumque necessitatibus nobis veniam
        reprehenderit, sequi facilis, dolorem iste expedita, voluptate tenetur unde
        tempore numquam dicta perspiciatis id recusandae quisquam! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Rerum iusto eius sint. Accusamus vel assumenda,
        corporis maxime molestias atque animi quas cum quis maiores amet voluptatibus
        magni error ratione officiis? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Laboriosam qui reprehenderit illum quaerat architecto commodi exercitationem
        velit. Eius ipsam, quod asperiores perspiciatis, nihil omnis tenetur saepe
        deserunt sed, cumque magnam?
      </section>
      <section ref={s2Ref}>
        <h3>Section 2</h3>
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
        consectetur adipisicing elit. 2
      </section>
      <section ref={s3Ref}>
        <h1>More stuff</h1>
        <h3>Wow</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam molestiae
          quas quisquam nisi sunt similique obcaecati quia quidem iusto deserunt,
          recusandae dolor molestias, culpa neque in, laudantium assumenda temporibus
          sequi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempore
          minus provident repellendus accusamus itaque quam doloribus facere, accusantium,
          quas praesentium omnis veritatis. Voluptatum quo ducimus commodi, incidunt quasi
          quae! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate eum
          cumque necessitatibus nobis veniam reprehenderit, sequi facilis, dolorem iste
          expedita, voluptate tenetur unde tempore numquam dicta perspiciatis id
          recusandae quisquam! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Rerum iusto eius sint. Accusamus vel assumenda, corporis maxime molestias atque
          animi quas cum quis maiores amet voluptatibus magni error ratione officiis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p>
          Laboriosam qui reprehenderit illum quaerat architecto commodi exercitationem
          velit. Eius ipsam, quod asperiores perspiciatis, nihil omnis tenetur saepe
          deserunt sed, cumque magnam? Lorem ipsum dolor sit amet consectetur, adipisicing
          elit.
        </p>
        <p>
          Laboriosam molestiae quas quisquam nisi sunt similique obcaecati quia quidem
          iusto deserunt, recusandae dolor molestias, culpa neque in, laudantium assumenda
          temporibus sequi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Veniam tempore minus provident repellendus accusamus itaque quam doloribus
          facere, accusantium, quas praesentium omnis veritatis. Voluptatum quo ducimus
          commodi, incidunt quasi quae! Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Cupiditate eum cumque necessitatibus nobis veniam
          reprehenderit, sequi facilis, dolorem iste expedita, voluptate tenetur unde
          tempore numquam dicta perspiciatis id recusandae quisquam! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Rerum iusto eius sint. Accusamus vel
          assumenda, corporis maxime molestias atque animi quas cum quis maiores amet
          voluptatibus magni error ratione officiis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
        </p>
        <p>
          Laboriosam qui reprehenderit illum quaerat architecto commodi exercitationem
          velit. Eius ipsam, quod asperiores perspiciatis, nihil omnis tenetur saepe
          deserunt sed, cumque magnam? Lorem ipsum dolor sit amet consectetur, adipisicing
          elit.
        </p>
        <p>
          Laboriosam molestiae quas quisquam nisi sunt similique obcaecati quia quidem
          iusto deserunt, recusandae dolor molestias, culpa neque in, laudantium assumenda
          temporibus sequi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Veniam tempore minus provident repellendus accusamus itaque quam doloribus
          facere, accusantium, quas praesentium omnis veritatis. Voluptatum quo ducimus
          commodi, incidunt quasi quae! Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Cupiditate eum cumque necessitatibus nobis veniam
          reprehenderit, sequi facilis, dolorem iste expedita, voluptate tenetur unde
          tempore numquam dicta perspiciatis id recusandae quisquam! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Rerum iusto eius sint. Accusamus vel
          assumenda, corporis maxime molestias atque animi quas cum quis maiores amet
          voluptatibus magni error ratione officiis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
        </p>
        <p>
          Laboriosam qui reprehenderit illum quaerat architecto commodi exercitationem
          velit. Eius ipsam, quod asperiores perspiciatis, nihil omnis tenetur saepe
          deserunt sed, cumque magnam?
        </p>
        <p>
          Laboriosam molestiae quas quisquam nisi sunt similique obcaecati quia quidem
          iusto deserunt, recusandae dolor molestias, culpa neque in, laudantium assumenda
          temporibus sequi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Veniam tempore minus provident repellendus accusamus itaque quam doloribus
          facere, accusantium, quas praesentium omnis veritatis. Voluptatum quo ducimus
          commodi, incidunt quasi quae! Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Cupiditate eum cumque necessitatibus nobis veniam
          reprehenderit, sequi facilis, dolorem iste expedita, voluptate tenetur unde
          tempore numquam dicta perspiciatis id recusandae quisquam! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Rerum iusto eius sint. Accusamus vel
          assumenda, corporis maxime molestias atque animi quas cum quis maiores amet
          voluptatibus magni error ratione officiis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
        </p>
        <p>
          Laboriosam molestiae quas quisquam nisi sunt similique obcaecati quia quidem
          iusto deserunt, recusandae dolor molestias, culpa neque in, laudantium assumenda
          temporibus sequi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Veniam tempore minus provident repellendus accusamus itaque quam doloribus
          facere, accusantium, quas praesentium omnis veritatis. Voluptatum quo ducimus
          commodi, incidunt quasi quae! Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Cupiditate eum cumque necessitatibus nobis veniam
          reprehenderit, sequi facilis, dolorem iste expedita, voluptate tenetur unde
          tempore numquam dicta perspiciatis id recusandae quisquam! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Rerum iusto eius sint. Accusamus vel
          assumenda, corporis maxime molestias atque animi quas cum quis maiores amet
          voluptatibus magni error ratione officiis? Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
        </p>
      </section>
    </Screen>
  );
};

export default ProjectsScreen;

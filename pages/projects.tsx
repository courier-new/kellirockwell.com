import React, { FC, useRef } from 'react';
import Screen from '../common/components/Screen';

import '../common/scss/main.scss';
import useCurrentSectionIndex from '../common/hooks/useCurrentSectionIndex';
import PROJECTS_SECTIONS from '../content/projects';

type ProjectsScreenProps = {};

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC<ProjectsScreenProps> = () => {
  const s1Ref = useRef<HTMLElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const s3Ref = useRef<HTMLElement>(null);

  const outerRef = useRef<HTMLDivElement>(null);

  const [sectionIndex, recalculateSectionIndex] = useCurrentSectionIndex(
    [s1Ref, s2Ref, s3Ref],
    outerRef,
  );

  return (
    <Screen
      activePage="projects"
      contentSections={{
        currentSectionIndex: sectionIndex,
        recalculateSectionIndex,
        sections: PROJECTS_SECTIONS,
      }}
      ref={outerRef}
    >
      <section ref={s1Ref} id={PROJECTS_SECTIONS[0].anchor}>
        <h1>Projects</h1>
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
      <section ref={s2Ref} id={PROJECTS_SECTIONS[1].anchor}>
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
      <section ref={s3Ref} id={PROJECTS_SECTIONS[2].anchor}>
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

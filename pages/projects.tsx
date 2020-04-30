import React, { FC, useRef } from 'react';

import useMeasureSectionHeights from '../common/hooks/useMeasureSectionHeights';
import PROJECTS_SECTIONS from '../content/projects';

type ProjectsScreenProps = {};

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC<ProjectsScreenProps> = () => {
  const s1Ref = useRef<HTMLElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const s3Ref = useRef<HTMLElement>(null);

  useMeasureSectionHeights([s1Ref, s2Ref, s3Ref], 'projects');

  return (
    <>
      <section id={PROJECTS_SECTIONS[0].anchor} ref={s1Ref}>
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
      <section id={PROJECTS_SECTIONS[1].anchor} ref={s2Ref}>
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
      <section id={PROJECTS_SECTIONS[2].anchor} ref={s3Ref}>
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
    </>
  );
};

export default ProjectsScreen;

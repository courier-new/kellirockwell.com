import React, { FC, useRef } from 'react';
import Screen from '../common/components/Screen';
import '../common/scss/main.scss';
import useCurrentSectionIndex from '../common/hooks/useCurrentSectionIndex';
import ABOUT_ME_SECTIONS from '../content/about-me';

type AboutMeScreenProps = {};

/**
 * Screen component for primary screen "About Me"
 */
const AboutMeScreen: FC<AboutMeScreenProps> = () => {
  // TODO: make dynamic: https://stackoverflow.com/questions/55995760/how-to-add-refs-dynamically-with-react-hooks
  const s1Ref = useRef<HTMLHeadingElement>(null);
  const s2Ref = useRef<HTMLHeadingElement>(null);
  const s3Ref = useRef<HTMLHeadingElement>(null);
  const s4Ref = useRef<HTMLHeadingElement>(null);
  const s5Ref = useRef<HTMLHeadingElement>(null);
  const s6Ref = useRef<HTMLHeadingElement>(null);
  const s7Ref = useRef<HTMLHeadingElement>(null);

  const outerRef = useRef<HTMLDivElement>(null);

  const [sectionIndex, recalculateSectionIndex] = useCurrentSectionIndex(
    [s1Ref, s2Ref, s3Ref, s4Ref, s5Ref, s6Ref, s7Ref],
    outerRef,
  );

  return (
    <Screen
      activePage="about-me"
      contentSections={{
        currentSectionIndex: sectionIndex,
        recalculateSectionIndex,
        sections: ABOUT_ME_SECTIONS,
      }}
      ref={outerRef}
    >
      <section ref={s1Ref} id={ABOUT_ME_SECTIONS[0].anchor}>
        <h1>By the numbers</h1>
        <h4>Background</h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam unde minima
        distinctio, consequuntur vitae temporibus libero amet. Minima delectus, adipisci
        repudiandae ipsum facere sequi nobis fuga. Rerum magni repudiandae perferendis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
        assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic quos
        ut! Architecto vel deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
        voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
        deserunt porro necessitatibus optio.
        <h4>Likes</h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui ipsum
        molestiae adipisci animi quisquam minima eos, beatae, natus ut aut consectetur sit
        placeat. Iusto obcaecati voluptate quo nesciunt cupiditate.
        <h4>Dislikes</h4>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum totam aperiam
        facere reiciendis quasi sint temporibus eos, veritatis voluptate magnam repellat
        doloribus nesciunt numquam ducimus voluptatibus soluta accusantium iste omnis?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident mollitia rem
        reprehenderit dolorum quibusdam dolor numquam soluta natus iste asperiores? Totam
        necessitatibus, animi non nulla tenetur modi consequuntur rerum iusto?
      </section>
      <section ref={s2Ref} id={ABOUT_ME_SECTIONS[1].anchor}>
        <h1>Inside my toolbox</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. At a animi repellat, assumenda possimus
          illum voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto
          vel deserunt porro necessitatibus optio.
        </p>
      </section>
      <section ref={s3Ref} id={ABOUT_ME_SECTIONS[2].anchor}>
        <h1>The roles I serve</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. At a animi repellat, assumenda possimus
          illum voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto
          vel deserunt porro necessitatibus optio.
        </p>
        <h3 ref={s4Ref} id={ABOUT_ME_SECTIONS[2].subsections?.[0].anchor}>
          As an asynchronous communicator
        </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam
          asperiores odio suscipit quam aspernatur illum, quis quidem sapiente quisquam.
          Obcaecati, blanditiis similique optio accusantium ut quia quaerat officia
          voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam
          inventore rerum laboriosam dolorem impedit minima maxime debitis iusto fuga
          quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus repudiandae
          placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam possimus amet
          placeat repellendus molestias laudantium, provident dolores ex inventore, vitae
          repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi
          repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid cum
          ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. At a animi repellat, assumenda possimus
          illum voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto
          vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam
          asperiores odio suscipit quam aspernatur illum, quis quidem sapiente quisquam.
          Obcaecati, blanditiis similique optio accusantium ut quia quaerat officia
          voluptas. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam,
          veniam inventore rerum laboriosam dolorem impedit minima maxime debitis iusto
          fuga quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus
          repudiandae placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Officia tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam
          possimus amet placeat repellendus molestias laudantium, provident dolores ex
          inventore, vitae repellat? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. At a animi repellat, assumenda possimus illum voluptates? Neque
          perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
          necessitatibus optio.
        </p>
        <h3 ref={s5Ref} id={ABOUT_ME_SECTIONS[2].subsections?.[1].anchor}>
          As a developer experience hero
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem, ipsum dolor
          sit amet consectetur adipisicing elit. Repellendus magnam asperiores odio
          suscipit quam aspernatur illum, quis quidem sapiente quisquam. Obcaecati,
          blanditiis similique optio accusantium ut quia quaerat officia voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam
          inventore rerum laboriosam dolorem impedit minima maxime debitis iusto fuga
          quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus repudiandae
          placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam possimus amet
          placeat repellendus molestias laudantium, provident dolores ex inventore, vitae
          repellat? At a animi repellat, assumenda possimus illum voluptates? Neque
          perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
          necessitatibus optio. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Repellendus magnam asperiores odio suscipit quam aspernatur illum, quis quidem
          sapiente quisquam. Obcaecati, blanditiis similique optio accusantium ut quia
          quaerat officia voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam
          inventore rerum laboriosam dolorem impedit minima maxime debitis iusto fuga
          quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus repudiandae
          placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam possimus amet
          placeat repellendus molestias laudantium, provident dolores ex inventore, vitae
          repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi
          repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid cum
          ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <h3 ref={s6Ref} id={ABOUT_ME_SECTIONS[2].subsections?.[2].anchor}>
          As a state management manager
        </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam
          asperiores odio suscipit quam aspernatur illum, quis quidem sapiente quisquam.
          Obcaecati, blanditiis similique optio accusantium ut quia quaerat officia
          voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam
          inventore rerum laboriosam dolorem impedit minima maxime debitis iusto fuga
          quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus repudiandae
          placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam possimus amet
          placeat repellendus molestias laudantium, provident dolores ex inventore, vitae
          repellat?
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam
          asperiores odio suscipit quam aspernatur illum, quis quidem sapiente quisquam.
          Obcaecati, blanditiis similique optio accusantium ut quia quaerat officia
          voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam
          inventore rerum laboriosam dolorem impedit minima maxime debitis iusto fuga
          quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus repudiandae
          placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam possimus amet
          placeat repellendus molestias laudantium, provident dolores ex inventore, vitae
          repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi
          repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid cum
          ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <h3 ref={s7Ref} id={ABOUT_ME_SECTIONS[2].subsections?.[3].anchor}>
          As an equity and inclusion advocate
        </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam
          asperiores odio suscipit quam aspernatur illum, quis quidem sapiente quisquam.
          Obcaecati, blanditiis similique optio accusantium ut quia quaerat officia
          voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam
          inventore rerum laboriosam dolorem impedit minima maxime debitis iusto fuga
          quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus repudiandae
          placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam possimus amet
          placeat repellendus molestias laudantium, provident dolores ex inventore, vitae
          repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi
          repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid cum
          ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem, ipsum dolor
          sit amet consectetur adipisicing elit. Repellendus magnam asperiores odio
          suscipit quam aspernatur illum, quis quidem sapiente quisquam. Obcaecati,
          blanditiis similique optio accusantium ut quia quaerat officia voluptas.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam
          inventore rerum laboriosam dolorem impedit minima maxime debitis iusto fuga
          quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus repudiandae
          placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam possimus amet
          placeat repellendus molestias laudantium, provident dolores ex inventore, vitae
          repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi
          repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid cum
          ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
          assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic
          quos ut! Architecto vel deserunt porro necessitatibus optio.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam
          asperiores odio suscipit quam aspernatur illum, quis quidem sapiente quisquam.
          Obcaecati, blanditiis similique optio accusantium ut quia quaerat officia
          voluptas. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam,
          veniam inventore rerum laboriosam dolorem impedit minima maxime debitis iusto
          fuga quae! Veritatis id nobis laboriosam consequuntur quaerat temporibus
          repudiandae placeat? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Officia tempore sed eveniet reiciendis corporis similique ipsa ea. Aperiam
          possimus amet placeat repellendus molestias laudantium, provident dolores ex
          inventore, vitae repellat?
        </p>
      </section>
      <footer>
        <button type="button">Read about my projects!</button>
      </footer>
    </Screen>
  );
};

export default AboutMeScreen;

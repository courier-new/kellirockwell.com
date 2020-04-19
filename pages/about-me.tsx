import React, { FC } from 'react';
import Screen from '../common/components/Screen';
import { ScreenSection } from '../common/components/SideNavMenu';

import '../common/scss/main.scss';
import '../common/scss/theme.scss';

type AboutMeScreenProps = {};

const ABOUT_ME_SECTIONS: ScreenSection[] = [
  { anchor: 'by-the-numbers', title: 'By the numbers' },
  { anchor: 'inside-my-toolbox', title: 'Inside my toolbox' },
  { anchor: 'the-roles-i-serve', title: 'The roles I serve' },
];

/**
 * Screen component for primary screen "About Me"
 */
const AboutMeScreen: FC<AboutMeScreenProps> = () => {
  return (
    <Screen activePage="about-me" screenSections={ABOUT_ME_SECTIONS}>
      <section>
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
      <section>
        <h1>Inside my toolbox</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
        assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic quos
        ut! Architecto vel deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
        voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
        deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. At a animi repellat, assumenda possimus illum voluptates? Neque
        perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
        necessitatibus optio. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus magnam asperiores odio suscipit quam aspernatur illum, quis quidem
        sapiente quisquam. Obcaecati, blanditiis similique optio accusantium ut quia
        quaerat officia voluptas. Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Quisquam, veniam inventore rerum laboriosam dolorem impedit minima maxime
        debitis iusto fuga quae! Veritatis id nobis laboriosam consequuntur quaerat
        temporibus repudiandae placeat? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Officia tempore sed eveniet reiciendis corporis similique ipsa
        ea. Aperiam possimus amet placeat repellendus molestias laudantium, provident
        dolores ex inventore, vitae repellat? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. At a animi repellat, assumenda possimus illum voluptates? Neque
        perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
        necessitatibus optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. At
        a animi repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid
        cum ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat, assumenda
        possimus illum voluptates? Neque perferendis, aliquid cum ullam hic quos ut!
        Architecto vel deserunt porro necessitatibus optio. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Repellendus magnam asperiores odio suscipit quam
        aspernatur illum, quis quidem sapiente quisquam. Obcaecati, blanditiis similique
        optio accusantium ut quia quaerat officia voluptas. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Quisquam, veniam inventore rerum laboriosam dolorem
        impedit minima maxime debitis iusto fuga quae! Veritatis id nobis laboriosam
        consequuntur quaerat temporibus repudiandae placeat? Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Officia tempore sed eveniet reiciendis corporis
        similique ipsa ea. Aperiam possimus amet placeat repellendus molestias laudantium,
        provident dolores ex inventore, vitae repellat? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
        voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
        deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. At a animi repellat, assumenda possimus illum voluptates? Neque
        perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
        necessitatibus optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. At
        a animi repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid
        cum ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam asperiores
        odio suscipit quam aspernatur illum, quis quidem sapiente quisquam. Obcaecati,
        blanditiis similique optio accusantium ut quia quaerat officia voluptas. Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam inventore
        rerum laboriosam dolorem impedit minima maxime debitis iusto fuga quae! Veritatis
        id nobis laboriosam consequuntur quaerat temporibus repudiandae placeat? Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Officia tempore sed eveniet
        reiciendis corporis similique ipsa ea. Aperiam possimus amet placeat repellendus
        molestias laudantium, provident dolores ex inventore, vitae repellat? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. At a animi repellat, assumenda
        possimus illum voluptates? Neque perferendis, aliquid cum ullam hic quos ut!
        Architecto vel deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
        voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
        deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. At a animi repellat, assumenda possimus illum voluptates? Neque
        perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
        necessitatibus optio. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus magnam asperiores odio suscipit quam aspernatur illum, quis quidem
        sapiente quisquam. Obcaecati, blanditiis similique optio accusantium ut quia
        quaerat officia voluptas. Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Quisquam, veniam inventore rerum laboriosam dolorem impedit minima maxime
        debitis iusto fuga quae! Veritatis id nobis laboriosam consequuntur quaerat
        temporibus repudiandae placeat? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Officia tempore sed eveniet reiciendis corporis similique ipsa
        ea. Aperiam possimus amet placeat repellendus molestias laudantium, provident
        dolores ex inventore, vitae repellat?
      </section>
      <section>
        <h1>The roles I serve</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat,
        assumenda possimus illum voluptates? Neque perferendis, aliquid cum ullam hic quos
        ut! Architecto vel deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
        voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
        deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. At a animi repellat, assumenda possimus illum voluptates? Neque
        perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
        necessitatibus optio. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus magnam asperiores odio suscipit quam aspernatur illum, quis quidem
        sapiente quisquam. Obcaecati, blanditiis similique optio accusantium ut quia
        quaerat officia voluptas. Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Quisquam, veniam inventore rerum laboriosam dolorem impedit minima maxime
        debitis iusto fuga quae! Veritatis id nobis laboriosam consequuntur quaerat
        temporibus repudiandae placeat? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Officia tempore sed eveniet reiciendis corporis similique ipsa
        ea. Aperiam possimus amet placeat repellendus molestias laudantium, provident
        dolores ex inventore, vitae repellat? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. At a animi repellat, assumenda possimus illum voluptates? Neque
        perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
        necessitatibus optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. At
        a animi repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid
        cum ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. At a animi repellat, assumenda
        possimus illum voluptates? Neque perferendis, aliquid cum ullam hic quos ut!
        Architecto vel deserunt porro necessitatibus optio. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Repellendus magnam asperiores odio suscipit quam
        aspernatur illum, quis quidem sapiente quisquam. Obcaecati, blanditiis similique
        optio accusantium ut quia quaerat officia voluptas. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Quisquam, veniam inventore rerum laboriosam dolorem
        impedit minima maxime debitis iusto fuga quae! Veritatis id nobis laboriosam
        consequuntur quaerat temporibus repudiandae placeat? Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Officia tempore sed eveniet reiciendis corporis
        similique ipsa ea. Aperiam possimus amet placeat repellendus molestias laudantium,
        provident dolores ex inventore, vitae repellat? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. At a animi repellat, assumenda possimus illum
        voluptates? Neque perferendis, aliquid cum ullam hic quos ut! Architecto vel
        deserunt porro necessitatibus optio. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. At a animi repellat, assumenda possimus illum voluptates? Neque
        perferendis, aliquid cum ullam hic quos ut! Architecto vel deserunt porro
        necessitatibus optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. At
        a animi repellat, assumenda possimus illum voluptates? Neque perferendis, aliquid
        cum ullam hic quos ut! Architecto vel deserunt porro necessitatibus optio. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam asperiores
        odio suscipit quam aspernatur illum, quis quidem sapiente quisquam. Obcaecati,
        blanditiis similique optio accusantium ut quia quaerat officia voluptas. Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, veniam inventore
        rerum laboriosam dolorem impedit minima maxime debitis iusto fuga quae! Veritatis
        id nobis laboriosam consequuntur quaerat temporibus repudiandae placeat? Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Officia tempore sed eveniet
        reiciendis corporis similique ipsa ea. Aperiam possimus amet placeat repellendus
        molestias laudantium, provident dolores ex inventore, vitae repellat?
      </section>
      <footer>
        <button type="button">Read about my projects!</button>
      </footer>
    </Screen>
  );
};

export default AboutMeScreen;

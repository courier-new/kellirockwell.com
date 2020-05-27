import Link from 'next/link';
import React, { FC } from 'react';

import Breadcrumbs from '../../common/components/Breadcrumbs';
import Image from '../../common/components/Image';
import useDisplaySize from '../../common/hooks/useDisplaySize';

/**
 * Screen component for primary screen "Conferences"
 */
const WhyILoveConferencesScreen: FC<{}> = () => {
  const [displaySize] = useDisplaySize();
  // We display the image at full size if the device screen size is small enough,
  // otherwise show it inline floating to the right
  const useFullSizeImage = displaySize === 'MOBILE' || displaySize === 'SMALL';
  return (
    <div className="padding-med">
      <style jsx>
        {`
          aside {
            float: ${useFullSizeImage ? 'none' : 'right'};
            width: ${useFullSizeImage ? '100%' : '400px'};
          }
        `}
      </style>
      <Breadcrumbs />
      <h3>My first conference</h3>
      <p>
        My freshman year of college, our physics department sent out an email announcing{' '}
        <a href="https://cuwip.physics.berkeley.edu/">an upcoming conference</a> targeting
        underrepresented undergraduate students in physics and astronomy. Entirely
        clueless as to what such a conference would entail but intrigued at the
        opportunity to spend a whole weekend with like-minded students similar to myself,
        I applied to attend.
      </p>
      <aside className={`flex-column ${useFullSizeImage ? '' : 'margin-med-left'}`}>
        <Image
          alt="The majority of the attendees of the CUWiP conference seated together in an auditorium. The site author is circled towards the middle back."
          path="cuwip2014.jpg"
          resizeWidth={displaySize === 'MOBILE' ? 400 : 600}
          width="100%"
        />
        <p className="xsmall">
          Most of the attendees of CUWiP &apos;14 @ UC Berkeley gathered for the final
          session of the conference, including me!{' '}
          <Link href={require('../../images/cuwip2014@original.jpg')}>
            <a title="View full size">(View full size)</a>
          </Link>
        </p>
      </aside>
      <p>
        Come January, I found myself astounded by the passion and intelligence of my
        peers, inspired by the stories and experiences of experts in our field, and
        entranced by the sights and sounds of downtown Berkeley, California.
      </p>
      <p>
        I would go on to attend this conference,{' '}
        <a href="https://www.aps.org/programs/women/workshops/cuwip.cfm">called CUWiP</a>,
        again during both my sophomore and senior years. During my senior year and after I
        graduated, I helped lead the organizational effort alongside a faculty committee
        to host the 2018 conference at my home institution. Among other responsibilities,
        I built and maintained{' '}
        <a href="https://www.cpp.edu/~nabramzon/CUWIP/agenda/">
          the website for the event
        </a>
        !
      </p>
      <h3>I believe conferences should be for everybody</h3>
      <p>
        I love how conferences can make a full auditorium of people buzz with anticipation
        and excitement for the first keynote speaker of the day. I love how conferences
        bolster a community by highlighting just how incredible the members of that
        community are.
      </p>
      <h4>
        I love when conference speakers challenge what industry experts are expected to
        look and act like.
      </h4>
      <p>
        We are more likely to believe something is possible and worth pursuing for
        ourselves when we see someone like us succeeding at doing it. This is a key to
        building confidence and one of many reasons why representation matters.
      </p>
      <h4>Conferences are where I explore future possibilities for myself.</h4>
      <p>
        However, as an able-bodied, financially stable white woman who was able to attend
        college, I consider myself one of the lucky ones. We must acknowledge that there
        continue to exist many{' '}
        <a href="https://www.brookings.edu/articles/unequal-opportunity-race-and-education/">
          systemic barriers
        </a>{' '}
        that disadvantage certain members of our communities and often prohibit them from
        attending or participating in conferences. We must also recognize that conference
        organizers are granted a fairly unique superpower: the power to lift up speakers
        from marginalized backgrounds and declare them as experts in their field, just by
        inviting them to speak. As of 2018,{' '}
        <a href="https://blog.bizzabo.com/event-gender-diversity-study">
          almost 70% of professional event speakers are male
        </a>
        , but there are{' '}
        <a href="https://hbr.org/2019/09/what-it-will-take-to-improve-diversity-at-conferences">
          many
        </a>
        ,{' '}
        <a href="https://www.forbes.com/sites/ellevate/2019/10/23/intentional-diversity-building-inclusive-conferences/#43f6be8fd358">
          many
        </a>
        ,{' '}
        <a href="https://slate.com/human-interest/2017/10/there-is-no-excuse-for-all-male-panels-heres-how-to-fix-them.html">
          many
        </a>
        ,{' '}
        <a href="https://sparcopen.org/wp-content/uploads/2017/07/Diversity-Equity-and-Inclusion-Report-July-10-V1-Release.pdf">
          many
        </a>
        ,{' '}
        <a href="https://dzone.com/articles/can-the-diversity-problem-in-tech-conferences-be-s">
          many
        </a>
        , <a href="https://www.globaldiversitycfpday.com/">many</a>,{' '}
        <a href="https://projectinclude.org/">many</a> ways we can seek to change this.
      </p>
      <p>
        Despite the continued need for improvement, I am encouraged by the ever-so-slowly
        shifting landscape at conferences, from the emergence of conferences for{' '}
        <a href="http://blackistechconference.com/">black and minority techies</a> and{' '}
        <a href="https://lesbianswhotech.org/sanfrancisco2020/">lesbians who tech</a> to
        the increased efforts of conference organizers to provide{' '}
        <a href="https://www.diversifytech.co/tech-conference-scholarships">
          scholarships
        </a>
        ,{' '}
        <a href="https://github.com/mmcelaney/tech-conferences-w-childcare">childcare</a>,
        live captioning, and other means of making their conferences more accessible.
      </p>
      <p>
        I believe that conferences have something to offer everyone, so conferences should{' '}
        <em>be</em> for everyone. My aspiration is to keep equity and inclusion at the
        forefront of the conversation when it comes to improving the conference experience
        and to continue emphasizing ways conference organizers can prioritize making their
        events more equitable and accessible for everyone.
      </p>
    </div>
  );
};

export default WhyILoveConferencesScreen;

import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import React from 'react';

import { generateTitleProps } from '../../utilities/content-helpers';
import { CANCELLED, Conference, hasPassed } from './Conference';
import { CONFERENCES_2019, CONFERENCES_2020 } from './roadmap';

/**
 * Tallies how many conferences I have attended based on the following criteria:
 * 1) The conference was not cancelled
 * 2) The conference finished happening
 * Plus 4 for past CUWiPS.
 *
 * @param conferences the list or list of lists of Conferences to count
 */
const countConferencesAttended = (conferences: Conference[] | Conference[][]): number =>
  filter(flatten(conferences), (conference) => {
    if (conference.label === CANCELLED) return false;
    return hasPassed(conference);
  }).length + 4; // Add 4 for CUWiPs

export default {
  ...generateTitleProps('Journey to the center of the community'),
  content: (
    <React.Fragment key="journey">
      <h3>My personal roadmap</h3>
      <p>
        I attended my first tech conference in August of 2019. Since then, I’ve been
        documenting my personal conferences roadmap, cataloguing the conferences I attend,
        the resources I enjoy, and the challenges of navigating this space as a diffident
        introvert.
      </p>
      <h3>Conference stats</h3>
      <ul>
        <li>{countConferencesAttended([CONFERENCES_2020, CONFERENCES_2019])} attended</li>
        <li>1 organized for</li>
        <li>1 volunteered at</li>
        <li>0 spoken at</li>
      </ul>
      <h3>Why do I love conferences?</h3>
      <p>
        My freshman year of college, our physics department sent out an email announcing
        an upcoming conference targeting underrepresented undergraduate students in
        physics and astronomy. Entirely clueless as to what such a conference would entail
        but intrigued at the opportunity to spend a whole weekend with like-minded
        students similar to myself, I applied to attend.
      </p>
      <p>
        Come January, I found myself astounded by the passion and intelligence of my
        peers, inspired by the stories and experiences of experts in our field, and
        entranced by the sights and sounds of downtown Berkeley, California.
      </p>
      <p>
        I would go on to attend this conference, called CUWiP, again during both my
        sophomore and senior years. During my senior year and after I graduated, I helped
        lead the organizational effort alongside a faculty committee to host the 2018
        conference at my home institution. Among other responsibilities, I built and
        maintained the website for the event!
      </p>
      <p>---</p>
      <p>
        We are more likely to believe something is possible and worth pursuing for
        ourselves when we see someone like us succeeding at doing it. This is the science
        behind confidence and one of many reasons why representation matters. Conferences
        are where I explore future possibilities for myself.
      </p>
      <p>
        I love how conferences can make a full auditorium of people buzz with anticipation
        and excitement for the first keynote speaker of the day. I love how conferences
        bolster a community by highlighting just how incredible the members of that
        community are. I love how conference speakers challenge what industry experts are
        expected to look and act like.
      </p>
      <p>
        Historically, financial and geographical barriers have prevented many members of
        the community (myself included) from attending conferences. These days, I am
        encouraged by the number of conferences that offer scholarships or opportunities
        for remote attendees. I hope that conferences will continue to prioritize ways to
        make their events more equitable and accessible for everyone.
      </p>
    </React.Fragment>
  ),
};

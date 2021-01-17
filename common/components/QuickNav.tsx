import map from 'lodash/map';
import replace from 'lodash/replace';
import Link from 'next/link';
import React, { FC } from 'react';

type QuickNavProps = {
  /** The sections of the page to render links for */
  sections: string[];
};

/** An inline set of navigation links to display as a stand in or alternative to
 * the side nav menu */
const QuickNav: FC<QuickNavProps> = ({ sections }) => {
  return (
    <ul className="no-default-bullets margin-0 padding-0 flex-row flex-align-center">
      {map(sections, (section, index) => (
        <li className="karla xsmall" key={`link-${section}`}>
          <Link href={`#${section}`}>
            <a
              className="karla xsmall no-box-shadow uppercase padding-sm-h"
              title={section}
            >
              {replace(section, '-', ' ')}
            </a>
          </Link>
          {index === sections.length - 1 ? '' : '|'}
        </li>
      ))}
    </ul>
  );
};

export default QuickNav;

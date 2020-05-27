import map from 'lodash/map';
import replace from 'lodash/replace';
import split from 'lodash/split';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { MdNavigateNext } from 'react-icons/md';

/** A breadcrumbs-like indication of where the user is on the site */
const Breadcrumbs: FC<{}> = () => {
  const router = useRouter();
  // Strip starting "/" in path to get the active page slug
  // router.asPath contains any hash in link, too
  const activePage = replace(router.pathname, /^\//, '');
  const pathComponents = split(activePage, '/');

  return (
    <div className="flex-row">
      {map(pathComponents, (pathComponent, index) => {
        /** Render separator after each path component except for the last one */
        const separator = index === pathComponents.length - 1 ? null : <MdNavigateNext />;
        /** Formats the path component for display by replacing dashes with
         * spaces */
        const componentText = replace(pathComponent, /-/g, ' ');
        return (
          <span
            className="karla xsmall uppercase flex-row flex-align-center"
            key={`path-${pathComponent}`}
          >
            {componentText}
            {separator}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

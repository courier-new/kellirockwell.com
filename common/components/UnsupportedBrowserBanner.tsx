import includes from 'lodash/includes';
import React, { FC, useEffect, useState } from 'react';

/**
 * See
 * https://www.geeksforgeeks.org/how-to-check-the-user-is-using-internet-explorer-in-javascript/
 * and https://stackoverflow.com/a/36653403 for more on strategies used
 */

/** True if using IE <= 10 */
const isIE10OrLower = (): boolean => {
  const { userAgent } = window.navigator;
  const msie = userAgent.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => parseInt gets version number
    return !!parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
  }
  return false;
};

/** True if using IE 11 */
const isIE11 = (): boolean => {
  const { userAgent } = window.navigator;
  const trident = userAgent.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => parseInt gets version number
    const rv = userAgent.indexOf('rv:');
    return !!parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
  }
  return false;
};

/** True if using Opera Mini */
const isOperaMini = (): boolean => includes(navigator.userAgent, 'Opera Mini');

/**
 * Warning banner to indicate to users if the site will not work in their
 * current browser and suggest that they switch
 */
const UnsupportedBrowserBanner: FC<{}> = () => {
  const [isUnsupportedBrowser, setIsUnsupportedBrowser] = useState(false);

  // We check using useEffect hook because window isn't available until after
  // first paint
  useEffect(() => {
    const isUnsupported = isIE10OrLower() || isIE11() || isOperaMini();
    setIsUnsupportedBrowser(isUnsupported);
  }, []);

  return isUnsupportedBrowser ? (
    <div className="background-magnolia padding-med text-align-center">
      <h4 className="margin-0">
        <strong>Uh oh! </strong>
        It looks like you&lsquo;re using an unsupported browser!
      </h4>
      Please consider switching to a different supported browser such as Chrome, Firefox,
      Safari, or Edge to view this site!
    </div>
  ) : null;
};

export default UnsupportedBrowserBanner;

/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

module.exports = withPlugins([
  [withSvgr],
]);

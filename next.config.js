/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withOptimizedImages = require('next-optimized-images');
const withSvgr = require('next-svgr');

module.exports = withPlugins([
  [withSass],
  [withFonts],
  [
    withOptimizedImages,
    {
      optimizeImagesInDev: true,
    },
  ],
  [withSvgr],
]);

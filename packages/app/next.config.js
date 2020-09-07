/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const consola = require('consola');
consola.withTag('app');
consola.wrapConsole();
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfiguration = {
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
  },

    redirects() {
      return [
        {
          source: '/',
          permanent: true,
          destination: '/en',
        },
      ];
    },

};
module.exports = withPlugins([withPWA, withBundleAnalyzer], nextConfiguration);

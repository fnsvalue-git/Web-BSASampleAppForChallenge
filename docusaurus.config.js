const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'FNSV Docs',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/fnsv/logo.png',
  organizationName: 'fns', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {

    navbar: {
      title: 'Guardian-CCS',
      style: 'dark',
      logo: {
        alt: 'My Site Logo',
        src: 'img/fnsv/logo.png',
        srcDark: 'img/fnsv/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'android/intro',
          position: 'left',
          label: 'Android',
        },
        {
          type: 'doc',
          docId: 'ios/intro',
          position: 'left',
          label: 'iOS',
        },
        {
          type: 'doc',
          docId: 'web/intro',
          position: 'left',
          label: 'Web',
        },
        {
          type: 'doc',
          docId: 'windows/intro',
          position: 'left',
          label: 'Windows',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Android',
              to: '/docs/android/intro',
            },
            {
              label: 'iOS',
              to: '/docs/ios/intro',
            },
            {
              label: 'Web',
              to: '/docs/web/intro',
            },
            {
              label: 'Windows',
              to: '/docs/windows/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UCSZiiW4v3LI_ZsfQT6wRXoQ',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://blog.naver.com/fnsvalue',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FNSVALUE All rights reserved.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en','ko'],
  },
};

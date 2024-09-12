import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// * plugins
import tailwindPlugin from './plugins/tailwind-config.cjs';

const config: Config = {
  title: 'Re-Audio',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sina-byn', // Usually your GitHub org/user name.
  projectName: 're-audio', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/sina-byn/re-audio-4/tree/main/packages/www/',
        },
        theme: {
          customCss: './src/css/theme.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [tailwindPlugin],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        src: 'img/logo.svg',
        alt: 'Re-Audio Logo',
        style: { width: '100px' },
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          label: 'GitHub',
          position: 'right',
          href: 'https://github.com/sina-byn/re-audio',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Github', href: 'https://github.com/sina-byn/re-audio' },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/re-audio',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/sina_byn',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ReAudio, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

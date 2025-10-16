module.exports = {
  stories: [
    '../src/Overview.mdx',
    '../src/**/*.mdx', 
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-storysource',
  ],

  typescript: {
    reactDocgen: false
  },

  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },

  staticDirs: ['../static'],

  framework: '@storybook/react-vite',

  docs: {},
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');
    const path = await import('path');
 
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@harvest-profit/npk/icons": path.resolve(__dirname, '../tmp/icons/'),
          "@harvest-profit/npk": path.resolve(__dirname, '../src/')
        },
      },
    });
  },
};

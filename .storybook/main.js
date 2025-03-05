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
    'storybook-dark-mode',
    "storybook-css-modules",
    ({
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces any existing Sass rules with given rules
          {
            test: /\.s[ac]ss$/i,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              require.resolve("css-loader"),
              {
                loader: require.resolve("sass-loader"),
                options: { implementation: require.resolve("sass") }
              },
            ],
          },
        ]
      }
    }),
    '@storybook/addon-webpack5-compiler-babel',
  ],

  typescript: {
    reactDocgen: false
  },

  staticDirs: ['../static'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {},
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};

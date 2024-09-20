module.exports = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-webpack5-compiler-babel',
    'storybook-dark-mode',
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
    })
  ],

  staticDirs: ['../static'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {}
};
